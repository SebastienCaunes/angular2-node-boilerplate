/**
 * Created by nicolascunin on 28/10/2015.
 */
'use strict';

var express = require('express');
var http = require('http');
var appPath = process.cwd();
var consoleTen = require('console-ten');
var mongoose = require('mongoose');
var config = require('./app/config/config');
var passport = require('passport');

//Init console log
consoleTen.init(console);

console.log('Environment is: ' + process.env.NODE_ENV);

// Initializing system variables
var db = mongoose.connect(config.db);

// Express/Mongo session storage
mongoose.connection.on("connected", function()
{
    console.log('Connection started, let\'s initialize the app now !');

    // Bootstrap models
    require('./app/util').walk(appPath + '/app/models', null, function (path) {
        require(path);
    });

    //passport config
    require(appPath + '/app/config/passport')(passport);

    // Express settings
    var app = require(appPath + '/app/config/express')(passport, db);

    // initialize a first user as admin if there is none and by default it's me Nicolas Cunin
    var User = mongoose.model('User');
    User.find({email: 'niconaute@gmail.com'}, function(err, results) {
        if(err)
        {
            console.error('Error while trying to find user niconaute@gmail.com...', err);
            return;
        }

        if(results.length <= 0)
        {
            //Default User email :"john@doe.com" password:"johndoe" firstName: John  lastName:Doe }
            new User({
                "emailConfirmationToken" : "b386a97b49bfd50d66e5d154a02d996ec00f3bfa",
                "email" : "john@doe.com",
                "hashed_password" : "VvfROiot3RRUic/B5OkKUzECycxfWPwwNtmscwlFQA7fK4gRnP+/zr+rjkZk2/mD3WTTCRyz3vRammqEVxwj7w==",
                "salt" : "z1L468ArrE5XF/6utucsIQ==",
                "firstName" : "John",
                "lastName" : "Doe",
                "peopleToContactInCaseOfEmergency" : [],
                "children" : [],
                "emailConfirmed" : false,
                "role" : "unknown",
                "__v" : 0
            }).save();
        }
    });

    //create a http app on port 80 in order to redirect http request to https (see express config)
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT || 3000 , function () {
        console.log('App started on port ' + (process.env.PORT || 3000) );
    });
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// Used to catch unhandled exception and force the application to exit
// Once the application exit the forever relaunch it
process.on('uncaughtException', function (err) {
    console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);

    if (process.env.NODE_ENV !== 'development') {
        process.exit(1);
    }
});