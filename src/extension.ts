import * as vscode from 'vscode';
import { registerHoverProvider } from './lsp/hoverProvider';
import { registerCompletionProvider } from './lsp/completionProvider';
import { registerSignatureHelpProvider } from './lsp/signatureHelpProvider';
// import { registerImplementHint } from './commands/implementHint';
import { registerAutoImportCommand } from './autoImport';
import { createProgramStructure } from './structure';

export function activate(context: vscode.ExtensionContext) {
    
    const structureCommand = vscode.commands.registerCommand('golance.createStructure', createProgramStructure);
    const autoImportCommand = registerAutoImportCommand();
    
       
    registerHoverProvider(context);
    registerCompletionProvider(context);
    registerSignatureHelpProvider(context);

    // Future relase ;-)    
    // registerImplementHint(context);

    
    context.subscriptions.push(structureCommand);
    context.subscriptions.push(autoImportCommand);

    
}

export function deactivate() {}
