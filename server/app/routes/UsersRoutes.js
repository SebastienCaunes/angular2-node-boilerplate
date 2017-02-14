/**
 * Created by nicolascunin on 09/11/2015.
 */
'use strict';

var passport = require('passport'),
    authorization = require('./middlewares/authorization'),
    UsersController = require('../controllers/UsersController');

module.exports = function(app)
{
    app.route('/logout')
        .get(UsersController.signout);

    // AngularJS route to check for authentication
    app.route('/loggedin')
        .get(function (req, res) {
            res.send(req.isAuthenticated() ? req.user : '0');
        });

    // Setting the local strategy route
    app.route('/login')
        .post(passport.authenticate('local', {
            failureFlash: true
        }), function (req, res) {
            res.send(req.user);
        });

    // new user registration => only admin can do it !
    app.route('/register')
        .post(UsersController.checkUserCanBeCreated, UsersController.storeNewUserAndSendRegistrationEmail);

    // see all the users
    app.route('/users')
        .get(authorization.requiresLogin, UsersController.all);

    // see/update/delete user info (user can only see its own info)
    app.route('/users/me')
        .get(authorization.requiresLogin, UsersController.me)
        .put(authorization.requiresLogin, UsersController.update)
        .delete(authorization.requiresLogin, UsersController.delete);

    app.route('/users/:userId')
        .put(authorization.requiresLogin, UsersController.update)
        .delete(authorization.requiresLogin, UsersController.delete);

    app.route('/user')
        .put(authorization.requiresLogin, UsersController.update);
};