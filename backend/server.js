// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const weatherRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes'); // If implementing authentication

app.use('/api/weather', weatherRoutes); // Weather routes
app.use('/api/user', userRoutes); // User routes if needed

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
