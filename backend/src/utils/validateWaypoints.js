const AppError = require('./AppError');

/**
 * Validates the shape of a `waypoints` payload before it ever reaches the
 * geometry engine. Throws a 400 AppError describing exactly what's wrong
 * rather than letting a malformed request produce a confusing NaN result.
 */
function assertValidWaypoints(waypoints) {
  if (!Array.isArray(waypoints)) {
    throw new AppError('"waypoints" must be an array of {x, y} points', 400, 'INVALID_WAYPOINTS');
  }
  if (waypoints.length < 2) {
    throw new AppError('A route needs at least 2 waypoints to validate', 400, 'INSUFFICIENT_WAYPOINTS');
  }
  waypoints.forEach((p, i) => {
    if (typeof p !== 'object' || p === null || typeof p.x !== 'number' || typeof p.y !== 'number' || Number.isNaN(p.x) || Number.isNaN(p.y)) {
      throw new AppError(`Waypoint at index ${i} must be an object with numeric x and y`, 400, 'INVALID_WAYPOINTS');
    }
  });
}

module.exports = { assertValidWaypoints };
