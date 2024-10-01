import * as vscode from 'vscode';
import { SemanticAnalyzer } from '../analyzer/semanticAnalyzer';

export function registerCompletionProvider(context: vscode.ExtensionContext) {
    const completionProvider = vscode.languages.registerCompletionItemProvider('go', {
        provideCompletionItems(document, position, token, context) {
            const analyzer = new SemanticAnalyzer();
            analyzer.analyzeDocument(document);

            const suggestions: vscode.CompletionItem[] = [];

            
            const type = analyzer.getVariableType(document, position);
            if (type) {
                const completionItem = new vscode.CompletionItem(type, vscode.CompletionItemKind.TypeParameter);
                suggestions.push(completionItem);
            }

            return suggestions;
        }
    });

    context.subscriptions.push(completionProvider);
}
