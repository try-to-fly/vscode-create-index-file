import * as vscode from 'vscode';
import fs = require('fs');
import path = require('path');
import { createIndexFile } from './libs';


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.createIndexFile', (target) => {
        const { fsPath } = target;
        createIndexFile(fsPath);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }


