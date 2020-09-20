require('dotenv').config({ path: '../.env' });
const { ethers } = require('ethers');
const provider = new ethers.providers.InfuraProvider(
  'homestead',
  process.env.INFURA
);

const tdtContract = require('@keep-network/tbtc/artifacts/TBTCDepositToken.json');
const tdtAddress = process.env.MAINTDT;

module.exports = {
  name: 'tdttransfers',
  description: 'get the total daily transfers of TDT',
  async execute(message) {
    const contract = new ethers.Contract(tdtAddress, tdtContract.abi, provider);
    const txs = await contract.queryFilter('Transfer', -5760);
    message.channel.send(`Total TDT Transactions today: ${txs.length}`);
  },
};
