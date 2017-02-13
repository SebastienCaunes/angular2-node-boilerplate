'use strict';

const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

router.post('/register', controller.register);

module.exports = router;
