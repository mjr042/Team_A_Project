/**
* Login.js contains logic for the login page. It connects to logic for Routing info and User info.
* It loads external scripts for Username and Password validation, HTML/CSS layout building, and error handling.
* The Public Folder contains CSS assets.
* The Views Folder contains HTML layouts.
* The Routes Folder deals with User Login authentication and DB storage. 
* DO NOT REMOVE CODE FROM THIS FILE.
*/

/*
* Dependencies. DO NOT ALTER!
*/

// Import libraries for File structure and HTML parsing.
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// Import validators for file structure. If files are not stored correctly, can cause routing errors.
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

// Import Username and password validation
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Import MongoDB
var mongo = require('mongodb');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/moirai');
var db = mongoose.connection;

// Import scripts for users and routing upon form input. Head to the routes and public folders to edit the system there.
var routes = require('./routes/index');
var users = require('./routes/users');

/*
* END DEPENDENCIES
*/


// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);

// Set Port and start server
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});