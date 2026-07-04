const { readCollection, appendToCollection } = require('../utils/jsonDb');
const { generateId } = require('../utils/idGenerator');

const COLLECTION = 'missions';

const DRONE_NAMES = ['Falcon-7', 'Kestrel-3', 'Osprey-X', 'Harrier-2', 'Merlin-9'];
const OPERATOR_NAMES = ['A. Krishnan', 'R. Sharma', 'S. Nair', 'P. Bose', 'M. Iyer', 'D. Rathore'];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Returns all missions in the mock database, most recent first.
 * Optionally filtered to a single region (used by the frontend's
 * "mission history for this scenario" view).
 */
function listMissions({ regionId } = {}) {
  const missions = readCollection(COLLECTION, []);
  const filtered = regionId ? missions.filter((m) => m.regionId === regionId) : missions;
  return [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getMissionById(id) {
  return readCollection(COLLECTION, []).find((m) => m.id === id) || null;
}

/**
 * Persists one validation result as a mission history record. Called by
 * routeController right after POST /validate-route computes a result —
 * this is what makes the "Mission Log" panel and GET /api/missions
 * reflect real activity instead of just the two seeded demo entries.
 */
function recordMission({ region, waypoints, validation, meta = {} }) {
  const record = {
    id: generateId('MSN'),
    name: meta.name || `${region.name} Response`,
    regionId: region.id,
    regionName: region.name,
    operator: meta.operator || pick(OPERATOR_NAMES),
    drone: meta.drone || pick(DRONE_NAMES),
    status: validation.safe ? 'safe' : 'unsafe',
    safetyScore: validation.safetyScore,
    hazardsCrossed: validation.hazardsCrossed,
    distanceKm: validation.distanceKm,
    batteryPercent: validation.batteryPercent,
    durationMinutes: validation.durationMinutes,
    waypointCount: waypoints.length,
    createdAt: new Date().toISOString(),
  };
  return appendToCollection(COLLECTION, record, []);
}

module.exports = { listMissions, getMissionById, recordMission };
