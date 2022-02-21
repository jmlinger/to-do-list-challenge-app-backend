const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/', require('./users/router'));

module.exports = root;