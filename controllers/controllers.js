const express = require('express');
const upholdApis = require('./uphold/uphold');

const router = express.Router();

router.use('/uphold', upholdApis);

module.exports = router;
