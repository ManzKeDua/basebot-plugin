/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
let handler = m => m

handler.all = async function(m, { conn }) {
    let name = await conn.getName(m.sender)
    
    global.fverif = {
        key: { 
            participant: '0@s.whatsapp.net', 
            remoteJid: "0@s.whatsapp.net"
        }, 
        message: {
            conversation: info.nameBot
        }
    }
    global.fakeig = {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: info.nameBot,
                body: null,
                thumbnailUrl: url.thumb,
                sourceUrl: url.sig
            }
        }
    }
}

module.exports = handler