/* Collection taxonomy — Clint Humphrey Photography.
 * Top-level groups with sub-collections. */

const COLLECTION_GROUPS = [
  {
    name: 'Birds of Prey',
    collections: ['osprey', 'great-blue-heron'],
  },
  {
    name: 'Water Birds',
    collections: ['ducks', 'water-birds'],
  },
  {
    name: 'Game Birds',
    collections: ['game-birds'],
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
  'osprey', 'great-blue-heron', 'ducks', 'water-birds', 'game-birds', 'mammals', 'americana',
];

/* Display names. */
const COLLECTIONS = {
  'osprey': 'Osprey',
  'great-blue-heron': 'Great Blue Heron',
  'ducks': 'Ducks',
  'water-birds': 'Water Birds',
  'game-birds': 'Wild Turkey',
  'mammals': 'Mammals',
  'americana': 'Americana',
};

const COLLECTION_META = {
  'osprey': {
    image: 'images/the-dive.jpg',
    blurb: 'The fish hawk — dives, strikes, and catches.',
  },
  'great-blue-heron': {
    image: 'images/blue-hunter.jpg',
    blurb: 'A great blue heron lifts off with its catch.',
  },
  'ducks': {
    image: 'images/new/touchdown.jpg',
    blurb: 'Mallards on the water — landings, shake-offs, and close detail.',
  },
  'water-birds': {
    image: 'images/new/the-crane.jpg',
    blurb: 'Cranes and shorebirds.',
  },
  'game-birds': {
    image: 'images/new/wild-turkey.jpg',
    blurb: 'Upland game birds in close portrait.',
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


const GROUP_META = {
  'Birds of Prey': {
    image: 'images/the-dive.jpg',
    blurb: 'Ospreys and herons — hunters on the wing.',
  },
  'Water Birds': {
    image: 'images/new/touchdown.jpg',
    blurb: 'Ducks, cranes, and shorebirds.',
  },
  'Game Birds': {
    image: 'images/new/wild-turkey.jpg',
    blurb: 'Upland game birds.',
  },
  'Mammals': {
    image: 'images/new/amber-eye.jpg',
    blurb: 'A tiger emerges from the dark.',
  },
  'Americana': {
    image: 'images/new/the-getaway.jpg',
    blurb: 'Roadside America.',
  },
};

function groupSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function countInGroup(name) {
  const g = COLLECTION_GROUPS.find(x => x.name === name);
  if (!g) return 0;
  return g.collections.reduce((sum, slug) => sum + countInCollection(slug), 0);
}

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
