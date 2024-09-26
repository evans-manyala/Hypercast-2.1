// Weather.js
import React, { useState, useMemo } from 'react'; // Added useMemo for memoization
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../styles/CurrentWeather.css'; // Import CSS for styling
import DetailedForecast from './DetailedForecast'; // Import DetailedForecast component

// Helper function to fetch weather data
const fetchWeather = async ({ queryKey }) => {
  const [, city] = queryKey; // Destructure the queryKey array to get the city
  const { data } = await axios.get(`/api/weather?city=${city}`); // Fetch weather data from the API
  return data;
};

// Function to calculate local time based on timezone offset
const calculateLocalTime = (timezoneOffset) => {
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000; // Calculate UTC time
  const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust for the timezone offset
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format local time
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [showDetailedForecast, setShowDetailedForecast] = useState(false); // State to toggle detailed forecast

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

  // Memoize the icon URL to avoid unnecessary recalculations
  const iconUrl = useMemo(() => {
    if (!data) return null; // Return null if weather data is not available
    return `http://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`; // Generate icon URL
  }, [data]);

  // Memoize the local time to avoid unnecessary recalculations
  const localTime = useMemo(() => {
    if (!data) return null; // Return null if weather data is not available
    return calculateLocalTime(data.weather.timezone); // Calculate local time based on timezone offset
  }, [data]);

  // Toggle function for detailed forecast
  const toggleDetailedForecast = () => {
    setShowDetailedForecast(!showDetailedForecast);
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
      {data && !showDetailedForecast && ( // Show current weather or detailed forecast
        <div className="current-weather">
          <div className="current-weather-card">
            <h2>Current Weather in {data.weather.name}</h2>
            <img 
              src={iconUrl} 
              alt={data.weather.weather[0].description} 
              onError={(e) => { e.target.onerror = null; e.target.src = '/src/components/assets/Error.png'; }} // Fallback image on error
            />
            <div className="current-weather-details">
              <div>
                <span>{data.weather.main.temp}°C</span>
                <span>Temp</span>
              </div>
              <div>
                <span>{data.weather.main.humidity}%</span>
                <span>Humidity</span>
              </div>
              <div>
                <span>{data.weather.wind.speed} m/s</span>
                <span>Wind Speed</span>
              </div>
              <div>
                <span>{data.weather.main.pressure} hPa</span>
                <span>Pressure</span>
              </div>
              <div>
                <span>{localTime}</span>
                <span>Local Time</span>
              </div>
            </div>
          </div>
          <button onClick={toggleDetailedForecast}>Show Detailed Forecast</button>
        </div>
      )}
      {data && showDetailedForecast && ( // Show detailed forecast if toggled
        <div>
          <DetailedForecast forecast={data.forecast} /> {/* Pass forecast data to DetailedForecast */}
          <button onClick={toggleDetailedForecast}>Hide Detailed Forecast</button>
        </div>
      )}
    </div>
  );
};

export default Weather;
