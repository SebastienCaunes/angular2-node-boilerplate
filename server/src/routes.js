/**
 * Main application routes
 */
'use strict';

const path = require('path');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/auth', require('./api/auth'));
    app.use('/api/project', require('./api/project'));
    app.use('/api/user', require('./api/user'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api)/*').get((req, res) => {
        res.status(404);
        res.send('Invalid api request ');
    });
};

