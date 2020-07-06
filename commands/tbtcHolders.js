
require('dotenv').config();
const axios = require('axios').default;
const tbtcAddress = '0x1bbe271d15bb64df0bc6cd28df9ff322f2ebd847';
const tokenInfoUrl = `https://api.ethplorer.io/getTokenInfo/${tbtcAddress}?apiKey=freekey`;

module.exports = {
  name: 'tbtcholders',
  description: 'get the total amount of holders of tBTC',
  async execute(message) {
    axios.get(tokenInfoUrl).then(function (response) {
      const totalHolders = response.data.holdersCount;
      message.channel.send(`Amount of tBTC Holders: ${totalHolders}`);
    });
  },
};
