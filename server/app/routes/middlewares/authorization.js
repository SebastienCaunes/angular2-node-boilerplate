'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    // ensure user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    next();
};

/**
 * Generic require Admin role routing middleware
 */
exports.requiresAdmin = function(req, res, next) {
    if (!req.isAuthenticated() || req.user.role.indexOf('admin') === -1) {
        return res.status(401).end();
    }
    next();
};