const { ethers } = require('ethers');
const provider = new ethers.getDefaultProvider();
const tbtcContract = require('@keep-network/tbtc/artifacts/TBTCToken.json');
const tbtcAddress = '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa';

const contract = new ethers.Contract(tbtcAddress, tbtcContract.abi, provider);
let dailyVolume = 0;
module.exports = {
  name: 'tbtcvolume',
  description: 'get the total daily volume of tBTC transfers',
  async execute(message) {
    const txs = await contract.queryFilter('Transfer', -5760);
    let i;
    for (i = 0; i < txs.length; i++) {
      const txValue = txs[i].args.value._hex;
      const readable = ethers.utils.formatEther(txValue);
      dailyVolume += parseFloat(readable);
    }
    message.channel.send(
      `Total tBTC Transaction Volume in the last 24hr: ${dailyVolume} tBTC`
    );
  },
};
