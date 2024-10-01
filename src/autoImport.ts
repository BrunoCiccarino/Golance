import * as vscode from 'vscode';

export function registerAutoImportCommand() {
    const disposable = vscode.commands.registerCommand('golance.autoImport', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const importStatement = 'import "fmt"\n';
            const firstImportPosition = new vscode.Position(1, 0);
            const edit = new vscode.WorkspaceEdit();

            edit.insert(document.uri, firstImportPosition, importStatement);
            vscode.workspace.applyEdit(edit);
        }
    });

    return disposable;
}
