// App.js
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen'; // Import SplashScreen component
import LandingPage from './components/LandingPage'; // Import LandingPage component
import Weather from './components/Weather'; // The weather component where we'll fetch data

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Splash screen duration, e.g., 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Show splash screen while loading
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to landing */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
