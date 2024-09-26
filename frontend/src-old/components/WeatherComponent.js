// src/components/WeatherComponent.js
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SearchBar from './SearchBar';

const fetchWeatherData = async (city) => {
  const { data } = await axios.get(`/api/weather?city=${city}`);
  return data;
};

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const { data: weatherData, status, refetch } = useQuery(
    ['weather', city],
    () => fetchWeatherData(city),
    { enabled: false }
  );

  const handleSearch = (city) => {
    setCity(city);
    refetch();
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && weatherData && (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.weather.main.temp}°C</p>
        </div>
      )}
      {status === 'error' && <p>Error fetching weather data</p>}
    </div>
  );
};

export default WeatherComponent;
