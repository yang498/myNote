const formatHtml = text => {
	pageCode = []	// 当前页面代码块以准备复制
	pageH1 = []	// 当前页面 h1 标题文字
	pageH2 = []	// 当前页面 h2 标题文字
	let h1Index = -1	// 当前页面匹配 h1 时的索引，配合增加 h2 标题文字

	// 整理行内标识符，多行合并成单行，多行的有：列表、表格、代码块、底部链接
	String.prototype.formatString = function () {
		// 文档内包含标签的左右箭头换成转义符，避免解析成 html 标签
		return this.replace(/</g, '&lt;').replace(/>/g, '&gt;')

			// 匹配多行代码块，里面匹配加颜色，最后合并成单行
			.replace(REG.codeBlock, item => {
				// tab 显得比较长，为了格式美观，所以去掉开头 tab，再把其他的 tab 替换成空格
				item = item.replace(/^\t/gm, '').replace(/\t/g, '    ')
				// 去掉首尾标识符和换行再保存代码以准备复制
				pageCode.push(item.slice(3, -3).replace(/¿/g, ''))
				// 1、网址开头和路径不解析成注释
				item = item.replace(REG.unComment, '$&¿')
					// 2、注释中包含的标签、关键字、正则、字符串加标记避免被匹配
					.replace(REG.comment, res => REG.un(res).replace(REG.strUn, '$&¿'))
					// 3、字符串中包含的标签、关键字、正则加标记避免被匹配，字符串中的注释比如网址开头和路径已排除
					.replace(REG.str, res => REG.un(res))
					// 4、正则中含后行断言和具名组匹配，对 < > 加标记，对 unComment 中的 */ 去标记
					.replace(REG.reg, res => res.replace(/&lt;|&gt;/g, '$&¿').replace(/\*\/¿/g, '*/'))
					// 5、加颜色，从顺序上来说以字符串开始，不然之前有 html 标签的属性也包含引号，就误判了
					.replace(REG.str, '<span class="color-green">$&</span>')	// 字符串，绿
					.replace(REG.comment, '<span class="color-gray">$&</span>')	// 注释，灰
					.replace(REG.statement, '<span class="color-pink">$&</span>')	// 开头声明，粉
					.replace(REG.loopFork, '<span class="color-purple">$&</span>')// 循环分支，紫
					.replace(REG.methodKeyword, '<span class="color-blue">$&</span>')	// 方法关键字，蓝
					.replace(REG.type, '<span class="color-purple">$&</span>')	// 类型方法，紫
					.replace(REG.reg, '$1<span class="color-orange">$2</span>')	// 正则，橙
					.replace(REG.start, '&lt;<span class="color-blue">$1</span>')	// html 开头标签，蓝
					.replace(REG.end, '&lt;/<span class="color-blue">$1</span>')	// html 结束标签，蓝
				// 换成特殊标识符避免和行内代码块冲突，再合并成一行，代码块需要保留回车格式，不像列表和表格外部都用标签包裹无需回车
				return '‥' + item.slice(3, -3).replace(/\n/g, 'ˊ') + '‥'
			})

			// 行内代码块，<code>
			.replace(REG.codeInline, item => REG.addTag('code'))
			// 链接，<a>
			.replace(REG.a, '<a href="$2" target="_blank">$1</a>')
			// 加粗，<b>
			.replace(REG.b, item => REG.addTag('b'))
			// 行内图片，<img>
			.replace(REG.imgInline, item => REG.imgFn(item, REG.imgInline, true))

			// 底部链接，单行，在每一行中替换，里面转 <a> ，最后合并成一行
			.replace(REG.linkOneLine, item => '@@学习参考链接：' + item.slice(2, -3).replace(REG.multiLine, (res, $1) =>
				$1.replace(REG.linkInside, '<a href="$3" target="_blank">$2</a>，')).replace(/\n|，$/gm, '') + '@@')
			// 底部链接，多行，在每一行中替换，里面转 <a> ，最后合并成一行
			.replace(REG.linkMultiLine, item => '@@学习参考链接：' + item.slice(3, -3).replace(REG.multiLine, (res, $1) =>
				$1.replace(REG.linkInside, '<a href="$3" target="_blank" class="pd">$2</a>')).replace('\n', '') + '@@')

			// 列表，去掉开头缩进，在每一行中替换，每个缩进换成 css 控制，开头加类型、默认值、必填加粗
			.replace(REG.list, item => '!!' + item.slice(2, -2).replace(/^\t/gm, '').replace(REG.multiLine, (res, $1) =>
				'<li>' + $1.replace(/\t/g, '<i class="attr"></i>').replace(/[^]*?(?=：)/, start =>
					'<i class="head">' + start
						.replace(/(\{(?!¿))(.+?)(\}(?!¿))/, (r, $1, $2, $3) => {
							const rType = $2.split('/').map(i => i === 'o' ? 'Object' :
								i === 'a' ? 'Array' :
								i === 's' ? 'String' :
								i === 'n' ? 'Number' :
								i === 'nu' ? 'Null' :
								i === 'u' ? 'Undefined' :
								i === 'ur' ? 'URL' :
								i === 'b' ? 'Boolean' :
								i === 'bu' ? 'Buffer' : i).join('/')
							return ' <i class="type">' + $1 + rType + $3 + '</i>'
						})
						.replace(/\[(?!¿)/, ' <i class="default">$&').replace(/\]+(?!¿)/, '$&</i>')
						.replace(/!(?!¿)/, ' <b>$&</b>')
					+ '</i>')
				+ '</li>').replace('\n', '') + '!!')

			// 表格，按每行分隔，第二行作为对齐方式，第二行最后有数字代表表格宽度，第一行作为表头，第三行之后作为内容
			.replace(REG.table, item => {
				item = item.slice(3, -4).replace(/^\t/gm, '').split('\n')
				const align = item[1].split(',')
				const widthIndex = align.length - 1 > item[0].match(/,/g).length ? align.length - 1 : false
				item = item.map((tr, index) => {
					if (index === 0) {
						return '<thead><tr><th>' + tr.replace(/,/g, '</th><th>') + '</th></tr></thead><tbody>'
					} else if (index > 1) {
						return '<tr>' + tr.split(',').map((td, i) =>
						`<td ${align[i] === '1' ? 'class="td-left"' : ''}>${td}</td>`).join('') + '</tr>'
					}
				}).join('')
				// 因为表格需要加宽度，在外面不好加，所以就在这里处理
				return `%%<table ${widthIndex ? 'style="width:' + align[widthIndex] + 'px"' : ''}>${item}</tbody></table>%%`
			})

			// 去掉防误触 ¿，一般用于代码块和 a 标签
			.replace(/¿/g, '')
	}

	// 将文档分割成每一行进行处理，开头或结尾的标识符替换成对应的标签，没有标识符的当成 p 标签
	String.prototype.formatTag = function () {
		return this.split('\n').map(item => {
			// 去掉开头缩进
			item = item.replace(/^\s*/, '')
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
			else if (REG.listTag.test(item)) {
				return `<ul>${item.replace(REG.listTag, '')}</ul>`
			}
			// 表格
			else if(REG.tableTag.test(item)) {
				return item.replace(REG.tableTag, '')
			}
			// 代码块
			else if(REG.codeBlockTag.test(item)) {
				return `<div class="code">
							<span class="copy" onclick="copyCode(this)">复制</span>
							<pre>${item.replace(REG.codeBlockTag, '').replace(/ˊ/g, '\n')}</pre>
							<i class="iconfont icon-dui2 copy-success" onanimationend="this.classList.remove('copy-success-active')"></i>
						</div>`
			}
			// 底部链接
			else if (REG.link.test(item)) {
				return `<div class="link">${item.replace(REG.link, '')}</div>`
			}
			// 最后更新时间
			else if (REG.time.test(item)) {
				return `<time>最后更新时间：${item.replace(REG.time, '')}</time>`
			}
			// 剩下的除了空行都是段落
			else if (item !== '') {
				return `<p>${item}</p>`
			}
		}).join('')
	}
	return text.formatString().formatTag()
};