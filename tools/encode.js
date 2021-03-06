/*
 * @Author: MADAO
 * @Date: 2021-03-06 10:02:36
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-06 10:51:32
 * @Description: 加密源码
 */

const { app } = require('electron');
const v8 = require('v8');
const bytenode = require('bytenode');
const fs = require('fs');
const { join, extname } = require('path');

v8.setFlagsFromString('--no-lazy');

const rootPath = join(__dirname, '../dist/js');

const filenames = fs.readdirSync(rootPath).concat('main.js');

filenames.forEach((filename) => {
  if (extname(filename) === '.js') {
    let filePath = join(rootPath, filename);
    let filePrefix = 'js';
    if (filename === 'main.js') {
      filePath = join(__dirname, '../dist/main.js');
      filePrefix = './';
    }
    bytenode.compileFile({
      filename: filePath,
    });
    fs.writeFileSync(filePath, `
      var path = require('path')
      var bytenode = bytenode || require('bytenode')
      require(path.join(__dirname, '${filePrefix}', '${filename.replace('js', 'jsc')}'))
    `);
  }
});

app.quit();
