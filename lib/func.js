function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function getytid(url) {
			const regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
			const match = url.match(regex);
			return match ? match[5] : null;
		};

module.exports = { pickRandom, getytid }
