const express = require('express');
const router = express.Router();

// Controller modules
const particleRouter = require('../controllers/particle_controller');

// POST particle sensor data to database
router.post('/', particleRouter.index_post);

// GET particle data visualization index page
router.get('/', particleRouter.particle_get);

// GET last hour of particle data
router.get('/data/lastHour', particleRouter.data_last_hour);

// GET last 24 hours of particle data
router.get('/data/last24Hours', particleRouter.data_last_24_hours);

// GET last 7 days of particle data
router.get('/data/last7Days', particleRouter.data_last_7_days);

// GET last 30 days of particle data
router.get('/data/last30Days', particleRouter.data_last_30_days);

// GET all time particle data
router.get('/data/allTime', particleRouter.data_all_time);

module.exports = router;