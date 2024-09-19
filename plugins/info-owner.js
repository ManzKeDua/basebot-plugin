/*####################################

               

              manz - wabot

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

let handler = async (m, {
  conn
}) => {
  conn.sendContact(m.chat, [{
    name: 'Owner',
    number: '6288989721627',
    about: 'Owner & Creator'
  }], m, {
    org: 'Moon Support',
    website: 'https://api.alyachan.pro',
    email: 'contact@moonx.my.id'
 })
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creator']
module.exports = handler