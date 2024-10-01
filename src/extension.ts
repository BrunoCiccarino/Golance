import * as vscode from 'vscode';
import { registerAutoImportCommand } from './autoImport';
import { createProgramStructure } from './structure';

export function activate(context: vscode.ExtensionContext) {
    console.log('Golance extension is now active!');

    
    const structureCommand = vscode.commands.registerCommand('golance.createStructure', createProgramStructure);
    const autoImportCommand = registerAutoImportCommand();
    
    context.subscriptions.push(structureCommand);
    context.subscriptions.push(autoImportCommand);

    
}
export function deactivate() {}