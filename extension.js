// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const json2path = require('./js/json2path.js');
const path2schema = require('./js/path2schema.js');
const schema2template = require('./js/schema2template');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.schema2template', function () {
        const editor = vscode.window.activeTextEditor;
        const text = editor.document.getText();

        const path = json2path.generatePath(text, editor.document.offsetAt(editor.selection.active));
        if (path.length > 0 && path[path.length - 1].type === "object" && !("key" in path[path.length - 1])) {
            vscode.window.showInformationMessage('Invalid place to insert template!');
            return;
        }

        const schema = path2schema.generateSchema(path);

        let autocompletionLevel = -1;
        let autocompletionSetting = vscode.workspace.getConfiguration().autocompletion;
        if (autocompletionSetting !== undefined) {
            autocompletionLevel = autocompletionSetting.level;
        }

        const template = schema2template.generateTemplate(schema, autocompletionLevel + 1);

        editor.insertSnippet(new vscode.SnippetString(JSON.stringify(template, null, 2)));
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;