'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs = require('fs');
import path = require('path');
import {toast} from './libs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "create-index" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.createIndexFile', (target) => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const { fsPath } = target;
        const isDir = fs.lstatSync(fsPath).isDirectory();
        const indexFilePath = path.resolve(fsPath,'index.ts');
        if (isDir) {
            let files = fs.readdirSync(fsPath);
            const tsFiles = files.filter(file=>file.match(/\.ts$/));
            if(tsFiles.length === 0){
                return void toast(`该目录下没有ts文件:${fsPath}`);
            }
            const isIndexTsExit = fs.existsSync(indexFilePath);
            if(isIndexTsExit){
                return void toast('该目录下已存在index.ts文件');
            }
            let indexStr = tsFiles.map(file=>`export * from './${file.slice(0,-3)}'`).join('\r');
            fs.writeFileSync(indexFilePath,indexStr);
        } else {
            toast('不是文件夹,无法创建index文件');
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}


