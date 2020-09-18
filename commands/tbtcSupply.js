require('dotenv').config({ path: '../.env' });
const Web3 = require('web3');
const web3 = new Web3('https://cloudflare-eth.com'); // `wss://mainnet.infura.io/ws/v3/${process.env.INFURA}`);

const tbtcContract = require('@keep-network/tbtc/artifacts/TBTCToken.json');
const tbtcAddress = process.env.MAINTBTC;

module.exports = {
  name: 'tbtcsupply',
  description: 'get the total daily transfers of TDT',
  async execute(message) {
    const contract = new web3.eth.Contract(tbtcContract.abi, tbtcAddress);
    const total = await contract.methods.totalSupply().call();
    message.channel.send(
      `Total amount of minted tBTC: ${web3.utils.fromWei(total)}`
    );
  },
};
