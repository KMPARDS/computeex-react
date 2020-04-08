const env = {
  apiBaseUrl: process.env.REACT_APP_BASE_API_URL || 'http://localhost:3001/api',
  upholdClientId: process.env.REACT_APP_UPHOLD_CLIENT_ID || '6afd79abbf4d5be522fba1a9a3b65e9f10509eb9'
};

module.exports = env;
