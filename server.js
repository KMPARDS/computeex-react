require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const upholdApis = require('./apis/uphold');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Strict-Transport-Security': 'max-age=31536000; preload',
    'Access-Control-Allow-Origin': '*'
  });
  return next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || '123456789',
  resave: true,
  saveUninitialized: true,
}));

app.get('/ping', (req, res) => {
  if(req.session && !req.session.count) {
    req.session.count = 0;
  }
  // console.log({});
  res.send('Pong' + (++req.session.count));
});

app.use('/uphold', upholdApis);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}`));
