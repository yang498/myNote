const formatHtml = text => {
	// 每次切换页面 pageCode、pageH1、pageH2 都清空再重新赋值
	pageCode = []
	pageH1 = []
	pageH2 = []
	let h1Index = -1
	let tagStartEnd = true

	// 使用标签识别符：优先使用键盘上的字符，有冲突了再将常见字符转成特殊字符
	const codeKeywordOut = /var|let|const|this(?!×)|function|=>|=&gt;|new(?=\s)|class(?=\s)|true(?!¿|\}|:)|false(?!¿|\}|")|null(?!×)|undefined(?!×)|console|window(?!'|"|`)|document(?=\.)|typeof|delete|module(?!×|\/)|require(?=\()/g	// 一类关键字，粉色
	const codeKeywordIn = /if(?=\s|\()|else(?=\s|\{)|switch|case|break|continue|return|for(?=\s|\()|\sin(?=\s)|of(?=\s)|while|\sdo(?!\w)|Math(?=\.)|Date(?=\.|\()/g	// 二类关键字，蓝色
	const codeReg = /¦/g	// 直接匹配字符串会转义，而且里面可能会包含多次转义的 /，正则不太常用，先用特殊符号标记，以后再试试
	const codeInline = /·/g
	const code = /··[^]*?··/g	// 用于书写，经常会用代码块，用`的中文按键书写
	const codeNew = /‥/g	// 用于匹配
	const h1 = /^#/
	const h2 = /^##/
	const h3 = /^###/
	const time = /^&(?=2)/
	const a = /α\([^]*?\)(?!×)/g	// α 应该改成@()
	const aa = /^αα|αα$/g	//
	const b = /♭/g
	const img = /^!/
	const imgInline = /¡\([^]*?\)/g
	const li = /^‖|‖$/g		// 列表应改成 @@
	const table = /^%%|%%$/g
	const inlineSplit = 'ˊ'	// 用于拼接的特殊字符
	const inlineSplitReg = /ˊ/g	// 用于拼接的特殊字符正则
	const unit = u => (isNaN(u) ? u : u + 'px') + ';'	// 单位转换一下

	// 将多行标识符按 inlineSplit 特殊字符合并成单行，整理行内标识符，代码块加颜色
	String.prototype.formatString = function() {
		let str = this

		// 标签的左右箭头换成转义符，避免和 html 标签冲突
		str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')

		// 匹配多行代码块，里面再匹配加颜色
		str = str.replace(code, item => {
			// tab 显得比较长，为了格式美观，所以去掉开头 tab，再把其他的 tab 替换成空格
			item = item.replace(/^\t/gm, '').replace(/\t/g, '    ')
			// 去掉首尾标识符和换行再保存代码以准备复制
			pageCode.push(item.slice(3, -3))
			// 1、网址开头和路径不解析成注释
			item = item.replace(REG.unComment, '$&¿')
			// 2、注释中包含的标签、关键字、正则、字符串加标记避免被匹配
			item = item.replace(REG.comment, res => REG.un(res))
			// 3、字符串中包含的标签、关键字、正则加标记避免被匹配，字符串中的注释比如网址开头和路径已排除
			item = item.replace(REG.str, res => REG.un(res))
			// 4、标记正则，因和结束标签的 / 冲突，先用 ¦ 标记，后面再匹配
			item = item.replace(REG.reg, '$1¦$2¦')
			// 5、加颜色
			// 字符串，绿，从顺序上来说以字符串开始，不然之前有 html 标签的属性也包含引号，就误判了
			item = item.replace(REG.str, '<span class="color-green">$&</span>')
			// 注释，灰
			item = item.replace(REG.comment, '<span class="color-gray">$&</span>')
			// 开头声明，粉
			item = item.replace(REG.statement, '<span class="color-pink">$&</span>')
			// 循环分支，青
			item = item.replace(REG.loopFork, '<span class="color-cyan">$&</span>')
			// 方法关键字，蓝
			item = item.replace(REG.methodKeyword, '<span class="color-blue">$&</span>')
			// 类型方法，紫
			item = item.replace(REG.type, '<span class="color-purple">$&</span>')
			// html 开头标签，蓝，因为这里匹配的是转义过的标签 &lt; &gt;，所以不和上面添加颜色的标签 < > 冲突
			item = item.replace(REG.start, '&lt;<span class="color-blue">$1</span>')
			// html 结束标签，蓝
			item = item.replace(REG.end, '&lt;/<span class="color-blue">$1</span>')

			// 转换成少数符号的标识符，应该可以去掉这个和正则的 ¦，给··前后加上限制，最后改链式调用，只有开头的 return，等这个 js 全都完成再全部检查一下页面相关符号
			item = '‥' + item.slice(2, -2) + '‥'
			// 去除不转注释的×标识，转换成少数符号合并成一行
			return item.replace(/\n/g, inlineSplit)
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
		return str.replace(/×|¿/g, '')
	}

	// 主要的作用是将开头或结尾的标识符替换成对应的标签，不然没有匹配标识符会当成p标签
	String.prototype.formatTag = function(){
		return this.split('\n').map(item => {
			item = item.replace(/^\s+|\s+$/g, '')	// 前后去空格
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