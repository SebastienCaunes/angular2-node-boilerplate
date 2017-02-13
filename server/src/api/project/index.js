'use strict';

const express = require('express');
const controller = require('./project.controller');

const router = express.Router();

router.get('/', controller.hello);

module.exports = router;
