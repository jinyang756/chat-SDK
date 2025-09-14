const fs = require('fs');
const path = require('path');

// 创建public目录（如果不存在）
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Public directory created.');
} else {
  console.log('Public directory already exists.');
}

// 确保index.html文件存在于public目录中
const indexHtml = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexHtml)) {
  fs.writeFileSync(indexHtml, `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>在线客服</title>
</head>
<body>
    <div>加载中...</div>
</body>
</html>`);
  console.log('Default index.html created.');
} else {
  console.log('index.html already exists in public directory.');
}

console.log('Build process completed successfully.');