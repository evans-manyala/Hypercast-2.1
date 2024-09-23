const axios = require('axios');
const openCageApiKey = process.env.OPENCAGE_API_KEY;
const cities = ['Nairobi', 'London', 'New York', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Moscow'];

// @desc Fetch random city coordinates
// @route GET /api/city/random
// @access Public
const getRandomCity = async (req, res) => {
    try {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        
        // API call to OpenCage to fetch city coordinates
        const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${randomCity}&key=${openCageApiKey}`;

        const response = await axios.get(openCageUrl);
        const data = response.data;
        
        // Check if the API returns valid results
        if (data.results.length > 0) {
            const results = data.results[0];
            const isoAlpha2 = results.components['ISO_3166-1_alpha-2'];
            const flagUrl = `https://flagcdn.com/w320/${isoAlpha2.toLowerCase()}.png`;

            const cityData = {
                city: randomCity,
                lat: results.geometry.lat,
                lon: results.geometry.lng,
                flagUrl,
                isoAlpha2
            };
            // Return the random city with its coordinates, ISO code, and flag URL
            res.json(cityData);
        } else {
            res.status(400).json({ message: 'City not found' });
        }
    } catch (error) {
        console.error('Error fetching city coordinates:', error.message);
        res.status(500).json({ message: 'Error fetching city coordinates' });
    }
};

module.exports = { getRandomCity };
