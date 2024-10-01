import * as vscode from 'vscode';

function inferLibraryFromKeywords(func: string): string | null {

    const keywords: { [key: string]: string } = {
    
        "Print": "fmt",
        "Println": "fmt",
        "Printf": "fmt",
        "Scan": "fmt",
        "Scanln": "fmt",
        "Open": "os",
        "ReadFile": "io/ioutil",
        "WriteFile": "io/ioutil",
        "Create": "os",
        "Remove": "os",
        "Rename": "os",
    
        "FileInfo": "os",
        "Walk": "path/filepath",
        "Join": "path/filepath",
        "Abs": "path/filepath",
    
        "Error": "errors",
        "New": "errors",
        
        "Listen": "net",
        "Dial": "net",
        "HTTP": "net/http",
        "Get": "net/http",
        "Post": "net/http",
        "Request": "net/http",
        "Response": "net/http",
        
        "Marshal": "encoding/json",
        "Unmarshal": "encoding/json",
        "Encode": "encoding/json",
        "Decode": "encoding/json",
    
        "Split": "strings",
        "Contains": "strings",
        "Replace": "strings",
        "Trim": "strings",
        
        "Now": "time",
        "Sleep": "time",
        "Since": "time",
        "Parse": "time",
    
        "Fatal": "log",
        "Panic": "log",
    
        "NewDecoder": "encoding/base64",
        "NewEncoder": "encoding/base64",
        "Set": "sync",
        "WaitGroup": "sync",
        "Mutex": "sync",
        
        "OpenFile": "os",
        "Match": "regexp",
        "MustCompile": "regexp",
        
        "T": "testing",

        "SHA256": "crypto/sha256",
        "NewCipher": "crypto/aes",
        
        "Exec": "database/sql",
        "Query": "database/sql",
        "Close": "database/sql"
    };

    for (const keyword of Object.keys(keywords)) {
        if (func.includes(keyword)) {
            return keywords[keyword];
        }
    }
    return null;
}


async function identifyImports(text: string): Promise<Set<string>> {
    const importsToAdd = new Set<string>();


    const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g;
    const matches = text.match(functionRegex);

    if (matches) {
        for (const func of matches) {
            const libraryName = inferLibraryFromKeywords(func); 
            if (libraryName) {
                importsToAdd.add(`import "${libraryName}"\n`);
            }
        }
    }

    return importsToAdd;
}

export function registerAutoImportCommand() {
    const disposable = vscode.commands.registerCommand('golance.autoImport', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();

            const importsToAdd = await identifyImports(text); 

            if (importsToAdd.size === 0) {
                return;
            }

            const firstImportPosition = new vscode.Position(1, 0);
            const edit = new vscode.WorkspaceEdit();

            Array.from(importsToAdd).forEach((importStatement, index) => {
                const position = new vscode.Position(firstImportPosition.line + index, 0);
                edit.insert(document.uri, position, importStatement);
            });

            const success = await vscode.workspace.applyEdit(edit);
            if (success) {
                return;
            } else {
                vscode.window.showErrorMessage('Failed to add imports.');
            }
        }
    });

    return disposable;
}
