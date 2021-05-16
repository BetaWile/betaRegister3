const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const Settings = require("../Settings/Settings.json");

var prefix = Settings.BotSettings.prefix;

module.exports = client => {
client.user.setPresence({ activity: { name: `B$T4 | v12 - Register Bot`}, status: 'dnd'})
console.log(
  `[OLUMLU] BOT: ${
    client.user.username
  } ismi ile giriş yapıldı!`
);
console.log(
  `[OLUMLU] BOT: Aktif, Komutlar yüklendi!`
);
};