const express = require("express");
const authRouter = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const saltRounds = 10; //⚠️⚠️ for hashing
const zxcvbn = require("zxcvbn");
const isLoggedIn = require("../utils/isLoggedIn");

// GET  /auth/signup
/*
Signup：bcrypt zxcvbn
*/
//GET  /auth/signup
authRouter.get("/signup", (req, res, next) => {
    res.render("Signup");
  });
  
  //POST /auth/signup
  authRouter.post("/signup", (req, res, next) => {
    //1 - get the values coming from the form
    // req.body.username req.body.password
    const { username, password } = req.body;
  
    //2 check if input values are empty and display error
  
    if (username === "" || password === "") {
      const props = { errorMessage: "Enter username and password" };
      res.render("Signup", props);
      return; //⚠️⚠️ 停止ejection
    }
  
    //https://www.npmjs.com/package/zxcvbn
    if (zxcvbn(password).score < 1) {
      const suggestion = zxcvbn(password).feedback.suggestions;
      const props = { errorMessage: suggestion[0] };
  
      res.render("Signup", props);
      return; //⚠️⚠️ 停止ejection
    }
  
    //3 check user collection to see if user name is taken
    User.findOne({ username })
      .then((user) => {
        //if taken, display error
        if (user) {
          const props = { errorMessage: "The username already exists" };
          res.render("Signup", props);
          return; //⚠️⚠️ 停止ejection
        }
        //if available, encryted password and create a new user in DB
        const salt = bcrypt.genSaltSync(saltRounds);
        /*
           random data for inserting into password
           saltRounds代表hash难度级别
           */
        const hashedPassword = bcrypt.hashSync(password, salt); //加密密码
  
        User.create({ username: username, password: hashedPassword })
          .then((createdUser) => {
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
  
////////////////////////////////////////////
//GET /auth/login
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

  User
  .findOne({ username })
  .then((user) => {
    if (!user) {
      const props = { errorMessage: "The username doesn't exist" };
      res.render("Login", props);
      return;
    }

    const passwordCorrect = bcrypt.compareSync(password,user.password);
    if (passwordCorrect) {
      req.session.currentUser = user;
      res.redirect("/auth/login");
    } else {
      const props = { errorMessage: "Incorrect password" };
      res.render("Login", props);
      return; //stop codes run
    }
  });
});

module.exports = authRouter;
