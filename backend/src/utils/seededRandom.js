/**
 * Deterministic PRNG utilities.
 *
 * The hazard generator (Phase 3) needs "random but stable" data: the same
 * region should always produce the same hazard layout, otherwise a
 * validated route would silently become invalid on server restart.
 * Seeding a PRNG from the region id solves this without persisting every
 * coordinate by hand for 18 regions.
 */

/** Converts an arbitrary string into a 32-bit integer seed. */
function seedFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

/** mulberry32 — small, fast, good-enough PRNG for procedural mock data. */
function mulberry32(seed) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Convenience: build a ready-to-use rng() function directly from a string seed. */
function createRng(seedString) {
  return mulberry32(seedFromString(seedString));
}

/** Random integer in [min, max]. */
function randInt(rng, min, max) {
  return Math.floor(min + rng() * (max - min + 1));
}

/** Random float in [min, max]. */
function randFloat(rng, min, max) {
  return min + rng() * (max - min);
}

module.exports = { seedFromString, mulberry32, createRng, randInt, randFloat };
