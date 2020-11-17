const express = require('express');
const siteRouter = express.Router();
const User = require('./../models//User.model');

const isLoggedIn = require('./../utils/isLoggedIn');

siteRouter.get("/main", isLoggedIn, (req,res,next) =>{
    const { _id } = req.session.currentUser;
    console.log(_id); 
    User.findById(_id)
    .then((user)=>{
        res.render("Main")
    })
    .catch((err)=>{
        console.log("err",err);
    })
})

siteRouter.get("/private", isLoggedIn, (req,res,next) =>{
    const { _id } = req.session.currentUser;
    User.findById(_id)
    .then((user)=>{
        res.render("Private")
    })
    .catch((err)=>{
        console.log("err",error);
    })
})

module.exports = siteRouter; 
