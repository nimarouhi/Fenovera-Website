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
    seoTitle:         'Windows | Fenovera',
    description:      'Aluminum, uPVC, and PVC window systems from Fenovera.',
    materials: [
      {
        id:               'windows-aluminum',
        materialSlug:     'aluminum',
        materialLabel:    'Aluminum',
        pageId:           'windows-aluminum',
        displayOrder:     1,
        publicationStatus:'draft',
        seoTitle:         'Aluminum Windows | Fenovera',
        description:      'Aluminum window series. Casement, tilt-turn, awning, sliding, hung, and louver configurations.',
        productSlugs: [
          'ldw-x76', 'ldw-s8520',
          'prm-50a', 'prm-55a', 'prm-65a', 'prm-73a', 'prm-81a', 'prm-83a',
          'prm-80a', 'prm-100a', 'prm-108a', 'prm-110a',
          'wj-80', 'wj-91', 'wj-110',
        ],
      },
      {
        id:               'windows-upvc',
        materialSlug:     'upvc',
        materialLabel:    'uPVC',
        pageId:           'windows-upvc',
        displayOrder:     2,
        publicationStatus:'draft',
        seoTitle:         'uPVC Windows | Fenovera',
        description:      'uPVC window series. Tilt-turn, casement, awning, sliding, and hung configurations.',
        productSlugs: [
          'ld-p80', 'ld-p85',
          'prm-58u', 'prm-60u', 'prm-70u', 'prm-72u',
          'prm-80u', 'prm-82u', 'prm-88u', 'wj-72',
        ],
      },
      {
        id:               'windows-pvc',
        materialSlug:     'pvc',
        materialLabel:    'PVC',
        pageId:           'windows-pvc',
        displayOrder:     3,
        publicationStatus:'draft',
        seoTitle:         'PVC Windows | Fenovera',
        description:      'PVC window series. Casement configurations.',
        productSlugs:     ['wj-60'],
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
    description:      'Aluminum, uPVC, and PVC door systems from Fenovera.',
    materials: [
      {
        id:               'doors-aluminum',
        materialSlug:     'aluminum',
        materialLabel:    'Aluminum',
        pageId:           'doors-aluminum',
        displayOrder:     1,
        publicationStatus:'draft',
        seoTitle:         'Aluminum Doors | Fenovera',
        description:      'Aluminum door series. Casement, French, sliding, bi-fold, slim frame, and lift and slide configurations.',
        productSlugs: [
          'ldw-x76', 'ldw-g152', 'ldw-g88',
          'prm-16a', 'prm-50a', 'prm-55a', 'prm-65a',
          'prm-70a', 'prm-75a', 'prm-80a', 'prm-81a', 'prm-108a',
          'prm-121a', 'prm-125a', 'prm-132a', 'prm-150a', 'prm-202a',
          'wj-91', 'wj-132', 'wj-88', 'wj-170',
        ],
      },
      {
        id:               'doors-upvc',
        materialSlug:     'upvc',
        materialLabel:    'uPVC',
        pageId:           'doors-upvc',
        displayOrder:     2,
        publicationStatus:'draft',
        seoTitle:         'uPVC Doors | Fenovera',
        description:      'uPVC door series. Casement and sliding configurations.',
        productSlugs: ['ld-p108', 'prm-60u', 'prm-66u', 'prm-88u', 'prm-114u', 'wj-195'],
      },
      {
        id:               'doors-pvc',
        materialSlug:     'pvc',
        materialLabel:    'PVC',
        pageId:           'doors-pvc',
        displayOrder:     3,
        publicationStatus:'draft',
        seoTitle:         'PVC Doors | Fenovera',
        description:      'PVC door series. Casement configurations.',
        productSlugs:     ['wj-60'],
      },
    ],
  },
];
