#!/usr/bin/env node
/**
 * Fenovera Design System — Governance Check  v1.9
 *
 * Checks:
 *  1.  Raw hex values outside tokens.css
 *  2.  Arbitrary px spacing (layout properties only)
 *  3.  Border-radius > 8px or pill shapes
 *  4.  Font-size below 12px — @media blocks now checked; only @keyframes /
 *       @font-face are exempt. ds-* annotation selector blocks exempt.
 *  5.  <img> without alt attributes
 *  6.  Empty / icon-only links without accessible name
 *  7.  Icon-only buttons without accessible name
 *  8.  <input> / <select> / <textarea> without associated label
 *  9.  Malformed class attributes (style/aria-X/type= bled in)
 * 10.  Invalid interactive nesting (<a><button> or <button><a>)
 * 11.  <button> missing explicit type attribute
 * 12.  Obsolete WCAG "14px bold" phrase in HTML files
 * 13.  Duplicate headings / multiple version footers in .md files
 * 14.  Backup / temp / archive files in the deliverable (*.bak, *.tmp, *.zip, *.tar, *.tgz, etc.)
 * 15.  NUL bytes in text files
 * 16.  Content after </html>
 * 17.  Missing </script> / </body> / </html> tags
 * 18.  JavaScript syntax (node --check on inline scripts)
 * 19.  Class names in responsive-proof.html AND showcase.html not defined in
 *       components.css / base.css (rp-* and ds-* scaffold prefixes allowed)
 * 20.  --color-ink-tertiary in informational text selectors in components.css
 *       (grouped selectors detected); EXPANDED in v1.9 to also flag
 *       color: var(--color-ink-tertiary) in page-level <style> blocks.
 * 21.  SVG fill / stroke raw hex colors in HTML files
 * 22.  Obsolete WCAG language in Markdown files
 * 23.  HTML ID / reference integrity (aria-controls, aria-labelledby, for=)
 * 24.  Duplicate id= attributes within a single HTML file
 * 25.  Release blockers in HTML/MD files (activated by --release flag):
 *       [X TO VERIFY] placeholders, fake phone numbers, dev-notice banners,
 *       fake form-submission handlers, noindex robots directives,
 *       unconnected quote-form markers (id="form-dev-notice" and
 *       "REPLACE THIS BLOCK with a fetch" comment).
 * 26.  Link integrity (EXPANDED in v1.9):
 *       ./  and ../  paths — resolved to filesystem; error if missing.
 *       /root-relative/  paths — resolved from ROOT; directory routes → index.html;
 *       missing = warn in dev mode (error with --strict).
 *       #id  fragment-only links — ID must exist in same file (warn if missing).
 *       External / mailto / tel / data URLs — skipped.
 * 27.  Missing <title> or <meta name="description"> — each --html= page must
 *       have a non-empty <title> and a non-empty meta description.
 * 28.  Not exactly one <h1> — each --html= page must have exactly one primary
 *       heading element.
 * 29.  Exactly one <header class="site-header"> and one <footer class="site-footer">
 *       per generated --html= page (build-template composition validation).
 * 30.  aria-current="page" correctness — for pages with <body data-page="…">,
 *       exactly one <a aria-current="page"> must exist (verifies template tokens).
 * 31.  Canonical URL policy — non-noindex --html= pages must have
 *       <link rel="canonical">. noindex pages are exempt.
 * 32.  Sitemap inclusion — non-noindex --html= pages must appear in sitemap.xml.
 *       noindex pages and DS demo pages are exempt.
 *
 * Flags:
 *   --strict        Treat every warning as an error (exit 1 on any warning)
 *   --root=<dir>    Override the design-system root (used by self-test)
 *   --html=<paths>  Comma-separated HTML file paths (relative to ROOT) to
 *                   include in HTML checks (e.g. product pages outside DS dir)
 *   --release       Activate Check 25 — release-blocker scan. Fails on any
 *                   placeholder, dev banner, noindex, or fake handler found.
 *
 * Run:  node design-system/governance-check.js [--strict]
 *       node design-system/governance-check.js --root=design-system \
 *            --html=products/index.html,products/windows/76-series/index.html [--strict]
 *       node design-system/governance-check.js --root=design-system \
 *            --html=products/index.html --release
 * Exits 0 if no errors; exits 1 on any error (or warning with --strict).
 */

'use strict';
const fs           = require('fs');
const path         = require('path');
const { execSync } = require('child_process');

// ─── Flags ────────────────────────────────────────────────────────────────────
const STRICT   = process.argv.includes('--strict');
const RELEASE  = process.argv.includes('--release');
const ROOT_ARG = process.argv.find(a => a.startsWith('--root='));
const HTML_ARG = process.argv.find(a => a.startsWith('--html='));

// ─── Config ───────────────────────────────────────────────────────────────────
const DS_DIR = ROOT_ARG ? ROOT_ARG.slice(7) : __dirname;
const ROOT   = path.resolve(DS_DIR, '..');

// Files / dirs to skip entirely
const SKIP = ['node_modules', '.git', 'governance-check.js', 'governance-self-test.js'];

// ─── State ────────────────────────────────────────────────────────────────────
let totalErrors   = 0;
let totalWarnings = 0;

// ─── ANSI colours ─────────────────────────────────────────────────────────────
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN  = '\x1b[32m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

// ─── Output helpers ───────────────────────────────────────────────────────────
function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function err(file, line, msg) {
  totalErrors++;
  console.log(`  ${RED}ERR${RESET}  ${file}:${line}  ${msg}`);
}

function warn(file, line, msg) {
  if (STRICT) {
    totalErrors++;
    console.log(`  ${RED}ERR${RESET}  ${file}:${line}  ${msg} [strict]`);
  } else {
    totalWarnings++;
    console.log(`  ${YELLOW}WARN${RESET} ${file}:${line}  ${msg}`);
  }
}

// ─── File helpers ─────────────────────────────────────────────────────────────
function walkDir(dir, filter) {
  const results = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d)) {
      if (SKIP.some(s => entry === s)) continue;
      const full = path.join(d, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) { walk(full); continue; }
      if (filter(full)) results.push(full);
    }
  }
  walk(dir);
  return results;
}

function readLines(filePath) {
  return fs.readFileSync(filePath, 'utf8').split('\n');
}

// ─── CSS comment stripper ─────────────────────────────────────────────────────
function stripCSSComments(lines) {
  const joined = lines.join('\n');
  // Preserve newlines inside comments so line numbers stay accurate
  const stripped = joined.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '));
  return stripped.split('\n');
}

// ─── Extract <style> blocks from HTML ─────────────────────────────────────────
function extractStyleBlocks(htmlLines) {
  const blocks = [];
  let inStyle = false;
  let buf = [];
  let startLine = 0;
  htmlLines.forEach((line, i) => {
    if (!inStyle && /<style[\s>]/i.test(line)) {
      inStyle = true; startLine = i + 1; buf = [];
    }
    if (inStyle) {
      buf.push(line.replace(/<\/?style[^>]*>/gi, ''));
      if (/<\/style>/i.test(line)) {
        blocks.push({ lines: buf.slice(), startLine });
        inStyle = false; buf = [];
      }
    }
  });
  return blocks;
}

// ─── Extract inline <script> blocks from HTML ─────────────────────────────────
function extractScriptBlocks(htmlLines) {
  const blocks = [];
  let inScript = false;
  let buf = [];
  let startLine = 0;
  htmlLines.forEach((line, i) => {
    if (!inScript && /<script(?:\s[^>]*)?>/.test(line) && !/<script[^>]+src=/.test(line)) {
      inScript = true; startLine = i + 1; buf = [];
    }
    if (inScript) {
      buf.push(line);
      if (/<\/script>/i.test(line)) {
        blocks.push({ lines: buf.slice(), startLine });
        inScript = false; buf = [];
      }
    }
  });
  return blocks;
}

// ─── CSS @-rule block scope tracker ──────────────────────────────────────────
// Returns an array of booleans: true if line[i] is inside a @keyframes or
// @font-face block.  These are NOT public text declarations, so font-size
// checks should be skipped there.
// @media and @supports are intentionally NOT exempted — responsive font-size
// overrides are still public text declarations and must meet the 12px minimum.
function buildAtRuleMap(cssLines) {
  const map = new Array(cssLines.length).fill(false);
  let depth = 0;
  let atDepth = -1; // brace depth when we entered the @block (-1 = not in one)

  cssLines.forEach((line, i) => {
    // Detect the start of @keyframes / @font-face only (not @media / @supports)
    if (atDepth === -1 && /^\s*@(?:keyframes|font-face)\b/i.test(line)) {
      // The @-rule's outer { may be on the same line or the next
      if ((line.match(/\{/g) || []).length > (line.match(/\}/g) || []).length) {
        atDepth = depth;
      }
    }

    const opens  = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    depth += opens - closes;

    if (atDepth !== -1 && depth <= atDepth) {
      atDepth = -1;
    }

    if (atDepth !== -1) map[i] = true;
  });
  return map;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHECKS 1–20 (CSS + HTML + Markdown)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 1. Raw hex in CSS (outside tokens.css) ──────────────────────────────────
const HEX_RE = /#([0-9a-fA-F]{3,8})\b/g;

function checkRawHex(cssLines, filePath, lineOffset = 0) {
  if (path.basename(filePath) === 'tokens.css') return;
  const cleaned = stripCSSComments(cssLines);
  cleaned.forEach((line, i) => {
    HEX_RE.lastIndex = 0;
    let m;
    while ((m = HEX_RE.exec(line)) !== null) {
      if (![3, 4, 6, 8].includes(m[1].length)) continue;
      err(rel(filePath), lineOffset + i + 1,
        `Raw hex "${m[0]}" — use a semantic token from tokens.css.`);
    }
  });
}

// ─── 2. Arbitrary px spacing ──────────────────────────────────────────────────
const SPACING_PROP_RE = /(?:^|[{;])(?:padding|margin|gap|top|right|bottom|left|inset)(?:-(?:top|right|bottom|left|inline|block|start|end))?\s*:\s*([^;{}]+)/gi;
const PX_VAL_RE       = /(\d+)px/g;
const ALLOWED_PX      = new Set([
  0,1,2,3,4,6,8,10,12,14,16,20,24,28,32,40,48,56,64,72,80,96,128,
  160,192,200,210,216,220,240,256,320,480,640,768,1024,1200,1280,1440
]);

function checkArbitrarySpacing(cssLines, filePath, lineOffset = 0) {
  const cleaned = stripCSSComments(cssLines);
  cleaned.forEach((line, i) => {
    SPACING_PROP_RE.lastIndex = 0;
    let pm;
    while ((pm = SPACING_PROP_RE.exec(line)) !== null) {
      PX_VAL_RE.lastIndex = 0;
      let m;
      while ((m = PX_VAL_RE.exec(pm[1])) !== null) {
        const n = parseInt(m[1], 10);
        if (n !== 0 && n % 4 !== 0 && !ALLOWED_PX.has(n)) {
          warn(rel(filePath), lineOffset + i + 1,
            `Spacing "${m[0]}" is not a multiple of 4. Use a --space-* token.`);
        }
      }
    }
  });
}

// ─── 3. Border-radius > 8px or pill (50% / 100%) ─────────────────────────────
const RADIUS_RE  = /border-radius\s*:\s*([^;{]+)/gi;
const PX_IN_RADIUS = /(\d+)px/g;

function checkRadius(cssLines, filePath, lineOffset = 0) {
  const cleaned = stripCSSComments(cssLines);
  cleaned.forEach((line, i) => {
    const orig = cssLines[i] || '';
    RADIUS_RE.lastIndex = 0;
    let rm;
    while ((rm = RADIUS_RE.exec(line)) !== null) {
      const val = rm[1];
      PX_IN_RADIUS.lastIndex = 0;
      let pm;
      while ((pm = PX_IN_RADIUS.exec(val)) !== null) {
        if (parseInt(pm[1], 10) > 8) {
          err(rel(filePath), lineOffset + i + 1,
            `border-radius "${pm[0]}" exceeds max 8px. Use a --radius-* token.`);
        }
      }
      if (/\b(50|100)%/.test(val)) {
        if (/circle\s*:\s*ok/i.test(orig)) continue;
        warn(rel(filePath), lineOffset + i + 1,
          `border-radius "${val.trim()}" creates a pill/circle. ` +
          `Add /* circle:ok — [reason] */ on the same line if intentional.`);
      }
    }
  });
}

// ─── 4. Font-size below 12px (skips @media / @keyframes / @font-face) ─────────
const FONT_PROP_RE = /font-size\s*:\s*([^;{]+)/gi;
const PX_FONT_RE   = /(\d+\.?\d*)px/;
const REM_FONT_RE  = /(\d+\.?\d*)rem/;

function checkMinTextSize(cssLines, filePath, lineOffset = 0) {
  const cleaned = stripCSSComments(cssLines);
  const atMap   = buildAtRuleMap(cleaned);

  // Track ds-* annotation selector blocks (showcase-internal, not public text).
  // font-size violations inside these blocks are intentional and exempt.
  // dsBlockThreshold = brace depth at which we entered a ds-* block (-1 = not in one).
  let dsBlockThreshold = -1;
  let currentDepth = 0;

  cleaned.forEach((line, i) => {
    if (atMap[i]) return;  // inside @keyframes / @font-face — skip

    const opens  = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;

    // Detect entering a ds-* annotation block
    if (opens > 0 && dsBlockThreshold === -1) {
      const beforeBrace = line.slice(0, line.indexOf('{')).trim();
      if (/(?:^|[\s,])\.ds-/.test(beforeBrace)) {
        dsBlockThreshold = currentDepth;
      }
    }

    const inDsBlock = dsBlockThreshold !== -1;

    // Update depth, then check for ds-* block exit
    currentDepth += opens - closes;
    if (dsBlockThreshold !== -1 && currentDepth <= dsBlockThreshold) {
      dsBlockThreshold = -1;
    }

    if (inDsBlock) return;  // ds-* annotation block — not a public text declaration

    FONT_PROP_RE.lastIndex = 0;
    let fm;
    while ((fm = FONT_PROP_RE.exec(line)) !== null) {
      const val = fm[1].trim();
      const pxM = PX_FONT_RE.exec(val);
      if (pxM && parseFloat(pxM[1]) < 12) {
        err(rel(filePath), lineOffset + i + 1,
          `font-size "${pxM[0]}" is below the 12px minimum.`);
      }
      const remM = REM_FONT_RE.exec(val);
      if (remM && parseFloat(remM[1]) < 0.75) {
        err(rel(filePath), lineOffset + i + 1,
          `font-size "${remM[0]}" (${Math.round(parseFloat(remM[1]) * 16)}px) is below the 12px minimum.`);
      }
    }
  });
}

// ─── 5. <img> without alt ─────────────────────────────────────────────────────
function checkImgAlt(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    const imgRe = /<img\b([^>]*)>/gi;
    let m;
    while ((m = imgRe.exec(line)) !== null) {
      if (!/\balt\s*=/.test(m[1])) {
        err(rel(filePath), i + 1, '<img> missing alt attribute.');
      }
    }
  });
}

// ─── 6. Empty / icon-only links ───────────────────────────────────────────────
function checkEmptyLinks(htmlLines, filePath) {
  const joined = htmlLines.join('\n');
  const aRe = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = aRe.exec(joined)) !== null) {
    const tag     = m[0];
    const content = m[1];
    const line    = joined.slice(0, m.index).split('\n').length;
    if (/aria-label\s*=|aria-labelledby\s*=|title\s*=/.test(tag)) continue;
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (!text) {
      warn(rel(filePath), line, 'Link has no accessible name (empty text, no aria-label/title).');
    }
  }
}

// ─── 7. Icon-only buttons ─────────────────────────────────────────────────────
function checkEmptyButtons(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    if (/<button\b[^>]*>[\s]*<(?:svg|i|span|img)[^>]*>[\s]*<\/button>/i.test(line)) {
      if (!/aria-label\s*=|aria-labelledby\s*=|title\s*=/.test(line)) {
        warn(rel(filePath), i + 1,
          'Icon-only button has no accessible name (add aria-label or aria-labelledby).');
      }
    }
  });
}

// ─── 8. <input> / <select> / <textarea> without label ────────────────────────
function checkInputLabels(htmlLines, filePath) {
  const joined = htmlLines.join('\n');

  // Collect IDs referenced by <label for="">
  const forIds = new Set();
  const forRe  = /<label\b[^>]*\bfor\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = forRe.exec(joined)) !== null) forIds.add(m[1]);

  // Check <input>, <select>, and <textarea>
  // <input>      — self-closing; exclude type="hidden"
  // <select>     — paired; may have no type
  // <textarea>   — paired; may have no type
  const controlRe = /<(input|select|textarea)\b([^>]*)>/gi;
  while ((m = controlRe.exec(joined)) !== null) {
    const tag   = m[1].toLowerCase();
    const attrs = m[2];

    if (tag === 'input' && /\btype\s*=\s*["']hidden["']/i.test(attrs)) continue;
    if (/aria-label\s*=|aria-labelledby\s*=/.test(attrs)) continue;

    // Nested label (element is inside <label>...</label>)
    const pos    = m.index;
    const before = joined.slice(0, pos);
    const openLabels  = (before.match(/<label\b/gi)  || []).length;
    const closeLabels = (before.match(/<\/label>/gi) || []).length;
    if (openLabels > closeLabels) continue;

    const idM = /\bid\s*=\s*["']([^"']+)["']/.exec(attrs);
    if (idM && forIds.has(idM[1])) continue;

    const line = joined.slice(0, m.index).split('\n').length;
    err(rel(filePath), line,
      `<${tag}> has no associated label (no for=, aria-label, or wrapping <label>).`);
  }
}

// ─── 9. Malformed class attributes ───────────────────────────────────────────
const MALFORMED_CLASS_RE = /class="[^"]*\s+(style|aria-\w+|type|id|href|src|alt|role|tabindex)\s*=/i;

function checkMalformedClassAttrs(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    if (MALFORMED_CLASS_RE.test(line)) {
      err(rel(filePath), i + 1,
        'Malformed class attribute: another attribute name appears inside the class value.');
    }
  });
}

// ─── 10. Invalid interactive nesting ──────────────────────────────────────────
function checkInteractiveNesting(htmlLines, filePath) {
  const joined = htmlLines.join('\n');
  // Negative lookahead ensures the closing tag does not appear before the nested tag,
  // preventing false positives from sibling <a> and <button> elements.
  const re = /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?<button\b|<button\b[^>]*>(?:(?!<\/button>)[\s\S])*?<a\b/gi;
  let m;
  while ((m = re.exec(joined)) !== null) {
    const line = joined.slice(0, m.index).split('\n').length;
    err(rel(filePath), line,
      'Invalid interactive nesting: <a> inside <button> or <button> inside <a>.');
  }
}

// ─── 11. <button> missing type ────────────────────────────────────────────────
function checkButtonType(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    const btnRe = /<button\b([^>]*)>/gi;
    let m;
    while ((m = btnRe.exec(line)) !== null) {
      if (!/\btype\s*=/.test(m[1])) {
        err(rel(filePath), i + 1,
          '<button> missing explicit type attribute (type="button" or type="submit").');
      }
    }
  });
}

// ─── 12. Obsolete WCAG phrase in HTML ────────────────────────────────────────
// Matches "14px bold" UNLESS followed by "does NOT" (the corrective phrasing).
// Also matches "18px regular" as the obsolete threshold claim.
const OBSOLETE_WCAG_HTML = [
  { re: /14px\s+bold(?!\s+does\s+NOT)/i,
    msg: 'Obsolete WCAG phrase "14px bold" used as large-text exception. Correct: >=18.67px at weight >=700.' },
  { re: /18px\+?\s+regular/i,
    msg: 'Obsolete WCAG threshold "18px regular". Correct large-text threshold is 24px regular.' },
];

function checkObsoleteWCAG(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    OBSOLETE_WCAG_HTML.forEach(({ re, msg }) => {
      if (re.test(line)) err(rel(filePath), i + 1, msg);
    });
  });
}

// ─── 13. Duplicate headings / version footers in .md ─────────────────────────
function checkMarkdownDuplicates(mdLines, filePath) {
  let inCode = false;
  const liveLines = mdLines.map(line => {
    if (/^```/.test(line.trim())) { inCode = !inCode; return ''; }
    return inCode ? '' : line;
  });

  const counts = {};
  liveLines.forEach(line => {
    const hm = /^(#{1,6}\s+.+)/.exec(line);
    if (hm) {
      const h = hm[1].trim();
      counts[h] = (counts[h] || 0) + 1;
    }
  });
  for (const [h, n] of Object.entries(counts)) {
    if (n > 1) {
      err(rel(filePath), 1,
        `Duplicate heading "${h.slice(0, 60)}" appears ${n}x — remove duplicate section.`);
    }
  }

  const verRe    = /Fenovera Design System.*v\d+\.\d+/i;
  const verCount = liveLines.filter(l => verRe.test(l)).length;
  if (verCount > 1) {
    err(rel(filePath), 1,
      `Multiple version footers (${verCount}) — remove duplicate document endings.`);
  }
}

// ─── 14. Backup / temp files ──────────────────────────────────────────────────
// Packaged archives are external deliverables and must not live inside the design-system tree
const BAK_PATTERNS = [/\.bak$/i, /\.tmp$/i, /\.old$/i, /~$/, /\.sw[opqrst]$/i, /\.orig$/i,
                      /\.zip$/i, /\.tar$/i, /\.tar\.gz$/i, /\.tgz$/i];

function checkBackupFiles(dir) {
  const found = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const f of fs.readdirSync(d)) {
      if (SKIP.some(s => f === s)) continue;
      const full = path.join(d, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) { walk(full); continue; }
      if (BAK_PATTERNS.some(re => re.test(f))) found.push(full);
    }
  }
  walk(dir);
  return found;
}

// ─── 15. NUL bytes / 16. Content after </html> ───────────────────────────────
function checkFileIntegrity(filePath) {
  const raw = fs.readFileSync(filePath);
  if (raw.includes(0x00)) {
    err(rel(filePath), 1, 'File contains NUL bytes (0x00).');
  }
  if (filePath.endsWith('.html') || filePath.endsWith('.htm')) {
    const text  = raw.toString('utf8');
    const match = /(<\/html>)([\s\S]+)$/i.exec(text);
    if (match && match[2].trim().length > 0) {
      const line = text.slice(0, match.index).split('\n').length;
      err(rel(filePath), line, 'Content found after </html>.');
    }
  }
}

// ─── 17. Missing structural tags ─────────────────────────────────────────────
function checkHTMLStructure(filePath) {
  if (!filePath.endsWith('.html') && !filePath.endsWith('.htm')) return;
  const text = fs.readFileSync(filePath, 'utf8');
  if (!/<\/body>/i.test(text))   err(rel(filePath), 1, 'Missing </body> tag.');
  if (!/<\/html>/i.test(text))   err(rel(filePath), 1, 'Missing </html> tag.');
  // Count <script> vs </script>
  const opens  = (text.match(/<script\b/gi)  || []).length;
  const closes = (text.match(/<\/script>/gi) || []).length;
  if (opens !== closes) {
    err(rel(filePath), 1,
      `Mismatched <script> tags: ${opens} open, ${closes} close.`);
  }
}

// ─── 18. JavaScript syntax ───────────────────────────────────────────────────
function checkJSSyntax(filePath) {
  const lines  = readLines(filePath);
  const blocks = extractScriptBlocks(lines);
  if (blocks.length === 0) return;
  blocks.forEach((block, idx) => {
    const tmp = require('os').tmpdir() + `/gc_jssyntax_${idx}.js`;
    const src = block.lines
      .map(l => l.replace(/<\/?script[^>]*>/gi, ''))
      .join('\n');
    fs.writeFileSync(tmp, src, 'utf8');
    try {
      execSync(`node --check "${tmp}"`, { stdio: 'pipe' });
      console.log(`  ${GREEN}OK${RESET}  Script ${idx + 1}/${blocks.length} in ${rel(filePath)}`);
    } catch (e) {
      err(rel(filePath), block.startLine,
        `Script ${idx + 1}/${blocks.length} syntax error:\n${e.stderr.toString().trim()}`);
    } finally {
      try { fs.unlinkSync(tmp); } catch (_) {}
    }
  });
}

// ─── 19. Class contracts (responsive-proof.html vs components.css / base.css) ─
/**
 * Extracts all class names from CSS selectors, handling:
 *   - Grouped selectors:  a, .foo, .bar { }  -> .foo, .bar extracted
 *   - Pseudo-classes:     .btn:hover         -> .btn extracted
 *   - Pseudo-elements:    .icon::before      -> .icon extracted
 *   - Combinators:        .a > .b            -> .a, .b extracted
 */
function extractCSSClassNames(cssText) {
  const defined = new Set();
  // Remove comments first
  const stripped = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  // Match selector blocks: everything before the opening {
  const blockRe = /([^{}]+)\{[^}]*\}/g;
  let bm;
  while ((bm = blockRe.exec(stripped)) !== null) {
    const selectorList = bm[1].trim();
    // Split grouped selectors on commas (simple split — handles most cases)
    const selectors = selectorList.split(',');
    selectors.forEach(sel => {
      // Extract class names from each individual selector
      const clsRe = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
      let cm;
      while ((cm = clsRe.exec(sel)) !== null) {
        defined.add(cm[1]);
      }
    });
  }
  return defined;
}

function checkComponentClasses() {
  const cssPath  = path.join(DS_DIR, 'components.css');
  const basePath = path.join(DS_DIR, 'base.css');

  if (!fs.existsSync(cssPath)) {
    err(rel(cssPath), 1, 'components.css not found — cannot check class contracts.');
    return;
  }

  const cssText  = fs.readFileSync(cssPath,  'utf8');
  const baseText = fs.existsSync(basePath) ? fs.readFileSync(basePath, 'utf8') : '';
  // System classes defined in the shared design-system CSS files
  const systemClasses = new Set([
    ...extractCSSClassNames(cssText),
    ...extractCSSClassNames(baseText),
  ]);

  // Files to audit and their allowed scaffold-class prefixes
  // rp-* → responsive-proof.html layout scaffold (not production components)
  // ds-* → showcase.html annotation/viewer scaffold (not production components)
  const AUDIT_TARGETS = [
    { file: 'responsive-proof.html', scaffoldPrefix: 'rp-' },
    { file: 'showcase.html',         scaffoldPrefix: 'ds-' },
  ];

  let m;
  AUDIT_TARGETS.forEach(({ file, scaffoldPrefix }) => {
    const htmlPath = path.join(DS_DIR, file);
    if (!fs.existsSync(htmlPath)) {
      warn(rel(htmlPath), 1, `${file} not found — skipping class contract check.`);
      return;
    }

    const htmlText = fs.readFileSync(htmlPath, 'utf8');

    // Classes defined in the file's own <style> blocks are locally valid
    const localClasses = new Set();
    const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let sm;
    while ((sm = styleRe.exec(htmlText)) !== null) {
      for (const cls of extractCSSClassNames(sm[1])) localClasses.add(cls);
    }

    // A class is "defined" if it appears in the system CSS or the file's own CSS
    const definedClasses = new Set([...systemClasses, ...localClasses]);

    const usedClasses = new Set();
    const classAttrRe = /\bclass="([^"]*)"/g;
    while ((m = classAttrRe.exec(htmlText)) !== null) {
      for (const cls of m[1].trim().split(/\s+/)) {
        if (cls) usedClasses.add(cls);
      }
    }

    const unknown = [];
    for (const cls of usedClasses) {
      if (cls.startsWith(scaffoldPrefix)) continue;
      if (!definedClasses.has(cls)) unknown.push(cls);
    }

    const relPath = rel(htmlPath);
    if (unknown.length > 0) {
      unknown.sort().forEach(cls => {
        err(relPath, 1,
          `Class "${cls}" used in ${file} is not defined in components.css, base.css, or the file's own <style> block.`);
      });
    } else {
      console.log(
        `  ${GREEN}OK${RESET}  Check 19 — All ${usedClasses.size} class references in ${file} resolve in components.css / base.css / inline styles`
      );
    }
  });
}

// ─── 20. --color-ink-tertiary in informational selectors ─────────────────────
const INFORMATIONAL_SELECTORS = [
  '.mega-menu__group-label',
  '.mega-menu__link-series',
  '.mobile-nav__submenu-label',
  '.breadcrumbs',
  '.form-hint',
  '.input::placeholder',
  '.checkbox-label__hint',
  '.radio-label__hint',
  '.file-upload__hint',
  '.file-upload__file-size',
  '.product-card__series',
  '.cert-link__meta',
  '.swatch__code',
  '.hardware-option__brand',
  '.quote-form__privacy',
  '.download-block__meta',
  '.field-validation--hint',
];

function checkInkTertiaryInfoSelectors() {
  const cssPath = path.join(DS_DIR, 'components.css');
  if (!fs.existsSync(cssPath)) return;

  const cssText  = fs.readFileSync(cssPath, 'utf8');
  const relPath  = rel(cssPath);
  let violations = 0;

  // Build a set for O(1) lookup
  const infoSet = new Set(INFORMATIONAL_SELECTORS);

  // Scan every CSS rule block, split grouped selectors, then check
  // This handles: .a, .form-hint { color: var(--color-ink-tertiary); }
  const stripped = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  const ruleRe   = /([^{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = ruleRe.exec(stripped)) !== null) {
    const ruleBody = m[2];
    if (!ruleBody.includes('--color-ink-tertiary')) continue;

    const selectors = m[1].split(',').map(s => s.trim().replace(/::?[\w-]+/g, '').trim());
    for (const sel of selectors) {
      if (infoSet.has(sel)) {
        violations++;
        err(relPath, 1,
          `${sel} uses --color-ink-tertiary for informational text — must use --color-ink-secondary.`);
      }
    }
  }

  if (violations === 0) {
    console.log(`  ${GREEN}OK${RESET}  Check 20 — No --color-ink-tertiary in informational text selectors`);
  }
}


// ─── Inline style= hex values in HTML ─────────────────────────────────────────
const INLINE_HEX_RE = /style\s*=\s*["'][^"']*#([0-9a-fA-F]{3,8})\b[^"']*["']/gi;

function checkInlineStyleHex(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    if (/data-ds-exempt/i.test(line)) return; // annotated exemption
    INLINE_HEX_RE.lastIndex = 0;
    if (INLINE_HEX_RE.test(line)) {
      err(rel(filePath), i + 1,
        'Inline style contains raw hex — use a CSS custom property from tokens.css.');
    }
    INLINE_HEX_RE.lastIndex = 0;
  });
}

// ─── 21. SVG fill / stroke raw hex in HTML ────────────────────────────────────
/**
 * Flags SVG fill= and stroke= attributes that use raw hex values, and inline
 * styles with fill/stroke hex values. All SVG colours should use currentColor
 * or a CSS custom property.
 */
const SVG_ATTR_HEX_RE   = /\b(fill|stroke)\s*=\s*["']#([0-9a-fA-F]{3,8})["']/gi;
const SVG_STYLE_HEX_RE  = /style\s*=\s*["'][^"']*(?:fill|stroke)\s*:\s*#[0-9a-fA-F]{3,8}[^"']*["']/gi;

function checkSVGColors(htmlLines, filePath) {
  htmlLines.forEach((line, i) => {
    if (/data-ds-exempt/i.test(line)) return; // annotated exemption
    if (SVG_ATTR_HEX_RE.test(line)) {
      err(rel(filePath), i + 1,
        `SVG fill/stroke attribute uses raw hex — use currentColor or a CSS custom property.`);
    }
    SVG_ATTR_HEX_RE.lastIndex = 0;
    if (SVG_STYLE_HEX_RE.test(line)) {
      err(rel(filePath), i + 1,
        `Inline style with SVG fill/stroke hex color — use a CSS custom property or currentColor.`);
    }
    SVG_STYLE_HEX_RE.lastIndex = 0;
  });
}

// ─── 22. Obsolete WCAG language in Markdown ───────────────────────────────────
const OBSOLETE_WCAG_MD = [
  { re: /14px\s+bold(?!\s+does\s+NOT)/i,
    msg: 'Obsolete WCAG phrase "14px bold" in Markdown. Correct: >=18.67px at weight >=700.' },
  { re: /18px\+?\s+regular/i,
    msg: 'Obsolete WCAG threshold "18px regular" in Markdown. Correct large-text threshold is 24px regular.' },
  { re: /large.?text\s*[=:]\s*18px/i,
    msg: 'Obsolete WCAG large-text definition "18px" in Markdown.' },
];

function checkMarkdownWCAG(mdLines, filePath) {
  let inCode = false;
  mdLines.forEach((line, i) => {
    if (/^```/.test(line.trim())) { inCode = !inCode; return; }
    if (inCode) return;
    // Strip inline code spans (` ... `) — quoted examples should not trigger
    // Strip single and double backtick inline code spans before pattern matching
    const stripped = line.replace(/``[^`]+``|`[^`]+`/g, ' ');
    OBSOLETE_WCAG_MD.forEach(({ re, msg }) => {
      if (re.test(stripped)) err(rel(filePath), i + 1, msg);
    });
  });
}

// ─── 23. HTML ID / reference integrity ───────────────────────────────────────
/**
 * Verifies that every aria-controls, aria-labelledby, aria-describedby, and
 * for= attribute references an ID that exists in the same HTML file.
 */
const REF_ATTRS = [
  { re: /\baria-controls\s*=\s*["']([^"']+)["']/gi,     attr: 'aria-controls'     },
  { re: /\baria-labelledby\s*=\s*["']([^"']+)["']/gi,   attr: 'aria-labelledby'   },
  { re: /\baria-describedby\s*=\s*["']([^"']+)["']/gi,  attr: 'aria-describedby'  },
  { re: /\bfor\s*=\s*["']([^"']+)["']/gi,               attr: 'for'               },
];

function checkIDReferences(htmlLines, filePath) {
  const joined = htmlLines.join('\n');

  // Collect all IDs in this file
  const ids   = new Set();
  const idRe  = /\bid\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = idRe.exec(joined)) !== null) {
    ids.add(m[1].trim());
  }

  // Check each reference attribute
  REF_ATTRS.forEach(({ re, attr }) => {
    re.lastIndex = 0;
    while ((m = re.exec(joined)) !== null) {
      const line = joined.slice(0, m.index).split('\n').length;
      // Space-separated ID lists (aria-labelledby, aria-describedby)
      const refs = m[1].trim().split(/\s+/);
      refs.forEach(ref => {
        if (ref && !ids.has(ref)) {
          err(rel(filePath), line,
            `${attr}="${ref}" — no element with id="${ref}" found in this file.`);
        }
      });
    }
  });
}

// ─── 24. Duplicate id= attributes in HTML ────────────────────────────────────
function checkDuplicateIDs(htmlLines, filePath) {
  const joined = htmlLines.join('\n');
  const idRe   = /\bid\s*=\s*["']([^"']+)["']/gi;
  const counts = {};
  let m;
  while ((m = idRe.exec(joined)) !== null) {
    const id = m[1].trim();
    counts[id] = (counts[id] || 0) + 1;
  }
  for (const [id, n] of Object.entries(counts)) {
    if (n > 1) {
      err(rel(filePath), 1, `Duplicate id="${id}" appears ${n} times — IDs must be unique per document.`);
    }
  }
}

// ─── 26. Link integrity (relative, root-relative, and fragment links) ─────────
/**
 * Audits href= and src= attributes in HTML files:
 *
 *   ./  and ../  paths    — resolved to filesystem; error if missing.
 *   /path/  root-relative — resolved relative to ROOT; directory routes
 *                           (/foo/) resolve to /foo/index.html; missing = warn
 *                           in dev mode, error with --strict.
 *   #id  fragment-only    — ID must exist in the same file; warn if missing.
 *   External / mailto / tel / data / protocol-relative — skipped entirely.
 *   Bare relative (no prefix) — skipped to avoid false positives.
 *
 * Applies to all HTML files (DS-internal and --html= targets).
 */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function checkLinks(htmlLines, filePath) {
  const htmlDir = path.dirname(filePath);
  const joined  = htmlLines.join('\n');
  const linkRe  = /\b(?:href|src)\s*=\s*["']([^"']*)/gi;
  let m;
  let errorCount = 0;
  let warnCount  = 0;

  while ((m = linkRe.exec(joined)) !== null) {
    const rawVal = m[1];
    if (!rawVal) continue;

    const lineNo = joined.slice(0, m.index).split('\n').length;

    // Split into pathPart and fragmentId
    let fragmentId = '';
    let pathPart   = rawVal;
    const hashIdx  = rawVal.indexOf('#');
    if (hashIdx !== -1) {
      fragmentId = rawVal.slice(hashIdx + 1);
      pathPart   = rawVal.slice(0, hashIdx);
    }
    // Strip query string from pathPart
    const qIdx = pathPart.indexOf('?');
    if (qIdx !== -1) pathPart = pathPart.slice(0, qIdx);

    // ── Fragment-only link (href="#id") ───────────────────────────────────
    if (!pathPart && fragmentId) {
      const idPat = new RegExp('\\bid\\s*=\\s*["\']' + escapeRegex(fragmentId) + '["\']');
      if (!idPat.test(joined)) {
        warn(rel(filePath), lineNo,
          `Check 26 — Fragment link "#${fragmentId}" — no element with id="${fragmentId}" found in this file.`);
        warnCount++;
      }
      continue;
    }

    if (!pathPart) continue;

    // ── Skip external / mailto / tel / data / protocol-relative ──────────
    if (/^(?:https?:|mailto:|tel:|data:|\/\/)/i.test(pathPart)) continue;

    // ── Explicit relative: ./ or ../ ─────────────────────────────────────
    if (pathPart.startsWith('./') || pathPart.startsWith('../')) {
      const resolved = path.resolve(htmlDir, pathPart);
      if (!fs.existsSync(resolved)) {
        err(rel(filePath), lineNo,
          `Check 26 — Broken relative link: "${rawVal}" — file not found.`);
        errorCount++;
      }
      continue;
    }

    // ── Root-relative: starts with / ─────────────────────────────────────
    if (pathPart.startsWith('/')) {
      // Directory route: /foo/ → ROOT/foo/index.html
      const subpath = pathPart.slice(1); // strip leading /
      let resolved;
      if (pathPart.endsWith('/')) {
        resolved = path.join(ROOT, subpath, 'index.html');
      } else {
        resolved = path.join(ROOT, subpath);
      }
      if (!fs.existsSync(resolved)) {
        warn(rel(filePath), lineNo,
          `Check 26 — Root-relative link "${pathPart}" not found ` +
          `(${path.relative(ROOT, resolved).replace(/\\/g, '/')}) — ` +
          `unbuilt route [dev-warn; error with --strict].`);
        warnCount++;
      }
      continue;
    }

    // Bare relative (no prefix) — skip
  }

  if (errorCount === 0 && warnCount === 0) {
    console.log(`  ${GREEN}OK${RESET}  Check 26 — All links valid (${rel(filePath)})`);
  }
}

// ─── 29. Exactly one site-header and site-footer per generated page ───────────
/**
 * Build-generated --html= pages must contain exactly one <header class="site-header">
 * and one <footer class="site-footer">. Catches missing template injection or
 * duplicate component composition errors.
 */
function checkSingleHeaderFooter(htmlLines, filePath) {
  const joined = htmlLines.join('\n');
  let issues   = 0;

  const headerCount = (joined.match(/<header\b[^>]*\bsite-header\b/g) || []).length;
  const footerCount = (joined.match(/<footer\b[^>]*\bsite-footer\b/g) || []).length;

  if (headerCount !== 1) {
    err(rel(filePath), 1,
      `Check 29 — Expected exactly 1 <header class="site-header">, found ${headerCount}.`);
    issues++;
  }
  if (footerCount !== 1) {
    err(rel(filePath), 1,
      `Check 29 — Expected exactly 1 <footer class="site-footer">, found ${footerCount}.`);
    issues++;
  }
  if (issues === 0) {
    console.log(`  ${GREEN}OK${RESET}  Check 29 — Exactly one site-header and site-footer (${rel(filePath)})`);
  }
}

// ─── 30. aria-current="page" correctness ────────────────────────────────────
/**
 * For pages with <body data-page="…">, exactly one <a aria-current="page">
 * must exist in the document (verifies build-time template token resolution).
 * Breadcrumb aria-current is typically on <li>, not <a>, so it is not counted.
 * Applied to --html= pages with a data-page body attribute.
 */
function checkAriaCurrent(htmlLines, filePath) {
  const joined = htmlLines.join('\n');

  // Only check pages that declare a data-page (build-generated pages)
  const bodyM  = /<body\b[^>]*\bdata-page\s*=\s*["']([^"']+)["']/i.exec(joined);
  if (!bodyM) return;
  const pageId = bodyM[1].trim();

  const count = (joined.match(/<a\b[^>]*\baria-current\s*=\s*["']page["'][^>]*>/gi) || []).length;

  if (count === 0) {
    err(rel(filePath), 1,
      `Check 30 — No <a aria-current="page"> found for data-page="${pageId}" — template token may not have resolved.`);
  } else if (count > 1) {
    warn(rel(filePath), 1,
      `Check 30 — Found ${count} <a aria-current="page"> links for data-page="${pageId}" — expected exactly 1.`);
  } else {
    console.log(`  ${GREEN}OK${RESET}  Check 30 — aria-current="page" correctly resolved for data-page="${pageId}" (${rel(filePath)})`);
  }
}

// ─── 31. Canonical URL policy ────────────────────────────────────────────────
/**
 * --html= pages that are not marked noindex must include <link rel="canonical">.
 * noindex pages are development builds not intended for public indexing and
 * are exempt from this requirement.
 * DS-internal demo pages (showcase.html, responsive-proof.html) are never
 * passed via --html= and are not affected.
 */
function checkCanonical(htmlLines, filePath) {
  const joined = htmlLines.join('\n');

  if (/<meta[^>]+content="[^"]*noindex/i.test(joined)) {
    console.log(`  ${GREEN}OK${RESET}  Check 31 — noindex page exempt from canonical requirement (${rel(filePath)})`);
    return;
  }

  if (!/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/i.test(joined)) {
    err(rel(filePath), 1,
      `Check 31 — Non-noindex page missing <link rel="canonical"> — add before launch.`);
  } else {
    console.log(`  ${GREEN}OK${RESET}  Check 31 — <link rel="canonical"> present (${rel(filePath)})`);
  }
}

// ─── 32. Sitemap inclusion ───────────────────────────────────────────────────
/**
 * --html= pages that are not marked noindex must appear in sitemap.xml at the
 * project root (ROOT). The page's canonical URL (from <link rel="canonical">)
 * is used for the lookup. noindex pages are exempt.
 * If no canonical URL is found, this check is skipped (Check 31 already flags it).
 */
function checkSitemapInclusion(htmlLines, filePath) {
  const joined = htmlLines.join('\n');

  if (/<meta[^>]+content="[^"]*noindex/i.test(joined)) {
    console.log(`  ${GREEN}OK${RESET}  Check 32 — noindex page exempt from sitemap requirement (${rel(filePath)})`);
    return;
  }

  // Extract canonical URL
  const canonM = /<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*\bhref\s*=\s*["']([^"']+)["']/i.exec(joined) ||
                 /<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*\brel\s*=\s*["']canonical["']/i.exec(joined);
  if (!canonM) return; // No canonical URL — Check 31 already flags missing canonical

  const canonicalUrl = canonM[1].trim();
  const sitemapPath  = path.join(ROOT, 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    err(rel(filePath), 1,
      `Check 32 — sitemap.xml not found at project root — add sitemap before launch.`);
    return;
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(canonicalUrl)) {
    err(rel(filePath), 1,
      `Check 32 — "${canonicalUrl}" not found in sitemap.xml — add URL to sitemap before launch.`);
  } else {
    console.log(`  ${GREEN}OK${RESET}  Check 32 — Sitemap includes canonical URL (${rel(filePath)})`);
  }
}

// ─── 27. Missing <title> or <meta name="description"> ────────────────────────
/**
 * Applied to --html= pages only (not DS-internal showcase/responsive-proof).
 * Each product/overview/content page must have a non-empty <title> and a
 * non-empty <meta name="description"> for basic SEO and accessibility hygiene.
 */
function checkTitleAndMeta(htmlLines, filePath) {
  const joined = htmlLines.join('\n');
  let issues   = 0;

  // Non-empty <title>
  const titleM = /<title[^>]*>([^<]*)<\/title>/i.exec(joined);
  if (!titleM || !titleM[1].trim()) {
    err(rel(filePath), 1, 'Check 27 — Missing or empty <title> element.');
    issues++;
  }

  // <meta name="description" content="…"> with non-empty content
  const metaRe = /<meta\s[^>]*name\s*=\s*["']description["'][^>]*>/i;
  const metaM  = metaRe.exec(joined);
  if (!metaM) {
    err(rel(filePath), 1, 'Check 27 — Missing <meta name="description"> element.');
    issues++;
  } else {
    const contentM = /content\s*=\s*["']([^"']*)["']/i.exec(metaM[0]);
    if (!contentM || !contentM[1].trim()) {
      err(rel(filePath), 1, 'Check 27 — Empty <meta name="description"> content attribute.');
      issues++;
    }
  }

  if (issues === 0) {
    console.log(`  ${GREEN}OK${RESET}  Check 27 — <title> and <meta name="description"> present and non-empty (${rel(filePath)})`);
  }
}

// ─── 28. Exactly one <h1> per page ───────────────────────────────────────────
/**
 * Applied to --html= pages only. Each content page must have exactly one
 * primary heading for document structure, SEO, and accessibility.
 */
function checkSingleH1(htmlLines, filePath) {
  const joined  = htmlLines.join('\n');
  const matches = joined.match(/<h1[\s>]/gi);
  const count   = matches ? matches.length : 0;

  if (count !== 1) {
    err(rel(filePath), 1,
      `Check 28 — Expected exactly 1 <h1>, found ${count} — each page must have exactly one primary heading.`);
  } else {
    console.log(`  ${GREEN}OK${RESET}  Check 28 — Exactly one <h1> found (${rel(filePath)})`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// RUNNER
// ═══════════════════════════════════════════════════════════════════════════════

const MODE = STRICT ? ' [--strict]' : '';
console.log(`\n${BOLD}Fenovera Design System — Governance Check  v1.9${MODE}${RELEASE ? ' [--release]' : ''}${RESET}`);
console.log(`Root: ${ROOT}\n`);

// ── CSS files ─────────────────────────────────────────────────────────────────
const cssFiles = walkDir(DS_DIR, f => f.endsWith('.css'));
console.log(`${BOLD}CSS Files (${cssFiles.length})${RESET}`);
cssFiles.forEach(f => {
  const lines = readLines(f);
  checkRawHex(lines, f);
  checkArbitrarySpacing(lines, f);
  checkRadius(lines, f);
  checkMinTextSize(lines, f);
});

// ── HTML files ────────────────────────────────────────────────────────────────
const htmlFiles = walkDir(DS_DIR, f => f.endsWith('.html') || f.endsWith('.htm'));
// --html=<paths>: include extra HTML files (e.g. product pages outside DS dir)
if (HTML_ARG) {
  HTML_ARG.slice(7).split(',').forEach(function (p) {
    const abs = path.resolve(ROOT, p.trim());
    if (fs.existsSync(abs) && !htmlFiles.includes(abs)) htmlFiles.push(abs);
  });
}
console.log(`\n${BOLD}HTML Files (${htmlFiles.length})${RESET}`);
htmlFiles.forEach(f => {
  const lines = readLines(f);
  checkImgAlt(lines, f);
  checkEmptyLinks(lines, f);
  checkEmptyButtons(lines, f);
  checkInputLabels(lines, f);
  checkInlineStyleHex(lines, f);
  checkMalformedClassAttrs(lines, f);
  checkInteractiveNesting(lines, f);
  checkButtonType(lines, f);
  checkObsoleteWCAG(lines, f);
  checkSVGColors(lines, f);
  checkIDReferences(lines, f);
  checkDuplicateIDs(lines, f);
  checkLinks(lines, f);            // Check 26
  // CSS inside <style> blocks
  extractStyleBlocks(lines).forEach(({ lines: cssLines, startLine }) => {
    checkRawHex(cssLines, f, startLine);
    checkArbitrarySpacing(cssLines, f, startLine);
    checkRadius(cssLines, f, startLine);
    checkMinTextSize(cssLines, f, startLine);
  });
});

// ── Backup / temp ─────────────────────────────────────────────────────────────
const bakFiles = checkBackupFiles(DS_DIR);
if (bakFiles.length) {
  console.log(`\n${BOLD}Backup / Temp Files${RESET}`);
  bakFiles.forEach(f => err(rel(f), 1,
    `Backup/temp/archive file should not ship inside the design-system tree: ${path.basename(f)}`));
} else {
  console.log(`\n${BOLD}Backup / Temp Files — none${RESET}`);
}

// ── File integrity (NUL, content-after-html, structure) ───────────────────────
console.log(`\n${BOLD}File Integrity${RESET}`);
htmlFiles.forEach(f => {
  checkFileIntegrity(f);
  checkHTMLStructure(f);
});

// ── JavaScript syntax ─────────────────────────────────────────────────────────
console.log(`\n${BOLD}JavaScript Syntax${RESET}`);
htmlFiles.forEach(f => checkJSSyntax(f));

// ── Markdown ──────────────────────────────────────────────────────────────────
const mdFiles = walkDir(DS_DIR, f => f.endsWith('.md'));
console.log(`\n${BOLD}Markdown Files (${mdFiles.length})${RESET}`);
mdFiles.forEach(f => {
  const lines = readLines(f);
  checkMarkdownDuplicates(lines, f);
  checkMarkdownWCAG(lines, f);
});

// ── Check 19: Component class contracts (responsive-proof.html + showcase.html) ──
console.log(`\n${BOLD}Component Class Contracts (Check 19)${RESET}`);
checkComponentClasses();

// ── Check 20: Informational selector color tokens ─────────────────────────────
console.log(`\n${BOLD}Informational Selector Color Tokens (Check 20)${RESET}`);
checkInkTertiaryInfoSelectors();   // hardcoded selector list in components.css
// Check 20 expanded: scan page-level <style> blocks in all HTML files
let check20HtmlViolations = 0;
htmlFiles.forEach(f => {
  const lines  = readLines(f);
  const blocks = extractStyleBlocks(lines);
  blocks.forEach(({ lines: cssLines, startLine }) => {
    const stripped = stripCSSComments(cssLines);
    stripped.forEach((line, i) => {
      if (/\bcolor\s*:\s*var\s*\(\s*--color-ink-tertiary\s*\)/.test(line)) {
        warn(rel(f), startLine + i,
          'Check 20 — color: var(--color-ink-tertiary) in page <style> block — use --color-ink-secondary for readable text.');
        check20HtmlViolations++;
      }
    });
  });
});
if (check20HtmlViolations === 0) {
  console.log(`  ${GREEN}OK${RESET}  Check 20 — No --color-ink-tertiary in page-level <style> blocks`);
}

// ── Check 25: Release blockers (--release mode) ───────────────────────────────
if (RELEASE) {
  console.log(`\n${BOLD}Release Blockers (Check 25)${RESET}`);
  const BLOCKER_RULES = [
    { re: /\[[\w /&]+TO VERIFY\]/,                 label: 'Unverified data placeholder' },
    { re: /\[FILENAME\]/,                           label: 'Filename placeholder' },
    { re: /000-000-0000/,                           label: 'Fake phone number' },
    { re: /class="[^"]*dev-notice[^"]*"/,           label: 'Development notice banner (.dev-notice)' },
    { re: /handleQuoteSubmit/,                      label: 'Fake form-submission handler' },
    // Single consolidated pattern: one <meta name="robots"> tag → one blocker.
    // Matches content="noindex" and content="noindex, nofollow" on the same element.
    { re: /<meta[^>]+content="[^"]*noindex/i,        label: 'noindex robots directive' },
    // Quote-form unconnected markers — both must be absent before launch
    { re: /id="form-dev-notice"/,                   label: 'Unconnected quote form — development notice element present (id="form-dev-notice")' },
    { re: /REPLACE THIS BLOCK with a fetch\(\)/,    label: 'Unconnected quote form — simulated network-error block not replaced with real fetch()' },
  ];
  // Scope: only the files explicitly named via --html=<paths>.
  // DS-internal HTML (showcase.html, responsive-proof.html), DS Markdown docs,
  // screenshots and test fixtures are never audited for release blockers.
  const releaseTargets = HTML_ARG
    ? HTML_ARG.slice(7).split(',')
        .map(function (p) { return path.resolve(ROOT, p.trim()); })
        .filter(function (f) { return fs.existsSync(f); })
    : [];
  if (releaseTargets.length === 0) {
    console.log('  (no --html= targets supplied; nothing to audit)');
  }
  releaseTargets.forEach(function (f) {
    const text = fs.readFileSync(f, 'utf8');
    BLOCKER_RULES.forEach(function (rule) {
      if (rule.re.test(text)) {
        err(rel(f), 1, `Release blocker — ${rule.label} — resolve before launch`);
      }
    });
  });
}

// ── Checks 27–32: Page structure + generated page validation (--html= pages) ─
if (HTML_ARG) {
  const structTargets = HTML_ARG.slice(7).split(',')
    .map(function (p) { return path.resolve(ROOT, p.trim()); })
    .filter(function (f) { return fs.existsSync(f); });
  if (structTargets.length > 0) {
    console.log(`\n${BOLD}Page Structure (Checks 27–32, --html= pages)${RESET}`);
    structTargets.forEach(function (f) {
      const lines = readLines(f);
      checkTitleAndMeta(lines, f);       // Check 27
      checkSingleH1(lines, f);           // Check 28
      checkSingleHeaderFooter(lines, f); // Check 29
      checkAriaCurrent(lines, f);        // Check 30
      checkCanonical(lines, f);          // Check 31
      checkSitemapInclusion(lines, f);   // Check 32
    });
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(60)}`);
if (totalErrors === 0 && totalWarnings === 0) {
  console.log(`${GREEN}${BOLD}✓ No violations found.${RESET}`);
} else {
  if (totalErrors   > 0) console.log(`${RED}${BOLD}✗ ${totalErrors} error(s)${RESET}`);
  if (totalWarnings > 0) console.log(`${YELLOW}${BOLD}⚠ ${totalWarnings} warning(s)${RESET}`);
}
console.log(`${'─'.repeat(60)}\n`);
process.exit(totalErrors > 0 ? 1 : 0);
