const { MessageEmbed } = require('discord.js');
const Settings = require("../Settings/Settings.json")

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.ustyetki)) return;

  let users = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!users) return message.channel.send(embedx.setDescription(`Bir Üye Etiketlemelisin.`).setTimestamp().setColor("RED"))
  const unregister = message.guild.roles.cache.find(r => r.id === "Setting.Roles.Unregister")

users.setNickname(Settings.Welcome.WelcomeName)
users.roles.add(Settings.Roles.Unregister);
users.roles.cache.forEach(r => {
users.roles.remove(r.id)
});
  message.channel.send(new MessageEmbed().setDescription(`${users} Adlı Kullanıcı Başarıyla Kayıtsız'a Atıldı.`).setTimestamp().setColor("RED")).then(x => x.delete({ timeout: 4000 }));
};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız"]
};
module.exports.help = {
  name: 'kayıtsız'
};