const axios = require('axios').default;
require('dotenv').config();
const web3 = require('web3');

const Discord = require('discord.js'); // https://discord.js.org/
const client = new Discord.Client();

const permissions = '67177536';
const tbtcContractAddr = '0x1bBE271d15Bb64dF0bc6CD28Df9Ff322F2eBD847';
const tokenInfoUrl = `https://api.ethplorer.io/getTokenInfo/${tbtcContractAddr}?apiKey=freekey`;
//const topTenUrl = `https://api.ethplorer.io/getTopTokenHolders/${tbtcContractAddr}?apiKey=freekey`

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === '!help') {
    msg.channel.send(`Available commands: !tbtc, !stats, !help`);
  }
  else if (msg.content === '!stats') {
    axios
      .get(tokenInfoUrl)
      .then(function (response) {
        var totalTbtc = web3.utils.fromWei(response.data.totalSupply);
        var totalHolders = response.data.holdersCount;

        console.log(totalTbtc);
        msg.reply(`
        Total tBTC in existence: ${totalTbtc}
        Amount of tBTC Holders: ${totalHolders}
        Etherscan Link to tBTC Contract: https://etherscan.io/address/0x1bbe271d15bb64df0bc6cd28df9ff322f2ebd847`
        );
      })
      .catch(function (error) {
        msg.reply("Well that's funky, seem to have run into an error with that request.  Please try again")
        console.log(error);
      });
  }
  else if (msg.content === '!tbtc') {
    axios
      .get(tokenInfoUrl)
      .then(function (response) {
        var totalTbtc = web3.utils.fromWei(response.data.totalSupply);
        console.log(totalTbtc);
        msg.reply(`Total tBTC in existence: ${totalTbtc}`).supressEmbeds(true);
      })
      .catch(function (error) {
        msg.reply("Too much tBTC for me to handle I guess, please try again")
        console.log(error);
      });
  }
});

client.login(process.env.BOTTOKEN);
