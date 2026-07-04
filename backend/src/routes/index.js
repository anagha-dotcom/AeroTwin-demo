const express = require('express');
const missionRoutes = require('./missionRoutes');
const regionRoutes = require('./regionRoutes');
const hazardRoutes = require('./hazardRoutes');
const routeRoutes = require('./routeRoutes');
const { readCollection } = require('../utils/jsonDb');

const router = express.Router();

/**
 * Liveness + mock-database check. Confirms the JSON "database" is
 * readable so a broken data file fails loudly on startup rather than
 * surfacing as a confusing 500 later in the demo.
 *
 * All backend API routes are now mounted (Phases 2-5). Remaining phases
 * (6-12) build the React frontend against this API.
 */
router.get('/health', (req, res) => {
  const missions = readCollection('missions', []);
  const regions = readCollection('regions', []);
  res.json({
    status: 'ok',
    service: 'aerotwin-backend',
    time: new Date().toISOString(),
    db: {
      driver: 'mock-json',
      collections: { missions: missions.length, regions: regions.length },
    },
  });
});

router.use('/missions', missionRoutes);
router.use('/regions', regionRoutes);
router.use('/hazards', hazardRoutes);
router.use('/', routeRoutes);

module.exports = router;
