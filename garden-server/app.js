'use strict';
const express       = require('express');
const path          = require('path');
//const favicon     = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');

const index      = require('./routes/index');
const garden     = require('./routes/garden');
const users      = require('./routes/users');
const sensors    = require('./routes/sensors');
const sensorData = require('./routes/sensorData');
const weather    = require('./routes/weather');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'peanut butter jelly time',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

function checkAuthUser(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).redirect('/');
    }
}

function checkAuthAPI(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).send();
    }
}

// index page for registration and login, no auth
app.use('/', index);

// app pages are user facing, check user auth and redirect to login
// TODO 401 is for unauthorized request, aka, not logged in,
// 403 is forbidden, the user is logged in, but does not have permission
// to visit that page, ex: most users should not be able to visit admin
// pages. Need to set up user permissions.
app.use('/app', checkAuthUser);

// api routes check auth and simply return 401 for unauthorized requests
app.use('/api', checkAuthAPI);
app.use('/api/garden', garden);
app.use('/api/users', users);
app.use('/api/sensors', sensors);
app.use('/api/sensorData', sensorData);
app.use('/api/weather', weather);

// passport config
const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/garden');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
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
