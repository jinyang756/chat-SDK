const fs = require('fs');
const path = require('path');

// 加载环境变量
require('dotenv').config();

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

// 处理环境变量替换
const envVars = process.env;
const templateDir = path.join(__dirname, 'public');
const templateFiles = ['index.html'];

templateFiles.forEach(fileName => {
  const filePath = path.join(templateDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 替换环境变量占位符
    Object.keys(envVars).forEach(key => {
      const placeholder = `process.env.${key}`;
      if (content.includes(placeholder)) {
        // 对于字符串类型的环境变量，添加引号包裹
        const value = typeof envVars[key] === 'string' ? `"${envVars[key]}"` : envVars[key];
        content = content.replace(new RegExp(placeholder, 'g'), value);
      }
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Environment variables replaced in ${filePath}`);
  }
});

console.log('Build process completed successfully.');