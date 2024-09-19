/*####################################

               

              manz - wabot

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

const fs = require('fs').promises;
const path = require('path);

const FILE_PATH = path.resolve('./system/menfess.json');

// Membaca data dari file JSON
const readMenfessData = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {}; // Jika file tidak ada atau error, kembalikan objek kosong
    }
};

// Menulis data ke file JSON
const writeMenfessData = async (data) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};

// Normalisasi nomor telepon ke format @s.whatsapp.net
const normalizeNumber = (number) => {
    return number.includes('@s.whatsapp.net') ? number : number + '@s.whatsapp.net';
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (m.isGroup) {
        return m.reply('Command ini tidak dapat digunakan di dalam grup. Silakan gunakan di chat pribadi.');
    }

    conn.menfess = await readMenfessData();

    if (text.startsWith("start ")) {
        let cleanedNumber = text
            .replace(/^\+/, '') // Menghapus tanda +
            .replace(/[^\d]/g, ''); // Menghapus semua non-digit

        if (!cleanedNumber || cleanedNumber.length < 10) {
            return m.reply(global.try + `Tolong berikan nomor telepon yang valid.\nContoh: ${usedPrefix}${command} start +6281234567890`);
        }

        let normalizedSender = normalizeNumber(m.sender);
        let normalizedNumber = normalizeNumber(cleanedNumber);

        conn.menfess[normalizedSender] = { number: normalizedNumber, timeout: Date.now() + 3600000 }; // Timeout 1 jam
        conn.menfess[normalizedNumber] = { number: normalizedSender, timeout: Date.now() + 3600000 }; // Menyimpan sesi dari nomor tujuan
        await writeMenfessData(conn.menfess);

        // Kirim notifikasi ke nomor tujuan
        try {
            await conn.sendMessage(
                normalizedNumber, // Menggunakan nomor yang dinormalisasi
                { text: 'Ada yang mau menfessin kamu nih :v,balasan kamu akan terkirim' }
            );
        } catch (error) {
            m.reply(global.eror + `Gagal mengirim notifikasi: ${error.message}`);
        }

        return m.reply(`[ ✓ ] Sesi Menfess dimulai dengan nomor ${cleanedNumber}.`);
    } else if (text.startsWith("stop")) {
        let normalizedSender = normalizeNumber(m.sender);
        
        if (conn.menfess[normalizedSender]) {
            let targetNumber = conn.menfess[normalizedSender].number;

            // Hapus sesi untuk pengirim dan nomor tujuan
            delete conn.menfess[normalizedSender];
            delete conn.menfess[targetNumber];
            await writeMenfessData(conn.menfess);

            // Kirim notifikasi ke nomor tujuan bahwa sesi telah diakhiri
            try {
                await conn.sendMessage(
                    targetNumber,
                    { text: 'Sesi Menfess dengan kamu telah diakhiri.' }
                );
            } catch (error) {
                m.reply(global.eror + `Gagal mengirim notifikasi: ${error.message}`);
            }

            return m.reply("[ ✓ ] Sesi Menfess diakhiri.");
        } else {
            return m.reply("[ ✓ ] Tidak ada sesi Menfess aktif.");
        }
    }

    m.reply(global.eror + 'Format command salah. Gunakan `.menfess start <nomor>` untuk memulai atau `.menfess stop` untuk mengakhiri sesi.');
};

handler.before = async (m, { conn }) => {
    conn.menfess = await readMenfessData();

    let normalizedSender = normalizeNumber(m.sender);

    if (conn.menfess[normalizedSender] && conn.menfess[normalizedSender].timeout) {
        if (Date.now() > conn.menfess[normalizedSender].timeout) {
            delete conn.menfess[normalizedSender];
            await writeMenfessData(conn.menfess);
            m.reply(global.eror + 'Sesi Menfess telah kedaluwarsa. Silakan mulai sesi baru.');
            return;
        }
    }

    if (m.isGroup) {
        return; // Tidak melakukan apapun jika pesan berasal dari grup
    }

    if (m.text.startsWith('.')) {
        return;
    }

    if (conn.menfess[normalizedSender]) {
        let targetNumber = conn.menfess[normalizedSender].number;

        try {
            await conn.relayMessage(
                targetNumber,
                m.message,
                { messageId: m.messageId }
            );

            await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });
        } catch (error) {
            m.reply(global.eror + `Gagal meneruskan pesan: ${error.message}`);
        }
    }
};

handler.help = ['menfess *<start/stop> <nomor>*'];
handler.tags = ['menfess'];
handler.command = /^menfess$/i;

module.exports = handler;