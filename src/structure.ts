import * as vscode from 'vscode';
import * as path from 'path';

export function createProgramStructure() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const edit = new vscode.WorkspaceEdit();

        
        const folderPath = path.dirname(document.uri.fsPath);
        
        const packageName = path.basename(folderPath);

        
        const initialCode = `package ${packageName}

import (
    "fmt"
)

func main() {
    fmt.Println("Hello, World!")
}`;

        
        edit.insert(document.uri, new vscode.Position(0, 0), initialCode);
        vscode.workspace.applyEdit(edit);
    }
}
