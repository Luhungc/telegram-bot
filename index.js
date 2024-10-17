const { Telegraf } = require('telegraf');
const config = require('./config');
const cmdbot = require('./cmdbot');

const bot = new Telegraf(config.token);

//bot.telegram.sendMessage(config.ownerID, `Bot ${config.botname} telah aktif`);

bot.on('text', async (ctx) => {
    const messageText = ctx.message.text;
    cmdbot.handleCommand(messageText, ctx);
});

bot.launch().then(() => {
    console.log('Bot terhubung ke Telegram!');
});