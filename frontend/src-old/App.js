// src/App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherComponent from './components/WeatherComponent';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Weather App</h1>
        <WeatherComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;
