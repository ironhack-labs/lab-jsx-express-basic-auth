const express = require("express");
const User = require("../models/User.model");
const authRouter = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const isLoggedIn = require("./../utils/isLoggedIn");

/* GET signup page. /auth/signup*/
authRouter.get("/signup", function (req, res, next) {
  res.render("Signup");
});

//POST /auth/signup
authRouter.post("/signup", (req, res, next) => {
  //1. Get values from the form req.body.username
  const { username, password } = req.body;
  //2. check if the form is empty and send an error message
  if (username === "" || password === "") {
    const props = { errorMessage: "Enter username and password" };

    res.render("Signup");
    return;
  }
  //3. Check if username is taken
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        const props = { errorMessage: "This username already exist" };
        res.render("Signup", props);
        return;
      }
      //5. encriptamos el password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      //4. Create new user in DB
      User.create({ username: username, password: hashedPassword })
        .then((createdUser) => {
          //5. redirect to the home page
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

authRouter.get("/login", (req, res, next) => {
  res.render("Login");
});

//POST /auth/login
authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    const props = { errorMessage: "Indicate username and password" };
    res.render("Login", props);
    return;
  }
  User.findOne({ username }).then((user) => {
    if (!user) {
      const props = { errorMessage: "The username doesn't exist" };
      res.render("Login", props);
      return;
    }
    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (passwordCorrect) {
      req.session.currentUser = user;
      res.redirect("/");
    } else {
      res.render("Login", { errorMessage: "Incorrect password" });
    }
  });
});

//GET /auth/logout
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

module.exports = authRouter;
