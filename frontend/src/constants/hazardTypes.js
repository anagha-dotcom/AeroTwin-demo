/**
 * Mirrors backend/src/constants/hazardTypes.js. Kept as a local constant
 * (rather than always fetching GET /api/hazards/types) so the legend and
 * canvas can render instantly; the shapes/colors are presentation
 * concerns that belong with the frontend anyway.
 */
export const HAZARD_TYPES = {
  flood: { label: 'Flood Zone', color: '#2FB6FF', hazard: true },
  transmission: { label: 'Transmission Tower', color: '#FF4F8B', hazard: true },
  mobile_tower: { label: 'Mobile Tower', color: '#FF7BA6', hazard: true },
  substation: { label: 'Substation', color: '#FF4F8B', hazard: true },
  building: { label: 'Tall Building', color: '#FFB454', hazard: true },
  nofly: { label: 'No-Fly Zone', color: '#FF3B5C', hazard: true },
  bridge: { label: 'Bridge', color: '#8B96A8', hazard: false },
  relief_camp: { label: 'Relief Camp', color: '#3FE8C5', hazard: false },
  hospital: { label: 'Hospital', color: '#7C8CFF', hazard: false },
  safe_zone: { label: 'Safe Landing Zone', color: '#3FE8C5', hazard: false },
};

/** Single-character marker glyph drawn inside non-hazard POI circles. */
export const POI_SYMBOL = {
  bridge: '=',
  relief_camp: '⛺',
  hospital: 'H',
  safe_zone: '✓',
};
