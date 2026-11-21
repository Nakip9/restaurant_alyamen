import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/__qa') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>فحص عرض الموقع</title><style>body{margin:0;background:#777;font:16px sans-serif}header{position:sticky;top:0;background:#fff;padding:12px;z-index:2;display:flex;gap:12px;align-items:center}button{padding:10px;cursor:pointer}iframe{display:block;margin:15px auto;border:0;width:1440px;height:900px;background:#fff}output{margin-left:auto}</style></head><body><header>${[360,390,768,1024,1440].map(w=>`<button onclick="document.querySelector('iframe').style.width='${w}px';document.querySelector('output').textContent='${w}px'">${w}px</button>`).join('')}<output>1440px</output></header><iframe src="/" title="معاينة الموقع بأحجام مختلفة"></iframe></body></html>`); return;
    }
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
    try { if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html'); } catch { file = path.join(root, '404.html'); res.statusCode = 404; }
    const body = await readFile(file); res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream'); res.end(body);
  } catch { res.statusCode = 500; res.end('Preview error'); }
});
server.listen(3001, '0.0.0.0', () => console.log('Local preview: http://localhost:3001'));
