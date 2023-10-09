require('dotenv').config();

const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authMiddleware');

//Redirects to /auth/login
router.get('/', isAuthenticated, (req, res) => {
    res.redirect('auth/login');
});

router.get('/register', isAuthenticated, (req, res) => {
    res.render('register.ejs', {message: ""})
});

router.get('/login', isAuthenticated, (req, res) => {
    res.render('login.ejs')
});


module.exports = router;