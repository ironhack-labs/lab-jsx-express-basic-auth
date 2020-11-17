const express = require('express');
const app = require('../app');
const siteRouter = express.Router();
const User = require('./../models/User.model');
const isLoggedIn = require("../utils/isLoggedIn");
const session = require('express-session')


siteRouter.get("/private",isLoggedIn,(req,res,next)=>{
    console.log(req.session.currentUser)
    const {_id} = req.session.currentUser;
    User.findById(_id)
       .then((user)=>{
           const props = {user:user}
           res.render('Private',props)
       })

})


siteRouter.get('/main',(req,res,next)=>{
    console.log(req.session.currentUser)
    const userIsLoggedIn = Boolean(req.session.currentUser)
    console.log(userIsLoggedIn)
    const props = {userIsLoggedIn};
    res.render('Home',props)
})






module.exports=siteRouter