/**
 * Deterministic PRNG, mirroring backend/src/utils/seededRandom.js.
 * Used for presentation-only mock data (weather, drone/operator name)
 * that's scoped to the frontend and doesn't need a backend endpoint —
 * seeding on the region id keeps it stable per scenario within a session.
 */
function seedFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

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

export function createRng(seedString) {
  return mulberry32(seedFromString(seedString));
}

export function pick(rng, list) {
  return list[Math.floor(rng() * list.length)];
}
