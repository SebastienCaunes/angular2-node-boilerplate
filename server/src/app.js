'use strict';

const mongoose = require('mongoose');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const config = require(`./config/environment/${process.env.NODE_ENV}.js`);

mongoose.Promise = Promise;
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('connected', function () {
    console.log(`Mongoose connection open to ${config.mongo.uri}`);
});

mongoose.connection.on('error', err => {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(-1);
});

mongoose.connection.on('disconnected', function () {
    console.log(`Mongoose connection to ${config.mongo.uri} disconnected`);
});

// Setup server
let app = express();
let server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
