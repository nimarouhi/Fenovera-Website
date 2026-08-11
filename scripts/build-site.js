#!/usr/bin/env node
/**
 * Fenovera — Build-time static site generator
 * Version: 2.0  Foundation
 *
 * Reads source pages from src/, injects shared templates, resolves per-page
 * tokens and product/category data, writes complete static HTML.
 *
 * Usage:
 *   node scripts/build-site.js                  (dev build: all products, noindex)
 *   node scripts/build-site.js --dry-run        (print resolved HTML to stdout, no writes)
 *   node scripts/build-site.js --release        (production: indexable, no dev notice, draft pages excluded from sitemap)
 *
 * Source / output structure:
 *   src/<path>/index.html        — source page; contains BUILD: markers + page-specific content
 *   src/templates/*.html         — data-driven templates (product-detail, category-overview, etc.)
 *   site/templates/header.html   — shared header fragment
 *   site/templates/mobile-nav.html — shared mobile-nav fragment
 *   site/templates/footer.html   — shared footer fragment
 *   site/templates/page-data.js  — page registry (CommonJS module)
 *   site/data/products.js        — product data objects
 *   site/data/categories.js      — category tree
 *   <out>                        — generated complete static page
 *
 * BUILD: markers (each on its own line):
 *   <!-- BUILD:header -->        replaced by resolved site/templates/header.html
 *   <!-- BUILD:mobile-nav -->    replaced by resolved site/templates/mobile-nav.html
 *   <!-- BUILD:footer -->        replaced by resolved site/templates/footer.html
 *
 * Navigation tokens (resolved per pageId):
 *   {{#AC:id}}                   → ' aria-current="page"'  if id === pageId, else ''
 *   {{#ACTIVE:id1,id2,...}}      → ' is-active'  if pageId in list, else ''
 *   {{#EXPANDED:id1,id2,...}}    → 'true'  if pageId in list, else 'false'
 *   {{#HIDDEN:id1,id2,...}}      → 'false' if pageId in list, else 'true'
 *
 * Data tokens (resolved per page.data object, for data-driven templates):
 *   {{DATA:fieldName}}           → page.data.fieldName (string/number) — HTML-escaped
 *   {{DATA_RAW:fieldName}}       → page.data.fieldName — NOT escaped (pre-rendered HTML)
 *
 * Section rendering (for complex template sections):
 *   <!-- SECTION:name -->        → replaced by renderSection(name, page.data)
 */
'use strict';

var fs   = require('fs');
var path = require('path');

// ── Config ─────────────────────────────────────────────────────────────────
var PROJECT_ROOT    = path.resolve(__dirname, '..');
var TEMPLATES_DIR   = path.join(PROJECT_ROOT, 'site', 'templates');
var SRC_TEMPLATES   = path.join(PROJECT_ROOT, 'src', 'templates');
var PAGE_DATA_PATH  = path.join(TEMPLATES_DIR, 'page-data.js');
var DRY_RUN         = process.argv.indexOf('--dry-run') !== -1;
var RELEASE         = process.argv.indexOf('--release') !== -1;

// Canonical site base URL — update to the real domain before launch.
var SITE_BASE_URL   = 'https://fenovera.com';
// Default OG social-sharing image — replace with a dedicated branded image before launch.
var OG_DEFAULT_IMAGE = SITE_BASE_URL + '/img/casement.jpg';

// ── Load page registry ──────────────────────────────────────────────────────
// page-data.js is loaded fresh (delete from require cache first so re-runs work)
delete require.cache[require.resolve(PAGE_DATA_PATH)];
var pages = require(PAGE_DATA_PATH);

// ── Load shared templates ───────────────────────────────────────────────────
var templates = {
  header:       fs.readFileSync(path.join(TEMPLATES_DIR, 'header.html'),     'utf8'),
  'mobile-nav': fs.readFileSync(path.join(TEMPLATES_DIR, 'mobile-nav.html'), 'utf8'),
  footer:       fs.readFileSync(path.join(TEMPLATES_DIR, 'footer.html'),     'utf8'),
};

// ── HTML escape ─────────────────────────────────────────────────────────────
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Nav token resolution ────────────────────────────────────────────────────
function resolveNavTokens(html, pageId) {
  // {{#AC:id}} → ' aria-current="page"' or ''
  html = html.replace(/\{\{#AC:([^}]+)\}\}/g, function (_, id) {
    return id.trim() === pageId ? ' aria-current="page"' : '';
  });

  // {{#ACTIVE:id1,id2,...}} → ' is-active' or ''
  html = html.replace(/\{\{#ACTIVE:([^}]+)\}\}/g, function (_, ids) {
    var list = ids.split(',').map(function (s) { return s.trim(); });
    return list.indexOf(pageId) !== -1 ? ' is-active' : '';
  });

  // {{#EXPANDED:id1,id2,...}} → 'true' or 'false'
  html = html.replace(/\{\{#EXPANDED:([^}]+)\}\}/g, function (_, ids) {
    var list = ids.split(',').map(function (s) { return s.trim(); });
    return list.indexOf(pageId) !== -1 ? 'true' : 'false';
  });

  // {{#HIDDEN:id1,id2,...}} → 'false' or 'true'  (inverse)
  html = html.replace(/\{\{#HIDDEN:([^}]+)\}\}/g, function (_, ids) {
    var list = ids.split(',').map(function (s) { return s.trim(); });
    return list.indexOf(pageId) !== -1 ? 'false' : 'true';
  });

  return html;
}

// ── Data token resolution ────────────────────────────────────────────────────
/**
 * Resolves {{DATA:field}} and {{DATA_RAW:field}} tokens from page.data.
 * DATA escapes HTML; DATA_RAW does not (for pre-rendered HTML sections).
 */
function resolveDataTokens(html, data) {
  if (!data) return html;

  // {{DATA:fieldName}} — escaped
  html = html.replace(/\{\{DATA:([^}]+)\}\}/g, function (_, field) {
    var val = data[field.trim()];
    return escapeHtml(val);
  });

  // {{DATA_RAW:fieldName}} — unescaped (pre-rendered HTML)
  html = html.replace(/\{\{DATA_RAW:([^}]+)\}\}/g, function (_, field) {
    var val = data[field.trim()];
    return val !== null && val !== undefined ? String(val) : '';
  });

  return html;
}

// ── Section renderers ────────────────────────────────────────────────────────
/**
 * Renders a named section using page.data.
 * Add new section renderers here as new template types are needed.
 */
function renderSection(name, data) {
  if (!data) return '<!-- SECTION:' + name + ' — no data -->';

  switch (name) {

    case 'hero-image':
      return renderHeroImage(data);

    case 'spec-tables':
      return renderSpecTables(data);

    case 'product-breadcrumb':
      return renderProductBreadcrumb(data);

    case 'gallery-thumbnails':
    case 'gallery':
      return renderGallery(data);

    case 'finishes':
      return renderFinishes(data);

    case 'hardware':
      return renderHardware(data);

    case 'certifications':
      return renderCertifications(data);

    case 'downloads':
      return renderDownloads(data);

    case 'cross-link':
      return renderCrossLink(data);

    case 'related-products':
      return renderRelatedProducts(data);

    case 'category-product-grid':
      return renderCategoryProductGrid(data);

    case 'type-material-grid':
      return renderTypeMaterialGrid(data);

    case 'products-overview-grid':
      return renderProductsOverviewGrid(data);

    default:
      return '<!-- SECTION:' + name + ' — unknown section -->';
  }
}

function renderHeroImage(data) {
  var img = data.heroImage;
  if (!img || !img.src) {
    return '<div class="product-hero__image-wrap product-hero__image-wrap--empty"></div>';
  }
  var styleProps = [];
  if (img.objectFit) styleProps.push('object-fit: ' + img.objectFit);
  if (img.objectPosition) styleProps.push('object-position: ' + img.objectPosition);
  var inlineStyle = styleProps.length ? ' style="' + escapeHtml(styleProps.join('; ')) + '"' : '';
  return [
    '<div class="product-hero__image-wrap">',
    '  <img src="' + escapeHtml(img.src) + '"',
    '       alt="' + escapeHtml(img.alt || data.publicName) + '"',
    '       class="product-hero__img"' + inlineStyle,
    '       loading="eager" decoding="async">',
    '</div>',
  ].join('\n');
}

function renderSpecTables(data) {
  var groups = data.specificationGroups;
  if (!groups || !groups.length) return '';

  var cols = groups.length === 1
    ? '<div class="spec-section__grid spec-section__grid--single">'
    : '<div class="spec-section__grid">';

  var html = cols;
  groups.forEach(function (group) {
    html += '<div>';
    html += '<h3 class="spec-section__label">' + escapeHtml(group.label) + '</h3>';
    html += '<div class="spec-table" role="table" aria-label="' + escapeHtml(group.label) + ' specifications">';
    group.rows.forEach(function (row) {
      var valueClass = row.status === 'placeholder'
        ? 'spec-table__value spec-table__value--emphasis'
        : 'spec-table__value';
      html += '<div class="spec-table__row" role="row">';
      html += '<div class="spec-table__label" role="cell">' + escapeHtml(row.label) + '</div>';
      html += '<div class="' + valueClass + '" role="cell">' + escapeHtml(row.value) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function renderProductBreadcrumb(data) {
  var typeSlug     = data.typeSlug;
  var typeLabel    = data.typeLabel === 'Window' ? 'Windows' : data.typeLabel === 'Door' ? 'Doors' : data.typeLabel + 's';
  var materialSlug = data.materialSlug;
  var materialLabel= data.materialLabel;
  var publicName   = data.publicName;

  return [
    '<nav class="breadcrumb-bar" aria-label="Breadcrumb">',
    '  <div class="container">',
    '    <ol class="breadcrumbs__list" itemscope itemtype="https://schema.org/BreadcrumbList">',
    '      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">',
    '        <a href="/products/" itemprop="item"><span itemprop="name">Products</span></a>',
    '        <meta itemprop="position" content="1" />',
    '      </li>',
    '      <li aria-hidden="true">›</li>',
    '      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">',
    '        <a href="/products/' + typeSlug + '/" itemprop="item"><span itemprop="name">' + escapeHtml(typeLabel) + '</span></a>',
    '        <meta itemprop="position" content="2" />',
    '      </li>',
    '      <li aria-hidden="true">›</li>',
    '      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">',
    '        <a href="/products/' + typeSlug + '/' + materialSlug + '/" itemprop="item"><span itemprop="name">' + escapeHtml(materialLabel) + '</span></a>',
    '        <meta itemprop="position" content="3" />',
    '      </li>',
    '      <li aria-hidden="true">›</li>',
    '      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">',
    '        <span itemprop="name">' + escapeHtml(publicName) + '</span>',
    '        <meta itemprop="position" content="4" />',
    '      </li>',
    '    </ol>',
    '  </div>',
    '</nav>',
  ].join('\n');
}

/**
 * renderGallery — renders gallery section only if data.galleryImages is non-empty.
 * Returns empty string if no gallery images are defined (section is omitted entirely).
 * Since images are draft/unverified, renders labeled placeholders.
 */
function renderGallery(data) {
  var images = data.galleryImages;
  if (!images || !images.length) return '';

  var html = '';
  html += '<section class="page-section page-section--canvas page-section--sm" aria-labelledby="gallery-heading">\n';
  html += '  <div class="container">\n';
  html += '    <h2 class="section-overline" id="gallery-heading">Gallery</h2>\n';
  html += '    <!--\n';
  html += '      GALLERY IMAGES\n';
  html += '      [IMAGE RIGHTS / PRODUCT PROVENANCE TO VERIFY]\n';
  html += '      These images are placeholders. Verify rights and provenance before launch.\n';
  html += '    -->\n';
  html += '    <ul class="gallery-section__thumbnails" aria-label="Product gallery">\n';
  images.forEach(function (img, i) {
    html += '      <li>\n';
    html += '        <button class="gallery-thumb" type="button"\n';
    html += '          aria-label="View gallery image ' + (i+1) + ', ' + escapeHtml(img.alt) + '"\n';
    html += '          data-img-src="' + escapeHtml(img.src) + '">\n';
    html += '          <img src="' + escapeHtml(img.src) + '" alt="' + escapeHtml(img.alt) + '"' + (function(i){ var s=[]; if(i.objectFit) s.push('object-fit:'+i.objectFit); if(i.objectPosition) s.push('object-position:'+i.objectPosition); return s.length?' style="'+escapeHtml(s.join(';'))+'"':''; }(img)) + ' loading="lazy" decoding="async">\n';
    html += '        </button>\n';
    html += '      </li>\n';
  });
  html += '    </ul>\n';
  html += '  </div>\n';
  html += '</section>\n';
  return html;
}

/**
 * renderFinishes — renders finishes section only if data.finishes is non-null.
 * Currently returns empty string for all products (finishes: null).
 */
function renderFinishes(data) {
  if (!data.finishes) return '';
  var f = data.finishes;
  var html = '';
  html += '<section class="page-section page-section--canvas" aria-labelledby="finishes-heading">\n';
  html += '  <div class="container">\n';
  html += '    <p class="section-overline">Options</p>\n';
  html += '    <h2 class="section-title" id="finishes-heading">Glass &amp; Color Options</h2>\n';
  html += '    <div class="finishes-grid">\n';

  if (f.glass) {
    var g = f.glass;
    html += '      <div class="finishes-panel">\n';
    html += '        <h3 class="finishes-panel__title">Glass Options</h3>\n';
    if (g.types && g.types.length) {
      html += '        <ul class="glass-type-list">\n';
      g.types.forEach(function(t) {
        html += '          <li class="glass-type-tag">' + escapeHtml(t) + '</li>\n';
      });
      html += '        </ul>\n';
    }
    if (g.glazing && g.glazing.length) {
      html += '        <div class="finishes-panel__row"><span class="finishes-panel__label">Glazing:</span> ' + escapeHtml(g.glazing.join(' / ')) + '</div>\n';
    }
    if (g.singleThickness) {
      html += '        <div class="finishes-panel__row"><span class="finishes-panel__label">Single pane:</span> ' + escapeHtml(g.singleThickness) + '</div>\n';
    }
    if (g.doubleUnit) {
      html += '        <div class="finishes-panel__row"><span class="finishes-panel__label">Double unit:</span> ' + escapeHtml(g.doubleUnit) + '</div>\n';
    }
    if (g.note) {
      html += '        <p class="finish-section__note">' + escapeHtml(g.note) + '</p>\n';
    }
    html += '      </div>\n';
  }

  if (f.color) {
    html += '      <div class="finishes-panel">\n';
    html += '        <h3 class="finishes-panel__title">Color</h3>\n';
    html += '        <div class="finishes-panel__color-label">' + escapeHtml(f.color.label) + '</div>\n';
    if (f.color.note) {
      html += '        <p class="finish-section__note">' + escapeHtml(f.color.note) + '</p>\n';
    }
    html += '      </div>\n';
  }

  html += '    </div>\n';
  html += '  </div>\n';
  html += '</section>\n';
  return html;
}

/**
 * renderHardware — renders hardware section only if data.hardware is non-null.
 * Currently returns empty string for all products (hardware: null).
 */
function renderHardware(data) {
  if (!data.hardware) return '';
  // Placeholder for future implementation when hardware data is confirmed
  return '';
}

/**
 * renderCertifications — renders certifications section only if non-null.
 * Currently returns empty string for all products (certifications: null).
 */
function renderCertifications(data) {
  if (!data.certifications || !data.certifications.length) return '';
  var certs = data.certifications;
  var html = '';
  html += '<section class="page-section" aria-labelledby="cert-heading">\n';
  html += '  <div class="container">\n';
  html += '    <p class="section-overline">Quality Standards</p>\n';
  html += '    <h2 class="section-title" id="cert-heading">Certifications<sup><a href="#cert-note" class="cert-footnote-ref" aria-label="Certifications disclaimer">*</a></sup></h2>\n';
  html += '    <div class="cert-section__grid">\n';
  certs.forEach(function(cert) {
    html += '      <div class="cert-link">\n';
    html += '        <div class="cert-link__icon">\n';
    html += '          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">\n';
    html += '            <circle cx="18" cy="18" r="17" stroke="currentColor" stroke-width="2"/>\n';
    html += '            <path d="M12 18l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n';
    html += '          </svg>\n';
    html += '        </div>\n';
    html += '        <div class="cert-link__info">\n';
    html += '          <div class="cert-link__name">' + escapeHtml(cert.name) + '</div>\n';
    html += '          <div class="cert-link__meta">' + escapeHtml(cert.body) + '</div>\n';
    html += '          <div class="cert-link__meta">' + escapeHtml(cert.scope) + '</div>\n';
    html += '        </div>\n';
    html += '      </div>\n';
  });
  html += '    </div>\n';
  html += '    <p class="spec-table__note mt-6" id="cert-note">* Not all certifications apply to all series. Contact us for more details.</p>\n';
  html += '  </div>\n';
  html += '</section>\n';
  return html;
}

/**
 * renderDownloads — renders downloads section only if data.documents is non-empty.
 * Currently returns empty string for all products (documents: []).
 */
function renderDownloads(data) {
  var docs = data.documents;
  if (!docs || !docs.length) return '';
  // Placeholder for future implementation when documents are confirmed available
  return '';
}

function renderRelatedProducts(data) {
  if (!data.related || !data.related.length) return '';
  var html = '<div class="related-grid">\n';
  data.related.forEach(function (rel) {
    var relImg = rel.heroImage;
    html += '  <a href="/products/' + rel.typeSlug + '/' + rel.materialSlug + '/' + rel.slug + '/" class="product-card">\n';
    html += '    <div class="product-card__image">\n';
    if (relImg && relImg.src) {
      html += '      <img src="' + escapeHtml(relImg.src) + '" alt="' + escapeHtml(relImg.alt || rel.publicName) + '" loading="lazy" decoding="async">\n';
    } else {
      html += '      <div class="product-card__img-placeholder"></div>\n';
    }
    html += '    </div>\n';
    html += '    <div class="product-card__body">\n';
    html += '      <div class="product-card__tag">' + escapeHtml(rel.materialLabel) + ' ' + escapeHtml(rel.typeLabel) + '</div>\n';
    html += '      <div class="product-card__name">' + escapeHtml(rel.publicName) + '</div>\n';
    html += '      <div class="product-card__type">' + escapeHtml(rel.systemType) + '</div>\n';
    html += '    </div>\n';
    html += '  </a>\n';
  });
  html += '</div>';
  return html;
}

function renderCrossLink(data) {
  if (!data.crossLink) return '';
  var cl = data.crossLink;
  return [
    '<section class="cross-link-banner" aria-label="Matching product">',
    '  <div class="container">',
    '    <div class="cross-link-banner__inner">',
    '      <p class="cross-link-banner__text">' + escapeHtml(cl.text) + '</p>',
    '      <a href="' + escapeHtml(cl.href) + '" class="btn btn-outline btn-sm">',
    '        ' + escapeHtml(cl.label) + ' →',
    '      </a>',
    '    </div>',
    '  </div>',
    '</section>',
  ].join('\n');
}

function getManufacturerLabel(slug) {
  if (/^ldw/.test(slug)) return 'Ledow';
  if (/^prm/.test(slug)) return 'Prima';
  if (/^wj/.test(slug))  return 'Wanjia';
  return '';
}

function renderTypeChips(systemType) {
  if (!systemType) return '';
  return systemType.split(' / ').map(function (t) {
    return '<span class="type-chip">' + escapeHtml(t.trim()) + '</span>';
  }).join('');
}

function renderCategoryProductGrid(data) {
  if (!data.products || !data.products.length) {
    return '<p class="text-muted">No products in this category yet. Contact us for availability.</p>';
  }
  var html = '<div class="product-series-grid">\n';
  data.products.forEach(function (product) {
    var url = '/products/' + product.typeSlug + '/' + product.materialSlug + '/' + product.slug + '/';
    var cardImg = product.heroImage;
    html += '  <a href="' + url + '" class="product-series-card">\n';
    html += '    <div class="product-series-card__image">\n';
    if (cardImg && cardImg.src) {
      var cardImgStyle = '';
      if (cardImg.objectFit || cardImg.objectPosition) {
        var sp = [];
        if (cardImg.objectFit)     sp.push('object-fit:'     + cardImg.objectFit);
        if (cardImg.objectPosition) sp.push('object-position:' + cardImg.objectPosition);
        cardImgStyle = ' style="' + escapeHtml(sp.join(';')) + '"';
      }
      html += '      <img src="' + escapeHtml(cardImg.src) + '" alt="' + escapeHtml(cardImg.alt || product.publicName) + '"' + cardImgStyle + ' loading="lazy" decoding="async">\n';
    } else {
      html += '      <div class="product-card__img-placeholder"></div>\n';
    }
    html += '    </div>\n';
    html += '    <div class="product-series-card__body">\n';
    // Supplier name (product-series-card__mfr) intentionally suppressed — not for public display.
    html += '      <div class="product-series-card__name">' + escapeHtml(product.publicName) + '</div>\n';
    if (/^ldw/.test(product.slug) || product.slug === 'prm-k80a') {
      html += '      <span class="badge badge-success product-series-card__cert-badge">NFRC</span>\n';
    }
    if (product.matchingLabel) {
      html += '      <span class="badge badge-navy product-series-card__match-badge">' + escapeHtml(product.matchingLabel) + '</span>\n';
    }
    html += '      <div class="product-series-card__chips">' + renderTypeChips(product.systemType) + '</div>\n';
    html += '      <div class="product-series-card__link">View details →</div>\n';
    html += '    </div>\n';
    html += '  </a>\n';
  });
  html += '</div>';
  return html;
}

function renderTypeMaterialGrid(data) {
  if (!data.materials || !data.materials.length) return '';
  var typeSlug = data.typeSlug;
  var html = '<div class="material-grid">\n';
  data.materials.forEach(function (material) {
    var url = '/products/' + typeSlug + '/' + material.materialSlug + '/';
    html += '  <a href="' + url + '" class="material-card">\n';
    html += '    <div class="material-card__label">' + escapeHtml(material.materialLabel) + '</div>\n';
    html += '    <div class="material-card__link">Browse ' + escapeHtml(material.materialLabel) + ' →</div>\n';
    html += '  </a>\n';
  });
  html += '</div>';
  return html;
}

/**
 * renderProductsOverviewGrid — renders category navigation cards for the
 * top-level Products overview page.
 *
 * Iterates over all types and their materials from data.categories so that
 * adding a new type (e.g., Flooring) to categories.js causes its cards to
 * appear automatically without any template edits.
 */
function renderProductsOverviewGrid(data) {
  var cats = data.categories;
  if (!cats || !cats.length) {
    return '<p class="text-muted">No product categories available. Contact us for availability.</p>';
  }
  var html = '<div class="category-grid">\n';
  cats.forEach(function (cat) {
    cat.materials.forEach(function (material) {
      var url   = '/products/' + cat.typeSlug + '/' + material.materialSlug + '/';
      var count = material.productSlugs.length;
      var name  = material.materialLabel + ' ' + cat.typeLabel;
      html += '  <a href="' + url + '" class="category-card">\n';
      html += '    <span class="category-card__type">' + escapeHtml(cat.typeLabel) + '</span>\n';
      html += '    <strong class="category-card__name">' + escapeHtml(name) + '</strong>\n';
      html += '    <span class="category-card__cta">Browse &#8594;</span>\n';
      html += '  </a>\n';
    });
  });
  html += '</div>';
  return html;
}

// ── SECTION: marker injection ────────────────────────────────────────────────
function resolveSections(html, data) {
  return html.replace(/[ \t]*<!--\s*SECTION:(\S+)\s*-->[ \t]*/g, function (_, name) {
    return renderSection(name, data);
  });
}

// ── BUILD: marker injection ─────────────────────────────────────────────────
function injectTemplates(html, pageId) {
  return html.replace(/[ \t]*<!--\s*BUILD:(\S+)\s*-->[ \t]*/g, function (_, name) {
    var tpl = templates[name];
    if (!tpl) {
      throw new Error('Unknown BUILD marker: BUILD:' + name +
        '. Valid names: ' + Object.keys(templates).join(', '));
    }
    return resolveNavTokens(tpl, pageId);
  });
}

// ── SEO meta injection ──────────────────────────────────────────────────────
/**
 * Derives the canonical URL from the page's output file path.
 * 'index.html'              → 'https://fenovera.com/'
 * 'products/index.html'     → 'https://fenovera.com/products/'
 * 'about/index.html'        → 'https://fenovera.com/about/'
 */
function canonicalUrl(outFile) {
  var clean = outFile.replace(/\\/g, '/');
  if (clean === 'index.html') return SITE_BASE_URL + '/';
  var dir = clean.replace(/\/index\.html$/, '');
  return SITE_BASE_URL + '/' + dir + '/';
}

/**
 * Builds the SEO meta block injected before </head> on every page.
 * Uses root-relative href for favicon (gets rewritten by resolveRootRelativePaths).
 * Uses absolute URLs for canonical + OG (never rewritten).
 */
function buildSeoBlock(page) {
  var canonical = canonicalUrl(page.out);
  var title     = escapeHtml(page.title || '');
  var desc      = escapeHtml(page.description || '');
  return [
    '',
    '  <!-- ── SEO: canonical + Open Graph + favicon ──────────────────── -->',
    '  <link rel="canonical" href="' + canonical + '">',
    '  <link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Fenovera">',
    '  <meta property="og:title" content="' + title + '">',
    '  <meta property="og:description" content="' + desc + '">',
    '  <meta property="og:url" content="' + canonical + '">',
    '  <meta property="og:image" content="' + OG_DEFAULT_IMAGE + '">',
    '  <!-- /SEO ──────────────────────────────────────────────────────── -->',
  ].join('\n');
}

/**
 * Injects the SEO block immediately before </head>.
 * Must run BEFORE resolveRootRelativePaths so /favicon.svg gets rewritten.
 */
function injectSeoMeta(html, page) {
  var block = buildSeoBlock(page);
  // Insert before </head> (handles optional whitespace / case)
  return html.replace(/<\/head>/i, block + '\n</head>');
}

// ── Base-path resolver ──────────────────────────────────────────────────────
/**
 * Computes the relative path from a generated page back to the project root.
 * Used to convert root-relative hrefs/srcs into file://-safe relative paths.
 *
 * Examples:
 *   'index.html'                                    → '.'
 *   'products/index.html'                           → '..'
 *   'products/windows/aluminum/76-series/index.html'→ '../../../..'
 */
function computeBasePath(outFile) {
  var parts = outFile.replace(/\\/g, '/').split('/');
  var depth = parts.length - 1; // directory depth (exclude filename)
  if (depth === 0) return '.';
  var dots = [];
  for (var i = 0; i < depth; i++) dots.push('..');
  return dots.join('/');
}

/**
 * Rewrites all root-relative hrefs and srcs to relative paths.
 * Converts e.g. href="/design-system/tokens.css" → href="../../design-system/tokens.css"
 * Leaves protocol-relative (//cdn.x) and absolute (https://) URLs untouched.
 */
function resolveRootRelativePaths(html, basePath) {
  // Match href="/ or src="/ but NOT href="// (protocol-relative) or href="https://
  html = html.replace(/\b(href|src|action)="(?!\/\/|[a-z][a-z0-9+\-.]*:\/\/)\/([^"]*)/g,
    function (_, attr, rest) {
      return attr + '="' + basePath + '/' + rest;
    }
  );
  return html;
}

// ── Validate page entry ─────────────────────────────────────────────────────
function validatePage(page) {
  var errors = [];
  if (!page.src)         errors.push('missing src');
  if (!page.out)         errors.push('missing out');
  if (!page.pageId)      errors.push('missing pageId');
  if (!page.title)       errors.push('missing title');
  if (!page.description) errors.push('missing description');
  if (errors.length) {
    throw new Error('Invalid page entry: ' + errors.join(', ') + '\n' + JSON.stringify(page, null, 2));
  }
}

// ── Process a single page ───────────────────────────────────────────────────
function buildPage(page) {
  validatePage(page);

  var srcPath = path.join(PROJECT_ROOT, page.src);
  var outPath = path.join(PROJECT_ROOT, page.out);

  if (!fs.existsSync(srcPath)) {
    throw new Error('Source file not found: ' + page.src);
  }

  var src = fs.readFileSync(srcPath, 'utf8');

  // 1. Inject shared templates at BUILD: markers
  var output = injectTemplates(src, page.pageId);

  // 2. Resolve DATA tokens from page.data object
  if (page.data) {
    output = resolveDataTokens(output, page.data);
  }

  // 3. Resolve SECTION: markers (data-driven HTML fragments)
  if (page.data) {
    output = resolveSections(output, page.data);
  }

  // 4. Verify all BUILD: markers were resolved
  var remaining = output.match(/<!--\s*BUILD:[^-]/);
  if (remaining) {
    throw new Error('Unresolved BUILD marker in output for ' + page.out + ': ' + remaining[0]);
  }

  // 5. Verify no nav tokens remain unresolved
  var unresolvedToken = output.match(/\{\{#[A-Z]+:[^}]+\}\}/);
  if (unresolvedToken) {
    throw new Error('Unresolved token in output for ' + page.out + ': ' + unresolvedToken[0]);
  }

  // 6. Warn on any remaining DATA tokens (non-fatal)
  var unresolvedData = output.match(/\{\{DATA[^}]*:[^}]+\}\}/);
  if (unresolvedData) {
    console.warn('  WARN   unresolved DATA token in ' + page.out + ': ' + unresolvedData[0]);
  }

  // 7. Inject SEO meta (canonical, OG, favicon) — must run before path rewriting
  output = injectSeoMeta(output, page);

  // 8. Release-mode post-processing
  if (RELEASE) {
    var isPublished = !page.data || page.data.publicationStatus !== 'draft';
    if (isPublished) {
      // Strip development notice banner
      output = output.replace(/[ \t]*<div class="dev-notice"[^>]*>[\s\S]*?<\/div>[ \t]*\n?/m, '');
      // Make page indexable
      output = output.replace(/content="noindex,\s*nofollow"/g, 'content="index, follow"');
    }
  }

  // 9. Rewrite root-relative paths → file://-safe relative paths
  var basePath = computeBasePath(page.out);
  output = resolveRootRelativePaths(output, basePath);

  if (DRY_RUN) {
    console.log('── DRY RUN: ' + page.out + ' ─'.repeat(40));
    console.log(output);
    return;
  }

  // Ensure output directory exists
  var outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outPath, output, 'utf8');
  console.log('  wrote  ' + page.out);
}

// ── Main ────────────────────────────────────────────────────────────────────
console.log('Fenovera build-site.js v2.0 — generating ' + pages.length + ' page(s)' +
  (DRY_RUN ? ' [DRY RUN]' : ''));

var errors = 0;
pages.forEach(function (page) {
  try {
    buildPage(page);
  } catch (err) {
    console.error('  ERROR  ' + (page.out || page.src || '(unknown)') + ': ' + err.message);
    errors++;
  }
});

if (errors > 0) {
  console.error('\nBuild failed — ' + errors + ' error(s).');
  process.exit(1);
}

// ── Generate robots.txt ─────────────────────────────────────────────────────
var robotsTxt = RELEASE
  ? [
    '# Fenovera — robots.txt',
    '',
    'User-agent: *',
    'Disallow:',
    '',
    'Sitemap: ' + SITE_BASE_URL + '/sitemap.xml',
  ].join('\n')
  : [
    '# Fenovera — robots.txt',
    '# Site is in pre-launch state. All pages carry noindex, nofollow.',
    '# Owner action: run "node scripts/build-site.js --release" to build for production.',
    '',
    'User-agent: *',
    'Disallow: /',
    '',
    'Sitemap: ' + SITE_BASE_URL + '/sitemap.xml',
  ].join('\n');

if (!DRY_RUN) {
  fs.writeFileSync(path.join(PROJECT_ROOT, 'robots.txt'), robotsTxt, 'utf8');
  console.log('  wrote  robots.txt');
}

// ── Generate sitemap.xml ────────────────────────────────────────────────────
// In release mode: exclude draft product pages. In dev mode: include all.
// <lastmod> is intentionally omitted — all pages currently share the build date,
// which is misleading. Omitting is more honest than a uniform fabricated date.
var sitemapPages = RELEASE
  ? pages.filter(function (p) { return !(p.data && p.data.publicationStatus === 'draft'); })
  : pages;
var sitemapUrls = sitemapPages.map(function (page) {
  return '  <url>\n    <loc>' + canonicalUrl(page.out) + '</loc>\n  </url>';
});
var sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
].concat(sitemapUrls).concat(['</urlset>', '']).join('\n');

if (!DRY_RUN) {
  fs.writeFileSync(path.join(PROJECT_ROOT, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('  wrote  sitemap.xml');
}

if (!DRY_RUN) console.log('\nBuild complete.');
