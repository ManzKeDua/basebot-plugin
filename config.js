const fs = require("fs");
const chalk = require("chalk");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// Owner
global.owner = [
  ['6288989721627', 'manz xxx.xom', 'kntot@g.c', true]
]

global.APIs = { 
  tixo: 'https://api-nightmares.my.id'
}

global.APIKeys = {
  'https://api-nightmares.my.id': 'Tio'
}

global.setting = {
  clear: false,
  addReply: false
}

global.info = {
  nameBot: 'manz base',
  nameOwn : 'manz xxx.com',
  nomerOwn : '6288989721627',
  pairingNumber: '6281553739609',
  packname : 'sticker by ',
  author : 'manz xxx.com',
  namebot : '乂 manz - wabot',
  wm : 'manz - wabot',
  stickpack : 'manz - wabot',
  stickauth : 'manz - wabot'
}

global.url = {
 sig: 'https://instagram.com/iqstore78',
 sgh:  'https://github.com/iqstore78',
 sgc: 'https://chat.whatsapp.com/',
 thumb: 'https://telegra.ph/file/676225f4b61fd679bb9c3.jpg',
}
// Info Wait
global.msg = {
 wait: '```waiting....```',
 eror: 'opssss eror..',
 danied: 'not for you'
}

global.api = require('./lib/scraper/api.js')

global.multiplier = 1000

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    };
    let results = Object.keys(emot).filter(v => new RegExp(v, 'gi').test(string));
    if (!results.length) return '';
    else return emot[results[0]];
  }
}

/**
Context info
**/

global.adReply = {
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    "newsletterJid": "120363312614881950@newsletter",
                    "serverMessageId": 103,
                    "newsletterName": info.nameBot

                },
                externalAdReply: {
                    showAdAttribution: true,
                    title: info.nameBot,
                    body: '',
                    previewType: "PHOTO",
                    thumbnailUrl: url.thumbnail,
                    sourceUrl: url.sgc,

                }
            }
        }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
  
      