"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join("server", "dist", "server.js")); // Path to compiled server code
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: { execArgv: ["--nolazy", "--inspect=6011"] }, // Debug port 6011 for the server
        },
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for paexpr documents
        documentSelector: [{ scheme: "file", language: "paexpr" }],
        synchronize: {
        // Notify the server about file changes to '.clientrc files contained in the workspace
        // fileEvents: workspace.createFileSystemWatcher('**/.clientrc') // Adjust if config files are needed
        },
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient("powerAutomateExpressionsServer", // ID of the language client
    "Power Automate Expressions Server", // Name shown to user
    serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client
        .start()
        .then(() => {
        vscode_1.window.showInformationMessage("Power Automate Expressions Language Client started.");
    })
        .catch((error) => {
        vscode_1.window.showErrorMessage(`Failed to start Power Automate Expressions Language Client: ${error}`);
    });
}
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
//# sourceMappingURL=extension.js.map