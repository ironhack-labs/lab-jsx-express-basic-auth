const express = require("express");
const authRouter = express.Router();

const bcrypt = require("bcrypt");
const User = require("./../models/User.model");

//Helper middleware
const saltRounds = 10;
const isLoggedIn = require("./../utils/isLoggedIn");

// GET     /auth/signup   -  Render the Signup form
authRouter.get("/signup", (req, res, next) => {
  res.render("Signup");
});

// POST      /auth/signup    - Receives the data from Signup POST form
authRouter.post("/signup", (req, res, next) => {
  // 1 get username and password from the form
  const { username, password } = req.body;

  // 2 check if username and password are empty and display error message
  if (username === "" || password === "") {
    const props = { errorMessage: "Enter username or password" };
    res.render("Signup", props);
    return;
  }

  // 3 check the user collection to see if username is already taken
  User.findOne({ username: username })

    .then((user) => {
      //if username is taken display error message
      if (user) {
        const props = { errorMessage: "Username already taken" };
        res.render("Signup", props);
        return;
      }

      //if username is available encrypt the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      //after encrypting create user with model
      User.create({ username: username, password: hashedPassword })
        .then((createdUser) => {
          //when is created redirect to home page
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// GET  /auth/login  - Render the Login form
authRouter.get("/login", (req, res, next) => {
  res.render("Login");
});

// POST     /auth/login   - Receives the data from the POST Login form
authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    const props = { errorMessage: "Enter username and password" };
    res.render("Login", props);
    return;
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      const props = { errorMessage: "User not found" };
      res.render("Login", props);
      return;
    }

    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (passwordCorrect) {
      // Create the session - which also triggers the creation of the cookie
      req.session.currentUser = user;

      res.redirect("/");
    } else {
      res.render("Login", { errorMessage: "Incorrect password" });
    }
  });
});

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
