import * as path from "path";
import { workspace, ExtensionContext, window } from "vscode";

import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(path.join("server", "dist", "server.js")); // Path to compiled server code

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ["--nolazy", "--inspect=6011"] }, // Debug port 6011 for the server
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for paexpr documents
    documentSelector: [{ scheme: "file", language: "paexpr" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      // fileEvents: workspace.createFileSystemWatcher('**/.clientrc') // Adjust if config files are needed
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "powerAutomateExpressionsServer", // ID of the language client
    "Power Automate Expressions Server", // Name shown to user
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client
    .start()
    .then(() => {
      window.showInformationMessage("Power Automate Expressions Language Client started.");
    })
    .catch((error) => {
      window.showErrorMessage(`Failed to start Power Automate Expressions Language Client: ${error}`);
    });
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
