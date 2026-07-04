const { readCollection, writeCollection } = require('../utils/jsonDb');
const { createRng, randFloat } = require('../utils/seededRandom');
const { HAZARD_TYPES, NAME_BANK, GENERATION_PLAN } = require('../constants/hazardTypes');
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../constants/canvasConfig');
const regionService = require('./regionService');

const COLLECTION = 'hazards';

/**
 * Builds one region's hazard layout from scratch using a PRNG seeded on
 * the region id. Same region id -> same layout, every time, without
 * hand-authoring coordinates for 18 regions.
 */
function buildHazardSet(region) {
  const rng = createRng(region.id);
  const hazards = [];
  let uid = 0;

  GENERATION_PLAN.forEach(([type, count, radiusRange]) => {
    for (let i = 0; i < count; i += 1) {
      const cx = Math.round(randFloat(rng, 90, CANVAS_WIDTH - 90));
      const cy = Math.round(randFloat(rng, 90, CANVAS_HEIGHT - 90));
      const r = Math.round(randFloat(rng, radiusRange.minR, radiusRange.maxR));
      const names = NAME_BANK[type];
      const name = `${names[Math.floor(rng() * names.length)]} ${String.fromCharCode(65 + (uid % 6))}`;
      hazards.push({
        id: `hz-${region.id}-${uid}`,
        regionId: region.id,
        type,
        name,
        cx,
        cy,
        r,
        isHazard: HAZARD_TYPES[type].hazard,
      });
      uid += 1;
    }
  });

  // A simple wavy polyline standing in for the region's main river.
  const river = [];
  for (let x = -40; x <= CANVAS_WIDTH + 40; x += 120) {
    const wobble = Math.sin(x / 220 + (region.id.length % 10)) * 90;
    river.push([x, Math.round(380 + wobble + (rng() - 0.5) * 40)]);
  }

  // Two simple crossing roads for visual context (not hazards).
  const roads = [
    [
      [-40, Math.round(150 + rng() * 80)],
      [CANVAS_WIDTH + 40, Math.round(180 + rng() * 80)],
    ],
    [
      [Math.round(300 + rng() * 100), -40],
      [Math.round(420 + rng() * 100), CANVAS_HEIGHT + 40],
    ],
  ];

  return { hazards, river, roads };
}

/**
 * Returns the hazard layout for a region, generating and caching it on
 * first request. Caching in the mock "database" means a restart doesn't
 * change anything (the generator is deterministic anyway) but it also
 * means a future admin tool could hand-edit hazards.json without the
 * generator clobbering it.
 */
function getHazardsForRegion(regionId) {
  const region = regionService.getRegionById(regionId); // throws if unknown
  const store = readCollection(COLLECTION, {});

  if (!store[regionId]) {
    store[regionId] = {
      ...buildHazardSet(region),
      generatedAt: new Date().toISOString(),
    };
    writeCollection(COLLECTION, store);
  }

  return {
    region,
    canvas: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
    ...store[regionId],
  };
}

/** Regenerates a fresh layout for a region, bypassing the cache (used by an eventual "shuffle scenario" control). */
function regenerateHazardsForRegion(regionId) {
  const region = regionService.getRegionById(regionId);
  const store = readCollection(COLLECTION, {});
  store[regionId] = { ...buildHazardSet(region), generatedAt: new Date().toISOString() };
  writeCollection(COLLECTION, store);
  return { region, canvas: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }, ...store[regionId] };
}

module.exports = { getHazardsForRegion, regenerateHazardsForRegion };
