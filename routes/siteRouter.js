const express = require('express');
const app = require('../app');
const session = require('express-session')
const User = require('./../models/User.model');
const siteRouter = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");


//Get private
siteRouter.get("/private",isLoggedIn,(req,res,next)=>{
    const {_id} = req.session.currentUser;
    User.findById(_id)
       .then((user)=>{
           const props = {user:user}
           res.render('Private', props)
       })
})



module.exports = siteRouter;