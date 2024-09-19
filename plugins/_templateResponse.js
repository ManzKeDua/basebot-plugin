/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const { proto, generateWAMessage, areJidsSameUser } = require('@whiskeysockets/baileys');
module.exports.all = async function(m, chatUpdate) {
if (m.isBaileys) return;
if (!m.message) return;
if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage || m.message.pollUpdateMessage || m.message.editedMessage)) return;
// Safely extract message text or ID
let id = (m.mtype === 'conversation') ? m.message.conversation :
(m.mtype === 'imageMessage') ? m.message.imageMessage?.caption :
(m.mtype === 'videoMessage') ? m.message.videoMessage?.caption :
(m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage?.text :
(m.mtype === 'buttonsResponseMessage') ? m.message.buttonsResponseMessage?.selectedButtonId :
(m.mtype === 'listResponseMessage') ? m.message.listResponseMessage?.singleSelectReply?.selectedRowId :
(m.mtype === 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage?.selectedId :
(m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}').id :
(m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text) :
(m.mtype === 'editedMessage') ? m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text :
'';
// Check if 'id' is valid to prevent further errors
if (!id) {
console.error('Failed to extract message content');
return;
}
let messages = await generateWAMessage(m.chat, { text: id, mentions: m.mentionedJid || [] }, {
userJid: this.user.id,
quoted: m.quoted && m.quoted.fakeObj
});
messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
messages.key.id = m.key.id;
messages.pushName = m.name;
if (m.isGroup) {
messages.key.participant = messages.participant = m.sender;
}
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)].map(v => (v.conn = this, v)),
type: 'append'
};
this.ev.emit('messages.upsert', msg);
};