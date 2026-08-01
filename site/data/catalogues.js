/**
 * Fenovera — Supplier and Product Catalogues
 * Foundation revision 2026-07-27
 *
 * Catalogues are optional shared resources associated with one or many products.
 * A product does not require a catalogue to be published.
 * One catalogue may cover a single product, a material group, or a type range.
 *
 * Association model:
 *   scope: 'product'    → appliesTo: ['slug-a', 'slug-b']
 *   scope: 'material'   → appliesTo: ['windows/aluminum', 'doors/aluminum']
 *   scope: 'type'       → appliesTo: ['windows', 'doors']
 *
 * publicationStatus: 'draft' — catalogue records exist but are not public.
 *
 * Source controls:
 * - Supplier catalogues are product references only; they are not proof of
 *   US-market certification, NFRC, ENERGY STAR, AAMA, CEC, or Title 24 compliance.
 * - Do not publish supplier brand names or catalogue filenames without owner approval.
 * - File presence does not prove distribution rights.
 */
'use strict';

module.exports = [
  /*
   * No catalogues are currently approved for public display.
   *
   * When a catalogue is ready to add, use this shape:
   *
   * {
   *   id:               'fenovera-aluminum-catalogue-2024',
   *   title:            'Fenovera Aluminum Systems — Product Guide',
   *   subtitle:         null,
   *   publicationStatus:'draft',         // draft | published | archived
   *   fileAvailable:    false,           // true only when confirmed file exists + rights cleared
   *   fileName:         null,            // public filename (not supplier internal name)
   *   fileSize:         null,            // e.g. '2.4 MB'
   *   fileType:         'pdf',
   *   scope:            'material',
   *   appliesTo:        ['windows/aluminum', 'doors/aluminum'],
   *   coverImage:       null,
   *   sourceDocument:   null,            // internal reference only; never render publicly
   *   rightsVerified:   false,
   * },
   */
];
