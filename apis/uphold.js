const express = require('express');
const router = express.Router();
const HTTP_STATUS = require('http-response-status-codes');

const requiresLogin = (req, res, next) => {
  if(!req.session.upholdAccessToken) {
    res.status(HTTP_STATUS.CLIENT.UNAUTHORIZED).json({
      success: false,
      error: 'Please login to ComputeEx using Uphold'
    });
  } else {
    next();
  }
};

router.post('/login', (req, res) => {
  console.log({q: req.query, b: req.body});
  res.send('Your session query count is: ');
});

module.exports = router;
