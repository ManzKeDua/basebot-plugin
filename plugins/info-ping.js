/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
const { performance } = require('perf_hooks')

let manz = async (m, { conn }) => {
    let old = performance.now()
    let neww = performance.now()
    let speed = Math.floor(neww - old)

    m.reply(`🏓 \`Pong! Latency is ${speed}ms\``)
}

manz.help = ['ping']
manz.tags = ['info']
manz.command = ['ping', 'speed', 'bot']

module.exports = manz