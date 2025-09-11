const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fullPath = path.join(__dirname, filePath);
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            const ext = path.extname(fullPath);
            const contentType = ext === '.html' ? 'text/html' :
                               ext === '.js' ? 'application/javascript' :
                               ext === '.css' ? 'text/css' :
                               'text/plain';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const PORT = 8081;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});