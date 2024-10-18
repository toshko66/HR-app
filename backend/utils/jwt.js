// utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
const accessTokenExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Generate an access token
function generateToken(payload) {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
}

// Generate a refresh token
function generateRefreshToken(payload) {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
}

// Verify an access token
function verifyToken(token) {
    return jwt.verify(token, accessTokenSecret);
}

// Verify a refresh token
function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
};
