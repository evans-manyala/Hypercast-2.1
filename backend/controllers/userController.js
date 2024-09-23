// controllers/userController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Import the User model



// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',  // Token valid for 30 days
        });
    };

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const normalizedEmail = email.toLowerCase();
    
    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    // Send user data and JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
const login = async (req, res) => {
    try {
      console.log('Request body:', req.body);  // Log the entire request body

      const { email, password } = req.body;

      // Normalize the email to be case insensitive
      const normalizedEmail = email.toLowerCase();

      // Check if the user exists
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      console.log('Stored hashed password:', user.password);  // Log the hashed password from DB

      // Check if the password matches
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', passwordMatch);  // Log the result of the comparison

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // User exists and password matches
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),  // Generate JWT token
      });

    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
};

  module.exports = {
    register,
    login
  };
