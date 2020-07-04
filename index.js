
const fs = require('fs');
const axios = require('axios').default;
require('dotenv').config();
const web3 = require('web3');

const Discord = require('discord.js'); // https://discord.js.org/
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = '!';
// https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
const tbtcContractAddr = '0x1bBE271d15Bb64dF0bc6CD28Df9Ff322F2eBD847'; // mainnet
const tokenInfoUrl = `https://api.ethplorer.io/getTokenInfo/${tbtcContractAddr}?apiKey=freekey`;
// const topTenUrl = `https://api.ethplorer.io/getTopTokenHolders/${tbtcContractAddr}?apiKey=freekey`

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
  // sets bot presence
  client.user.setActivity('tBTCStats', {
    game: {
      name: 'tBTC Stats',
      type: 'Watching',
      url: 'https://tbtc.network/',
    },
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // for dealing with args in commands
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content === '!help') {
    message.channel.send(
      'Available commands: !stats, !help, ...more to come!  suggestions welcome!'
    );
  } else if (message.content === '!stats') {
    axios
      .get(tokenInfoUrl)
      .then(function (response) {
        const totalTbtc = web3.utils.fromWei(response.data.totalSupply);
        const totalHolders = response.data.holdersCount;
        console.log(totalTbtc);
        // TODO: Turn into an embed
        message.channel.send(`
Total tBTC in existence: ${totalTbtc}
Amount of tBTC Holders: ${totalHolders}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // else if (message.content === '!tbtc') {
  //   axios
  //     .get(tokenInfoUrl)
  //     .then(function (response) {
  //       var totalTbtc = web3.utils.fromWei(response.data.totalSupply);
  //       console.log(totalTbtc);
  //       // TODO: Turn into an embed
  //       message.channel.send(`Total tBTC in existence: ${totalTbtc}`).supressEmbeds(true);
  //       /* TODO:
  //         - tBTC minted in last 24h
  //         - Liquidations?  need to explore
  //         - amount of TDT tokens in existence
              // - TDT Volume (Luongo)
  //         - transfers today
  //          */
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
});

client.login(process.env.BOTTOKEN);
