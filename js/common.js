/* 待做：
 * 先把已有的笔记转移，还要重装系统呢，下面这些以后再说
 * 文档内跳转精确到h1、h2
 * 可能对代码块的html和css部分稍微再调整
 * 搜索，可参考Algolia，实在不行就拉倒
 * 设置：
 * 		回到上次：页面在关闭前用localstorage记录当前位置，下次再打开提示是否回到上次的位置，可以关闭和5秒后以3秒淡出，也可以勾选不再提醒，设置也可以更改打开或关闭
 * 		换肤：把相关颜色抽离出来，用一个web同级的class控制用sass循环，把选择的颜色保存在localstorage，所涉及的颜色：header和aside的背景色，h1的颜色
 * 		换背景：点击更换web容器的背景图片，可以取标签和阮一峰这种柔和一点的，百度一下
 * 		反馈页列表：第一次留下大名，直接提交内容，谁都可以留言
 * 		github链接
 */

let h1Active = 0	// 记录h1的active，不必重复调用asideActive()
let $asideH2 = null	// h2元素，每次页面改变和h1改变的时候而改变
const h2Height = () => $('aside .h2').height($('aside').height() - $('aside .h1').height() - 60) // h2的高度调整
const scrollToTop = pos => $('html').stop(true).animate({ scrollTop: pos }) // 滚动到指定位置
const asideActive = () => { for(let i = $('h1').length - 1; i >= 0; i--) if ($('h1').eq(i).offset().top < $(window).scrollTop() + 200) return i }	// 获取当前是哪个h1
const asideActive2 = () => { for(let i = $asideH2.length - 1; i >= 0; i--) if ($asideH2.eq(i).offset().top < $(window).scrollTop() + 150) return i }	// 获取当前是哪个h2
let asideClick = true	// 点击左边菜单不触发asideActive的滚动事件，400ms结束也就是滚动完再恢复
let asideTimer = null
const asideTime = () => {
	asideClick = false
	clearTimeout(asideTimer)
	asideTimer = setTimeout(()=>{ asideClick = true }, 400)
}
let scrollTimer = null // 降低滚动频率
let isPageHash = false	// 避免重复触发hashchange事件，当手动点击菜单切换的时候就不必触发hashchange了，只在点击刷新、前进后退和手动输入地址栏触发
const initHash = obj => {
	if(location.hash) {	// 如果有路径，说明是刷新、前进后退或手动输入的路径
		try {
			commonData[obj.menuParent][obj.menuChild]	// 尝试该路径能否读取，若能读取就继续往下执行，若不存在则报错进入catch
			obj.index = false	// 显示文章
			obj.init()	// 初始化内容
		} catch {
			obj.index = true	// 显示目录
			console.warn('hash值：' + location.hash + '不存在！')
		}
	}
}
const copyCode = function(item) {	// 复制代码，在匹配代码块的时候写在行内
	$('.web').after('<textarea id="copy-textarea">' + pageCode[$(item).index('.copy')] + '</textarea>')	// 创建一个看不见的文本域，要复制的代码作为value
	$('#copy-textarea').select()	// 全选value
	document.execCommand('copy')	// 执行复制
	$('#copy-textarea').remove()	// 删除这个文本域
	$('.copy-success').eq($(item).index('.copy')).addClass('copy-success-active')	// 复制右边的勾加个动画表示复制成功
}
$(window).on('scroll', function(){	// 监听页面滚动改变当前h1和h2的active，如果刷新后有滚动距离也会触发一次
	if(!scrollTimer) {	// 降低滚动触发频率提升性能，至少间隔0.1s再触发
		scrollTimer = setTimeout(() => {
			scrollTimer = null
			if(asideClick) {	// 如果是点击左边菜单的滚动不触发，避免重复
				h1Active = asideActive()
				if(vue.asideActive !== h1Active) {	// 当前h1改变后再改变：h1的active和h2的高度
					vue.asideActive = h1Active
					h2Height()
				}
				$asideH2 = $('h1').eq(h1Active).nextUntil('h1').filter('h2')	// 更新h2元素用于获取h2的active
				vue.asideActive2 = asideActive2()
			}
		}, 100)
	}
}).on('hashchange', function(e){
	if(isPageHash) {	// 如果是手动点击就改回false
		isPageHash = false
	} else {	// 如果是点击刷新、前进后退和手动输入地址栏，获取赋值父子路径，然后初始化
		vue.menuParent = location.hash.replace(/^#|\/[^]*/g, '')
		vue.menuChild = location.hash.replace(/[^]*\//, '')
		initHash(vue)
	}
})

let vue = new Vue({
	el: '.web',
	data: {
		index: true,	// 切换目录和文章
		menuParent: location.hash.replace(/^#|\/[^]*/g, ''),	// 父级路径
		menuChild: location.hash.replace(/[^]*\//, ''),	// 子级路径
		commonData,	// 所有数据，未解析过，用于循环展示目录
		asideH1: [],	// h1的标题文字
		asideH2: [],	// h2的标题文字
		asideActive: 0,	// h1的active
		asideActive2: 0,	// h2的active
		article: ''	// 解析过的文章
	},
	created() {
		initHash(this)
	},
	methods: {
		init() {	// 初始化解析内容
			this.article = formatHtml(commonData[this.menuParent][this.menuChild].content)	// 初始化内容，运行formatHtml()之后才有标题文字asideH1和asideH2
			this.asideH1 = pageH1	// 初始化h1标题文字
			this.asideH2 = pageH2	// 初始化h2标题文字
		},
		directory() {	// 点击左上回到目录页
			this.index = true	// 显示目录
			location.hash = ''	// 清空路径
			$('html').scrollTop(0)	// 回到顶部
		},
		onAsideH1(index) {	// 左边菜单h1点击事件
			this.asideActive = index	// 切换到当前active
			this.asideActive2 = 0	// h2的元素改变了，所以active归0
			$('article').find('h1').eq(index).click()	// 滚动h1到指定位置
			asideTime()	// 点击左边菜单不触发asideActive的滚动事件，400ms结束也就是滚动完再恢复
		},
		onAsideH2(index) {	// 左边菜单h2点击事件
			this.asideActive2 = index	// 切换到当前active
			$asideH2.eq(index).click()	// 滚动到指定位置
			asideTime()	// 点击左边菜单不触发asideActive的滚动事件，400ms结束也就是滚动完再恢复
		},
		changePage(parent, child) {	// 点击顶部菜单和目录菜单切换路径
			this.index = false	// 显示文章
			this.menuParent = parent	// 切换父级路径，在每个data文件定义的时候，比如commonData.js.grammar，js就是个父级路径，grammar就是个子级路径
			this.menuChild = child	// 切换子级路径
			isPageHash = true
			location.hash = parent + '/' + child	// 手动添加路径，上面设置isPageHash避免触发hashchange事件
			this.init()	// 初始化解析内容
			$('html').scrollTop(0)	// 回到顶部
		}
	}
})

//console.log(commonData)