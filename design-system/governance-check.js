#!/usr/bin/env node
/**
 * Fenovera Design System — Governance Check
 * Flags violations in CSS and HTML files:
 *   1. Raw hex values outside tokens.css
 *   2. Arbitrary px spacing (not multiples of 4)
 *   3. Border-radius values above 8px
 *   4. Public-facing text below minimum size (below 12px)
 *   5. Images without alt attributes
 *   6. Links and buttons without accessible names
 *   7. Missing aria-label on icon-only buttons
 *   8. Input elements without associated labels
 */

const fs   = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────
const ROOT         = path.resolve(__dirname, '..');
const DS_DIR       = __dirname;
const TOKEN_FILE   = path.join(DS_DIR, 'tokens.css');
const PUBLIC_DIRS  = [ROOT]; // directories containing public-facing files
const IGNORE_FILES = [
  'tokens.css',        // raw hex is allowed here (source of truth)
  'governance-check.js',
  'node_modules',
  '.git',
];
const PUBLIC_IGNORE = [
  'design-system',     // showcase is internal-only
  'node_modules',
  '.git',
];

// ─── Colours ──────────────────────────────────────────────
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN  = '\x1b[32m';
const CYAN   = '\x1b[36m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';

let totalErrors = 0;
let totalWarnings = 0;

function err(file, line, msg) {
  totalErrors++;
  console.log(`${RED}✗${RESET} ${CYAN}${file}:${line}${RESET}  ${msg}`);
}

function warn(file, line, msg) {
  totalWarnings++;
  console.log(`${YELLOW}⚠${RESET} ${CYAN}${file}:${line}${RESET}  ${msg}`);
}

// ─── File helpers ─────────────────────────────────────────
function walkDir(dir, filter) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (IGNORE_FILES.some(ig => full.includes(ig))) return;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(full, filter));
    } else if (filter(f)) {
      results.push(full);
    }
  });
  return results;
}

function readLines(file) {
  return fs.readFileSync(file, 'utf8').split('\n');
}

function shortPath(full) {
  return path.relative(ROOT, full);
}

// ─── 1. Raw hex in CSS (outside tokens.css) ───────────────
function checkRawHex(cssFile) {
  const lines = readLines(cssFile);
  // Match #RGB, #RRGGBB, #RGBA, #RRGGBBAA — not inside comments
  const hexRe = /#([0-9a-fA-F]{3,8})\b/g;
  const commentRe = /\/\*[\s\S]*?\*\//g;

  lines.forEach((raw, i) => {
    // Strip inline comments before checking
    const line = raw.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
    let m;
    hexRe.lastIndex = 0;
    while ((m = hexRe.exec(line)) !== null) {
      // Allow 3/4/6/8 char hex values
      const hex = m[1];
      if (![3,4,6,8].includes(hex.length)) continue;
      err(shortPath(cssFile), i + 1,
        `Raw hex colour "${m[0]}" — use a semantic token from tokens.css instead.`);
    }
  });
}

// ─── 2. Arbitrary px spacing (not multiples of 4) ─────────
function checkArbitrarySpacing(cssFile) {
  const lines = readLines(cssFile);
  // Look for padding/margin/gap with raw px values not divisible by 4
  const spacingPropRe = /(?:^|\s)(?:padding|margin|gap|top|right|bottom|left|width|height|max-width|min-width|max-height|min-height)\s*:\s*([^;{]+)/gi;
  const pxRe = /(\d+)px/g;
  const allowedPx = new Set([0,1,2,3,4,6,8,10,12,14,16,20,24,28,32,40,48,56,64,72,80,96,128,160,192,200,210,216,220]);

  lines.forEach((line, i) => {
    // Skip comment lines
    if (line.trim().startsWith('/*') || line.trim().startsWith('//')) return;
    let sm;
    spacingPropRe.lastIndex = 0;
    while ((sm = spacingPropRe.exec(line)) !== null) {
      const val = sm[1];
      let pm;
      pxRe.lastIndex = 0;
      while ((pm = pxRe.exec(val)) !== null) {
        const n = parseInt(pm[1], 10);
        if (n !== 0 && n % 4 !== 0 && !allowedPx.has(n)) {
          warn(shortPath(cssFile), i + 1,
            `Spacing value "${pm[0]}" is not a multiple of 4px. Use a --space-* token.`);
        }
      }
    }
  });
}

// ─── 3. Border-radius above 8px ───────────────────────────
function checkRadius(cssFile) {
  const lines = readLines(cssFile);
  const radiusRe = /border-radius\s*:\s*([^;{]+)/gi;
  const pxRe = /(\d+)px/g;

  lines.forEach((line, i) => {
    if (line.trim().startsWith('/*') || line.trim().startsWith('//')) return;
    let rm;
    radiusRe.lastIndex = 0;
    while ((rm = radiusRe.exec(line)) !== null) {
      const val = rm[1];
      let pm;
      pxRe.lastIndex = 0;
      while ((pm = pxRe.exec(val)) !== null) {
        const n = parseInt(pm[1], 10);
        if (n > 8) {
          err(shortPath(cssFile), i + 1,
            `Border-radius "${pm[0]}" exceeds maximum of 8px. Use --radius-lg (8px) or below.`);
        }
      }
      // Check for 50% or 100% (pill shapes)
      if (/\b(50|100)%/.test(val)) {
        warn(shortPath(cssFile), i + 1,
          `Border-radius "${val.trim()}" creates a pill/circle shape, which is outside this design system.`);
      }
    }
  });
}

// ─── 4. Public text below minimum (CSS font-size < 12px) ──
function checkMinTextSize(cssFile) {
  if (cssFile.includes('design-system')) return; // DS internal files exempt
  const lines = readLines(cssFile);
  const fontRe = /font-size\s*:\s*([^;{]+)/gi;
  const pxRe = /(\d+\.?\d*)px/;
  const remRe = /(\d+\.?\d*)rem/;

  lines.forEach((line, i) => {
    if (line.trim().startsWith('/*') || line.trim().startsWith('//')) return;
    let fm;
    fontRe.lastIndex = 0;
    while ((fm = fontRe.exec(line)) !== null) {
      const val = fm[1].trim();
      let size = null;
      const pxM = pxRe.exec(val);
      const remM = remRe.exec(val);
      if (pxM) size = parseFloat(pxM[1]);
      else if (remM) size = parseFloat(remM[1]) * 16;
      if (size !== null && size < 12) {
        err(shortPath(cssFile), i + 1,
          `Font size "${val}" (${size}px) is below public minimum of 12px. Only --text-2xs (10px) may be used, and only in internal DS interface.`);
      } else if (size !== null && size < 16) {
        // Warn on 12–15px if in a non-DS public page
        // (13–14px are allowed for labels/badges; 15px allowed for table cells; this is a soft check only)
      }
    }
  });
}

// ─── 5. Images without alt attributes (HTML) ──────────────
function checkImgAlt(htmlFile) {
  const lines = readLines(htmlFile);
  const imgRe = /<img(?![^>]*\balt\s*=)[^>]*>/gi;
  const roleNoneRe = /role\s*=\s*["']none["']/i;
  const rolePresRe = /role\s*=\s*["']presentation["']/i;

  lines.forEach((line, i) => {
    let m;
    imgRe.lastIndex = 0;
    while ((m = imgRe.exec(line)) !== null) {
      // Exempt decorative images with role=none or role=presentation
      if (roleNoneRe.test(m[0]) || rolePresRe.test(m[0])) continue;
      err(shortPath(htmlFile), i + 1,
        `<img> missing alt attribute. Add alt="" for decorative images or a descriptive alt text.`);
    }
  });
}

// ─── 6. Links without accessible names ────────────────────
function checkEmptyLinks(htmlFile) {
  const lines = readLines(htmlFile);
  // Match <a> tags that have no text content on same line and no aria-label
  const emptyLinkRe = /<a\s[^>]*>\s*<\/a>/gi;
  const noAriaLinkRe = /<a\s(?![^>]*\baria-label\s*=)(?![^>]*\baria-labelledby\s*=)[^>]*>\s*<(?:svg|img)\b[^>]*(?:\/>|>.*?<\/(?:svg|img)>)\s*<\/a>/gi;

  lines.forEach((line, i) => {
    let m;
    emptyLinkRe.lastIndex = 0;
    while ((m = emptyLinkRe.exec(line)) !== null) {
      err(shortPath(htmlFile), i + 1, `Empty <a> link — add visible text or aria-label.`);
    }
    noAriaLinkRe.lastIndex = 0;
    while ((m = noAriaLinkRe.exec(line)) !== null) {
      if (!m[0].includes('aria-label') && !m[0].includes('aria-labelledby')) {
        warn(shortPath(htmlFile), i + 1,
          `Icon-only <a> link may lack an accessible name. Verify aria-label or aria-labelledby is present.`);
      }
    }
  });
}

// ─── 7. Buttons without accessible names ──────────────────
function checkEmptyButtons(htmlFile) {
  const lines = readLines(htmlFile);
  // Icon-only buttons: <button> containing only SVG/img, no aria-label
  const iconBtnRe = /<button\s(?![^>]*\baria-label\s*=)[^>]*>\s*<svg\b/gi;

  lines.forEach((line, i) => {
    let m;
    iconBtnRe.lastIndex = 0;
    while ((m = iconBtnRe.exec(line)) !== null) {
      if (!m[0].includes('aria-label') && !m[0].includes('aria-labelledby')) {
        err(shortPath(htmlFile), i + 1,
          `Icon-only <button> missing aria-label. Add aria-label="[action description]".`);
      }
    }
  });
}

// ─── 8. Inputs without labels ─────────────────────────────
function checkInputLabels(htmlFile) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const lines = readLines(htmlFile);

  // Collect all label[for] and input IDs
  const labelForRe = /<label\s[^>]*\bfor\s*=\s*["']([^"']+)["']/gi;
  const ariaLabelledByRe = /\baria-labelledby\s*=\s*["']([^"']+)["']/gi;
  const labelledIds = new Set();
  let m;
  while ((m = labelForRe.exec(content)) !== null) labelledIds.add(m[1]);
  while ((m = ariaLabelledByRe.exec(content)) !== null) labelledIds.add(m[1]);

  const inputRe = /<input\s([^>]*)>/gi;
  lines.forEach((line, i) => {
    let im;
    inputRe.lastIndex = 0;
    while ((im = inputRe.exec(line)) !== null) {
      const attrs = im[1];
      // Skip hidden, submit, button, reset types
      const typeM = /\btype\s*=\s*["']([^"']+)["']/.exec(attrs);
      const type = typeM ? typeM[1].toLowerCase() : 'text';
      if (['hidden','submit','button','reset'].includes(type)) continue;
      // Check for id referencing a label, or aria-label/aria-labelledby directly
      const idM = /\bid\s*=\s*["']([^"']+)["']/.exec(attrs);
      const hasAriaLabel = /\baria-label\s*=/.test(attrs);
      const hasAriaLabelledby = /\baria-labelledby\s*=/.test(attrs);
      const hasTitle = /\btitle\s*=/.test(attrs);
      if (hasAriaLabel || hasAriaLabelledby || hasTitle) continue;
      if (idM && labelledIds.has(idM[1])) continue;
      warn(shortPath(htmlFile), i + 1,
        `<input type="${type}"> may lack an accessible label. Ensure a <label for="..."> or aria-label is present.`);
    }
  });
}

// ─── Runner ───────────────────────────────────────────────
console.log(`\n${BOLD}Fenovera Design System — Governance Check${RESET}`);
console.log(`Root: ${ROOT}\n`);

// CSS checks
const cssFiles = walkDir(ROOT, f => f.endsWith('.css'));
console.log(`${BOLD}CSS Files (${cssFiles.length})${RESET}`);
cssFiles.forEach(f => {
  const isTokenFile = path.basename(f) === 'tokens.css';
  if (!isTokenFile) checkRawHex(f);
  checkArbitrarySpacing(f);
  checkRadius(f);
  checkMinTextSize(f);
});

// HTML checks
const htmlFiles = walkDir(ROOT, f => f.endsWith('.html') || f.endsWith('.htm'));
console.log(`\n${BOLD}HTML Files (${htmlFiles.length})${RESET}`);
htmlFiles.forEach(f => {
  checkImgAlt(f);
  checkEmptyLinks(f);
  checkEmptyButtons(f);
  checkInputLabels(f);
});

// Summary
console.log(`\n${'─'.repeat(60)}`);
if (totalErrors === 0 && totalWarnings === 0) {
  console.log(`${GREEN}${BOLD}✓ No violations found.${RESET}`);
} else {
  if (totalErrors > 0)   console.log(`${RED}${BOLD}✗ ${totalErrors} error(s)${RESET}`);
  if (totalWarnings > 0) console.log(`${YELLOW}${BOLD}⚠ ${totalWarnings} warning(s)${RESET}`);
}
console.log(`${'─'.repeat(60)}\n`);

process.exit(totalErrors > 0 ? 1 : 0);
