/*####################################

               

              manz - wabot

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

const yts = require('yt-search');
const axios = require('axios');
const whiskeySockets = require('@whiskeysockets/baileys');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = whiskeySockets.default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(global.try || `• *Example:* ${usedPrefix + command} kucing`);

    await m.reply(global.wait);

    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: { url }
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let push = [];
    let results;
    try {
        results = await yts(text);
    } catch (error) {
        return m.reply(global.error || 'An error occurred while searching.');
    }

    let videos = results.videos.slice(0, 5); // Get top 5 results
    shuffleArray(videos); // Shuffle results

    let i = 1;
    for (let video of videos) {
        let imageUrl = video.thumbnail;

        let buttons;

        if (m.isGroup) {
            // Buttons for group chat
            buttons = [
                {
                    "name": "cta_copy", // Button for audio
                    "buttonParamsJson": JSON.stringify({
                        "display_text": "Audio",
                        "copy_code": `.yta ${video.url}`
                    })
                },
                {
                    "name": "cta_copy", // Button for video
                    "buttonParamsJson": JSON.stringify({
                        "display_text": "Video",
                        "copy_code": `.ytv ${video.url}`
                    })
                }
            ];
        } else {
            // Quick reply buttons for private chat
            buttons = [
                {
                    "name": "quick_reply",
                    "buttonParamsJson": JSON.stringify({
                        display_text: "Music",
                        id: `.yta ${video.url}` // Command to play audio
                    })
                },
                {
                    "name": "quick_reply",
                    "buttonParamsJson": JSON.stringify({
                        display_text: "Video",
                        id: `.ytv ${video.url}` // Command to play video
                    })
                }
            ];
        }

        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `🎬 *Title:* ${video.title}\n⌛ *Duration:* ${video.timestamp}\n👀 *Views:* ${video.views}\n🔗 *Link:* ${video.url}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '乂 Y O U T U B E' // Adjust your watermark
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `Video ke - ${i++}`,
                hasMediaAttachment: true,
                imageMessage: await createImage(imageUrl) // Video thumbnail
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: buttons // Fill buttons with appropriate buttons
            })
        });
    }

    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Hasil pencarian selesai..."
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '乂 Y O U T U B E | @Ling Xuan' // Adjust your watermark
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...push] // Populate carousel with video results
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}

handler.help = ["yts"];
handler.tags = ["downloader"];
handler.command = /^(yts|ytsearch)$/i;

module.exports = handler;