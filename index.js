var request = require("request");
var base64 = require('base-64');
var request = require("request");
const fetch = require("node-fetch");

const authHeader = 'Basic ' + base64.encode(`9cba08a4952acdb8:0a695a5ee07205d60d6478723ef2d212`);

var options = {
    method:'GET',
    url:'https://accounts.probit.com/token',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
    },
    body: JSON.stringify({
        grant_type: 'client_credentials'
    })
};

(async () => {
    const resp = await fetch('https://accounts.probit.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify({
            grant_type: 'client_credentials'
        })
    });
    
    // console.log(resp)
    
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }
    
    let data = await resp.json();
    console.log(data.access_token);
    let accesstoken = data.access_token;


    request({
        method: 'POST',
        uri: 'https://api.probit.com/api/exchange/v1/new_order',
        multipart: [
          {
            'content-type': 'application/json',
            authorization: `Bearer ${accesstoken}`,
            body: JSON.stringify({
                "market_id":"BTC-USDT",
                "type":"limit",
                "side":"sell",
                "time_in_force":"gtc",
                "limit_price":"3772.4",
                "quantity":"240"
            })
          }
        ],
        // alternatively pass an object containing additional options
        
      },
      function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
        }
        console.log('Upload successful!  Server responded with:', body);
      })
    
})();



// request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);

// }
// )