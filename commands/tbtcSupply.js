const Web3 = require('web3');
require('dotenv').config();
const web3 = new Web3('https://cloudflare-eth.com'); // `wss://mainnet.infura.io/ws/v3/${process.env.INFURA}`);

const tbtcContract = require('@keep-network/tbtc/artifacts/TBTCToken.json');
const tbtcAddress = process.env.MAINTTBTC;

// gets tBTC supply
// const getSupply = async () => {
//   const contract = new web3.eth.Contract(tbtcContract.abi, tbtcAddress);
//   const total = await contract.methods.totalSupply().call();
//   return web3.utils.fromWei(total);
// };

// module.exports = { getSupply };

module.exports = {
  name: 'tbtcsupply',
  description : 'get the total supply of tBTC',
  async execute(message) {
    const contract = new web3.eth.Contract(tbtcContract.abi, tbtcAddress);
    const total = await contract.methods.totalSupply().call();
    message.channel.send(web3.utils.fromWei(total));
  }

};