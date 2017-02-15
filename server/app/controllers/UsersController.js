'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    async = require('async'),
    crypto = require('crypto'),
    _ = require('lodash'),
    mails = require('../config/mails');

/**
 * Logout
 */
exports.signout = function (req, res) {
    req.logout();
    res.sendStatus(200);
};

/**
 * List of Users
 */
exports.all = function (req, res) {
    User.find().sort('-name').exec(function (err, users) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        res.jsonp(users);
    });
};

/**
 * Return user details
 *
 * @param req
 * @param res
 */
exports.me = function (req, res) {
    // clean sensitive user info
    var user = req.user;
    user.emailConfirmationToken = undefined;
    user.hashed_password = undefined;
    user.salt = undefined;
    user._v = undefined;

    res.jsonp(user);
};

/**
 * Update a user
 */
exports.update = function (req, res) {

    var updateUser = function (user) {
        user = _.extend(user, req.body);
        user.save(function (err, p_user) {
            if (err) {
                console.error('Could not update user', err);
                res.sendStatus(500);
                return;
            }

            console.debug('User "' + req.user.email + '" has updated profile of "' + p_user.email + '"');

            /* send an email to the newly registered user */
            var locals = {
                host: req.headers.host,
                email: user.email,
                subject: 'Votre compte a bien été mis à jour',
                title: 'Le compte ' + user.firstName + ' ' + user.lastName + ' a été mis à jour...',
                message1: 'Votre compté a été mis à jour depuis votre page de profile.',
                message2: 'Si vous n\'êtes pas responsable de ces modifications, veuillez nous en informer, nous supprimerons votre compte et nous vous en créerons un nouveau.',
                message3: 'En cas de problème, vous pouvez nous contacter par les moyens indiqués sur la page disponible depuis le lien suivant.',
                link: 'http://' + req.headers.host + '/contact'
            };
            mails.sendOne('basic', locals, function (err) {
                console.log(err);
            });

            res.jsonp(p_user);
        });
    };

    // check if there is a userId,
    // if there is one, it means an "assistante maternelle" is updating the profile of someone else
    if (req.params.userId !== undefined) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                console.error('Error while trying to find user with id ' + req.params.userId, err);
                res.sendStatus(500);
                return;
            }

            updateUser(user);
        })
    }
    // if no user id, it means we're updating our own profile
    else {
        updateUser(req.user)
    }
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {

    var deleteUser = function (user) {
        user.remove(function (err) {
            if (err) {
                console.error('Could not delete user ' + user.email, err);
                res.sendStatus(500);
                return;
            }

            /* send an email to the deleted user */
            var locals = {
                host: req.headers.host,
                email: user.email,
                subject: 'Compte supprimé',
                title: 'Aurevoir ' + user.firstName + ' ' + user.lastName + ',',
                message1: 'Votre compte a été supprimé avec succès.',
                message2: 'Bonne continuation, n\'hésitez pas à parler de nous autour de vous.',
                message3: '',
                link: 'http://' + req.headers.host
            };
            mails.sendOne('basic', locals, function (err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    };

    // check if there is a userId,
    // if there is one, it means an "assistante maternelle" is deleting the profile of someone else
    if (req.params.userId !== undefined) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                console.error('Error while trying to find user with id ' + req.params.userId, err);
                res.sendStatus(500);
                return;
            }

            deleteUser(user);
        })
    }
    // if no user id, it means we're deleting our own profile
    else {
        deleteUser(req.user)
    }
};


/**
 * Create user
 */
exports.checkUserCanBeCreated = function (req, res, next) {
    var user = new User(req.body);

    // useless for now but could be useful if we do SSO later on
    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('email', 'validEmail').isEmail();
    req.assert('password', 'passwordLength').len(5, 20);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    req.user = user;
    return next();
};

exports.storeNewUserAndSendRegistrationEmail = function (req, res, next) {
    // if the user is already registered (not newly created), then return ok !
    if (!req.user.isNew) {
        res.sendStatus(200);
        return;
    }

    // otherwise, create it and send the registration email
    var user = req.user;

    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token) {

            // use this token for email confirmation
            user.emailConfirmationToken = token;

            user.save(function (err) {
                if (err) {
                    switch (err.code) {
                        case 11000:
                        case 11001:
                            return res.status(400).send('emailAlreadyTaken');
                        default:
                            return res.status(400).send('fillRequiredFields');
                    }
                }

                /* send an email to the newly registered user */
                var locals = {
                    host: req.headers.host,
                    email: user.email,
                    subject: 'Bienvenue',
                    title: 'Bonjour ' + user.firstName + ' ' + user.lastName + ',',
                    message1: 'Votre compte a été créé avec succès.',
                    message2: 'Votre mot de passe est \'' + user.password + '\'. Il ne pourra vous être fourni plus tard, veillez à le conserver précieusement.' +
                    '<br/>Votre compte vous permettra de recevoir des emails de la part des assistantes maternelles, de voir les photos prises par les ' +
                    'assistantes maternelles ainsi que de mettre à jour les informations vous concernant.',
                    message3: 'Connectez-vous au site et accéder à votre espace personnel en cliquant sur le lien suivant.',
                    link: 'http://' + req.headers.host + '/parametres'
                };
                mails.sendOne('basic', locals, function (err) {
                    console.log(err);
                });

                res.sendStatus(200);
            });
        }
    ], function (err) {
        if (err) {
            console.error('Error unkown:');
            console.error(err);
            return res.status(500);
        }
        res.jsonp(user);
    });
};