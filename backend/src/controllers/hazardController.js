const hazardService = require('../services/hazardService');
const { HAZARD_TYPES } = require('../constants/hazardTypes');
const AppError = require('../utils/AppError');

/**
 * GET /api/hazards?region=<id>
 * Returns the (cached, deterministic) hazard layout for a region plus
 * the canvas dimensions it was generated against.
 */
function getHazards(req, res, next) {
  const { region } = req.query;
  if (!region) {
    return next(new AppError('Query param "region" is required, e.g. /api/hazards?region=kerala', 400, 'REGION_REQUIRED'));
  }
  try {
    res.json(hazardService.getHazardsForRegion(region));
  } catch (err) {
    next(err);
  }
}

/** POST /api/hazards/:regionId/regenerate — force a fresh procedural layout. */
function regenerateHazards(req, res, next) {
  try {
    res.json(hazardService.regenerateHazardsForRegion(req.params.regionId));
  } catch (err) {
    next(err);
  }
}

/** GET /api/hazards/types — the shared legend metadata the frontend renders from. */
function getHazardTypes(req, res) {
  res.json({ types: HAZARD_TYPES });
}

module.exports = { getHazards, regenerateHazards, getHazardTypes };
