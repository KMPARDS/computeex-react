const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const HTTP_STATUS = require('http-response-status-codes');
const { successObj, errorObj } = require('../../utils');
const upholdModel = require('../../models/uphold/uphold');

const { default: SDK } = require('@uphold/uphold-sdk-javascript');
const generateSdk = () => new SDK({
  baseUrl: process.env.UPHOLD_BASE_URL,
  clientId: process.env.UPHOLD_CLIENT_ID,
  clientSecret: process.env.UPHOLD_CLIENT_SECRET
});


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
  randomBytes(16, (err, buffer) => {
    req.session.state = buffer.toString('hex');
    console.log({state: req.session.state});
    res.status(HTTP_STATUS.SUCCESS.OK).json(
      successObj(req.session.state)
    );
  });
});

router.post('/login', async(req, res) => {
  const sdk = generateSdk();
  console.log({code: req.body.code});
  let auth;
  try {
    auth = await sdk.authorize(req.body.code);
  } catch (error) {
    return res.status(HTTP_STATUS.CLIENT.UNAUTHORIZED).json(
      errorObj(error.message)
    );
  }
  console.log({auth});
  req.session.upholdAccessToken = auth.access_token;
  console.log({session: req.session});
  await sdk.setToken({
    access_token: req.session.upholdAccessToken
  });
  const user = await sdk.getMe();
  await upholdModel.insertOrUpdateUser(
    user,
    req.session.walletAddress
  );
  res.status(HTTP_STATUS.SUCCESS.ACCEPTED).json(
    successObj(user)
  );
});

router.get('/user', requiresLogin, async(req, res) => {
  const sdk = generateSdk();
  await sdk.setToken({
    access_token: req.session.upholdAccessToken
  });
  const user = await sdk.getMe();
  await upholdModel.insertOrUpdateUser(
    user,
    req.session.walletAddress
  );
  res.status(HTTP_STATUS.SUCCESS.ACCEPTED).json(
    successObj(user)
  );
});

module.exports = router;
