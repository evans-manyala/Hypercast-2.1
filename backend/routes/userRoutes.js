const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');


router.post('/register', register);
router.post('/login', login);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
