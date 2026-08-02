/**
 * Fenovera local dev server
 * Run: node serve.js
 * Then open: http://localhost:8080
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.json': 'application/json',
};

http.createServer(function (req, res) {
  var urlPath = req.url.split('?')[0];
  var filePath = path.join(ROOT, urlPath);

  // Try the path as-is, then as index.html inside a directory
  var candidates = [filePath, path.join(filePath, 'index.html')];

  for (var i = 0; i < candidates.length; i++) {
    var candidate = candidates[i];
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      var ext  = path.extname(candidate).toLowerCase();
      var mime = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(candidate).pipe(res);
      console.log('200 ' + req.url);
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found: ' + urlPath);
  console.log('404 ' + req.url);

}).listen(PORT, function () {
  console.log('Fenovera dev server running at http://localhost:' + PORT);
  console.log('Press Ctrl+C to stop.');
});
