import * as vscode from 'vscode';
import { ScopeManager } from './scopeManager';

export class TypeInference {
    inferType(document: vscode.TextDocument, position: vscode.Position, scopeManager: ScopeManager): string {
        const line = document.lineAt(position.line).text;
        
    
        const varRegex = /\b(\w+)\b/;
        const match = varRegex.exec(line);
        if (match) {
            const variableName = match[1];
            const variableType = scopeManager.getVariableType(position.line, variableName);
            return variableType || 'unknown';
        }

        return 'unknown';
    }
}
