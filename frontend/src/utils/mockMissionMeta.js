import { createRng, pick } from './seededRandom';

const DRONE_NAMES = ['Falcon-7', 'Kestrel-3', 'Osprey-X', 'Harrier-2', 'Merlin-9'];
const OPERATOR_NAMES = ['A. Krishnan', 'R. Sharma', 'S. Nair', 'P. Bose', 'M. Iyer', 'D. Rathore'];
const WEATHER_SET = [
  { condition: 'Overcast, light rain', wind: '18 km/h', temp: '26°C' },
  { condition: 'Partly cloudy', wind: '11 km/h', temp: '31°C' },
  { condition: 'Heavy rain warning', wind: '27 km/h', temp: '24°C' },
  { condition: 'Clear skies', wind: '8 km/h', temp: '33°C' },
  { condition: 'Humid, gusty winds', wind: '22 km/h', temp: '29°C' },
];

/**
 * Builds the "current session" mission overview shown in the left panel:
 * name/id/drone/operator + mock weather. Deterministic per region so
 * switching back to a scenario within the same session shows the same
 * crew/weather, but re-opening the workspace later can vary (seeded on
 * region id + a per-load salt).
 */
export function buildMissionMeta(region, salt = 0) {
  const rng = createRng(`${region.id}-${salt}`);
  const weather = pick(rng, WEATHER_SET);
  return {
    name: `${region.name} Response`,
    id: `MSN-${region.id.toUpperCase().slice(0, 3)}-${1000 + Math.floor(rng() * 8999)}`,
    drone: pick(rng, DRONE_NAMES),
    operator: pick(rng, OPERATOR_NAMES),
    weather,
  };
}
