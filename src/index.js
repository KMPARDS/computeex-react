import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const ethers = require('ethers');

window.ProcessParentMessage_2 = (message) => {
  if (message.substring) {
    if (message.substring(0, 2) == '0x') {
      window.wallet = new ethers.Wallet(message);
    }
  }
};

window.onload = function () {
  !window.opener || window.opener.postMessage('loaded', '*');
};

window.addEventListener(
  'message',
  function (e) {
    setTimeout(() => {
      window.ProcessParentMessage_2(e.data);
    }, 0);
  },
  false
);

window.getQueryParameter = (name) => {
  if (
    (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(
      window.location.search
    ))
  ) {
    return decodeURIComponent(name[1]);
  }
};

window.lessDecimals = (str, decimals = 2) => {
  if (typeof str === 'number') str = String(str);
  if (typeof str !== 'string') throw new Error('Invalid input');
  let lessDecimals = str.split('.');
  if (!lessDecimals[1]) lessDecimals[1] = '0';
  if (lessDecimals[1].length >= decimals) {
    lessDecimals[1] = lessDecimals[1].slice(0, decimals);
  }
  return lessDecimals.join('.');
};
window.qs = (jsonData = {}) =>
  Object.entries(jsonData)
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');

window.probitOrderBook = [
  {
    side: 'sell',
    price: '0.00000557',
    quantity: '20000',
  },
];

window.isHexString = (str) => {
  if (typeof str !== 'string' || str.slice(0, 2) !== '0x') return false;
  const regexp = /^[0-9a-fA-F]+$/;
  return regexp.test(str.slice(2));
};

window.isWalletAddress = (str) => {
  return window.isHexString(str) && str.length === 42;
};

window.wait = (msec) => {
  return new Promise((res, rej) => {
    setTimeout(res, msec);
  });
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
