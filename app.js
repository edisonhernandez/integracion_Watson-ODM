'use strict';

const

    bodyParser      = require('body-parser'),
    // config          = require('config'),
    crypto          = require('crypto'),
    express         = require('express'),
    https           = require('https'),
    request         = require('request');

var _ = require('lodash');
var helmet          = require("helmet");
//var frameguard      = require('frameguard');
//var xssFilter       = require('x-xss-protection');
var app             = express();
var subpath         = express();
var passport        = require('passport');
var Strategy        = require('passport-local').Strategy;
var db_local        = require('./db-local');
//var authRouter      = require("./auth");
var routes          = require('./routes/routes');
var routes          = require('./routes/routes');
/* Login config */
passport.use(new Strategy(
    function(username, password, cb) {
        db_local.users.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

/* Express config */
app.use(helmet());
//app.use(frameguard({ action: 'deny' }));
//app.use(xssFilter({ setOnOldIE: true }));
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);



// Start server
app.listen(app.get('port'), function() {
    console.log('App is running on port', app.get('port'));
});

module.exports = app;
