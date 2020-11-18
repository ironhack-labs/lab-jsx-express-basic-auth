const express = require("express");
const authRouter = express.Router();

const bcrypt = require("bcrypt");
const User = require("./../models/User.model");
const zxcvbn = require("zxcvbn");

const isLoggedIn = require("./../utils/isLoggedIn");
const saltRounds = 10;


authRouter.get("/signup", (req, res, next) => {
  res.render("Signup");
});


authRouter.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    const props = { errorMessage: "Enter username and password" };
    res.render("Signup", props);
    return;
  } 
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        const props = { errorMessage: "The username already exists" };
        res.render("Signup", props);
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      User.create({ username: username, password: hashedPassword })
        .then((createdUser) => {
    console.log("created user :" ,createdUser)
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});


authRouter.get("/login", (req, res, next) => {
  res.render("Login");
});


authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    const props = { errorMessage: "Indicate username and password" };

    res.render("Login", props);
    return;
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      // If the user by the given `username` was not found, send error message
      const props = { errorMessage: "The username doesn't exist" };

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
