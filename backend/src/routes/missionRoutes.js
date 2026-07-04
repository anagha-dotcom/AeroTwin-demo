const express = require('express');
const missionController = require('../controllers/missionController');

const router = express.Router();

// GET /api/missions
router.get('/', missionController.getMissions);

// GET /api/missions/:id
router.get('/:id', missionController.getMissionById);

module.exports = router;
