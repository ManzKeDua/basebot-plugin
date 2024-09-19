/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const rewards = {
    exp: 50000,
    money: 49999,
    potion: 10,
    mythic: 3,
    legendary: 1
}

const cooldown = 2592000000
let handler = async (m) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.lastmonthly < cooldown) throw `You have already claimed this monthly claim, wait for *${((user.lastmonthly + cooldown) - new Date()).toTimeString()}*`
    let text = ''
    for (let reward of Object.keys(rewards)) if (reward in user) {
        user[reward] += rewards[reward]
        text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`
    }
    conn.sendMessage(m.chat, {
text: text.trim(),
contextInfo: {
externalAdReply: {
title: `manz - wabot Rpg Event`,
body: "Monthly Claim",
thumbnailUrl: "https://telegra.ph/file/c9cd67fa632b8517f2ebb.jpg",
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}})
    user.lastmonthly = new Date * 1
}
handler.help = ['monthly']
handler.tags = ['rpg']
handler.command = /^(monthly)$/i

handler.cooldown = cooldown

module.exports = handler