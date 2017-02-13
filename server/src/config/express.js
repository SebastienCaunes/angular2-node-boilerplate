'use strict';

const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    passport = require('passport'),
    Account = require('../api/auth/account.model'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = function(app) {
    const env = app.get('env');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    app.use(passport.initialize());

    // passport config
    app.use(passport.session());
    passport.use(new LocalStrategy(Account.authenticate()));
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
    }

    if ('production' === env) {
        // Standard Apache common log output
        app.use(morgan('common'));
    }
};
