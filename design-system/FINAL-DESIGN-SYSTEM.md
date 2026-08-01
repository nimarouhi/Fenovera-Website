# Fenovera Design System — Final Reference
**Version: 1.3.1 · Foundation · 2026-07-27**

This document supersedes `DESIGN-SYSTEM.md` as the primary design system reference. It covers: tokens, component API, typography, governance rules, and release checklist.

---

## 1. Design Tokens (`tokens.css`)

All values are defined as CSS custom properties and must be referenced by name. Raw hex colors and arbitrary pixel values are governance violations.

### Color tokens

| Token | Value | Use |
|-------|-------|-----|
| `--color-navy` | `#0D1B2A` | Primary brand, headings, dark sections |
| `--color-bronze` | `#A77A45` | Decorative accents only (not text/focus) |
| `--color-bronze-interactive` | `#8F6338` | Interactive bronze: focus rings, active bronze |
| `--color-canvas` | `#F5F3EE` | Page background |
| `--color-surface` | `#FFFFFF` | Card / elevated surface |
| `--color-surface-secondary` | `#F0EDE8` | Image placeholder, muted surface |
| `--color-ink` | `#1A1A1A` | Body text |
| `--color-ink-secondary` | `#4A4A4A` | Secondary text, captions, labels |
| `--color-ink-inverse` | `#FFFFFF` | Text on dark/navy |
| `--color-border` | `#E0DBD4` | Standard borders |
| `--color-border-strong` | `#C8C2BB` | Stronger borders, hover states |
| `--color-border-subtle` | `#EDEAE6` | Very subtle dividers |
| `--color-warning` | `#92400E` | Warning text |
| `--color-warning-border` | `#FCD34D` | Warning border |
| `--color-warning-subtle` | `#FFFBEB` | Warning background |

**Contrast summary:**
- Navy on canvas: 15.9:1 ✅ AAA
- Ink on canvas: 14.7:1 ✅ AAA
- Ink-secondary on canvas: 7.8:1 ✅ AA
- Bronze-interactive on canvas: 5.24:1 ✅ AA (focus rings)
- Bronze on canvas: 3.81:1 — decorative only, not text or focus

### Typography tokens

| Token | Value | Use |
|-------|-------|-----|
| `--font-heading` | Manrope | Display headings, product names |
| `--font-body` | Inter | Body text, UI labels |
| `--font-mono` | `'Courier New', Courier, monospace` | Technical identifiers, filenames, code — not spec values |

**Spec table values use Inter with `font-variant-numeric: tabular-nums`** (defined in `.spec-table__value` in components.css). Do not use `--font-mono` for spec values.

Type scale: `--text-xs` (0.75rem) → `--text-sm` (0.875rem) → `--text-body` (1rem) → `--text-lg` (1.125rem) → `--text-xl` (1.25rem) → `--text-2xl` (1.5rem) → `--text-3xl` (1.875rem) → `--text-4xl` (2.25rem) → `--text-5xl` (3rem)

### Spacing scale

`--space-1` (0.25rem) through `--space-20` (5rem). Use these for all padding, margin, and gap values.

### Focus ring

```css
--focus-ring-width:  2px
--focus-ring-style:  solid
--focus-ring-color:  var(--color-bronze-interactive)   /* 5.24:1 on canvas — WCAG AA ✅ */
--focus-ring-offset: 2px
```

Apply on `:focus-visible`. Never suppress focus rings without providing an equivalent visible alternative.

---

## 2. Component API (`components.css`)

### Buttons

```html
<a href="..." class="btn btn-primary">Primary</a>
<a href="..." class="btn btn-secondary">Secondary</a>
<a href="..." class="btn btn-outline">Outline</a>
<a href="..." class="btn btn-primary btn-sm">Small</a>
<a href="..." class="btn btn-primary btn-lg">Large</a>
<a href="..." class="btn btn-primary btn--block">Full-width</a>
```

- Use `<a>` for navigation, `<button type="button">` for actions
- Never nest `<a>` inside `<button>` or vice versa

### Navigation

**Desktop header:** `.site-header > .site-header__inner > .site-header__nav`

**Mega-menu:** `.nav-item > .mega-menu` — toggled by JS via `aria-expanded` on the trigger button. Columns use `.mega-menu__col-label`, `.mega-menu__group`, `.mega-menu__link`.

**Mobile nav:** `.mobile-nav > .mobile-nav__drawer` — uses `aria-hidden="true"` when closed. Accordion via `.mobile-nav__accordion-btn` + `.mobile-nav__submenu`.

### Breadcrumbs

```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs__list">
    <li class="breadcrumbs__item"><a href="/" class="breadcrumbs__link">Home</a></li>
    <li class="breadcrumbs__item breadcrumbs__item--current" aria-current="page">Products</li>
  </ol>
</nav>
```

For generated product pages, breadcrumbs are injected via `<!-- SECTION:product-breadcrumb -->` and rendered by `build-site.js`.

### Specification table

```html
<div class="spec-table" role="table" aria-label="Frame specifications">
  <div class="spec-table__row" role="row">
    <div class="spec-table__label" role="cell">Frame depth</div>
    <div class="spec-table__value" role="cell">76 mm</div>
  </div>
</div>
```

- `.spec-table__value` has `font-variant-numeric: tabular-nums` for numeric alignment
- `.spec-table__value--emphasis` for unverified / placeholder values (navy bold)

### Product hero

```html
<section class="product-hero">
  <div class="container">
    <div class="product-hero__inner">
      <div>
        <p class="product-hero__tag">Material Type</p>
        <h1 class="product-hero__title" id="heading-id">
          Product Name <span class="product-hero__title-type">System Type</span>
        </h1>
        <p class="product-hero__intro">Intro text.</p>
        <div class="product-hero__actions">...</div>
      </div>
      <div class="product-hero__image-wrap">
        <!-- image or .product-hero__image-placeholder -->
      </div>
    </div>
  </div>
</section>
```

### Dev notice

```html
<div class="dev-notice" role="status" aria-live="polite">
  <strong>Development draft</strong> — content requires verification before public launch.
</div>
```

Required on all `noindex` pages. Remove when page is approved for launch.

### Quote banner

```html
<section class="quote-banner" aria-labelledby="cta-heading">
  <div class="container">
    <div class="quote-banner__inner">
      <div>
        <p class="quote-banner__eyebrow">Get in touch</p>
        <h2 class="quote-banner__title" id="cta-heading">Request a quote</h2>
        <p class="quote-banner__body">...</p>
      </div>
      <div><a href="/quote/" class="btn btn-secondary btn-lg">Request a Quote</a></div>
    </div>
  </div>
</section>
```

---

## 3. Page Layout Utilities

```css
.container             /* max-width constrained, centered, with horizontal padding */
.page-section          /* standard section padding (top + bottom) */
.page-section--sm      /* smaller vertical padding */
.page-section--canvas  /* canvas background color */
.page-section--flush-top /* removes top padding (for hero below breadcrumb) */
.section-overline      /* small uppercase label above headings */
.section-title         /* h1/h2 display heading */
.section-body          /* paragraph lead text */
.section-body--mb-md   /* medium bottom margin */
```

---

## 4. Build System Tokens

`build-site.js` resolves these markers at build time:

| Marker | Resolved to |
|--------|-------------|
| `<!-- BUILD:header -->` | `site/templates/header.html` |
| `<!-- BUILD:mobile-nav -->` | `site/templates/mobile-nav.html` |
| `<!-- BUILD:footer -->` | `site/templates/footer.html` |
| `{{#AC:pageId}}` | `aria-current="page"` if match |
| `{{#ACTIVE:id1,id2,...}}` | ` is-active` CSS class if match |
| `{{#EXPANDED:id1,...}}` | `true`/`false` for aria-expanded |
| `{{#HIDDEN:id1,...}}` | `false`/`true` for aria-hidden |
| `{{DATA:field}}` | `page.data.field` — HTML-escaped |
| `{{DATA_RAW:field}}` | `page.data.field` — unescaped HTML |
| `<!-- SECTION:name -->` | Rendered HTML from section renderer |

Available SECTION renderers: `product-breadcrumb`, `spec-tables`, `gallery`, `gallery-thumbnails` (alias), `finishes`, `hardware`, `certifications`, `downloads`, `related-products`, `category-product-grid`, `type-material-grid`.

Sections that have no data return an empty string — the section is omitted entirely.

---

## 5. Governance Rules Summary

Run: `node design-system/governance-check.js --strict`

Key rules:
1. No raw hex colors in CSS (must use tokens)
2. No `--color-ink-tertiary` (removed — use `--color-ink-secondary`)
3. No `font-size:` without `var(--text-*)` token
4. No arbitrary spacing (px values not in token scale)
5. All `<img>` must have non-empty `alt`
6. All interactive elements need focus-visible styles
7. No `<a>` + `<button>` nesting
8. No `aria-label=""` (empty strings)
9. Release blockers: `noindex` pages OK for draft; remove before launch
10. All class names in HTML must resolve in design-system CSS

Self-test: `node design-system/governance-self-test.js` — exercises mutation fixtures; all must pass.

---

## 6. Source Controls (Permanent)

These controls apply to all content generated from or about Fenovera products:

- Treat supplier catalogs as product references, not US-market certification proof
- Do not claim NFRC, ENERGY STAR, AAMA, CEC, or Title 24 compliance without documentation
- Do not show LEDOW, PRIMA, or another supplier name without owner approval
- Do not invent uPVC series numbers — use product-type names
- "Fenovera is based in the Bay Area" is confirmed; "serves the entire Bay Area" is not confirmed
- Image presence does not prove publication rights
- Do not publicly render internal evidence labels, verification notes, or supplier-source annotations

---

## 7. Release Checklist

Before removing `noindex`/`nofollow` from any product page:

- [ ] `offeringStatus: 'current'` confirmed by owner
- [ ] `publicationStatus` changed from `'draft'` to `'published'`
- [ ] `verificationStatus` changed to `'verified'` for all spec rows to be shown
- [ ] All `[SPEC TO VERIFY]` rows either populated or removed
- [ ] `heroImage.rightsVerified: true` confirmed, or placeholder retained
- [ ] `galleryImages[].rightsVerified: true` for each image shown, or images removed
- [ ] Dev notice removed
- [ ] Quote form connected and functional
- [ ] Internal evidence labels not present in output
- [ ] Governance check exits 0

---

*Design System v1.3.1 — Fenovera Foundation*
