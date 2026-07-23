# Fenovera Design System
**Version 1.0.0 · Phase 2 · Internal Reference**
*Do not share this document publicly. Do not link it from any public-facing page.*

---

## Table of Contents

1. [Brand Foundations](#1-brand-foundations)
2. [Design Tokens](#2-design-tokens)
3. [Component Specifications](#3-component-specifications)
4. [Governance](#4-governance)

---

## 1. Brand Foundations

### 1.1 Brand Attributes

Fenovera is defined by four core attributes, in order of priority:

1. **Technical Precision** — We speak in specifics. Frame depths, thermal break widths, performance classes, EN/AAMA standards. We earn trust through accuracy, not adjectives.
2. **Quiet Confidence** — We don't oversell. The product quality and our directness are the pitch. No hype, no countdown timers, no "industry-leading."
3. **European Standard** — Our sourcing and product philosophy reflects European fenestration standards (precision tolerances, tested performance, long lifecycle). We communicate this through product detail, not brand narrative.
4. **Distributor Integrity** — We are factory-direct. We name that clearly. We do not claim to manufacture. We do not embellish our scope.

**Anti-attributes** (things Fenovera is not):
- Luxury lifestyle brand
- Contractor supply warehouse
- "Innovative" tech company
- Vague quality ("premium," "superior," "unparalleled")

---

### 1.2 Audience Hierarchy

| Tier | Who | What they need from Fenovera |
|------|-----|-------------------------------|
| Primary | Architects & specifiers | Accurate technical data, CAD/BIM files, performance certifications, correct spec language |
| Secondary | General contractors & builders | Lead times, pricing efficiency, installation support, product availability |
| Tertiary | Homeowners & developers | Confidence in the product, factory-direct value framing, finished project examples |

Design decisions prioritize Tier 1. Navigation, content hierarchy, and information density should serve an architect who reads spec sheets before product pages.

---

### 1.3 Tone of Voice

**Guiding principle:** Write the way a knowledgeable distributor speaks to a specifier — direct, accurate, no filler.

| Principle | In Practice |
|-----------|-------------|
| Specific over general | "72mm frame depth with 26mm polyamide thermal break" not "strong durable frames" |
| Active over passive | "We source directly" not "Products are sourced directly" |
| Claim-free | Do not use: exclusive, industry-leading, unparalleled, world-class, premium (without context) |
| No marketing voice | No exclamation points in product descriptions. No "Discover the difference." |
| First person plural | "We" for Fenovera voice. "You" is fine for addressing the reader. |
| Confidence without superlatives | State what the product does, not that it's the best at doing it |

**Copy audit trigger:** If a sentence could appear in a Marriott ad or a mattress website, rewrite it.

---

### 1.4 Copy Principles

- **Headlines:** Active, noun-forward. "Thermal Break Aluminum Windows" not "Experience the Performance of Aluminum."
- **Body copy:** Paragraph length ≤4 sentences. One idea per paragraph.
- **Product names:** Always include series number. "Series 72 Casement" not just "Casement Window."
- **CTAs:** "Get a Quote" (primary), "View Specifications," "Download Datasheet," "Request Samples." Never "Learn More" as the only CTA.
- **Prohibited phrases:** exclusive, luxury, world-class, elevate, reimagine, innovative, transform, curated, seamless (in any non-literal sense), unparalleled, superior, premium (standalone without a qualifier).

---

### 1.5 Photography Principles

(For future photo direction — no photos currently in the repository.)

- **Architecture-first:** Show the window or door in context. Product catalog photos (isolated on white) are supplementary.
- **Natural light:** Shoot in conditions that show how the product performs under Bay Area light — overcast, direct afternoon sun, interior with exterior view.
- **No lifestyle clutter:** No styled living rooms with candles and books. Clean spaces where the fenestration is the subject.
- **Technical shots:** Frame section profiles, hardware details, glazing edge details, corner joints. These belong on product pages.
- **No watermarks, no stock photos** of people looking out windows.
- **Aspect ratios:** Product cards 4:3. Project cards 3:2. Hero 16:9 or wider. Section backgrounds can be full-bleed.

---

### 1.6 Iconography Principles

- **Icon library:** Lucide Icons (for the live site). Consistent 20×20px, 1.5px stroke, `stroke-linecap: round`.
- **No emoji in UI.** Emoji are permitted only in informal communication (e.g., chat). Never in product descriptions, navigation, CTAs, spec tables, or form labels.
- **No decorative illustration:** No abstract shapes, swooshes, or mascots. Iconography is purely functional.
- **Color:** Icons in UI inherit `color: currentColor`. Never use multiple colors within a single functional icon.
- **Sizing:** 14px in compact UI (badges, breadcrumbs), 16px standard (buttons, form fields), 20px feature lists, 24px section headings.

---

## 2. Design Tokens

All tokens are defined in `design-system/tokens.css`. This section documents intent.

### 2.1 Color Tokens

See `tokens.css` for full values. Key semantic groupings:

| Token Group | Purpose |
|-------------|---------|
| `--color-canvas` | Page background (#F5F3EE — warm off-white, not stark) |
| `--color-surface` | Cards, panels, modals (#FFFFFF) |
| `--color-ink` | Primary text (#17222B — near-black with blue undertone) |
| `--color-ink-secondary` | Supporting text, form labels (#64717A — slate) |
| `--color-ink-tertiary` | Placeholder, metadata, captions (#8D9BA3) |
| `--color-navy` | Primary interactive, nav, major headings (#173B55) |
| `--color-bronze` | Accent, active indicators, overlines, icons (#A77A45) |
| `--color-border` | Default border (#D9D6CF — warm stone) |

**WCAG contrast notes:**
- `--color-ink` on `--color-canvas`: ~12:1 (AAA)
- `--color-ink` on `--color-surface`: ~15:1 (AAA)
- `--color-navy` on `--color-surface`: ~9:1 (AAA)
- `--color-bronze` on `--color-surface`: ~3.2:1 (AA for large text only — do not use bronze for body copy)
- `--color-ink-secondary` on `--color-surface`: ~5.4:1 (AA)

---

### 2.2 Typography Tokens

**Families:**
- `--font-heading`: Manrope — extrabold (800) for hero/h1, bold (700) for h2–h4, semibold (600) for h5–h6
- `--font-body`: Inter — medium (500) for UI labels, regular (400) for body

**Scale:** See `tokens.css`. Uses rem at 16px root. Do not use px values for font sizes outside the token file.

**Restricted serif:** An editorial serif typeface may be proposed for specific use cases (pull quotes, feature callouts). It must not be introduced without written approval. No serif is currently in the system.

---

### 2.3 Spacing Tokens

Base unit is 4px. All spacing values are multiples: `--space-1` (4px) through `--space-48` (192px). No arbitrary pixel values are permitted in component code.

---

### 2.4 Layout Tokens

- Default content width: `--container-xl` (1200px)
- Page gutters: 24px mobile → 32px tablet → 48px desktop
- Grid: 12 columns with 24–32px gap
- Section vertical padding: `--space-16` (64px) desktop, `--space-12` (48px) mobile

---

## 3. Component Specifications

Each specification covers: purpose, appropriate use, inappropriate use, variants, sizes, responsive behavior, content rules, accessibility, and all interactive states.

---

### C-01 · Header

**Purpose:** Global site header. Sticky navigation anchor visible on all public pages.

**Appropriate use:** One instance per page. Always the topmost element.

**Inappropriate use:** Do not use inside modals, drawers, or embedded iframes. Do not modify the header per product page — it must remain consistent.

**Variants:**
- Default (transparent/white) — used on all non-hero sections
- Scrolled (`.is-scrolled`) — added via JavaScript when `scrollY > 0`; adds `--shadow-sm`

**Sizes:** Fixed height of 72px.

**Responsive behavior:**
- Desktop (≥1024px): Logo left, nav links center-right, "Get a Quote" button right
- Mobile/Tablet (<1024px): Logo left, hamburger icon right. Nav links hidden.

**Content rules:**
- Logo: SVG logotype. Max-height 36px.
- Nav links: 4–6 items maximum. No icons in nav links (chevron for dropdown only).
- CTA button: Always "Get a Quote" — do not swap for other CTAs per page.

**Accessibility:**
- `<nav aria-label="Primary navigation">` wraps the link group.
- Active page link: `aria-current="page"` on the active `<a>`.
- Hamburger: `aria-label="Open menu"` / `aria-label="Close menu"`, `aria-expanded` updated on toggle.

**States:**
- Default: white background, border-bottom `--color-border-subtle`
- Scrolled: `box-shadow: --shadow-sm`
- Nav link hover: `background-color: --color-navy-subtle`, `color: --color-navy`
- Nav link active: bronze underline via `::after`

---

### C-02 · Desktop Navigation

**Purpose:** Primary navigation for desktop viewports. Inline within the site header.

**Appropriate use:** Inside `<nav>` within `.site-header`. One per page.

**Inappropriate use:** Do not use as a section sub-nav or sidebar nav.

**Variants:** Standard nav links, nav link with mega-menu trigger (`.nav-item` contains `.mega-menu`)

**Responsive behavior:** Hidden at <1024px; replaced by mobile nav.

**Content rules:** Link labels ≤2 words. No icons except the dropdown chevron.

**Accessibility:**
- Arrow key navigation within nav items (implement in JS: left/right arrow moves focus between top-level items, down arrow opens submenu).
- `aria-haspopup="true"` on links with dropdowns.
- `aria-expanded` on dropdown triggers.

**States:** Default, Hover (navy subtle bg), Active/current (bronze underline), Focus (bronze focus ring), Open (chevron rotated 180°)

---

### C-03 · Product Mega-Menu

**Purpose:** Dropdown product navigator showing Windows and Doors in two-column layout.

**Appropriate use:** Triggered from the "Windows" and "Doors" nav items only.

**Inappropriate use:** Do not use for non-product navigation (About, Projects, Contact).

**Structure:**
- Two columns: Windows | Doors
- Each column has a material sub-grouping: Aluminum | uPVC
- Each product entry: series name + series number
- Footer row: "View All Windows" + "View All Doors" ghost links

**Responsive behavior:** Not shown on mobile. Mobile uses accordion nav drawer instead.

**Accessibility:**
- Role: none (the wrapping `<div>` is decorative; links within are naturally focusable)
- Keyboard: tab to navigate links; Escape closes the menu
- Focus trap: not required; Escape returns focus to the trigger

**Animation:** `menu-enter` — 200ms, fade-in + 4px upward translate (CSS animation in components.css)

---

### C-04 · Mobile Navigation

**Purpose:** Full-height drawer navigation for mobile and tablet viewports.

**Appropriate use:** Triggered by the hamburger button in the site header.

**Inappropriate use:** Do not use as a desktop sidebar or as a modal.

**Variants:** Standard (no accordion) / With accordion submenu for Products

**Animation:** Drawer slides in from left (300ms, `--ease-enter`). Backdrop fades in simultaneously.

**Accessibility:**
- `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"` on `.mobile-nav__drawer`
- Focus trap while open: Tab cycles only through drawer links
- On open: move focus to first link or close button
- On close: return focus to hamburger button
- Scroll lock: `overflow: hidden` on `<body>` while open

**States:** Closed (`.mobile-nav` default), Open (`.mobile-nav.is-open`)

---

### C-05 · Breadcrumbs

**Purpose:** Wayfinding — shows the user's location in the site hierarchy.

**Appropriate use:** Product pages, project pages, documentation pages. Any page ≥2 levels deep.

**Inappropriate use:** Do not use on the homepage or on top-level section index pages.

**Content rules:**
- Max 4 levels (Home → Category → Sub-category → Page)
- "Home" as first item only if space permits on mobile; can be omitted at <480px
- Current page: plain text, not a link, with `aria-current="page"`
- Separator: `/` (forward slash), `aria-hidden="true"`

**Accessibility:**
- Wrap in `<nav aria-label="Breadcrumb">` with an ordered list `<ol>`

---

### C-06 · Buttons

**Purpose:** Primary interactive controls for user actions.

**Variants:**

| Class | Use | Background | Text |
|-------|-----|------------|------|
| `.btn-primary` | Primary action (one per view) | `--color-navy` | White |
| `.btn-secondary` | Alternative action | `--color-bronze` | White |
| `.btn-outline` | Tertiary action on light bg | Transparent | `--color-navy` |
| `.btn-ghost` | Low-emphasis action on light bg | Transparent | `--color-navy` |
| `.btn-ghost-inverse` | Ghost on dark background | Transparent | White |
| `.btn-danger` | Destructive actions (delete, cancel order) | `--color-error` | White |

**Sizes:**
- `.btn-sm`: 14px text, vertical padding 8px
- Base: 14px text, vertical padding 12px (default)
- `.btn-lg`: 16px text, vertical padding 16px

**Appropriate use:**
- One `.btn-primary` per visible viewport section (or per form)
- `.btn-secondary` for secondary call-to-action (e.g., "Download Datasheet" alongside "Get a Quote")
- `.btn-outline` for actions that don't require strong visual emphasis

**Inappropriate use:**
- Do not use `.btn-danger` for navigation
- Do not use multiple `.btn-primary` buttons in the same view
- Do not add decorative icons that aren't semantically meaningful

**Content rules:**
- 1–4 words. Imperative verb: "Get a Quote," "Download Spec Sheet," "Request Samples"
- Icon (optional): left of label for directional clarity, right for external links

**States:** Default, Hover, Focus (bronze focus ring), Active (1px translateY down + darker color), Disabled (45% opacity, `pointer-events: none`), Loading (spinner replaces icon)

**Accessibility:**
- `<button>` for actions, `<a>` for navigation. Never use `<div>` as a button.
- All disabled buttons include `disabled` attribute (not just opacity styling)
- Loading: add `aria-busy="true"`, update `aria-label` to include "Loading…"

---

### C-07 · Links

**Variants:**
- `.link`: Standalone links with visible underline. Use for "Learn more," "View details."
- `.link-inline`: Links embedded in body copy. Lighter underline, inherits text size.
- `.link-download`: Inline download links with arrow icon.

**Inappropriate use:** Do not style navigation links as `.link`. Nav links use `.nav-link`. Do not use `.link` for CTAs — use `.btn-ghost` instead.

**Accessibility:** Links must have descriptive text. "Click here" and "Read more" are not acceptable without `aria-label` context.

---

### C-08 · Form Fields

**Purpose:** Text entry for user data (name, email, phone, project description, addresses).

**Input types supported:** text, email, tel, number, password, search, url, textarea

**Variants:** Default, With icon (`.input-wrapper`), With hint, With error, With success

**Sizes:** `.input-sm` (compact, secondary forms), Base (default), `.input-lg` (prominent single-field forms)

**Content rules:**
- Always pair with `<label>` — never use placeholder text as the only label
- Placeholder text is supplementary guidance, not the field label
- Hint text (`.form-hint`) for additional context that helps completion
- Error text (`.field-validation--error`) must be specific: "Enter a valid US phone number" not "Invalid input"

**States:** Default, Hover (stronger border), Focus (navy border + navy subtle ring), Filled, Error (red border + error message below), Success (green border), Disabled (canvas background)

**Accessibility:**
- `id` on `<input>` must match `for` attribute on `<label>` (no aria-label substitution for visible fields)
- Error messages linked via `aria-describedby`
- Required fields: `required` attribute + visual indicator (red asterisk with `aria-hidden="true"` and screen-reader text "required")

---

### C-09 · Select Controls

**Purpose:** Dropdown selection from a predefined list of options.

**Appropriate use:** When options are ≥5 and a radio group would be too long. Project type, product category, finish selection.

**Inappropriate use:** When options are 2–4 items — use radio group instead.

**States:** Default, Hover, Focus, Error, Disabled

**Accessibility:** Use native `<select>` element (not custom div-based). Screen readers handle native selects reliably.

---

### C-10 · Checkboxes & Radios

**Checkbox:** Multiple selection from a list (product interest types, feature filters)
**Radio:** Single selection from mutually exclusive options (project type, installation type)

**Variants:**
- Standard (with optional hint text per option)
- Indeterminate state for checkboxes (parent of partially-checked group)

**Content rules:** Label text should be noun or noun phrase, not a question. "New Construction" not "Is this a new construction project?"

**Accessibility:**
- Group with `<fieldset>` + `<legend>` when the group has a shared question/label
- Custom control appearance uses CSS only — underlying native `<input>` is always present (not hidden, just visually overridden)

---

### C-11 · File Upload

**Purpose:** Allow users to attach files (project drawings, photos, RFP documents) to quote requests.

**Appropriate use:** Quote form, document submission contexts.

**States:** Default, Drag-over (navy border + subtle bg), Uploading (progress indicator), Uploaded (file list with name/size), Error (too large, wrong type)

**Content rules:**
- Display accepted file types and max size in hint text
- Show each uploaded file's name and size
- Allow removal of individual files

---

### C-12 · Product-Series Card

**Purpose:** The primary browse unit for the product catalog grid.

**Anatomy:** Product image (4:3) → Material tag → Series number → Product name → Brief description → Footer with "View Series →" link

**Content rules:**
- Image: actual product photograph or series diagram. Never a placeholder indefinitely.
- Series number: always displayed above the name (e.g., "Series 72")
- Name: max 5 words
- Description: max 2 sentences / 30 words
- Tag: material type only (Aluminum, uPVC) — no other tags unless availability status is needed

**Hover behavior:** 2px translateY lift + shadow upgrade + image scale 1.03x

**Responsive behavior:**
- Desktop: 3 per row
- Tablet: 2 per row
- Mobile: 1 per row (full width)

**Accessibility:**
- Entire card is a single `<a>` — all content within is presentational
- `aria-label` on the `<a>` should describe the product: `aria-label="Series 72 Thermal Break Casement - View product details"`

---

### C-13 · Project Card

**Purpose:** Showcase real installations. Used on Projects page and as social proof on product pages.

**Anatomy:** Full-bleed image (3:2) with gradient overlay → location label → project title → product used

**Content rules:**
- Location: city or neighborhood ("Pacific Heights, San Francisco")
- Title: brief project description ("Single-Family Residence Fenestration")
- Product: series name only

**Placeholder policy:** Do not use project cards without real photography. Maintain a "Projects" section as coming soon rather than stock imagery.

---

### C-14 · Specification Table

**Purpose:** Display structured product specifications in a scannable two-column layout.

**Structure:** Label column (1/3 width) | Value column (2/3 width)
- Alternating row background (white/canvas)
- Key values use `--value--emphasis` class (navy, semibold) to highlight critical specs

**Content rules:**
- Label: noun or noun phrase. Max 4 words.
- Value: specific and complete. Include units.
- Max 12 rows before breaking into sections with sub-headers.

**Responsive:** Single-column stack on <480px (label above value)

---

### C-15 · Comparison Table

**Purpose:** Side-by-side product series comparison (e.g., Series 72 vs. Series 82 vs. Series 92).

**Content rules:**
- First column: feature labels
- Subsequent columns: one per product (max 4 products)
- Boolean values: use check/dash icons, not "Yes"/"No" text
- Highlight the recommended or best-value column with a navy header

**Responsive:** Horizontal scroll on mobile rather than column collapse.

---

### C-16 · Feature List

**Purpose:** Structured list of product benefits or technical capabilities.

**Variants:**
- Full: Icon + title + description paragraph (for product introduction sections)
- Compact: Icon + title only (for quick-facts, sidebar lists)
- Grid: Compact items in 2-column grid (for dense feature comparison)

**Icon rules:** Lucide check icon (circle-check or check) in `--color-bronze`. Do not use emoji or decorative icons.

**Inappropriate use:** Do not use feature lists as navigation. Do not use for FAQ content (use Accordion).

---

### C-17 · Certification / Document Link

**Purpose:** Downloadable certification, test report, or technical document with clear attribution.

**Anatomy:** File type icon → Document name → Certifying body + file size → Download icon

**Content rules:**
- Name: exact document name, not marketing copy
- Meta: certification body (AAMA, NFRC, etc.), file format, file size
- Always use actual download link — do not fake availability

---

### C-18 · Finish Swatch

**Purpose:** Visual selector for available finish colors.

**States:** Default, Hover (scale 1.08), Selected (navy border + checkmark badge)

**Content rules:**
- Name: official RAL/ANZA/color name
- Code: RAL code or "Anodized" designation
- Max 12 swatches before adding a "View full palette" link

**Accessibility:**
- Swatch is a `<button>` with `aria-pressed` for selected state
- `aria-label="Select finish: Traffic White, RAL 9016"`

---

### C-19 · Hardware Option

**Purpose:** Selection of hardware (handles, hinges, locking systems) for configuration.

**States:** Default, Hover (stronger border), Selected (navy border + navy focus ring)

**Content rules:**
- Product image: real hardware photo, neutral background
- Brand: manufacturer (Siegenia, Roto, etc.)
- Name: model name, concise

---

### C-20 · Image Gallery

**Purpose:** Grid display of product or project photography.

**Variants:** 2-col, 3-col, 4-col. Optional featured item (`.gallery__item--featured`) spanning 2 columns.

**Behavior:** Thumbnail grid; click opens lightbox (lightbox component is a Phase 3 addition).

**Responsive:** 3-col and 4-col collapse to 2-col at <768px.

**Accessibility:**
- Each `<img>` has meaningful `alt` text ("Series 72 casement window installed in wood-frame building, Pacific Heights")
- Gallery items are keyboard-focusable (`tabindex="0"` on `<div>` or use `<button>`)

---

### C-21 · Accordion

**Purpose:** Progressive disclosure of FAQ, product Q&A, technical details.

**Appropriate use:** FAQ sections, product detail pages (specs that would create excessive scroll), application guides.

**Inappropriate use:** Do not use accordion for primary navigation. Do not use for content that users frequently need simultaneously.

**Behavior:** Click trigger to toggle. One or multiple items can be open simultaneously (no "close siblings" behavior by default — can be changed per implementation).

**Accessibility:**
- Trigger is a `<button>` with `aria-expanded` and `aria-controls` pointing to the content `id`
- Content panel uses `aria-hidden` (true/false)
- Keyboard: Enter/Space activates trigger

---

### C-22 · Tabs

**Purpose:** Organize related content into switchable panels on product pages (Overview, Specifications, Finishes, Documents).

**Appropriate use:** Product detail pages — max 5 tabs per set.

**Inappropriate use:** Do not use tabs for navigation between different pages. Do not use nested tab groups.

**Behavior:** Click activates panel; keyboard arrows navigate between tabs (ARIA tab pattern).

**Accessibility:**
- `role="tablist"`, `role="tab"`, `role="tabpanel"` per ARIA authoring practices
- Arrow keys navigate between tabs; Enter/Space activates
- `aria-selected` on tabs; `aria-hidden` on panels

---

### C-23 · Quote Form

**Purpose:** Primary conversion form. Collects contact info and project details for a quote request.

**Fields (required):** First name, Last name, Email, Phone
**Fields (optional):** Company, Project type (select), Product interest (checkbox group), Project size, Message/notes, File upload

**Layout:** 2-column grid on desktop, 1-column on mobile. Full-width fields: message, file upload.

**Submission states:** Idle, Submitting (button loading), Success (replace form with success notification), Error (show error notification, keep form data)

**Accessibility:**
- All fields have visible labels
- Required fields marked with `*` (asterisk) with `aria-hidden="true"` and screen-reader text "required" in the label
- Submission error moves focus to error notification

---

### C-24 · Download Block

**Purpose:** Single-file download entry, typically in a "Documentation" or "Downloads" section.

**Variants:** PDF (red icon), DWG/CAD (navy icon), Document/Word (blue icon)

**Content rules:** Actual file name, format, and file size. Do not show download blocks for files that don't exist.

---

### C-25 · Footer

**Purpose:** Site-wide bottom navigation, contact info, legal links.

**Structure:**
- Column 1 (1.5x): Brand name + tagline/description
- Column 2–3 (1x each): Product category links
- Column 4 (1.2x): Contact info
- Bottom row: Copyright + legal links

**Content rules:**
- Brand tagline: "Bay Area Factory-Direct Distributor of European-grade aluminum and uPVC fenestration systems."
- No fax numbers, no social media icons (unless accounts are active)
- Legal links: Privacy Policy, Terms of Use (minimum)

**Responsive:** 4-col → 2-col at tablet, 1-col at mobile

---

### C-26 · Notification / Validation Messages

**Purpose:** System feedback after user actions (form submission, errors, status changes).

**Variants:**
- Success (`--success`): Form submitted, action completed
- Error (`--error`): Submission failed, validation error
- Warning (`--warning`): Important information before action (lead time, availability)
- Info (`--info`): Neutral informational update (new product, change in process)

**Placement:**
- Page-level: Top of page content, below header
- Form-level: Above form submit button
- Field-level: Use `.field-validation` below the specific field

**Dismiss:** Success and info notifications are dismissible (× button). Error and warning notifications should not auto-dismiss — require explicit user action.

**Accessibility:**
- Notification containers: `role="status"` (info/success) or `role="alert"` (error/warning)
- `aria-live="polite"` for success/info, `aria-live="assertive"` for errors

---

## 4. Governance

### 4.1 When to Create a New Component

**Create a new component when:**
- A UI pattern appears in 3 or more distinct locations in designs
- An existing component cannot accommodate the need without breaking its specification
- A pattern is sufficiently different in purpose (not just appearance) from existing components

**Do not create a new component when:**
- An existing component can be used with a documented variant or modifier class
- The need is one-off and page-specific (use inline styles scoped to that page's CSS block)
- The variation is purely cosmetic (color, spacing within token scale)

**Process:** Propose in writing with 3 real-use examples, the token list it would consume, and ARIA pattern. Discuss before implementation.

---

### 4.2 When to Extend an Existing Component

Add a documented variant (e.g., `.product-card--horizontal`) when:
- The core structure and purpose are identical
- Only layout or minor visual treatment differs
- The variant will be used ≥2 times

Add it to `components.css` in the relevant component block. Document the variant in this file under the component's spec.

---

### 4.3 Naming Conventions

**CSS class names:** BEM-inspired.
- Block: `.component-name`
- Element: `.component-name__element`
- Modifier/state: `.component-name--variant` or `.is-state`
- Utility: single-purpose, functional name (`.flex`, `.gap-4`, `.sr-only`)

**Token names:** `--[category]-[property]-[modifier]`
- `--color-navy-hover`
- `--space-6`
- `--font-heading`
- `--duration-base`

**File structure:**
```
design-system/
  tokens.css       ← source of truth for all values
  base.css         ← reset, typography classes, layout utilities
  components.css   ← all component styles
  showcase.html    ← private component viewer
  DESIGN-SYSTEM.md ← this document
```

When building pages, import order must be: `tokens.css` → `base.css` → `components.css` → page-specific styles (if any).

---

### 4.4 Token Usage Rules

1. **No raw hex colors** in any file outside `tokens.css`. If a value isn't in `tokens.css`, add it there first.
2. **No arbitrary spacing** values in `px` outside the defined scale. If a needed value is between scale steps, either choose the nearest step or add the value to the token file.
3. **No raw font-size px values.** Use `--text-*` tokens.
4. **No font-family strings** except via `--font-heading` and `--font-body`.
5. **Corner radii above 8px are prohibited.** `var(--radius-lg)` is the maximum. There are no exceptions.
6. **No inline `style=""` attributes** on public-facing pages except for dynamic values (e.g., swatch background colors set via JS from data).

---

### 4.5 Review Process for Future Pages

Before any page (Phase 3+) goes to production:

1. **Token audit:** Run `grep -r "color:#\|color: #\|background:#\|background: #"` on the page's CSS. Any hits are violations.
2. **Spacing audit:** Check for arbitrary `px` values in padding/margin/gap that don't correspond to token values.
3. **Component audit:** Confirm all UI elements use components defined here, or are newly documented.
4. **Copy audit:** Check for prohibited phrases (see §1.4). Run search for: exclusive, luxury, world-class, elevate, reimagine, innovative, transform, curated, seamless, unparalleled, superior, premium.
5. **Accessibility check:** Run axe-core or Lighthouse accessibility audit. Minimum score 90.
6. **Responsive check:** Verify at 375px, 768px, 1024px, and 1440px.
7. **Written approval:** Get written sign-off before committing to the main branch.

---

## Unresolved Design Decisions

The following decisions are deferred to Phase 3 or require written approval before resolution:

| # | Decision | Options | Notes |
|---|----------|---------|-------|
| 1 | Editorial serif typeface | Approx, Freight Display, Cormorant, none | May be proposed for hero headlines or pull quotes. Requires approval. |
| 2 | Hero image strategy | Real photography, architectural line art, none (type-only) | Currently no hero.jpg in repo. Must be resolved before Phase 3. |
| 3 | OG image | Custom design, auto-generated, type-on-color | og-image-v2.jpg currently missing from /img/. |
| 4 | Projects page structure | Grid of cards, curated showcase, filterable gallery | Depends on how many real projects can be documented at launch. |
| 5 | Contact strategy | Form only, phone/email listed, appointment booking | Currently no contact information on the site. Requires business decision. |
| 6 | Social media links | None (recommended until accounts are active), Instagram only, LinkedIn | Footer col-4 has placeholder. |
| 7 | Lightbox for image gallery | Native `<dialog>`, custom overlay, or no lightbox (Phase 3 add) | Gallery component exists; lightbox behavior not yet spec'd. |
| 8 | Product configurator depth | Finish + hardware selector only, or full interactive quote builder | Quote form scope TBD. |
| 9 | Mega-menu trigger | Hover (desktop) vs. Click only | Hover is standard for desktop product menus; click is more accessible. Recommend click with hover enhancement. |
| 10 | URL strategy | SPA JS routing (current) vs. real URLs per page | Real URLs are strongly recommended for SEO and direct linking. Requires architectural decision before Phase 3 build. |

---

*Fenovera Design System · Internal Reference · v1.0.0 · Phase 2*
*Files: tokens.css · base.css · components.css · showcase.html · DESIGN-SYSTEM.md*
