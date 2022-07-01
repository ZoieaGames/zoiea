import http from 'http';
import fs from 'fs/promises';

http.createServer((req, res) => {
    req.url.endsWith('js') ?
        res.setHeader('Content-Type', 'application/javascript') : req.url.endsWith('/') && (req.url += 'index.html');
    fs.readFile('.' + req.url).then(value => res.end(value)).catch(error => res.writeHead(404).end(error.message));
}).listen(80);