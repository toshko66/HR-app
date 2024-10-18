// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.get('/profile', verifyToken, getUserProfile); // Authenticated users only

module.exports = router;
