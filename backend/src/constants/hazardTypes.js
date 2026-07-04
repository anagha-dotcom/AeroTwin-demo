/**
 * Every hazard/POI type AeroTwin knows about. `hazard: true` types are the
 * ones the Phase 4 geometry engine checks a route against; `hazard: false`
 * types are map features / points of interest (bridges, relief camps,
 * hospitals, safe landing zones) that are informational only.
 */
const HAZARD_TYPES = {
  flood: { label: 'Flood Zone', color: '#2FB6FF', hazard: true, category: 'environmental' },
  transmission: { label: 'Transmission Tower', color: '#FF4F8B', hazard: true, category: 'power_infrastructure' },
  mobile_tower: { label: 'Mobile Tower', color: '#FF7BA6', hazard: true, category: 'communication_infrastructure' },
  substation: { label: 'Substation', color: '#FF4F8B', hazard: true, category: 'power_infrastructure' },
  building: { label: 'Tall Building', color: '#FFB454', hazard: true, category: 'structure' },
  nofly: { label: 'No-Fly Zone', color: '#FF3B5C', hazard: true, category: 'airspace' },
  bridge: { label: 'Bridge', color: '#8B96A8', hazard: false, category: 'infrastructure' },
  relief_camp: { label: 'Relief Camp', color: '#3FE8C5', hazard: false, category: 'response' },
  hospital: { label: 'Hospital', color: '#7C8CFF', hazard: false, category: 'response' },
  safe_zone: { label: 'Safe Landing Zone', color: '#3FE8C5', hazard: false, category: 'response' },
};

/** Name fragments the generator picks from to build realistic-sounding, clearly-fictional hazard names. */
const NAME_BANK = {
  flood: ['Flood Inundation Pocket', 'Waterlogged Sector', 'Overflow Basin', 'Submerged Corridor'],
  transmission: ['400kV Transmission Line', '220kV Transmission Corridor', 'High-Voltage Tower Cluster'],
  mobile_tower: ['Cellular Relay Tower', 'Telecom Mast', 'Signal Tower'],
  substation: ['Grid Substation', 'Power Distribution Yard'],
  building: ['High-Rise Cluster', 'Commercial Tower Block', 'Residential High-Rise'],
  nofly: ['Temporary No-Fly Corridor', 'Restricted Airspace Pocket', 'Emergency Ops No-Fly Zone'],
  bridge: ['Road Bridge', 'Rail Bridge', 'Pedestrian Crossing'],
  relief_camp: ['Relief Camp', 'Evacuation Shelter', 'Temporary Relief Center'],
  hospital: ['District Hospital', 'Community Health Center', 'Field Medical Post'],
  safe_zone: ['Cleared Landing Pad', 'Safe Drone Zone', 'Verified Landing Site'],
};

/**
 * How many of each type to generate per region, and the radius range
 * (in canvas units) each one occupies. Tuned so a region ends up with a
 * believable, not-overcrowded mix of roughly 16 features.
 */
const GENERATION_PLAN = [
  ['flood', 2, { minR: 55, maxR: 95 }],
  ['transmission', 2, { minR: 26, maxR: 36 }],
  ['mobile_tower', 2, { minR: 20, maxR: 28 }],
  ['substation', 1, { minR: 24, maxR: 30 }],
  ['building', 2, { minR: 22, maxR: 30 }],
  ['nofly', 1, { minR: 60, maxR: 85 }],
  ['bridge', 1, { minR: 14, maxR: 14 }],
  ['relief_camp', 2, { minR: 16, maxR: 16 }],
  ['hospital', 1, { minR: 16, maxR: 16 }],
  ['safe_zone', 2, { minR: 18, maxR: 18 }],
];

module.exports = { HAZARD_TYPES, NAME_BANK, GENERATION_PLAN };
