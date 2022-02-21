const express = require('express');
const rescue = require('express-rescue');

const router = express.Router({ mergeParams: true });

const createAndLogin = require('./createAndLogin')

router.post('/', rescue(createAndLogin));

module.exports = router;
