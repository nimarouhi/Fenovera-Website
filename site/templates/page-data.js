/**
 * Fenovera — Build-time page registry
 * Version: 2.0  Foundation
 *
 * Generates the complete page list from site/data/products.js and
 * site/data/categories.js, plus explicitly registered one-off pages.
 *
 * Each entry requires:
 *   src         — source template path (relative to project root)
 *   out         — output file path (relative to project root)
 *   pageId      — nav token identifier
 *   title       — <title> element text
 *   description — <meta name="description"> content
 *   data        — (optional) data object for DATA/SECTION tokens
 *
 * Run:  node scripts/build-site.js
 */
'use strict';

var path     = require('path');
var products = require('../data/products');
var categories = require('../data/categories');

// ── Build a lookup map: type/material/slug → product ────────────────────────
// Composite key prevents collisions when the same slug appears under different
// type/material paths (e.g. prm-50a is both a window and a door series).
var productByKey = {};
products.forEach(function (p) {
  productByKey[p.typeSlug + '/' + p.materialSlug + '/' + p.slug] = p;
});

// ── Helper: find related products (same type, same material, different slug) ─
function getRelated(product, limit) {
  limit = limit || 2;
  return products
    .filter(function (p) {
      return p.typeSlug === product.typeSlug &&
             p.materialSlug === product.materialSlug &&
             p.slug !== product.slug;
    })
    .slice(0, limit);
}

// ── OG image catalogue for non-product pages ─────────────────────────────────
// These are absolute root-relative paths resolved to absolute URLs by buildSeoBlock().
var OG = {
  home:         '/img/home/fenovera-home-background.webp',
  winAl:        '/img/al-x76-window-hero.jpg',
  winUpvc:      '/img/upvc-cas-hero.jpg',
  winPvc:       '/img/pvc-wj60-window-hero.jpg',
  doorAl:       '/img/al-lift-slide-door-hero.jpg',
  doorUpvc:     '/img/upvc-sdoor-hero.jpg',
  doorPvc:      '/img/pvc-wj60-door-hero.jpg',
  about:        '/img/home/fenovera-home-background.webp',
  contact:      '/img/home/fenovera-home-background.webp',
  quote:        '/img/home/fenovera-home-background.webp',
  bayArea:      '/img/home/fenovera-home-background.webp',
};

// ── Build pages array ────────────────────────────────────────────────────────
var pages = [];

// 0. Homepage
pages.push({
  src:         'src/index.html',
  out:         'index.html',
  pageId:      'home',
  title:       'Custom Windows & Doors in the Bay Area | Fenovera',
  description: 'Fenovera supplies aluminum, uPVC, and PVC window and door systems for residential and commercial projects in the Bay Area. Contact us for specifications and pricing.',
  ogImage:     OG.home,
  ogImageAlt:  'Fenovera — Custom Windows and Doors in the Bay Area',
});

// 1. Top-level products overview
pages.push({
  src:         'src/products/index.html',
  out:         'products/index.html',
  pageId:      'products',
  title:       'All Products | Fenovera',
  description: 'Browse our full range of aluminum, uPVC, and PVC window and door systems. Find what you need by material or by opening type.',
  ogImage:     OG.winAl,
  ogImageAlt:  'Fenovera aluminum, uPVC, and PVC windows and doors',
});

// 1a. Products by Material
pages.push({
  src:         'src/products/by-material.html',
  out:         'products/by-material/index.html',
  pageId:      'products',
  title:       'Products by Material | Fenovera',
  description: 'Browse Fenovera window and door systems by frame material: aluminum, uPVC, and PVC. Each material has its own thermal, acoustic, and aesthetic characteristics.',
  ogImage:     OG.winAl,
  ogImageAlt:  'Fenovera windows and doors by material',
});

// 1b. Products by Type (overview)
pages.push({
  src:         'src/products/by-type.html',
  out:         'products/by-type/index.html',
  pageId:      'products',
  title:       'Products by Type | Fenovera',
  description: 'Browse Fenovera windows and doors by opening type: casement, tilt-turn, awning, sliding, hung, swing, bi-fold, and lift &amp; slide.',
  ogImage:     OG.winAl,
  ogImageAlt:  'Fenovera windows and doors by opening type',
});

// 1b-i. By Type — sub-pages
[
  { slug: 'casement',     title: 'Casement Windows | Fenovera',           desc: 'Browse all Fenovera casement window series in aluminum and uPVC.',           img: OG.winUpvc },
  { slug: 'tilt-turn',   title: 'Tilt-Turn Windows | Fenovera',           desc: 'Browse all Fenovera tilt-turn window series in aluminum and uPVC.',           img: OG.winUpvc },
  { slug: 'awning',      title: 'Awning Windows | Fenovera',              desc: 'Browse all Fenovera awning window series in aluminum and uPVC.',              img: OG.winAl  },
  { slug: 'sliding',     title: 'Sliding Windows & Doors | Fenovera',     desc: 'Browse all Fenovera sliding window and door series in aluminum and uPVC.',     img: OG.winAl  },
  { slug: 'hung',        title: 'Hung Windows | Fenovera',                desc: 'Browse all Fenovera hung window series in aluminum and uPVC.',                img: OG.winUpvc },
  { slug: 'hinged-french',title: 'Hinged & French Doors | Fenovera',       desc: 'Browse all Fenovera hinged and French door series in aluminum and uPVC.',      img: OG.doorAl },
  { slug: 'bi-fold',     title: 'Bi-Fold Doors | Fenovera',               desc: 'Browse all Fenovera bi-fold door series in aluminum.',                        img: OG.doorAl },
  { slug: 'lift-slide',  title: 'Lift & Slide Doors | Fenovera',          desc: 'Browse all Fenovera lift and slide door series in aluminum.',                  img: OG.doorAl },
].forEach(function(t) {
  pages.push({
    src:         'src/products/by-type/' + t.slug + '/index.html',
    out:         'products/by-type/' + t.slug + '/index.html',
    pageId:      'products',
    title:       t.title,
    description: t.desc,
    ogImage:     t.img,
    ogImageAlt:  t.title,
  });
});


// ── NFRC-Certified Windows page ──────────────────────────────────────────────
(function() {
  var NFRC_WIN_AL_SLUGS = ['ldw-x76', 'ldw-s8520', 'wj-91', 'wj-110'];
  var NFRC_WIN_UPVC_SLUGS = ['prm-82u', 'wj-72'];

  function buildNfrcProducts(slugs, typeSlug, materialSlug) {
    return slugs.map(function(slug) {
      var product = productByKey[typeSlug + '/' + materialSlug + '/' + slug];
      if (!product) return null;
      // Matching badge: does the same slug exist as a door?
      var otherType = typeSlug === 'windows' ? 'doors' : 'windows';
      var otherLabel = typeSlug === 'windows' ? 'Door' : 'Window';
      var hasMatch = !!productByKey[otherType + '/' + materialSlug + '/' + slug];
      if (hasMatch) {
        return Object.assign({}, product, {
          matchingLabel: 'Matching ' + otherLabel + ' Series Available',
        });
      }
      return product;
    }).filter(Boolean);
  }

  pages.push({
    src:         'src/templates/nfrc-overview.html',
    out:         'products/by-cert/nfrc/windows/index.html',
    pageId:      'nfrc-windows',
    title:       'NFRC-Certified Windows | Fenovera',
    description: 'Browse all NFRC-certified window series from Fenovera — aluminum and uPVC systems with verified energy performance ratings from the National Fenestration Rating Council.',
    ogImage:     OG.winAl,
    ogImageAlt:  'NFRC-certified windows from Fenovera',
    data: {
      seoTitle:    'NFRC-Certified Windows | Fenovera',
      typeLabel:   'Windows',
      description: 'These window series carry NFRC energy performance ratings from the National Fenestration Rating Council. NFRC ratings cover U-factor, Solar Heat Gain Coefficient (SHGC), Visible Transmittance (VT), and Air Leakage — providing independently verified data for energy code compliance and project specifications.',
      alProducts:   buildNfrcProducts(NFRC_WIN_AL_SLUGS, 'windows', 'aluminum'),
      upvcProducts: buildNfrcProducts(NFRC_WIN_UPVC_SLUGS, 'windows', 'upvc'),
    },
  });

  var NFRC_DOOR_AL_SLUGS = ['ldw-x76', 'ldw-g88', 'ldw-g152', 'prm-80a', 'prm-125a', 'prm-150a', 'wj-88', 'wj-91', 'wj-170'];
  var NFRC_DOOR_UPVC_SLUGS = ['wj-195'];

  pages.push({
    src:         'src/templates/nfrc-overview.html',
    out:         'products/by-cert/nfrc/doors/index.html',
    pageId:      'nfrc-doors',
    title:       'NFRC-Certified Doors | Fenovera',
    description: 'Browse all NFRC-certified door series from Fenovera — aluminum and uPVC systems with verified energy performance ratings from the National Fenestration Rating Council.',
    ogImage:     OG.doorAl,
    ogImageAlt:  'NFRC-certified doors from Fenovera',
    data: {
      seoTitle:    'NFRC-Certified Doors | Fenovera',
      typeLabel:   'Doors',
      description: 'These door series carry NFRC energy performance ratings from the National Fenestration Rating Council. NFRC ratings cover U-factor, Solar Heat Gain Coefficient (SHGC), Visible Transmittance (VT), and Air Leakage — providing independently verified data for energy code compliance and project specifications.',
      alProducts:   buildNfrcProducts(NFRC_DOOR_AL_SLUGS, 'doors', 'aluminum'),
      upvcProducts: buildNfrcProducts(NFRC_DOOR_UPVC_SLUGS, 'doors', 'upvc'),
    },
  });
})();

// ── OG image per type and material ──────────────────────────────────────────
var TYPE_OG = {
  windows: { al: OG.winAl, upvc: OG.winUpvc, pvc: OG.winPvc, fallback: OG.winAl },
  doors:   { al: OG.doorAl, upvc: OG.doorUpvc, pvc: OG.doorPvc, fallback: OG.doorAl },
};

// 2. Type overview pages (windows, doors)
categories.forEach(function (cat) {
  var ogImg = TYPE_OG[cat.typeSlug] ? TYPE_OG[cat.typeSlug].fallback : OG.home;
  pages.push({
    src:         'src/templates/type-overview.html',
    out:         'products/' + cat.typeSlug + '/index.html',
    pageId:      cat.pageId,
    title:       cat.seoTitle,
    description: cat.description,
    ogImage:     ogImg,
    ogImageAlt:  cat.typeLabel + ' from Fenovera — Bay Area',
    data: {
      seoTitle:    cat.seoTitle,
      typeSlug:    cat.typeSlug,
      typeLabel:   cat.typeLabel,
      description: cat.description,
      materials:   cat.materials,
    },
  });
});

// 3. Material category overview pages (windows/aluminum, windows/upvc, etc.)
var oppositeType      = { windows: 'doors',   doors: 'windows' };
var oppositeTypeLabel = { windows: 'door',    doors: 'window'  };

categories.forEach(function (cat) {
  var otherTypeSlug  = oppositeType[cat.typeSlug];
  var otherTypeLabel = oppositeTypeLabel[cat.typeSlug];

  cat.materials.forEach(function (material) {
    // Build product list for this category using composite key.
    // If the same series slug also exists under the opposite type (same material),
    // attach a matchingLabel so the grid card can show a cross-type badge.
    var materialProducts = material.productSlugs.map(function (slug) {
      var product = productByKey[cat.typeSlug + '/' + material.materialSlug + '/' + slug];
      if (!product) return null;
      var hasMatch = !!productByKey[otherTypeSlug + '/' + material.materialSlug + '/' + slug];
      if (hasMatch) {
        return Object.assign({}, product, {
          matchingLabel: 'Matching ' + otherTypeLabel.charAt(0).toUpperCase() + otherTypeLabel.slice(1) + ' Series Available',
        });
      }
      return product;
    }).filter(Boolean);

    var matOgMap  = TYPE_OG[cat.typeSlug] || {};
    var matOgImg  = matOgMap[material.materialSlug] || matOgMap.fallback || OG.home;
    var matOgAlt  = material.materialLabel + ' ' + cat.typeLabel + ' from Fenovera — Bay Area';
    pages.push({
      src:         'src/templates/category-overview.html',
      out:         'products/' + cat.typeSlug + '/' + material.materialSlug + '/index.html',
      pageId:      material.pageId,
      title:       material.seoTitle,
      description: material.description,
      ogImage:     matOgImg,
      ogImageAlt:  matOgAlt,
      data: {
        seoTitle:      material.seoTitle,
        typeSlug:      cat.typeSlug,
        typeLabel:     cat.typeLabel,
        materialSlug:  material.materialSlug,
        materialLabel: material.materialLabel,
        description:   material.description,
        products:      materialProducts,
      },
    });
  });
});

// 4. Static supporting pages
pages.push({
  src:         'src/about.html',
  out:         'about/index.html',
  pageId:      'about',
  title:       'About Fenovera | Bay Area Window & Door Distributor',
  description: 'Fenovera is a Bay Area distributor of aluminum, uPVC, and PVC window and door systems for residential and commercial projects.',
  ogImage:     OG.about,
  ogImageAlt:  'Fenovera — Bay Area Window and Door Distributor',
});

pages.push({
  src:         'src/contact.html',
  out:         'contact/index.html',
  pageId:      'contact',
  title:       'Contact Fenovera | Bay Area Windows & Doors',
  description: 'Contact Fenovera to discuss specifications, pricing, and availability for aluminum, uPVC, and PVC window and door systems in the Bay Area.',
  ogImage:     OG.contact,
  ogImageAlt:  'Contact Fenovera — Bay Area Windows and Doors',
});

pages.push({
  src:         'src/quote.html',
  out:         'quote/index.html',
  pageId:      'quote',
  title:       'Request a Free Quote | Fenovera',
  description: 'Request a free quote for aluminum, uPVC, or PVC windows and doors from Fenovera. Describe your project and we will respond with pricing and specifications.',
  ogImage:     OG.quote,
  ogImageAlt:  'Request a free quote — Fenovera Windows and Doors',
});

// Projects: placeholder-only — noindex, follow; excluded from sitemap
pages.push({
  src:          'src/projects.html',
  out:          'projects/index.html',
  pageId:       'projects',
  title:        'Projects | Fenovera',
  description:  'Fenovera project portfolio: Bay Area window and door installations for residential and commercial projects.',
  forceNoindex: true,
  sitemapExclude: true,
});

// Bay Area service page (task 10)
pages.push({
  src:         'src/bay-area.html',
  out:         'windows-doors-bay-area/index.html',
  pageId:      'bay-area',
  title:       'Windows & Doors in the Bay Area | Fenovera',
  description: 'Fenovera supplies aluminum, uPVC, and PVC windows and doors for Bay Area residential and commercial projects. Custom sizing, direct factory sourcing, and preliminary quotes available.',
  ogImage:     OG.bayArea,
  ogImageAlt:  'Fenovera Windows and Doors — serving the San Francisco Bay Area',
});

// Utility/legal pages — included in sitemap as real content
pages.push({
  src:         'src/privacy.html',
  out:         'privacy/index.html',
  pageId:      'privacy',
  title:       'Privacy Policy | Fenovera',
  description: 'Privacy Policy for Fenovera: how we collect, use, and protect your personal information.',
  sitemapExclude: true,
});

pages.push({
  src:         'src/terms.html',
  out:         'terms/index.html',
  pageId:      'terms',
  title:       'Terms of Use | Fenovera',
  description: 'Terms of Use for Fenovera: the rules and conditions governing use of fenovera.com.',
  sitemapExclude: true,
});

pages.push({
  src:         'src/cookies.html',
  out:         'cookies/index.html',
  pageId:      'cookies',
  title:       'Cookie Policy | Fenovera',
  description: 'Cookie Policy for Fenovera: how fenovera.com uses cookies and similar tracking technologies.',
  sitemapExclude: true,
});

// 5. Individual product detail pages
products.forEach(function (product) {
  var related     = getRelated(product, 2);
  var heroImgSrc  = product.heroImage && product.heroImage.src ? product.heroImage.src : '';
  // ogImage derived from heroImage; build system converts root-relative to absolute
  pages.push({
    src:         'src/templates/product-detail.html',
    out:         'products/' + product.typeSlug + '/' + product.materialSlug + '/' + product.slug + '/index.html',
    pageId:      product.pageId,
    title:       product.seoTitle,
    description: product.description,
    // ogImage/ogImageAlt intentionally NOT set here — buildSeoBlock() derives them
    // automatically from page.data.heroImage (product hero image)
    data: Object.assign({}, product, {
      related:      related,
      heroImageSrc: heroImgSrc,   // absolute image URL for JSON-LD Product.image
    }),
  });
});

module.exports = pages;
