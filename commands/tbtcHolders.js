
require('dotenv').config({ path: '../.env' });
const axios = require('axios').default;
const tbtcAddress = process.env.MAINTBTC;
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
