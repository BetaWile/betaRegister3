const Discord = require("discord.js");
const Settings = require("../Settings/Settings.json");
module.exports = client => {
client.user.setPresence({ activity: { name: `B$T4 | v12 - Register Bot`}, status: 'dnd'})
console.log(`BOT: Aktif, Komutlar yüklendi!`);
};