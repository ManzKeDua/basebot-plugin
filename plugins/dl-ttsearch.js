/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const fetch = require('node-fetch');
const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys');
let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Searchnya Mana?`;
m.reply('Prosess.....');
try {
let anu = await fetch(`https://ssa-api.vercel.app/api/tiktoksearch?query=${text}`);
let result = await anu.json();
let msgs = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({
text: `*Description:* ${result.data.response.title}`
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: wm
}),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false,
...await prepareWAMessageMedia({ video: { url: `${result.data.response.media.nowm}` } }, { upload: conn.waUploadToServer })
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
"name": "quick_reply",
"buttonParamsJson": `{\"display_text\":\"Next Searching : ${text}\",\"id\":\".ttsearch ${text}\"}`
},
],
})
})
}
}
}, { quoted: m });
return await conn.relayMessage(m.chat, msgs.message, {});
} catch (e) {
conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
type: "audioMessage",
ptt: true,
});
}
};
handler.help = ['ttsearch'];
handler.tags = ['downloader'];
handler.command = /^(ttsearch|ttplay|tiktoksearch)$/i;
handler.limit = true;
module.exports = handler;