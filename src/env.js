const env = {
  apiBaseUrl: 'http://localhost:3001/api'
};

if(process.env.REACT_APP_STAGE === 'production') {
  env.apiBaseUrl = '/api';
}

module.exports = env;
