const hazardService = require('../services/hazardService');
const geometryService = require('../services/geometryService');
const missionService = require('../services/missionService');
const routeGeneratorService = require('../services/routeGeneratorService');
const { assertValidWaypoints } = require('../utils/validateWaypoints');
const AppError = require('../utils/AppError');

/**
 * POST /api/validate-route
 * Body: { regionId: string, waypoints: [{x, y}, ...], missionMeta?: { name, drone, operator } }
 *
 * Loads the region's hazard set, runs every route segment through the
 * geometry engine, persists the outcome as a mission history record
 * (this is what powers the Mission Log / GET /api/missions), and
 * returns the full safety report.
 */
function validateRoute(req, res, next) {
  try {
    const { regionId, waypoints, missionMeta } = req.body || {};

    if (!regionId || typeof regionId !== 'string') {
      throw new AppError('"regionId" is required', 400, 'REGION_REQUIRED');
    }
    assertValidWaypoints(waypoints);

    const hazardSet = hazardService.getHazardsForRegion(regionId); // throws 404 if unknown
    const hazardsOnly = hazardSet.hazards.filter((h) => h.isHazard);

    const result = geometryService.computeRouteValidation(waypoints, hazardsOnly);

    const mission = missionService.recordMission({
      region: hazardSet.region,
      waypoints,
      validation: result,
      meta: missionMeta || {},
    });

    res.json({
      regionId,
      missionId: mission.id,
      waypointCount: waypoints.length,
      validatedAt: new Date().toISOString(),
      result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/generate-route
 * Body: { regionId: string }
 *
 * Returns a fresh randomized set of waypoints for the region's canvas,
 * lightly biased away from obvious hazard collisions. Does not validate
 * or persist anything by itself — the frontend calls /validate-route
 * separately once it has the generated points, same as a hand-drawn route.
 */
function generateRoute(req, res, next) {
  try {
    const { regionId } = req.body || {};
    if (!regionId || typeof regionId !== 'string') {
      throw new AppError('"regionId" is required', 400, 'REGION_REQUIRED');
    }
    const hazardSet = hazardService.getHazardsForRegion(regionId); // throws 404 if unknown
    const waypoints = routeGeneratorService.generateRandomRoute(hazardSet.hazards);
    res.json({ regionId, waypoints });
  } catch (err) {
    next(err);
  }
}

module.exports = { validateRoute, generateRoute };
