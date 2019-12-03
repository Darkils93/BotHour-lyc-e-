const Discord = require('discord.js');
const Client = new Discord.Client();
Client.commands = new Discord.Collection();
const fs = require('fs');
Client.login(process.env.TOKEN)

var prefix = ("ph!");

fs.readdir('./Commandes/', (error, f) => {
  if (error) { return console.error(error); }
      let commandes = f.filter(f => f.split('.').pop() === 'js');
      if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

      commandes.forEach((f) => {
          let commande = require(`./Commandes/${f}`);
          console.log(`${f} commande chargée !`);
          Client.commands.set(commande.help.name,commande);
      });
});

fs.readdir('./Events/', (error, f) => {
  if (error) { return console.error(error); }
      console.log(`${f.length} events chargés`);

      f.forEach((f) => {
          let events = require(`./Events/${f}`);
          let event = f.split('.')[0];
          Client.on(event, events.bind(null, Client));
      });
});


Client.on('ready', function() {
  console.log("----------------------------------------------------------------/ Bot Connecté /");
});
