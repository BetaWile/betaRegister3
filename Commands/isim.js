const { MessageEmbed, Client, Message } = require("discord.js");
module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için yeterli yetkiye sahip olman gerekmekte.`).setColor("GOLD")).then(x => x.delete({ timeout: 5500 }));

  let beta = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  let warning = new MessageEmbed().setColor("GOLD").setTimestamp()
  if (!beta) return message.channel.send(warning.setDescription("İsmini değiştireceğin kişiyi etiketlemelisin.")).then(x => x.delete({ timeout: 7000 }));
  if (!isim) return message.channel.send(warning.setDescription("İsmini değiştireceğin kişinin ismini yazmalısın.")).then(x => x.delete({ timeout: 7000 }));
  if (!yaş) return message.channel.send(warning.setDescription("İsmini değiştireceğin kişinin yaşını yazmalısın.")).then(x => x.delete({ timeout: 7000 }));

  beta.setNickname(`${isim} ${yaş}`)
  const embed = new MessageEmbed()
  .setDescription(`Başarıyla ${beta} üyesinin ismi \`${isim} | ${yaş}\` olarak değişti.`)
  .setColor("GOLD")
  .setTimestamp()
  message.channel.send(embed).then(x => x.delete({ timeout: 5000 }));
};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim", "i"]
};
module.exports.help = {
  name: 'isim'
};