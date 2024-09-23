import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
// Import components
import SearchBar from './components/SearchBar.js/index.js';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather.js';
import SummaryForecast from './components/SummaryForecast';
import DetailedForecast from './components/DetailedForecast';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SplashScreen from './components/SplashScreen';
import useTheme from './hooks/useTheme';
import ToggleSwitch from './components/ToggleSwitch';
import './styles/styles.css';
import './styles/App.css';

const AppContent = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [status, setStatus] = useState({ error: null, loading: false });
  const [showDetailed, setShowDetailed] = useState(false);
  const [theme, setTheme] = useTheme();

  const fetchWeather = useCallback(async (query) => {
    setStatus({ error: null, loading: true });
    try {
      const response = await axios.get(`/api/weather?city=${query}`);
      const { weather, forecast } = response.data;
      setLocation(`${weather.name}, ${weather.sys.country}`);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setStatus({ error: 'Unable to fetch weather data. Please try again.', loading: false });
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    const fetchInitialWeather = async () => {
      const city = getRandomCity();
      await fetchWeather(city);
    };
    fetchInitialWeather();
  }, [fetchWeather]);

  // Handle search and other functionalities remain unchanged
  return (
    <div className={`App container ${theme}`}>
      <Header />
      <div className="search-container">
        <SearchBar onSearch={fetchWeather} error={status.error} />
      </div>
      {/* Other components remain */}
    </div>
  );
};

// Main App component remains the same
const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        {showSplashScreen ? (
          <Route path="/" element={<SplashScreen />} />
        ) : (
          <>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/app" element={<AppContent />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
