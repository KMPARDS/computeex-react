const express = require('express');
const upholdApis = require('./uphold/uphold');
const probitApis = require('./probit/probit');
const bitcoinEsApis = require('./bitcoinEs/bitcoinEs');

const router = express.Router();

router.use('/uphold', upholdApis);
router.use('/probit', probitApis);
router.use('/bitcoin-es', bitcoinEsApis);

module.exports = router;
