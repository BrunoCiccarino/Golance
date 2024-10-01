import * as vscode from 'vscode';

export class ScopeManager {
    private scopes: Map<number, Map<string, string>>;

    constructor() {
        this.scopes = new Map();
    }

    analyzeLine(line: string, position: vscode.Position, document: vscode.TextDocument): void {
        const scope = this.getScope(position.line);
        
        
        const varRegex = /\bvar\b\s+(\w+)\s+(\w+)/;
        const match = varRegex.exec(line);

        if (match) {
            const variableName = match[1];
            const variableType = match[2];
            scope.set(variableName, variableType);
        }
    }

    getScope(lineNumber: number): Map<string, string> {
        if (!this.scopes.has(lineNumber)) {
            this.scopes.set(lineNumber, new Map());
        }
        return this.scopes.get(lineNumber)!;
    }

    getVariableType(lineNumber: number, variableName: string): string | undefined {
        const scope = this.scopes.get(lineNumber);
        return scope ? scope.get(variableName) : undefined;
    }
}
