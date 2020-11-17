const express = require("express");
const authRouter = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const zxcvbn = require('zxcvbn');

// Helper middleware

const isLoggedIn = require('../utils/isLoggedIn');
const saltRounds = 10;

// GET     /auth/signup   -  Render the Signup form

authRouter.get('/signup', (req, res, next) => {
    res.render('Signup');
})

// POST      /auth/signup    - Receives the data from Signup POST form

authRouter.post('/signup', (req, res, next) => {
    const {username: username, password: password} = req.body

    // 2 - Check if `username` and `password` are empty and display error message

    if (username === '' || password === '') {
        const props = {errormessage: 'Enter username and password'}
    
        res.send('Signup', props)
    
        return;
    }
    
    // 3 - Check the users collection to see if `username` is already taken
    
    User.findOne({username: username})
        .then((user) => {
            if(user) {
                const props = {errorMessage: 'This user already exists, please, choose another name'}
    
                res.send('Signup', props)
    
                return;
            }
            
            // > If `username` is available -  encrypt the password
    
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync( password, salt );
    
            // After encrypting the password, create the new user in DB
            User.create({username: username, password: hashedPassword})
                .then((createdUser) => {
                    // When the new user is created, redirect to the home page
                    res.redirect('/');
                })
                .catch ((error) => {
                    console.log('Error found', error)
                })
        })
        .catch((error) => {
            console.log('Error found', error)
        })
})




// GET  /auth/login  - Render the Login form

authRouter.get('/login', (req, res, next) => {

    res.render('Login');
})

// POST     /auth/login   - Receives the data from the POST Login form

authRouter.post('/login', (req, res, next) => {
    const {username: username, password: password} = req.body

    if (username === '' || password === '') {
        const props = {errorMessage: 'Indicate username and password'}

        res.render('Login', props)
        return;
    }

    User.findOne({username})
        .then((user) => {
            if(!user) {
                const props = {errorMessage: "The username doesn't exist"}

                res.render('Login', props);
                return;
            }
            

            const passwordCorrect = bcrypt.compareSync(password, user.password);

            if (passwordCorrect) {
                req.session.CurrentUser = user;

                res.redirect('/');
            } 
            else {
                res.render('Login', {errorMessage: 'The password is not correct'})
            }
        })
    
})




module.exports = authRouter;