const express = require("express")

const siteRouter = express.Router()

const User = require("./../models/User.model")

const isLoggedIn = require("./../utils/isLoggedIn")


siteRouter.get("/main", isLoggedIn, (req, res, next)=>{
    const {_id} = req.session.currentUser;

    User.findById(_id).then((user)=>{
        const props = {user:user}

        res.render("Secret", props)
    }).catch((err) => console.log(err));
})


siteRouter.get("/private", isLoggedIn, (req, res, next)=>{
    const {_id} = req.session.currentUser;

    User.findById(_id).then((user) =>{
        const props = {user:user}

        res.render("Private", props)
    }).catch((err) => console.log(err))
})


module.exports = siteRouter