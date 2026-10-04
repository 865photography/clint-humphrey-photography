/* Product catalog — Clint Humphrey Photography
 *
 * HOW TO GO LIVE:
 * 1. In Stripe, create a Payment Link for every size option below (Products
 *    -> Payment Links). Each link is a fixed-price checkout page.
 * 2. Paste each link into the `stripe` field of its option, replacing '#'.
 * 3. When full-resolution originals arrive, swap the `image` files in
 *    /images with web-optimized exports (1600px long edge, ~80% JPEG).
 * 4. Finalize prices against the Gelato product catalog so every option
 *    keeps a healthy margin over Gelato's base cost + shipping.
 *
 * Prices below are DRAFT retail prices, benchmarked against wildlife-print
 * market rates (Fine Art America / Etsy). Confirm margins before launch.
 */

const PRODUCTS = {
  'twin-ospreys': {
    title: 'Twin Ospreys',
    tagline: 'Two ospreys riding golden evening light, wings locked in formation.',
    story: 'Shot on a Nikon Z 8 with a 600mm lens on an April evening, this frame caught two ospreys flying in near-perfect formation over open water. The low sun gilds every feather. Printed from the full 45-megapixel file, it holds rich detail even at the largest sizes.',
    image: 'images/twin-ospreys.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 45,  stripe: '#' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 65,  stripe: '#' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 95,  stripe: '#' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 149, stripe: '#' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 189, stripe: '#' },
    ],
  },
  'the-dive': {
    title: 'The Dive',
    tagline: 'An osprey folds its wings and commits — talons first.',
    story: 'The instant before impact: an osprey collapses its six-foot wingspan into a dart and drops toward the water at full commitment. This tight crop is offered in smaller sizes, where its drama stays razor sharp.',
    image: 'images/the-dive.jpg',
    badge: 'Small format',
    maxNote: 'Offered up to 11×14 to keep every feather crisp.',
    options: [
      { label: '8 × 10 in',   detail: 'Fine-art poster, unframed', price: 35, stripe: '#' },
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 49, stripe: '#' },
      { label: '11 × 14 in',  detail: 'Framed print, black wood',  price: 119, stripe: '#' },
    ],
  },
  'talons-out': {
    title: 'Talons Out',
    tagline: 'Feet first at 1/3200th of a second — the hunter, frozen.',
    story: 'Ospreys hunt feet-first, and this frame freezes the moment the talons spread for the strike. Warm sidelight carves every feather. A 7-megapixel crop, offered up to 16×20 where it stays beautifully sharp.',
    image: 'images/talons-out.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 49,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 69,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 159, stripe: '#' },
    ],
  },
};

/* Lowest "from" price per product, for cards and the gallery grid. */
function fromPrice(p) {
  return Math.min(...p.options.map(o => o.price));
}
