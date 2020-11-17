const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isLoggedIn = require("./../utils/isLoggedIn.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  const props = { title: "Home" };
  res.render("Home", props);
});

/* GET main page. */
router.get("/auth/main", function (req, res, next) {
  const props = { title: "Main" };
  res.render("Main", props);
});
/* GET private page. */
router.get("/auth/private", isLoggedIn, function (req, res, next) {
  const props = { title: "Private" };
  res.render("Private", props);
});

/* GET signup page. */
router.get("/auth/signup", function (req, res, next) {
  const props = { title: "Signup" };
  res.render("Signup", props);
});

// POST signup page
router.post("/auth/signup", function (req, res, next) {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    const props = { errorMessage: "Enter username and password" };
    res.render("Signup", props);
    return;
  }
  // Encrypt the password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  User.create({ username, password: hashedPassword })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET signup page. */
router.get("/auth/login", function (req, res, next) {
  const props = { title: "Login" };
  res.render("Login", props);
});

// POST login page
router.post("/auth/login", function (req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if (passwordCorrect) {
      req.session.currentUser = user;
      res.redirect("/auth/private");
    } else {
      console.log("bad password motherfucker!");
      res.redirect("/auth/main");
    }
  });
});

module.exports = router;
