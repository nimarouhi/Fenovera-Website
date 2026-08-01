# Fenovera Foundation Handoff
**2026-07-28**

Operational guide for the Fenovera website build system. Covers: architecture, adding products/materials/types, marking pages ready for launch, comprehensive validation, and open decisions.

---

## Architecture Overview

```
site/data/
  products.js      ← all 13 product records
  categories.js    ← type → material → product tree
  catalogues.js    ← optional catalogue records (currently empty)

src/
  products/
    index.html     ← manually authored Products overview source
  templates/
    product-detail.html     ← product page template
    category-overview.html  ← material overview (e.g., Aluminum Windows)
    type-overview.html      ← type overview (e.g., Windows)

site/templates/
  header.html       ← shared header (nav, mega-menu)
  mobile-nav.html   ← shared mobile navigation
  footer.html       ← shared footer
  page-data.js      ← builds page list from data files

scripts/
  build-site.js     ← static site generator (CommonJS, v2.0)

products/           ← generated output (do not edit directly)
design-system/
  tokens.css
  base.css
  components.css
  governance-check.js
  governance-self-test.js
  FINAL-DESIGN-SYSTEM.md    ← design system reference

design-system/
  showcase.html          ← dev-only page index (not part of the site)
  responsive-proof.html  ← dev-only iframe responsive preview
FOUNDATION-DECISIONS.md   ← all approved architecture decisions
PRODUCT-INVENTORY.md      ← full product/image/URL manifest
```

---

## Build Commands

```bash
# Standard build (generates all 20 pages into products/)
node scripts/build-site.js

# Dry run (prints resolved HTML to stdout, no files written)
node scripts/build-site.js --dry-run

# Governance check (strict mode — must exit 0 before any release)
node design-system/governance-check.js --strict

# Governance self-test (exercises mutation fixtures)
node design-system/governance-self-test.js
```

---

## How to Add a New Product

1. Open `site/data/products.js` and add a new entry following this schema:

```js
{
  id:               'unique-stable-id',      // e.g. 'windows-aluminum-bifold'
  slug:             'url-slug',              // used in the URL path
  typeSlug:         'windows',               // 'windows' | 'doors' | (future type)
  materialSlug:     'aluminum',              // 'aluminum' | 'upvc' | (future material)
  pageId:           'nav-token-id',          // used for nav active-state tokens
  publicName:       'Bi-fold Window',        // displayed on page
  systemType:       'Bi-fold',               // displayed as subtitle
  materialLabel:    'Aluminum',
  typeLabel:        'Window',                // singular
  offeringStatus:   'current',
  publicationStatus:'draft',
  verificationStatus:'partial',
  seoTitle:         'Aluminum Bi-fold Window | Fenovera',
  description:      'Fenovera aluminum bi-fold window...',
  heroIntro:        'Aluminum bi-fold window...',
  heroImage:        null,                    // or structured record when image available
  galleryImages:    [],                      // [] = gallery section omitted
  finishes:         null,                    // null = finishes section omitted
  hardware:         null,
  certifications:   null,
  documents:        [],
  specificationGroups: [
    {
      label: 'Frame & System',
      rows: [
        { label: 'System type', value: 'Bi-fold', status: 'confirmed' },
        { label: 'Frame material', value: 'Aluminum', status: 'confirmed' },
      ],
    },
  ],
},
```

2. Add the product slug to the appropriate `productSlugs` array in `site/data/categories.js`.
3. Run `node scripts/build-site.js`.
4. The new page is generated at `/products/{typeSlug}/{materialSlug}/{slug}/`.
5. Overview pages for its type and material are automatically regenerated.

**The navigation does not need changing.** The mega-menu links to type/material overview pages, which list all products in that group dynamically.

---

## How to Add a New Material

Example: adding a "Composite" material under Windows.

1. Open `site/data/categories.js` and add a new material entry to the appropriate type:

```js
{
  id:               'windows-composite',
  materialSlug:     'composite',
  materialLabel:    'Composite',
  pageId:           'windows-composite',
  displayOrder:     3,
  publicationStatus:'draft',
  seoTitle:         'Composite Windows | Fenovera',
  description:      'Composite window systems from Fenovera.',
  productSlugs:     ['composite-awning'],    // must match slugs in products.js
},
```

2. Add corresponding product entries to `products.js`.
3. Run `node scripts/build-site.js`.
4. Update `site/templates/header.html` and `mobile-nav.html` to add the new material group.

---

## How to Add a New Product Type

Example: adding Flooring.

1. Open `site/data/categories.js` and add a new type entry:

```js
{
  id:               'flooring',
  typeSlug:         'flooring',
  typeLabel:        'Flooring',
  pageId:           'flooring',
  displayOrder:     3,
  publicationStatus:'draft',
  seoTitle:         'Flooring | Fenovera',
  description:      'Flooring systems from Fenovera.',
  materials: [
    {
      id:               'flooring-hardwood',
      materialSlug:     'hardwood',
      materialLabel:    'Hardwood',
      pageId:           'flooring-hardwood',
      displayOrder:     1,
      publicationStatus:'draft',
      seoTitle:         'Hardwood Flooring | Fenovera',
      description:      '...',
      productSlugs:     ['oak-plank'],
    },
  ],
},
```

2. Add flooring products to `products.js`. The `specificationGroups` schema works for any product type.
3. Run build. Type page and material overview pages are generated automatically.
4. Update `header.html` and `mobile-nav.html` to add the new type to navigation.

---

## Catalogue Model

`site/data/catalogues.js` is currently empty — no catalogues approved for public display. The empty array is the correct current state.

When a catalogue is added, it may apply to:
- A single product: `scope: 'product'`, `appliesTo: ['product-slug']`
- Multiple products across groups: `appliesTo: ['slug-a', 'slug-b']`
- A type/material group: `scope: 'material'` or `scope: 'type'`
- All products: `scope: 'all'`

A product does not require a catalogue entry. Products without catalogue references render normally.

---

## How to Mark a Page Ready for Launch

1. In `site/data/products.js`, update the product:
   - `publicationStatus: 'published'`
   - `verificationStatus: 'verified'` (only after all specs confirmed)
   - Fill all `[SPEC TO VERIFY]` rows with confirmed data
   - For images: set `rightsVerified: true` and `productProvenanceVerified: true` on each image record

2. In `src/templates/product-detail.html`, remove the `<meta name="robots" content="noindex, nofollow">` line.

3. Remove the `<div class="dev-notice">` block from the template (or make its rendering conditional per product).

4. Run `node scripts/build-site.js`.

5. Run `node design-system/governance-check.js --strict` — must exit 0.

6. Confirm the form at `/quote/` is connected to a working backend before launch.

---

## Comprehensive Validation Checklist

Run these from the project root after a clean extraction of the ZIP. All commands assume you are in the extracted project directory.

### Step 1 — JavaScript Syntax (all 5 data/script files)

```bash
node --check scripts/build-site.js
node --check site/templates/page-data.js
node --check site/data/products.js
node --check site/data/categories.js
node --check site/data/catalogues.js
```

**Expected:** Each command exits 0 with no output. If any command prints a syntax error, fix it before proceeding.

### Step 2 — First Build

```bash
node scripts/build-site.js
```

**Expected:** Build completes with no errors. Console output lists all generated pages. Exit code 0.

### Step 3 — Exact Page Count

```bash
find products/ -name "index.html" | wc -l
```

**Expected result: 20**

Breakdown: 1 products overview + 2 type overviews (windows, doors) + 4 type/material overviews (windows/aluminum, windows/upvc, doors/aluminum, doors/upvc) + 5 aluminum window products + 5 uPVC window products + 1 aluminum door product + 2 uPVC door products = 20.

Any count other than 20 is a blocker.

### Step 4 — Exact Product Record Count

```bash
node -e "const p = require('./site/data/products.js'); console.log(p.length);"
```

**Expected result: 13**

### Step 5 — Unresolved DATA Tokens

```bash
grep -rE '\{\{DATA[_A-Z]*:[^}]+\}\}' products/ --include="*.html"
```

**Expected: no output.** Any match is a blocker — means a product record is missing a required field.

### Step 6 — Unresolved SECTION Markers

```bash
grep -r '<!-- SECTION:' products/ --include="*.html"
```

**Expected: no output.** Any match means a section marker was not resolved by the build.

### Step 7 — Unresolved BUILD Markers

```bash
grep -r '<!-- BUILD:' products/ --include="*.html"
```

**Expected: no output.**

### Step 8 — No Legacy (Pre-taxonomy) URLs in Generated Pages

The old Phase 3 pages at `/products/windows/76-series/`, `/products/windows/85-series/`, and `/products/doors/152-series/` are not part of the generated output and must not be referenced by canonical pages.

```bash
grep -rE 'href="/products/windows/76-series|href="/products/windows/85-series|href="/products/doors/152-series' products/ --include="*.html"
```

**Expected: no output.**

### Step 9 — Governance Check (Strict)

```bash
node design-system/governance-check.js --strict
```

**Expected:** Exit 0. Console prints "✓ No violations found." (or equivalent passing message).

### Step 10 — Governance Self-Test

```bash
node design-system/governance-self-test.js
```

**Expected:** Exit 0. All fixture mutations pass.

### Step 11 — Second Build (Idempotency)

```bash
node scripts/build-site.js
```

**Expected:** Same 20 pages regenerated. No errors. Exit 0. Running the build twice must produce identical output.

### Step 12 — Showcase and Responsive Proof Present

```bash
ls design-system/showcase.html design-system/responsive-proof.html
```

**Expected:** Both files listed without error.

### Step 13 — Conditional Sections Verification

Confirm gallery section renders for uPVC products and is absent for aluminum products:

```bash
# uPVC hung window must have gallery section (galleryImages non-empty)
grep -c 'gallery-section__thumbnails' products/windows/upvc/hung-window/index.html

# Aluminum 76 series must NOT have gallery section (galleryImages: [])
grep -c 'gallery-section__thumbnails' products/windows/aluminum/76-series/index.html
```

**Expected:** First command prints `1`. Second command prints `0`.

Confirm no finishes/hardware/certifications/downloads sections anywhere (all null/empty):

```bash
grep -r 'finishes-section\|hardware-section\|certifications-section\|downloads-section' products/ --include="*.html"
```

**Expected: no output.**

---

## About Release Blockers

### Expected blockers during development (not errors)

These appear in every generated page and are by design during the development phase:

| Blocker | Why expected | How to clear |
|---------|--------------|--------------|
| `<meta name="robots" content="noindex, nofollow">` | All pages are `publicationStatus: 'draft'` | Set `publicationStatus: 'published'` and remove the meta tag before launch |
| `<div class="dev-notice">` | Development draft warning | Remove from template when pages are ready for launch |
| `[SPEC TO VERIFY]` values in spec tables | `verificationStatus: 'partial'` — dimensional and performance data unconfirmed | Owner must supply confirmed values; change status to `'verified'` |
| `rightsVerified: false` on all images | Image rights not yet confirmed | Owner must confirm rights per image before publication |

### Unexpected blockers (require investigation)

These should not be present in a clean build and indicate a code or data error:

| Symptom | Cause |
|---------|-------|
| Unresolved `{{DATA:...}}` tokens | Product record missing a required field referenced in a template |
| Unresolved `<!-- SECTION:... -->` markers | Section name misspelled in template or not registered in build-site.js switch |
| Unresolved `<!-- BUILD:... -->` markers | Template file missing from `site/templates/` |
| Page count ≠ 20 | Missing product in `productSlugs`, duplicate slug, or deleted source file |
| Product count ≠ 13 | Entry added or removed from `products.js` without coordination |
| Legacy URL references in generated pages | A template or overview page links to an old pre-taxonomy URL |
| Governance check exits non-zero | CSS or HTML violation introduced since last clean build |
| Duplicate index.html at old Phase 3 path | Frozen Phase 3 directories were not removed |

---

## Key File Reference

| File | Purpose | Edit frequency |
|------|---------|----------------|
| `site/data/products.js` | All 13 product records | Every new product or spec update |
| `site/data/categories.js` | Type/material taxonomy | Every new type or material |
| `site/data/catalogues.js` | Catalogue records | When catalogue is confirmed available |
| `site/templates/page-data.js` | Page registry | Rarely — only if new template type needed |
| `scripts/build-site.js` | Build system | Rarely — only for new section renderers |
| `src/templates/product-detail.html` | Product page template | When layout changes needed |
| `src/templates/category-overview.html` | Material overview template | Rarely |
| `src/templates/type-overview.html` | Type overview template | Rarely |
| `src/products/index.html` | Products overview (manually authored) | When product families change |
| `site/templates/header.html` | Shared header + mega-menu | When nav structure changes |
| `site/templates/footer.html` | Shared footer | When footer links change |
| `design-system/tokens.css` | All design tokens | Rarely — tokens are final |
| `design-system/components.css` | All component styles | When new component needed |

---

## Foundation Screenshots

Stored in `screenshots/foundation/`. All files current as of 2026-07-28. Desktop page views: browser capture via computer-use screenshot tool, padded to 1440×784. Interaction states (mega-menu open, mobile drawer open): PIL composite/synthetic rendered from live design-system CSS and actual HTML structure. Mobile: 375×784 PIL synthetic matching the 375px layout.

### Desktop (1440×784px)

| File | URL | Notes |
|------|-----|-------|
| `products-overview-1440.jpg` | `/products/` | browser capture — post-removal, no Featured Systems |
| `windows-overview-1440.jpg` | `/products/windows/` | browser capture |
| `aluminum-windows-1440.jpg` | `/products/windows/aluminum/` | browser capture |
| `upvc-windows-1440.jpg` | `/products/windows/upvc/` | browser capture |
| `aluminum-76-series-1440.jpg` | `/products/windows/aluminum/76-series/` | browser capture |
| `upvc-hung-window-1440.jpg` | `/products/windows/upvc/hung-window/` | browser capture |
| `mega-menu-open-1440.jpg` | `/products/` | PIL composite — mega-menu overlay on overview; Windows/Doors only |

### Mobile (375×784px)

| File | URL | Notes |
|------|-----|-------|
| `windows-overview-375.jpg` | `/products/windows/` | browser capture |
| `upvc-windows-375.jpg` | `/products/windows/upvc/` | browser capture |
| `mobile-drawer-open-375.jpg` | `/products/` | PIL synthetic — drawer open; Windows/Doors accordion, no Featured Systems |

---

## Source Controls (Permanent)

These never change regardless of who is editing:

- Supplier catalogs are product references only — not proof of US-market certification or Fenovera commercial commitments
- Do not publicly claim NFRC, ENERGY STAR, AAMA, CEC, or Title 24 compliance without supporting documentation or owner confirmation
- Do not publicly show LEDOW, PRIMA, or any supplier name unless the owner approves the brand relationship
- Do not invent uPVC series numbers — use product-type names until the owner approves a naming system
- "Fenovera is based in the Bay Area" is confirmed; "Fenovera serves the entire Bay Area" is not confirmed
- Image presence does not prove publication rights
- Do not publicly render internal evidence labels, verification notes, or supplier-source annotations

---

## Owner-Controlled Launch Decisions

These require owner action before any page can be published:

| Decision | Status |
|----------|--------|
| Quote form backend — service, endpoint, form fields | Owner to confirm |
| Image publication rights — per image | Owner to confirm (currently all `rightsVerified: false`) |
| Finishes and hardware data for any product | Owner to supply or confirm |
| Certifications / test reports | Owner to supply documentation |
| Catalogue PDFs — publication rights, filename, availability | Owner to confirm per catalogue |
| uPVC series naming system | Owner to approve, or confirm descriptive names only |
| Homepage content beyond Content Outline | Owner to supply |
| Projects page content | Owner to supply |
| Service area confirmation | Owner to confirm |
| Spec values marked `[SPEC TO VERIFY]` — dimensions, glazing, performance | Owner to supply confirmed data |

---

---

## Validation Summary (2026-07-28)

All 13 checklist steps pass against a clean build:

| Step | Check | Result |
|------|-------|--------|
| 1 | JS syntax — all 5 data/script files | ✓ |
| 2 | Build completes without errors | ✓ |
| 3 | Page count = 20 | ✓ |
| 4 | Product record count = 13 | ✓ |
| 5 | No unresolved `{{DATA:...}}` tokens | ✓ |
| 6 | No unresolved `<!-- SECTION:... -->` markers | ✓ |
| 7 | No unresolved `<!-- BUILD:... -->` markers | ✓ |
| 8 | No legacy pre-taxonomy URL references | ✓ |
| 9 | Governance check v1.9 `--strict` exits 0 | ✓ |
| 10 | Governance self-test — all 49 fixtures pass | ✓ |
| 11 | Second build produces identical output (idempotent) | ✓ |
| 12 | `design-system/showcase.html` and `design-system/responsive-proof.html` present | ✓ |
| 13 | Conditional sections correct (gallery, finishes, hardware) | ✓ |

---

## Cleanup Completion (2026-07-28)

All obsolete working files removed from project root: 30 PDF scan images, 5 working images, 5 temp server scripts, 16 old ZIP files, 4 Phase 3 screenshot directories (76-series, 85-series, 152-series, products). Private documents (LLC Operating Agreement, invoice) moved to `Fenovera Private Business Documents/` outside project root. Project root now contains only operational website files.

---

## Governance Results (2026-07-28, all 20 generated pages)

| Run | Command | Exit | Result |
|-----|---------|------|--------|
| Design-system strict | `governance-check.js --strict design-system/` | 0 | ✓ No violations |
| Self-test | `governance-self-test.js` | 0 | ✓ 49/49 fixtures pass |
| Development | `governance-check.js --html=<20 pages>` | 0 | ✓ No violations |
| Release | `governance-check.js --release --html=<20 pages>` | 0 | ✓ No violations |

---

**Fenovera design and catalog foundation frozen — 2026-07-28**

The design system, build architecture, 13-product catalog, URL taxonomy, data model, governance tooling, and all 20 generated pages are declared complete and frozen as of this date. No further structural changes are in scope. Owner-controlled launch decisions (form backend, image rights, spec verification) remain open and are tracked above.

**Navigation update (2026-07-28):** Featured Systems promotional grouping removed from Products overview, desktop mega-menu, and mobile nav. Products overview now shows four material-category cards only. Primary nav links exclusively to type/material overviews — no individual model links. 76 Series and 85 Series remain under Windows → Aluminum; 152 Series remains under Doors → Aluminum. All 20 canonical URLs and 13 product records unchanged.

**Post-removal re-validation (2026-07-28):** Site rebuilt from source (`node scripts/build-site.js` — 20 pages, no errors). Governance check exits 0 on all 10 representative pages including products/index.html and all 6 material-overview pages. No "Featured Systems" references found in any generated HTML. Build is clean and idempotent.

*Foundation Handoff · Fenovera · 2026-07-28*
