import * as vscode from 'vscode';

export function createProgramStructure() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const edit = new vscode.WorkspaceEdit();

        const initialCode = `package main

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
