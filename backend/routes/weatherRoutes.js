const express = require('express');
const { getWeather, getGeolocation } = require('../controllers/weatherController');

const router = express.Router();

// Route for weather data
router.get('/', getWeather);

// Route for city geolocation
router.get('/geolocation', getGeolocation);

module.exports = router;
