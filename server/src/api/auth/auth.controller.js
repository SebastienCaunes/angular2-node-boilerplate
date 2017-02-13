/**
 * Created by alessio on 13/02/17.
 */
'use strict';

const debug = require('debug')('auth:controller');

exports.hello = (req, res) => {
    res.status(200);
    return res.json({ msg: "auth hello" });
}