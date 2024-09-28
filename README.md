# HyperCast Weather App

HyperCast is a weather forecasting app that allows users to search for current weather data and future forecasts by city. This commercial-grade version of the app comes with user authentication and personalized weather preferences. The app fetches real-time weather data from a backend server that interacts with third-party APIs (OpenWeatherMap, OpenCageData) and stores user data in MongoDB.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Environment Variables](#environment-variables)
6. [Running Locally](#running-locally)
7. [API Endpoints](#api-endpoints)
8. [Folder Structure](#folder-structure)
9. [License](#license)

## Features

- **User Authentication**: Register and login functionality with password hashing.
- **Personalized Weather Data**: Users can view real-time weather data and forecasts.
- **Search Functionality**: Search for weather information by city name.
- **Detailed and Summary Forecasts**: View detailed weather info or a summary depending on user preference.
- **Responsive Design**: Works seamlessly across different device sizes.
- **Dark/Light Theme Toggle**: Users can switch between themes.

## Tech Stack

### Frontend:

- React.js
- Axios for API requests
- React Router for routing
- Custom CSS for styling

### Backend:

- Node.js with Express.js
- MongoDB (with Mongoose) for data storage
- JWT for user authentication
- OpenWeatherMap API and OpenCageData API for weather and geolocation data

### Tools & Services:

- Docker (optional)
- MongoDB Atlas (Cloud Database)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance
- [Docker](https://www.docker.com/) (optional, for containerization)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/HYperCast.git
cd HYperCast
```

````

### 2. Install Dependencies

#### Frontend:

```bash
cd frontend
npm install
```

#### Backend:

```bash
cd ../backend
npm install
```

### 3. Environment Variables

Create an `.env` file in the `backend` directory with the following content:

```env
# Backend
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=your_openweathermap_api_key
OPENCAGE_API_KEY=your_opencage_api_key

# Frontend
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 4. Running the Application Locally

#### Step 1: Start the Backend

In the `backend` directory, run:

```bash
npm start
```

This will start the backend server at `http://localhost:5000`.

#### Step 2: Start the Frontend

In the `frontend` directory, run:

```bash
npm start
```

This will start the React frontend at `http://localhost:3000`.

The frontend will make API calls to the backend to fetch weather data and handle user authentication.

### 5. Docker Setup (Optional)

If you prefer to run the app in Docker containers, follow these steps:

1. Ensure you have Docker installed.
2. Run the following command from the project root to build and start the containers:

```bash
docker-compose up --build
```

This will start both the backend and frontend in separate containers.

## API Endpoints

The backend server exposes the following API endpoints:

- **User Authentication**:

  - `POST /api/users/register`: Register a new user.
  - `POST /api/users/login`: Login with existing credentials.

- **Weather Data**:
  - `GET /api/weather?city={city_name}`: Fetch weather data for a specific city.

## Folder Structure

```bash
HYperCast/
│
├── backend/             # Node.js backend
│   ├── controllers/     # Controllers for handling requests
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middlewares (e.g., auth)
│   └── server.js        # Entry point for the backend
│
├── frontend/            # React frontend
│   ├── components/      # React components (SearchBar, Weather, etc.)
│   ├── hooks/           # Custom hooks (e.g., theme toggler)
│   ├── styles/          # CSS files
│   └── App.js           # Main React app
│
├── docker-compose.yml   # Docker setup for multi-container environment
├── README.md            # Documentation
└── .env.example         # Example environment variable configuration
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```

### Key Points:
- **Features Section**: Highlights key functionalities of your app.
- **Tech Stack**: Divides the stack into frontend and backend.
- **Setup Instructions**: Includes how to clone, install dependencies, set environment variables, and run both the frontend and backend locally.
- **API Endpoints**: Lists the important backend API routes.
- **Docker**: Optional Docker setup is also included for those who prefer containerization.
```
````
