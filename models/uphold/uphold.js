const { toRfc4122, fromRfc4122, isHexString } = require('../../utils');
const queryPromise = require('../connection')({
  host: 'localhost',
  database: process.env.UPHOLD_DATABASE_NAME || 'db',
  user: process.env.UPHOLD_DATABASE_USER || 'root',
  password: process.env.UPHOLD_DATABASE_PASSWORD || 'Qwertyuiop'
});

/// @dev helper model method
const doesUserExist = async(upholdUserId) => {
  const response = await queryPromise(`SELECT userId from users WHERE userId = ${fromRfc4122(upholdUserId)}`);
  return !!response.length;
};

/// @dev helper model method
const insertUser = async(upholdUserObject, walletAddress) => {
  if(walletAddress) {
    await queryPromise(`INSERT INTO users (userId, upholdUserObject, walletAddress) VALUES (${fromRfc4122(upholdUserObject.id)}, '${JSON.stringify(upholdUserObject)}', ${walletAddress})`);
  } else {
    await queryPromise(`INSERT INTO users (userId, upholdUserObject) VALUES (${fromRfc4122(upholdUserObject.id)}, ?)`, [JSON.stringify(upholdUserObject)]);
  }
};

/// @dev helper model method
const updateUser = async(upholdUserObject, walletAddress) => {
  if(walletAddress) {
    await queryPromise(`UPDATE users SET upholdUserObject = ?, walletAddress = ${walletAddress}, updatedAt = NOW() WHERE userId = ${fromRfc4122(upholdUserObject.id)}`, [JSON.stringify(upholdUserObject)]);
  } else {
    await queryPromise(`UPDATE users SET upholdUserObject = ?, updatedAt = NOW() WHERE userId = ${fromRfc4122(upholdUserObject.id)}`, [JSON.stringify(upholdUserObject)]);
  }
}

/// @dev used to query wallet address
const getWalletAddress = async(userId) => {
  const response = await queryPromise(`SELECT walletAddress from users WHERE userId = ${fromRfc4122(userId)}`);
  if(!response.length) return null;
  if(!response[0].walletAddress) return null;
  return '0x' + response[0].walletAddress.toString('hex');
}

/// @dev used to update ethereum walletAddress
const updateWalletAddress = async(userId, walletAddress) => {
  if(!isHexString(walletAddress)) throw new Error('Invalid Hex String: ' + walletAddress);

  await queryPromise(`UPDATE users SET walletAddress = ${walletAddress}, updatedAt = NOW() WHERE userId = ${fromRfc4122(userId)}`);
};

/// @dev used to store user updated info when user logins
const insertOrUpdateUser = async(upholdUserObject, walletAddress) => {
  if(typeof upholdUserObject !== 'object') throw new Error('Input should be object');
  if(!upholdUserObject.id) throw new Error('User id is not present');
  if(!isHexString(walletAddress)) walletAddress = null;
  if(!await doesUserExist(upholdUserObject.id)) {
    // insert into the database
    await insertUser(upholdUserObject, walletAddress);
  } else {
    // update user details in the database
    // query if wallet address is present
    const dbWalletAddress = await getWalletAddress(upholdUserObject.id);
    console.log({dbWalletAddress});
    await updateUser(upholdUserObject, walletAddress && dbWalletAddress !== walletAddress ? walletAddress : null);
  }
}



/// transactions

const insertTransaction = async(
  userId,
  upholdTransactionObject,
  esAmount,
  walletAddress
) => {
  const transactionId = upholdTransactionObject.id;
  const btcAmount = upholdTransactionObject.destination.amount;
  await queryPromise(`INSERT INTO transfers (transactionId, upholdTransactionObject, userId, btcAmount, esAmount, walletAddress, status) VALUES (${fromRfc4122(transactionId)}, '${JSON.stringify(upholdTransactionObject)}', ${fromRfc4122(userId)}, ${btcAmount}, ${esAmount} ${walletAddress}, 'pending')`);
};

module.exports = {
  insertOrUpdateUser, getWalletAddress, updateWalletAddress, insertTransaction
};
