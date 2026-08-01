# Fenovera Homepage — Content Outline
**Phase 4 Planning Document — No HTML built**  
**Status:** Planning only. This document is a structured content outline for `index.html` (homepage). No code has been written. Every statement is pre-classified before a single line of HTML is authored.

---

## Classification Key

| Tag | Meaning |
|-----|---------|
| ✅ **Confirmed** | Verified in writing by owner — safe to use |
| 🟡 **Generic** | Universally applicable to any legitimate business in this category; carries no factual risk |
| 🔵 **Safe Qualification** | Truthful when written as a contact prompt or inquiry rather than a statement of fact |
| ❌ **Unverified** | Not confirmed; cannot appear in copy without owner sign-off |
| 🚫 **Launch Blocker** | Must be resolved before page goes public (placeholder, noindex, dev notice, unlinked page, etc.) |

---

## Sections

---

### 1. Hero Section

**Purpose:** First impression. Establish what Fenovera is. Drive visitors to Products.

| Statement | Classification | Notes |
|-----------|---------------|-------|
| Headline: "Aluminum Window and Door Systems" | ✅ Confirmed | Category: Windows + Doors. Material: Aluminum. All confirmed. |
| Sub-headline: "76 Series · 85 Series · 152 Series" | ✅ Confirmed | All three series confirmed. |
| Body: "Explore our current product families." | 🟡 Generic | No factual claim; general invitation. |
| CTA 1: "View Products" → `/products/` | ✅ Confirmed | Link resolves; target page built. |
| CTA 2: "Request a Quote" → `/quote/` | 🚫 Launch Blocker | Quote page not yet built. |
| Hero image | 🚫 Launch Blocker | All product images have unverified rights and provenance. Must use a confirmed, licensed image or a safe stock photo. |

**Design note:** Hero image is either (a) a licensed photo supplied by owner, or (b) a typographic / abstract background requiring no product photography rights clearance. Do not reuse images from the existing product pages until rights are confirmed.

---

### 2. Products Section (Three cards)

**Purpose:** Introduce all three product series. Drive to individual product pages.

| Statement | Classification | Notes |
|-----------|---------------|-------|
| Section headline: "Our Product Families" | 🟡 Generic | Makes no factual claim. |
| Card 1 — label: "Windows · 76 Series" | ✅ Confirmed | |
| Card 1 — name: "Casement & Swing" | ✅ Confirmed | |
| Card 1 — material: "Aluminum" | ✅ Confirmed | |
| Card 1 — description: "Aluminum casement and swing window system." | ✅ Confirmed | |
| Card 1 — image | 🚫 Launch Blocker | Rights / provenance unverified. Use placeholder. |
| Card 2 — label: "Windows · 85 Series" | ✅ Confirmed | |
| Card 2 — name: "Slimline" | ✅ Confirmed | |
| Card 2 — material: "Aluminum" | ✅ Confirmed | |
| Card 2 — description: "Aluminum slimline window system." | ✅ Confirmed | |
| Card 2 — image | 🚫 Launch Blocker | Rights / provenance unverified. Use placeholder. |
| Card 3 — label: "Doors · 152 Series" | ✅ Confirmed | |
| Card 3 — name: "Lift & Slide" | ✅ Confirmed | |
| Card 3 — material: "Aluminum" | ✅ Confirmed | |
| Card 3 — description: "Aluminum lift and slide door system." | ✅ Confirmed | |
| Card 3 — image | 🚫 Launch Blocker | Rights / provenance unverified. Use placeholder. |
| All product links → individual pages | ✅ Confirmed | All three product pages are built. |

---

### 3. Contact / CTA Section

**Purpose:** Low-friction contact prompt. Works without resolving unverified claims.

| Statement | Classification | Notes |
|-----------|---------------|-------|
| Headline: "Contact Us" | 🟡 Generic | |
| Body: "Contact us for specifications, pricing, and availability." | 🔵 Safe Qualification | Framed as a prompt, not a claim about what is on hand. |
| Email: `info@fenovera.com` | ✅ Confirmed | |
| Phone: `000-000-0000` | 🚫 Launch Blocker | Not confirmed. Use `[PHONE TO VERIFY]` placeholder. |
| "Based in the Bay Area" | ✅ Confirmed | Owner confirmed Fenovera is an American distributor based in the Bay Area. Use exactly: "based in the Bay Area." |
| "Serves the Bay Area" / "Serving the Bay Area" | ❌ Unverified | Service territory not confirmed. Being based in the Bay Area does not confirm geographic service scope. Do not use territory claims. |
| CTA: "Request a Quote" → `/quote/` | 🚫 Launch Blocker | Quote page not yet built. |
| CTA: "Send us an email" → `mailto:info@fenovera.com` | ✅ Confirmed | Email address confirmed. Safe to use. |

---

### 4. Why Fenovera / About Teaser Section

**Purpose:** Differentiate. Build trust. This section has the highest risk of unverified claims.

| Statement / Claim | Classification | Notes |
|-------------------|---------------|-------|
| "Factory-direct" | ❌ Unverified | OWNER TO CONFIRM (from PRODUCT-DATA-VERIFICATION.md). Do not include until confirmed. |
| "Bay Area distributor" / "based in the Bay Area" | ✅ Confirmed | Owner confirmed: Fenovera is an American distributor based in the Bay Area. |
| "Serving the Bay Area" / "Serving the entire Bay Area" | ❌ Unverified | Service territory not confirmed. Do not claim coverage or service area. |
| "European-grade aluminum systems" | ❌ Unverified | Sourcing not confirmed. Do not include. |
| "Independently tested" | ❌ Unverified | No test reports confirmed. Do not include. |
| "Family-owned" / "Locally owned" | ❌ Unverified | Business structure not confirmed for copy. |
| Any certification claim (AAMA, NFRC, Title 24, EN) | ❌ Unverified | All certifications unverified. Do not include. |
| "We represent premium aluminum systems." | ❌ Unverified | "Premium" is unverified marketing claim. |
| **Safe alternative:** "Fenovera supplies aluminum window and door systems across three current product families. Contact us for current specifications and pricing." | ✅ Confirmed | This alternative uses only confirmed information and a generic prompt. |

**Recommendation:** Either omit this section entirely until owner provides confirmed facts, or replace with the safe alternative above and a simple "Learn more about us" → `/about/` link (page not yet built).

---

### 5. Navigation and Footer

Navigation and footer markup is baked into each page at build time by `scripts/build-site.js` from the templates in `site/templates/`. Client-side interaction (mega-menu, mobile nav) is handled by `site/nav.js`. The shared markup uses only confirmed information, except:

| Element | Status |
|---------|--------|
| Phone number in footer | 🚫 Launch Blocker — `[PHONE TO VERIFY]` |
| `/quote/` links | 🚫 Launch Blocker — page not built |
| `/about/`, `/projects/`, `/contact/`, `/privacy/`, `/terms/` | ❌ Pages not yet built; links will 404 |

---

## Summary: Launch Blockers Before Homepage Can Go Live

| # | Blocker | Location |
|---|---------|----------|
| 1 | `noindex` directive | `<head>` |
| 2 | Dev notice banner | Page body |
| 3 | Hero image (rights/provenance) | Hero section |
| 4 | Product card images × 3 (rights/provenance) | Products section |
| 5 | Phone number | Footer (in `site/templates/footer.html` → baked into generated HTML) |
| 6 | `/quote/` page not built | Multiple CTAs |
| 7 | `/about/`, `/projects/`, `/contact/` not built | Nav + footer |
| 8 | Any "Why Fenovera" claims (if included) | Section 4 |

**Minimum viable homepage at launch:** Sections 1, 2, and 3 only, with all images confirmed and licensed, phone confirmed, and quote page built.

---

## Content Not Included in Homepage (Until Verified)

The following content types are present in some competitor or draft websites but may NOT appear in the Fenovera homepage until owner sign-off:

- Lead time ranges ("ships in 2–4 weeks")
- Color / finish options
- Hardware brands
- Frame depth or sightline specifications
- Maximum unit sizes
- Certification logos or compliance badges
- BIM / DWG file availability
- Service territory claims (Bay Area, California, etc.)
- "Factory-direct" or "direct pricing" language
- Any testimonials or project case studies (none confirmed)

---

*Document owner: Nima Rouhi · Phase 4 Planning · Last updated: 2026-07-27 — Bay Area confirmed v1.1*
