const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../constants/canvasConfig');

const MARGIN = 60;
const MAX_ATTEMPTS_PER_POINT = 20;
const CLEARANCE_BUFFER = 12; // extra units beyond a hazard's radius to aim for

function randomPoint() {
  return {
    x: Math.round(MARGIN + Math.random() * (CANVAS_WIDTH - MARGIN * 2)),
    y: Math.round(MARGIN + Math.random() * (CANVAS_HEIGHT - MARGIN * 2)),
  };
}

function isInsideAnyHazard(point, hazards) {
  return hazards.some((h) => Math.hypot(point.x - h.cx, point.y - h.cy) < h.r + CLEARANCE_BUFFER);
}

/**
 * Generates a random route of 4-6 waypoints. Each candidate point is
 * resampled (up to MAX_ATTEMPTS_PER_POINT times) if it lands inside a
 * hazard's footprint, so most generated routes come out clear — useful
 * for a hackathon demo — without guaranteeing safety, since AeroTwin
 * should still occasionally surface a violation to show Validate Route
 * actually catching something.
 */
function generateRandomRoute(hazards) {
  const hazardOnly = hazards.filter((h) => h.isHazard);
  const pointCount = 4 + Math.floor(Math.random() * 3); // 4-6 points
  const waypoints = [];

  for (let i = 0; i < pointCount; i += 1) {
    let candidate = randomPoint();
    let attempts = 0;
    while (isInsideAnyHazard(candidate, hazardOnly) && attempts < MAX_ATTEMPTS_PER_POINT) {
      candidate = randomPoint();
      attempts += 1;
    }
    waypoints.push(candidate);
  }

  return waypoints;
}

module.exports = { generateRandomRoute };
