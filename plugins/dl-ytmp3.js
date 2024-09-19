/*####################################

               

              manz - wabot

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

/*
*PLAY AUDIO/playa* 
*Jangan di hapus bejirr,cape" buat
*By @Ling Xuan @Ponta
*Sumber:https://whatsapp.com/channel/0029ValSH6n7dmeVvtZU0K2S
*/

const { youtube } = require('btch-downloader');
const yts = require('yt-search');
const axios = require('axios'); // Gunakan axios untuk mengambil gambar thumbnail

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw (`*Example:* ${usedPrefix + command} https://www.youtube.com/watch?`);
  m.reply("_Tunggu sebentar kak..._");
  
  try {
    // Lakukan pencarian di YouTube untuk mendapatkan detail video
    const searchResults = await yts(text);
    const video = searchResults.videos[0];

    if (!video) throw '*Video tidak ditemukan, coba dengan link yang lain.*';

    const { title, duration, views, ago, author, thumbnail, url } = video;
    const infoMessage = `🎬 *Detail Video*\n\n` +
                        `📌 *Judul:* ${title}\n` +
                        `⏳ *Durasi:* ${duration.timestamp}\n` +
                        `👁️ *Views:* ${views}\n` +
                        `📅 *Upload:* ${ago}\n` +
                        `✍️ *Author:* ${author.name}\n\n` +
                        `🔄 *Sedang menyiapkan audio...*`;

    // Ambil thumbnail sebagai buffer
    const thumbRes = await axios.get(thumbnail, { responseType: 'arraybuffer' });
    const thumbBuffer = Buffer.from(thumbRes.data, 'utf-8');

    // Kirim informasi detail video dengan thumbnail dan emoji
    await conn.sendMessage(m.chat, {
      text: infoMessage,
      contextInfo: {
        externalAdReply: {
          title: `🎵 ${title}`, // Tambahkan emoji ke judul
          body: `✍️ ${author.name}`, // Tambahkan emoji ke penulis
          thumbnail: thumbBuffer,
          sourceUrl: url, // URL video YouTube
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // Unduh audio dari YouTube
    const data = await youtube(text);

    // Validasi apakah data mengandung properti mp3
    if (!data || !data.mp3) {
      throw new Error('Gagal mendapatkan link audio. Coba dengan link yang lain.');
    }

    const audioMessage = `*🎧 Berhasil mendownload audio YouTube*\n*Powered by PontaDev*`;

    // Kirim audio dari URL
    await conn.sendMessage(m.chat, { 
      audio: { url: data.mp3 }, 
      mimetype: 'audio/mpeg', 
      caption: audioMessage,
      ptt: false // Set true jika ingin mengirim sebagai pesan suara (opsional)
    }, { quoted: m });

  } catch (error) {
    console.error('Error saat mengunduh atau mengirim audio:', error);
    m.reply('*⚠️ Terjadi kesalahan saat mengunduh audio. Pastikan link yang diberikan benar.*');
  }
};

handler.help = ['ytmp3'];
handler.command = ['ytmp3', 'yta', 'ytaudio'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler;