'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    hostname: process.env.HOST || process.env.HOSTNAME,
    db: process.env.MONGOHQ_URL,
    templateEngine: 'swig',
    dataDirectory: process.cwd() + '/app/data/',

    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'abcdefgh.... special string!!!',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions'
};
