# Owner Verification Checklist

Items in this list require confirmation or decision from Fenovera LLC before the relevant content can be treated as authoritative on the public website. This file is internal and should not be published.

---

## 1. NFRC Certification Status

**Claim on site:** "NFRC energy performance documentation available."
**What to verify:**
- Confirm which series (LD-X76, LD-S8520, LD-G152, LD-G88, PRM-K80, PRM-150, PRM-58, PRM-60, PRM-70, PRM-72, PRM-80, PRM-88, PRM Hung) have formal NFRC product listings or certified test reports.
- Obtain NFRC certificate numbers or test report references for each verified series.
- Update `site/data/products.js` `certifications` arrays for each verified series.
- Update heroIntro text to reflect actual certification status per series.

**Contact for verification:** Manufacturer / supplier technical representatives.

---

## 2. SGS Testing Certification

**Claim on site:** SGS listed in certifications arrays for multiple series.
**What to verify:**
- Obtain SGS test report numbers for each series that lists SGS.
- Confirm scope: what specific tests (air/water/structural) were performed and to which standard.
- Confirm whether SGS certification covers the specific configurations offered (e.g., all opening types or only tested configurations).

---

## 3. Florida Building Code Approval

**Claim on site:** "Florida Approval" listed in certifications for LD-G152 series.
**What to verify:**
- Obtain Florida Product Approval number (FL#) from the Florida DBPR database.
- Confirm approval covers the specific product configurations and sizes offered.
- Confirm approval is current and not expired.

---

## 4. Intertek Certification

**Claim on site:** Intertek listed in certifications for LD-S8520 series.
**What to verify:**
- Obtain Intertek certificate number and test scope.
- Confirm which configurations and sizes are covered.

---

## 5. Glass Certifications

**Claim on site:** `'Tempered glass (3C or SGCC certified)'` in glass options for multiple products.
**What to verify:**
- Confirm the specific glass supplier and certification mark used.
- 3C is Chinese quality certification; SGCC is US Safety Glazing Certification Council — confirm which applies to glass supplied for US projects.
- Clarify for customers which certification applies to which order/destination.

---

## 6. Low-E Glass U-value and SHGC Claims

**Claim on site:** `'Low-E glass (meets U-value and SHGC requirements)'`
**What to verify:**
- "Meets U-value and SHGC requirements" is vague — clarify which standard and climate zone requirements are referenced (IECC, Title 24, etc.).
- Obtain actual U-value and SHGC performance data for available Low-E glass options.
- Update product specs with actual values once confirmed.

---

## 7. Mailing Address

**Current status:** No mailing address shown on public pages (intentional per owner instruction).
**Action required:** Owner to decide when and what mailing/registered address to publish. Until then, email-only contact remains in place.

---

## 8. Separate Sales Terms

**Current status:** Terms of Use note that product-purchase liability, returns, and other sales terms are governed by separate Sales Terms.
**Action required:** Owner (with counsel) to draft and approve Sales Terms before executing product-sale contracts. The current Terms of Use are website-use terms only and do not cover the full product-sale relationship.

---

## 9. Product Availability — LD-P Series (Ledow uPVC)

**Current status:** LD-P80 Hung, LD-P80 Sliding, LD-P85 Casement, LD-P108 Door pages are live.
**Action required:** Confirm current availability and lead times for these series. Confirm the correct series designations match the manufacturer's current product lineup.

---

## 10. PRM Hung Series — Series Number

**Claim on site:** "Series number to be confirmed."
**Action required:** Obtain and confirm the correct Prima series designation for the hung window and update `products.js` `publicName`, `description`, and `heroIntro`.

---

## 11. Robots / Indexing

**Current status:** All product detail pages have `<meta name="robots" content="noindex, nofollow">`.
**Action required:** Owner to decide when product pages are ready for public indexing and remove the noindex directive series by series after completing verification.

---

## 12. Product Images

**Several products have `rightsVerified: false` in products.js.** These images are used on the site but image rights have not been confirmed.

| Series | heroImage.rightsVerified | Source noted |
|--------|--------------------------|--------------|
| PRM-K80 aluminum window | false | Prima aluminum catalog |
| LD-S8520 doors | false | LEDOW catalog |
| LD-G88 bi-fold | false | LEDOW catalog |
| PRM uPVC series (multiple) | false | Prima uPVC catalog |
| PRM doors (multiple) | false | Prima uPVC catalog |

**Action required:** Obtain written confirmation from each manufacturer/supplier that product images may be used on fenovera.com. Alternatively, replace with licensed or original photography.

---

*Last updated: August 2026. Review and update this list as verifications are completed.*
