const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// Utility function for sending error responses
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

// Register Employee
const registerEmployee = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Ensure password is defined before using it
        if (!password) {
            return sendErrorResponse(res, 400, 'Password is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            user_type: 'employee',
        });
        const { password: _, ...userWithoutPassword } = newUser.dataValues; // Rename to avoid conflicts
        res.status(201).json({ message: 'Employee registered successfully', user: userWithoutPassword });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return sendErrorResponse(res, 409, 'This email is already registered. Please try logging in.');
        } else if (error.name === 'ValidationError') {
            return sendErrorResponse(res, 400, 'Invalid data provided. Please check your input.');
        }
        console.error('Registration error:', error);
        sendErrorResponse(res, 500, 'An error occurred during registration. Please try again later.');
    }
};
// Register Company
const registerCompany = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Ensure password is defined before using it
        if (!password) {
            return sendErrorResponse(res, 400, 'Password is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            user_type: 'company',
        });

        const { password: _, ...userWithoutPassword } = newUser.dataValues; // Rename to avoid conflicts
        res.status(201).json({ message: 'Company registered successfully', user: userWithoutPassword });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return sendErrorResponse(res, 409, 'This email is already registered. Please try logging in.');
        } else if (error.name === 'ValidationError') {
            return sendErrorResponse(res, 400, 'Invalid data provided. Please check your input.');
        }
        console.error('Registration error:', error);
        sendErrorResponse(res, 500, 'An error occurred during registration. Please try again later.');
    }
};

// Login Employee
const loginEmployee = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, user_type: 'employee' } });
        if (!user) {
            return sendErrorResponse(res, 401, 'Invalid credentials for employee');
        }
        if (await bcrypt.compare(password, user.password)) {
            const payload = { id: user.id, first_name: user.first_name, user_type: user.user_type };
            const accessToken = generateToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // Set HttpOnly cookies for both tokens
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000, // Expires in 15 minutes
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 1000, // Expires in 1 hour
            });

            res.json({ message: 'Login successful', payload });
        } else {
            return sendErrorResponse(res, 401, 'Invalid credentials for employee');
        }
    } catch (err) {
        console.error('Login error:', err);
        sendErrorResponse(res, 500, 'Login failed');
    }
};

// Login Company
const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, user_type: 'company' } });
        if (!user) {
            return sendErrorResponse(res, 401, 'Invalid credentials for company');
        }
        if (await bcrypt.compare(password, user.password)) {
            const payload = { id: user.id, first_name: user.first_name, user_type: user.user_type };
            const accessToken = generateToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // Set HttpOnly cookies for both tokens
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000, // Expires in 15 minutes
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 1000, // Expires in 1 hour
            });

            res.json({ message: 'Login successful', payload });
        } else {
            return sendErrorResponse(res, 401, 'Invalid credentials for company');
        }
    } catch (err) {
        console.error('Login error:', err);
        sendErrorResponse(res, 500, 'Login failed');
    }
};

// Refresh Token (Shared for Employee and Company)
const refreshToken = (req, res) => {
    const { refreshToken: receivedToken } = req.body;
    try {
        if (!receivedToken) {
            return sendErrorResponse(res, 403, 'Refresh token is required');
        }

        const userPayload = verifyRefreshToken(receivedToken);
        const newAccessToken = generateToken({ id: userPayload.id, user_type: userPayload.user_type });

        // Set the new access token as an HttpOnly cookie
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000, // Expires in 15 minutes
        });

        res.json({ message: 'Token refreshed' });
    } catch (err) {
        console.error('Invalid refresh token:', err.message);
        sendErrorResponse(res, 403, 'Invalid refresh token');
    }
};

// Logout (Shared for Employee and Company)
const logout = (req, res) => {
    try {
        // Clear the access token and refresh token cookies by setting them with expired dates
        res.cookie('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // Expire the cookie immediately
            path: '/',
        });
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // Expire the cookie immediately
            path: '/',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Logout error:', err);
        sendErrorResponse(res, 500, 'Logout failed');
    }
};




// Export the functions so they can be used in routes
module.exports = { registerEmployee, registerCompany, loginEmployee, loginCompany, refreshToken,logout };
