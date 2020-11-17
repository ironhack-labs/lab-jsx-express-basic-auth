const express = require("express");
const siteRouter = express.Router();
const app = require('../app');
const User = require('../models/User.model');

const isLoggedIn = require('../utils/isLoggedIn');


siteRouter.get('/secret',  isLoggedIn,  (req, res, next ) => {
    const { _id } = req.session.currentUser;
    User.findById(_id)
      .then( (user) => {
  
        const props = {user: user}
        res.render('Secret', props);
        
      })
      .catch( (err) => console.log(err));
  
  })
  
  
  siteRouter.get('/example', (req, res, next) => {
    const userIsLoggedIn = Boolean(req.session.currentUser)
  
    const props = { userIsLoggedIn }
  
    res.render('Example', props);
  })



module.exports = siteRouter;