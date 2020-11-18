const express = require("express");
const siteRouter = express.Router();
const isLoggedIn = require("./../utils/isLoggedIn");
const User = require("./../models/User.model");

/* GET home page. */
siteRouter.get("/", function (req, res, next) {
  const props = { title: "Home" };
  res.render("Home", props);
});

/* GET main page. */

siteRouter.get("/main", isLoggedIn, (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then((user) => {
      const props = { user: user };
      res.render("Main", props);
    })
    .catch((err) => console.log(err));
});

siteRouter.get("/private", isLoggedIn, (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then((user) => {
      const props = { user: user };
      res.render("Private", props);
    })
    .catch((err) => console.log(err));
});


siteRouter.get('/Layout', (req, res, next) => {
  const userIsLoggedIn = Boolean(req.session.currentUser)

  const props = { userIsLoggedIn }
console.log("userIsLoggedIn : ", userIsLoggedIn)
  res.render('Layout', props);
})

module.exports = siteRouter;
