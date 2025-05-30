const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Render register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle registration
router.post(
    '/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data',
            });
        }

        const { email, username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email,
            user: username,
            password: hashPassword,
        });

        res.json({ message: 'User registered', user: newUser });
    }
);

// Render login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login using username
router.post(
    '/login',
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data',
            });
        }

        const { username, password } = req.body;

        const user = await userModel.findOne({ user: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.user,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token);
        res.send('Logged In');
    }
);

module.exports = router;
