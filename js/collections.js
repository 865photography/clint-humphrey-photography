/* Collection metadata — Clint Humphrey Photography.
 * COLLECTIONS (slug -> display name) is defined in js/products-new.js.
 * This file adds cover images and blurbs for the 5 collections. */

const COLLECTION_META = {
  "wildlife": {
    image: "images/sunset-silhouette.jpg",
    blurb: "Birds of prey at the decisive moment — the dive, the strike, the catch."
  },
  "americana": {
    image: "images/new/the-getaway.jpg",
    blurb: "Roadside America — chrome, neon, and weathered paint."
  },
  "golden-hour": {
    image: "images/new/last-cast.jpg",
    blurb: "The last light of the day, held on water and glass."
  },
  "on-the-wing": {
    image: "images/new/wings-up.jpg",
    blurb: "Birds in flight — ospreys, cranes, and cardinals on the move."
  },
  "wild-portraits": {
    image: "images/new/amber-eye.jpg",
    blurb: "Close encounters — a single amber eye in the dark."
  }
};

/* The 5 collections in display order. */
const COLLECTION_ORDER = [
  "wildlife", "rides",
  "americana", "golden-hour", "on-the-wing", "wild-portraits"
];

/* Merged catalog: existing 16 (collection 'wildlife') + 14 new. */
const ALL_PRODUCTS = (() => {
  const out = {};
  for (const [id, p] of Object.entries(PRODUCTS)) {
    out[id] = Object.assign({}, p, { collection: "wildlife" });
  }
  for (const [id, p] of Object.entries(NEW_PRODUCTS)) {
    out[id] = p;
  }
  return out;
})();

function collectionName(slug) {
  if (slug === "wildlife") return "Wildlife";
  return (typeof COLLECTIONS !== "undefined" && COLLECTIONS[slug]) || slug;
}

function countInCollection(slug) {
  return Object.values(ALL_PRODUCTS).filter(p => p.collection === slug).length;
}
