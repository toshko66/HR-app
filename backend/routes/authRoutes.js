const express = require('express');
const { loginEmployee, loginCompany, registerEmployee, registerCompany, refreshToken,logout } = require('../controllers/authController');

const router = express.Router();

router.post('/register/employee', registerEmployee);
router.post('/register/company', registerCompany);
router.post('/login/employee', loginEmployee);
router.post('/login/company', loginCompany);
router.post('/token', refreshToken);
router.post('/logout', logout);



module.exports = router;
