import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  InsertTextFormat,
  TextDocumentSyncKind,
  InitializeResult,
  Hover,
  MarkupContent,
  MarkupKind,
  SemanticTokensParams,
  SemanticTokensBuilder,
  SemanticTokensLegend,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";

import { workflowFunctions } from "./functions"; // Import the workflow functions map

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;


// --- Semantic Token Setup ---
const tokenTypes = [
  "function",
  "string",
  "number",
  "keyword",
  "operator",
  "parameter",
  "property",
  "variable",
  "type",
];
const tokenModifiers: string[] = []; // Add modifiers if needed (e.g., 'declaration', 'readonly')
const legend: SemanticTokensLegend = { tokenTypes, tokenModifiers };
// --- End Semantic Token Setup ---

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;

  // Does the client support the `workspace/configuration` request?
  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      hoverProvider: true, // Keep hover
      // Tell the client that the server supports code completion
      completionProvider: {
        resolveProvider: false, // We'll provide full info initially
        triggerCharacters: ["@", "."], // Trigger completion on @ and potentially . (for property access later)
      },
      semanticTokensProvider: { // Keep existing semantic tokens
        legend: legend,
        full: true,
      },
    },
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }
  console.log("Power Automate Expression Server Initialized");
  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});

// --- Hover Provider ---
connection.onHover(
    ({
      textDocument,
      position,
    }): Hover | null | undefined => {
      const document = documents.get(textDocument.uri);
      if (!document) {
        return undefined;
      }
  
      const offset = document.offsetAt(position);
      const text = document.getText();
  
      // Simple regex to find a potential function name around the cursor
      // This looks for sequences like '@funcName(' or 'funcName(' or just 'funcName'
      let word = "";
      let match: RegExpMatchArray | null = null;
  
      // Try matching 'funcName(' pattern first, extending backwards from cursor
      const textBefore = text.substring(0, offset);
      const funcMatchBefore = textBefore.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*$/);
  
      if (funcMatchBefore) {
        const potentialFuncName = funcMatchBefore[1];
        const textAfter = text.substring(offset);
        // Check if the character immediately after the potential name is '('
        if (textAfter.trimStart().startsWith("(")) {
          // Check if the cursor is within the bounds of the function name
          if (offset >= textBefore.length - potentialFuncName.length) {
            word = potentialFuncName;
          }
        }
        // If not followed by '(', check if the cursor is simply on the word
        else if (offset >= textBefore.length - potentialFuncName.length) {
           // Check if the character *at* the offset is part of the word or whitespace/symbol
           const charAtOffset = text[offset];
           if (!charAtOffset || !/[a-zA-Z0-9_]/.test(charAtOffset)) {
               word = potentialFuncName;
           } else {
               // Cursor is likely in the middle of a word, extend forward
               const wordEndMatch = textAfter.match(/^[a-zA-Z0-9_]*/);
               if(wordEndMatch) {
                   word = potentialFuncName + wordEndMatch[0];
                   // Verify cursor is within this combined word
                   if (offset <= (textBefore.length - potentialFuncName.length) + word.length) {
                       // It's a valid word, but is it a function? Check later.
                   } else {
                       word = ""; // Cursor is past the combined word
                   }
               } else {
                    word = potentialFuncName; // It ends right at the cursor
               }
           }
        }
      }
  
  
      if (!word) {
        return undefined; // Didn't find a word pattern ending at the cursor
      }
  
      // Look up the found word (case-insensitive) in our function map
      const funcInfo = workflowFunctions.get(word.toLowerCase());
  
      if (funcInfo) {
        // Construct a simple signature representation
        // A real implementation might store/parse the signature more formally
        let signature = `${funcInfo.name}(...)`; // Basic representation
  
        // Create Markdown content
        const contents: MarkupContent = {
          kind: MarkupKind.Markdown,
          value: [
            `\`\`\`paexpr\n${signature}\n\`\`\``, // Code block with signature
            "---", // Separator
            funcInfo.description, // Description
          ].join("\n"),
        };
        return { contents };
      }
  
      return undefined; // Word found, but not a known function
    }
  );
// --- End Hover Provider ---  
// --- Completion Provider ---
connection.onCompletion(
    (
      _textDocumentPosition: TextDocumentPositionParams
    ): CompletionItem[] | undefined => {
      // The passed-in position parameter includes the text document and position
      const document = documents.get(_textDocumentPosition.textDocument.uri);
      if (!document) {
        return undefined;
      }
  
      // Basic context check: Suggest functions if preceded by '@' or whitespace/start of line
      // More sophisticated context (inside quotes, inside function args) requires better parsing
      const position = _textDocumentPosition.position;
      const line = document.getText({
        start: { line: position.line, character: 0 },
        end: position,
      });
  
      // Simple check: if the line ends with '@' or looks like we are starting a word
      // This is very basic and doesn't handle complex nesting well.
      if (
        line.endsWith("@") ||
        line.match(/[\s\(\,\{]@?([a-zA-Z0-9_]*)$/) || // After whitespace, (, ,, { or just starting typing
        line.match(/^@?([a-zA-Z0-9_]*)$/) // Start of the line
      ) {
        const completionItems: CompletionItem[] = [];
        workflowFunctions.forEach((funcInfo) => {
          // Create snippet string
          let snippet = `${funcInfo.name}(`;
          if (funcInfo.minArgs > 0) {
            for (let i = 1; i <= funcInfo.minArgs; i++) {
              snippet += `\${${i}:param${i}}`; // Placeholder like ${1:param1}
              if (i < funcInfo.minArgs) {
                snippet += ", ";
              }
            }
            // Add placeholder for potential optional args if maxArgs is different or variable
            if (funcInfo.maxArgs === -1 || funcInfo.maxArgs > funcInfo.minArgs) {
               snippet += ", $0"; // Final tab stop after required args + comma
            } else {
               snippet += ")$0"; // Final tab stop inside parens if no more args expected
            }
          } else {
             snippet += "$0"; // Final tab stop inside parens if no args
          }
  
  
          completionItems.push({
            label: funcInfo.name,
            kind: CompletionItemKind.Function,
            documentation: {
              kind: MarkupKind.Markdown,
              value: funcInfo.description, // Use description from our map
            },
            insertTextFormat: InsertTextFormat.Snippet,
            insertText: snippet,
            detail: `${funcInfo.name}(...)`, // Simple signature in detail
          });
        });
        return completionItems;
      }
  
      // TODO: Add completion for parameters inside parameters('...')
      // TODO: Add completion for properties after '.' (e.g., trigger().outputs.body.) - requires better parsing
  
      return undefined; // No completions in other contexts for now
    }
  );
  // --- End Completion Provider ---
  
// The global settings, used when capabilities.workspace.configuration is not supported
// interface ExampleSettings {
//     maxNumberOfProblems: number;
// }
// const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
// let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
// const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

// connection.onDidChangeConfiguration(change => {
//     if (hasConfigurationCapability) {
//         // Reset all cached document settings
//         documentSettings.clear();
//     } else {
//         globalSettings = <ExampleSettings>(
//             (change.settings.languageServerExample || defaultSettings)
//         );
//     }
//     // Revalidate all open text documents
//     documents.all().forEach(validateTextDocument);
// });

// function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
//     if (!hasConfigurationCapability) {
//         return Promise.resolve(globalSettings);
//     }
//     let result = documentSettings.get(resource);
//     if (!result) {
//         result = connection.workspace.getConfiguration({
//             scopeUri: resource,
//             section: 'languageServerExample'
//         });
//         documentSettings.set(resource, result);
//     }
//     return result;
// }

// Only keep settings for open documents
documents.onDidClose((e) => {
  // documentSettings.delete(e.document.uri);
  // Clear diagnostics for closed files
  connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] });
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    const text = textDocument.getText();
    const diagnostics: Diagnostic[] = [];
    // Regex to find potential function calls (improved slightly to avoid matching inside strings)
    // This is still NOT a substitute for a real parser.
    const functionCallRegex = /(?<!')@?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
    let funcMatch;

    while ((funcMatch = functionCallRegex.exec(text)) !== null) {
        const funcName = funcMatch[1].toLowerCase();
        const funcInfo = workflowFunctions.get(funcName);
        const funcStartIndex = funcMatch.index;
        const funcNameStartIndex = funcStartIndex + funcMatch[0].indexOf(funcMatch[1]);
        const funcNameEndIndex = funcNameStartIndex + funcMatch[1].length;

        // Skip validation if inside a string literal (basic check)
        let inString = false;
        let quoteChar = '';
        for (let i = 0; i < funcStartIndex; i++) {
            if (text[i] === "'" || text[i] === '"') {
                if (inString && text[i] === quoteChar) {
                    if (i > 0 && text[i-1] !== '\\') { // Check for escape char
                       inString = false;
                    }
                } else if (!inString) {
                    inString = true;
                    quoteChar = text[i];
                }
            } else if (text[i] === '\\') {
                i++; // Skip escaped character
            }
        }
        if (inString) continue; // Don't validate function calls found inside strings


        if (!funcInfo) {
            // ... (keep unknown function warning as before) ...
             const knownKeywords = new Set(["if", "equals", "not", "and", "or", "greater", "less", "true", "false", "null"]);
            if (!knownKeywords.has(funcName)) {
                diagnostics.push({
                    severity: DiagnosticSeverity.Warning,
                    range: {
                        start: textDocument.positionAt(funcNameStartIndex),
                        end: textDocument.positionAt(funcNameEndIndex),
                    },
                    message: `Unknown function: ${funcMatch[1]}`,
                    source: "paexpr-lint",
                });
            }
        } else {
            // --- Find Arguments (Improved slightly, still basic) ---
            const argsStartIndex = funcMatch.index + funcMatch[0].length;
            let openParens = 1;
            let argsEndIndex = -1;
            let inSingleQuotes = false;
            let escaped = false;
            // More robust end paren finding needed for real parser

            for (let i = argsStartIndex; i < text.length; i++) {
                 const char = text[i];
                 // Basic quote/escape handling
                 if (escaped) { escaped = false; continue; }
                 if (char === '\\') { escaped = true; continue; }
                 if (char === "'") { inSingleQuotes = !inSingleQuotes; }
                 if (!inSingleQuotes) {
                     if (char === '(') openParens++;
                     else if (char === ')') {
                         openParens--;
                         if (openParens === 0) { argsEndIndex = i; break; }
                     }
                 }
             }
            // --- End Find Arguments ---

            if (argsEndIndex !== -1) {
                const argsText = text.substring(argsStartIndex, argsEndIndex);
                const args = splitArguments(argsText); // Use improved helper
                const argCount = args.length === 1 && args[0].trim() === '' ? 0 : args.length; // Handle no args case

                // --- Argument Count Check (Keep existing) ---
                if (funcInfo.minArgs !== -1 && argCount < funcInfo.minArgs) {
                    // ... (error message as before) ...
                     diagnostics.push({
                        severity: DiagnosticSeverity.Error,
                        range: {
                            start: textDocument.positionAt(funcStartIndex),
                            end: textDocument.positionAt(argsEndIndex + 1),
                        },
                        message: `Function '${funcInfo.name}' expects at least ${funcInfo.minArgs} arguments, but found ${argCount}.`,
                        source: "paexpr-lint",
                    });
                } else if (funcInfo.maxArgs !== -1 && argCount > funcInfo.maxArgs) {
                   // ... (error message as before) ...
                    diagnostics.push({
                        severity: DiagnosticSeverity.Error,
                        range: {
                            start: textDocument.positionAt(funcStartIndex),
                            end: textDocument.positionAt(argsEndIndex + 1),
                        },
                        message: `Function '${funcInfo.name}' expects at most ${funcInfo.maxArgs} arguments, but found ${argCount}.`,
                        source: "paexpr-lint",
                    });
                }
                // --- End Argument Count Check ---

                // --- Basic Literal Type Check ---
                let currentArgOffset = argsStartIndex; // Track position for diagnostics
                for (let i = 0; i < argCount; i++) {
                    const argText = args[i]; // Already trimmed by splitArguments
                    const expectedType = funcInfo.paramTypes[i] ?? funcInfo.paramTypes[funcInfo.paramTypes.length - 1] ?? "Any"; // Handle varargs/missing type info

                    // Calculate range for this argument (approximation)
                    const argStartOffset = text.indexOf(argText, currentArgOffset); // Find the start of the trimmed arg text
                    const argEndOffset = argStartOffset + argText.length;
                    const argRange = {
                        start: textDocument.positionAt(argStartOffset),
                        end: textDocument.positionAt(argEndOffset)
                    };
                     // Update offset for next search, including the comma if not the last arg
                    currentArgOffset = argEndOffset + (i < argCount - 1 ? 1 : 0);


                    // Only check if the argument IS a literal
                    if (isLiteral(argText)) {
                        const literalType = getLiteralType(argText);

                        if (literalType && !isTypeCompatible(literalType, expectedType)) {
                            diagnostics.push({
                                severity: DiagnosticSeverity.Warning, // Warning due to implicit conversions & basic check
                                range: argRange,
                                message: `Argument type mismatch for '${funcInfo.name}'. Expected '${expectedType}' but found literal of type '${literalType}'.`,
                                source: "paexpr-lint-type", // Different source for filtering
                            });
                        }
                    }
                    // Else: Argument is complex (function call, variable, etc.) - cannot check type here
                }
                // --- End Basic Literal Type Check ---
            }
        }
    }

    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}


// --- Semantic Token Provider ---
connection.languages.semanticTokens.on((params: SemanticTokensParams) => {
  const document = documents.get(params.textDocument.uri);
  if (document === undefined) {
    return { data: [] };
  }

  const builder = new SemanticTokensBuilder();
  const text = document.getText();

  // Simplified Tokenization using Regex (does not build an AST)
  const tokenPatterns = [
    { regex: /@?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, type: "function" }, // Function calls
    { regex: /'(?:[^'\\]|\\.)*'/g, type: "string" }, // Single-quoted strings
    { regex: /\b\d+(\.\d+)?\b/g, type: "number" }, // Numbers
    {
      regex:
        /\b(parameters|variables|trigger|triggerBody|triggerOutputs|action|actions|item|items|workflow|result|if|equals|not|and|or|greater|less|true|false|null)\b/gi,
      type: "keyword",
    }, // Keywords (case insensitive)
    { regex: /@\{|\}|\(|\)|\./g, type: "operator" }, // Operators/punctuation
    // Add more specific regex if needed, e.g., for properties after '.'
  ];

  // Store token positions to avoid duplicates if regexes overlap
  const tokenPositions = new Set<string>();

  for (const pattern of tokenPatterns) {
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      const startIndex = match.index;
      // Adjust start index for function names if '@' is present
      const tokenText = pattern.type === "function" ? match[1] : match[0];
      const tokenStartIndex =
        pattern.type === "function"
          ? match.index + match[0].indexOf(tokenText)
          : startIndex;
      const tokenLength = tokenText.length;
      const posKey = `${tokenStartIndex}-${tokenLength}`;

      if (!tokenPositions.has(posKey)) {
        const startPos = document.positionAt(tokenStartIndex);
        // Map regex type to a standard LSP token type index
        const typeIndex = tokenTypes.indexOf(pattern.type);
        if (typeIndex !== -1) {
          builder.push(
            startPos.line,
            startPos.character,
            tokenLength,
            typeIndex,
            0
          );
          tokenPositions.add(posKey);
        }
      }
    }
  }

  return builder.build();
});
// --- End Semantic Token Provider ---

// --- Helper Functions for Type Checking ---

function isLiteral(text: string): boolean {
    const trimmed = text.trim();
    return (
        (trimmed.startsWith("'") && trimmed.endsWith("'")) || // String
        trimmed === 'true' || trimmed === 'false' || // Boolean
        trimmed === 'null' || // Null
        /^-?\d+(\.\d+)?$/.test(trimmed) // Integer or Float
    );
}

// Gets the primitive type of a simple literal string
function getLiteralType(text: string): string | null {
    const trimmed = text.trim();
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) return "String";
    if (trimmed === 'true' || trimmed === 'false') return "Boolean";
    if (trimmed === 'null') return "Null";
    if (/^-?\d+$/.test(trimmed)) return "Integer";
    if (/^-?\d+\.\d+$/.test(trimmed)) return "Float";
    return null; // Not a recognized simple literal
}

// Checks if a literal type is compatible with an expected type, considering implicit conversions
function isTypeCompatible(literalType: string, expectedType: string): boolean {
    if (expectedType.includes("Any") || expectedType.includes("mixed")) {
        return true; // Assume compatible if Any/mixed is expected
    }
    if (expectedType.includes("|")) { // Handle union types simply for now
         const allowedTypes = expectedType.split("|").map(t => t.trim());
         if (allowedTypes.includes(literalType)) return true;
         // Allow number-like for unions containing NumberLike or specific number types
         if ((literalType === "Integer" || literalType === "Float") && (allowedTypes.includes("NumberLike") || allowedTypes.includes("Number") || allowedTypes.includes("Integer") || allowedTypes.includes("Float"))) return true;
         // Allow bool/number for string unions
         if (literalType !== "String" && allowedTypes.includes("String")) return true; // Allow implicit to string
         return false; // Otherwise, needs specific match in union
    }

    // Direct match
    if (literalType === expectedType) return true;

    // Implicit Conversions:
    // Number -> String? Usually yes.
    if (expectedType === "String" && (literalType === "Integer" || literalType === "Float" || literalType === "Boolean")) return true;
    // Integer -> Float? Yes.
    if (expectedType === "Float" && literalType === "Integer") return true;
    // Integer/Float -> NumberLike? Yes.
    if (expectedType === "NumberLike" && (literalType === "Integer" || literalType === "Float")) return true;

    // Add more specific conversion rules if needed

    return false; // Not compatible
}

// Basic argument splitter - still flawed for nested functions/complex strings
function splitArguments(argsText: string): string[] {
    if (argsText.trim() === '') return [];
    const args: string[] = [];
    let currentArg = '';
    let parenLevel = 0;
    let squareBracketLevel = 0; // Handle array access like item()?['property']
    let curlyBraceLevel = 0; // Handle inline expressions @{...}
    let inSingleQuotes = false;
    let escaped = false;

    for (let i = 0; i < argsText.length; i++) {
        const char = argsText[i];

        if (escaped) {
            currentArg += char;
            escaped = false;
            continue;
        }

        if (char === '\\') {
            currentArg += char;
            escaped = true;
            continue;
        }

        if (char === "'") {
            currentArg += char;
            inSingleQuotes = !inSingleQuotes;
            continue;
        }

        if (!inSingleQuotes) {
            if (char === '(') parenLevel++;
            else if (char === ')') parenLevel--;
            else if (char === '[') squareBracketLevel++;
            else if (char === ']') squareBracketLevel--;
             else if (char === '{') curlyBraceLevel++; // Basic check for @{...}
             else if (char === '}') curlyBraceLevel--;

            // Split only if at top level (outside parens, brackets, braces, quotes)
            if (char === ',' && parenLevel === 0 && squareBracketLevel === 0 && curlyBraceLevel === 0) {
                args.push(currentArg);
                currentArg = '';
                continue;
            }
        }
        currentArg += char;
    }
    args.push(currentArg); // Add the last argument
    // Trim whitespace from each argument AFTER splitting
    return args.map(arg => arg.trim());
}
// --- End Helper Functions ---


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
