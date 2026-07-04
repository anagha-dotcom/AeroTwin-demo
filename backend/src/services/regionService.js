const { readCollection } = require('../utils/jsonDb');
const AppError = require('../utils/AppError');

const COLLECTION = 'regions';

function listRegions() {
  return readCollection(COLLECTION, []);
}

function getRegionById(id) {
  const region = listRegions().find((r) => r.id === id);
  if (!region) {
    throw new AppError(`Unknown region "${id}"`, 404, 'REGION_NOT_FOUND');
  }
  return region;
}

module.exports = { listRegions, getRegionById };
