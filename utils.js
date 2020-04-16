module.exports.successObj = response => ({
  status: 'success',
  response
});

module.exports.errorObj = response => ({
  status: 'error',
  response
});

module.exports.toRfc4122 = buffer => {
  const str = buffer.toString('hex');
  if(str.length !== 32) throw new Error('Invalid number of bytes: '+str.length/2);
  return `${str.slice(0,8)}-${str.slice(8,12)}-${str.slice(12,16)}-${str.slice(16,20)}-${str.slice(20)}`;
}

module.exports.fromRfc4122 = rfc4122 => {
  if(typeof rfc4122 !== 'string') throw new Error('Invalid Input');
  if(rfc4122.length !== 36) throw new Error('Invalid length of rfc4122: '+hex.length);
  const hex = rfc4122.split('-').join('');
  return '0x' + Buffer.from(hex, 'hex').toString('hex');
}

module.exports.isHexString = str => {
  if(typeof str !== 'string' || str.slice(0,2) !== '0x') return false;
  const regexp = /^[0-9a-fA-F]+$/;
  return regexp.test(str.slice(2));
}

module.exports.isWalletAddress = str => {
  return module.exports.isHexString(str) && str.length === 42;
}

module.exports.concertToBTCDisplay = (btcAmount, all) => {
  const str = typeof btcAmount === 'string' ? btcAmount : String(btcAmount);
  if(isNaN(Number(str))) {
    throw new Error('Invalid btc amount: ' + btcAmount);
  }
  if(!str) {
    throw new Error('Empty btc amount');
  }
  const arr = str.split('.');
  if(arr.length === 1 || arr[1].length < 4) {
    return str;
  }
  if(arr[1].length > 8) {
    throw new Error('BTC amount has more accuracy than possible: ' + str);
  }
  arr[1] += '0'.repeat(8 - arr[1].length);
  return arr.join('.');
}

module.exports.getSatoshisFromBtcAmount = btcAmount => Math.round(+btcAmount * 10**8);

module.exports.getBtcAmountFromSatoshis = satoshis => +btcAmount / 10**8;
