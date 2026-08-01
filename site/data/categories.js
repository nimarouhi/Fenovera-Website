/**
 * Fenovera — Product Category Tree
 * Foundation revision 2026-07-27
 *
 * Defines the type → material → product URL taxonomy.
 * URL format: /products/{type}/{material}/{slug}/
 *
 * Fields added in Foundation revision:
 *   id              — stable identifier for the type or material node
 *   displayOrder    — sort order for rendering
 *   publicationStatus — 'draft' | 'published' | 'archived'
 *   productSlugs    — renamed from seriesSlugs; works for any product type
 *                     (not all products have a series number)
 *
 * Source controls (brief §4):
 * - Do not show supplier brand names without owner approval.
 * - Do not invent series numbers; use descriptive names until approved.
 * - "Bay Area" location is confirmed; service-area scope is not.
 */
'use strict';

module.exports = [
  {
    id:               'windows',
    typeSlug:         'windows',
    typeLabel:        'Windows',
    pageId:           'windows',
    displayOrder:     1,
    publicationStatus:'draft',
    seoTitle:         'Windows | Fenovera',
    description:      'Aluminum and uPVC window systems from Fenovera.',
    materials: [
      {
        id:               'windows-aluminum',
        materialSlug:     'aluminum',
        materialLabel:    'Aluminum',
        pageId:           'windows-aluminum',
        displayOrder:     1,
        publicationStatus:'draft',
        seoTitle:         'Aluminum Windows | Fenovera',
        description:      'Aluminum casement, slimline, awning, sliding, and tilt-turn windows.',
        productSlugs:     ['76-series', '85-series', 'awning', 'sliding', 'tilt-turn'],
      },
      {
        id:               'windows-upvc',
        materialSlug:     'upvc',
        materialLabel:    'uPVC',
        pageId:           'windows-upvc',
        displayOrder:     2,
        publicationStatus:'draft',
        seoTitle:         'uPVC Windows | Fenovera',
        description:      'uPVC hung, tilt-turn, casement, awning, and sliding windows.',
        productSlugs:     ['hung-window', 'tilt-turn-window', 'casement-window', 'awning-window', 'sliding-window'],
      },
    ],
  },
  {
    id:               'doors',
    typeSlug:         'doors',
    typeLabel:        'Doors',
    pageId:           'doors',
    displayOrder:     2,
    publicationStatus:'draft',
    seoTitle:         'Doors | Fenovera',
    description:      'Aluminum and uPVC door systems from Fenovera.',
    materials: [
      {
        id:               'doors-aluminum',
        materialSlug:     'aluminum',
        materialLabel:    'Aluminum',
        pageId:           'doors-aluminum',
        displayOrder:     1,
        publicationStatus:'draft',
        seoTitle:         'Aluminum Doors | Fenovera',
        description:      'Aluminum lift and slide door systems.',
        productSlugs:     ['152-series'],
      },
      {
        id:               'doors-upvc',
        materialSlug:     'upvc',
        materialLabel:    'uPVC',
        pageId:           'doors-upvc',
        displayOrder:     2,
        publicationStatus:'draft',
        seoTitle:         'uPVC Doors | Fenovera',
        description:      'uPVC french and sliding door systems.',
        productSlugs:     ['french-door', 'sliding-door'],
      },
    ],
  },
];
