let commonData = {
	html: {
		name: 'html',
		directory: ['html', 'mobile', 'weex', 'wechat-applet', 'website']
	},
	css: {
		name: 'css',
		directory: ['css', 'animation']
	},
	cssLibrary: {
		name: 'css库',
		directory: ['bootstrap']
	},
	js: {
		name: 'js',
		directory: ['grammar', 'object', 'array', 'string', 'math', 'node']
	},
	jsLibrary: {
		name: 'js库',
		directory: ['jquery', 'vue']
	},
	tool: {
		name: '工具',
		directory: ['sass', 'git', 'gulp', 'webpack']
	},
	other: {
		name: '其他',
		directory: ['interview', 'office', 'article', 'english']
	}
}

let pageH1 = []	// 在解析字符串的时候注入当前页面h1标题文字的集合
let pageH2 = []	// 在解析字符串的时候注入当前页面h2标题文字的集合
let pageCode = []	// 在解析字符串的时候注入当前页面代码块的集合

// 按指定顺序加载 data 目录中的 js 文档
let script = ''
for (let dataKey in commonData) {
	const firstDir = dataKey.replace(/[A-Z]/g, '-$&').toLowerCase()
	for (let secondDir of commonData[dataKey].directory) {
		script += `<script src="data/${firstDir}/${secondDir}.js" type="text/javascript" charset="utf-8"></script>`
	}
}
$('#import').after(script)