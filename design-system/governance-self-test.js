#!/usr/bin/env node
/**
 * Fenovera Design System — Governance Self-Test
 * Version: 1.5.0
 *
 * Verifies that governance-check.js correctly detects every one of its
 * 32 rule violations.  For each check the self-test:
 *   1. Builds a minimal fixture directory containing exactly one violation.
 *   2. Runs: node governance-check.js --root=<fixture> --strict
 *      (or with custom args for checks that require different flags)
 *   3. Asserts the expected error substring appears in the output.
 *
 * Some checks have multiple fixtures (8a/8b/8c, 19a/19b, 20/20g/20b, 24,
 * 25/25b/25c/25d/25e/25-noindex, 26/26b/26c/26d/26e/26f, 27, 28, 29, 30,
 * 31/31-noindex, 32) — 49 total.
 * Checks 25/25b/25c use --release instead of --strict.
 * Checks 25d/25e test Check 25 scope (--html= inclusion/exclusion).
 * Check 25-noindex verifies consolidated noindex rule (one meta tag → one blocker).
 * Checks 26b–26f test expanded Check 26 (root-relative, fragment, external).
 * Checks 27 and 28 use --html= without --release (runFixtureHtmlDev runner).
 * Checks 29, 30, 31, 31-noindex, 32 use runFixtureHtmlDev or runFixtureHtmlWithRootFiles.
 *
 * The test suite FAILS IMMEDIATELY if governance-check.js fails node --check,
 * because broken syntax would make all 49 sub-tests meaningless.
 *
 * Exit 0 — all 49 violations detected / absences confirmed.
 * Exit 1 — one or more checks missed, OR governance-check.js has a syntax error.
 *
 * Run: node design-system/governance-self-test.js
 */

'use strict';

const fs    = require('fs');
const path  = require('path');
const os    = require('os');
const { spawnSync } = require('child_process');

const GC   = path.join(__dirname, 'governance-check.js');
const RED  = '\x1b[31m';
const GREEN= '\x1b[32m';
const YEL  = '\x1b[33m';
const BOLD = '\x1b[1m';
const RESET= '\x1b[0m';

let passed = 0;
let failed = 0;

// ─── Step 0 — verify governance-check.js syntax ───────────────────────────────
(function verifySyntax() {
  console.log(`\n${BOLD}Fenovera Design System — Governance Self-Test${RESET}`);
  console.log(`${'─'.repeat(60)}\n`);
  console.log(`Step 0 — Syntax check: node --check governance-check.js`);
  const r = spawnSync('node', ['--check', GC], { encoding: 'utf8' });
  if (r.status !== 0 || r.status === null) {
    console.error(`\n${RED}${BOLD}FATAL — governance-check.js failed node --check (exit ${r.status}):${RESET}`);
    console.error(r.stderr || r.stdout || '(no output)');
    console.error(`\n${RED}All 49 sub-tests skipped. Fix the syntax error first.${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓ PASS${RESET}  exit 0 — syntax valid\n`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`Running self-tests for all 32 governance checks (49 fixtures)`);
  console.log(`${'─'.repeat(60)}\n`);
}());


// ─── Fixture runners ───────────────────────────────────────────────────────────
/**
 * @param {string|number} num         Check number / label (e.g. '25')
 * @param {string}        desc        Human-readable description
 * @param {Object}        files       { 'relative/path': string|Buffer }
 * @param {string}        expectSubstr Substring expected in governance-check output
 * @param {string[]}      [args]      Extra CLI args; default ['--strict']
 */
function runFixture(num, desc, files, expectSubstr, args) {
  if (!args) args = ['--strict'];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `ds-gc-${String(num).padStart(2, '0')}-`));
  try {
    // Write fixture files
    for (const [relPath, content] of Object.entries(files)) {
      const fp = path.join(tmp, relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      if (Buffer.isBuffer(content)) fs.writeFileSync(fp, content);
      else                          fs.writeFileSync(fp, content, 'utf8');
    }

    // Run governance-check against fixture with specified args
    const r = spawnSync(
      'node', [GC, `--root=${tmp}`, ...args],
      { encoding: 'utf8', timeout: 15000 }
    );

    const out = (r.stdout || '') + (r.stderr || '');

    if (out.includes(expectSubstr)) {
      console.log(`  ${GREEN}✓ CHECK ${String(num).padStart(2)}${RESET}  ${desc}`);
      passed++;
    } else {
      console.log(`  ${RED}✗ CHECK ${String(num).padStart(2)}${RESET}  ${desc}`);
      console.log(`    ${YEL}Expected:${RESET} ${expectSubstr}`);
      const outSummary = out.split('\n')
        .map(l => l.trim()).filter(Boolean).slice(0, 6).join(' | ');
      console.log(`    ${YEL}Got:     ${RESET} ${outSummary || '(empty)'}`);
      failed++;
    }
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  }
}


// ─── HTML-scoped fixture runner ────────────────────────────────────────────────
// Used for Check 25 scope tests (25 / 25b / 25c / 25d / 25e).
// Creates:
//   tmp/ds/  ← DS root  (--root=tmp/ds  →  ROOT = tmp)
//   tmp/page.html  ← product page referenced via --html=page.html
// Then asserts presence (expectPresent=true) or absence (expectPresent=false)
// of expectSubstr in the governance-check output.
function runFixtureHtmlScoped(num, desc, dsFiles, pageContent, expectPresent, expectSubstr) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `ds-gc-${String(num).padStart(3, '0')}-`));
  try {
    // Write DS files into tmp/ds/
    for (const [relPath, content] of Object.entries(dsFiles)) {
      const fp = path.join(tmp, 'ds', relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      fs.writeFileSync(fp, content, 'utf8');
    }
    // Write product page at tmp/page.html (ROOT = tmp, so --html=page.html resolves here)
    fs.writeFileSync(path.join(tmp, 'page.html'), pageContent, 'utf8');

    const r = spawnSync(
      'node',
      [GC, `--root=${path.join(tmp, 'ds')}`, '--html=page.html', '--release'],
      { encoding: 'utf8', timeout: 15000 }
    );
    const out = (r.stdout || '') + (r.stderr || '');
    const found = out.includes(expectSubstr);
    const pass  = expectPresent ? found : !found;

    if (pass) {
      console.log(`  ${GREEN}✓ CHECK ${String(num).padStart(3)}${RESET}  ${desc}`);
      passed++;
    } else {
      console.log(`  ${RED}✗ CHECK ${String(num).padStart(3)}${RESET}  ${desc}`);
      if (expectPresent) {
        console.log(`    ${YEL}Expected substring present:${RESET} ${expectSubstr}`);
      } else {
        console.log(`    ${YEL}Expected substring ABSENT but was found:${RESET} ${expectSubstr}`);
      }
      const outSummary = out.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).slice(0, 6).join(' | ');
      console.log(`    ${YEL}Got:${RESET} ${outSummary || '(empty)'}`);
      failed++;
    }
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  }
}


// ─── HTML-scoped fixture runner (no --release, no --strict) ──────────────────
// Used for Checks 27 and 28, which apply to --html= targets but are not
// gated on --release.  Sets up the same directory layout as runFixtureHtmlScoped.
function runFixtureHtmlDev(num, desc, dsFiles, pageContent, expectPresent, expectSubstr) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `ds-gc-${String(num).padStart(3, '0')}-`));
  try {
    for (const [relPath, content] of Object.entries(dsFiles)) {
      const fp = path.join(tmp, 'ds', relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      fs.writeFileSync(fp, content, 'utf8');
    }
    fs.writeFileSync(path.join(tmp, 'page.html'), pageContent, 'utf8');

    const r = spawnSync(
      'node',
      [GC, `--root=${path.join(tmp, 'ds')}`, '--html=page.html'],
      { encoding: 'utf8', timeout: 15000 }
    );
    const out  = (r.stdout || '') + (r.stderr || '');
    const found = out.includes(expectSubstr);
    const pass  = expectPresent ? found : !found;

    if (pass) {
      console.log(`  ${GREEN}✓ CHECK ${String(num).padStart(3)}${RESET}  ${desc}`);
      passed++;
    } else {
      console.log(`  ${RED}✗ CHECK ${String(num).padStart(3)}${RESET}  ${desc}`);
      if (expectPresent) {
        console.log(`    ${YEL}Expected substring present:${RESET} ${expectSubstr}`);
      } else {
        console.log(`    ${YEL}Expected substring ABSENT but was found:${RESET} ${expectSubstr}`);
      }
      const outSummary = out.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).slice(0, 6).join(' | ');
      console.log(`    ${YEL}Got:${RESET} ${outSummary || '(empty)'}`);
      failed++;
    }
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  }
}


// ─── HTML-scoped fixture runner with extra files at ROOT ──────────────────────
// Like runFixtureHtmlDev but accepts `rootFiles` — written at tmp/ (ROOT).
// Used for fixtures that need files at ROOT to verify absence/presence of errors
// (e.g., existing-route/index.html for Check 26c, sitemap.xml for Check 32).
function runFixtureHtmlWithRootFiles(num, desc, dsFiles, rootFiles, pageContent, expectPresent, expectSubstr) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `ds-gc-${String(num).padStart(3, '0')}-`));
  try {
    for (const [relPath, content] of Object.entries(dsFiles)) {
      const fp = path.join(tmp, 'ds', relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      fs.writeFileSync(fp, content, 'utf8');
    }
    for (const [relPath, content] of Object.entries(rootFiles)) {
      const fp = path.join(tmp, relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      fs.writeFileSync(fp, content, 'utf8');
    }
    fs.writeFileSync(path.join(tmp, 'page.html'), pageContent, 'utf8');

    const r = spawnSync(
      'node',
      [GC, `--root=${path.join(tmp, 'ds')}`, '--html=page.html'],
      { encoding: 'utf8', timeout: 15000 }
    );
    const out  = (r.stdout || '') + (r.stderr || '');
    const found = out.includes(expectSubstr);
    const pass  = expectPresent ? found : !found;

    if (pass) {
      console.log(`  ${GREEN}✓ CHECK ${String(num).padStart(3)}${RESET}  ${desc}`);
      passed++;
    } else {
      console.log(`  ${RED}✗ CHECK ${String(num).padStart(3)}${RESET}  ${desc}`);
      if (expectPresent) {
        console.log(`    ${YEL}Expected substring present:${RESET} ${expectSubstr}`);
      } else {
        console.log(`    ${YEL}Expected substring ABSENT but was found:${RESET} ${expectSubstr}`);
      }
      const outSummary = out.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).slice(0, 6).join(' | ');
      console.log(`    ${YEL}Got:${RESET} ${outSummary || '(empty)'}`);
      failed++;
    }
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  }
}


// ─── Shared stubs ─────────────────────────────────────────────────────────────

// Minimal tokens.css (no hex values in it, so Check 1 ignores it)
const TOKENS = '/* tokens.css stub */\n:root {\n  --color-canvas: var(--_canvas);\n  --color-navy: var(--_navy);\n}\n';

// Minimal valid HTML — passes every check when unmodified
const VALID_HTML = [
  '<!doctype html>',
  '<html lang="en">',
  '<head><meta charset="utf-8"><title>T</title></head>',
  '<body>',
  '<img src="logo.svg" alt="Fenovera logo">',
  '<a href="page.html">Visit page</a>',
  '<button type="button" aria-label="Close menu"><svg aria-hidden="true"><use href="#x"/></svg></button>',
  '<label for="email">Email</label>',
  '<input type="email" id="email">',
  '<p>Acceptable body copy with no WCAG violations.</p>',
  '</body>',
  '</html>',
].join('\n');

// Minimal valid Markdown — one heading, no duplicates, no WCAG phrases, one version line
const VALID_MD = [
  '# Fenovera Design System',
  '',
  'Stub documentation for self-test.',
  '',
  '*Fenovera Design System v0.0 · stub*',
  '',
].join('\n');

// Minimal components.css that defines .btn and .btn-primary
const COMPONENTS_CSS = '.btn { display: inline-flex; }\n.btn-primary { background: var(--color-navy); }\n';

// Minimal base.css
const BASE_CSS = '.container { max-width: 1200px; }\n';

// Minimal responsive-proof.html (valid — uses only classes from components.css)
const VALID_RP = [
  '<!doctype html>',
  '<html lang="en">',
  '<head><meta charset="utf-8"><title>Responsive Proof</title></head>',
  '<body>',
  '<div class="btn btn-primary">Click</div>',
  '</body>',
  '</html>',
].join('\n');


// ─── 23 check fixtures ────────────────────────────────────────────────────────

// 1. Raw hex in CSS (outside tokens.css)
runFixture(1, 'Raw hex in CSS outside tokens.css',
  {
    'tokens.css': TOKENS,
    'base.css':   '.highlight { color: #ff0000; }\n',
  },
  'Raw hex "#ff0000"'
);

// 2. Arbitrary non-4× px spacing
// The regex anchors on ^, {, or ; — `padding` must begin at column 0 or follow { / ; directly.
runFixture(2, 'Arbitrary non-4× px spacing value',
  {
    'tokens.css': TOKENS,
    'base.css':   '.foo {\npadding: 7px;\n}\n',
  },
  'Spacing "7px" is not a multiple of 4'
);

// 3. Border-radius > 8px
runFixture(3, 'border-radius exceeds 8px maximum',
  {
    'tokens.css': TOKENS,
    'base.css':   '.card { border-radius: 20px; }\n',
  },
  'border-radius "20px" exceeds max 8px'
);

// 4. Font-size below 12px (in CSS file — showcase.html is exempted)
runFixture(4, 'font-size below 12px minimum',
  {
    'tokens.css': TOKENS,
    'base.css':   '.tiny-label { font-size: 9px; }\n',
  },
  'font-size "9px" is below the 12px minimum'
);

// 5. <img> without alt attribute
runFixture(5, '<img> missing alt attribute',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '<img src="logo.svg" alt="Fenovera logo">',
      '<img src="logo.svg">'
    ),
  },
  '<img> missing alt attribute.'
);

// 6. Empty link without accessible name
runFixture(6, 'Empty link missing accessible name',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '<a href="page.html">Visit page</a>',
      '<a href="page.html"></a>'
    ),
  },
  'Link has no accessible name'
);

// 7. Icon-only button without aria-label
// The regex matches single-line patterns: <button><svg .../></button> (self-closing icon tag).
// It does NOT match multi-child patterns like <button><svg><use/></svg></button>.
runFixture(7, 'Icon-only button missing accessible name',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '<button type="button" aria-label="Close menu"><svg aria-hidden="true"><use href="#x"/></svg></button>',
      '<button type="button"><svg aria-hidden="true" viewBox="0 0 24 24" /></button>'
    ),
  },
  'Icon-only button has no accessible name'
);

// 8a. <input> without associated label
runFixture('8a', '<input> without associated label',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '<label for="email">Email</label>\n<input type="email" id="email">',
      '<input type="text" id="unlabelled-field">'
    ),
  },
  '<input> has no associated label'
);

// 9. Malformed class attribute (another attribute name inside class value)
runFixture(9, 'Malformed class attribute',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '<p>Acceptable body copy',
      '<div class="card style=background:red">\n<p>Acceptable body copy'
    ).replace('</body>', '</div>\n</body>'),
  },
  'Malformed class attribute: another attribute name appears inside the class value.'
);

// 10. Invalid interactive nesting (<a><button>)
runFixture(10, 'Invalid <a><button> interactive nesting',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '</body>',
      '<a href="x.html"><button type="button">Go</button></a>\n</body>'
    ),
  },
  'Invalid interactive nesting: <a> inside <button> or <button> inside <a>.'
);

// 11. <button> missing explicit type attribute
runFixture(11, '<button> missing explicit type attribute',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '</body>',
      '<button>No type</button>\n</body>'
    ),
  },
  '<button> missing explicit type attribute (type="button" or type="submit").'
);

// 12. Obsolete WCAG phrase in HTML
runFixture(12, 'Obsolete WCAG phrase "14px bold" in HTML',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '</body>',
      '<p>Large text threshold: 18px regular or 14px bold is sufficient.</p>\n</body>'
    ),
  },
  'Obsolete WCAG phrase "14px bold"'
);

// 13. Duplicate heading in Markdown
runFixture(13, 'Duplicate heading in Markdown',
  {
    'tokens.css':       TOKENS,
    'DESIGN-SYSTEM.md': [
      '# Fenovera Design System',
      '',
      '## Colors',
      '',
      'First section.',
      '',
      '## Colors',
      '',
      'Duplicate — should be flagged.',
      '',
      '*Fenovera Design System v0.0 · stub*',
    ].join('\n'),
  },
  'Duplicate heading "## Colors"'
);

// 14a. Backup / temp file present
runFixture('14a', 'Backup/temp file present in deliverable',
  {
    'tokens.css':         TOKENS,
    'components.css.bak': '/* old version of components */\n',
  },
  'Backup/temp/archive file should not ship'
);

// 14b. Packaged archive inside design-system tree
runFixture('14b', 'Archive (.zip) present inside design-system tree',
  {
    'tokens.css':              TOKENS,
    'design-system-final.zip': Buffer.from([0x50, 0x4B, 0x05, 0x06, ...Array(18).fill(0)]),
  },
  'Backup/temp/archive file should not ship'
);

// 15. NUL bytes in HTML file
runFixture(15, 'NUL bytes (0x00) in HTML file',
  {
    'tokens.css':    TOKENS,
    'showcase.html': Buffer.concat([
      Buffer.from(
        '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
        '<title>T</title></head><body>test'
      ),
      Buffer.from([0x00]),   // NUL byte injection
      Buffer.from('</body></html>'),
    ]),
  },
  'File contains NUL bytes (0x00).'
);

// 16. Content found after </html>
runFixture(16, 'Stray content found after </html>',
  {
    'tokens.css':    TOKENS,
    'showcase.html':
      '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
      '<title>T</title></head><body><p>ok</p></body></html>\n' +
      'STRAY CONTENT AFTER HTML CLOSE\n',
  },
  'Content found after </html>.'
);

// 17. Missing </html> closing tag
runFixture(17, 'Missing </html> closing tag',
  {
    'tokens.css':    TOKENS,
    'showcase.html':
      '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
      '<title>T</title></head><body><p>ok</p></body>',
    // </html> intentionally omitted
  },
  'Missing </html> tag.'
);

// 18. JavaScript syntax error in inline <script>
runFixture(18, 'JS syntax error in inline <script>',
  {
    'tokens.css':    TOKENS,
    'showcase.html': [
      '<!doctype html>',
      '<html lang="en">',
      '<head><meta charset="utf-8"><title>T</title></head>',
      '<body><p>test</p></body>',
      '<script>',
      '(function () {',
      '  var x = function( {',   // deliberate syntax error
      '  };',
      '}());',
      '</script>',
      '</html>',
    ].join('\n'),
  },
  'syntax error'
);

// 19a. Class in responsive-proof.html not defined in components.css or base.css
runFixture('19a', 'Unknown class in responsive-proof.html',
  {
    'tokens.css':           TOKENS,
    'components.css':       COMPONENTS_CSS,
    'base.css':             BASE_CSS,
    'responsive-proof.html': [
      '<!doctype html>',
      '<html lang="en">',
      '<head><meta charset="utf-8"><title>RP</title></head>',
      '<body>',
      '<div class="btn btn-primary ghost-class-that-does-not-exist"></div>',
      '</body>',
      '</html>',
    ].join('\n'),
  },
  '"ghost-class-that-does-not-exist" used in responsive-proof.html is not defined'
);

// 20. --color-ink-tertiary in informational text selector
runFixture(20, '--color-ink-tertiary in informational selector',
  {
    'tokens.css':     TOKENS,
    'components.css': '.form-hint { color: var(--color-ink-tertiary); }\n',
  },
  '--color-ink-tertiary for informational text'
);

// 21. SVG fill attribute with raw hex
runFixture(21, 'SVG fill attribute with raw hex value',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '</body>',
      '<svg viewBox="0 0 24 24"><path fill="#cc0000" d="M0 0h24v24H0z"/></svg>\n</body>'
    ),
  },
  'SVG fill/stroke attribute uses raw hex'
);

// 22. Obsolete WCAG phrase in Markdown (outside fenced code block)
runFixture(22, 'Obsolete WCAG phrase "14px bold" in Markdown',
  {
    'tokens.css':       TOKENS,
    'DESIGN-SYSTEM.md': [
      '# Fenovera Design System',
      '',
      'The minimum large-text size is 14px bold.',
      '',
      '*Fenovera Design System v0.0 · stub*',
    ].join('\n'),
  },
  'Obsolete WCAG phrase "14px bold" in Markdown'
);

// 23. HTML ID reference integrity (aria-labelledby → no matching id)
runFixture(23, 'aria-labelledby references a non-existent ID',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace(
      '</body>',
      '<section aria-labelledby="phantom-heading">\n  <p>Content</p>\n</section>\n</body>'
    ),
  },
  'aria-labelledby="phantom-heading" — no element with id="phantom-heading"'
);


// 8b. <select> without associated label
runFixture('8b', '<select> without associated label',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace('</body>',
      '<select id="fruit"><option>Apple</option></select>\n</body>'),
  },
  '<select> has no associated label'
);

// 8c. <textarea> without associated label
runFixture('8c', '<textarea> without associated label',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace('</body>',
      '<textarea id="notes"></textarea>\n</body>'),
  },
  '<textarea> has no associated label'
);

// 19b. Unknown class in showcase.html (not in components.css, base.css, or inline <style>)
runFixture('19b', 'Unknown class in showcase.html',
  {
    'tokens.css':    TOKENS,
    'components.css': COMPONENTS_CSS,
    'base.css':      BASE_CSS,
    'responsive-proof.html': VALID_RP,
    'showcase.html': [
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>SC</title></head>',
      '<body><div class="btn btn-primary phantom-showcase-class"></div></body></html>',
    ].join('\n'),
  },
  '"phantom-showcase-class" used in showcase.html is not defined'
);

// 20g. --color-ink-tertiary via grouped selector
runFixture('20g', '--color-ink-tertiary via grouped selector',
  {
    'tokens.css':     TOKENS,
    'components.css': '.other-thing, .form-hint { color: var(--color-ink-tertiary); }\n',
  },
  '--color-ink-tertiary for informational text'
);

// 24. Duplicate id= attributes within a single HTML file
runFixture(24, 'Duplicate id attribute in HTML file',
  {
    'tokens.css':    TOKENS,
    'showcase.html': VALID_HTML.replace('</body>',
      '<section id="dup-section">first</section>\n<section id="dup-section">second</section>\n</body>'),
  },
  'Duplicate id="dup-section"'
);


// 25. Release blockers — [TO VERIFY] placeholder detected in --html= page
//     Activated by --release flag; blocker is in the product page, not DS internals.
runFixtureHtmlScoped(
  '25',
  'Release blocker — [TO VERIFY] placeholder detected in --html= page',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>T</title>',
    '</head>',
    '<body>',
    '<p>[SPEC TO VERIFY]</p>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Release blocker'
);


// 25-noindex. Consolidated noindex rule — one <meta name="robots"> tag → one blocker
runFixtureHtmlScoped(
  '25-noindex',
  'Release blocker — single <meta name="robots" content="noindex"> produces exactly one blocker',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="robots" content="noindex, nofollow">',
    '<title>T</title>',
    '</head>',
    '<body><p>Clean content.</p></body>',
    '</html>',
  ].join('\n'),
  true,
  'Release blocker — noindex robots directive'
);


// 25b. Release blockers — id="form-dev-notice" detected in --html= page
runFixtureHtmlScoped(
  '25b',
  'Release blocker — unconnected form dev notice element detected in --html= page',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><title>T</title></head>',
    '<body>',
    '<div class="notification notification--warning" id="form-dev-notice">',
    '  Form not connected to backend.',
    '</div>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Unconnected quote form — development notice element present'
);


// 25c. Release blockers — "REPLACE THIS BLOCK with a fetch()" detected in --html= page
runFixtureHtmlScoped(
  '25c',
  'Release blocker — unconnected quote-form fetch() placeholder detected in --html= page',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><title>T</title></head>',
    '<body>',
    '<script>',
    '// REPLACE THIS BLOCK with a fetch() POST once the endpoint exists',
    'setTimeout(function(){ }, 400);',
    '</script>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Unconnected quote form — simulated network-error block not replaced with real fetch()'
);


// 25d. Check 25 scope — blocker in --html=-specified file IS detected
//      The product page has a [SPEC TO VERIFY] placeholder; DS showcase is clean.
runFixtureHtmlScoped(
  '25d',
  'Check 25 scope — blocker in --html= page IS caught',
  {
    'tokens.css':    TOKENS,
    'showcase.html': [
      '<!doctype html>',
      '<html lang="en">',
      '<head><meta charset="utf-8"><title>DS Showcase</title></head>',
      '<body><p>Design system internal — no blockers here.</p></body>',
      '</html>',
    ].join('\n'),
  },
  // Product page with a release blocker
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="robots" content="noindex, nofollow">',
    '<title>Product Page</title>',
    '</head>',
    '<body>',
    '<p>[SPEC TO VERIFY]</p>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,            // expect "Release blocker" to be present
  'Release blocker'
);


// 25e. Check 25 scope — blocker in DS-internal file is NOT reported
//      showcase.html has [SPEC TO VERIFY]; the --html= product page is clean.
runFixtureHtmlScoped(
  '25e',
  'Check 25 scope — DS-internal blocker NOT reported when --html= page is clean',
  {
    'tokens.css':    TOKENS,
    'showcase.html': [
      '<!doctype html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="robots" content="noindex, nofollow">',
      '<title>DS Showcase (internal)</title>',
      '</head>',
      '<body>',
      '<p>[SPEC TO VERIFY] — intentional internal placeholder, must NOT trigger release blocker</p>',
      '</body>',
      '</html>',
    ].join('\n'),
  },
  // Product page is clean — no blockers
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><title>Clean Product Page</title></head>',
    '<body><p>All verified content. No placeholders.</p></body>',
    '</html>',
  ].join('\n'),
  false,           // expect "Release blocker" to be ABSENT
  'Release blocker'
);


// 26. Broken relative link in DS HTML file
// Creates a showcase.html with an href starting with ../ that resolves to a
// non-existent file.  Check 26 runs on ALL HTML files, so this fixture uses
// the standard runFixture runner (no --html= flag needed).
runFixture(26, 'Check 26 — Broken relative link (../) detected',
  {
    'tokens.css': TOKENS,
    'showcase.html': [
      '<!doctype html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<title>T</title>',
      '<link rel="stylesheet" href="../no-such-dir/nonexistent.css">',
      '</head>',
      '<body><p>Content.</p></body>',
      '</html>',
    ].join('\n'),
  },
  'Check 26 — Broken relative link'
);


// 27. Missing meta description on an --html= page
runFixtureHtmlDev(
  '27',
  'Check 27 — Missing <meta name="description"> detected in --html= page',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><title>Product Page</title></head>',
    '<body><h1>Product</h1></body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 27 — Missing <meta name="description">'
);


// 28. Multiple <h1> elements on an --html= page
runFixtureHtmlDev(
  '28',
  'Check 28 — Multiple <h1> elements detected in --html= page',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Product</title>',
    '<meta name="description" content="A test product page.">',
    '</head>',
    '<body>',
    '<h1>First Heading</h1>',
    '<h1>Second Heading</h1>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 28 — Expected exactly 1 <h1>, found 2'
);


// 20b. Check 20 expanded — color: var(--color-ink-tertiary) in page <style> block
runFixtureHtmlDev(
  '20b',
  'Check 20 — --color-ink-tertiary in page <style> block detected',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '<style>',
    '.label { color: var(--color-ink-tertiary); }',
    '</style>',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main><h1>Test</h1><p>Content.</p></main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 20 — color: var(--color-ink-tertiary) in page <style> block'
);


// 26b. Check 26 — root-relative link to missing route → warning
runFixtureHtmlDev(
  '26b',
  'Check 26 — Root-relative link to missing route flagged',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main>',
    '<h1>Test</h1>',
    '<a href="/missing-route/">Missing Route</a>',
    '</main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 26 — Root-relative link'
);


// 26c. Check 26 — root-relative link to existing route → NOT flagged
runFixtureHtmlWithRootFiles(
  '26c',
  'Check 26 — Root-relative link to existing route not flagged',
  { 'tokens.css': TOKENS },
  { 'existing-route/index.html': '<p>Route exists.</p>' },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main>',
    '<h1>Test</h1>',
    '<a href="/existing-route/">Existing Route</a>',
    '</main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  false,
  'Check 26 — Root-relative link'
);


// 26d. Check 26 — fragment link to existing ID → NOT flagged
runFixtureHtmlDev(
  '26d',
  'Check 26 — Fragment link to existing ID not flagged',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main>',
    '<h1>Test</h1>',
    '<a href="#main-id">Jump to section</a>',
    '<section id="main-id"><p>Target section.</p></section>',
    '</main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  false,
  'Check 26 — Fragment link'
);


// 26e. Check 26 — fragment link to non-existent ID → warning
runFixtureHtmlDev(
  '26e',
  'Check 26 — Fragment link to missing ID flagged',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main>',
    '<h1>Test</h1>',
    '<a href="#phantom-id">Jump to phantom</a>',
    '</main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 26 — Fragment link'
);


// 26f. Check 26 — mailto: link NOT flagged as broken
runFixtureHtmlDev(
  '26f',
  'Check 26 — External mailto: link not flagged as broken',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main>',
    '<h1>Test</h1>',
    '<a href="mailto:info@example.com">Email us</a>',
    '</main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  false,
  'Check 26 — Broken relative link'
);


// 29. Check 29 — missing site-header on generated page
runFixtureHtmlDev(
  29,
  'Check 29 — Missing site-header on generated page detected',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<main><h1>Test</h1><p>Content.</p></main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 29 — Expected exactly 1 <header class="site-header">'
);


// 30. Check 30 — data-page attribute set but no aria-current="page" link
runFixtureHtmlDev(
  30,
  'Check 30 — data-page set but no aria-current="page" link detected',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body data-page="products">',
    '<header class="site-header"><nav><a href="/products/">Products</a></nav></header>',
    '<main><h1>Test</h1><p>Content.</p></main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 30 — No <a aria-current="page"> found'
);


// 31. Check 31 — non-noindex page missing <link rel="canonical">
runFixtureHtmlDev(
  31,
  'Check 31 — Non-noindex page missing canonical link detected',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main><h1>Test</h1><p>Content.</p></main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 31 — Non-noindex page missing <link rel="canonical">'
);


// 31-noindex. Check 31 — noindex page exempt from canonical requirement
runFixtureHtmlDev(
  '31-noindex',
  'Check 31 — noindex page exempt from canonical requirement (OK)',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="robots" content="noindex, nofollow">',
    '<title>Test (dev)</title>',
    '<meta name="description" content="Dev page, noindex.">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main><h1>Test</h1><p>Content.</p></main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 31 — noindex page exempt from canonical requirement'
);


// 32. Check 32 — non-noindex page with canonical but sitemap.xml absent at ROOT
runFixtureHtmlDev(
  32,
  'Check 32 — Non-noindex page with canonical but no sitemap.xml detected',
  { 'tokens.css': TOKENS },
  [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Test</title>',
    '<meta name="description" content="Test page.">',
    '<link rel="canonical" href="https://fenovera.com/test/">',
    '</head>',
    '<body>',
    '<header class="site-header"><nav>Nav</nav></header>',
    '<main><h1>Test</h1><p>Content.</p></main>',
    '<footer class="site-footer"><p>Footer</p></footer>',
    '</body>',
    '</html>',
  ].join('\n'),
  true,
  'Check 32 — sitemap.xml not found at project root'
);


// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(60)}`);
if (failed === 0) {
  console.log(`${GREEN}${BOLD}✓ All ${passed} checks detected their violations correctly.${RESET}`);
  console.log(`${GREEN}  Self-test PASSED.${RESET}`);
} else {
  console.log(`${RED}${BOLD}✗ ${failed} check(s) FAILED to detect their violation.${RESET}`);
  console.log(`${GREEN}  ${passed} check(s) passed.${RESET}`);
}
console.log(`${'─'.repeat(60)}\n`);

process.exit(failed > 0 ? 1 : 0);
