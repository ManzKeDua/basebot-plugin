/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let set = global.db.data.settings[conn.user.jid]
  let type = (args[0] || '').toLowerCase()

  let isAll = false
  let isUser = false

  switch (type) {
    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    default:
      if (!/[01]/.test(command)) {
        return m.reply(`
- List Option

> | on public
> | off public
`.trim())
      }
      throw false
  }
  m.reply(`${type} telah di ${isEnable ? 'nyalakan' : 'matikan'}`)
}

handler.help = ['enable']
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler