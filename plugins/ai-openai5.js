/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
let axios = require('axios');
// MADE BY MPUTZZ DON'T DELETE THIS WM
let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
   if (!text) throw `Use ${usedPrefix + command} hi there, I'm using WhatsApp`;
   conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
try {
    // Helper function to get today's date in the desired format
    function getTodayDate() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" });

        return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`; // No emoji here
    }

    // Adjust the time based on the Asia/Jakarta timezone
    const date = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        })
    );
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Your custom logic for the bot's response
    let logic = `your name is Amelia, you are 17 years old, you are kind and humorous, if someone asks who your creator or developer is, just answer 'name is Putra and at the same time your boyfriend.' Use emojis when answering questions. You are proficient in JavaScript code. If someone asks who you are, you answer 'I am Amelia.' If anyone asks about your time, answer ${timeNow} and ${getTodayDate()}`; // Use function call
    
    // Send request to the OpenAI API
    let res = await openai(text, logic); 
    conn.reply(m.chat, `${res}`, m); 
    conn.sendMessage(m.chat, {
        react: {
            text: '⚡',
            key: m.key,
        }
    });
} catch (e) {
    console.log(e);
    m.reply('404 not found');
}
}

// Export command handler
handler.help = ['gpt-3.5', 'openai5'];
handler.tags = ['ai'];
handler.command = /^(gpt-3.5|openai5)$/i;
handler.limit = true;
handler.register = true;
module.exports = handler;

// OpenAI API call function
async function openai(text, logic) {
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-3.5-turbo-0613",
            "name": "GPT-3.5",
            "maxLength": 12000,
            "tokenLimit": 4000,
            "completionTokenLimit": 2500,
            "deploymentName": "gpt-35"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text,
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, {
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });

    let result = response.data;
    return result;
}