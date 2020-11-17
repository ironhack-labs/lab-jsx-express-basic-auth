var express = require("express");
var indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  const props = { title: "Home" };
  res.render("Home", props);
});

module.exports = indexRouter;