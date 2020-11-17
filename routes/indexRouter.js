const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const props = { title: "Home" };
  res.render("Home", props);
});

module.exports = router;
