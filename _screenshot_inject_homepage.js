document.open('text/html','replace');document.write(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Fenovera | Aluminum and uPVC Windows &amp; Doors</title>
  <meta name="description" content="Fenovera supplies aluminum and uPVC window and door systems for residential and commercial projects in the Bay Area. Contact us for pricing, specifications, and availability.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://fenovera.com/">
  <meta property="og:site_name" content="Fenovera">
  <meta property="og:title" content="Fenovera | Aluminum and uPVC Windows &amp; Doors">
  <meta property="og:description" content="Bay Area distributor of aluminum and uPVC window and door systems for residential and commercial projects.">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Fenovera | Aluminum and uPVC Windows &amp; Doors">
  <meta name="twitter:description" content="Bay Area distributor of aluminum and uPVC window and door systems.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap">

  <!-- Design system -->
  <style>/* design-system/tokens.css */
/**
 * Fenovera Design System — Token File
 * Version: 1.3.0 · Phase 2
 * Direction: A+C Hybrid (Technical Authority + Precision Distributor)
 *
 * GOVERNANCE
 * ──────────
 * • Page components must consume only these tokens. Raw hex values and
 *   arbitrary spacing are prohibited outside this file.
 * • Private brand values (--_*) are source-of-truth only. Do not
 *   reference them in component code — always use semantic tokens.
 * • Corner radii are capped at 8px. Full-round / pill shapes are not
 *   part of this design system.
 * • An editorial serif may be proposed for limited use but must not be
 *   introduced without explicit written approval.
 */

:root {

  /* ═══════════════════════════════════════════════════════════════════
     PRIVATE PALETTE  (source-of-truth hex values)
     Do not reference these directly in component code.
     Always use the semantic tokens below.
  ═══════════════════════════════════════════════════════════════════ */

  --_navy:    #173B55;
  --_bronze:  #A77A45;
  --_canvas:  #F5F3EE;
  --_stone:   #D9D6CF;
  --_slate:   #64717A;
  --_ink:     #17222B;
  --_white:   #FFFFFF;


  /* ═══════════════════════════════════════════════════════════════════
     COLOR — SURFACES
  ═══════════════════════════════════════════════════════════════════ */

  --color-canvas:            #F5F3EE;   /* page background */
  --color-surface:           #FFFFFF;   /* card, panel, modal */
  --color-surface-secondary: #FAFAF8;   /* secondary panels, nested cards */
  --color-surface-overlay:   rgba(23, 34, 43, 0.48); /* backdrop for modals/drawers */


  /* ═══════════════════════════════════════════════════════════════════
     COLOR — INK (TEXT)
  ═══════════════════════════════════════════════════════════════════ */

  --color-ink:           #17222B;   /* primary text */
  --color-ink-secondary: #64717A;   /* supporting text, labels */
  --color-ink-tertiary:  #8D9BA3;   /* placeholder, metadata, captions */
  --color-ink-disabled:  #B4BEC4;   /* disabled element text */
  --color-ink-inverse:   #FFFFFF;   /* text on navy / dark backgrounds */


  /* ═══════════════════════════════════════════════════════════════════
     COLOR — BORDERS
  ═══════════════════════════════════════════════════════════════════ */

  --color-border:        #D9D6CF;   /* default border, dividers */
  --color-border-subtle: #E8E5E0;   /* very light, hairline dividers */
  --color-border-strong: #B4AFA8;   /* hover-state input borders */


  /* ═══════════════════════════════════════════════════════════════════
     COLOR — BRAND NAVY  (primary interactive)
  ═══════════════════════════════════════════════════════════════════ */

  --color-navy:        #173B55;
  --color-navy-hover:  #1E4D70;
  --color-navy-active: #122F43;
  --color-navy-subtle: #EBF1F7;   /* very light navy tint for bg/chip */
  --color-navy-border: #C1D4E4;   /* light navy border */


  /* ═══════════════════════════════════════════════════════════════════
     COLOR — BRAND BRONZE  (secondary / accent)
  ═══════════════════════════════════════════════════════════════════ */

  --color-bronze:        #A77A45;   /* decorative only — 3.81:1 on white, fails AA for normal text */
  --color-bronze-hover:  #BB8A50;   /* decorative hover — not for text use */
  --color-bronze-active: #8F6338;   /* decorative pressed state */
  --color-bronze-subtle: #F5EDE2;   /* very light bronze tint */
  --color-bronze-border: #DBBF96;   /* light bronze border */

  /* Interactive bronze — for buttons and interactive elements.
     Passes WCAG AA for normal text: white on #8F6338 = 5.24:1.
     Never use --color-bronze (#A77A45) for button backgrounds. */
  --color-bronze-interactive:       #8F6338;   /* 5.24:1 on white — AA normal text ✓ */
  --color-bronze-interactive-hover: #7D5030;   /* 6.86:1 on white — AA normal text ✓ */
  --color-bronze-interactive-active:#6B4326;   /* 8.55:1 on white — AAA normal text ✓ */


  /* ═══════════════════════════════════════════════════════════════════
     COLOR — STATUS
  ═══════════════════════════════════════════════════════════════════ */

  --color-success:         #3F735B;
  --color-success-subtle:  #EBF4EF;
  --color-success-border:  #A8D1BE;

  --color-error:           #B44C43;
  --color-error-subtle:    #FBEEEC;
  --color-error-border:    #E8ABA6;

  --color-warning:         #9A6B1C;
  --color-warning-subtle:  #FBF3E4;
  --color-warning-border:  #E0C07A;

  --color-info:            #1E5178;
  --color-info-subtle:     #EBF3FB;
  --color-info-border:     #A2C8E8;


  /* ═══════════════════════════════════════════════════════════════════
     TYPOGRAPHY — FAMILIES
  ═══════════════════════════════════════════════════════════════════ */

  --font-heading: 'Manrope', system-ui, -apple-system, sans-serif;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:    'Courier New', Courier, monospace;
  /* --font-serif: not in system; requires written approval before use */


  /* ═══════════════════════════════════════════════════════════════════
     TYPOGRAPHY — SCALE  (rem at 16px root)
  ═══════════════════════════════════════════════════════════════════ */

  /* ⚠️  --text-2xs is FOR INTERNAL DESIGN-SYSTEM USE ONLY.
     It must not be used in any public-facing component or page.
     Public minimum is --text-xs (12px) for nonessential metadata. */
  --text-2xs:  0.625rem;   /* 10px — DS internal interface only */
  --text-xs:   0.75rem;    /* 12px — nonessential metadata (dates, IDs) */
  --text-sm:   0.875rem;   /* 14px — labels, badges, table cells, nav */
  --text-body: 1.0625rem;  /* 17px — default marketing/public body copy */
  --text-base: 1rem;       /* 16px — forms, controls, table body */
  --text-lg:   1.125rem;   /* 18px — intro paragraphs, lead text */
  --text-xl:   1.25rem;    /* 20px — h5, card titles */
  --text-2xl:  1.5rem;     /* 24px — h4 */
  --text-3xl:  1.875rem;   /* 30px — h3 */
  --text-4xl:  2.25rem;    /* 36px — h2 */
  --text-5xl:  3rem;       /* 48px — h1 / hero sub */
  --text-6xl:  3.75rem;    /* 60px — hero display */
  --text-7xl:  4.5rem;     /* 72px — large hero (use sparingly) */


  /* ═══════════════════════════════════════════════════════════════════
     TYPOGRAPHY — MEASURE (line length)
  ═══════════════════════════════════════════════════════════════════ */

  --content-measure:        72ch;   /* default body text max-width */
  --content-measure-narrow: 60ch;   /* narrower text blocks (section-body) */


  /* ═══════════════════════════════════════════════════════════════════
     TYPOGRAPHY — LINE HEIGHTS
  ═══════════════════════════════════════════════════════════════════ */

  --leading-none:    1;
  --leading-tight:   1.2;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --leading-loose:   1.75;
  --leading-body:    1.5;    /* alias for leading-normal — use for default body paragraphs */


  /* ═══════════════════════════════════════════════════════════════════
     TYPOGRAPHY — WEIGHTS
  ═══════════════════════════════════════════════════════════════════ */

  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-extrabold: 800;   /* Manrope headlines only */


  /* ═══════════════════════════════════════════════════════════════════
     TYPOGRAPHY — LETTER SPACING
  ═══════════════════════════════════════════════════════════════════ */

  --tracking-tight:   -0.025em;
  --tracking-snug:    -0.015em;
  --tracking-normal:   0em;
  --tracking-wide:     0.03em;
  --tracking-wider:    0.06em;
  --tracking-widest:   0.12em;   /* all-caps labels, overlines */


  /* ═══════════════════════════════════════════════════════════════════
     SPACING  (4px base unit)
  ═══════════════════════════════════════════════════════════════════ */

  --space-px:  1px;
  --space-0:   0px;
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;
  --space-40:  160px;
  --space-48:  192px;


  /* ═══════════════════════════════════════════════════════════════════
     LAYOUT — CONTAINER WIDTHS
  ═══════════════════════════════════════════════════════════════════ */

  --container-xs:      480px;
  --container-sm:      640px;
  --container-md:      768px;
  --container-lg:      1024px;
  --container-xl:      1200px;   /* default page content width */
  --container-2xl:     1440px;   /* full-bleed section max-width */


  /* ═══════════════════════════════════════════════════════════════════
     LAYOUT — PAGE GUTTERS (inline padding)
  ═══════════════════════════════════════════════════════════════════ */

  --gutter:      var(--space-6);    /* 24px — mobile */
  --gutter-md:   var(--space-8);    /* 32px — tablet ≥768px */
  --gutter-lg:   var(--space-12);   /* 48px — desktop ≥1024px */


  /* ═══════════════════════════════════════════════════════════════════
     LAYOUT — GRID
  ═══════════════════════════════════════════════════════════════════ */

  --grid-cols:   12;
  --grid-gap:    var(--space-6);    /* 24px default gap */
  --grid-gap-lg: var(--space-8);    /* 32px at desktop */


  /* ═══════════════════════════════════════════════════════════════════
     BREAKPOINTS  (use in @media queries — values for reference)
     xs:  < 480px    mobile portrait
     sm:  ≥ 480px    mobile landscape
     md:  ≥ 768px    tablet
     lg:  ≥ 1024px   desktop
     xl:  ≥ 1280px   wide desktop
     2xl: ≥ 1440px   ultra-wide
  ═══════════════════════════════════════════════════════════════════ */


  /* ═══════════════════════════════════════════════════════════════════
     BORDERS
  ═══════════════════════════════════════════════════════════════════ */

  --border-thin:  1px;
  --border-base:  1.5px;
  --border-thick: 2px;


  /* ═══════════════════════════════════════════════════════════════════
     CORNER RADII  (maximum: 8px — brand guideline)
  ═══════════════════════════════════════════════════════════════════ */

  --radius-none: 0px;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  /* pill/full-round shapes are not part of this design system */


  /* ═══════════════════════════════════════════════════════════════════
     SHADOWS  (ink-tinted, used sparingly)
  ═══════════════════════════════════════════════════════════════════ */

  --shadow-xs:
    0 1px 2px rgba(23, 34, 43, 0.05);
  --shadow-sm:
    0 1px 3px rgba(23, 34, 43, 0.08),
    0 1px 2px rgba(23, 34, 43, 0.04);
  --shadow-md:
    0 4px 12px rgba(23, 34, 43, 0.10),
    0 2px 4px  rgba(23, 34, 43, 0.05);
  --shadow-lg:
    0 8px 24px rgba(23, 34, 43, 0.12),
    0 3px 8px  rgba(23, 34, 43, 0.06);
  --shadow-xl:
    0 16px 40px rgba(23, 34, 43, 0.14),
    0 6px 12px  rgba(23, 34, 43, 0.06);

  /* Inset shadow — for depressed / active states */
  --shadow-inset:
    inset 0 1px 3px rgba(23, 34, 43, 0.12);


  /* ═══════════════════════════════════════════════════════════════════
     MOTION
  ═══════════════════════════════════════════════════════════════════ */

  --duration-instant:  0ms;
  --duration-fast:     100ms;
  --duration-base:     200ms;
  --duration-slow:     300ms;
  --duration-slower:   500ms;

  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);   /* enter + exit */
  --ease-enter:    cubic-bezier(0.0, 0.0, 0.2, 1);   /* elements entering */
  --ease-exit:     cubic-bezier(0.4, 0.0, 1.0, 1);   /* elements leaving */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* subtle overshoot */


  /* ═══════════════════════════════════════════════════════════════════
     FOCUS INDICATORS  (WCAG 2.4.11 — always visible)
  ═══════════════════════════════════════════════════════════════════ */

  --focus-ring-width:  2px;
  --focus-ring-offset: 3px;
  --focus-ring-color:  var(--color-bronze-interactive);   /* #8F6338 — 5.24:1 on canvas, WCAG AA ✓ */
  --focus-ring-style:  solid;

  /* ══════════════════════════════════════════════════════════════════════
     Z-INDEX LAYERS
     ══════════════════════════════════════════════════════════════════════ */
  --z-base:     0;
  --z-raised:   1;
  --z-sticky:   100;
  --z-dropdown: 200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
}

</style>
  <style>/* design-system/base.css */
/**
 * Fenovera Design System — Base Styles
 * Version: 1.3.0 · Phase 2
 *
 * Imports: must be loaded after tokens.css.
 * Covers: CSS reset, root typography, base element styles,
 *         container helpers, grid utilities.
 */




/* ═══════════════════════════════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════════════════════════════ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  background-color: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

img, video, svg {
  display: block;
  max-width: 100%;
}

img { object-fit: cover; }

button, input, select, textarea {
  font: inherit;
  color: inherit;
}

button { cursor: pointer; border: none; background: none; }

a {
  color: inherit;
  text-decoration: none;
}

ul, ol { list-style: none; }

table {
  border-collapse: collapse;
  width: 100%;
}

[hidden] { display: none !important; }


/* ═══════════════════════════════════════════════════════════════════════
   FOCUS STYLES  (global — components may tighten scope)
═══════════════════════════════════════════════════════════════════════ */

:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  border-radius: var(--radius-xs);
}

/* Remove default focus ring; only show on keyboard navigation */
:focus:not(:focus-visible) {
  outline: none;
}


/* ═══════════════════════════════════════════════════════════════════════
   TYPOGRAPHY — HEADINGS
   Headings use Manrope; weights vary by level.
═══════════════════════════════════════════════════════════════════════ */

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-snug);
  color: var(--color-ink);
}

h1, .h1 {
  font-size: var(--text-5xl);
  font-weight: var(--weight-extrabold);
  letter-spacing: var(--tracking-tight);
}

h2, .h2 {
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
}

h3, .h3 {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
}

h4, .h4 {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
}

h5, .h5 {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
}

h6, .h6 {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
}

/* Responsive heading scale */
@media (max-width: 767px) {
  h1, .h1 { font-size: var(--text-4xl); }
  h2, .h2 { font-size: var(--text-3xl); }
  h3, .h3 { font-size: var(--text-2xl); }
  h4, .h4 { font-size: var(--text-xl); }
}


/* ═══════════════════════════════════════════════════════════════════════
   TYPOGRAPHY — BODY + SEMANTIC CLASSES
═══════════════════════════════════════════════════════════════════════ */

p {
  line-height: var(--leading-relaxed);
  max-width: 72ch; /* prevent overly long lines */
}

p + p { margin-top: var(--space-4); }

.text-lead {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-ink-secondary);
}

.text-overline {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-bronze);
}

.text-caption {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary); /* 4.53:1 on canvas — WCAG AA all sizes */
  line-height: var(--leading-normal);
}

.text-label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-ink-secondary);
}

.text-meta {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary); /* 4.53:1 on canvas — WCAG AA all sizes */
}

strong, b { font-weight: var(--weight-semibold); }
em, i     { font-style: italic; }

small { font-size: var(--text-sm); }

code, pre {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
}

code { padding: 0.1em 0.35em; }

pre {
  padding: var(--space-4);
  overflow-x: auto;
  white-space: pre-wrap;
}

hr {
  border: none;
  border-top: 1px solid var(--color-border-subtle);
  margin: var(--space-8) 0;
}


/* ═══════════════════════════════════════════════════════════════════════
   TYPOGRAPHY — COLOR VARIANTS
═══════════════════════════════════════════════════════════════════════ */

.text-navy    { color: var(--color-navy); }
.text-bronze  { color: var(--color-bronze); }
.text-ink     { color: var(--color-ink); }
.text-muted   { color: var(--color-ink-secondary); }
/* DECORATIVE-ONLY: .text-subtle may only be used for chrome, icons, dividers, or
   metadata that carries zero informational value (e.g. visual separators, ornamental
   labels). It MUST NOT be used for text that communicates status, identity, or action.
   Governance check 20 enforces this constraint in components.css.
   Contrast: --color-ink-tertiary (#8D9BA3) = 2.58:1 on canvas — WCAG AA fail. */
.text-subtle  { color: var(--color-ink-tertiary); } /* decorative-only: see above */
.text-inverse { color: var(--color-ink-inverse); }
.text-error   { color: var(--color-error); }
.text-success { color: var(--color-success); }


/* ═══════════════════════════════════════════════════════════════════════
   CONTAINERS
═══════════════════════════════════════════════════════════════════════ */

.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.container-sm  { max-width: var(--container-sm); }
.container-md  { max-width: var(--container-md); }
.container-lg  { max-width: var(--container-lg); }
.container-xl  { max-width: var(--container-xl); }
.container-2xl { max-width: var(--container-2xl); }

@media (min-width: 768px) {
  .container { padding-inline: var(--gutter-md); }
}

@media (min-width: 1024px) {
  .container { padding-inline: var(--gutter-lg); }
}


/* ═══════════════════════════════════════════════════════════════════════
   GRID UTILITIES
═══════════════════════════════════════════════════════════════════════ */

.grid {
  display: grid;
  gap: var(--grid-gap);
}

.grid-2  { grid-template-columns: repeat(2, 1fr); }
.grid-3  { grid-template-columns: repeat(3, 1fr); }
.grid-4  { grid-template-columns: repeat(4, 1fr); }
.grid-12 { grid-template-columns: repeat(12, 1fr); }

@media (max-width: 1023px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

@media (min-width: 1024px) {
  .grid { gap: var(--grid-gap-lg); }
}

/* Span helpers for 12-col grid */
.col-span-1  { grid-column: span 1; }
.col-span-2  { grid-column: span 2; }
.col-span-3  { grid-column: span 3; }
.col-span-4  { grid-column: span 4; }
.col-span-5  { grid-column: span 5; }
.col-span-6  { grid-column: span 6; }
.col-span-7  { grid-column: span 7; }
.col-span-8  { grid-column: span 8; }
.col-span-9  { grid-column: span 9; }
.col-span-10 { grid-column: span 10; }
.col-span-11 { grid-column: span 11; }
.col-span-12 { grid-column: span 12; }


/* ═══════════════════════════════════════════════════════════════════════
   FLEX UTILITIES
═══════════════════════════════════════════════════════════════════════ */

.flex         { display: flex; }
.flex-col     { flex-direction: column; }
.flex-wrap    { flex-wrap: wrap; }
.items-start  { align-items: flex-start; }
.items-center { align-items: center; }
.items-end    { align-items: flex-end; }
.justify-start  { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end    { justify-content: flex-end; }
.justify-between{ justify-content: space-between; }
.gap-1  { gap: var(--space-1); }
.gap-2  { gap: var(--space-2); }
.gap-3  { gap: var(--space-3); }
.gap-4  { gap: var(--space-4); }
.gap-6  { gap: var(--space-6); }
.gap-8  { gap: var(--space-8); }


/* ═══════════════════════════════════════════════════════════════════════
   SPACING UTILITIES
═══════════════════════════════════════════════════════════════════════ */

.mt-0  { margin-top: 0; }
.mt-2  { margin-top: var(--space-2); }
.mt-4  { margin-top: var(--space-4); }
.mt-6  { margin-top: var(--space-6); }
.mt-8  { margin-top: var(--space-8); }
.mt-12 { margin-top: var(--space-12); }
.mt-16 { margin-top: var(--space-16); }

.mb-0  { margin-bottom: 0; }
.mb-2  { margin-bottom: var(--space-2); }
.mb-4  { margin-bottom: var(--space-4); }
.mb-6  { margin-bottom: var(--space-6); }
.mb-8  { margin-bottom: var(--space-8); }
.mb-12 { margin-bottom: var(--space-12); }
.mb-16 { margin-bottom: var(--space-16); }


/* ═══════════════════════════════════════════════════════════════════════
   VISIBILITY UTILITIES
═══════════════════════════════════════════════════════════════════════ */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.hide-sm { }
.show-sm { display: none; }

@media (max-width: 767px) {
  .hide-sm { display: none !important; }
  .show-sm { display: block; }
}

.hide-md { }
.show-md { display: none; }

@media (min-width: 768px) {
  .hide-md { display: none !important; }
  .show-md { display: block; }
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION SPACING
═══════════════════════════════════════════════════════════════════════ */

.section {
  padding-block: var(--space-16);
}

.section-sm {
  padding-block: var(--space-12);
}

.section-lg {
  padding-block: var(--space-24);
}

@media (max-width: 767px) {
  .section    { padding-block: var(--space-12); }
  .section-sm { padding-block: var(--space-8); }
  .section-lg { padding-block: var(--space-16); }
}


/* ═══════════════════════════════════════════════════════════════════════
   DIVIDERS
═══════════════════════════════════════════════════════════════════════ */

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-border-subtle);
}

.divider-strong {
  background-color: var(--color-border);
}


/* ═══════════════════════════════════════════════════════════════════════
   BACKGROUND VARIANTS
═══════════════════════════════════════════════════════════════════════ */

.bg-canvas  { background-color: var(--color-canvas); }
.bg-surface { background-color: var(--color-surface); }
.bg-navy    { background-color: var(--color-navy); color: var(--color-ink-inverse); }
.bg-navy-subtle { background-color: var(--color-navy-subtle); }
.bg-bronze-subtle { background-color: var(--color-bronze-subtle); }

</style>
  <style>/* design-system/components.css */
/**
 * Fenovera Design System — Component Styles
 * Version: 1.3.0 · Phase 2
 *
 * Imports: load after tokens.css and base.css.
 *
 * GOVERNANCE
 * • Every value must reference a design token.
 * • No raw hex colors. No arbitrary spacing (px values not in token scale).
 * • New components must be approved and added here before use in pages.
 *
 * TABLE OF CONTENTS
 * ─────────────────
 *  1. Header
 *  2. Desktop Navigation
 *  3. Product Mega-Menu
 *  4. Mobile Navigation
 *  5. Breadcrumbs
 *  6. Buttons
 *  7. Links
 *  8. Form Fields
 *  9. Select Controls
 * 10. Checkboxes & Radios
 * 11. File Upload
 * 12. Product-Series Card
 * 13. Project Card
 * 14. Specification Table
 * 15. Comparison Table
 * 16. Feature List
 * 17. Certification / Document Link
 * 18. Finish Swatch
 * 19. Hardware Option
 * 20. Image Gallery
 * 21. Accordion
 * 22. Tabs
 * 23. Quote Form
 * 24. Download Block
 * 25. Footer
 * 26. Notification / Validation Messages
 */


/* ─────────────────────────────────────────────────────────────────────
   1. HEADER
────────────────────────────────────────────────────────────────────── */

.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-surface);
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
  height: 72px;
  transition: box-shadow var(--duration-base) var(--ease-standard);
}

.site-header.is-scrolled {
  box-shadow: var(--shadow-sm);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--gutter);
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .site-header__inner { padding-inline: var(--gutter-md); }
}

@media (min-width: 1024px) {
  .site-header__inner { padding-inline: var(--gutter-lg); }
}

.site-header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
  text-decoration: none;
}

.site-header__logo-img {
  height: 36px;
  width: auto;
}

.site-header__logo-wordmark {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  letter-spacing: var(--tracking-snug);
}

.site-header__nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-1);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.site-header__hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  color: var(--color-navy);
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.site-header__hamburger:hover {
  background-color: var(--color-navy-subtle);
}

@media (max-width: 1023px) {
  .site-header__nav { display: none; }
  .site-header__hamburger { display: flex; }
}


/* ─────────────────────────────────────────────────────────────────────
   2. DESKTOP NAVIGATION
────────────────────────────────────────────────────────────────────── */

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-ink-secondary);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition:
    color var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard);
  white-space: nowrap;
  user-select: none;
}

.nav-link:hover {
  color: var(--color-navy);
  background-color: var(--color-navy-subtle);
}

.nav-link.is-active {
  color: var(--color-navy);
  font-weight: var(--weight-semibold);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  bottom: -1px; /* flush with header bottom border */
  left: var(--space-3);
  right: var(--space-3);
  height: 2px;
  background-color: var(--color-bronze);
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
}

/* Chevron icon within nav-link */
.nav-link__chevron {
  width: 14px;
  height: 14px;
  transition: transform var(--duration-base) var(--ease-standard);
  flex-shrink: 0;
}

.nav-item.is-open > .nav-link .nav-link__chevron {
  transform: rotate(180deg);
}


/* ─────────────────────────────────────────────────────────────────────
   3. PRODUCT MEGA-MENU
────────────────────────────────────────────────────────────────────── */

.mega-menu {
  position: absolute;
  top: calc(100% + var(--space-1));
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
  z-index: var(--z-dropdown);
  display: none;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.nav-item.is-open > .mega-menu {
  display: grid;
  animation: menu-enter var(--duration-base) var(--ease-enter) forwards;
}

@keyframes menu-enter {
  from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.mega-menu__col-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-bronze);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
}

.mega-menu__col-label--mt {
  margin-top: var(--space-6);
}

.mega-menu__group {
  margin-bottom: var(--space-4);
}

.mega-menu__group-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-ink-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin-bottom: var(--space-2);
}

.mega-menu__link {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-2);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.mega-menu__link:hover {
  background-color: var(--color-navy-subtle);
}

.mega-menu__link-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-navy);
}

.mega-menu__link-series {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
}

.mega-menu__footer {
  grid-column: 1 / -1;
  padding-top: var(--space-4);
  border-top: var(--border-thin) solid var(--color-border-subtle);
  display: flex;
  gap: var(--space-4);
}


/* ─────────────────────────────────────────────────────────────────────
   4. MOBILE NAVIGATION
────────────────────────────────────────────────────────────────────── */

.mobile-nav {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  pointer-events: none;
}

.mobile-nav.is-open {
  pointer-events: all;
}

.mobile-nav__backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-surface-overlay);
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-standard);
}

.mobile-nav.is-open .mobile-nav__backdrop {
  opacity: 1;
}

.mobile-nav__drawer {
  position: relative;
  width: min(340px, 85vw);
  height: 100%;
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform var(--duration-slow) var(--ease-enter);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.mobile-nav.is-open .mobile-nav__drawer {
  transform: translateX(0);
}

.mobile-nav__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
  height: 72px;
  flex-shrink: 0;
}

.mobile-nav__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  color: var(--color-ink-secondary);
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.mobile-nav__close:hover {
  background-color: var(--color-navy-subtle);
  color: var(--color-navy);
}

.mobile-nav__body {
  flex: 1;
  padding: var(--space-4) 0;
}

.mobile-nav__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--color-ink);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.mobile-nav__link:hover {
  background-color: var(--color-navy-subtle);
  color: var(--color-navy);
}

.mobile-nav__accordion-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--color-ink);
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.mobile-nav__accordion-btn:hover {
  background-color: var(--color-navy-subtle);
  color: var(--color-navy);
}

.mobile-nav__accordion-btn .nav-link__chevron {
  transition: transform var(--duration-base) var(--ease-standard);
}

.mobile-nav__accordion-btn[aria-expanded="true"] .nav-link__chevron {
  transform: rotate(180deg);
}

.mobile-nav__submenu {
  background-color: var(--color-canvas);
  overflow: hidden;
}

.mobile-nav__submenu[aria-hidden="true"] { display: none; }

.mobile-nav__submenu-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-ink-secondary);
  padding: var(--space-3) var(--space-6) var(--space-1);
}

.mobile-nav__submenu-link {
  display: block;
  padding: var(--space-2) var(--space-8);
  font-size: var(--text-sm);
  color: var(--color-navy);
  font-weight: var(--weight-medium);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.mobile-nav__submenu-link:hover {
  background-color: var(--color-navy-subtle);
}

.mobile-nav__footer {
  padding: var(--space-6);
  border-top: var(--border-thin) solid var(--color-border-subtle);
  flex-shrink: 0;
}


/* ─────────────────────────────────────────────────────────────────────
   5. BREADCRUMBS
────────────────────────────────────────────────────────────────────── */

.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  padding-block: var(--space-3);
}

.breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.breadcrumbs__link {
  color: var(--color-ink-secondary);
  text-decoration: none;
  font-weight: var(--weight-medium);
  transition: color var(--duration-fast) var(--ease-standard);
}

.breadcrumbs__link:hover {
  color: var(--color-navy);
  text-decoration: underline;
}

.breadcrumbs__separator {
  color: var(--color-border);
  font-size: var(--text-xs);
  user-select: none;
}

.breadcrumbs__current {
  color: var(--color-ink);
  font-weight: var(--weight-medium);
}

/* List container — the <ol> inside any breadcrumb nav */
.breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
}

/* Plain-<li> pattern (type/category/product-detail templates) */
.breadcrumbs__list li {
  display: flex;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
}

.breadcrumbs__list li[aria-hidden="true"] {
  padding-inline: var(--space-2);
  color: var(--color-border);
  user-select: none;
}

.breadcrumbs__list a {
  color: var(--color-ink-secondary);
  text-decoration: none;
  font-weight: var(--weight-medium);
  transition: color var(--duration-fast) var(--ease-standard);
}

.breadcrumbs__list a:hover {
  color: var(--color-navy);
  text-decoration: underline;
}

.breadcrumbs__list a:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  border-radius: var(--radius-xs);
}

/* Current-page modifier (products overview breadcrumb) */
.breadcrumbs__item--current {
  color: var(--color-ink);
  font-weight: var(--weight-medium);
  font-size: var(--text-sm);
}

/* Full-width nav wrapper — type / category / product-detail pages */
.breadcrumb-bar {
  background: var(--color-canvas);
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
  padding-block: var(--space-3);
}


/* ─────────────────────────────────────────────────────────────────────
   6. BUTTONS
────────────────────────────────────────────────────────────────────── */

/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-sm);
  border: var(--border-thick) solid transparent;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color           var(--duration-fast) var(--ease-standard),
    border-color    var(--duration-fast) var(--ease-standard),
    box-shadow      var(--duration-fast) var(--ease-standard),
    transform       var(--duration-fast) var(--ease-standard);
}

.btn:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
}

.btn:disabled,
.btn[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.45;
  pointer-events: none;
}

/* Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
  gap: var(--space-1);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

/* Icons in buttons */
.btn svg, .btn img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.btn-sm svg { width: 14px; height: 14px; }
.btn-lg svg { width: 18px; height: 18px; }

/* Loading state */
.btn.is-loading {
  pointer-events: none;
  position: relative;
}

.btn.is-loading::after {
  content: '';
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%; /* circle:ok — loading spinner */
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}


/* Primary — Navy fill */
.btn-primary {
  background-color: var(--color-navy);
  color: var(--color-ink-inverse);
  border-color: var(--color-navy);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-navy-hover);
  border-color: var(--color-navy-hover);
}

.btn-primary:active:not(:disabled) {
  background-color: var(--color-navy-active);
  border-color: var(--color-navy-active);
}


/* Secondary — Interactive Bronze fill
   Uses --color-bronze-interactive (#8F6338), not decorative --color-bronze (#A77A45).
   White on #8F6338 = 5.24:1 — passes WCAG AA for normal text at any size. */
.btn-secondary {
  background-color: var(--color-bronze-interactive);
  color: var(--color-ink-inverse);
  border-color: var(--color-bronze-interactive);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-bronze-interactive-hover);
  border-color: var(--color-bronze-interactive-hover);
}

.btn-secondary:active:not(:disabled) {
  background-color: var(--color-bronze-interactive-active);
  border-color: var(--color-bronze-interactive-active);
}


/* Outline — Navy stroke */
.btn-outline {
  background-color: transparent;
  color: var(--color-navy);
  border-color: var(--color-navy);
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--color-navy-subtle);
}

.btn-outline:active:not(:disabled) {
  background-color: var(--color-navy-subtle);
}


/* Ghost — no border, transparent */
.btn-ghost {
  background-color: transparent;
  color: var(--color-navy);
  border-color: transparent;
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-navy-subtle);
}

.btn-ghost:active:not(:disabled) {
  background-color: var(--color-navy-subtle);
}


/* Ghost Inverse — for dark backgrounds */
.btn-ghost-inverse {
  background-color: transparent;
  color: var(--color-ink-inverse);
  border-color: transparent;
}

.btn-ghost-inverse:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Outline Inverse — outline button for use on dark/navy backgrounds */
.btn-outline-inverse {
  background: transparent;
  color: var(--color-ink-inverse);
  border-color: var(--color-ink-inverse);
}
.btn-outline-inverse:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
}
.btn-outline-inverse:active:not(:disabled) {
  background: rgba(255, 255, 255, 0.22);
}


/* Danger */
.btn-danger {
  background-color: var(--color-error);
  color: var(--color-ink-inverse);
  border-color: var(--color-error);
}

.btn-danger:hover:not(:disabled) {
  filter: brightness(1.1);
}


/* Icon-only buttons */
.btn-icon {
  padding: var(--space-2);
  width: 36px;
  height: 36px;
}

.btn-icon.btn-sm {
  width: 28px;
  height: 28px;
  padding: var(--space-1);
}

.btn-icon.btn-lg {
  width: 44px;
  height: 44px;
  padding: var(--space-3);
}


/* ─────────────────────────────────────────────────────────────────────
   7. LINKS
────────────────────────────────────────────────────────────────────── */

.link {
  color: var(--color-navy);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--color-navy-border);
  font-weight: var(--weight-medium);
  transition:
    color var(--duration-fast) var(--ease-standard),
    text-decoration-color var(--duration-fast) var(--ease-standard);
}

.link:hover {
  color: var(--color-navy-hover);
  text-decoration-color: var(--color-navy-hover);
}

.link-inline {
  color: var(--color-navy);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: var(--color-navy-border);
  transition: color var(--duration-fast) var(--ease-standard);
}

.link-inline:hover {
  color: var(--color-navy-hover);
  text-decoration-color: var(--color-navy);
}

/* Download link with arrow indicator */
.link-download {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-navy);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.link-download:hover {
  color: var(--color-navy-hover);
}

.link-download svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

/* Standalone CTA link — icon-led call-to-action outside body copy */
.link-standalone {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}
.link-standalone:hover {
  color: var(--color-bronze);
}
.link-standalone:focus-visible {
  outline: 2px solid var(--color-bronze);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}


/* ─────────────────────────────────────────────────────────────────────
   8. FORM FIELDS
────────────────────────────────────────────────────────────────────── */

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-ink);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.form-label__required {
  color: var(--color-error);
  font-size: var(--text-base);
  line-height: 1;
}

.form-hint {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  line-height: var(--leading-normal);
}

.form-error {
  font-size: var(--text-xs);
  color: var(--color-error);
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
}

.form-error svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* form-* control classes — BEM-prefixed aliases for form inputs */
.form-input {
  display: block;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-ink);
  background: var(--color-surface);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-sm);
  line-height: var(--leading-normal);
  transition: border-color var(--duration-fast) var(--ease-standard),
              box-shadow var(--duration-fast) var(--ease-standard);
  appearance: none;
}
.form-input::placeholder { color: var(--color-ink-secondary); }
.form-input:hover:not(:disabled) { border-color: var(--color-border-strong); }
.form-input:focus {
  outline: none;
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px var(--color-navy-subtle);
}
.form-input:disabled {
  background: var(--color-canvas);
  color: var(--color-ink-disabled);
  cursor: not-allowed;
}
.form-input.is-error { border-color: var(--color-error); }
.form-input.is-error:focus { box-shadow: 0 0 0 3px var(--color-error-subtle); }

.form-textarea { min-height: 120px; resize: vertical; }

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%2317222b' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-8);
  cursor: pointer;
}

.form-checkbox,
.form-radio {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-ink);
  cursor: pointer;
}

.form-label__optional {
  font-weight: 400;
  color: var(--color-ink-secondary);
  font-size: var(--text-sm);
}

/* Input base */
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-ink);
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-sm);
  line-height: var(--leading-normal);
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    box-shadow   var(--duration-fast) var(--ease-standard);
  appearance: none;
}

.input::placeholder {
  /* --color-ink-secondary (#64717A): 4.53:1 on canvas, 5.02:1 on white — WCAG AA ≥ 3:1 ✓ */
  color: var(--color-ink-secondary);
}

.input:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.input:focus {
  outline: none;
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px var(--color-navy-subtle);
}

.input:disabled {
  background-color: var(--color-canvas);
  color: var(--color-ink-disabled);
  cursor: not-allowed;
}

.input.is-error {
  border-color: var(--color-error);
}

.input.is-error:focus {
  box-shadow: 0 0 0 3px var(--color-error-subtle);
}

.input.is-success {
  border-color: var(--color-success);
}

/* Textarea */
.textarea {
  min-height: 120px;
  resize: vertical;
}

/* Input with icon */
.input-wrapper {
  position: relative;
}

.input-wrapper .input {
  padding-left: var(--space-10);
}

.input-wrapper .input-icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-ink-tertiary);
  pointer-events: none;
}

/* Sizes */
.input-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
}

.input-lg {
  padding: var(--space-4) var(--space-5);
  font-size: var(--text-base);
}


/* ─────────────────────────────────────────────────────────────────────
   9. SELECT CONTROLS
────────────────────────────────────────────────────────────────────── */

.select {
  width: 100%;
  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-ink);
  background-color: var(--color-surface);
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%2364717A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-sm);
  appearance: none;
  cursor: pointer;
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    box-shadow   var(--duration-fast) var(--ease-standard);
}

.select:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.select:focus {
  outline: none;
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px var(--color-navy-subtle);
}

.select:disabled {
  background-color: var(--color-canvas);
  color: var(--color-ink-disabled);
  cursor: not-allowed;
}

.select.is-error {
  border-color: var(--color-error);
}


/* ─────────────────────────────────────────────────────────────────────
  10. CHECKBOXES & RADIOS
────────────────────────────────────────────────────────────────────── */

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--color-ink);
  line-height: var(--leading-normal);
  user-select: none;
}

.checkbox-label.is-disabled,
.radio-label.is-disabled {
  color: var(--color-ink-disabled);
  cursor: not-allowed;
}

/* Custom control visuals */
.checkbox-input,
.radio-input {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: var(--border-thick) solid var(--color-border-strong);
  background-color: var(--color-surface);
  cursor: pointer;
  transition:
    border-color  var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard),
    box-shadow    var(--duration-fast) var(--ease-standard);
  margin-top: 1px; /* align with first line of text */
}

.checkbox-input {
  border-radius: var(--radius-xs);
}

.radio-input {
  border-radius: 50%; /* circle:ok — radio control per HTML spec */
}

.checkbox-input:hover:not(:disabled),
.radio-input:hover:not(:disabled) {
  border-color: var(--color-navy);
}

.checkbox-input:focus-visible,
.radio-input:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Checked states */
.checkbox-input:checked {
  background-color: var(--color-navy);
  border-color: var(--color-navy);
  background-image: url("data:image/svg+xml,%3Csvg width='11' height='8' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L4 7L10 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.radio-input:checked {
  border-color: var(--color-navy);
  box-shadow: inset 0 0 0 4px var(--color-navy);
}

.checkbox-input:disabled,
.radio-input:disabled {
  border-color: var(--color-border-subtle);
  background-color: var(--color-canvas);
  cursor: not-allowed;
}

/* Checkbox indeterminate */
.checkbox-input:indeterminate {
  background-color: var(--color-navy);
  border-color: var(--color-navy);
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='2' viewBox='0 0 10 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1H9' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.checkbox-label__text,
.radio-label__text {
  flex: 1;
}

.checkbox-label__hint,
.radio-label__hint {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  margin-top: var(--space-1);
}


/* ─────────────────────────────────────────────────────────────────────
  11. FILE UPLOAD
────────────────────────────────────────────────────────────────────── */

.file-upload {
  width: 100%;
}

.file-upload__zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-8) var(--space-6);
  border: var(--border-thick) dashed var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-canvas);
  text-align: center;
  cursor: pointer;
  transition:
    border-color     var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard);
}

.file-upload__zone:hover,
.file-upload__zone.is-dragover {
  border-color: var(--color-navy);
  background-color: var(--color-navy-subtle);
}

.file-upload__icon {
  width: 36px;
  height: 36px;
  color: var(--color-ink-tertiary);
}

.file-upload__text {
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
}

.file-upload__text strong {
  color: var(--color-navy);
}

.file-upload__hint {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
}

.file-upload__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  overflow: hidden;
}

.file-upload__file-list {
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.file-upload__file-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
}

.file-upload__file-name {
  flex: 1;
  color: var(--color-ink);
  font-weight: var(--weight-medium);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-upload__file-size {
  color: var(--color-ink-secondary);
  white-space: nowrap;
}


/* ─────────────────────────────────────────────────────────────────────
  12. PRODUCT-SERIES CARD
────────────────────────────────────────────────────────────────────── */

.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow   var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard),
    transform    var(--duration-base) var(--ease-standard);
}

.product-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border);
  transform: translateY(-2px);
}

.product-card:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

.product-card__image {
  aspect-ratio: 4 / 3;
  width: 100%;
  background-color: var(--color-canvas);
  overflow: hidden;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-standard);
}

.product-card:hover .product-card__image img {
  transform: scale(1.03);
}

.product-card__body {
  padding: var(--space-5) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.product-card__tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.product-card__tag {
  font-size: var(--text-2xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-bronze);
  background-color: var(--color-bronze-subtle);
  border: var(--border-thin) solid var(--color-bronze-border);
  border-radius: var(--radius-xs);
  padding: 2px var(--space-2);
}

.product-card__series {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  font-weight: var(--weight-medium);
}

.product-card__name {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  line-height: var(--leading-snug);
}

.product-card__desc {
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
  flex: 1;
}

.product-card__footer {
  padding: var(--space-4) var(--space-6);
  border-top: var(--border-thin) solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card__link-text {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Link wrapper around the card image — allows keyboard users to activate the image */
.product-card__image-link {
  display: block;
  overflow: hidden;
}


/* ─────────────────────────────────────────────────────────────────────
  13. PROJECT CARD
────────────────────────────────────────────────────────────────────── */

.project-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 3 / 2;
  background-color: var(--color-canvas);
  text-decoration: none;
  display: block;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-standard);
}

.project-card:hover .project-card__image {
  transform: scale(1.04);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(23, 34, 43, 0.85) 0%,
    rgba(23, 34, 43, 0.2) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-6);
}

.project-card__location {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-bronze);
  margin-bottom: var(--space-2);
}

.project-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--color-ink-inverse);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-1);
}

.project-card__product {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.7);
}


/* ─────────────────────────────────────────────────────────────────────
  14. SPECIFICATION TABLE
────────────────────────────────────────────────────────────────────── */

.spec-table {
  width: 100%;
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.spec-table__row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
}

.spec-table__row:last-child {
  border-bottom: none;
}

.spec-table__row:nth-child(even) {
  background-color: var(--color-canvas);
}

.spec-table__label {
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-ink-secondary);
  border-right: var(--border-thin) solid var(--color-border-subtle);
  display: flex;
  align-items: center;
}

.spec-table__value {
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums; /* Inter tabular figures for aligned numeric values */
  color: var(--color-ink);
  font-weight: var(--weight-medium);
  display: flex;
  align-items: center;
}

.spec-table__value--emphasis {
  color: var(--color-navy);
  font-weight: var(--weight-semibold);
}

@media (max-width: 479px) {
  .spec-table__row { grid-template-columns: 1fr; }
  .spec-table__label { border-right: none; border-bottom: var(--border-thin) solid var(--color-border-subtle); }
}

/* Additional spec-table elements */
.spec-table__caption {
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  text-align: left;
  padding: var(--space-3) var(--space-4);
  caption-side: top;
}
.spec-table__header {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  background: var(--color-navy);
  color: var(--color-ink-inverse);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
}
.spec-table__note {
  color: var(--color-ink-secondary);
  font-size: var(--text-sm);
}


/* ─────────────────────────────────────────────────────────────────────
  15. COMPARISON TABLE
────────────────────────────────────────────────────────────────────── */

.comparison-table {
  width: 100%;
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  overflow-x: auto;
}

.comparison-table table {
  min-width: 480px;
}

.comparison-table thead {
  background-color: var(--color-navy);
  color: var(--color-ink-inverse);
}

.comparison-table th {
  padding: var(--space-4) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  text-align: left;
}

.comparison-table th:first-child {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: rgba(255, 255, 255, 0.65);
}

.comparison-table td {
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  color: var(--color-ink);
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
  vertical-align: middle;
}

.comparison-table tr:nth-child(even) td {
  background-color: var(--color-canvas);
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table td:first-child {
  font-weight: var(--weight-medium);
  color: var(--color-ink-secondary);
}

/* Check/cross icons in cells */
.comparison-table .cell-yes { color: var(--color-success); }
.comparison-table .cell-no  { color: var(--color-ink-disabled); }


/* ─────────────────────────────────────────────────────────────────────
  16. FEATURE LIST
────────────────────────────────────────────────────────────────────── */

.feature-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.feature-list__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.feature-list__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-bronze);
  margin-top: 1px;
}

.feature-list__content {
  flex: 1;
}

.feature-list__title {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-bottom: var(--space-1);
}

.feature-list__desc {
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
}

/* Compact variant — no descriptions */
.feature-list--compact .feature-list__item {
  gap: var(--space-3);
  align-items: center;
}

.feature-list--compact .feature-list__title {
  font-size: var(--text-sm);
  margin-bottom: 0;
}

.feature-list--compact .feature-list__icon {
  width: 16px;
  height: 16px;
}

/* Grid layout for feature lists */
.feature-list--grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6) var(--space-8);
}

@media (max-width: 767px) {
  .feature-list--grid { grid-template-columns: 1fr; }
}


/* ─────────────────────────────────────────────────────────────────────
  17. CERTIFICATION / DOCUMENT LINK
────────────────────────────────────────────────────────────────────── */

.cert-link {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition:
    box-shadow   var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard);
}

.cert-link:hover {
  border-color: var(--color-navy-border);
  box-shadow: var(--shadow-sm);
}

.cert-link__icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  color: var(--color-error); /* PDF red */
  display: flex;
  align-items: center;
  justify-content: center;
}

.cert-link__info {
  flex: 1;
  min-width: 0;
}

.cert-link__name {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cert-link__meta {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  margin-top: var(--space-1);
}

.cert-link__action {
  flex-shrink: 0;
  color: var(--color-ink-tertiary);
  width: 18px;
  height: 18px;
}

.cert-link:hover .cert-link__action {
  color: var(--color-navy);
}


/* ─────────────────────────────────────────────────────────────────────
  18. FINISH SWATCH
────────────────────────────────────────────────────────────────────── */

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: var(--space-4);
}

.swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  text-align: center;
}

.swatch__circle {
  width: 52px;
  height: 52px;
  border-radius: 50%; /* circle:ok — finish swatch colour disc */
  border: 2px solid var(--color-border-subtle);
  box-shadow: var(--shadow-sm);
  transition:
    transform     var(--duration-fast) var(--ease-standard),
    border-color  var(--duration-fast) var(--ease-standard),
    box-shadow    var(--duration-fast) var(--ease-standard);
  position: relative;
}

.swatch:hover .swatch__circle {
  transform: scale(1.08);
  border-color: var(--color-border-strong);
}

.swatch.is-selected .swatch__circle {
  border-color: var(--color-navy);
  border-width: 3px;
  box-shadow: 0 0 0 3px var(--color-navy-subtle);
}

.swatch.is-selected .swatch__circle::after {
  content: '';
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 16px;
  height: 16px;
  background-color: var(--color-navy);
  border-radius: 50%; /* circle:ok — selected-state checkmark badge */
  background-image: url("data:image/svg+xml,%3Csvg width='9' height='7' viewBox='0 0 9 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.5L3.5 6L8 1' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.swatch__name {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-ink-secondary);
  line-height: var(--leading-snug);
  max-width: 72px;
  word-break: break-word;
}

.swatch__code {
  font-size: var(--text-2xs);
  color: var(--color-ink-secondary);
}


/* ─────────────────────────────────────────────────────────────────────
  19. HARDWARE OPTION
────────────────────────────────────────────────────────────────────── */

.hardware-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-4);
}

.hardware-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: center;
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    box-shadow   var(--duration-fast) var(--ease-standard);
}

.hardware-option:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-sm);
}

.hardware-option.is-selected {
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px var(--color-navy-subtle);
}

.hardware-option__image {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: var(--radius-sm);
  background-color: var(--color-canvas);
}

.hardware-option__name {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  line-height: var(--leading-snug);
}

.hardware-option__brand {
  font-size: var(--text-2xs);
  color: var(--color-ink-secondary);
}


/* ─────────────────────────────────────────────────────────────────────
  20. IMAGE GALLERY
────────────────────────────────────────────────────────────────────── */

.gallery {
  display: grid;
  gap: var(--space-2);
}

.gallery--2col { grid-template-columns: repeat(2, 1fr); }
.gallery--3col { grid-template-columns: repeat(3, 1fr); }
.gallery--4col { grid-template-columns: repeat(4, 1fr); }

.gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
  aspect-ratio: 4 / 3;
  cursor: pointer;
  background-color: var(--color-canvas);
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-standard);
}

.gallery__item:hover img {
  transform: scale(1.04);
}

.gallery__item:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Overlay on hover */
.gallery__item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(23, 34, 43, 0);
  transition: background var(--duration-fast) var(--ease-standard);
}

.gallery__item:hover::after {
  background: rgba(23, 34, 43, 0.15);
}

/* Featured / large first item */
.gallery__item--featured {
  grid-column: span 2;
  aspect-ratio: 16 / 9;
}

@media (max-width: 767px) {
  .gallery--3col, .gallery--4col { grid-template-columns: repeat(2, 1fr); }
  .gallery__item--featured { grid-column: span 1; }
}


/* ─────────────────────────────────────────────────────────────────────
  21. ACCORDION
────────────────────────────────────────────────────────────────────── */

.accordion {
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.accordion__item {
  border-bottom: var(--border-thin) solid var(--color-border-subtle);
}

.accordion__item:last-child {
  border-bottom: none;
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-5) var(--space-6);
  background-color: var(--color-surface);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-ink);
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color            var(--duration-fast) var(--ease-standard);
  gap: var(--space-4);
}

.accordion__trigger:hover {
  background-color: var(--color-canvas);
  color: var(--color-navy);
}

.accordion__trigger[aria-expanded="true"] {
  color: var(--color-navy);
}

.accordion__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-bronze);
  transition: transform var(--duration-base) var(--ease-standard);
}

.accordion__trigger[aria-expanded="true"] .accordion__icon {
  transform: rotate(45deg);
}

.accordion__content {
  overflow: hidden;
  background-color: var(--color-surface);
}

.accordion__content[aria-hidden="true"] {
  display: none;
}

.accordion__body {
  padding: 0 var(--space-6) var(--space-6);
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
}

.accordion__body p + p {
  margin-top: var(--space-3);
}

/* Heading wrapper — h2/h3 around .accordion__trigger, removes default margin */
.accordion__heading {
  margin: 0;
}


/* ─────────────────────────────────────────────────────────────────────
  22. TABS
────────────────────────────────────────────────────────────────────── */

.tabs {
  width: 100%;
}

.tabs__list {
  display: flex;
  border-bottom: var(--border-thick) solid var(--color-border-subtle);
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs__list::-webkit-scrollbar { display: none; }

.tabs__tab {
  position: relative;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-ink-secondary);
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color var(--duration-fast) var(--ease-standard);
  flex-shrink: 0;
}

.tabs__tab::after {
  content: '';
  position: absolute;
  bottom: -2px; /* overlaps border-bottom */
  left: var(--space-3);
  right: var(--space-3);
  height: 2px;
  background-color: transparent;
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.tabs__tab:hover {
  color: var(--color-navy);
}

.tabs__tab[aria-selected="true"] {
  color: var(--color-navy);
  font-weight: var(--weight-semibold);
}

.tabs__tab[aria-selected="true"]::after {
  background-color: var(--color-bronze);
}

.tabs__tab:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: calc(-1 * var(--focus-ring-offset));
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
}

.tabs__panel {
  padding-top: var(--space-6);
}

.tabs__panel[aria-hidden="true"] { display: none; }


/* ─────────────────────────────────────────────────────────────────────
  23. QUOTE FORM
────────────────────────────────────────────────────────────────────── */

.quote-form {
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-8);
}

.quote-form__header {
  margin-bottom: var(--space-8);
}

.quote-form__title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  margin-bottom: var(--space-2);
}

.quote-form__subtitle {
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
}

.quote-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

.quote-form__grid .form-group--full {
  grid-column: 1 / -1;
}

.quote-form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-6);
  gap: var(--space-4);
  flex-wrap: wrap;
}

.quote-form__privacy {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 767px) {
  .quote-form { padding: var(--space-6); }
  .quote-form__grid { grid-template-columns: 1fr; }
  .quote-form__footer { flex-direction: column; align-items: stretch; }
}


/* ─────────────────────────────────────────────────────────────────────
  24. DOWNLOAD BLOCK
────────────────────────────────────────────────────────────────────── */

.download-block {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    box-shadow   var(--duration-fast) var(--ease-standard);
}

.download-block:hover {
  border-color: var(--color-navy-border);
  box-shadow: var(--shadow-sm);
}

.download-block__icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-block__icon--pdf { background-color: var(--color-error-subtle); color: var(--color-error); }
.download-block__icon--dwg { background-color: var(--color-navy-subtle);  color: var(--color-navy);  }
.download-block__icon--doc { background-color: var(--color-info-subtle);   color: var(--color-info);  }

.download-block__icon svg {
  width: 20px;
  height: 20px;
}

.download-block__info {
  flex: 1;
  min-width: 0;
}

.download-block__name {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.download-block__meta {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  margin-top: 2px;
}

.download-block__action {
  flex-shrink: 0;
}


/* ─────────────────────────────────────────────────────────────────────
  25. FOOTER
────────────────────────────────────────────────────────────────────── */

.site-footer {
  background-color: var(--color-navy);
  color: var(--color-ink-inverse);
  padding-top: var(--space-16);
}

.site-footer__main {
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--gutter);
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: var(--space-12);
  padding-bottom: var(--space-12);
}

.site-footer__brand-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--color-ink-inverse);
  margin-bottom: var(--space-3);
}

.site-footer__brand-desc {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
  line-height: var(--leading-relaxed);
  max-width: 28ch;
}

.site-footer__col-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-bronze);
  margin-bottom: var(--space-4);
}

.site-footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.site-footer__link {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.site-footer__link:hover {
  color: var(--color-ink-inverse);
}

.site-footer__contact-item {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  align-items: flex-start;
}

.site-footer__contact-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-bronze);
}

.site-footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-block: var(--space-6);
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.site-footer__copy {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.4);
}

.site-footer__legal-links {
  display: flex;
  gap: var(--space-6);
}

.site-footer__legal-link {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.site-footer__legal-link:hover {
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1023px) {
  .site-footer__main { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 767px) {
  .site-footer__main { grid-template-columns: 1fr; gap: var(--space-8); }
  .site-footer__bottom { flex-direction: column; align-items: flex-start; }
}

@media (min-width: 768px) {
  .site-footer__main { padding-inline: var(--gutter-md); }
  .site-footer__bottom { padding-inline: var(--gutter-md); }
}

@media (min-width: 1024px) {
  .site-footer__main { padding-inline: var(--gutter-lg); }
  .site-footer__bottom { padding-inline: var(--gutter-lg); }
}


/* ─────────────────────────────────────────────────────────────────────
  26. NOTIFICATION / VALIDATION MESSAGES
────────────────────────────────────────────────────────────────────── */

.notification {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  border-width: var(--border-thin);
  border-style: solid;
  position: relative;
}

/* Variants */
.notification--success {
  background-color: var(--color-success-subtle);
  border-color: var(--color-success-border);
  color: var(--color-success);
}

.notification--error {
  background-color: var(--color-error-subtle);
  border-color: var(--color-error-border);
  color: var(--color-error);
}

.notification--warning {
  background-color: var(--color-warning-subtle);
  border-color: var(--color-warning-border);
  color: var(--color-warning);
}

.notification--info {
  background-color: var(--color-info-subtle);
  border-color: var(--color-info-border);
  color: var(--color-info);
}

.notification__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.notification__content {
  flex: 1;
}

.notification__title {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  /* Title uses --color-ink (inherited via .notification__content), not the themed
     semantic colour. --color-warning on warning-subtle is only 4.24:1 — fails AA
     for normal text at 14px. Keeping title in --color-ink gives ≥14:1 on all
     notification backgrounds. The themed colour is used only on the icon. */
  color: var(--color-ink);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-1);
}

.notification__body {
  font-size: var(--text-sm);
  color: var(--color-ink);
  line-height: var(--leading-relaxed);
  opacity: 0.85;
}

.notification__close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xs);
  opacity: 0.6;
  transition: opacity var(--duration-fast) var(--ease-standard);
}

.notification__close:hover { opacity: 1; }

/* Inline field validation (below inputs) */
.field-validation {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  line-height: var(--leading-snug);
  margin-top: var(--space-1);
}

.field-validation svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.field-validation--error   { color: var(--color-error); }
.field-validation--success  { color: var(--color-success); }
.field-validation--hint     { color: var(--color-ink-secondary); }


/* ─────────────────────────────────────────────────────────────────────
   BADGES / CHIPS  (utility, used in many contexts)
────────────────────────────────────────────────────────────────────── */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-2xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  border-radius: var(--radius-sm);
  border: var(--border-thin) solid transparent;
  line-height: 1;
  white-space: nowrap;
}

.badge-navy    { background-color: var(--color-navy-subtle);    color: var(--color-navy);    border-color: var(--color-navy-border); }
.badge-bronze  { background-color: var(--color-bronze-subtle);  color: var(--color-bronze);  border-color: var(--color-bronze-border); }
.badge-success { background-color: var(--color-success-subtle); color: var(--color-success); border-color: var(--color-success-border); }
.badge-error   { background-color: var(--color-error-subtle);   color: var(--color-error);   border-color: var(--color-error-border); }
.badge-neutral { background-color: var(--color-canvas);         color: var(--color-ink-secondary); border-color: var(--color-border); }
.badge-info    { background-color: var(--color-navy-subtle);    color: var(--color-navy);    border-color: var(--color-navy-border); }
.badge-warning { background-color: var(--color-bronze-subtle);  color: var(--color-bronze);  border-color: var(--color-bronze-border); }


/* ─────────────────────────────────────────────────────────────────────
  27. SKIP LINK
────────────────────────────────────────────────────────────────────── */

.skip-link {
  position: absolute;
  left: var(--space-4);
  top: var(--space-4);
  z-index: 9999;
  padding: var(--space-2) var(--space-4);
  background: var(--color-navy);
  color: var(--color-ink-inverse);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  border-radius: var(--radius-sm);
  transform: translateY(-200%);
  transition: transform var(--duration-fast) var(--ease-standard);
}
.skip-link:focus { transform: translateY(0); }


/* ─────────────────────────────────────────────────────────────────────
  28. PAGE SECTIONS
────────────────────────────────────────────────────────────────────── */

.page-section {
  padding-block: var(--space-16);
}
.page-section--sm {
  padding-block: var(--space-10);
}
.page-section--flush-top {
  padding-top: 0;
}
.page-section--canvas {
  background-color: var(--color-canvas);
}
.page-section--navy {
  background-color: var(--color-navy);
}


/* ─────────────────────────────────────────────────────────────────────
  29. SECTION LABELS / OVERLINES
────────────────────────────────────────────────────────────────────── */

.section-overline {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-bronze);
  margin-bottom: var(--space-3);
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
}

@media (max-width: 767px) {
  .section-title { font-size: var(--text-2xl); }
}

.section-body {
  font-size: var(--text-body);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
  max-width: var(--content-measure-narrow);
}

/* Lead paragraph — intro copy below a section heading */
.section-lead {
  font-size: var(--text-lg);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
  max-width: var(--content-measure);
}

/* Section body spacing modifier (--space-10 not in base.css utilities) */
.section-body--mb-md { margin-bottom: var(--space-10); }

.section-divider {
  border: none;
  border-top: var(--border-thin) solid var(--color-border-subtle);
}


/* ─────────────────────────────────────────────────────────────────────
  30. PRODUCT HERO
────────────────────────────────────────────────────────────────────── */

.product-hero {
  padding-block: var(--space-12) var(--space-16);
  background-color: var(--color-surface);
}

.product-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

@media (max-width: 1023px) {
  .product-hero__inner {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

.product-hero__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-bronze);
  margin-bottom: var(--space-4);
}

.product-hero__tag::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 1px;
  background-color: var(--color-bronze);
}

.product-hero__title {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--weight-extrabold);
  color: var(--color-navy);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-6);
}

@media (max-width: 767px) {
  .product-hero__title { font-size: var(--text-4xl); }
}

/* Subtitle span inside h1 */
.product-hero__title-type {
  color: var(--color-ink-secondary);
  font-weight: var(--weight-semibold);
}

.product-hero__intro {
  font-size: var(--text-lg);
  color: var(--color-ink-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
  max-width: 52ch;
}

.product-hero__actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.product-hero__image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  background-color: var(--color-canvas);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: var(--border-thin) solid var(--color-border-subtle);
}

.product-hero__image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--color-ink-secondary);
  font-size: var(--text-sm);
  text-align: center;
  padding: var(--space-8);
}

.product-hero__image-placeholder svg {
  width: 40px;
  height: 40px;
  color: var(--color-border);
}

.product-hero__image-placeholder-note {
  font-size: var(--text-xs);
  color: var(--color-ink-secondary);
  background: var(--color-warning-subtle);
  border: var(--border-thin) solid var(--color-warning-border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  max-width: 30ch;
}


/* ─────────────────────────────────────────────────────────────────────
  31. GALLERY THUMBNAILS + LIGHTBOX
────────────────────────────────────────────────────────────────────── */

.gallery-section__thumbnails {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-6);
  list-style: none;
  padding: 0;
}

@media (max-width: 767px) {
  .gallery-section__thumbnails { grid-template-columns: repeat(2, 1fr); }
}

.gallery-thumb {
  aspect-ratio: 4 / 3;
  background-color: var(--color-canvas);
  border-radius: var(--radius-sm);
  border: var(--border-thin) solid var(--color-border-subtle);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-secondary);
  font-size: var(--text-xs);
  text-align: center;
  transition: border-color var(--duration-fast) var(--ease-standard),
              box-shadow var(--duration-fast) var(--ease-standard);
}

.gallery-thumb:hover {
  border-color: var(--color-navy-border);
  box-shadow: var(--shadow-sm);
}

.gallery-thumb:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Native <dialog> lightbox */
.lightbox {
  border: none;
  padding: 0;
  background: transparent;
  max-width: min(900px, calc(100vw - var(--space-8)));
  width: 100%;
  margin: auto;
  max-height: calc(100dvh - var(--space-16));
}

.lightbox::backdrop {
  background: var(--color-surface-overlay);
}

.lightbox:not([open]) { display: none; }

.lightbox__inner {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.lightbox__close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 1;
  width: 36px;
  height: 36px;
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink);
  box-shadow: var(--shadow-sm);
  border: var(--border-thin) solid var(--color-border-subtle);
}

.lightbox__close:hover { background: var(--color-canvas); }

.lightbox__image-area {
  aspect-ratio: 4 / 3;
  background: var(--color-canvas);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-secondary);
  font-size: var(--text-sm);
}


/* ─────────────────────────────────────────────────────────────────────
  32. FEATURES GRID
────────────────────────────────────────────────────────────────────── */

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-10) var(--space-16);
}

@media (max-width: 767px) {
  .features-grid { grid-template-columns: 1fr; gap: var(--space-8); }
}


/* ─────────────────────────────────────────────────────────────────────
  33. SPEC SECTION
────────────────────────────────────────────────────────────────────── */

.spec-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 1023px) {
  .spec-section__grid { grid-template-columns: 1fr; }
}

.spec-section__label {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-bottom: var(--space-4);
}


/* ─────────────────────────────────────────────────────────────────────
  34. PLACEHOLDER ELEMENTS
────────────────────────────────────────────────────────────────────── */

.placeholder__icon {
  display: block;
  margin: 0 auto var(--space-3);
}

.placeholder__title {
  font-weight: var(--weight-semibold);
  color: var(--color-ink);
  margin-bottom: var(--space-2);
}

.swatch-placeholder,
.hardware-placeholder,
.cert-placeholder {
  padding: var(--space-10);
  background: var(--color-canvas);
  border: var(--border-thin) dashed var(--color-border);
  border-radius: var(--radius-md);
  text-align: center;
  color: var(--color-ink-secondary);
  font-size: var(--text-sm);
}

.cert-placeholder {
  padding: var(--space-8);
}

.finish-section__note {
  margin-top: var(--space-6);
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
}


/* ─────────────────────────────────────────────────────────────────────
  35. QUOTE BANNER
────────────────────────────────────────────────────────────────────── */

.quote-banner {
  background-color: var(--color-navy);
  padding-block: var(--space-16);
}

.quote-banner__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

@media (max-width: 1023px) {
  .quote-banner__inner { grid-template-columns: 1fr; gap: var(--space-10); }
}

.quote-banner__eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-bronze);
  margin-bottom: var(--space-3);
}

.quote-banner__title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  color: var(--color-ink-inverse);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
}

@media (max-width: 767px) {
  .quote-banner__title { font-size: var(--text-2xl); }
}

.quote-banner__body {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: var(--leading-relaxed);
  max-width: 44ch;
}


/* ─────────────────────────────────────────────────────────────────────
  36. PRODUCT PAGE UTILITIES
────────────────────────────────────────────────────────────────────── */

/* Field-level error text */
.form-error {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-error);
  margin-top: var(--space-1);
  min-height: 1.2em;
}

/* Error summary list */
.quote-form__error-list {
  margin-top: var(--space-2);
  padding-left: var(--space-5);
  list-style: disc;
}

.quote-form__error-list a {
  color: inherit;
  text-decoration: underline;
  font-size: var(--text-sm);
}

/* Links inside notification banners */
.notification a {
  color: inherit;
  text-decoration: underline;
  font-weight: var(--weight-semibold);
}

/* Full-width button (mobile nav footer, forms) */
.btn--block {
  width: 100%;
  justify-content: center;
}

/* Related series grid */
.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

@media (max-width: 767px) {
  .related-grid { grid-template-columns: 1fr; }
}

/* Image placeholder inside a product card */
.product-card__img-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-canvas);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-border);
  font-size: var(--text-xs);
}

/* Internal development notice banner */
.dev-notice {
  background: var(--color-warning-subtle);
  border: var(--border-thin) solid var(--color-warning-border);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-xs);
  color: var(--color-ink);
  text-align: center;
}

.dev-notice strong { color: var(--color-warning); }

/* Download grid */
.download-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

@media (max-width: 767px) {
  .download-grid { grid-template-columns: 1fr; }
}

/* Pending (unverified) download blocks */
.download-block--pending { opacity: 0.55; }

/* Certifications grid */
.cert-section__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

@media (max-width: 767px) {
  .cert-section__grid { grid-template-columns: 1fr; }
}


/* ─────────────────────────────────────────────────────────────────────
   37. OVERVIEW GRIDS
   Category cards (products overview), material cards (type overview),
   and product-series cards (category overview).
   All three share the same surface/border/hover/focus base.
────────────────────────────────────────────────────────────────────── */

/* ── Shared card base ───────────────────────────────────────────────── */
.category-card,
.material-card,
.product-series-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard);
}

.category-card:hover,
.material-card:hover,
.product-series-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
}

.category-card:focus-visible,
.material-card:focus-visible,
.product-series-card:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  border-radius: var(--radius-lg);
}

/* ── Category grid (products overview page) ─────────────────────────
   Promoted from src/products/index.html inline styles.
   4-col → 2-col → 1-col.
────────────────────────────────────────────────────────────────────── */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
  margin-top: var(--space-8);
}

.category-card {
  padding: var(--space-6);
}

.category-card__type {
  display: block;
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-ink-secondary);
  margin-bottom: var(--space-2);
}

.category-card__name {
  display: block;
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  font-family: var(--font-heading);
  color: var(--color-ink);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-2);
}

.category-card__count {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  flex: 1;
  padding-bottom: var(--space-4);
}

.category-card__cta {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-top: auto;
}

@media (max-width: 1023px) {
  .category-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 479px) {
  .category-grid { grid-template-columns: 1fr; }
}

/* ── Material grid (type overview page) ─────────────────────────────
   2-col → 1-col. Larger cards since there are only 2–4 materials.
────────────────────────────────────────────────────────────────────── */
.material-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
  margin-top: var(--space-8);
}

.material-card {
  padding: var(--space-8) var(--space-6);
}

.material-card__label {
  display: block;
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  font-family: var(--font-heading);
  color: var(--color-ink);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-2);
}

.material-card__count {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  flex: 1;
  padding-bottom: var(--space-4);
}

.material-card__link {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-top: auto;
}

@media (max-width: 479px) {
  .material-grid { grid-template-columns: 1fr; }
}

/* ── Product-series grid (category overview page) ───────────────────
   3-col → 2-col → 1-col. Cards include an image area.
────────────────────────────────────────────────────────────────────── */
.product-series-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
  margin-top: var(--space-8);
}

.product-series-card {
  overflow: hidden;
}

.product-series-card__image {
  background: var(--color-surface-secondary);
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.product-series-card__body {
  padding: var(--space-5);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-series-card__name {
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  font-family: var(--font-heading);
  color: var(--color-ink);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-1);
}

.product-series-card__type {
  font-size: var(--text-sm);
  color: var(--color-ink-secondary);
  flex: 1;
  padding-bottom: var(--space-3);
}

.product-series-card__link {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-top: auto;
}

@media (max-width: 1023px) {
  .product-series-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 479px) {
  .product-series-grid { grid-template-columns: 1fr; }
}

</style>

  <style>
    /* ── Skip link ───────────────────────────────────────── */
    .skip-link {
      position: absolute;
      top: -100%;
      left: var(--space-4);
      padding: var(--space-2) var(--space-4);
      background: var(--color-navy);
      color: var(--color-ink-inverse);
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      border-radius: var(--radius-sm);
      text-decoration: none;
      z-index: 9999;
    }
    .skip-link:focus { top: var(--space-2); }

    /* ── Development notice ──────────────────────────────── */
    .dev-notice {
      background: var(--color-warning-subtle);
      border-bottom: var(--border-thin) solid var(--color-warning-border);
      color: var(--color-warning);
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      padding: var(--space-2) var(--space-6);
      text-align: center;
    }
    .dev-notice code {
      font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace;
      font-size: var(--text-xs);
      background: var(--color-warning-border);
      padding: 1px var(--space-1);
      border-radius: var(--radius-xs);
    }

    /* ── Homepage hero ───────────────────────────────────── */
    .home-hero {
      background-color: var(--color-canvas);
      border-bottom: var(--border-thin) solid var(--color-border-subtle);
      padding-block: var(--space-16) var(--space-12);
    }

    .home-hero__inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: center;
    }

    .home-hero__eyebrow {
      display: block;
      font-size: var(--text-xs);
      font-weight: var(--weight-semibold);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-bronze-interactive);
      margin-bottom: var(--space-4);
    }

    .home-hero__title {
      font-family: var(--font-heading);
      font-size: var(--text-4xl);
      font-weight: var(--weight-extrabold);
      color: var(--color-navy);
      line-height: var(--leading-tight);
      margin-bottom: var(--space-5);
    }

    .home-hero__lead {
      font-size: var(--text-lg);
      color: var(--color-ink-secondary);
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-8);
      max-width: 44ch;
    }

    .home-hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
      align-items: center;
    }

    .home-hero__image-wrap {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      aspect-ratio: 4 / 3;
    }

    .home-hero__image-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── Category grid (homepage 2×2) ────────────────────── */
    .home-category-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-5);
      margin-top: var(--space-8);
    }

    .home-category-card {
      display: flex;
      flex-direction: column;
      background: var(--color-surface);
      border: var(--border-thin) solid var(--color-border);
      border-radius: var(--radius-lg);
      text-decoration: none;
      color: inherit;
      padding: var(--space-6);
      transition:
        box-shadow var(--duration-base) var(--ease-standard),
        border-color var(--duration-base) var(--ease-standard);
    }

    .home-category-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-border-strong);
    }

    .home-category-card:focus-visible {
      outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }

    .home-category-card__type {
      display: block;
      font-size: var(--text-xs);
      font-weight: var(--weight-semibold);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-ink-secondary);
      margin-bottom: var(--space-2);
    }

    .home-category-card__name {
      display: block;
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      color: var(--color-ink);
      line-height: var(--leading-snug);
      margin-bottom: var(--space-2);
    }

    .home-category-card__count {
      display: block;
      font-size: var(--text-sm);
      color: var(--color-ink-secondary);
      flex: 1;
    }

    .home-category-card__arrow {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-4);
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--color-bronze-interactive);
    }

    /* ── Contact CTA ─────────────────────────────────────── */
    .home-cta__title {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: var(--weight-bold);
      color: var(--color-navy);
      margin-bottom: var(--space-4);
    }

    .home-cta__text {
      font-size: var(--text-body);
      color: var(--color-ink-secondary);
      margin-bottom: var(--space-8);
      max-width: 54ch;
    }

    /* ── Responsive ──────────────────────────────────────── */
    @media (max-width: 767px) {
      .home-hero__inner {
        grid-template-columns: 1fr;
      }
      .home-hero__image-wrap {
        order: -1;
      }
      .home-hero__title {
        font-size: var(--text-3xl);
      }
      .home-category-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .home-hero__title {
        font-size: var(--text-3xl);
      }
    }
  </style>
</head>
<body>

  <a class="skip-link" href="#main">Skip to main content</a>

  <div class="dev-notice" role="note">
    <strong>Development build — do not publish.</strong>
    Product images are placeholders (image rights and product provenance are unverified).
    Page is marked <code>noindex</code>. Remove this notice and resolve all
    placeholders before launch.
  </div>

<header class="site-header" id="site-header">
  <div class="site-header__inner">

    <a href="/" class="site-header__logo" aria-label="Fenovera — go to homepage">
      <span class="site-header__logo-wordmark">Fenovera</span>
    </a>

    <nav class="site-header__nav" aria-label="Main navigation">

      <div class="nav-item" id="nav-products">
        <button class="nav-link"
          aria-haspopup="true" aria-expanded="false"
          aria-controls="mega-menu-products" type="button">
          Products
          <svg class="nav-link__chevron" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 1l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="mega-menu" id="mega-menu-products" role="region" aria-label="Products menu">

          <!-- Column 1: Windows -->
          <div>
            <div class="mega-menu__col-label">Windows</div>
            <div class="mega-menu__group">
              <a href="/products/windows/aluminum/" class="mega-menu__link">
                <span class="mega-menu__link-name">Aluminum Windows</span>
                <span class="mega-menu__link-series">5 systems</span>
              </a>
              <a href="/products/windows/upvc/" class="mega-menu__link">
                <span class="mega-menu__link-name">uPVC Windows</span>
                <span class="mega-menu__link-series">5 systems</span>
              </a>
              <a href="/products/windows/" class="mega-menu__link">
                <span class="mega-menu__link-name">All Windows</span>
              </a>
            </div>
          </div>

          <!-- Column 2: Doors -->
          <div>
            <div class="mega-menu__col-label">Doors</div>
            <div class="mega-menu__group">
              <a href="/products/doors/aluminum/" class="mega-menu__link">
                <span class="mega-menu__link-name">Aluminum Doors</span>
                <span class="mega-menu__link-series">1 system</span>
              </a>
              <a href="/products/doors/upvc/" class="mega-menu__link">
                <span class="mega-menu__link-name">uPVC Doors</span>
                <span class="mega-menu__link-series">2 systems</span>
              </a>
              <a href="/products/doors/" class="mega-menu__link">
                <span class="mega-menu__link-name">All Doors</span>
              </a>
            </div>
          </div>

          <div class="mega-menu__footer">
            <a href="/products/" class="link-standalone">
              All Products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="/quote/" class="link-standalone">
              Request a Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

        </div><!-- end mega-menu -->
      </div><!-- end nav-item -->

      <a href="/projects/" class="nav-link">Projects</a>
      <a href="/about/" class="nav-link">About</a>
      <a href="/contact/" class="nav-link">Contact</a>

    </nav>

    <div class="site-header__actions">
      <a href="/quote/" class="btn btn-primary btn-sm">Request a Quote</a>
      <button class="site-header__hamburger"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="mobile-nav"
        type="button"
        id="hamburger-btn">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

  </div><!-- end site-header__inner -->
</header>

<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <div class="mobile-nav__backdrop" id="mobile-nav-backdrop" aria-hidden="true"></div>
  <div class="mobile-nav__drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">

    <div class="mobile-nav__header">
      <span class="site-header__logo-wordmark">Fenovera</span>
      <button class="mobile-nav__close" aria-label="Close navigation menu" type="button" id="mobile-nav-close">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="mobile-nav__body">

      <div>
        <button class="mobile-nav__accordion-btn"
          aria-expanded="false"
          aria-controls="mobile-products-submenu"
          type="button">
          Products
          <svg class="nav-link__chevron" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 1l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="mobile-nav__submenu" id="mobile-products-submenu"
          aria-hidden="true">
          <div class="mobile-nav__submenu-label">Windows</div>
          <a href="/products/windows/aluminum/" class="mobile-nav__submenu-link">Aluminum Windows</a>
          <a href="/products/windows/upvc/" class="mobile-nav__submenu-link">uPVC Windows</a>
          <a href="/products/windows/" class="mobile-nav__submenu-link">All Windows</a>
          <div class="mobile-nav__submenu-label">Doors</div>
          <a href="/products/doors/aluminum/" class="mobile-nav__submenu-link">Aluminum Doors</a>
          <a href="/products/doors/upvc/" class="mobile-nav__submenu-link">uPVC Doors</a>
          <a href="/products/doors/" class="mobile-nav__submenu-link">All Doors</a>
          <a href="/products/" class="mobile-nav__submenu-link">All Products</a>
        </div>
      </div>

      <a href="/projects/" class="mobile-nav__link">Projects</a>
      <a href="/about/" class="mobile-nav__link">About</a>
      <a href="/contact/" class="mobile-nav__link">Contact</a>

    </div><!-- end mobile-nav__body -->

    <div class="mobile-nav__footer">
      <a href="/quote/" class="btn btn-primary btn--block">Request a Quote</a>
    </div>

  </div><!-- end mobile-nav__drawer -->
</div><!-- end mobile-nav -->


  <main id="main">

    <!-- ── Hero ──────────────────────────────────────────── -->
    <section class="home-hero" aria-labelledby="home-hero-heading">
      <div class="container">
        <div class="home-hero__inner">

          <div class="home-hero__content">
            <span class="home-hero__eyebrow">Bay Area Distributor</span>
            <h1 class="home-hero__title" id="home-hero-heading">
              Aluminum and uPVC<br>Windows &amp; Doors
            </h1>
            <p class="home-hero__lead">
              Fenovera supplies precision-engineered window and door systems
              for residential and commercial projects in the Bay Area.
              Contact us for specifications, pricing, and availability.
            </p>
            <div class="home-hero__actions">
              <a href="/products/" class="btn btn-primary">
                Explore Products
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="/contact/" class="btn btn-secondary">Contact Us</a>
            </div>
          </div>

          <div class="home-hero__image-wrap">
            <img
              src="img/casement.jpg"
              alt="Aluminum casement window installed in a residential setting"
              width="800"
              height="600"
              loading="eager"
            >
          </div>

        </div>
      </div>
    </section>

    <!-- ── Product categories ─────────────────────────────── -->
    <section class="page-section" aria-labelledby="categories-heading">
      <div class="container">

        <p class="section-overline">What We Supply</p>
        <h2 class="section-title" id="categories-heading">Product Categories</h2>
        <p class="section-lead">
          Aluminum and uPVC systems across windows and doors.
          Each category links to full product specifications.
        </p>

        <div class="home-category-grid">

          <a href="/products/windows/aluminum/" class="home-category-card">
            <span class="home-category-card__type">Windows</span>
            <span class="home-category-card__name">Aluminum Windows</span>
            <span class="home-category-card__count">5 systems</span>
            <span class="home-category-card__arrow">
              View systems
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <a href="/products/windows/upvc/" class="home-category-card">
            <span class="home-category-card__type">Windows</span>
            <span class="home-category-card__name">uPVC Windows</span>
            <span class="home-category-card__count">5 systems</span>
            <span class="home-category-card__arrow">
              View systems
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <a href="/products/doors/aluminum/" class="home-category-card">
            <span class="home-category-card__type">Doors</span>
            <span class="home-category-card__name">Aluminum Doors</span>
            <span class="home-category-card__count">1 system</span>
            <span class="home-category-card__arrow">
              View systems
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <a href="/products/doors/upvc/" class="home-category-card">
            <span class="home-category-card__type">Doors</span>
            <span class="home-category-card__name">uPVC Doors</span>
            <span class="home-category-card__count">2 systems</span>
            <span class="home-category-card__arrow">
              View systems
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

        </div>

        <p style="margin-top: var(--space-6); font-size: var(--text-sm); color: var(--color-ink-secondary);">
          <a href="/products/" class="link-standalone">
            View all products
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </p>

      </div>
    </section>

    <!-- ── Contact CTA ────────────────────────────────────── -->
    <section class="page-section page-section--canvas" aria-labelledby="home-cta-heading">
      <div class="container">
        <h2 class="home-cta__title" id="home-cta-heading">
          Ready to get started?
        </h2>
        <p class="home-cta__text">
          Contact us to discuss your project requirements, request current pricing,
          or ask about specifications and lead times.
        </p>
        <div class="home-hero__actions">
          <a href="/quote/" class="btn btn-primary">
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/contact/" class="btn btn-secondary">Contact Us</a>
        </div>
      </div>
    </section>

  </main>

<footer class="site-footer">
  <div class="site-footer__main">

    <div>
      <div class="site-footer__brand-name">Fenovera</div>
      <p class="site-footer__brand-desc">Aluminum and uPVC window and door systems — Bay Area distributor.</p>
    </div>

    <div>
      <div class="site-footer__col-label">Products</div>
      <nav class="site-footer__links" aria-label="Products footer navigation">
        <a href="/products/windows/aluminum/" class="site-footer__link">Aluminum Windows</a>
        <a href="/products/windows/upvc/" class="site-footer__link">uPVC Windows</a>
        <a href="/products/doors/aluminum/" class="site-footer__link">Aluminum Doors</a>
        <a href="/products/doors/upvc/" class="site-footer__link">uPVC Doors</a>
      </nav>
    </div>

    <div>
      <div class="site-footer__col-label">Company</div>
      <nav class="site-footer__links" aria-label="Company footer navigation">
        <a href="/about/" class="site-footer__link">About Fenovera</a>
        <a href="/projects/" class="site-footer__link">Projects</a>
        <a href="/contact/" class="site-footer__link">Contact</a>
      </nav>
    </div>

    <div>
      <div class="site-footer__col-label">Contact</div>
      <div class="site-footer__links">

        <div class="site-footer__contact-item">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="16" height="16">
            <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/>
            <path d="M2 5.5l6 4 6-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <a href="mailto:info@fenovera.com" class="site-footer__link">info@fenovera.com</a>
        </div>

        <div class="site-footer__contact-item">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="16" height="16">
            <path d="M3 3a1.5 1.5 0 011.5-1.5h.5a1 1 0 01.95.684l.804 2.412a1 1 0 01-.23 1.04L5.5 6.5a7 7 0 003.5 3.5l1.364-.703a1 1 0 011.04.23l2.412.804a1 1 0 01.684.95V11.5A1.5 1.5 0 0113 13 10 10 0 013 3z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
          <!-- [PHONE TO VERIFY] — replace href and text before launch -->
          <a href="tel:+1-000-000-0000" class="site-footer__link">[PHONE TO VERIFY]</a>
        </div>

      </div><!-- end site-footer__links -->
    </div>

  </div><!-- end site-footer__main -->

  <div class="site-footer__bottom">
    <p class="site-footer__copy">&copy; 2026 Fenovera. All rights reserved.</p>
    <nav class="site-footer__legal-links" aria-label="Legal navigation">
      <a href="/privacy/" class="site-footer__legal-link">Privacy Policy</a>
      <a href="/terms/" class="site-footer__legal-link">Terms of Use</a>
    </nav>
  </div>

</footer>


  <script src="site/nav.js"></script>
</body>
</html>

`);document.close();