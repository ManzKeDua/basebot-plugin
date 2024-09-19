/*####################################

               

              manz - wabot

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

let fs = require('fs');

let handler = async (m, { text, usedPrefix, command }) => {

  if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} menu`;

  if (command === 'sfp') {

    if (!m.quoted.text) throw `balas pesan nya!`;

    let path = `plugins/${text}.js`;

    await fs.writeFileSync(path,`/*####################################

              manz - wabot

             MADE BY MANZKNEZ

✅ WhatsApp: wa.me/6288989721627
#####################################*/` + "\n\n" + m.quoted.text);

    m.reply(`tersimpan di ${path}`);

  } else if (command === 'dfp') {

    let path = `plugins/${text}.js`;

    if (!fs.existsSync(path)) throw `file plugins ${text}.js tidak ditemukan`;

    fs.unlinkSync(path);

    m.reply(`file plugins ${text}.js berhasil dihapus`);

  }

};

handler.help = ['sfp', 'dfp'].map(v => v + ' *[Path]*');

handler.tags = ['owner']

handler.command = /^(sfp|dfp)$/i;

handler.rowner = true;

module.exports = handler;
