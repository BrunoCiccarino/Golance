import * as vscode from 'vscode';
import { SemanticAnalyzer } from '../analyzer/semanticAnalyzer';

export function registerSignatureHelpProvider(context: vscode.ExtensionContext) {
    const signatureHelpProvider = vscode.languages.registerSignatureHelpProvider('go', {
        provideSignatureHelp(document, position, token, context) {
            const analyzer = new SemanticAnalyzer();
            analyzer.analyzeDocument(document);

            const funcName = analyzer.extractFunctionName(document.lineAt(position.line).text);
            if (!funcName) {
                return; 
            }

            const docstring = analyzer.getDocstring(funcName);
            if (!docstring) {
                return; 
            }

            const signatureInfo = new vscode.SignatureInformation(funcName);
            const paramDescriptions = parseDocstringParams(docstring);
            
            signatureInfo.parameters = paramDescriptions.map((desc) => {
                const param = new vscode.ParameterInformation(desc.param);
                param.documentation = new vscode.MarkdownString(desc.description);
                return param;
            });

            const signatureHelp = new vscode.SignatureHelp();
            signatureHelp.signatures = [signatureInfo];
            signatureHelp.activeSignature = 0;

            return signatureHelp;
        }
    });

    context.subscriptions.push(signatureHelpProvider);
}

function parseDocstringParams(docstring: string): { param: string, description: string }[] {
    const paramRegex = /-\s+(\w+):\s+(.+)/g;
    const params: { param: string, description: string }[] = [];
    let match;
    
    while (match = paramRegex.exec(docstring)) {
        params.push({ param: match[1], description: match[2] });
    }

    return params;
}
