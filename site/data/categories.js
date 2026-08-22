/**
 * Fenovera — Product Category Tree
 * Foundation revision 2026-08-05 (series-based restructure)
 *
 * Defines the type → material → product URL taxonomy.
 * URL format: /products/{type}/{material}/{slug}/
 *
 * Naming conventions:
 *   LDW prefix — Ledow series (LD-X76, LD-S8520, LD-152)
 *   PRM prefix — Prima series, suffix 'a' = aluminum, 'u' = uPVC
 *   WJ prefix  — Wanjia series
 *   Slugs are lowercase hyphenated versions of the series name
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
    seoTitle:         'Aluminum, uPVC & PVC Windows | Fenovera',
    description:      'Aluminum, uPVC, and PVC window systems for residential and commercial projects in the Bay Area.',
    materials: [
      {
        id:               'windows-aluminum',
        materialSlug:     'aluminum',
        materialLabel:    'Aluminum',
        pageId:           'windows-aluminum',
        displayOrder:     1,
        publicationStatus:'draft',
        seoTitle:         'Aluminum Windows in the Bay Area | Fenovera',
        description:      'Aluminum window series for the Bay Area. Casement, tilt-turn, awning, sliding, hung, and louver configurations with thermal-break options and custom sizing.',
        productSlugs: [
          'ldw-x76', 'ldw-s8520',
          'prm-50a', 'prm-55a', 'prm-65a', 'prm-73a', 'prm-80a', 'prm-81a', 'prm-83a',
          'prm-100a', 'prm-108a', 'prm-110a',
          'wj-80', 'wj-91', 'wj-110',
          'lu-70s', 'lu-80s', 'lu-95s', 'lu-110s',
        ],
      },
      {
        id:               'windows-upvc',
        materialSlug:     'upvc',
        materialLabel:    'uPVC',
        pageId:           'windows-upvc',
        displayOrder:     2,
        publicationStatus:'draft',
        seoTitle:         'uPVC Windows in the Bay Area | Fenovera',
        description:      'uPVC window series for the Bay Area. Tilt-turn, casement, awning, sliding, and hung configurations with multi-chamber insulated profiles.',
        productSlugs: [
          'ld-p80', 'ld-p85',
          'prm-58u', 'prm-60u', 'prm-70u', 'prm-72u',
          'prm-80u', 'prm-82u', 'prm-88u', 'wj-60', 'wj-72',
        ],
      },
      {
        id:               'windows-wood-clad',
        materialSlug:     'wood-clad',
        materialLabel:    'Aluminum-Wood Clad',
        pageId:           'windows-wood-clad',
        displayOrder:     3,
        publicationStatus:'draft',
        seoTitle:         'Aluminum-Wood Clad Windows in the Bay Area | Fenovera',
        description:      'Aluminum-wood clad window series for the Bay Area. Natural wood interior paired with aluminum exterior cladding — tilt-turn and casement configurations with NFRC-certified energy performance.',
        productSlugs:     ['lu-e80s', 'lu-iu-cc'],
      },
      {
        id:               'windows-pvc',
        materialSlug:     'pvc',
        materialLabel:    'PVC',
        pageId:           'windows-pvc',
        displayOrder:     4,
        publicationStatus:'draft',
        seoTitle:         'PVC Windows in the Bay Area | Fenovera',
        description:      'PVC window options are available. Contact us for recommendations based on your plan and project.',
        productSlugs:     [],
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
    seoTitle:         'Aluminum, uPVC & PVC Doors | Fenovera',
    description:      'Aluminum, uPVC, and PVC door systems for residential and commercial projects in the Bay Area.',
    materials: [
      {
        id:               'doors-aluminum',
        materialSlug:     'aluminum',
        materialLabel:    'Aluminum',
        pageId:           'doors-aluminum',
        displayOrder:     1,
        publicationStatus:'draft',
        seoTitle:         'Aluminum Doors in the Bay Area | Fenovera',
        description:      'Aluminum door series for the Bay Area. Casement, French, sliding, bi-fold, slim frame, and lift-and-slide configurations with custom sizing.',
        productSlugs: [
          'ldw-x76', 'ldw-g152', 'ldw-g88',
          'prm-16a', 'prm-50a', 'prm-55a', 'prm-65a',
          'prm-70a', 'prm-75a', 'prm-80a', 'prm-81a', 'prm-108a',
          'prm-121a', 'prm-125a', 'prm-132a', 'prm-150a', 'prm-202a',
          'wj-88', 'wj-91', 'wj-132', 'wj-170',
          'lu-ng-ls', 'lu-ng-bf',
        ],
      },
      {
        id:               'doors-upvc',
        materialSlug:     'upvc',
        materialLabel:    'uPVC',
        pageId:           'doors-upvc',
        displayOrder:     2,
        publicationStatus:'draft',
        seoTitle:         'uPVC Doors in the Bay Area | Fenovera',
        description:      'uPVC door series for the Bay Area. Casement and sliding configurations with multi-chamber insulated profiles.',
        productSlugs: ['ld-p108', 'prm-60u', 'prm-66u', 'prm-88u', 'prm-114u', 'wj-60', 'wj-195'],
      },
      {
        id:               'doors-wood-clad',
        materialSlug:     'wood-clad',
        materialLabel:    'Aluminum-Wood Clad',
        pageId:           'doors-wood-clad',
        displayOrder:     3,
        publicationStatus:'draft',
        seoTitle:         'Aluminum-Wood Clad Doors in the Bay Area | Fenovera',
        description:      'Aluminum-wood clad door series for the Bay Area. Natural wood interior paired with aluminum exterior cladding — lift-and-slide configuration with NFRC-certified energy performance.',
        productSlugs:     ['lu-e80s-ls'],
      },
      {
        id:               'doors-pvc',
        materialSlug:     'pvc',
        materialLabel:    'PVC',
        pageId:           'doors-pvc',
        displayOrder:     4,
        publicationStatus:'draft',
        seoTitle:         'PVC Doors in the Bay Area | Fenovera',
        description:      'PVC door options are available. Contact us for recommendations based on your plan and project.',
        productSlugs:     [],
      },
    ],
  },
];
