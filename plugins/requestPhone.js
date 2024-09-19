/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
let handler = async (m, {conn}) => {
await conn.relayMessage(m.chat, {requestPhoneNumberMessage: {
}},{})
}
handler.command = ['bajindul']
module.exports= handler