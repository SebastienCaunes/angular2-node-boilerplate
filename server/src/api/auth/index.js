'use strict';

const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

router.get('/', controller.hello);

module.exports = router;
