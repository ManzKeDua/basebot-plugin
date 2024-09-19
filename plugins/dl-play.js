/*####################################

               

              manz - wabot

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

const yts = require('yt-search');
const axios = require('axios');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(global.try || `• *Example:* ${usedPrefix + command} kucing`);
await m.reply(info.wait);
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({
image: { url }
}, {
upload: conn.waUploadToServer
});
return imageMessage;
}
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}
let results;
try {
results = await yts(text);
} catch (error) {
return m.reply(global.error || 'An error occurred while searching.');
}
let video = results.videos[0]; // Get the top result
if (!video) return m.reply('No results found.');
let imageUrl = video.thumbnail;
// Quick reply buttons for both group and private chat
let buttons = [
{
"name": "quick_reply",
"buttonParamsJson": JSON.stringify({
display_text: "Music",
id: `.yta ${video.url}` // Command to play audio
})
},
{
"name": "quick_reply",
"buttonParamsJson": JSON.stringify({
display_text: "Video",
id: `.ytv ${video.url}` // Command to play video
})
}
];
const botMessage = {
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `🎬 *Title:* ${video.title}\n⌛ *Duration:* ${video.timestamp}\n👀 *Views:* ${video.views}\n🔗 *Link:* ${video.url}`
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: 'manz - wabot by manzkenz' // Adjust your watermark
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `Video`,
hasMediaAttachment: true,
imageMessage: await createImage(imageUrl) // Video thumbnail
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: buttons // Fill buttons with appropriate buttons
})
};
const bot = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject(botMessage)
}
}
}, {});
await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}
handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(play|song)$/i;
module.exports = handler;
