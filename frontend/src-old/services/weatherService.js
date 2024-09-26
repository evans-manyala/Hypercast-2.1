import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_URL}/weather`, { params: { lat, lon } });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Fetch geolocation data from the backend
export const getGeolocation = async (city) => {
    try {
      const response = await axios.get(`${API_URL}/api/weather/geolocation`, {
        params: { city }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching geolocation:', error.message);
      throw error;
    }
  };

/*Fetch Autosuggestion data
export const getCitySuggestions = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/city/suggestions`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    throw error;
  }
};*/
