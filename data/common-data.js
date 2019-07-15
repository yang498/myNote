// 首页目录循环 commonData，key 为一级路径，二级 key 为 二级路径，目录名用 key 表示，中文加上 name 表示，注意文件名和 key 的一致
// underway 表示进行中，complete 表示已完成，没有就是未开始
// js 文件命名：html 不区分大小写所以用短横线连接，而对象的 key 中用短横线会当作减法，所以用驼峰命名，所以引用 script 时先驼峰转短横线
// plane：transition > object > animation > function > @media（和适配方法） > es6 > canvas > console > 数据类型和重要语法
let commonData = {
	html: {
		html: {},
		mobile: {},
		optimize: { name: '优化' },
		applet: { name: '微信小程序', underway: true },
		weex: { underway: true },
		electron: {}
	},
	css: {
		css: { underway: true }
	},
	javascript: {
		grammar: { name: '语法' },
		function: {},
		browser: { name: '浏览器', underway: true },
		node: { underway: true },
		demo: { complete: true }
	},
	jsApi: {
		name: 'js 标准库',
		object: { underway: true },
		array: { complete: true },
		string: { complete: true },
		regexp: { complete: true },
		math: { complete: true },
		date: { complete: true },
		es6: {}
	},
	jsLibrary: {
		name: 'js 框架',
		jquery: { complete: true },
		vue: { underway: true },
		tool: { name: '工具', underway: true }
	},
	tool: {
		name: '工具',
		sass: {},
		git: {},
		gulp: { complete: true },
		webpack: {},
		taro: {},
		other: { name: '其他' }
	},
	database: {
		name: '数据库',
		sqlServer: { name: 'SQL Server', underway: true }
	},
	other: {
		name: '其他',
		link: { name: '资源链接', complete: true },
		website: { name: '网站' },
		interview: { name: '面试' },
		office: { name: '电脑操作', underway: true },
		article: { name: '杂谈', underway: true },
		english: { name: '英语' }
	}
}

let pageH1 = []	// 在解析字符串的时候注入当前页面h1标题文字的集合
let pageH2 = []	// 在解析字符串的时候注入当前页面h2标题文字的集合
let pageCode = []	// 在解析字符串的时候注入当前页面代码块的集合