import fs = require('fs');
import path = require('path');
import { toast } from './toast';

export const createIndexFile = (fsPath: string) => {
  const isDir = fs.lstatSync(fsPath).isDirectory();
  const indexFilePath = path.resolve(fsPath, 'index.ts');
  if (!isDir) {
    return void toast.error(`无法针对f非文件夹：${fsPath}创建index索引文件`);
  }
  let files = fs.readdirSync(fsPath);
  const tsFiles = files.filter(file => file.match(/\.ts$/))
    .map((file)=>file.replace(/(\.d)?\.ts$/,''));
  if (tsFiles.length === 0) {
    return void toast.error(`该目录下没有ts文件:${fsPath}`);
  }
  const isIndexTsExit = fs.existsSync(indexFilePath);
  if (isIndexTsExit) {
    // 已存在index文件。则尝试读取内容
    const currentIndexFileStr = fs.readFileSync(indexFilePath, 'utf8') || '';
    const needUpdateFiles = tsFiles.filter(file => {
      return currentIndexFileStr.indexOf(file) === -1 && !file.match(/index$/);
    });
    if (needUpdateFiles.length === 0) {
      return void toast.warning(`${fsPath}目录下，不需要更新index文件`);
    }
    let newIndexStr = getIndexStr(needUpdateFiles);
    fs.appendFileSync(indexFilePath,newIndexStr);
    toast.success('成功更新index文件');
  } else {
    let indexStr = getIndexStr(tsFiles);
    fs.writeFileSync(indexFilePath, indexStr);
    toast.success('成功创建index文件');
  }
}

function getIndexStr(tsFiles) {
  return tsFiles.map(file => `export * from './${file}';`).join('\r')+'\r';
}
