const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const erv = require('express-react-views');//⚠️
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const app = express();

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRouter')//⚠️
const siteRouter = require('./routes/siteRouter')//⚠️

//DB CONNECTION
const DB_NAME = "basic-auth";

mongoose.
   connect(`mongodb://localhost:27017/${DB_NAME}`,{
       useNewUrlParser:true,
       useUnifiedTopology:true,
       useFindAndModify:false
   })
   .then((x)=>{
       console.log(`Connected to DB: ${x.connections[0].name}`)  //⚠️ 是collections
   })
   .catch((error)=>{
       console.log("Error connecting to Mongo",error)
   })

//⚠️VIEW ENGINE
app.set("views",__dirname+"/views");
app.set("view engine","jsx");
app.engine("jsx",erv.createEngine());






//⚠️MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//⚠️⚠️ 必须写在bodyparser后面！！！ 最好写在最后面
app.use(session({
    secret:"basic-auth-secret",
    //cookie: { maxAge:3600000 * 1 },//1小时后浏览器cookie会删除保存
    resave:true,
    saveUninitialized:false,
    store:new MongoStore({
        mongooseConnection:mongoose.connection,
        ttl:60*60*24*7*6  //session在数据库会保存6个月 (14 days - Default)
    })
}))

//⚠️ROUTES
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.get('/',(req,res,next)=>{
  
//     res.render('Home')
// })
app.use('/auth',authRouter);
app.use('/',siteRouter)

module.exports = app;
