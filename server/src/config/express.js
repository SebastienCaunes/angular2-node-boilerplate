'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
/*
const config = require(`./environment/${process.env.NODE_ENV}.js`);
*/

module.exports = function(app) {
    const env = app.get('env');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

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
