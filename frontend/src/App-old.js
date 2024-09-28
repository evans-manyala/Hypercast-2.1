// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeatherData} />
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.weather.name}</h2>
          <p>Temperature: {weatherData.weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
