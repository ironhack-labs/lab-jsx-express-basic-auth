const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require ('bcrypt');

// Helper middleware
const saltRounds = 10;


//get signup page and render
router.get('/signup', function (req, res, next){
  res.render('Signup');
})

//receive data from the signup form (post)
router.post('/signup', (req, res, next)=>{

  //gets values
const { username, password} = req.body;


//check if username and password are correct and displays warning
if (username ==='' || password === ''){
const props = { errorMessage: `Please, think about what you're doing`}

res.render('Signup', props);

return;

}

//check db and see if name is taken
User.findOne ({username: username})
.then( (user) =>{
   
//If username is taken, display warning
   if (user) {
    const props = {  errorMessage: 'Get a grip, dick, this username is taken'};
    res.render('Signup', props);
    return;
  }

//if the username is  free
const salt = bcrypt.genSaltSync (saltRounds);
const hashedPassword = bcrypt.hashSync( password, salt );

//Once the password is encrpted, we create a new user in the db
User.create ({username:username, password: hashedPassword})
.then((createdUser) => {
  //once the user has been properly created, redirect to the homepage
  res.redirect('/');
})
.catch((err) =>console.log(err));

})
.catch((err) => console.log(err));


})

// LOG IN ROUTE
router.get('/login',(req,res,next)=>{

res.render('Login');

})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if ( username === '' ||  password === '') {
    const props = { errorMessage: 'Indicate username and password'}
    
    res.render('Login', props );
    return;
  }

  User.findOne( { username })
    .then( (user) => {
      if (!user) {
        // If the user by the given `username` was not found, send error message
        const props = { errorMessage: "The username doesn't exist" }

        res.render('Login', props);
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (passwordCorrect) {
        // Create the session - which also triggers the creation of the cookie
        req.session.currentUser = user;

        res.redirect('/');
      }
      else {
        res.render('Login', { errorMessage: "Incorrect password" } );
      }


    })


  })




module.exports = router;
