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

// ── Build a lookup map: slug → product ──────────────────────────────────────
var productBySlug = {};
products.forEach(function (p) { productBySlug[p.slug] = p; });

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

// ── Build pages array ────────────────────────────────────────────────────────
var pages = [];

// 0. Homepage
pages.push({
  src:         'src/index.html',
  out:         'index.html',
  pageId:      'home',
  title:       'Fenovera | Aluminum and uPVC Windows & Doors',
  description: 'Fenovera supplies aluminum and uPVC window and door systems for residential and commercial projects in the Bay Area.',
});

// 1. Top-level products overview (manually authored src)
// data.categories passes the full category tree so the SECTION:products-overview-grid
// renderer can derive counts and URLs without hard-coding them in the template.
pages.push({
  src:         'src/products/index.html',
  out:         'products/index.html',
  pageId:      'products',
  title:       'Products | Fenovera',
  description: 'Aluminum and uPVC window and door systems from Fenovera.',
  data: {
    categories:    categories,
    totalProducts: products.length,
  },
});

// 2. Type overview pages (windows, doors)
categories.forEach(function (cat) {
  pages.push({
    src:         'src/templates/type-overview.html',
    out:         'products/' + cat.typeSlug + '/index.html',
    pageId:      cat.pageId,
    title:       cat.seoTitle,
    description: cat.description,
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
categories.forEach(function (cat) {
  cat.materials.forEach(function (material) {
    // Build product list for this category
    var materialProducts = material.productSlugs.map(function (slug) {
      return productBySlug[slug];
    }).filter(Boolean);

    pages.push({
      src:         'src/templates/category-overview.html',
      out:         'products/' + cat.typeSlug + '/' + material.materialSlug + '/index.html',
      pageId:      material.pageId,
      title:       material.seoTitle,
      description: material.description,
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
  description: 'Fenovera is a Bay Area distributor of window and door systems for residential and commercial projects.',
});

pages.push({
  src:         'src/contact.html',
  out:         'contact/index.html',
  pageId:      'contact',
  title:       'Contact Fenovera | Bay Area Windows & Doors',
  description: 'Contact Fenovera to discuss product specifications, pricing, and availability for window and door systems.',
});

pages.push({
  src:         'src/quote.html',
  out:         'quote/index.html',
  pageId:      'quote',
  title:       'Request a Free Quote | Fenovera',
  description: 'Request a free quote for windows and doors from Fenovera. Tell us about your project and we will respond with pricing and specifications.',
});

pages.push({
  src:         'src/projects.html',
  out:         'projects/index.html',
  pageId:      'projects',
  title:       'Projects | Fenovera',
  description: 'Fenovera project portfolio: Bay Area window and door installations for residential and commercial projects.',
});

pages.push({
  src:         'src/privacy.html',
  out:         'privacy/index.html',
  pageId:      'privacy',
  title:       'Privacy Policy | Fenovera',
  description: 'Privacy Policy for Fenovera: how we collect, use, and protect your personal information.',
});

pages.push({
  src:         'src/terms.html',
  out:         'terms/index.html',
  pageId:      'terms',
  title:       'Terms of Use | Fenovera',
  description: 'Terms of Use for Fenovera: the rules and conditions governing use of fenovera.com.',
});

pages.push({
  src:         'src/cookies.html',
  out:         'cookies/index.html',
  pageId:      'cookies',
  title:       'Cookie Policy | Fenovera',
  description: 'Cookie Policy for Fenovera: how fenovera.com uses cookies and similar tracking technologies.',
});

// 5. Individual product detail pages
products.forEach(function (product) {
  var related = getRelated(product, 2);
  pages.push({
    src:         'src/templates/product-detail.html',
    out:         'products/' + product.typeSlug + '/' + product.materialSlug + '/' + product.slug + '/index.html',
    pageId:      product.pageId,
    title:       product.seoTitle,
    description: product.description,
    data:        Object.assign({}, product, { related: related }),
  });
});

module.exports = pages;
