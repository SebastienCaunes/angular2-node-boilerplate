/**
 * Created by alessio on 13/02/17.
 */
'use strict';

const debug = require('debug')('project:controller');

exports.hello = (req, res) => {
    res.status(200);
    return res.json({ msg: "project hello" });
}