import * as vscode from 'vscode';

export const toast = {
    success(mes: string) {
        vscode.window.showInformationMessage(mes);
    },
    warning(mes: string) {
        vscode.window.showWarningMessage(mes);
    },
    error(mes: string) {
        vscode.window.showErrorMessage(mes);
    }
}