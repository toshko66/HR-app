// middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwt');
const User = require('../models/userModel');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    try {
        const user = verifyToken(token);
        req.user = user; // Attach decoded user to request object
        next();
    } catch (err) {
        res.status(403).send('Invalid token');
    }
};

// Role-based authorization based on endpoint
const authorizeBasedOnEndpoint = (req, res, next) => {
    const { user_type } = req.user;

    // check endpoint for role-based access
    if (req.path.includes('/employee') && user_type !== 'employee') {
        return res.status(403).json({ message: 'Access denied: Employee role required' });
    }
    if (req.path.includes('/company') && user_type !== 'company') {
        return res.status(403).json({ message: 'Access denied: Company role required' });
    }

    next();// Proceed if user has correct role
};

module.exports = {
    authenticateJWT,
    authorizeBasedOnEndpoint,
};
