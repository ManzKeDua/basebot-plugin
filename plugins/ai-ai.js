/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const axios = require('axios');
const handler = async (m, { conn, usedPrefix, command, text }) => {
try {
if (!text) return m.reply(`Masukan prompt! \n\nContoh: \n${usedPrefix + command} Selamat pagi`)
await conn.sendMessage(m.chat, { text: 'Loading...' }, { quoted: m })
let result = await luminAi(text, m.sender, `nama kamu adalah Elaina,pembuatmu adalah ManzKenz,lawan bicaramau adalah ${await conn.getName(m.sender)}, dan kamu menjawab menggunakan bahasa indonesia yang santai`)
await m.reply(result)
} catch (error) {
console.error('Terjadi kesalahan:', error)
}
}
handler.help = ['openai']
handler.tags = ['ai']
handler.command = /^(ai|openai)$/i
handler.limit = true
module.exports = handler
async function luminAi(teks, pengguna = null, prompt = null, modePencarianWeb = false) {
try {
const data = { content: teks }
if (pengguna !== null) data.user = pengguna
if (prompt !== null) data.prompt = prompt
data.webSearchMode = modePencarianWeb
const { data: res } = await axios.post("https://luminai.my.id/", data)
return res.result
} catch (error) {
console.error('Terjadi kesalahan:', error)
throw error
}
}