const axios = require('axios');
const { concertToBTCDisplay } = require('../../utils');

const fetchEsBtcSellOrders = async() => {
  const response = await axios.get('https://api.probit.com/api/exchange/v1/order_book?market_id=ES-BTC');

  return response.data.data.sort((order1, order2) => {
    return +order1.price > +order2.price ? 1 : -1;
  }).filter(order => {
    return order.side === 'sell';
  }).map(order => {
    order.price = concertToBTCDisplay(order.price);
    return order;
  });
};

const getEsAmountFromBTC = (btcAmount, probitOrderBook) => {
  let btcRemaining = btcAmount;
  let esAmount = 0;
  for(const order of probitOrderBook) {
    const orderRequiredBtc = +order.price * +order.quantity;
    if(btcRemaining >= orderRequiredBtc) {
      btcRemaining -= orderRequiredBtc;
      esAmount += +order.quantity;
    } else {
      esAmount += btcRemaining / +order.price;
      break;
    }
  }
  return esAmount;
}


module.exports = { fetchEsBtcSellOrders, getEsAmountFromBTC };
