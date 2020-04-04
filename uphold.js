const {
  default: SDK
} = require('@uphold/uphold-sdk-javascript');

let clientId = '6afd79abbf4d5be522fba1a9a3b65e9f10509eb9';
let clientSecret = '6f379ae4c571ff0c95dd7db377a3d74e277b0d12';
let access_token = 'fcd5228429f9eda0631417c3c4e017bc59278645';

const INR_CARD_ID = '29fe7906-378b-4287-b3dc-9237fad928f8';
const BTC_CARD_ID = 'edcd50a5-a3c1-4090-b9a6-c8e9d7fcd2b8';

const INR_CARD_ID_AVEESH = '52aa7459-8d0e-4e4d-a673-00c85040c10b';
const BTC_CARD_ID_AVEESH = '9df8cea8-4118-4fdd-8b65-da6c05bc845e';

if(process.argv[3] === 'aveesh') {
  clientId = '3c0d16ce2706bc3c9923b9718c1432f2c7b25a12';
  clientSecret = '89e1195865c4fa3bfd093d1cf15bfcbf7cedbdc7';
  access_token = 'c8cdc219ed9dee46df22cdeda72c713bf37b0c46';
}

const sdk = new SDK({
  baseUrl: 'https://api-sandbox.uphold.com',
  clientId,
  clientSecret
});

(async() => {

  if(process.argv[2] === 'authorise') {
    (async() => {
      const auth = await sdk.authorize('72e0aa24de7b4776fe3d566047ef2312466de20d');
      console.log({auth});
    })();
    return;
  }

  await sdk.setToken({
    access_token
  });

  if(process.argv[2] === 'bal') {
    const user = await sdk.getMe();
    console.log({currencies: user.balances.currencies});
  }

  if(process.argv[2] === 'user') {
    const user = await sdk.getMe();
    console.log({user});
  }

  if(process.argv[2] === 'currencies') {
    const user = await sdk.getMe();
    console.log({currencies: user.balances.currencies});
  }

  if(process.argv[2] === 'tx') {
    const user = await sdk.getMe();
    console.log({v: user.verifications});
    // const securityCode = user.verifications.identity.code;
    // console.log({currencies: user.balances.currencies});

    // const output = await sdk.getCards();
    const [from, to] = [
      // INR_CARD_ID,
      BTC_CARD_ID_AVEESH,
      BTC_CARD_ID,
      // 'soham@blocklogy.org'
      // 'mzEqBbGFkTpt8saszg6PVeguAxpDaZyfp9'
    ];
    const output = await sdk.createCardTransaction(
      from,
      {
        amount: '0.00005',
        currency: 'BTC',
        destination: to,
        message: 'Buy BTC',
        // securityCode
      },
      true
    );
    console.log('create transaction', output);
  }
})();
