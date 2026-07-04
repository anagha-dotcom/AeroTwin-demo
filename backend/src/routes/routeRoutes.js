const express = require('express');
const routeController = require('../controllers/routeController');

const router = express.Router();

// POST /api/validate-route
router.post('/validate-route', routeController.validateRoute);

// POST /api/generate-route
router.post('/generate-route', routeController.generateRoute);

module.exports = router;
