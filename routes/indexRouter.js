var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const props = { title: "Home" };
  res.render("Home", props);
});

module.exports = router;
