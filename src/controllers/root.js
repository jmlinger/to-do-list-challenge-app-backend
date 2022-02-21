const express = require('express');

const root = express.Router({ mergeParams: true });

const users = require('./users/router');

root.use('/login', users);

module.exports = root;
