/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
/*
 * *[AI GEMINI]*
 * https://whatsapp.com/channel/0029VaEGq6MDeON8TGlwWN1Y
*/

const axios = require("axios");

let handler = async(m, { conn, usedPrefix, command, text }) => {
	if (!text) return m.reply(`*Masukkan pesan!*\nContoh: ${ usedPrefix + command } Apa itu AI Gemini?`);
	m.reply('Prosesss.....');
	try {
		const opsi = {
			messages: [
			{
				role: "system",
				content: "Kamu adalah asisten yang membantu."
			},
			{
				role: "user",
				content: text
			}
			],
			temperature: 0.8,
			top_p: 0.7,
			top_k: 40
		}
		
		const res = await gemini(opsi);
		const { answer } = res;
		await conn.sendMessage(m.chat, { text: answer }, { quoted: m });
	} catch (e) {
		return e
	}
}

handler.help = ["gemini"];
handler.tags = ["ai"];
handler.command = /^(gemini|bard)$/i;

module.exports = handler;

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

async function gemini(options) {
  try {
    return await new Promise(async(resolve, reject) => {
      options = {
        model: "gemini-pro",
        messages: options?.messages,
        temperature: options?.temperature || 0.9,
        top_p: options?.top_p || 0.7,
        top_k: options?.top_p || 40,
      }
      if(!options?.messages) return reject("missing messages input payload!");
      if(!Array.isArray(options?.messages)) return reject("invalid array in messages input payload!");
      if(isNaN(options?.top_p)) return reject("invalid number in top_p payload!");
      if(isNaN(options?.top_k)) return reject("invalid number in top_k payload!");
      axios.post("https://api.acloudapp.com/v1/completions", options, {
        headers: {
          authorization: "sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e"
        }
      }).then(res => {
        const data = res.data;
        if(!data.choices[0].message.content) return reject("failed get response message!")
        resolve({
          success: true,
          answer: data.choices[0].message.content
        })
      }).catch(reject)
    })
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}