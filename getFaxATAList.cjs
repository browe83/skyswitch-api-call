require("dotenv").config();

let sdk = require('api')('@telco/v1.0#qcnrk1l07o6jm6');


const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const username = process.env.SSUSERNAME;
const password = process.env.PASSWORD;
const accountID = process.env.ACCOUNT_ID;
const scope = process.env.SCOPE;

const options = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password,
    scope: scope
};


sdk.obtainAccessToken(options)
  .then(function(response) {
    const token = response.data.access_token;
    sdk = require('api')('@telco/v1.0#41q6o2rzldx8607a');
    sdk.auth(token);
    sdk.getAccountsAccount_idFaxAtas({account_id: accountID})
      .then(function({ data }) {
        console.log("# of Fax ATAs in SS:", data.length);
        const macAddresses = data.map( data => data.mac_address);
        console.log("mac Adresses:", macAddresses);
        } 
      )
      .catch(err => console.error(err));
    }  
  )
  .catch(err => console.error(err));


