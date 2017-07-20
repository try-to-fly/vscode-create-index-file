import * as vscode from 'vscode';
export function toast(mes: string) {
    vscode.window.showInformationMessage(mes);
}