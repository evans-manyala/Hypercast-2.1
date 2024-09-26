import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather';
import SummaryForecast from './components/SummaryForecast';
import DetailedForecast from './components/DetailedForecast';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import useTheme from './hooks/useTheme';
import './styles/styles.css';
import './App.css';
import { getWeather, getCitySuggestions } from './services/weatherService';

const AppContent = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [status, setStatus] = useState({ error: null, loading: false });
  const [theme, setTheme] = useTheme();

  // Function to handle weather fetching via the backend
  const fetchWeather = async (query) => {
    setStatus({ error: null, loading: true });
    try {
      const response = await axios.get('http://localhost:5000/api/weather', { params: { query } });
      setLocation(response.data.location);
      setWeatherData(response.data.weather);
      setForecastData(response.data.forecast);
    } catch (err) {
      setStatus({ error: 'Unable to fetch weather data. Please try again.', loading: false });
    } finally {
      setStatus({ error: null, loading: false });
    }
  };

  // Fetch suggestions via backend
  const fetchCitySuggestions = async (value) => {
    const suggestions = await getCitySuggestions(value);
    return suggestions;
  };

  return (
    <div className={`app ${theme}`}>
      <Header />
      <SearchBar onSearch={fetchWeather} getSuggestions={fetchCitySuggestions} />
      {status.loading ? <SplashScreen /> : null}
      {status.error ? <ErrorDisplay message={status.error} /> : null}
      {weatherData && (
        <>
          <LocationInfo location={location} />
          <CurrentWeather weather={weatherData} />
          <SummaryForecast forecast={forecastData} />
        </>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppContent />} />
    </Routes>
  </Router>
);

export default App;
