const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const moment = require("moment")
module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.Registerer)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(embedx.setDescription("Bir Üye Etiketlemen Gerek."))
  let check = await db.has(`isimler.${user.id}`)
  if (check === false) return message.channel.send(new MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })).setDescription("Bu üyenin isim kayıtına ulaşamadım!")).setTimestamp().setColor(Settings.Colors.Red)

  let fetch = await db.get(`isimler.${user.id}`)
  let sayı = await db.get(`sayı.${user.id}`)
  let isimler = fetch.length > 0 ? fetch.map((value, index) => `${index + 1}. \`${value.Name} | ${value.Age}\` (<@&${value.Rol}>)`).join(`\n`) : "Bu üyenin isim kayıtı bulunamadı!";

  const embed = new MessageEmbed()
  .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setTitle(`Bu üyenin toplamda ${sayı} isim kayıtı bulundu:`)
  .setDescription(`${isimler}`)
  .setColor(Settings.Colors.Gold)
  message.channel.send(embed);
};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimler", "eski-isimler"]
};
module.exports.help = {
  name: 'isimler'
};