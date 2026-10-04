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
  'the-tussle': {
    title: 'The Tussle',
    tagline: 'Two ospreys collide midair over a dropped fish.',
    story: 'A midair dispute over breakfast — one osprey rakes at the other’s catch as the fish tumbles free between them. The raw politics of the fishing grounds, frozen in a single frame.',
    image: 'images/the-tussle.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/cNifZgccYfQBd1f37s3Ru0s' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/dRmaEW6SE33P6CRfUe3Ru0t' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/14AeVcfpa0VH6CReQa3Ru0u' },
    ],
  },
  'blue-hunter': {
    title: 'Blue Hunter',
    tagline: 'A great blue heron lifts off with its catch.',
    story: 'Not an osprey — a great blue heron, all six feet of wingspan, hauling itself off dark water with a fish in its bill. A different hunter, the same ruthless competence.',
    image: 'images/blue-hunter.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/aFa8wO7WI1ZLaT75fA3Ru0v' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/5kQ6oGdh2cEp1ix6jE3Ru0w' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/cNi3cu1ykbAl3qF7nI3Ru0x' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/eVq3cuccY0VH4uJ23o3Ru0y' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/14A7sK2Co5bXbXbfUe3Ru0z' },
    ],
  },
  'the-prize': {
    title: 'The Prize',
    tagline: 'An osprey ferries a striped bass home.',
    story: 'Breakfast secured: an osprey carries a striped bass across open water, wings locked, eyes forward. The whole economy of the shoreline in one frame.',
    image: 'images/the-prize.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/fZuaEWa4Q7k5aT7gYi3Ru0A' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/bJeaEWa4Q33P4uJ7nI3Ru0B' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/aFaeVca4QdIt4uJ8rM3Ru0C' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/bJe00i5OA0VH1ixdM63Ru0D' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/cNieVcccY33P4uJazU3Ru0E' },
    ],
  },
  'the-crossing': {
    title: 'The Crossing',
    tagline: 'An osprey crosses a darkening sky, fish in talons.',
    story: 'Shot against a brooding sky, this frame turns a working fishing trip into something mythic — the hunter as silhouette, the catch gleaming below.',
    image: 'images/the-crossing.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/fZu9AS90M6g15yN8rM3Ru0F' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/eVq5kC0ug0VH9P3azU3Ru0G' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/7sYfZg1yk7k52mBgYi3Ru0H' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/6oU4gy2CogUF9P38rM3Ru0I' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/9B6bJ06SE47T0et6jE3Ru0J' },
    ],
  },
  'talons-first': {
    title: 'Talons First',
    tagline: 'Committed to the dive — no hesitation, no brakes.',
    story: 'Half a heartbeat before impact: an osprey folds into the strike, talons spread, eyes locked on the water below. The most committed hundred feet in nature.',
    image: 'images/talons-first.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/6oUeVcb8U9sd5yN6jE3Ru0K' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/9B6fZg2Co9sdf9n8rM3Ru0L' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/28E5kC3Gs0VHgdr23o3Ru0M' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/28EdR8gte33P7GV7nI3Ru0N' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/fZu4gyccYfQB9P3eQa3Ru0O' },
    ],
  },
  'liftoff': {
    title: 'Liftoff',
    tagline: 'Water still falling, the hunt already won.',
    story: 'The moment after the catch — an osprey hauls itself off sparkling water, fish locked in both talons, droplets scattering. Victory, dripping.',
    image: 'images/liftoff.jpg',
    badge: 'Large format ready',
    maxNote: 'Available up to 24×36 — printed from the full-resolution original.',
    options: [
      { label: '12 × 18 in',  detail: 'Fine-art poster, unframed', price: 750,  stripe: 'https://buy.stripe.com/aFa4gy0ugdIt6CReQa3Ru0P' },
      { label: '18 × 24 in',  detail: 'Fine-art poster, unframed', price: 950,  stripe: 'https://buy.stripe.com/cNidR8a4QcEp7GVdM63Ru0Q' },
      { label: '24 × 36 in',  detail: 'Fine-art poster, unframed', price: 1200, stripe: 'https://buy.stripe.com/00w6oGa4Q47T5yNazU3Ru0R' },
      { label: '18 × 24 in',  detail: 'Framed print, black wood',  price: 1600, stripe: 'https://buy.stripe.com/eVq9AS7WI8o9aT7dM63Ru0S' },
      { label: '24 × 36 in',  detail: 'Gallery canvas',            price: 1800, stripe: 'https://buy.stripe.com/eVqfZg2Co0VH5yN6jE3Ru0T' },
    ],
  },
  'water-off': {
    title: 'Water Off',
    tagline: 'A hard shake, a burst of spray, and back to business.',
    story: 'Fresh out of the water with dinner secured, this osprey shakes off the dive in a burst of spray against black water. Pure attitude.',
    image: 'images/water-off.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/9B66oGccY8o94uJ9vQ3Ru0U' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/7sY9AS1yk5bXaT75fA3Ru0V' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/dRmfZgel6bAl0et7nI3Ru0W' },
    ],
  },
  'hard-bank': {
    title: 'Hard Bank',
    tagline: 'A full-commitment turn at fishing speed.',
    story: 'Wings twisted nearly vertical, an osprey carves a hard bank over the water, fish already secured. Aerial work most pilots would envy.',
    image: 'images/hard-bank.jpg',
    badge: 'Up to 16 × 20',
    maxNote: 'Available up to 16×20.',
    options: [
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/14AbJ0gtecEp5yN6jE3Ru0X' },
      { label: '16 × 20 in',  detail: 'Fine-art poster, unframed', price: 850,  stripe: 'https://buy.stripe.com/28E00i3Gs47T6CR0Zk3Ru0Y' },
      { label: '16 × 20 in',  detail: 'Framed print, black wood',  price: 1400, stripe: 'https://buy.stripe.com/14A7sK3GsbAl3qFbDY3Ru0Z' },
    ],
  },
  'rising': {
    title: 'Rising',
    tagline: 'Climbing out with the morning’s catch.',
    story: 'Wings beating skyward, an osprey climbs away from the water with its fish. A portrait-orientation frame that suits a narrow wall.',
    image: 'images/rising.jpg',
    badge: 'Small format',
    maxNote: 'Offered up to 11×14 to keep every feather crisp.',
    options: [
      { label: '8 × 10 in',   detail: 'Fine-art poster, unframed', price: 500,  stripe: 'https://buy.stripe.com/4gM00iccY5bXbXb4bw3Ru10' },
      { label: '11 × 14 in',  detail: 'Fine-art poster, unframed', price: 650,  stripe: 'https://buy.stripe.com/dRm8wOfpaeMxaT79vQ3Ru11' },
      { label: '11 × 14 in',  detail: 'Framed print, black wood',  price: 1100, stripe: 'https://buy.stripe.com/6oUbJ00ug7k59P35fA3Ru12' },
    ],
  },
};

/* Lowest "from" price per product, for cards and the gallery grid. */
function fromPrice(p) {
  return Math.min(...p.options.map(o => o.price));
}
