const formatHtml = text => {
	// 每次切换页面pageCode、pageH1、pageH2都清空再重新赋值
	pageCode = []
	pageH1 = []
	pageH2 = []
	let h1Index = -1
	let tagStartEnd = true
	const htmlTagStart = /&lt;([^!\s'"\/]*?(?=\s|&gt;))/g	// 标签开始
	const htmlTagEnd = /&lt;\/([^\s'"]*?(?=&gt;))/g	// 标签结束
	// 开头声明（粉）：var let const void function => new class constructor super static import export default
	// 循环分支（蓝）：for in of while do if else switch case break continue try catch finally with
	// 方法：window document console return delete typeof require throw eval instanceof debugger
	// 类型方法：Object Array Boolean String Number Math Date RegExp Error JSON
	// 关键字属性：this true false undefined null length prototype
	// 优先使用键盘上的字符，有冲突了再将常见字符转成特殊字符
	const codeKeywordOut = /var|let(?=\s)|const|this(?!×)|function|=>|=&gt;|new(?=\s)|class(?=\s)|true(?!¿|\}|:)|false(?!¿|\}|")|null(?!×)|undefined(?!×)|console|window(?!'|"|`)|document(?=\.)|typeof|delete|module(?!×|\/)|require(?=\()/g	// 一类关键字，粉色
	const codeKeywordIn = /if(?=\s|\()|else(?=\s|\{)|switch|case|break|continue|return|for(?=\s|\()|\sin(?=\s)|of(?=\s)|while|\sdo(?!\w)|Math(?=\.)|Date(?=\.|\()/g	// 二类关键字，蓝色
	const codeComment = /\/\/(?!×)[^]*?\n|\/\*[^]*?\*\/|&lt;!--[^]*?--&gt;/g	// 有可能是个ajax的请求http://，在后面加上条件(?=×)表示不转，最后去除×标识
	const codeString = /'(?!¿)[^]*?'(?!¿)|"(?!¿)[^]*?"(?!¿)|`(?!¿)[^]*?`(?!¿)/g	// 不想被转字符串变绿就在后面加¿，注释内不用，已判断添加
	const codeReg = /¦/g	// 直接匹配字符串会转义，而且里面可能会包含多次转义的 /，正则不太常用，先用特殊符号标记，以后再试试
	const codeInline = /·/g
	const code = /··[^]*?··/g	// 用于书写，经常会用代码块，用`的中文按键书写
	const codeNew = /‥/g	// 用于匹配
	const h1 = /^#/
	const h2 = /^##/
	const h3 = /^###/
	const time = /^&(?=2)/
	const a = /α\([^]*?\)(?!×)/g
	const aa = /^αα|αα$/g
	const b = /♭/g
	const img = /^!/
	const imgInline = /¡\([^]*?\)/g
	const li = /^‖|‖$/g
	const table = /^%%|%%$/g
	const inlineSplit = 'ˊ'	// 用于拼接的特殊字符
	const inlineSplitReg = /ˊ/g	// 用于拼接的特殊字符正则
	const unit = u => (isNaN(u) ? u : u + 'px') + ';'	// 单位转换一下
	// [^]*：代表匹配所有字符无限次，但会直到最后一次，中间有x符号也会忽略，所以需要非贪婪[^]*?让它碰到x就停下来，但一次又不行，所以需要g全局匹配
	
	// 主要的作用是将多行标识符按inlineSplit特殊字符合并成单行，整理行内标识符，代码块加颜色
	String.prototype.formatString = function() {
		// 从顺序上来说起码从根据字符串的引号开始，不然之前有 html 标签的属性也包含引号，就误判了
		let str = this
		str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')	// 大于小于换成标识符避免和html标签冲突
		str = str.replace(code, item => { // 多行代码块加颜色
			item = item.replace(/^\t|/gm, '').replace(/\t/g, '    ') // 去掉开头书写tab，再把其他的tab替换成空格，不然会比较大
			pageCode.push(item.slice(3, -3).replace(codeReg, '')) // 去首尾换行再保存代码
			item = item.replace(codeComment, item => item.replace(/'|"|`/g, '$&¿'))	// 注释中的字符串和关键字加标记避免被绿
			item = item.replace(codeString, item => `<span class="code-string">${item.replace(/¿/g, '')}</span>`) // 字符串，注意此时已经把¿替换掉了，如果注释还是靠¿的话会有冲突
			item = item.replace(codeComment, item => `<span class="code-comment">${item.replace(/¿/g, '')}</span>`) // 注释
			item = item.replace(codeKeywordOut, '<span class="code-keyword-out">$&</span>') // 一类关键字
			item = item.replace(codeKeywordIn, '<span class="code-keyword-in">$&</span>') // 二类关键字
			item = item.replace(htmlTagStart, '&lt;<span class="code-keyword-in">$1</span>') // 标签开头
			item = item.replace(htmlTagEnd, '&lt;/<span class="code-keyword-in">$1</span>') // 标签结束
			item = '‥' + item.slice(2, -2) + '‥' // 转换成少数符号的标识符
			return item.replace(/\n/g, inlineSplit) // 去除不转注释的×标识，转换成少数符号合并成一行
		})
		str = str.replace(codeReg, item => { // 代码块内正则
			item = tagStartEnd ? '<span class="code-reg">' : '</span>'
			tagStartEnd = !tagStartEnd
			return item
		})
		str = str.replace(codeInline, item => { // 行内代码块
			item = tagStartEnd ? '<code>' : '</code>'
			tagStartEnd = !tagStartEnd
			return item
		})
		str = str.replace(a, item => '<a href="' + item.replace(/[^]*\||\)$/g, '') + '" target="_blank">' + item.replace(/^α\(|\|[^]*/g, '') + '</a>') // a链接
		
		// 相关参考链接
		str = str.replace(/αα(?=\n)[^]*?αα(?=\n)/g, item => {
			let res = ''
			item.slice(3, -4).split('\n').forEach(obj => {
				// 如果该行是个空行，就改成换行+下一行的退格，否则加a标签
				if (obj === '\t') {
					res += '<br/><i class="pd"></i>'
				} else {
					const href = obj.replace(/[^]*α/, '')
					const text = obj.replace(/α[^]*|\t/g, '')
					res += `<a href="${href}" target="_blank">${text}</a>，`
				}
				return res
			})
			return 'αα相关、参考、学习的链接：' + res.slice(0, -1) + 'αα'
		})
		
		str = str.replace(b, item => { // b加粗标签
			item = tagStartEnd ? '<b>' : '</b>'
			tagStartEnd = !tagStartEnd
			return item
		})
		str = str.replace(imgInline, item => { // 行内图片
			item = item.slice(2, -1).split(',')
			return `<img src="${item[0]}" class="img-inline" style="${item[1] ? 'width:' + unit(item[1]) : ''}${item[2] ? 'height:' + unit(item[2]) : ''}"/>`
		})
		str = str.replace(/‖(?=\n)[^]*?‖(?=\n)/g, item => { // 列表，获得每个列表
			item = item.replace(/\n[^]*?(?=\n)/g, obj => obj.replace('\t', '').replace(/\t/g, ' <i class="attr"></i>').replace(/[^]*(?=：)/, o => { // 获得每一行，保持缩进，再获得每个开头
				o = o.replace('{', ' <i class="type">{').replace('}', '}</i>') // 类型变橙色
				o = o.replace('[', ' <i class="default">[').replace(/]+/, '$&</i>') // 默认值变粉色
				o = o.replace('!', ' <b>!</b>')	// 必填加粗
				return '\n<i class="head">' + o.slice(1) + '</i>'
			}))
			return item.replace(/\s*\n\s*/g, inlineSplit)	// 转换成少数符号的标识符
		})
		str = str.replace(/%%(?=\n)[^]*?%%(?=\n)/g, item => item.replace(/\s*\n\s*/g, inlineSplit)) // 表格
		return str.replace(/×/g, '')
	}
	
	// 主要的作用是将开头或结尾的标识符替换成对应的标签，不然没有匹配标识符会当成p标签
	String.prototype.formatTag = function(){
		return this.split('\n').map(item => {
			item = item.replace(/^\s+|\s+$/g, '')	// 去空格
			if(h3.test(item)) {	// --------------------------------------------h3
				return `<h3>${item.replace(h3, '')}</h3>`
			} else if(h2.test(item)) {	// --------------------------------------------h2
				pageH2[h1Index].push(item.replace(h2, ''))	// 注入h2的标题文字
				return `<h2 onclick="scrollToTop($(this).offset().top - 55)">${item.replace(h2, '')}</h2>`
			} else if(h1.test(item)) {	// --------------------------------------------h1
				pageH1.push(item.replace(h1, ''))	// 注入h1的标题文字
				pageH2.push([])	// h2注入[]，代表1个h1等于1个数组的h2
				h1Index++	// h1Index+1
				return `<h1 onclick="scrollToTop($(this).offset().top - 40)">${item.replace(h1, '')}</h1>`
			} else if(aa.test(item)) {	// --------------------------------------------αα
				return `<div class="link">${item.replace(aa, '')}</div>`
			}  else if(time.test(item)) {	// --------------------------------------------time
				return `<time>最后更新时间：${item.replace(time, '')}</time>`
			} else if(img.test(item)) {	// --------------------------------------------img
				item = item.replace(img, '').split(',') // 用逗号加宽高
				return `<img src="${item[0]}" class="img" style="${item[1] ? 'width:' + unit(item[1]) : ''}${item[2] ? 'height:' + unit(item[2]) : ''}"/>`
			} else if(li.test(item)) {	// --------------------------------------------li
				return `<ul><li>${item.slice(2,-2).replace(inlineSplitReg, '</li><li>')}</li></ul>`
			} else if(table.test(item)) {	// --------------------------------------------table
				let res = item.slice(3, -3).split(inlineSplit),	// 去标识符还原每行
					th = '<th>' + res[0].replace(/,/g, '</th><th>') + '</th>', // 第一行代表thead，逗号变成承上启下的结束和开始标签
					left = res[1].split(','), // 分成数组用于下面判断，第二行代表该列向左对齐就扣1，居中就扣0或不扣，多出来的代表表格的宽度
					// 先分割每一行也就是tr，再对tr分割成td进行判断是否添加向左对齐的class
					tr = res.map((item, i) => i > 1 ? '<tr>' + item.split(',').map((item, i) => `<td ${left[i]==1?'class="td-left"':''}>${item}</td>`).join('') + '</tr>' : '').join('')
				return `<table ${left.length > res[0].split(',').length ? 'style="width:'+left[left.length-1]+'px"' : ''}><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`
			} else if(codeNew.test(item)) {	// --------------------------------------------code
				return item.replace(inlineSplitReg, '\n').replace(codeNew, i => {	// 去标识符还原每行，去首位标识符替换成标签
					i = tagStartEnd ? '<div class="code"><span class="copy" onclick="copyCode(this)">复制</span><pre>' : `</pre>
						<i class="iconfont icon-dui2 copy-success" onanimationend="this.classList.remove('copy-success-active')"></i></div>`
					tagStartEnd = !tagStartEnd
					return i
				})
			} else if(item === '') { // 是隔行的空字符串不管，避免无意义的空p标签
				return item
			} else { // 剩下的都是段落
				return `<p>${item}</p>`
			}
		}).join('')
	}
	return text.formatString().formatTag()
};