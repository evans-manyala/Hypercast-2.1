const express = require('express');
const { getRandomCity } = require('../controllers/cityController');

const router = express.Router();

// Route for getting a random city
router.get('/random', getRandomCity);

module.exports = router;
