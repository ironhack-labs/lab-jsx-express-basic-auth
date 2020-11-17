const express = require("express");
const app = require("../app");
const siteRouter = express.Router();
const User = require("./../models//User.model");

const isLoggedIn = require("./../utils/isLoggedIn");

// GET   /secret
siteRouter.get("/secret", isLoggedIn, (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then((user) => {
      const props = { user: user };
      res.render("Secret", props);
    })
    .catch((err) => console.log(err));
});

siteRouter.get("/main", (req, res, next) => {
  res.render("Main");
});

siteRouter.get("/private", (req, res, next) => {
  res.render("Private");
});

module.exports = siteRouter;
