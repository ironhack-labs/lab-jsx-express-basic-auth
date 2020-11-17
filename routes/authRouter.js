const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const zxcvbn = require('zxcvbn');

const User = require('../models/User.model');

const saltRounds = 10;

authRouter.get("/signup", (req, res, next) => {
    res.render('Signup');
});

authRouter.post("/signup", (req, res, next) => {
    const {username, password} = req.body;

    if (username === '' || password === '') {
        const props = { errorMessage: "Enter username and password"};
        res.render('Signup', props);
        return;
    }; 

    User.findOne({username})
        .then( (user) => {
            if (user) {
                const props = {errorMessage: "User already exists"}
                res.render('Signup', props);
                return;
            };

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            User.create({username: username, password: hashedPassword})
                .then((createdUser) => {
                    res.redirect('/');
                })
                .catch( (err) => console.log(err));
        })
        .catch( (err) => console.log(err));
})

authRouter.get('/login', (req, res, next) => {
    res.render('Login');
});

authRouter.post('/login', (req, res, next) => {
    const {username, password} = req.body;

    if ( username === '' || password === '') {
        const props = { errorMessage: 'Please enter username and password'}

        res.render('Login', props);
        return;
    }

    User.findOne({username})
    .then((user) => {
        if (!user) {
            const props = {errorMessage: "This username doesn't exist"};
            res.render('Login', props);
            return;
        }
        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (passwordCorrect) {
            req.session.currentUser = user;
            res.redirect('/');
        } else {
            const props = {errorMessage: "Incorrect password"}
            res.render('Login', props);
        }
    })
    .catch((err) => console.log(err));
})



module.exports = authRouter;