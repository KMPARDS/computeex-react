require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const controllerApis = require('./controllers/controllers');
const cors = require('cors');
const HTTP_STATUS = require('http-response-status-codes');

const app = express();

app.use(helmet());
app.use(cors({
  credentials: true
}));
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

app.use((req, res, next) => {
  console.log('\n'+req.originalUrl);
  console.log('Session Id:', req.sessionID);
  console.log('Session Obj', req.session);
  next();
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(HTTP_STATUS.SERVER.INTERNAL_SERVER_ERROR).send('Something broke!')
});

app.get('/ping', (req, res) => {
  if(req.session && !req.session.count) {
    req.session.count = 0;
  }
  // console.log({});
  res.send('Pong' + (++req.session.count));
});


app.use('/api', controllerApis);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}`));
