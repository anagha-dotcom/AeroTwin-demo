const regionService = require('../services/regionService');

function getRegions(req, res) {
  res.json({ regions: regionService.listRegions() });
}

function getRegionById(req, res, next) {
  try {
    res.json({ region: regionService.getRegionById(req.params.id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { getRegions, getRegionById };
