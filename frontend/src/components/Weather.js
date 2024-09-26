// Weather.js
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Helper function to fetch weather data
const fetchWeather = async ({ queryKey }) => {
  const [, city] = queryKey; // Destructure the queryKey array to get the city
  const { data } = await axios.get(`/api/weather?city=${city}`);
  return data;
};

// Helper function to convert UTC timestamp to local time of the city
const convertToLocalTime = (timezoneOffset) => {
  const localDate = new Date();
  const utcOffsetMs = localDate.getTimezoneOffset() * 60000; // Local UTC offset in milliseconds
  const cityTimeMs = localDate.getTime() + timezoneOffset * 1000 + utcOffsetMs;
  return new Date(cityTimeMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Weather = () => {
  const [city, setCity] = useState('');

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['weather', city],
    queryFn: fetchWeather,
    enabled: false, // Query will not run automatically
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      refetch(); // Trigger the data fetching
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>Weather in {data.weather.name}</h3>

          {/* Correct Local Time */}
          <p>Local Time: {convertToLocalTime(data.weather.timezone)}</p>

          {/* Temperature, Humidity, Wind Speed, and Pressure */}
          <p>Temperature: {data.weather.main.temp}°C</p>
          <p>Humidity: {data.weather.main.humidity}%</p>
          <p>Wind Speed: {data.weather.wind.speed} m/s</p>
          <p>Pressure: {data.weather.main.pressure} hPa</p>

          {/* Forecast (showing icon with description) */}
          <h4>Forecast:</h4>
          {data.forecast.slice(0, 8).map((item, index) => (
            <div key={index}>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{item.weather[0].description}</p>
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
