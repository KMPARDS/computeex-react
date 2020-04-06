const express = require('express');
const upholdApis = require('./uphold/uphold');
const probitApis = require('./probit/probit');

const router = express.Router();

router.use('/uphold', upholdApis);
router.use('/probit', probitApis);

module.exports = router;
