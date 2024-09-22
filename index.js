const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! Send me a link to open it in web app');
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id; 
    const text = msg.text;

    if (text.startsWith('http://') || text.startsWith('https://')) {
        const websiteUrl = text;

        const options = {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🤚🏻 Web app",
                            web_app: {
                                url: `${websiteUrl}?telegramUserId=${userId}`, 
                            },
                        },
                    ],
                ],
            },
        };

        bot.sendMessage(chatId, 'Press button to open webapp', options);
    } else {
        bot.sendMessage(chatId, 'Please, send correct link');
    }
});

console.log('Bot started');
