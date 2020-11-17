const express = require("express");
// package for encrypting pws
const bcrypt = require("bcryptjs");
const isLoggedIn = require("./../utils/isLoggedIn");

const authRouter = express.Router();

const User = require("../models/User.model");

//Helper Middleware
const saltRounds = 10;

//URL starting with /auth
// auth/signup - GET Request
authRouter.get("/signup", (req, res, next) => {
  res.render("Signup");
});

//auth/sign-up - POST Request - once you click submit
authRouter.post("/signup", (req, res, next) => {
  // POST has a body -> it's the input from the form
  //const username = req.body.username;
  //const password = req.body.password;
  // 1. STEP get the input from the user
  // stored in the varibles (destructured)
  const { username, password } = req.body;

  //2.STEP: check the input of the user
  if (username === "" || password === "") {
    // pass the props (Object)
    const props = {
      errorMessage: "Both username and password must have values",
    };
    res.render("Signup", props);
    return;
    // function will stop once
  }

  //3.STEP if both values are given
  // check if username already exists
  // *YES* --> error message passed as the props

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        const props = {
          errorMessage: "The user already exists. Please log in",
        };
        res.render("Signup", props);
        return;
      }
      // *NO* --> create new user in the collections user in the db basic-auth
      // ENCRYPT THE PW!! --> package: bcryptjs

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hashedPassword })
        .then((newUser) => {
          res.redirect("/");
          return;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = authRouter;

// GET - LOGIN
authRouter.get("/login", (req, res, next) => {
  res.render("Login");
});

// POST - LOGIN
authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  //1.STEP check both fields
  if (username === "" || password === "") {
    const props = { errorMessage: "You better fill out all of the fields" };
    res.render("Login", props);
    return;
  }
  // 2. CHECK IF USERNAME EXISTS
  // YES --> CHECK PW
  // NO --> BETTER SIGN UP
  User.findOne({ username: username }).then((user) => {
    // user does not exist
    if (!user) {
      const props = { errorMessage: "User does not exist. You better sign up" };
      res.render("Login", props);
      return;
    }

    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (passwordCorrect) {
      console.log("req.session", req.session);

      req.session.currentUser = user;

      res.redirect("/");
    } else {
      const props = { errorMessage: "The password is not correct" };
      res.render("Login", props);
    }
  });
});

// LOGOUT - /auth/logout

// GET     /auth/logout
authRouter.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("Error");
    } else {
      res.redirect("/auth/login");
    }
  });
});

module.exports = authRouter;
