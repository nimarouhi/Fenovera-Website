# Fenovera Foundation — Approved Decisions
**2026-07-27 · Authoritative record**

This document records all approved architecture and content decisions for the Fenovera website foundation. It supersedes `FOUNDATION-PROPOSAL.md`. Nothing here is a proposal or a plan — every item reflects a decision already made and implemented.

---

## Decision 1 — URL Taxonomy

**Approved:** Type-first, four-level hierarchy.

```
/products/{type}/{material}/{model}/
```

Examples:
- `/products/windows/aluminum/76-series/`
- `/products/windows/upvc/hung-window/`
- `/products/doors/aluminum/152-series/`
- `/products/doors/upvc/french-door/`

Type slugs: `windows`, `doors` (future types follow same pattern).
Material slugs: `aluminum`, `upvc` (future materials follow same pattern).

---

## Decision 2 — Product Count and Scope

**Approved:** 13 current products at launch.

**Windows — Aluminum (5):** 76 Series (Casement & Swing), 85 Series (Slimline), Awning Window, Sliding Window, Tilt & Turn Window.

**Windows — uPVC (5):** Hung Window, Tilt & Turn Window, Casement Window, Awning Window, Sliding Window.

**Doors — Aluminum (1):** 152 Series (Lift & Slide).

**Doors — uPVC (2):** French Door, Sliding Door.

All 13 are `offeringStatus: 'current'`. All aluminum awning, sliding, and tilt-turn windows are included — they are current products, not future candidates.

---

## Decision 3 — Three-Status Model

**Approved:** Three independent status fields per product.

| Field | Values | Meaning |
|-------|--------|---------|
| `offeringStatus` | `current` \| `planned` \| `discontinued` | Commercial offering state |
| `publicationStatus` | `draft` \| `published` \| `archived` | Website publication state |
| `verificationStatus` | `unverified` \| `partial` \| `verified` | Specification verification state |

Current state of all 13 products: `current` / `draft` / `partial`. The `publicationStatus` and `verificationStatus` are per-product and independent of each other.

---

## Decision 4 — Flexible Specification Groups

**Approved:** `specificationGroups` is an array of `{ label, rows: [{ label, value, status }] }` objects. This structure works for any product type — windows, doors, or future types — using whatever label conventions are appropriate for that type.

Each spec row has a `status` field: `confirmed` for verified values, `placeholder` for values requiring owner confirmation before publication.

---

## Decision 5 — Conditional Optional Sections

**Approved:** Gallery, finishes, hardware, certifications, and downloads sections are rendered only when data is present. Empty data produces no section in output.

| Field | Condition for rendering |
|-------|------------------------|
| `galleryImages` | Non-empty array |
| `finishes` | Non-null |
| `hardware` | Non-null |
| `certifications` | Non-null |
| `documents` | Non-empty array |

Current state: all 13 products have `finishes: null`, `hardware: null`, `certifications: null`, `documents: []`. The 6 aluminum products have `galleryImages: []`. The 7 uPVC products have two gallery images each (hero + gallery pair). Gallery sections render for uPVC products; no other optional sections render for any product.

---

## Decision 6 — Structured Image Records

**Approved:** Every image reference is a structured record with provenance tracking.

```js
{
  src:                        '/img/filename.jpg',
  alt:                        'Descriptive alt text',
  role:                       'hero',          // 'hero' | 'gallery' | 'thumbnail' | 'configuration'
  rightsVerified:             false,           // owner must set true before publication
  productProvenanceVerified:  false,           // owner must confirm image matches product
  sourceDocument:             null             // internal reference document if applicable
}
```

All current image records have `rightsVerified: false` and `productProvenanceVerified: false`. Image presence does not prove publication rights. Owner must confirm rights per image before launch.

---

## Decision 7 — Optional Catalogue Model

**Approved:** `site/data/catalogues.js` holds catalogue records. Currently empty — no catalogues approved for public display.

A catalogue may apply to:
- A single product (`scope: 'product'`, `appliesTo: ['product-slug']`)
- Multiple products across different groups
- A type/material group (`scope: 'material'` or `scope: 'type'`)
- All products (`scope: 'all'`)

A product does not require a catalogue. Products without catalogue references render normally.

---

## Decision 8 — Simplified Navigation

**Approved:** The mega-menu links to type/material overview pages, not individual products.

Desktop mega-menu columns:
- **Windows:** Aluminum Windows → `/products/windows/aluminum/` · uPVC Windows → `/products/windows/upvc/` · All Windows → `/products/windows/`
- **Doors:** Aluminum Doors → `/products/doors/aluminum/` · uPVC Doors → `/products/doors/upvc/` · All Doors → `/products/doors/`
When new products are added, the nav does not change — type/material overview pages update automatically from `categories.js`.

---

## Decision 9 — Design System and Governance

**Approved:** Design system is final at v1.3.1. Governance check must exit 0 before any release.

Key decisions within the design system:
- Bronze on canvas contrast is **3.81:1** — correct WCAG ratio. Bronze is **decorative only** (not text, not focus rings). This ratio is above the decorative threshold and below the 4.5:1 text threshold, which is correct and expected. The bronze-interactive token (5.24:1) is used for focus rings and interactive states.
- Spec table values use **Inter with `font-variant-numeric: tabular-nums`** — not monospace/Courier New.
- All design tokens defined in `tokens.css`; no raw hex colors in component CSS.

---

## Decision 10 — Source Controls (Permanent)

These controls apply to all generated content, all future contributors, and all future AI-assisted work:

1. Treat supplier catalogs as product references only — not proof of US-market certification or Fenovera commercial commitments.
2. Do not publicly claim NFRC, ENERGY STAR, AAMA, CEC, or Title 24 compliance without supporting documentation or owner confirmation.
3. Do not publicly show LEDOW, PRIMA, or any other supplier name without owner approval of the brand relationship.
4. Do not invent uPVC series numbers — use product-type names (e.g., "Hung Window") until the owner approves a naming system.
5. "Fenovera is based in the Bay Area" is confirmed. "Fenovera serves the entire Bay Area" is **not** confirmed.
6. Image presence does not prove publication rights.
7. Do not publicly render internal evidence labels, verification notes, or supplier-source annotations.

---

## What Was Implemented

All decisions above are reflected in the codebase as of 2026-07-27:

- `site/data/products.js` — 13 product records with three-status model, structured image records, optional section fields
- `site/data/categories.js` — type → material → product taxonomy with `productSlugs`
- `site/data/catalogues.js` — empty catalogue array (schema documented, no records approved)
- `scripts/build-site.js` — conditional section renderers; governance-safe token resolution
- `src/templates/product-detail.html` — conditional SECTION markers, no static optional sections
- `site/templates/header.html` — simplified mega-menu (Windows and Doors material-group links only; no individual model links)
- `site/templates/mobile-nav.html` — simplified mobile accordion
- `design-system/components.css` — `font-variant-numeric: tabular-nums` on `.spec-table__value`
- `design-system/FINAL-DESIGN-SYSTEM.md` — v1.3.1 design system reference
- `PRODUCT-INVENTORY.md` — full 13-product inventory with image manifest and URL map
- `FOUNDATION-HANDOFF.md` — operational guide with validation commands

Build output: 20 generated pages (1 products overview + 2 type overviews + 4 type/material overviews + 13 product pages). Governance check exits 0. 0 unresolved tokens.

---

## Amendment — 2026-07-28: Featured Systems Removal

**Change:** The "Featured Systems" promotional grouping was removed from the Products overview page (`src/products/index.html`), the desktop mega-menu (`site/templates/header.html`), and the mobile nav accordion (`site/templates/mobile-nav.html`). CSS for `.mega-menu__col-label--mt` and related Featured Systems rules was removed from `design-system/components.css`.

**Rationale:** Featured Systems linked directly to individual product series, creating a nav path that bypassed the type/material overview pages. This was inconsistent with Decision 8 (simplified navigation). The Products overview now shows four material-category cards only (Aluminum Windows, uPVC Windows, Aluminum Doors, uPVC Doors). All 20 canonical URLs and 13 product records are unchanged.

**Validation:** Site rebuilt (`node scripts/build-site.js` — 20 pages, no errors). Governance check exits 0. No "Featured Systems" string found in any generated HTML.

---

*Fenovera Foundation Decisions · 2026-07-27, amended 2026-07-28*
