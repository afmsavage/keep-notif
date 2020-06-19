
require('dotenv').config() // process.env.xxx

const BlocknativeSDK = require('bnc-sdk'); // https://docs.blocknative.com/notify-sdk
const WebSocket = require('ws');
const Web3 = require('web3');

// create options object
const options = {
  dappId: process.env.APIKEY,
  networkId: 3, //ropsten, 1 for mainnet
  //system: 'bitcoin' // optional, defaults to ethereum
  transactionHandlers: [event => console.log(event.transaction)],
  ws: WebSocket // only neccessary in server environments
  name: 'tBTC' // optional, use when running multiple instances
}

// initialize and connect to the api
const blocknative = new BlocknativeSdk(options)

