const express = require('express');

const router = express.Router();
const { body , validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')


router.get('/register' ,(req,res)=>{
    res.render('register');
})
router.post('/register' , 
    
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min:5 }),
    body('username').trim().isLength({ min:3 }),

    async (req,res)=>{
    
    const errors = validationResult(req);
        console.log(errors);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid Data',
            })
        }
    // console.log(req.body);
    const { email , username , password } = req.body;
    const hashPassword = await bcrypt.hash(password,10)


    const newUser = await  userModel.create({
        email,
        user:username,
        password:hashPassword
     })

    res.json(newUser)
 })

router.get('./login',(req,res) => {
    res.render('login');
})

router.post(
    '/login',
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
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

        const user = await userModel.findOne({ 
            username:username
         });
        if (!user) {
            return res.status(404).json({ message: 'User and password  not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user });
    }
);

module.exports = router; 