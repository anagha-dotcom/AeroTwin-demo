const { METERS_PER_UNIT } = require('../constants/canvasConfig');

/**
 * AeroTwin's geometry engine. Everything here is pure math over plain
 * {x, y} objects — no Express, no I/O — so it can be unit tested in
 * isolation and reused unchanged if the transport layer ever changes.
 */

/**
 * Closest point on segment AB to point P, and the distance to it.
 * Standard vector projection clamped to the segment (t in [0, 1]).
 */
function distancePointToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  let t = lengthSquared === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t));
  const x = ax + t * dx;
  const y = ay + t * dy;
  return { dist: Math.hypot(px - x, py - y), x, y };
}

/** Total route length in canvas units (sum of segment lengths). */
function routeLengthUnits(waypoints) {
  let total = 0;
  for (let i = 1; i < waypoints.length; i += 1) {
    total += Math.hypot(waypoints[i].x - waypoints[i - 1].x, waypoints[i].y - waypoints[i - 1].y);
  }
  return total;
}

/** For one hazard, finds the closest the route ever comes to its center across all segments. */
function closestApproachToHazard(waypoints, hazard) {
  let best = null;
  for (let i = 1; i < waypoints.length; i += 1) {
    const a = waypoints[i - 1];
    const b = waypoints[i];
    const r = distancePointToSegment(hazard.cx, hazard.cy, a.x, a.y, b.x, b.y);
    if (!best || r.dist < best.dist) best = r;
  }
  return best; // { dist, x, y } in canvas units, distance to hazard CENTER
}

function buildSuggestion(hazard, clearanceMeters) {
  const need = Math.max(40, Math.round(-clearanceMeters + 40));
  return `Reroute waypoints to keep at least 40m clearance from "${hazard.name}", or insert an intermediate waypoint roughly ${need}m around its perimeter.`;
}

/**
 * The core validation: checks a route against every hazard and returns a
 * complete safety report. `hazards` should already be filtered to
 * `isHazard === true` entries — informational POIs never participate.
 */
function computeRouteValidation(waypoints, hazards) {
  const breaches = [];
  let closest = { hazard: null, clearanceUnits: Infinity };

  hazards.forEach((hazard) => {
    const approach = closestApproachToHazard(waypoints, hazard);
    const clearanceUnits = approach.dist - hazard.r;

    if (clearanceUnits <= 0) {
      breaches.push({ hazard, point: { x: approach.x, y: approach.y }, clearanceUnits });
    }
    if (clearanceUnits < closest.clearanceUnits) {
      closest = { hazard, clearanceUnits };
    }
  });

  const distanceUnits = routeLengthUnits(waypoints);
  const distanceKm = (distanceUnits * METERS_PER_UNIT) / 1000;
  const batteryPercent = Math.min(100, Math.round(distanceKm * 3.4 + waypoints.length * 0.6));
  const durationMinutes = Math.max(1, Math.round(distanceKm / 0.6)); // ~36 km/h cruise speed

  const safe = breaches.length === 0;
  let safetyScore;
  if (safe) {
    const nearMissUnits = closest.hazard ? Math.max(0, 40 - closest.clearanceUnits * METERS_PER_UNIT) : 0;
    safetyScore = Math.max(70, 100 - Math.round(nearMissUnits / 2));
  } else {
    safetyScore = Math.max(4, Math.min(55, 60 - breaches.length * 20));
  }

  const primaryBreach = breaches[0] || null;

  return {
    safe,
    safetyScore,
    hazardsCrossed: breaches.length,
    breachedHazards: breaches.map((b) => ({
      id: b.hazard.id,
      name: b.hazard.name,
      type: b.hazard.type,
      collisionPoint: b.point,
    })),
    closestHazard: closest.hazard
      ? {
          id: closest.hazard.id,
          name: closest.hazard.name,
          type: closest.hazard.type,
          clearanceMeters: Math.round(closest.clearanceUnits * METERS_PER_UNIT),
        }
      : null,
    collisionPoint: primaryBreach ? primaryBreach.point : null,
    distanceUnits,
    distanceKm: Number(distanceKm.toFixed(2)),
    batteryPercent,
    durationMinutes,
    suggestion: primaryBreach
      ? buildSuggestion(primaryBreach.hazard, primaryBreach.clearanceUnits * METERS_PER_UNIT)
      : null,
  };
}

module.exports = {
  distancePointToSegment,
  routeLengthUnits,
  closestApproachToHazard,
  computeRouteValidation,
};
