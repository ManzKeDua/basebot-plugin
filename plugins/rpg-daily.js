/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const rewards = {
  exp: 9999,
  money: 4999,
  potion: 5,
}
const cooldown = 86400000
let handler = async (m,{ conn} ) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) throw `You have already claimed this daily claim!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
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
body: "Daily Claim",
thumbnailUrl: "https://telegra.ph/file/b1a1ca67839bcc3ee7fcb.jpg",
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}})
  user.lastclaim = new Date * 1
}
handler.help = ['daily', 'claim']
handler.tags = ['rpg']
handler.command = /^(daily|claim)$/i

handler.cooldown = cooldown

module.exports = handler