const Web3 = require('web3');
require('dotenv').config({ path: require('find-config')('.env') });
const web3 = new Web3('https://cloudflare-eth.com'); // `wss://mainnet.infura.io/ws/v3/${process.env.INFURA}`);

const tbtcContract = require('@keep-network/tbtc/artifacts/TBTCToken.json');
const tbtcAddress = '0x1bbe271d15bb64df0bc6cd28df9ff322f2ebd847';

module.exports = {
  name: 'tbtcsupply',
  description: 'get the total supply of tBTC',
  async execute(message) {
    const contract = new web3.eth.Contract(tbtcContract.abi, tbtcAddress);
    const total = await contract.methods.totalSupply().call();
    message.channel.send(
      `Total ammount of minted tBTC: ${web3.utils.fromWei(total)}`
    );
  },
};
