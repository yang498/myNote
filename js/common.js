/* 待做：
 * 先把已有的笔记转移，还要重装系统呢，下面这些以后再说
 * 可能对代码块的html部分稍微再调整
 * 整体流程做一遍详细说明
 * 文档内跳转精确到h1、h2
 * 搜索，可参考Algolia，实在不行就拉倒
 * 设置：
 * 		回到上次：页面在关闭前用localstorage记录当前位置，下次再打开提示是否回到上次的位置，可以关闭和5秒后以3秒淡出，也可以勾选不再提醒，设置也可以更改打开或关闭
 * 		换肤：把相关颜色抽离出来，用一个web同级的class控制用sass循环，把选择的颜色保存在localstorage，所涉及的颜色：header和aside的背景色，h1的颜色
 * 		换背景：点击更换web容器的背景图片，可以取标签和阮一峰这种柔和一点的，百度一下
 * 		反馈页列表：第一次留下大名，直接提交内容，谁都可以留言
 * 		github链接
 */

const h2Height = () => $('aside .h2').height($('aside').height() - $('aside .h1').height() - 60)	// h2的高度调整
const scrollToTop = pos => $('html').stop(true).animate({ scrollTop: pos }) // 滚动到指定位置
const asideActive = () => { for(let i = $('h1').length - 1; i >= 0; i--) if ($('h1').eq(i).offset().top < $(window).scrollTop() + 200) return i } // 获取h1的active
let $asideH2 = null
const asideActive2 = () => { for(let i = $asideH2.length - 1; i >= 0; i--) if ($asideH2.eq(i).offset().top < $(window).scrollTop() + 150) return i }
let asideClick = true	// 点击左边菜单不触发asideActive的滚动事件，400ms结束也就是滚动完再恢复
let asideTimer = null
let scrollTimer = null // 降低滚动频率，每秒只触发10次
let isPageHash = false	// 避免重复触发hashchange事件
const initHash = obj => {	// 判断hash有没有，有的话并且能够读取，否则回到目录
	if(location.hash) {
		try {
			commonData[menuParent][menuChild]
			obj.index = false
			obj.init()
		} catch {
			obj.index = true
			console.warn('hash值：' + location.hash + '不存在！')
		}
	}
}
const copyCodeFn = function(item) {		// 复制代码
	$('.web').after('<textarea id="copy-textarea">' + copyCode[$(item).index('.copy')] + '</textarea>')
	$('#copy-textarea').select()
	document.execCommand('copy')
	$('#copy-textarea').remove()
	$('.copy-success').eq($(item).index('.copy')).addClass('copy-success-active')
}
$(window).on('scroll', function(){
	if(!scrollTimer) { // 降低滚动频率，每秒只触发10次
		scrollTimer = setTimeout(() => {
			scrollTimer = null
			if(asideClick) {
				let active = asideActive()
				if(vue.asideActive !== active) {	// 当h1改变后再改变
					vue.asideActive = active
					h2Height()
				}
				$asideH2 = $('h1').eq(active).nextUntil('h1').filter('h2')	// 新的h1下的h2
				vue.asideActive2 = asideActive2()
			}
		}, 66)
	}
}).on('hashchange', function(e){
	if(isPageHash) {
		isPageHash = false
	} else {
		vue.menuParent = menuParent = location.hash.replace(/^#|\/[^]*/g, '')
		vue.menuChild = menuChild = location.hash.replace(/[^]*\//, '')
		initHash(vue)
	}
})

let vue = new Vue({
	el: '.web',
	data: {
		index: true,
		menuParent,
		menuChild,
		commonData,
		asideH1: [],
		asideH2: [],
		asideActive: 0,
		asideActive2: 0,
		article: ''
	},
	created() {
		initHash(this)
	},
	methods: {
		init() {
			this.article = formatHtml(commonData[menuParent][menuChild].content)	// 运行之后才有asideH1和asideH2
			this.asideH1 = commonData[menuParent][menuChild].h1
			this.asideH2 = commonData[menuParent][menuChild].h2
		},
		onAsideH1(index) {
			this.asideActive = index
			this.asideActive2 = 0
			asideClick = false
			clearTimeout(asideTimer)
			asideTimer = setTimeout(()=>{ asideClick = true }, 400)
			$('article').find('h1').eq(index).click()
		},
		onAsideH2(index) {
			this.asideActive2 = index
			asideClick = false
			clearTimeout(asideTimer)
			asideTimer = setTimeout(()=>{ asideClick = true }, 400)
			$asideH2.eq(index).click()
		},
		directory() {
			this.index = true
			location.hash = ''
			$('html').scrollTop(0)
		},
		changePage(parent, child) {
			isPageHash = true
			this.index = false
			this.menuParent = menuParent = parent
			this.menuChild = menuChild = child
			this.init()
			location.hash = parent + '/' + child	// 手动加记录
			$('html').scrollTop(0)
		}
	}
})

//console.log(commonData)