require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const erv = require("express-react-views");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const authRouter = require("./routes/AuthRouter");
const siteRouter = require("./routes/siteRouter");

const app = express();
const DB_NAME = "node-basic-auth";

// DB CONNECTION
mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to DB: ${x.connections[0].name}`))
  .catch((err) => console.log("Error while connecting to DB", err));

// SET THE VIEW ENGINE
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// SESSION MIDDLEWARE:
app.use(
  session({
    secret: "basic-auth-secret",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttll: 60 * 60 * 24 * 7,
    }),
  })
);
// ...

// ROUTES
app.get("/", (req, res, next) => {
  res.render("Home");
});

app.use("/auth", authRouter);

app.use("/", siteRouter);

module.exports = app;
