/* Product catalog — Clint Humphrey Photography
 *
 * HOW TO GO LIVE:
 * 1. In Stripe, create a Payment Link for every size option below (Products
 *    -> Payment Links). Each link is a fixed-price checkout page.
 * 2. Paste each link into the `stripe` field of its option, replacing '#'.
 * 3. Payment links are ON HOLD until Clint finishes curating the lineup.
 *    Every `stripe` field is '#' for now; the buy button shows a
 *    "checkout being connected" notice until real links are pasted.
 *
 * Prices are the APPROVED fine-art ladder (floor $500), set 2026-10-04.
 * Every option keeps a 90%+ margin over Gelato's base cost + shipping.
 */

const PRODUCTS = {
  'sunset-silhouette': {
    title: 'Sunset Silhouette',
    tagline: 'An osprey crosses a burning sky — the day\'s last hunter.',
    story: 'Shot against a blazing evening sky, this frame reduces the osprey to pure geometry: wings, intent, and light. Printed from the 32-megapixel original, it holds together at the largest sizes on the wall.',
    image: 'images/sunset-silhouette.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: '#' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: '#' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: '#' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: '#' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: '#' },
    ],
  },
  'twin-ospreys': {
    title: 'Twin Ospreys',
    tagline: 'Two ospreys riding evening light, wings locked in formation.',
    story: 'Two ospreys flying in near-perfect formation over open water, every feather gilded by low sun. Offered in the largest sizes, printed from the high-resolution original.',
    image: 'images/twin-ospreys.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: '#' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: '#' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: '#' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: '#' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: '#' },
    ],
  },
  'impact': {
    title: 'Impact',
    tagline: 'The strike, frozen at the instant of contact.',
    story: 'Wings thrown skyward, water exploding outward — the exact instant the talons find the surface. The climax of the hunt, caught at 1/3200th of a second and offered up to 16×20.',
    image: 'images/impact.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: '#' },
    ],
  },
  'talons-out': {
    title: 'Talons Out',
    tagline: 'Feet first at 1/3200th of a second — the hunter, frozen.',
    story: 'Ospreys hunt feet-first, and this frame freezes the moment the talons spread for the strike. Warm sidelight carves every feather. Offered up to 16×20 where it stays beautifully sharp.',
    image: 'images/talons-out.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: '#' },
    ],
  },
  'tandem': {
    title: 'Tandem',
    tagline: 'Two ospreys bank in close formation — precision flying.',
    story: 'Aerial coordination most pilots would envy: two ospreys carve the same turn, wingtips nearly touching. Sharp feather detail throughout, offered up to 16×20.',
    image: 'images/tandem.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: '#' },
    ],
  },
  'the-catch': {
    title: 'The Catch',
    tagline: 'The moment after the strike — dinner, secured.',
    story: 'Climbing out of the water with its catch locked in both talons, droplets still falling. The reward for the hunt, offered up to 16×20.',
    image: 'images/the-catch.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: '#' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: '#' },
    ],
  },
  'golden-hour': {
    title: 'Golden Hour',
    tagline: 'Low sun gilds every feather of a banking osprey.',
    story: 'Evening light does the composition here — warm gold on the upper wing, cool shadow below, the bird banking into the last light of the day. A tight crop, offered in smaller sizes where it stays razor sharp.',
    image: 'images/golden-hour.jpg',
    badge: 'Small format',
    maxNote: 'Offered up to 11×14 to keep every feather crisp.',
    options: [
      { label: '8 × 10 in',   detail: 'Fine-art poster, unframed', price: 500,  stripe: '#' },
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: '#' },
      { label: '11 × 14 in',  detail: 'Framed print, black wood',  price: 1100, stripe: '#' },
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
      { label: '8 × 10 in',   detail: 'Fine-art poster, unframed', price: 500,  stripe: '#' },
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: '#' },
      { label: '11 × 14 in',  detail: 'Framed print, black wood',  price: 1100, stripe: '#' },
    ],
  },
};

/* Lowest "from" price per product, for cards and the gallery grid. */
function fromPrice(p) {
  return Math.min(...p.options.map(o => o.price));
}
