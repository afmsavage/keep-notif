const Web3 = require('web3');
require('dotenv').config({ path: '../.env' });
const web3 = new Web3('https://cloudflare-eth.com'); // `wss://mainnet.infura.io/ws/v3/${process.env.INFURA}`);

const tdtContract = require('@keep-network/tbtc/artifacts/TBTCDepositToken.json');
const axios = require('axios').default;
const tdtAddress = process.env.MAINTDT;
console.log(tdtAddress);
// gets tBTC supply
// const getSupply = async () => {
//   const contract = new web3.eth.Contract(tdtContract.abi, tdtAddress);
//   const total = await contract.methods.totalSupply().call();
//   return web3.utils.fromWei(total);
// };

// module.exports = {
//   name: 'tdtsupply',
//   description : 'get the total supply of TDT',
const tony = async () => {
  const contract = new web3.eth.Contract(tdtContract.abi, tdtAddress);
  await contract.events
    .allEvents(
      {
        filter: { myIndexedParam: [20, 23] }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
      },
      (error, event) => {
        console.log(event);
      }
    )
    .on('data', (event) => {
      console.log(event); // same results as the optional callback above
    })
    .on('changed', (event) => {
      // remove event from local database
    })
    .on('error', console.error);

  // message.channel.send(web3.utils.fromWei(total));
};
tony();
// };
