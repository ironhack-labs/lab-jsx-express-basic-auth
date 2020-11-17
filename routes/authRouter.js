var express = require("express");
var authRouter = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const zxcvbn = require('zxcvbn');


// Helper middleware
const isLoggedIn = require('./../utils/isLoggedIn');
const saltRounds = 10;

// GET auth/signup page 

authRouter.get('/signup', (req, res, next) => {
    res.render('Signup');
});

// POST auth/signup page 

authRouter.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        const props = { errorMessage: 'Enter username and password' };

        res.render('Signup', props);
        return;
    }
    // if (zxcvbn(password).score < 3) {
    //     // const suggestions = zxcvbn(password).feedback.suggestions;
    //     // console.log('suggestions', suggestions);
    //     // const props = {  errorMessage: suggestions[0] }
    //     const props = { errorMessage: 'Password too weak. Try again!' }

    //     res.render('Signup', props);
    //     return;
    // }
    User.findOne({ username })
        .then((user) => {
            if (user) {
                const props = { errorMessage: 'The username already exists' };
                res.render('Signup', props);
                return;
            }
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            User.create({ username: username, password: hashedPassword })
                .then(() => {
                    res.redirect('/');
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
})

//GET /auth/login
authRouter.get('/login', (req, res, next) => {
    res.render('Login');
})

//POST /auth/login 
authRouter.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        const props = { errorMessage: 'Indicate username and password' };
        res.render('Login', props);
        return;
    }
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                const props = { errorMessage: "The username doesn't exist" };
                res.render('Login', props);
                return;
            }
            const passwordCorrect = bcrypt.compareSync(password, user.password);

            if (passwordCorrect) {
                req.session.currentUser = user;
                res.redirect('/');
            } else {
                res.render('Login', { errorMessage: 'Incorrect password' });
            }
        })
})

//GET /auth/logout
authRouter.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.render('Error');
        } else {
            res.redirect('/auth/login');
        }
    })
})


module.exports = authRouter;
