import * as vscode from 'vscode';
import { ScopeManager } from './scopeManager';
import { TypeInference } from './typeInference';

export class SemanticAnalyzer {
    private scopeManager: ScopeManager;
    private typeInference: TypeInference;
    private docstrings: Map<string, string>;

    constructor() {
        this.scopeManager = new ScopeManager();
        this.typeInference = new TypeInference();
        this.docstrings = new Map();
    }

    analyzeDocument(document: vscode.TextDocument): void {
        const text = document.getText();
        const lines = text.split('\n');
        let currentDocstring: string[] = [];
        let inBlockComment = false;

        lines.forEach((line, index) => {
            const position = new vscode.Position(index, 0);
            this.scopeManager.analyzeLine(line, position, document);

            
            if (line.trim().startsWith('/*')) {
                inBlockComment = true;
                currentDocstring.push(line.trim().slice(2).trim());  
            } 
            
            else if (line.trim().endsWith('*/')) {
                inBlockComment = false;
                currentDocstring.push(line.trim().slice(0, -2).trim());  

                const nextLine = lines[index + 1];
                if (this.isFunctionDeclaration(nextLine)) {
                    const funcName = this.extractFunctionName(nextLine);
                    if (funcName) {
                        this.docstrings.set(funcName, currentDocstring.join(' '));
                    }
                }
                currentDocstring = [];  
            } 
            
            else if (inBlockComment) {
                currentDocstring.push(line.trim());
            }
        });
    }

    public getDocstring(funcName: string): string | undefined {
        return this.docstrings.get(funcName);
    }

    public getVariableType(document: vscode.TextDocument, position: vscode.Position): string {
        return this.typeInference.inferType(document, position, this.scopeManager);
    }

    public extractFunctionName(line: string): string | undefined {
        const functionRegex = /\bfunc\b\s+(\w+)\s*\(/;
        const match = functionRegex.exec(line);
        return match ? match[1] : undefined;
    }

    private isFunctionDeclaration(line: string): boolean {
        const functionRegex = /\bfunc\b\s+(\w+)\s*\(/;
        return functionRegex.test(line);
    }
}
