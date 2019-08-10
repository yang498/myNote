// js 关键字集合，注意只能再前后加 \s，比如 \sin\s，要考虑到后面的加 (?!¿)
// 避免容易作为单词的一部分也会被匹配，比如 var going 包含 in，在前后加\s
// 在单词结尾又是在开头的单词，比如 let applet，这个时候就手动加 ¿，再改实在太累了，这种情况也少见
// 带有 un 的正则是正常的匹配，因为在注释、字符串中不需要进行匹配，所以先用 un 匹配好做好 ¿ 标记，这样不带 un 的正则就不匹配了
let REG_UN = {
	// 开头声明，粉
	statement: 'var |let |const |void|function|=&gt;|new |class\s|constructor|super\s|static|import|export |default',
	// 循环分支，紫
	loopFork: 'for | in |of\s|while|\sdo|if |else | switch|case|break|continue|try\s|catch |finally |with ',
	// 方法关键字，蓝
	methodKeyword: 'return|delete |typeof|require\s|throw|eval|instanceof|debugger|this|super|length',
	// 类型方法，紫
	type: 'window(?=[\s\.])|document|console|true|false|undefined|null| Object| Array| Boolean| String| Number|Math|(?<!\\w)Date|RegExp|Error|(?<!o)JSON\.'
}

// 将 REG 加上 (?!¿)，用来匹配
let REG = {}
for (let key in REG_UN) REG[key] = new RegExp(REG_UN[key].split('|').map(item => item + '(?!¿)').join('|'), 'g')

// 将 REG_UN 合并以做不匹配的标记
REG_UN = new RegExp(Object.values(REG_UN).join('|'), 'g')

// 代码块内的匹配，暂不考虑 css，多行处理、函数相似和嵌套不好控制
// html 开始标签，分组处理，因为匹配的是&lt; &gt;，所以不和 < > 冲突
REG.startUn = /&lt;(?!\/)([^!\s'"]+?(?=\s|&gt;))/g
REG.start = /&lt;(?!\/|¿)([^!\s'"]+?(?=\s|&gt;))/g
// html 结束标签，分组处理
REG.endUn = /&lt;\/([^\s'"]+?(?=&gt;))/g
REG.end = /&lt;(?!¿)\/([^\s'"]+?(?=&gt;))/g
// 正则尚且能用，问题在于怎么匹配前面没有 \ 的 /，用\/[^]*?\\{0}\/ 是无效的，因为 \ 还是属于 [^]*? 的范围
// 以 \s ( = : 开头，/ 开始后不接 / * (注释) 和 > (结束标签)，正则内容用 [^]+? 表示，/ 结束后接 gimuys，以 . ) , ; \s 结尾
REG.regUn = /([\s\(=:])(\/(?!\/|\*|&gt;)([^]+?\/[gimuys]{0,6}(?=\.|\)|,|;|\s)))/g
REG.reg = /([\s\(=:])(\/(?!¿|\/|\*|&gt;)[^]+?\/[gimuys]{0,6}(?=\.|\)|,|;|\s))/g
// 字符串，字符串中若有注释需要手动 ¿ 了，因为字符串可以包含注释，注释又能包含字符串，这里是先注释中不解析字符串
REG.strUn = /'|"|`/g
REG.str = /'(?!¿)[^]*?'(?!¿)|"(?!¿)[^]*?"(?!¿)|`(?!¿)[^]*?`(?!¿)/g
// 注释：// /**/ <!-- -->，注释中的注释本来不会被匹配，但注意不要 /**/ 嵌套，这个就木有办法了
REG.comment = /\/\/(?!¿)[^]*?(?=\n)|\/\*(?!¿)[^]*?\*\/(?!¿)|&lt;!--[^]*?--&gt;/g
// 不解析网址：http://、https://、ws://、wss://、git://
REG.unComment = /http:\/\/|https:\/\/|ws:\/\/|wss:\/\/|file:\/\/|git:\/\//g
// 先用 Un 将标签、关键字、正则加 ¿ 标记防止误匹配
REG.un = res => res.replace(REG.startUn, '&lt;¿$1')
	.replace(REG.endUn, '&lt;¿/$1')
	.replace(REG_UN, '$&¿')
	.replace(REG.regUn, '$1/¿$3')

// 首尾标识符替换成标签
REG.addTag = (tagName, content) => `<${tagName}>${content}</${tagName}>`
// 行内代码块
REG.codeInline = /·([^]+?)·/g
// 代码块，用于改变内部标签，因为和行内代码块的标记是一样的，所以最后改成特殊符号
REG.codeBlock = /··(?=\s)[^]*?··(?=\s)/g
// 代码块，用于改变外层标签
REG.codeBlockTag = /^‥|‥$/g
// 链接，<a>
REG.a = /@\[([^]+?)\|([^]+?)\](?!¿)/g
// 加粗，<b>
REG.b = /\^\^([^]+?)\^\^/g
// h1-3 标题
REG.h1 = /^#/
REG.h2 = /^##/
REG.h3 = /^###/
// iframe
REG.iframe = /^~~/
// 图片
REG.img = /^!(?!!)([^,\(]*),?([^,]*),?([^]*)/
// 行内图片
REG.imgInline = /!(?!¿)\[([^,]*),?([^\],]*),?([^\]]*)\]/g
// 单位转换，数字加 px，非数字保持原样
REG.unit = num => isNaN(num) ? num + ';' : num + 'px;'
// 图片和行内图片的处理方式是一样的，就放到一个方法里面，加上第 3 个参数以区分行内图片
REG.imgFn = (item, reg, inline) => item.replace(reg, (res, $1, $2, $3) => {
	const width = $2 ? `style="width:${REG.unit($2)} ${$3 ? 'height:' + REG.unit($3) : ''}"` : ''
	return `<img src="${$1}" ${inline ? 'class="inline"' : ''} ${width}/>`
})
// 匹配每一行，适用于：列表、底部链接
REG.multiLine = /\n([^]*?(?=\n))/g
// 列表
REG.list = /!!(?=\n)[^]*?!!(?=\n)/g
REG.listTag = /^!!|!!$/g
// 表格
REG.table = /%%(?=\n)[^]*?%%(?=\n)/g
REG.tableTag = /^%%|%%$/g
// 底部链接，单行
REG.linkOneLine = /@@(?=\n)[^]*?@@(?=\n)/g
// 底部链接，多行
REG.linkMultiLine = /@@!(?=\n)[^]*?@@(?=\n)/g
// 底部链接，内部匹配
REG.linkInside = /(\s*)([^]*)\|([^]*)/g
// 底部链接，标签
REG.link = /^@@|@@$/g
// 最后更新时间
REG.time = /^&(?=2)/