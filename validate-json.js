const fs = require('fs');

try {
    const jsonContent = fs.readFileSync('./vercel.json', 'utf8');
    JSON.parse(jsonContent);
    console.log('✓ vercel.json 语法正确！');
} catch (e) {
    console.error('✗ vercel.json 语法错误:', e.message);
}