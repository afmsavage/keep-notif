require('dotenv').config();

const { ethers } = require('ethers');
const provider = new ethers.getDefaultProvider();

const tbtcContract = require('@keep-network/tbtc/artifacts/TBTCToken.json');
const tbtcAddress = '0x1bbe271d15bb64df0bc6cd28df9ff322f2ebd847';

module.exports = {
  name: 'tbtcdailytransfers',
  description: 'get the total daily transfers of tBTC',
  async execute(message) {
    const contract = new ethers.Contract(
      tbtcAddress,
      tbtcContract.abi,
      provider
    );
    const txs = await contract.queryFilter('Transfer', -5760000);
    message.channel.send(
      `Total tBTC Transactions in the last 24hr: ${txs.length}`
    );
  },
};
