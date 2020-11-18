
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const erv = require("express-react-views");
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const authRouter = require('./routes/authRouter');
const siteRouter = require('./routes/siteRouter');

const app = express();
const DB_NAME = 'node-basic-auth-2'


// DB CONNECTION
mongoose.connect(
  `mongodb://localhost:27017/${DB_NAME}`,
  {useNewUrlParser: true, useUnifiedTopology: true}
)
.then( () => console.log('Connected to the DB.'))
.catch( (err) => console.log(err));

// VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());


// GET /secret

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// SESSIONS MIDDLEWARE
app.use( session({
  secret: "basic-auth-secret",
  // cookie: { maxAge: 3600000 * 1 },	// 1 hour
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7 // Time to live - 7 days (14 days - Default)
  })
}));




// ROUTES
app.get('/', (req, res, next) => {
  res.render('Home');
});

app.use('/auth', authRouter);


app.use('/', siteRouter);



module.exports = app;