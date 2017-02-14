'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    config = require('./config'),
    expressValidator = require('express-validator'),
    appPath = process.cwd(),
    busboy = require('connect-busboy');

module.exports = function (passport, db) {

    var app = express();

    app.set('showStackError', true);

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compression({
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    //set up prenreder.io (https://prerender.io/)
    app.use(require('prerender-node').set('prerenderToken', 'D3pHGmj1Lu605ecwfV2C'));

    // let's statically serve public folder
    app.use(express.static(config.root + '/public'));

    // The cookieParser should be above session
    //Express use it to decode data in cookies
    app.use(cookieParser());

    app.use(expressValidator());

    // Read request content
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '1mb'
    }));
    app.use(bodyParser.json());

    // Handle DELETE and PUT request
    app.use(methodOverride());

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Enable jsonp
    app.enable('jsonp callback');

    app.use(session({
        resave: false, saveUninitialized: false, secret: config.sessionSecret, //Use to store the session in db
        store: new MongoStore({
            db: db.connection.db, collection: config.sessionCollection
        })
    }));

    // Use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // Connect flash for flash messages
    app.use(flash());

    ////Parsing multipart request
    app.use(busboy({
        limits: {
            fileSize: 10 * 5 * 1024 * 1024, // we authorize 5Mb per file
            files: 10                       // maximum 10files in 1 request
        }
    }));

    // cross origin
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    });

    // ROUTES FOR OUR API
    // =============================================================================
    var router = express.Router(); 				// get an instance of the express Router

    // middleware to use for all requests
    router.use(function (req, res, next) {
        // do logging
        require(appPath + '/app/routes/middlewares/authorization.js')(req, res, next);

        next(); // make sure we go to the next routes and don't stop here
    });

    require('../util').walk(appPath + '/app/routes', 'middlewares', function (path) {
        require(path)(app);
    });

    // This route deals enables HTML5Mode by forwarding missing files to the index.html
    app.all('/*', function(req, res) {
        res.sendFile(config.root + '/public/index.html');
    });

    return app;
};
