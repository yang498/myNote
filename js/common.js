/* start 2017.7.31
 * 只对常用和关键部分进行说明，其他带过，考虑到官方文档都有而且都在更新，单纯的复制粘贴也没有意义，注重知识输入输出
 * 待做：
 * 初次点击二级标题无反应，dom 未获取
 * 已结束的在首页加绿底
 * 网站的样式可以再调（bulma 还挺小清新），代码块的颜色可以参考 jsfiddle 等
 * 搜索：可参考 Algolia
 * 设置：
 * 		回到上次：
 * 			页面在关闭前用 localstorage 记录当前位置，下次再打开右上角出现一个从右往左的小提示框，是否回到上次的位置
 * 			可以关闭或 5 秒后滑出，也可以勾选不再提醒，在其他设置中也可以选择打开或关闭提示
 * 		换肤：
 * 			把相关颜色抽离出来，点击出现弹窗，可选择预定颜色和自定义调配
 * 			有滑竿和手动输入rgb和16进制颜色（3个tab选项：纯色、渐变色、图片），把选择的颜色保存在 localstorage
 * 			所涉及的颜色有：header 和 aside 的背景色，h1 和 h2 的颜色，表格的表头
 * 		换背景：点击出现弹窗，更换web容器的背景，同换肤的3个选项
 * 		反馈页列表：第一次留下大名，直接提交内容，谁都可以留言
 * 		以上功能还是要做个小后台才好同步记录
 * 		github 链接
 * 做个移动端适配，可能需要新的 mobile.html、mobile.scss
 * format-html：能不能再精简为一个return
 * 读取 word
 * 直接在网页内编辑修改
 */

let h1Active = 0	// 记录 h1 的 active，不必重复调用 asideActive()
let $asideH2 = null	// h2 元素，每次页面改变和 h1 改变的时候而改变
const h2Height = () => $('aside .h2').height($('aside').height() - $('aside .h1').height() - 60) // h2 的高度调整
const scrollToTop = pos => $('html').stop(true).animate({ scrollTop: pos }) // 滚动到指定位置
// 获取当前 h1 或 h2
const asideActive = (el, offset) => {
	for(let i = el.length - 1; i >= 0; i--)
	if (el.eq(i).offset().top < $(window).scrollTop() + offset)
	return i
}
// 点击左边菜单不触发 asideActive 的滚动事件，400ms 结束也就是滚动完再恢复
let asideClick = true
let asideTimer = null
const asideTime = () => {
	asideClick = false
	clearTimeout(asideTimer)
	asideTimer = setTimeout('asideClick = true', 400)
}
let scrollTimer = null // 降低滚动频率
let isPageHash = false	// 避免重复触发 hashchange 事件，当手动点击菜单切换的时候就不触发，点击刷新、前进、后退和手动输入地址栏时触发

// 复制代码
const copyCode = item => {
	$('.web').after('<textarea id="copy-textarea">' + pageCode[$(item).index('.copy')] + '</textarea>')	// 创建文本域，要复制的代码作为 value
	$('#copy-textarea').select()	// 全选 value
	document.execCommand('copy')	// 执行复制
	$('#copy-textarea').remove()	// 删除这个文本域
	$('.copy-success').eq($(item).index('.copy')).addClass('copy-success-active')	// 复制右边的勾加个动画表示复制成功
}

const nameChange = name => name.replace(/[A-Z]/g, '-$&').toLowerCase()
const scriptPath = {}

// 初始化内容
const initHash = obj => {
	try {
		commonData[obj.menuParent][obj.menuChild]	// 若能读取就继续往下执行，否则报错进入 catch 返回首页显示目录
		// 加载相应的 js 内容，如果之前加载过就不再加载
		const path = nameChange(obj.menuParent) + '/' + nameChange(obj.menuChild)
		if (!scriptPath[path]) {
			scriptPath[path] = true
			$('#import').after(`<script src="data/${path}.js" type="text/javascript" charset="utf-8"></script>`)
		}
		obj.index = false	// 显示文章
		obj.init()	// 初始化内容
	} catch {
		obj.index = true	// 显示目录
		obj.menuParent = obj.menuChild = '' // 清空路径不显示一级目录的背景 active
		$('title').text('前端笔记')
		location.hash && console.warn('hash值：' + location.hash + '不存在！')
	}
}

// 监听页面滚动改变当前 h1 和 h2 的 active，如果刷新后有滚动距离也会触发一次
$(window).on('scroll', function(){
	// 降低滚动触发频率，至少间隔 100ms 再触发
	if(!scrollTimer) {
		scrollTimer = setTimeout(() => {
			scrollTimer = null
			// 如果是点击左边菜单的滚动不触发，避免重复
			if(asideClick) {
				h1Active = asideActive($('h1'), 100)
				// 当前 h1 改变后再改变：h1 的 active 和 h2 的高度
				if(vm.asideActive !== h1Active) {
					vm.asideActive = h1Active
					h2Height()
				}
				// 更新 h2 元素用于获取 h2 的 active
				$asideH2 = $('h1').eq(h1Active).nextUntil('h1').filter('h2')
				vm.asideActive2 = asideActive($asideH2, 100)
			}
		}, 100)
	}
}).on('hashchange', function(e){
	// 监听 hash 值的变化，如果是手动点击就改回 false
	if(isPageHash) {
		isPageHash = false
	} else {
		// 如果是点击刷新、前进后退和手动输入地址栏，获取赋值父子路径，然后初始化
		vm.menuParent = location.hash.replace(/^#|\/[^]*/g, '')
		vm.menuChild = location.hash.replace(/[^]*\//, '')
		initHash(vm)
	}
})

let vm = new Vue({
	el: '.web',
	data: {
		isSearch: false,	// 切换搜索框
		index: true,	// 切换目录和文章
		menuParent: location.hash.replace(/^#|\/[^]*/g, ''),	// 父级路径
		menuChild: location.hash.replace(/[^]*\//, ''),	// 子级路径
		commonData,	// 所有数据，未解析过，用于循环展示目录
		asideH1: [],	// h1的标题文字
		asideH2: [],	// h2的标题文字
		asideActive: 0,	// h1的active
		asideActive2: 0,	// h2的active
		article: ''	// 文档内容
	},
	created() {
		initHash(this)
		$('title').text(commonData[this.menuParent][this.menuChild].name || this.menuChild)
	},
	methods: {
		// 初始化解析内容
		init() {
			this.article = formatHtml(commonData[this.menuParent][this.menuChild].content)	// 初始化内容
			this.asideH1 = pageH1	// 初始化h1标题文字
			this.asideH2 = pageH2	// 初始化h2标题文字
			setTimeout("$asideH2 = $('h1:first').nextUntil('h1').filter('h2')", 1) 	// 初始化 h2
		},

		// 点击左上 logo 回到目录页
		directory() {
			this.index = true	// 显示目录
			location.hash = ''	// 清空路径
			$('html').scrollTop(0)	// 回到顶部
		},

		// 左边菜单 h1 点击事件
		onAsideH1(index) {
			this.asideActive = index	// 切换到当前active
			this.asideActive2 = 0	// h2的元素改变了，所以active归0
			$('article').find('h1').eq(index).click()	// 滚动h1到指定位置
			asideTime()	// 点击左边菜单不触发asideActive的滚动事件，400ms结束也就是滚动完再恢复
		},

		// 左边菜单 h2 点击事件
		onAsideH2(index) {
			this.asideActive2 = index	// 切换到当前active
			$asideH2.eq(index).click()	// 滚动到指定位置
			asideTime()	// 点击左边菜单不触发asideActive的滚动事件，400ms结束也就是滚动完再恢复
		},

		// 点击顶部菜单和目录菜单切换路径
		changePage(parent, child) {
			this.index = false	// 显示文章
			this.menuParent = parent	// 切换父级路径，在每个data文件定义的时候，比如commonData.js.grammar，js就是个父级路径，grammar就是个子级路径
			this.menuChild = child	// 切换子级路径
			isPageHash = true
			location.hash = parent + '/' + child	// 手动添加路径，上面设置isPageHash避免触发hashchange事件
			$('title').text(commonData[parent][child].name || child)
			initHash(this)	// 初始化解析内容
			$('html').scrollTop(0)	// 回到顶部
		}
	}
})

//console.log(commonData)