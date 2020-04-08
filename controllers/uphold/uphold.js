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


const requiresLogin = async(req, res, next) => {
  if(!req.session.upholdAccessToken) {
    res.status(HTTP_STATUS.CLIENT.UNAUTHORIZED).json(
      errorObj('Please login to ComputeEx using Uphold')
    );
  } else {
    if(!req.session.upholdUserId) {
      const sdk = generateSdk();
      await sdk.setToken({
        access_token: req.session.upholdAccessToken
      });
      const user = await sdk.getMe();
      req.session.upholdUserId = user.id;
    }
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
    if(walletAddress !== null) {
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
    successObj(userObj)
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

router.post('/create-transaction', requiresLogin, async(req, res) => {
  const sdk = generateSdk();
  await sdk.setToken({
    access_token: req.session.upholdAccessToken
  });
  const user = await sdk.getMe();
  const walletAddress = await upholdModel.getWalletAddress(req.session.upholdUserId)

  if(!walletAddress) {
    return res.status(HTTP_STATUS.CLIENT.FORBIDDEN).json(
      errorObj('Please save a wallet address to proceed with ES purchase transaction')
    );
  }

  const { cardId, amount, currency } = req.body;

  const [from, to] = [
    cardId,
    process.env.UPHOLD_PAYMENT_RECEIVING_CARD
  ];

  const upholdTransactionObject = await sdk.createCardTransaction(
    from,
    {
      amount: amount,
      currency: currency,
      destination: to,
      message: 'Buy ES',
      // securityCode
    }
  );

  console.log(upholdTransactionObject);

  // generate ES amount

  const args = {
    userId: req.session.upholdUserId,
    upholdTransactionObject,
    esAmount: 0,
    walletAddress
  };

  await upholdModel.insertTransaction(...Object.values(args));

  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(upholdTransactionObject.id)
  );
});

router.get('/transaction', requiresLogin, async(req, res) => {
  const transaction = await upholdModel.getTransaction(req.query.transactionId);
  if(transaction.userId !== req.session.upholdUserId) {
    return res.status(HTTP_STATUS.CLIENT.FORBIDDEN).json(
      errorObj('Restricted')
    );
  }

  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(transaction)
  );
});

router.get('/transactions', requiresLogin, async(req, res) => {
  const transactions = await upholdModel.getTransactions(req.session.upholdUserId);

  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(transactions)
  );
});

router.post('/commit-transaction', requiresLogin, async(req, res) => {
  const sdk = generateSdk();
  await sdk.setToken({
    access_token: req.session.upholdAccessToken
  });

  const transaction = await upholdModel.getTransaction(req.body.transactionId);

  const args = {
    cardId: transaction.origin.cardId,
    transactionId: transaction.transactionId,
    body: {
      message: 'Buy BTC'
    }
  }

  if(req.body.securityCode) {
    args.body.securityCode = req.body.securityCode;
  }

  const output = await sdk.commitCardTransaction(
    ...Object.values(args)
  );

  // mark tx complete in database
  await upholdModel.updateTxStatus(req.body.transactionId, 'received');

  res.status(HTTP_STATUS.SUCCESS.OK).json(
    successObj(output)
  );
});

module.exports = router;
