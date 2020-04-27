const queryPromise = require('../connection')({
  host: process.env.BITCOINES_DATABASE_URL || 'localhost',
  database: process.env.BITCOINES_DATABASE_NAME || 'bitcoines',
  user: process.env.BITCOINES_DATABASE_USER || 'root',
  password: process.env.BITCOINES_DATABASE_PASSWORD || 'password',
});

/// @dev used to insert a request by user
const insertRequest = async (satoshiAmount, walletAddress) => {
  // @audit check without LIMIT 1
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

/// @dev to check whether already a waiting request exists
const isRequestAllowed = async (satoshiAmount) => {
  const results = await queryPromise(
    `SELECT satoshiAmount FROM btcRequests WHERE satoshiAmount=${satoshiAmount} AND status = 'waiting';`
  );
  console.log({ results });
  return results.length === 0;
};

/// @dev helper: insert a row in btcDeposits
const insertDeposit = async (transactionHash, blockHeight, value) => {
  await queryPromise(
    `INSERT INTO btcDeposits (transactionHash, blockHeight, value) VALUES (${transactionHash}, ${blockHeight}, '${value}')`
  );
};

/// @dev insert a row in btcBlock as well as rows in btcDeposits
const insertBlock = async (blockHeight, blockHash, transactionsArray) => {
  await queryPromise(
    `INSERT INTO btcBlocks (blockHeight, blockHash, transactions) VALUES (${blockHeight}, ${blockHash}, '${JSON.stringify(
      transactionsArray
    )}')`
  );

  await Promise.all(
    transactionsArray.map((transaction) => {
      console.log(
        'in insertblock before dep',
        transaction,
        transaction.hash,
        blockHeight,
        transaction.received
      );
      return insertDeposit(transaction.hash, blockHeight, transaction.received);
    })
  );
};

/// @dev select a btc block from database
const getBlock = async (blockHeight) => {
  const results = await queryPromise(
    `SELECT * FROM btcBlocks WHERE blockHeight = ${blockHeight}`
  );
  if (results.length === 0) {
    return null;
  } else {
    const block = results[0];
    block.blockHash = '0x' + block.blockHash.toString('hex');
    return block;
  }
};

const getLastBlockNumber = async () => {
  const results = await queryPromise(
    `SELECT MAX(blockHeight) AS lastBlockNumber FROM btcBlocks`
  );
  return results[0].lastBlockNumber;
};
const getDbBlockNumbers = async () => {
  const results = await queryPromise(
    `SELECT blockHeight FROM btcBlocks ORDER BY blockHeight`
  );
  return results;
};

/// @dev remove blocks and transactions of a certain block height
const removeBlockAndTransactionsIfExists = async (blockHeight) => {
  // adding a check for safety since this can delete
  if (typeof blockHeight !== 'number') throw new Error('Invalid Block Height');
  await queryPromise(
    `DELETE FROM btcBlocks WHERE blockHeight = ${blockHeight};`
  );
  await queryPromise(
    `DELETE FROM btcDeposits WHERE blockHeight = ${blockHeight} AND btcRequestId IS NULL;`
  );
};

/// @dev this function should return empty, but will give some rows if there is no bitcoin request for that amount
const getUnallocatedDeposits = async (confirmedBlockHeight) => {
  const results = await queryPromise(
    `SELECT * FROM btcDeposits WHERE blockHeight <= ${confirmedBlockHeight} AND btcRequestId IS NULL`
  );
  return results;
};

// this function allocates all the fresh deposits (unallocated) to fresh requests (pending)
// this function to be called on new bitcoin block
const allocateDeposits = async (confirmedBlockHeight) => {
  return await queryPromise(`
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

const getWaitingForConfirmationsTransactions = async (esAddress) => {
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

const getUserRequests = async (esAddress) => {
  const results = await queryPromise(`
    SELECT * FROM btcRequests WHERE esAddress = ${esAddress};
  `);
  return results;
};

const getUserTransactions = async (esAddress) => {
  let requests = await getUserRequests(esAddress);
  let waitings = await getWaitingForConfirmationsTransactions(esAddress);

  waitings = waitings.map((waiting) => ({
    id: waiting.id,
    btcTxHash: '0x' + waiting.transactionHash.toString('hex'),
    blockHeight: waiting.blockHeight,
  }));

  requests = requests.map((request) => {
    const waiting = waitings.filter((waiting) => waiting.id === request.id);
    return {
      btcAmount: request.satoshiAmount / 10 ** 8,
      esAddress: '0x' + request.esAddress.toString('hex'),
      btcDepositTxHash: request.btcDepositTxHash
        ? '0x' + request.btcDepositTxHash.toString('hex')
        : null,
      esAmount: request.esAmountTwoDec ? request.esAmountTwoDec / 100 : null,
      esWithdrawalTxHash: request.esWithdrawalTxHash
        ? '0x' + request.esWithdrawalTxHash.toString('hex')
        : null,
      status: request.status,
      waiting: waiting[0],
      createdAt: request.createdAt,
    };
  });

  return requests;
};

/// @dev these are the requests that have their BTC deposited + confirmations
///   further esAmount will be calculated for this
const getBtcDepositedRequests = async () => {
  const results = await queryPromise(`
    SELECT id, satoshiAmount FROM btcRequests WHERE status = 'btcdeposited'
  `);
  return results;
};

/// @dev this will update ES amount to the id
const updateEsAmountOfRequest = async (id, esAmount) => {
  const esAmountTwoDec = Math.round(esAmount * 100);
  await queryPromise(`
    UPDATE btcRequests
      SET
        esAmountTwoDec = ${esAmountTwoDec},
        status = 'espending'
      WHERE id=${id}
  `);
};

const getEsPendingRequests = async () => {
  const results = await queryPromise(`
    SELECT id, esAmountTwoDec, esAddress FROM btcRequests WHERE status = 'espending'
  `);
  return results;
};

const updateEsWithdrawalTxHash = async (id, txHash) => {
  await queryPromise(`
    UPDATE btcRequests
      SET
        esWithdrawalTxHash = ${txHash},
        status = 'essent'
      WHERE id = ${id}
  `);
};

module.exports = {
  insertRequest,
  isRequestAllowed,
  getUserTransactions,
  insertBlock,
  insertDeposit,
  getBlock,
  getLastBlockNumber,
  getDbBlockNumbers,
  removeBlockAndTransactionsIfExists,
  allocateDeposits,
  getBtcDepositedRequests,
  updateEsAmountOfRequest,
  getEsPendingRequests,
  updateEsWithdrawalTxHash,
};
