'use strict';

const debug = require('debug')('user:controller');

exports.hello = (req, res) => {
    res.status(200);
    return res.json({ msg: "user hello" });
}