let commonData = {
	html: { name: 'html' },
	css: { name: 'css' },
	cssLibrary: { name: 'css库' },
	js: { name: 'js' },
	jsLibrary: { name: 'js库' },
	tool: { name: '工具' },
	other: { name: '其他' }
}

let pageH1 = []	// 在解析字符串的时候注入当前页面h1标题文字的集合
let pageH2 = []	// 在解析字符串的时候注入当前页面h2标题文字的集合
let pageCode = []	// 在解析字符串的时候注入当前页面代码块的集合
