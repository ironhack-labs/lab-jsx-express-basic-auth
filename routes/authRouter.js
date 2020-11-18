const express = require("express");
const authRouter = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

authRouter.get("/signup", (req, res, next) => {
  res.render("Signup");
});

authRouter.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (username == "" || password == "") {
    props = { errorMessage: "please fill in the info correctly bozo!" };
    res.render("signup", props);
    return;
  }
  User.findOne({ username })
    .then((user) => {
      if (user) {
        props = { errorMessage: "username already taken mr. unoriginal" };
        res.render("signup", props);
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ username, password: hashedPassword })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

authRouter.get("/login", (req, res, next) => {
  res.render("Login");
});

authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (username == "" || password == "") {
    const props = { errorMessage: "really again you dont fill it?" };
    res.render("Login", props);
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        const props = { errorMessage: "you literally dont exist" };
        res.render("Login", props);
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        const props = { errorMessage: "Stop trying to hack other accounts" };
        res.render("Login", props);
      }
    })
    .catch((err) => console.log(err));
});

module.exports = authRouter;
