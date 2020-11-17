const express = require("express");
const app = require("../app");
const siteRouter = express.Router();
const User = require("./../models/User.model");

const isLoggedIn = require("./../utils/isLoggedIn");

// GET   /secret
siteRouter.get("/private", isLoggedIn, (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)

    .then((user) => {
      const props = { user: user };
      res.render("Private", props);
    })
    .catch((err) => console.log(err));
});

// Main of the user is not logged in
siteRouter.get("/main", (req, res, next) => {
  const userIsLoggedIn = Boolean(req.session.currentUser);

  const props = { userIsLoggedIn };

  res.render("Main", props);
});

module.exports = siteRouter;
