const express = require('express');
const authRouter = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const zxcvbn = require ('zxcvbn');

//Helper middleware
const isLoggedIn = require('./../utils/isLoggedIn');
const saltRounds = 10;

// GEt /auth/signup --rendering signup form

authRouter.get('/signup', (req,res,next) => {
    res.render('Signup');
})

//POST /auth/signup -- receiving data from signup POST form
authRouter.post('/signup', (req,res,next)=>{
    //Getting values coming from form

    const {username, password} = req.body;

    //Checking if 'username' and 'password' are empty and displaying error message
    if (username === '' || password === '') {
        const props = { errorMessage: 'Enter username and password'}

        res.render('Signup', props);
        return;
    }

    //Checking users collection to see if username is taken
    User.findOne ({ username: username })
    .then ( (user)=> {
        //if username taken, display error message
        if(user) {
            const props = {errorMessage: 'The username already exists'};
            res.render('Signup', props);
            return;
        }
        //if username is available encrypt the password
      const salt = bcrypt.genSaltSync( saltRounds );
      const hashedPassword = bcrypt.hashSync( password, salt );

      //after encrypting password, create new User in database
      User.create ( {username: username, password: hashedPassword})
      .then( (createdUser) =>{
          //After user is created redirect to home page
          res.redirect('/');
      })
      .catch( (err) => console.log(err));
    })
    .catch( (err) => console.log(err));
})



//GET /auth/login -- rendering login form
authRouter.get('/login', (req, res, next) =>{
    res.render('Login');
})


//POST /auth/login -- receiving data from the POST login form
authRouter.post('/login', (req, res, next)=>{
    const {username, password} = req.body;

    if ( username === '' ||  password === '') {
        const props = { errorMessage: 'Indicate username and password'}
        
        res.render('Login', props );
        return;
      }

    User.findOne({username})
    .then((user)=>{
        if (!user)  {
            //if username isn't found give error message
            const props = { errorMessage: "Username doesn't exist"}

            res.render('Login', props);
            return;
        }

        const passwordCorrect = bcrypt.compareSync(password, user.password);

        if (passwordCorrect) {
          // Creating the session and triggering the creation of the cookie.
          req.session.currentUser = user;
  
          res.redirect('/');
        }
        else {
          res.render('Login', { errorMessage: "Incorrect password" } );
        }
    })
})


// GET     /auth/logout
authRouter.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy( (err) => {
      if (err) {
        res.render('Error')
      }
      else {
        res.redirect('/auth/login');
      }
    })
  })


module.exports = authRouter;
