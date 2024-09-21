const axios = require('axios');
const weatherApiKey = process.env.WEATHER_API_KEY;
const geocodeApiKey = process.env.OPENCAGE_API_KEY;
// Fetch weather data from OpenWeatherMap
const getWeather = async (req, res) => {
  const { city } = req.query;
  try {
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`);
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherApiKey}`);

    res.json({
      weather: weatherResponse.data,
      forecast: forecastResponse.data.list,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

// Fetch geolocation data from OpenCage
const getGeolocation = async (req, res) => {
  const { city } = req.query;
  try {
    const geocodeResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geocodeApiKey}`);
    const location = geocodeResponse.data.results[0].geometry;
    res.json(location);
  } catch (error) {
    console.error('Error fetching geolocation:', error.message);
    res.status(500).json({ error: 'Failed to fetch geolocation' });
  }
};

module.exports = { getWeather, getGeolocation };
