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
