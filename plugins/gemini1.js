/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const axios = require('axios');
const fs = require('fs').promises;
const FILE_PATH = './system/geminiSessions.json';
// Pastikan file ada
const ensureFileExists = async () => {
try {
await fs.access(FILE_PATH);
} catch (error) {
await fs.writeFile(FILE_PATH, JSON.stringify({}, null, 2));
}
};
// Membaca data sesi dari file JSON
const readGeminiData = async () => {
await ensureFileExists();
try {
const data = await fs.readFile(FILE_PATH, 'utf8');
return JSON.parse(data);
} catch (error) {
return {};
}
};
// Menulis data sesi ke file JSON
const writeGeminiData = async (data) => {
await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};
// Proses permintaan API Gemini
async function gemini(options) {
try {
return await new Promise(async (resolve, reject) => {
options = {
model: 'gemini-pro',
messages: options?.messages,
temperature: options?.temperature || 0.9,
top_p: options?.top_p || 0.7,
top_k: options?.top_k || 40,
};
if (!options?.messages) return reject('Payload pesan tidak ada!');
if (!Array.isArray(options?.messages)) return reject('Array pesan tidak valid!');
if (isNaN(options?.top_p)) return reject('Nilai top_p tidak valid!');
if (isNaN(options?.top_k)) return reject('Nilai top_k tidak valid!');
axios.post('https://api.acloudapp.com/v1/completions', options, {
headers: {
authorization: 'sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e'
}
}).then(res => {
const data = res.data;
if (!data.choices[0].message.content) return reject('Gagal mendapatkan pesan respons!');
resolve({
success: true,
answer: data.choices[0].message.content
});
}).catch(reject);
});
} catch (e) {
return {
success: false,
errors: [e]
};
}
}
// Handler utama untuk AI Gemini
const handler = async (m, { conn, text }) => {
if (!text) return m.reply('Masukkan pesan!');
try {
const sender = m.sender;
const currentTime = Date.now();
const sessionTimeout = 600000; // 10 menit dalam milidetik
const geminiData = await readGeminiData();
// Menghapus sesi jika perintah untuk menghentikan sesi dipanggil
if (/^\.gemini stop$/i.test(text.trim())) {
if (geminiData[sender]) {
delete geminiData[sender];
await writeGeminiData(geminiData);
return await conn.sendMessage(m.chat, { text: 'Sesi Gemini Anda telah dihapus.' }, { quoted: m });
} else {
return await conn.sendMessage(m.chat, { text: 'Tidak ada sesi Gemini yang aktif.' }, { quoted: m });
}
}
// Cek dan perbarui sesi
if (geminiData[sender] && (currentTime - geminiData[sender].timestamp <= sessionTimeout)) {
// Perbarui timestamp sesi
geminiData[sender].timestamp = currentTime;
} else {
// Mulai sesi baru
geminiData[sender] = { timestamp: currentTime };
}
await writeGeminiData(geminiData);
// Opsi untuk API Gemini
const options = {
messages: [
{ role: 'system', content: 'Kamu adalah asisten yang membantu.' },
{ role: 'user', content: text } // Mengirim pesan baru
],
temperature: 0.8,
top_p: 0.7,
top_k: 40
};
// Mengirim permintaan ke API Gemini
const res = await gemini(options);
const { answer } = res;
// Mengirim balasan ke pengguna
await conn.sendMessage(m.chat, { text: answer }, { quoted: m });
} catch (e) {
return m.reply('Terjadi kesalahan dalam proses AI Gemini.');
}
};
// Handler.before untuk menangani sesi
handler.before = async (m, { conn, command }) => {
if (!m || !m.sender || !m.text) return; // Pastikan m, m.sender, dan m.text ada
// Periksa apakah pesan merupakan reply ke bot atau tag bot
const isReplyToBot = m.quoted && m.quoted.sender === conn.user.jid;
const isMentioningBot = m.mentionedJid?.includes(conn.user.jid);
if (!isReplyToBot && !isMentioningBot) return; // Jika bukan reply atau mention, abaikan pesan
try {
const geminiData = await readGeminiData(); // Membaca data sesi dari file JSON
const sender = m.sender;
const currentTime = Date.now();
const sessionTimeout = 60000; // 10 menit dalam milidetik
// Periksa apakah sesi pengguna ada
if (geminiData[sender]) {
// Periksa jika sesi masih aktif
if (currentTime - geminiData[sender].timestamp <= sessionTimeout) {
// Perbarui timestamp sesi
geminiData[sender].timestamp = currentTime;
await writeGeminiData(geminiData);
// Kirimkan pesan ke handler utama jika sesi aktif
await handler(m, { conn, text: m.text });
return;
} else {
// Jika sesi sudah kedaluwarsa, hapus sesi
delete geminiData[sender];
await writeGeminiData(geminiData);
}
}
} catch (error) {
console.error('Error di handler.before:', error);
}
};
// Menetapkan command dan tag untuk handler
handler.help = ['gemini1'];
handler.tags = ['ai'];
handler.command = /^(gemini1)$/i;
module.exports = handler;