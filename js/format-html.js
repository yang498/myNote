const formatHtml = text => {
	/* 按每一行分割成数组进行匹配，所以先把多行的(段落、代码、表格)变成一行，注意多行标识符独占一行，没有标识符就是p标签
	 * 待做：
	 * 代码：宽，分为h/c/j三种代码匹配，js关键字前后都是空格才匹配，行内代码块解析冲突，整理css
	 */
	copyCode = []
	commonData[menuParent][menuChild].h1 = []
	commonData[menuParent][menuChild].h2 = []
	let h1Index = -1
	let tagStartEnd = true
	const codeKeywordOut = /var|let(?=\s)|const|this|function|=>|new|class(?=\s)|for(?=\s)|\sin(?=\s)|of|true(?!¿)|false|null|undefined|console|window|document|typeof|delete/g
	const codeKeywordIn = /if|else|switch|case|break|continue|return|while|do(?!\w)|Math(?=\.)|Date(?=\.|\()/g
	const codeComment = /\/\/[^]*?\n|\/\*[^]*?\*\//g
	const codeString = /'(?!¿)[^]*?'(?!¿)|"(?!¿)[^]*?"(?!¿)|`(?!¿)[^]*?`(?!¿)/g	//不想被转字符串变绿就在后面加¿，注释内不用
	const code = /··[^]*?··/g	//和ˊ和‥（内部使用，其他可重复利用）
	const codeInline = /·/g
	const codeReg = /¦/g	// 直接匹配字符串会转义太复杂，改用特殊符号标记
	const h1 = /^#/
	const h2 = /^##/
	const h3 = /^###/
	const time = /^&(?=20)/
	const a = /α\([^]*?\)/g
	const b = /♭/g
	const img = /^!/
	const imgInline = /¡\([^]*?\)/g
	const li = /^‖|‖$/g
	const table = /^%%|%%$/g
	const codes = /^ˊ|ˊ$/g
	const codesN = /‥/g
	const inlineSplit = 'ˊ'
	const inlineSplitReg = /ˊ/g
	
	// 匹配符合条件的字符：/x[^]*?x/g，x代表要匹配条件内的字符
	// [^]*：代表匹配所有字符无限次，但会直到最后一次，中间有x符号也会忽略，所以需要非贪婪[^]*?让它碰到x就停下来，但一次又不行，所以需要g全局匹配
	String.prototype.formatString = function() { // 先整理下代码格式，多行转单行，格式化行内
		let str = this
		str = str.replace(code, item => { // 多行代码块加颜色
			item = item.replace(/^\t|/gm, '').replace(/\t/g, '    ') // 去掉开头书写tab，再把其他的tab替换成空格，不然会比较大
			copyCode.push(item.slice(3, -3).replace(codeReg, '')) // 去首尾换行再保存代码
			item = item.replace(codeComment, item => item.replace(/'|"|`/g, '$&¿'))	// 注释中的字符串加标记避免被绿
			item = item.replace(codeString, item => `<span class="code-string">${item.replace(/¿/g, '')}</span>`) // 字符串
			item = item.replace(codeComment, item => `<span class="code-comment">${item.replace(/¿/g, '')}</span>`) // 注释
			//	以上顺序不可更改
			item = item.replace(codeKeywordOut, '<span class="code-keyword-out">$&</span>') // 一类关键字
			item = item.replace(codeKeywordIn, '<span class="code-keyword-in">$&</span>') // 二类关键字
			item = 'ˊ' + item.slice(2, -2) + 'ˊ' // 转换成少数符号
			return item.replace(/\n/g, '‥')
		})
		str = str.replace(codeReg, item => { // 行内正则
			item = tagStartEnd ? '<span class="code-reg">' : '</span>'
			tagStartEnd = !tagStartEnd
			return item
		})
		str = str.replace(codeInline, item => { // 行内代码块
			item = tagStartEnd ? '<code>' : '</code>'
			tagStartEnd = !tagStartEnd
			return item
		})
		str = str.replace(b, item => { // b加粗标签
			item = tagStartEnd ? '<b>' : '</b>'
			tagStartEnd = !tagStartEnd
			return item
		})
		str = str.replace(a, item => { // a链接
			item = item.split('|')
			item[0] = '<a href="' + item[0].slice(2) + '" target="_blank">'
			item[1] = item[1].replace(')', '</a>')
			return item.join('')
		})
		str = str.replace(imgInline, item => { // 行内图片
			item = item.slice(2, -1).split(',')
			return '<img src="' + item[0] + '" style="width:' + item[1] + 'px;"/>'
		})
		str = str.replace(/‖(?=\n)[^]*?‖(?=\n)/g, item => { // 列表，获得每个列表
			item = item.replace(/\n[^]*?(?=\n)/g, obj => obj.replace(/[^]*(?=：)/, o => { // 获得每一行，再获得每个开头
				o = o.replace('\t\t', ' <i class="attr"></i>') // 保持缩进
				o = o.replace('{', ' <i class="type">{').replace('}', '}</i>') // 类型变橙色
				o = o.replace('[', ' <i class="default">[').replace(']', ']</i>') // 默认值变粉色
				return '\n<i class="head">' + o.slice(1) + '</i>'
			}))
			return item.replace(/\s*\n\s*/g, inlineSplit)
		})
		str = str.replace(/%%(?=\n)[^]*?%%(?=\n)/g, item => item.replace(/\s*\n\s*/g, inlineSplit)) // 表格
		return str
	}
	String.prototype.formatTag = function(){
		return this.split('\n').map(item => { // 先把开头或结尾的标识符替换掉
			item = item.replace(/^\s+|\s+$/g, '')
			if(h3.test(item)) {
				return `<h3>${item.replace(h3, '')}</h3>`
			} else if(h2.test(item)) {
				commonData[menuParent][menuChild].h2[h1Index].push(item.replace(h2, ''))
				return `<h2 onclick="scrollToTop($(this).offset().top - 55)">${item.replace(h2, '')}</h2>`
			} else if(h1.test(item)) {
				commonData[menuParent][menuChild].h1.push(item.replace(h1, ''))
				commonData[menuParent][menuChild].h2.push([])
				h1Index++
				return `<h1 onclick="scrollToTop($(this).offset().top - 40)">${item.replace(h1, '')}</h1>`
			} else if(time.test(item)) {
				return `<time>${item.replace(time, '')}</time>`
			} else if(img.test(item)) {
				item = item.replace(img, '').split(',') // 用逗号加宽度
				return `<img src="${item[0]}" ${item[1] ? 'style="width:'+item[1]+'px"' : ''}/>`
			} else if(li.test(item)) {
				return `<ul><li>${item.slice(2,-2).replace(inlineSplitReg, '</li><li>')}</li></ul>`
			} else if(table.test(item)) {
				let res = item.slice(3, -3).split(inlineSplit),
					th = '<th>' + res[0].replace(/,/g, '</th><th>') + '</th>', // 第一行代表thead，逗号变成承上启下的结束和开始标签
					left = res[1].split(','), // 第二行代表该列向左对齐就扣1，居中就扣0或不扣，多出来的代表表格的宽度
					// 先分割每一行也就是tr，再对tr分割成td进行判断是否添加向左对齐的class
					tr = res.map((item, i) => i > 1 ? '<tr>' + item.split(',').map((item, i) => `<td ${left[i]==1?'class="td-left"':''}>${item}</td>`).join('') + '</tr>' : '').join('')
				return `<table ${left.length > res[0].split(',').length ? 'style="width:'+left[left.length-1]+'px"' : ''}><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`
			} else if(codes.test(item)) {
				return item.replace(codesN, '\n').replace(codes, i => {
					i = tagStartEnd ? '<div class="code"><span class="copy" onclick="copyCodeFn(this)">复制</span><pre>' : `</pre>
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