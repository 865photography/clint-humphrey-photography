/* Product catalog — Clint Humphrey Photography
 *
 * CHECKOUT IS LIVE (2026-10-04):
 * Every option below has a live Stripe Payment Link in its `stripe` field.
 * Links collect shipping address + name, with automatic tax enabled.
 * After payment, buyers land on thank-you.html.
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
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/8x2bJ02Co0VH8KZ4bw3Ru00' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/dRm5kCccYdItbXb5fA3Ru01' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/dRmcN4fpa6g1bXb5fA3Ru02' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/bJe8wOgtefQB9P35fA3Ru03' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/14A28q4Kw9sd1ix4bw3Ru04' },
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
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/dRm4gy1ykbAl2mB5fA3Ru05' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/9B6fZg4Kw33Pd1fazU3Ru06' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/28EeVc3Gsawh1ixbDY3Ru07' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/aFa5kCb8UcEp4uJgYi3Ru08' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/6oU28qgte1ZLd1fbDY3Ru09' },
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
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/cNidR8fpaeMx4uJ4bw3Ru0a' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/3cIeVc5OA9sd1ixgYi3Ru0b' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/4gMcN40ugbAlbXb5fA3Ru0c' },
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
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/6oUeVc3Gs9sd1ix0Zk3Ru0d' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/6oUcN4b8U5bX1ixdM63Ru0e' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/9B6dR84KwawhaT7bDY3Ru0f' },
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
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/3cI3cub8Uawh1ixbDY3Ru0g' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/4gM14mb8UbAlgdrazU3Ru0h' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/14A7sK4Kw9sd4uJ4bw3Ru0i' },
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
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/7sY7sK6SEeMx8KZ9vQ3Ru0j' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/eVqfZggte6g1d1fdM63Ru0k' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/9B68wOb8U9sdbXbdM63Ru0l' },
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
      { label: '8 × 10 in',   detail: 'Fine-art poster, unframed', price: 500,  stripe: 'https://buy.stripe.com/28E28qb8U33P1ix8rM3Ru0m' },
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/28E9ASgte0VH1ixgYi3Ru0n' },
      { label: '11 × 14 in',  detail: 'Framed print, black wood',  price: 1100, stripe: 'https://buy.stripe.com/4gM14ma4QgUF0et37s3Ru0o' },
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
      { label: '8 × 10 in',   detail: 'Fine-art poster, unframed', price: 500,  stripe: 'https://buy.stripe.com/14AbJ090M1ZLd1f5fA3Ru0p' },
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/7sYdR80ugeMxgdr0Zk3Ru0q' },
      { label: '11 × 14 in',  detail: 'Framed print, black wood',  price: 1100, stripe: 'https://buy.stripe.com/9B66oG90Mawh4uJ23o3Ru0r' },
    ],
  },
};

/* Lowest "from" price per product, for cards and the gallery grid. */
function fromPrice(p) {
  return Math.min(...p.options.map(o => o.price));
}
