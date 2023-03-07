require("dotenv").config();

const authSDK = require('api')('@telco/v1.0#qcnrk1l07o6jm6');
const deviceSDK = require('api')('@telco/v1.0#41q6o2rzldx8607a');

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

const parseData = async (deviceDataArr) => {
  const combinedDataArr = [];
  for (deviceData of deviceDataArr) {
    combinedDataArr.push(deviceData);
    const isOnline = await deviceSDK.getAccountsAccount_idFaxAtasMac_addressStatus({account_id: accountID, mac_address: deviceData.mac_address});
    const idx = combinedDataArr.length - 1;
    combinedDataArr[idx].isOnline = isOnline.data.is_online;
  };
  return new Promise((resolve) => {
    resolve(combinedDataArr);
  })
}

const faxATAsOnline = async () => {
  const response = await authSDK.obtainAccessToken(options);
  const token = response.data.access_token;
  deviceSDK.auth(token);
  const data = await deviceSDK.getAccountsAccount_idFaxAtas({account_id: accountID});
  const finalArr = await parseData(data.data);
  console.log(finalArr);
  }

  faxATAsOnline();




