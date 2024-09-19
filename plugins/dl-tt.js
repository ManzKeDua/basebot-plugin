/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
let { ttdl } = require('btch-downloader')

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `• *Example :* .tiktok https://vm.tiktok.com/xxxxxxxxxxxxxx`, m);
  }
  if (!text.match(/tiktok/gi)) {
    return conn.reply(m.chat, 'Make sure the link is from TikTok', m);
  }
  m.reply('Prosess....');
  try {
    let p = await ttdl(`${text}`);
    await conn.sendFile(m.chat, p.video, 'tiktok.mp4', p.title, m);
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['tiktok <url>']
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i;
handler.limit = false;
handler.group = false;

module.exports = handler;