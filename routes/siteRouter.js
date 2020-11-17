var express = require("express");
var router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");

/* GET private page. */
router.get("/main", isLoggedIn, (req, res, next) => {
  const props = { title: "Home" };
  res.render("Main", props);
});
/* GET private page. */
router.get("/private", isLoggedIn, (req, res, next) => {
  const props = { title: "Home" };
  res.render("Private", props);
});

module.exports = router;
