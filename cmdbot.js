const {
	menu
} = require('./lib/menu');
const fetch = require('node-fetch');
const config = require('./config');
const yts = require('yt-search');
const {
	pickRandom, 
	getytid
} = require('./lib/func');
module.exports = {
	handleCommand: (messageText, ctx) => {
		const prefix = config.prefixes.find(p => messageText.startsWith(p));
		if (!prefix) {
			return;
		}
		const commandWithArgs = messageText.slice(prefix.length)
			.trim();
		const [command, ...args] = commandWithArgs.split(/\s+/);
		const text = q = args.join(' ');
		const firstName = ctx.message.from.first_name || '';
		const lastName = ctx.message.from.last_name || '';
		const username = ctx.message.from.username || 'No name';
		const pushname = firstName + ' ' + lastname || 'No name';
		switch (command) {
// ======= Main ==========
		case 'menu':
		case 'allmenu':
		case 'help': {
			let txt = `Hai kak ${pushname} 👋
Berikut list menu yang tersedia
`
			Object.entries(menu)
				.map(([type, command]) => {
					txt += `${Styles(type + ' Menu')}\n\n`;
					txt += `${command.map((v) => `${'> ' + v}`).join('\n')}`;
					txt += '\n\n';
				});
			ctx.reply(txt);
			break;
		}
// ======= Downloader ==========
		case 'yta': {
			if (!text) return ctx.reply('Masukan linknya!');
			const get = await fetch('https://api.ryzendesu.vip/api/downloader/ytmp3?url=' + text)
			const result = get.json();
			let idv = getytid(text)
			let vid = await yts({
				videoId: idv
			})
			ctx.telegram.sendAudio(ctx.chat.id, result.url, {
				caption: `YouTube audio by ${config.botname}
Title: ${vid.title}
Author: ${author.name}
Url: ${text}
Views: ${vid.views}
Duration: ${vid.timestamp}`
			});
			break;
		}
// ======= Fun ==========
		case 'cekkhodam': {
			const khodam = [
				'Harimau',
				'Macan tutul',
				'Singa'
			]
			const res = `Khodam ${text ? text : pushname} adalah: ` + pickRandom(khodam)
			ctx.reply(res)
			break;
		}
// ===============================
		/*case 'sendbutton': {
		    // Contoh send button (quick reply)
		    ctx.reply('Pilih salah satu', {
		        reply_markup: {
		            inline_keyboard: [
		                [{ text: 'Button 1', callback_data: 'btn1' }],
		                [{ text: 'Button 2', callback_data: 'btn2' }]
		            ]
		        }
		    });
		    break;
		}*/
		default:
		}
	}
};