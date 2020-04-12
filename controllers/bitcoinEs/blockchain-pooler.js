const bitcoinModel = require('../../models/bitcoinEs/bitcoinEs');
const bitcoin = require('/Users/sohamzemse/soham/workspace/blockchain/bitcoin-js');
const { isHexString } = require('../../utils');

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
  console.log({block});

  // gets transactions specifically to our deposit wallet address in this block
  let transactionsArray = await provider.getTransactions(process.env.BITCOINES_DEPOSIT_WALLET, {
    fromBlock: newBlockNumber,
    toBlock: newBlockNumber
  });
  console.log({transactionsArray});

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

  console.log({newBlockNumber, 'block.hash': block.hash, transactionsArray});
  // adds the block to btcBlock table as well as transactions if any to btcDeposits
  await bitcoinModel.insertBlock(newBlockNumber, block.hash, transactionsArray);
};

provider.on('block', async newBlockNumber => {
  console.log('New bitcoin block', newBlockNumber);
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
  if(actualConfirmedBlock.hash.toLowerCase() === confirmedDbBlock.blockHash.toLowerCase()) {
    console.log('allocating deposits');
    await bitcoinModel.allocateDeposits(confirmedBlockHeight);
  } else {
    // there were reorgs, updating database from confirmedBlockHeight to current - 1
    console.log('Reorg found, updating database');
    for(let i = confirmedBlockHeight; i < newBlockNumber; i++) {
      console.log('updating db block',i);
      await updateBlockTransactions(i);
    }
  }
});
