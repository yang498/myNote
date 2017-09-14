// 匹配规则：将内容按照\n分割，对每一行进行判断匹配添加对应的标签，所以再长的一句话也要写成一行
// table是多行文本，所以先把table拼成一行
// 待做：code,input
const formatHtml = text => {
	let h1 = /^#/,
		h2 = /^##/,
		time = /^&/,
		img = /^!/,
		table = /^%%|%%$/g,	// 按@@分隔tr，按!!分隔td
		html = text.replace(/%%\d*?\D*?%%/g, item => item.replace(/\s*\n\s*/g, '@@')).split('\n').map(item => {
			item = item.replace(/^\s+|\s+$/g, '');
			if(h2.test(item)) {
				return `<h2>${item.replace(h2,'')}</h2>`
			} else if(h1.test(item)) {
				return `<h1>${item.replace(h1,'')}</h1>`
			} else if(time.test(item)) {
				return `<time>${item.replace(time,'')}</time>`
			} else if(img.test(item)) {
				item = item.replace(img, '').split(',');
				return `<img src="${item[0]}" class="${item[1]?item[1]:''}" alt="${item[2]?item[2]:''}"/>`;
			} else if(table.test(item)) {
				let res = item.replace(table, '').split('@@'),
					th = '<th>' + res[0].replace(/!!/g, '</th><th>') + '</th>',
					tr = res.map((item, i) => i ? '<tr><td>' + item.replace(/!!/g, '</td><td>') + '</td></tr>' : '').join('');
				return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
			} else if(item == '') {
				return item;
			} else {
				return `<p>${item}</p>`
			}
		}).join('');
	return html;
};