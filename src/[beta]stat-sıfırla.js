const { MessageEmbed, Client, Message, DiscordAPIError } = require("discord.js");
const db = require("quick.db");
const Settings = require("../Settings/Settings.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.ustyetki)) return;

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!user) return message.channel.send(new MessageEmbed().setDescription("Bir üyeyi etiketlemelisin.")).then(x => x.delete({ timeout: 5000 }));
  let check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send(new MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })).setColor("RED").setDescription("Bu üyenin herhangi sıfırlanacak bir kayıt verisine ulaşamadım."))

 db.delete(`${message.author.id}.kadın`)
 db.delete(`${message.author.id}.erkek`)
 db.delete(`${message.author.id}.toplam`)

 const embed = new MessageEmbed()
  .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`${user} Adlı kullanıcının kayıt verileri sıfırlandı.`)
  .setTimestamp()
  .setColor(Settings.Colors.Gold)
  message.channel.send(embed)
};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};
module.exports.help = {
  name: 'stat-sıfırla'
};