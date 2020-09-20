require('dotenv').config({ path: '../.env' });
const { ethers } = require('ethers');
const provider = new ethers.providers.InfuraProvider(
  'homestead',
  process.env.INFURA
);

const tbtcContract = require('@keep-network/tbtc/artifacts/TBTCToken.json');
const tbtcAddress = process.env.MAINTBTC;

module.exports = {
  name: 'tbtcdailytransfers',
  description: 'get the total daily transfers of tBTC',
  async execute(message) {
    const contract = new ethers.Contract(
      tbtcAddress,
      tbtcContract.abi,
      provider
    );
    const txs = await contract.queryFilter('Transfer', -5760);
    message.channel.send(
      `Total tBTC Transactions in the last 24hr: ${txs.length}`
    );
  },
};
