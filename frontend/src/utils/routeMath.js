/** Mirrors backend/src/constants/canvasConfig.js — must stay in sync. */
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 760;
export const METERS_PER_UNIT = 4;

/** Total route length in canvas units (sum of segment lengths). */
export function routeLengthUnits(waypoints) {
  let total = 0;
  for (let i = 1; i < waypoints.length; i += 1) {
    total += Math.hypot(waypoints[i].x - waypoints[i - 1].x, waypoints[i].y - waypoints[i - 1].y);
  }
  return total;
}

export function routeLengthKm(waypoints) {
  return (routeLengthUnits(waypoints) * METERS_PER_UNIT) / 1000;
}
