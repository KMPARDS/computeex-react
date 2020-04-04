const { toRfc4122, fromRfc4122 } = require('../../utils');
const options = {
  host: 'localhost',
  database: process.env.UPHOLD_DATABASE_NAME || 'db',
  user: process.env.UPHOLD_DATABASE_USER || 'root',
  password: process.env.UPHOLD_DATABASE_PASSWORD || 'Qwertyuiop'
};
console.log(options);
const queryPromise = require('../connection')(options);

const doesUserExist = async (upholdUserId) => {
  const response = await queryPromise(`SELECT userId from users WHERE userId = ${fromRfc4122(upholdUserId)}`);
  return !!response.length;
};

module.exports.createUser = async (upholdUserObject, walletAddress = '0x'+'0'.repeat(40)) => {
  if(typeof upholdUserObject !== 'object') throw new Error('Input should be object');
  if(!upholdUserObject.id) throw new Error('User id is not present');
  if(!await doesUserExist(upholdUserObject.id)) {
    const response = await queryPromise(`INSERT INTO users (userId, upholdUserObject, walletAddress) VALUES (${fromRfc4122(upholdUserObject.id)}, '${JSON.stringify(upholdUserObject)}', ${walletAddress})`);
    console.log(response);
    return true;
  }
  return false;
}
