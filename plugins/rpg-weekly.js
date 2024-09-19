/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const rewards = {
  exp: 15000,
  money: 35999,
  potion: 9,
}
const cooldown = 604800000
let handler = async (m) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastweekly < cooldown) throw `You have already claimed this daily claim!, wait for *${((user.lastweekly + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  conn.sendMessage(m.chat, {
text: text.trim(),
contextInfo: {
externalAdReply: {
title: `manz - wabot Rpg Event`,
body: "Weekly Claim",
thumbnailUrl: "https://telegra.ph/file/ada06f43b1fa1385f3ff3.jpg",
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}})
  user.lastweekly = new Date * 1
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i

handler.cooldown = cooldown

module.exports = handler