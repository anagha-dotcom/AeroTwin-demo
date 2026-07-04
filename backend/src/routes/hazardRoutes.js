const express = require('express');
const hazardController = require('../controllers/hazardController');

const router = express.Router();

// GET /api/hazards/types  (kept above the ?region= route since it's a fixed path)
router.get('/types', hazardController.getHazardTypes);

// GET /api/hazards?region=<id>
router.get('/', hazardController.getHazards);

// POST /api/hazards/:regionId/regenerate
router.post('/:regionId/regenerate', hazardController.regenerateHazards);

module.exports = router;
