const missionService = require('../services/missionService');
const AppError = require('../utils/AppError');

function getMissions(req, res) {
  const { region } = req.query;
  res.json({ missions: missionService.listMissions({ regionId: region }) });
}

function getMissionById(req, res, next) {
  const mission = missionService.getMissionById(req.params.id);
  if (!mission) {
    return next(new AppError(`No mission found with id "${req.params.id}"`, 404, 'MISSION_NOT_FOUND'));
  }
  res.json({ mission });
}

module.exports = { getMissions, getMissionById };
