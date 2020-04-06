const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const axios = require('axios');
const HTTP_STATUS = require('http-response-status-codes');
const { successObj, errorObj, isHexString } = require('../../utils');
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

router.get('/ticker', async(req,res) => {
  const response = await axios.get('https://api.uphold.com/v0/ticker/BTC');
  res.send(response.data);
});

// expects user to send walletAddress in body
router.post('/record-wallet-address', async(req, res) => {
  if(!req.body.walletAddress) {
    return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
      errorObj('Please send walletAddress in body')
    );
  }
  if(!isHexString(req.body.walletAddress)) {
    return res.status(HTTP_STATUS.CLIENT.BAD_REQUEST).json(
      errorObj(`Wallet address should be hex string: ${req.body.walletAddress}`)
    );
  }
  const alreadyPresent = !!req.session.walletAddress;
  req.session.walletAddress = req.body.walletAddress;
  if(req.session.upholdUserId) {
    await upholdModel.updateWalletAddress(
      req.session.upholdUserId,
      req.session.walletAddress
    );
  }
  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(req.session.upholdUserId ? 'stored' : (alreadyPresent ? 'updated' : 'recorded'))
  );
});

router.get('/wallet-address', requiresLogin, async(req, res) => {
  if(!req.session.walletAddress) {
    const walletAddress = await upholdModel.getWalletAddress(req.session.upholdUserId);
    if(walletAddress !== '0x'+'0'.repeat(40)) {
      req.session.walletAddress = walletAddress;
    } else {
      return res.status(HTTP_STATUS.SUCCESS.OK).json(
        successObj(null)
      );
    }
  }
  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(req.session.walletAddress)
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
  const userObj = await sdk.getMe();
  req.session.upholdUserId = userObj.id;
  await upholdModel.insertOrUpdateUser(
    userObj,
    isHexString(req.session.walletAddress) ? req.session.walletAddress : null
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

router.get('/cards', requiresLogin, async(req, res) => {
  const sdk = generateSdk();

  await sdk.setToken({
    access_token: req.session.upholdAccessToken
  });

  let cards = await sdk.getCards(1, 100);
  if(cards.itemsCount > 100) {
    cards = await sdk.getCards(1, cards.itemsCount);
  }

  res.status(HTTP_STATUS.SUCCESS.ACCEPTED).json(
    successObj(
      cards.items.map(card => {
        const { available, balance, currency, id, label } = card;
        return {
          available, balance, currency, id, label
        };
      })
    )
  );
});

router.post('/transact', requiresLogin, async(req, res) => {
  const sdk = generateSdk();
  await sdk.setToken({
    access_token: req.session.upholdAccessToken
  });
  const user = await sdk.getMe();

  const output = await sdk.createCardTransaction(
    from,
    {
      amount: '0.00005',
      currency: 'BTC',
      destination: to,
      message: 'Buy BTC',
      // securityCode
    },
    true
  );
});

module.exports = router;
