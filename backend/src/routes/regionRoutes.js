const express = require('express');
const regionController = require('../controllers/regionController');

const router = express.Router();

// GET /api/regions
router.get('/', regionController.getRegions);

// GET /api/regions/:id
router.get('/:id', regionController.getRegionById);

module.exports = router;
