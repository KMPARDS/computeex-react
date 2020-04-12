const queryPromise = require('../connection')({
  host: process.env.BITCOINES_DATABASE_URL || 'localhost',
  database: process.env.BITCOINES_DATABASE_NAME || 'bitcoines',
  user: process.env.BITCOINES_DATABASE_USER || 'root',
  password: process.env.BITCOINES_DATABASE_PASSWORD || 'password'
});

const insertRequest = async(satoshiAmount, walletAddress) => {
  const results = await queryPromise(`
    INSERT INTO btcRequests (satoshiAmount, esAddress)
      SELECT * FROM (SELECT
        ${satoshiAmount},
        ${walletAddress}
      ) AS tmp
      WHERE NOT EXISTS (
        SELECT satoshiAmount FROM btcRequests WHERE satoshiAmount = ${satoshiAmount} AND btcDepositTxHash IS NULL AND status = 'waiting'
      ) LIMIT 1;
  `);
  return results;
};

const isRequestAllowed = async(satoshiAmount) => {
  const results = await queryPromise(`SELECT satoshiAmount FROM btcRequests WHERE satoshiAmount=${satoshiAmount} AND status = 'waiting';`);
  console.log({results});
  return results.length === 0;
};

const insertBlock = async(blockHeight, blockHash, transactionsArray) => {
  await queryPromise(`INSERT INTO btcBlocks (blockHeight, blockHash, transactions) VALUES (${blockHeight}, ${blockHash}, '${JSON.stringify(transactionsArray)}')`);
}

const getBlock = async(blockHeight) => {
  const results = await queryPromise(`SELECT * FROM btcBlocks WHERE blockHeight = ${blockHeight}`);
  if(results.length === 0) {
    return null;
  } else {
    return results[0];
  }
}

const insertDeposit = async(transactionHash, blockHeight, value) => {
  await queryPromise(`INSERT INTO btcDeposits (transactionHash, blockHeight, value) VALUES (${transactionHash}, ${blockHeight}, '${value}')`);
};

const getUnallocatedDeposits = async(confirmedBlockHeight) => {
  await queryPromise(`SELECT * FROM btcDeposits WHERE blockHeight <= ${confirmedBlockHeight} AND btcRequestId = NULL`);
};

// this function allocates all the fresh deposits (unallocated) to fresh requests (pending)
// this function to be called on new bitcoin block
const allocateDeposits = async(confirmedBlockHeight) => {
  await queryPromise(`
    UPDATE btcRequests
      INNER JOIN btcDeposits
      ON btcRequests.status = 'waiting'
        AND btcDeposits.btcRequestId IS NULL
        AND btcDeposits.blockHeight < ${confirmedBlockHeight}
        AND btcRequests.satoshiAmount = btcDeposits.value
      SET
        btcDeposits.btcRequestId = btcRequests.id,
        btcRequests.btcDepositTxHash = btcDeposits.transactionHash,
        btcRequests.status = 'btcdeposited';
  `);
};


const getWaitingForConfirmationsTransactions = async(esAddress) => {
  const results = await queryPromise(`
    SELECT
      btcRequests.id AS id,
      btcDeposits.transactionHash AS transactionHash,
      btcDeposits.blockHeight AS blockHeight
    FROM btcRequests
      INNER JOIN btcDeposits
      ON btcRequests.status = 'waiting'
        AND btcDeposits.btcRequestId IS NULL
        AND btcRequests.satoshiAmount = btcDeposits.value
        AND btcRequests.esAddress = ${esAddress};
  `);
  return results;
};

const getUserRequests = async(esAddress) => {
  const results = await queryPromise(`
    SELECT * FROM btcRequests WHERE esAddress = ${esAddress};
  `);
  return results;
};

const getUserTransactions = async(esAddress) => {
  let requests = await getUserRequests(esAddress);
  let waitings = await getWaitingForConfirmationsTransactions(esAddress);

  waitings = waitings.map(waiting => ({
    id: waiting.id,
    btcTxHash: waiting.transactionHash.toString('hex'),
    blockHeight: waiting.blockHeight
  }));

  requests = requests.map(request => {
    const waiting = waitings.filter(waiting => waiting.id === request.id);
    return {
      ...request,
      esAddress: '0x' + request.esAddress.toString('hex'),
      waiting: waiting[0]
    }
  });

  return requests;
}

module.exports = { insertRequest, isRequestAllowed, getUserTransactions };
