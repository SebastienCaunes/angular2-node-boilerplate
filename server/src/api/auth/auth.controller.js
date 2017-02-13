/**
 * Created by alessio on 13/02/17.
 */
'use strict';
const Account = require('./account.model');
/*const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;*/

const debug = require('debug')('auth:controller');

exports.hello = (req, res) => {
    res.status(200);
    return res.json({ msg: "auth hello" });
}