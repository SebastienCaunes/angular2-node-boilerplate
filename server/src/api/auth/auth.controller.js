/**
 * Created by alessio on 13/02/17.
 */
'use strict';
const Account = require('./account.model'),
    passport = require('passport');

const debug = require('debug')('auth:controller');

exports.register = (req, res) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
            console.error(err);
        }

        res.send("registred");
    });
};