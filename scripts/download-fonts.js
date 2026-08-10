#!/usr/bin/env node
/**
 * Fenovera — Font Downloader
 * Downloads Inter and Manrope woff2 files from Google Fonts CDN for self-hosting.
 *
 * Run once from the project root:
 *   node scripts/download-fonts.js
 *
 * Outputs to /fonts/:
 *   inter-400.woff2, inter-500.woff2, inter-600.woff2
 *   manrope-600.woff2, manrope-700.woff2, manrope-800.woff2
 */
'use strict';

var https = require('https');
var fs    = require('fs');
var path  = require('path');
var urlMod = require('url');

var FONTS_DIR = path.resolve(__dirname, '..', 'fonts');
var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

var FONT_REQUESTS = [
  {
    cssUrl:  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
    family:  'Inter',
    weights: { 400: 'inter-400', 500: 'inter-500', 600: 'inter-600' },
  },
  {
    cssUrl:  'https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&display=swap',
    family:  'Manrope',
    weights: { 600: 'manrope-600', 700: 'manrope-700', 800: 'manrope-800' },
  },
];

function get(urlStr, headers) {
  return new Promise(function (resolve, reject) {
    var opts = urlMod.parse(urlStr);
    opts.headers = headers || {};
    https.get(opts, function (res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location, headers).then(resolve).catch(reject);
      }
      var data = '';
      res.on('data', function (chunk) { data += chunk; });
      res.on('end', function () { resolve(data); });
    }).on('error', reject);
  });
}

function download(urlStr, outPath) {
  return new Promise(function (resolve, reject) {
    var opts = urlMod.parse(urlStr);
    var file = fs.createWriteStream(outPath);
    https.get(opts, function (res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(outPath); } catch (e) {}
        return download(res.headers.location, outPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', function () { file.close(); resolve(); });
    }).on('error', function (err) {
      try { fs.unlinkSync(outPath); } catch (e) {}
      reject(err);
    });
  });
}

function processRequest(req) {
  console.log('\nFetching CSS for ' + req.family + '...');
  return get(req.cssUrl, { 'User-Agent': UA }).then(function (css) {
    // Parse all @font-face blocks
    var blocks = css.match(/@font-face\s*\{[^}]+\}/g) || [];
    var downloads = [];

    blocks.forEach(function (block) {
      var weightMatch = block.match(/font-weight:\s*(\d+)/);
      // woff2 is always listed first; grab it
      var srcMatch = block.match(/url\(([^)]+\.woff2)\)/);
      if (!weightMatch || !srcMatch) return;

      var weight   = parseInt(weightMatch[1], 10);
      var woff2Url = srcMatch[1].replace(/['"]/g, '');
      var name     = req.weights[weight];
      if (!name) return; // weight we don't need

      var outFile  = path.join(FONTS_DIR, name + '.woff2');
      if (fs.existsSync(outFile)) {
        console.log('  ✔ ' + name + '.woff2 already exists, skipping.');
        return;
      }
      downloads.push({ name: name, url: woff2Url, outFile: outFile });
    });

    // Download sequentially to avoid hammering the CDN
    return downloads.reduce(function (chain, item) {
      return chain.then(function () {
        console.log('  Downloading ' + item.name + '.woff2 ...');
        return download(item.url, item.outFile).then(function () {
          console.log('  ✔ Saved ' + item.name + '.woff2');
        });
      });
    }, Promise.resolve());
  });
}

(function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
    console.log('Created /fonts/ directory.');
  }

  FONT_REQUESTS.reduce(function (chain, req) {
    return chain.then(function () { return processRequest(req); });
  }, Promise.resolve()).then(function () {
    console.log('\n✓ All fonts downloaded to /fonts/');
    console.log('  Run `node scripts/build-site.js` to rebuild the site.\n');
  }).catch(function (err) {
    console.error('\nDownload failed:', err.message);
    process.exit(1);
  });
}());
