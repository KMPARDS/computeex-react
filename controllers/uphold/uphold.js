const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const HTTP_STATUS = require('http-response-status-codes');
const { successObj, errorObj } = require('../../utils');

const requiresLogin = (req, res, next) => {
  if(!req.session.upholdAccessToken) {
    res.status(HTTP_STATUS.CLIENT.UNAUTHORIZED).json(
      errorObj('Please login to ComputeEx using Uphold')
    );
  } else {
    next();
  }
};

// expects user to send walletAddress in body
router.post('/record-wallet-address', (req, res) => {
  if(!req.body.walletAddress) {
    res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
      errorObj('Please send walletAddress in body')
    );
  }
  const alreadyPresent = !!req.session.walletAddress;
  req.session.walletAddress = req.body.walletAddress;
  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(alreadyPresent ? 'updated' : 'recorded')
  );
});

router.get('/generate-state', (req, res) => {
  randomBytes(32, (err, buffer) => {
    res.status(HTTP_STATUS.SUCCESS.OK).json(
      successObj(buffer.toString('base64'))
    );
  });
});

module.exports = router;
