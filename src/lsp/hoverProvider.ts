import * as vscode from 'vscode';
import { SemanticAnalyzer } from '../analyzer/semanticAnalyzer';

export function registerHoverProvider(context: vscode.ExtensionContext) {
    const hoverProvider = vscode.languages.registerHoverProvider('go', {
        provideHover(document, position, token) {
            const analyzer = new SemanticAnalyzer();
            analyzer.analyzeDocument(document);

            const type = analyzer.getVariableType(document, position);
            const funcName = analyzer.extractFunctionName(document.lineAt(position.line).text);

            const hoverText = new vscode.MarkdownString();

            if (funcName) {
                const docstring = analyzer.getDocstring(funcName);
                if (docstring) {
                    hoverText.appendMarkdown(`**Docstring**:\n\n${docstring}\n\n`);
                }
            }

            if (type !== 'unknown') {
                hoverText.appendText(`Suggested type: `);
                hoverText.appendMarkdown(`\`\`\`go\n${type}\n\`\`\``);
            }

            hoverText.isTrusted = true; 

            return new vscode.Hover(hoverText);
        }
    });

    context.subscriptions.push(hoverProvider);
}
