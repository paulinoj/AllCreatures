var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
// var adoption = require('./routes/adoption');
var generalInfo = require('./routes/generalInfo');
var ourClients = require('./routes/ourClients');
var donate = require('./routes/donate');
var adoptionApp = require('./routes/adoptionApp');
var adoptableAnimals = require('./routes/adoptableAnimals');
var adoptableAnimals_Edit = require('./routes/adoptableAnimals_Edit');
var testDatabase = require('./routes/testDatabase');
var update = require('./routes/update');
var deleteAdoptee = require('./routes/deleteAdoptee');
var sign_s3 = require('./routes/sign_s3');



var app = express();

var APP_LOGIN_ID = process.env.APP_LOGIN_ID;
var APP_LOGIN_PASSWORD = process.env.APP_LOGIN_PASSWORD;

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var session      = require('express-session');

var configDB = require('./config/database.js');


// JOHN ADDED THIS PART FOR ADMINISTRATIVE LOGIN STARTER
var User     = require('./app/models/user');
var Adoptee  = require('./app/models/adoptee');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
// app.use(bodyParser()); // get information from html forms




// JOHN YOU MAY NEED TO MODIFY THIS ROUTES SECTION
// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



app.use(function(req, res, next) {
  res.locals.page = req.url;
  res.locals.login = req.isAuthenticated();
  next();
});



User.find({}, function(err, user) {
    if (!err){ 
        // CREATE ADMINISTRATIVE STARTER LOGIN 
        if (user.length === 0) {
          var newUser            = new User();
          // set the user's local credentials
          newUser.local.email    = APP_LOGIN_ID;
          newUser.local.password = newUser.generateHash(APP_LOGIN_PASSWORD);

          // save the user
          newUser.save(function(err) {
              if (err)
                  throw err;
                console.log("NEW USER CREATED");
              // return done(null, newUser);
          });
        }
        else
        {
          console.log("NO NEW USER CREATED");
        }

    } else {throw err;}
});


app.use('/', routes);
app.use('/users', users);
// app.use('/adoption', adoption);
app.use('/generalInfo', generalInfo);
app.use('/ourClients', ourClients);
app.use('/donate', donate);
app.use('/adoptionApp', adoptionApp);
app.use('/adoptableAnimals', adoptableAnimals);
app.use('/adoptableAnimals_Edit', adoptableAnimals_Edit);
app.use('/testDatabase', testDatabase);
app.use('/update', update);
app.use('/deleteAdoptee', deleteAdoptee);
app.use('/sign_s3', sign_s3);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
