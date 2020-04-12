// flow
// user will request for a deposit open, computeex will respond if it can accept the btc amount.
// user has to make the deposit of btc of exact amount from any address.
// backend server will constantly check for deposits, pending or confirmed
// once a transaction receives enough confirmations then
// ES amount will be calculated and added to sending script
// ES will be sent

/// IMP: check the case when server is down for a while and restarts, it should sync to all the bitcoin blocks with rate limit handeling and then only trigger the provider.on

const { randomBytes } = require('crypto');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const HTTP_STATUS = require('http-response-status-codes');
const {
  successObj,
  errorObj,
  concertToBTCDisplay,
  getSatoshisFromBtcAmount,
  isWalletAddress
} = require('../../utils');
const bitcoinModel = require('../../models/bitcoinEs/bitcoinEs');


// also create a database checking btc amount function and use it instead

router.get('/btc-amount-available', async(req, res) => {
  if(!req.query.btcAmount) {
    return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
      errorObj('Please send btcAmount as query parameter')
    );
  }

  const btcAmount = Number(req.query.btcAmount);

  const decimals = req.query.btcAmount.split('.')[1];

  if(isNaN(btcAmount) || (decimals && decimals.length > 8)) {
    return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
      errorObj('btcAmount that you\'ve sent is invalid')
    );
  }

  const boolean = await bitcoinModel.isRequestAllowed(
    getSatoshisFromBtcAmount(btcAmount)
  );

  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(boolean)
  );
});

router.post('/register-deposit', async(req, res) => {
  if(!isWalletAddress(req.body.walletAddress)) {
    return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
      errorObj('btcAmount is not available')
    );
  }

  const boolean = await bitcoinModel.isRequestAllowed(
    getSatoshisFromBtcAmount(req.body.btcAmount)
  );

  const btcNotAvailableError = () => res.status(HTTP_STATUS.CLIENT.NOT_ACCEPTABLE).json(
    errorObj('btcAmount is not available')
  );

  if(!boolean) {
    return btcNotAvailableError()
  }

  const result = await bitcoinModel.insertRequest(
    getSatoshisFromBtcAmount(req.body.btcAmount),
    req.body.walletAddress
  );

  if(result.affectedRows === 1) {
    res.status(HTTP_STATUS.SUCCESS.OK).json(
      successObj(true)
    );
  } else {
    btcNotAvailableError();
  }
});

router.get('/btc-deposit-address', async(req, res) => {
  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(process.env.BITCOINES_DEPOSIT_WALLET)
  )
});

router.get('/get-requests', async(req, res) => {
  const result = await bitcoinModel.getUserTransactions(req.query.walletAddress);
  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(result)
  );
});

// checking btc deposits on live bitcoin blockchain and updating it into the database
require('./blockchain-pooler');

module.exports = router;
