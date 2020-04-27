const bitcoinModel = require('../../models/bitcoinEs/bitcoinEs');
const bitcoin = require('bitcoin3js');
const { isHexString, isBytes32Hex } = require('../../utils');
const { fetchEsBtcSellOrders, getEsAmountFromBTC } = require('../probit/utils');

const network = process.env.NODE_ENV === 'production' ? 'main' : 'test3';

const provider = new bitcoin.providers.FallbackProvider(
  [
    new bitcoin.providers.BitapsProvider(network),
    new bitcoin.providers.BlockcypherProvider(
      network,
      'a3c1aad4c151458da9b1fdee2a7fbdf3'
    ),
  ],
  false
);

/// @dev saving blocks that were not saved
(async () => {
  const dbBlockNumbers = (await bitcoinModel.getDbBlockNumbers()).map(
    (obj) => obj.blockHeight
  );
  const missingBlockNumbers = [];

  let checkBlockNumber = Number(
    process.env.BITCOINES_START_BLOCK_NUMBER ||
      (process.env.NODE_ENV === 'production' ? 625922 : 1700379)
  );

  console.log({ checkBlockNumber });

  for (const b of dbBlockNumbers) {
    if (b <= checkBlockNumber) {
      continue;
    }
    checkBlockNumber++;
    while (checkBlockNumber < b) {
      console.log({ b, checkBlockNumber });
      missingBlockNumbers.push(checkBlockNumber);
      checkBlockNumber++;
    }
  }

  const currentBlockNumber = await provider.getBlockHeight();

  console.log({ checkBlockNumber, currentBlockNumber });

  for (; checkBlockNumber < currentBlockNumber; checkBlockNumber++) {
    missingBlockNumbers.push(checkBlockNumber);
  }

  console.log({ missingBlockNumbers });

  if (!missingBlockNumbers.length) {
    console.log('Nothing missing, closing recovery.');
    return;
  }

  let blocks = [];

  if (missingBlockNumbers.length < 199) {
    blocks = await provider.getBlocks(missingBlockNumbers);
  } else {
    const size = 200;
    let counter = 0;
    while (true) {
      console.log('counter', counter);
      const partNumbers = missingBlockNumbers.slice(
        0 + counter * size,
        200 + counter * size
      );
      if (partNumbers.length === 0) break;

      partBlocks = await provider.getBlocks(partNumbers);

      blocks = [...blocks, ...partBlocks];
      counter++;
    }
  }

  console.log('blocks downloaded', blocks.length);

  const transactions = await provider.getTransactions(
    process.env.BITCOINES_DEPOSIT_WALLET,
    {
      fromBlock: missingBlockNumbers[0], // Math.min(...missingBlockNumbers),
      toBlock: missingBlockNumbers[missingBlockNumbers.length - 1], // Math.max(...missingBlockNumbers)
    }
  );

  console.log('transactions downloaded', transactions.length);

  const blocksResult = await Promise.all(
    blocks.map(async (block) => {
      try {
        const blockhash = block.hash;
        if (typeof block.height !== 'number')
          throw new Error('Invalid block height from provider');
        if (!bitcoin.utils.isBytes32Hex(blockhash))
          throw new Error('Invalid hash from provider');
        // if(!(transactions instanceof Array)) throw new Error('Invalid transactions');
        // console.log('inserting block', {'block.height':block.height,blockhash, transactions});
        await bitcoinModel.insertBlock(block.height, blockhash, []);
        return true;
      } catch (error) {
        console.log(
          `Error while inserting block ${block.height}`,
          error.message
        );
        return false;
      }
    })
  );

  // console.log('blocksResult', blocksResult);

  const transactionsResult = await Promise.all(
    transactions.map(async (transaction) => {
      try {
        if (typeof transaction.height !== 'number')
          throw new Error('Invalid block height from provider');
        if (!bitcoin.utils.isBytes32Hex(transaction.hash))
          throw new Error('Invalid hash from provider');
        if (!(transactions instanceof Array))
          throw new Error('Invalid transactions');

        await bitcoinModel.insertDeposit(
          transaction.hash,
          transaction.height,
          transaction.received
        );
        return true;
      } catch (error) {
        console.log(
          `Error while inserting transaction ${transaction.hash}`,
          error.message
        );
        return false;
      }
    })
  );

  console.log(
    `Updated ${blocksResult.filter((b) => b).length} ${
      transactionsResult.filter((t) => t).length
    }`
  );
})();

async function updateBlockTransactions(newBlockNumber) {
  // check if the block already exists in the database
  // if no its ok, but if yes then remove data of older ones
  // create models: check block inserted in btcBlocks and deposits, delete rows for the blocknumber
  await bitcoinModel.removeBlockAndTransactionsIfExists(newBlockNumber);

  // add the new block number and blockhash to database
  const block = await provider.getBlock(newBlockNumber);
  // console.log({block});

  // gets transactions specifically to our deposit wallet address in this block
  let transactionsArray = await provider.getTransactions(
    process.env.BITCOINES_DEPOSIT_WALLET,
    {
      fromBlock: newBlockNumber,
      toBlock: newBlockNumber,
    }
  );

  console.log({ newBlockNumber, transactionsArray });

  // sanitize block hash, transaction hash, block height and transaction value before passing.
  if (block.hash.slice(0, 2) !== '0x') {
    block.hash = '0x' + block.hash;
    if (!isHexString(block.hash)) {
      console.log('Not a hex string (!isHexString(block.hash)): ' + block.hash);
      // make arrangement for some error since this is error from blockcypher side
      // also check typeof hash before if it's a string else the code will give error
      return; // stopping this function
    }
  }

  // IMP it has to be checked that every transaction is a receiving transaction and not sending transaction.

  transactionsArray = transactionsArray
    .map((transaction) => {
      let hash = transaction.hash;
      let received = transaction.received;

      if (received === 0) return null;

      if (typeof hash !== 'string') {
        console.log("Not a hex string (typeof tx_hash !== 'string'):", hash);
        return null;
      }
      if (hash.slice(0, 2) !== '0x') {
        hash = '0x' + hash;
      }
      if (!isHexString(hash)) {
        console.log("Not a hex string (tx_hash.slice(0,2) !== '0x'):", hash);
        return null;
      }
      if (typeof received !== 'number') {
        console.log(
          "value should be number (typeof value !== 'number'):",
          received
        );
        return null;
      }

      return { hash, received };
    })
    .filter((t) => t !== null);

  // console.log({blockNumber: newBlockNumber, 'block.hash': block.hash, transactionsArray});
  // adds the block to btcBlock table as well as transactions if any to btcDeposits
  try {
    await bitcoinModel.insertBlock(
      newBlockNumber,
      block.hash,
      transactionsArray
    );
  } catch (error) {
    console.log(error);
  }
}

const updateEsAmount = async () => {
  console.log('updating es amount');
  const depositedRequests = await bitcoinModel.getBtcDepositedRequests();
  if (depositedRequests.length) {
    const orderBook = await fetchEsBtcSellOrders();
    await Promise.all(
      depositedRequests.map(async (request) => {
        const btcAmount = request.satoshiAmount / 10 ** 8;
        const esAmount = getEsAmountFromBTC(btcAmount, orderBook);
        await bitcoinModel.updateEsAmountOfRequest(request.id, esAmount);
      })
    );
  }
  return depositedRequests.length;
};

provider.on('block', async (newBlockNumber) => {
  console.log('\n\nNew bitcoin block', newBlockNumber);
  if (typeof newBlockNumber !== 'number') {
    console.log(
      "Invalid New BlockNumber (typeof newBlockNumber !== 'number')",
      newBlockNumber
    );
    return;
  }

  // check if block already exist, add transaction replace transactions
  try {
    await updateBlockTransactions(newBlockNumber);
  } catch (error) {
    console.log(error);
  }

  // now time to mark transactions who have got enough confirmations as resolved
  // check if last 6th block has the same blockhash with real and in database
  // if same then simply run allocateDeposits functions passing the last 6th block number
  // if there is a miss match, then remove all blocks from that as well as remove transactons.
  // then run new block number for all blocks following that upto this block

  const confirmedBlockHeight =
    newBlockNumber - (process.env.BITCOINES_BLOCK_CONFIRMATIONS || 6);
  console.log({ confirmedBlockHeight });
  const confirmedDbBlock = await bitcoinModel.getBlock(confirmedBlockHeight);

  if (confirmedDbBlock === null) return;

  // checking if there are no reorgs
  const actualConfirmedBlock = await provider.getBlock(newBlockNumber);
  if (actualConfirmedBlock.hash.slice(0, 2) !== '0x') {
    actualConfirmedBlock.hash = '0x' + actualConfirmedBlock.hash;
  }
  if (
    actualConfirmedBlock.hash.toLowerCase() !==
    confirmedDbBlock.blockHash.toLowerCase()
  ) {
    // there were reorgs, updating database from confirmedBlockHeight to current - 1
    console.log(
      `Reorg found at ${confirmedBlockHeight}: ${confirmedDbBlock.blockHash.toLowerCase()} to ${actualConfirmedBlock.hash.toLowerCase()}\nupdating database...`
    );
    for (let i = confirmedBlockHeight; i < newBlockNumber; i++) {
      console.log('updating db block', i);
      try {
        await updateBlockTransactions(i);
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log('Allocating deposits with waiting requests...');
  const result = await bitcoinModel.allocateDeposits(confirmedBlockHeight);
  console.log(`Done: ${result.affectedRows} allocated\n`);

  console.log('Calculating ES for BTC...');
  const countOfRequestsUpdated = await updateEsAmount();
  console.log(
    countOfRequestsUpdated
      ? `Updated ES Amount for ${countOfRequestsUpdated} requests.`
      : 'No request updated'
  );
});
