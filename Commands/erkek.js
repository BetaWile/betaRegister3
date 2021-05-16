const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.Registerer)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

const sıra = await db.fetch('case')
const emoji = message.guild.emojis.cache.find(r => r.name === (Other.EmojiGeneral.Emojiİsim)) 
const reglog = message.guild.channels.cache.find(r => r.id === (Settings.Channels.RegisterLog))
const tag = Settings.ServerSettings.Tag;

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  let uyarıembed = new MessageEmbed().setColor(Settings.Colors.Red).setTimestamp()
  if (!user) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişiyi etiketlemelisin.")).then(x => x.delete({ timeout: 4000 }));
  if (!isim) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin ismini yazmalısın.")).then(x => x.delete({ timeout: 4000 }));
  if (!yaş) return message.channel.send(uyarıembed.setDescription("İsmini değiştireceğin kişinin yaşını yazmalısın.")).then(x => x.delete({ timeout: 4000 }));

user.setNickname(`${tag} ${isim} | ${yaş}`)
user.roles.add(Settings.Roles.BoyRole1)
user.roles.add(Settings.Roles.BoyRole2)
user.roles.remove(Settings.Roles.Unregister)
db.add(`sayı.${user.id}`, +1)
await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yaş,
    Rol: Settings.Roles.BoyRole1
  });

  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.erkek`, +1)
  db.add('case', 1)
  let toplam = await db.get(`${message.author.id}.toplam`)
  let x = await db.get(`isimler.${user.id}`)
  let isimler = x.length > 0 ? x.map((value, index) => `**${index + 1})** \`${value.Name} | ${value.Age}\` (${value.Rol})`).join(`\n`) : "Bu Kullanıcının Önceden Bulunan Bir İsmi Yok.";
  let embed = new MessageEmbed()
    .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
    .setColor(Settings.Colors.Green)
    .setDescription(`• ${user}, <@${message.author.id}> Tarafından Kaydedildi.
    • ${user} Kişisinin Adı \`${isim} | ${yaş}\` Olarak Değiştirildi.
    • <@&${Settings.Roles.BoyRole1}>, <@&${Settings.Roles.BoyRole2}> Başarıyla Verildi.`)
.setFooter(`${message.author.username} Yetkilisinin Toplam ${toplam} Kaydı Oldu.`)
.setTimestamp()
message.channel.send(embed)
message.react(emoji)

const log = new MessageEmbed()
.setAuthor(messsage.author.username, message.author.avatarURL({ dynamic: true }))
.addField("Kullanıcı", `${user}`)
.addField("Yetkili", `${message.author}`)
.addField("İsim", `\`${isim} ${yaş}\``)
.setColor(Settings.Colors.Blue)
await reglog.send(log)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};
exports.help = {
    name: "erkek"
};