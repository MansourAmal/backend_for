var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session"); //session
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require("dotenv").config();

const { connectToMongoDb } = require("./config/db");

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
var carRouter = require("./routes/carRouter");
var GeminiRouter = require("./routes/GeminiRouter");



var app = express();

const http = require("http"); //1 importer le protocole http


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //lier le app avec public

app.use(session({   //config session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/users/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use("/cars", carRouter);
app.use("/Gemini", GeminiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });  
});

const server = http.createServer(app); //2 creation de serveur 
server.listen(process.env.port, () => {
  connectToMongoDb()
  console.log("app is running on port 5000");
});
