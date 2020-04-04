module.exports.successObj = message => ({
  status: 'success',
  message
});

module.exports.errorObj = message => ({
  status: 'error',
  message
});
