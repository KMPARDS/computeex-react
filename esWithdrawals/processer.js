const ethers = require('ethers');
const provider = ethers.getDefaultProvider(
  process.env.NODE_ENV === 'production'
  ? 'homestead'
  : 'kovan'
);
const wallet = (new ethers.Wallet(process.env.WITHDRAW_PRIVATE_KEY || '24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA')).connect(provider);

const contractAbi = [{"constant":!1,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":!1,"stateMutability":"nonpayable","type":"function"}];

const tokenContract = new ethers.Contract(
  process.env.NODE_ENV === 'production'
    ? '0xef1344bdf80bef3ff4428d8becec3eea4a2cf574'
    : '0x53E750ee41c562C171D65Bcb51405b16a56cF676',
  contractAbi,
  wallet
);

console.log('Processing withdrawals from:', wallet.address);

const bitcoinModel = require('../models/bitcoinEs/bitcoinEs');
const upholdModel = require('../models/uphold/uphold');

let processingWithdrawals = false;

const processWithdrawals = async() => {
  processingWithdrawals = true;

  const bitcoinEsWithdrawals = await bitcoinModel.getEsPendingRequests();
  // console.log({bitcoinEsWithdrawals});
  const upholdEsWithdrawals = await upholdModel.getReceivedTransfers();
  console.log({upholdEsWithdrawals});

  const pendingWithdrawals = [];

  for(const entry of bitcoinEsWithdrawals) {
    pendingWithdrawals.push({
      db: 'bitcoinEs',
      id: entry.id,
      esAddress: '0x' + entry.esAddress.toString('hex'),
      esAmount: String(entry.esAmountTwoDec / 100)
    });
  }

  for(const entry of upholdEsWithdrawals) {
    pendingWithdrawals.push({
      db: 'uphold',
      id: entry.transactionId,
      esAddress: entry.walletAddress,
      esAmount: String(entry.esAmount)
    });
  }

  if(pendingWithdrawals.length) {
    console.log('\nProccessing ES Withdrawals...');
  } else {
    processingWithdrawals = false;
    return;
  }

  // @audit nonce++ ??
  // starting withdrawal
  let nonce = await wallet.getTransactionCount();
  let processedWithdrawal = 0;

  for(const entry of pendingWithdrawals) {
    try {
      const tx = await tokenContract.functions.transfer(
        entry.esAddress,
        ethers.utils.parseEther(entry.esAmount),
        {
          nonce,
          gasPrice: ethers.utils.parseUnits(process.env.ETH_TRANSACTION_GWEI || '20', 'gwei')
        }
      );
      console.log('tx.hash', tx.hash);

      if(entry.db === 'bitcoinEs') {
        await bitcoinModel.updateEsWithdrawalTxHash(entry.id, tx.hash);
      } else if(entry.db === 'uphold') {
        await upholdModel.updateTxHash(entry.id, tx.hash);
      }
      processedWithdrawal++;
      nonce++;
    } catch (error) { console.error(error) }
  }

  processingWithdrawals = false;
  console.log(`Processed Withdrawals: ${processedWithdrawal}\n`);
}

setInterval(() => {
  if(!processingWithdrawals) {
    processWithdrawals();
  }
}, 10000);
