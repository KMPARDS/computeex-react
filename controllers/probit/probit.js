const express = require('express');
const router = express.Router();
const axios = require('axios');
const HTTP_STATUS = require('http-response-status-codes');
const { successObj, errorObj, concertToBTCDisplay } = require('../../utils');

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

  const response = await axios.get('https://api.probit.com/api/exchange/v1/order_book?market_id=ES-BTC');
  res.send(response.data.data.sort((order1, order2) => {
    return +order1.price > +order2.price ? 1 : -1;
  }).filter(order => {
    return order.side === 'sell';
  }).map(order => {
    order.price = concertToBTCDisplay(order.price);
    return order;
  }));
});

module.exports = router;
