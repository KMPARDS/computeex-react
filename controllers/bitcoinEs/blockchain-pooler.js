const bitcoinModel = require('../../models/bitcoinEs/bitcoinEs');
const bitcoin = require('bitcoin3js');
const { isHexString } = require('../../utils');
const { fetchEsBtcSellOrders, getEsAmountFromBTC } = require('../probit/utils');

const provider = new bitcoin.providers.BlockcypherProvider(
  process.env.NODE_ENV === 'production' ? 'btc' : 'test3',
  'c29426c605e541bea307de3a54d94fcf'
);

const updateBlockTransactions = async newBlockNumber => {
  // check if the block already exists in the database
  // if no its ok, but if yes then remove data of older ones
  // create models: check block inserted in btcBlocks and deposits, delete rows for the blocknumber
  await bitcoinModel.removeBlockAndTransactionsIfExists(newBlockNumber);

  // add the new block number and blockhash to database
  const block = await provider.getBlock(newBlockNumber);
  // console.log({block});

  // gets transactions specifically to our deposit wallet address in this block
  let transactionsArray = await provider.getTransactions(process.env.BITCOINES_DEPOSIT_WALLET, {
    fromBlock: newBlockNumber,
    toBlock: newBlockNumber
  });
  // console.log({transactionsArray});

  // sanitize block hash, transaction hash, block height and transaction value before passing.
  if(block.hash.slice(0,2) !== '0x') {
    block.hash = '0x'+block.hash;
    if(!isHexString(block.hash)) {
      console.log('Not a hex string (!isHexString(block.hash)): '+block.hash);
      // make arrangement for some error since this is error from blockcypher side
      // also check typeof hash before if it's a string else the code will give error
      return; // stopping this function
    }
  }

  // IMP it has to be checked that every transaction is a receiving transaction and not sending transaction.

  transactionsArray = transactionsArray.map(transaction => {
    let tx_hash = transaction.tx_hash;
    let value = transaction.value;

    if(typeof tx_hash !== 'string') {
      console.log('Not a hex string (typeof tx_hash !== \'string\'):',tx_hash);
      return null;
    }
    if(tx_hash.slice(0,2) !== '0x') {
      tx_hash = '0x'+tx_hash;
    }
    if(!isHexString(tx_hash)) {
      console.log('Not a hex string (tx_hash.slice(0,2) !== \'0x\'):',tx_hash);
      return null;
    }
    if(typeof value !== 'number') {
      console.log('value should be number (typeof value !== \'number\'):', value);
      return null;
    }

    return { tx_hash, value };
  }).filter(t => t !== null);

  // console.log({blockNumber: newBlockNumber, 'block.hash': block.hash, transactionsArray});
  // adds the block to btcBlock table as well as transactions if any to btcDeposits
  await bitcoinModel.insertBlock(newBlockNumber, block.hash, transactionsArray);
};

const updateEsAmount = async() => {
  console.log('updating es amount');
  const depositedRequests = await bitcoinModel.getBtcDepositedRequests();
  if(depositedRequests.length) {
    const orderBook = await fetchEsBtcSellOrders();
    await Promise.all(depositedRequests.map(async request => {
      const btcAmount = request.satoshiAmount / 10**8;
      const esAmount = getEsAmountFromBTC(btcAmount, orderBook);
      await bitcoinModel.updateEsAmountOfRequest(request.id, esAmount);
    }));
  }
  return depositedRequests.length;
};

provider.on('block', async newBlockNumber => {
  console.log('\n\nNew bitcoin block', newBlockNumber);
  if(typeof newBlockNumber !== 'number') {
    console.log('Invalid New BlockNumber (typeof newBlockNumber !== \'number\')', newBlockNumber);
    return;
  }

  // check if block already exist, add transaction replace transactions
  await updateBlockTransactions(newBlockNumber);

  // now time to mark transactions who have got enough confirmations as resolved
  // check if last 6th block has the same blockhash with real and in database
  // if same then simply run allocateDeposits functions passing the last 6th block number
  // if there is a miss match, then remove all blocks from that as well as remove transactons.
  // then run new block number for all blocks following that upto this block

  const confirmedBlockHeight = newBlockNumber - (process.env.BITCOINES_BLOCK_CONFIRMATIONS || 6);
  console.log({confirmedBlockHeight});
  const confirmedDbBlock = await bitcoinModel.getBlock(confirmedBlockHeight);

  if(confirmedDbBlock === null) return;

  // checking if there are no reorgs
  const actualConfirmedBlock = await provider.getBlock(newBlockNumber);
  if(actualConfirmedBlock.hash.slice(0,2) !== '0x') {
    actualConfirmedBlock.hash = '0x'+actualConfirmedBlock.hash;
  }
  if(actualConfirmedBlock.hash.toLowerCase() !== confirmedDbBlock.blockHash.toLowerCase()) {
    // there were reorgs, updating database from confirmedBlockHeight to current - 1
    console.log(`Reorg found at ${confirmedBlockHeight}: ${confirmedDbBlock.blockHash.toLowerCase()} to ${actualConfirmedBlock.hash.toLowerCase()}\nupdating database...`);
    for(let i = confirmedBlockHeight; i < newBlockNumber; i++) {
      console.log('updating db block',i);
      await updateBlockTransactions(i);
    }
  }
  console.log('Allocating deposits with waiting requests...');
  const result = await bitcoinModel.allocateDeposits(confirmedBlockHeight);
  console.log(`Done: ${result.affectedRows} allocated\n`);

  console.log('Calculating ES for BTC...');
  const countOfRequestsUpdated = await updateEsAmount();
  console.log(countOfRequestsUpdated
    ? `Updated ES Amount for ${countOfRequestsUpdated} requests.`
    : 'No request updated'
  );
});
