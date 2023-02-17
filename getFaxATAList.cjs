const sdk = require('api')('@telco/v1.0#41q6o2rzldx8607a');
const axios = require('axios');
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const username = process.env.SSUSERNAME;
const password = process.env.PASSWORD;
const accountID = process.env.ACCOUNT_ID;
const scope = process.env.SCOPE;

const options = {
  method: 'POST',
  url: 'https://pbx.skyswitch.com/ns-api/oauth2/token/',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  data: {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password,
    scope: scope
  }
};

console.log("options:", options, "accountID:", accountID);

axios
  .request(options)
  .then(function (response) {
    console.log("token:", response.data.access_token);
    const token = response.data.access_token;
    sdk.auth(token);
    sdk.getAccountsAccount_idFaxAtas({account_id: accountID})
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));
  }) 
  .catch(function (error) {
    console.error(error);
  });

