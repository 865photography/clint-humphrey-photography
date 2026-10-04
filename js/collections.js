/* Collection taxonomy — Clint Humphrey Photography.
 * Top-level groups with sub-collections for Birds. */

const COLLECTION_GROUPS = [
  {
    name: 'Birds',
    collections: ['birds-on-the-wing', 'birds-portraits'],
  },
  {
    name: 'Mammals',
    collections: ['mammals'],
  },
  {
    name: 'Americana',
    collections: ['americana'],
  },
];

/* Flat list of all collections in display order. */
const COLLECTION_ORDER = [
  'birds-on-the-wing', 'birds-portraits', 'mammals', 'americana',
];

/* Display names. */
const COLLECTIONS = {
  'birds-on-the-wing': 'On the Wing',
  'birds-portraits': 'Wild Portraits',
  'mammals': 'Mammals',
  'americana': 'Americana',
};

const COLLECTION_META = {
  'birds-on-the-wing': {
    image: 'images/new/wings-up.jpg',
    blurb: 'Birds in flight — ospreys at the dive, the strike, the catch.',
  },
  'birds-portraits': {
    image: 'images/new/the-crane.jpg',
    blurb: 'Close encounters — cranes, killdeer, and iridescent detail.',
  },
  'mammals': {
    image: 'images/new/amber-eye.jpg',
    blurb: 'A tiger emerges from the dark.',
  },
  'americana': {
    image: 'images/new/the-getaway.jpg',
    blurb: 'Roadside America — chrome, paint, and working water.',
  },
};

/* Merged catalog: 16 originals + 13 new. Each product carries its own collection. */
const ALL_PRODUCTS = (() => {
  const out = {};
  for (const [id, p] of Object.entries(PRODUCTS)) out[id] = p;
  for (const [id, p] of Object.entries(NEW_PRODUCTS)) out[id] = p;
  return out;
})();

function collectionName(slug) {
  return COLLECTIONS[slug] || slug;
}

function countInCollection(slug) {
  return Object.values(ALL_PRODUCTS).filter(p => p.collection === slug).length;
}

function groupForCollection(slug) {
  for (const g of COLLECTION_GROUPS) {
    if (g.collections.includes(slug)) return g.name;
  }
  return null;
}
