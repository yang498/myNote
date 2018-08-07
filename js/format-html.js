const formatHtml = text => {
	// 每次切换页面 pageCode、pageH1、pageH2 都清空再重新赋值
	pageCode = []
	pageH1 = []
	pageH2 = []
	let h1Index = -1
	let tagStartEnd = true

	// 只用一个 return
	// 多行的有：代码块、表格、底部链接
	// 改动的符号有：a 链接、底部链接、行内图片
	// 等这个 js 全都完成再全部检查一下页面相关符号
	// 使用标签识别符：优先使用键盘上的字符，有冲突了再将常见字符转成特殊字符
	const time = /^&(?=2)/
	const aa = /^αα|αα$/g	//	@@
	const imgInline = /¡\([^]*?\)/g
	const li = /^‖|‖$/g		// 列表应改成 !!
	const table = /^%%|%%$/g
	const inlineSplit = 'ˊ'	// 用于拼接的特殊字符
	const inlineSplitReg = /ˊ/g	// 用于拼接的特殊字符正则
	const unit = u => (isNaN(u) ? u : u + 'px') + ';'	// 单位转换一下

	// 将多行标识符按 inlineSplit 的特殊字符合并成单行，和整理行内标识符
	String.prototype.formatString = function() {
		let str = this

		// 文档内包含标签的左右箭头换成转义符，避免解析成 html 标签
		str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')

			// 匹配多行代码块，里面匹配加颜色，最后合并成单行
			.replace(REG.codeBlock, item => {
				// tab 显得比较长，为了格式美观，所以去掉开头 tab，再把其他的 tab 替换成空格
				item = item.replace(/^\t/gm, '').replace(/\t/g, '    ')
				// 去掉首尾标识符和换行再保存代码以准备复制
				pageCode.push(item.slice(3, -3))
				// 1、网址开头和路径不解析成注释
				item = item.replace(REG.unComment, '$&¿')
					// 2、注释中包含的标签、关键字、正则、字符串加标记避免被匹配
					.replace(REG.comment, res => REG.un(res).replace(REG.strUn, '$&¿'))
					// 3、字符串中包含的标签、关键字、正则加标记避免被匹配，字符串中的注释比如网址开头和路径已排除
					.replace(REG.str, res => REG.un(res))
					// 4、加颜色，从顺序上来说以字符串开始，不然之前有 html 标签的属性也包含引号，就误判了
					.replace(REG.str, '<span class="color-green">$&</span>')	// 字符串，绿
					.replace(REG.comment, '<span class="color-gray">$&</span>')	// 注释，灰
					.replace(REG.statement, '<span class="color-pink">$&</span>')	// 开头声明，粉
					.replace(REG.loopFork, '<span class="color-cyan">$&</span>')// 循环分支，青
					.replace(REG.methodKeyword, '<span class="color-blue">$&</span>')	// 方法关键字，蓝
					.replace(REG.type, '<span class="color-purple">$&</span>')	// 类型方法，紫
					.replace(REG.reg, '$1<span class="color-orange">$2</span>')	// 正则，橙
					.replace(REG.start, '&lt;<span class="color-blue">$1</span>')	// html 开头标签，蓝
					.replace(REG.end, '&lt;/<span class="color-blue">$1</span>')	// html 结束标签，蓝
				// 转换成特殊标识符避免和行内代码块标识符冲突，以 inlineSplit 连接合并成一行
				return ('‥' + item.slice(2, -2) + '‥').replace(/\n/g, inlineSplit)
			})
		
			// 行内代码块，<code>
			.replace(REG.codeInline, item => REG.addTag('code'))
			// 链接，<a>
			.replace(REG.a, '<a href="$2" target="_blank">$1</a>')
			// 加粗，<b>
			.replace(REG.b, item => REG.addTag('b'))
			// 行内图片，<img>
			.replace(REG.imgInline, item => REG.imgFn(item, REG.imgInline))
			// 表格，合并成单行
			.replace(/%%(?=\n)[^]*?%%(?=\n)/g, item => item.replace(/\s*\n\s*/g, inlineSplit))
			// 底部链接，单行，里面转 <a> ，最后合并成一行
			.replace(REG.linkOneLine, item => '@@学习参考链接：' + item.slice(3, -4).split('\n')
				.map(obj => obj.replace(REG.linkInside, '<a href="$3" target="_blank">$2</a>')).join('，') + '@@')
			// 底部链接，多行，里面转 <a> ，最后合并成一行
			.replace(REG.linkMultiLine, item => {
				console.log('@@学习参考链接：' + 
					item.slice(3, -3).replace(REG.multiLine, (res, $1) => {
						return $1.replace(REG.linkInside, '<a href="$3" target="_blank" class="pd">$2</a>')
					})
				)
				return '@@学习参考链接：' + item.slice(3, -3).replace(REG.multiLine, (res, $1) => 
				$1.replace(REG.linkInside, '<a href="$3" target="_blank" class="pd">$2</a>')))
			})
			// 列表
			.replace(REG.list, item => {
				item = item.replace(/\n[^]*?(?=\n)/g, obj => obj.replace('\t', '').replace(/\t/g, ' <i class="attr"></i>').replace(/[^]*(?=：)/, o => { // 获得每一行，保持缩进，再获得每个开头
					o = o.replace('{', ' <i class="type">{').replace('}', '}</i>') // 类型变橙色
					o = o.replace('[', ' <i class="default">[').replace(/]+/, '$&</i>') // 默认值变粉色
					o = o.replace('!', ' <b>!</b>')	// 必填加粗
					return '\n<i class="head">' + o.slice(1) + '</i>'
				}))
				return item.replace(/\s*\n\s*/g, inlineSplit)	// 转换成少数符号的标识符
			})
		return str.replace(/×|¿/g, '')
	}

	// 将文档分割成每一行进行处理，开头或结尾的标识符替换成对应的标签，没有标识符的当成 p 标签
	String.prototype.formatTag = function(){
		return this.split('\n').map(item => {
			// 前后去空格
			item = item.replace(/^\s+|\s+$/g, '')
			// h3 标题，从顺序上来说是 h3 h2 h1，因为 h2 的正则包含 h3，h1 的正则包含 h2 和 h3
			if (REG.h3.test(item)) {
				return `<h3>${item.replace(REG.h3, '')}</h3>`
			}
			// h2 标题
			else if (REG.h2.test(item)) {
				pageH2[h1Index].push(item.replace(REG.h2, ''))	// 保存 h2 的标题文字
				return `<h2 onclick="scrollToTop($(this).offset().top - 55)">${item.replace(REG.h2, '')}</h2>`
			}
			// h1 标题
			else if (REG.h1.test(item)) {
				pageH1.push(item.replace(REG.h1, ''))	// 保存 h1 的标题文字
				pageH2.push([])	// h2 增加一个数组，即 1 个 h1 包括 1 个数组的 h2
				h1Index++	// h1 的 index 即 pageH2 的当前索引，随着 h1 的增加而增加
				return `<h1 onclick="scrollToTop($(this).offset().top - 40)">${item.replace(REG.h1, '')}</h1>`
			}
			// 图片
			else if(REG.img.test(item)) {
				return item.replace(REG.img, item => REG.imgFn(item, REG.img))
			}
			// 列表
			else if (li.test(item)) {
				return `<ul><li>${item.slice(2,-2).replace(inlineSplitReg, '</li><li>')}</li></ul>`
			}
			// 底部链接
			else if (REG.link.test(item)) {
				return `<div class="link">${item.replace(REG.link, '')}</div>`
			}
			// 最后更新时间
			else if (time.test(item)) {
				return `<time>最后更新时间：${item.replace(time, '')}</time>`
			}
			else if(table.test(item)) {	// --------------------------------------------table
				let res = item.slice(3, -3).split(inlineSplit),	// 去标识符还原每行
					th = '<th>' + res[0].replace(/,/g, '</th><th>') + '</th>', // 第一行代表thead，逗号变成承上启下的结束和开始标签
					left = res[1].split(','), // 分成数组用于下面判断，第二行代表该列向左对齐就扣1，居中就扣0或不扣，多出来的代表表格的宽度
					// 先分割每一行也就是tr，再对tr分割成td进行判断是否添加向左对齐的class
					tr = res.map((item, i) => i > 1 ? '<tr>' + item.split(',').map((item, i) => `<td ${left[i]==1?'class="td-left"':''}>${item}</td>`).join('') + '</tr>' : '').join('')
				return `<table ${left.length > res[0].split(',').length ? 'style="width:'+left[left.length-1]+'px"' : ''}><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`
			} else if(REG.codeBlockTag.test(item)) {	// --------------------------------------------code
				return item.replace(inlineSplitReg, '\n').replace(REG.codeBlockTag, i => {	// 去标识符还原每行，去首位标识符替换成标签
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