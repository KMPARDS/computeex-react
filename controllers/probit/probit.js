const express = require('express');
const router = express.Router();
const axios = require('axios');
const HTTP_STATUS = require('http-response-status-codes');
const { successObj, errorObj, concertToBTCDisplay } = require('../../utils');
const { fetchEsBtcSellOrders } = require('./utils');

router.get('/es-btc-sell-orders', async(req, res) => {
  // if(!req.query.btcAmount) {
  //   return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
  //     errorObj('Please pass btcAmount as query parameter')
  //   )
  // }
  // const btcAmount = +req.query.btcAmount;
  // if(isNaN(btcAmount)) {
  //   return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
  //     errorObj('Invalid btcAmount')
  //   )
  // }

  res.json(await fetchEsBtcSellOrders());
});

module.exports = router;
