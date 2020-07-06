const fs = require('fs');
require('dotenv').config();

const Discord = require('discord.js'); // https://discord.js.org/
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

const prefix = '!';
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
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content === '!help') {
    message.channel.send(
      'Available commands: !supply, !txs, !holders, !help, ...more to come!  suggestions welcome!'
    );
  } else if (command === 'holders') {
    client.commands.get('tbtcholders').execute(message, args);
  } else if (command === 'supply') {
    client.commands.get('tbtcsupply').execute(message, args);
  } else if (command === 'txs') {
    client.commands.get('tbtcdailytransfers').execute(message, args);
  }
});

client.login(process.env.BOTTOKEN);
