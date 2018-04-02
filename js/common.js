/* 整体来说js文件引入的比较多，可能初次加载得会慢一点，要改动整体方式的话会改动得比较大
 * 待做：
 * 先把已有的笔记转移
 * weex中的flex布局加个链接跳转到css中的flex
 * 可能存在的问题：切换文档需要无过渡到顶部
 * 双点代码块，正则颜色，完善整理format-html，li和整体样式再调一下
 * 文内链接：点击进入对应文档
 * 搜索：Algolia
 * 设置：
 * 		回到上次：页面在关闭前用localstorage记录当前位置，下次再打开提示是否回到上次的位置，可以关闭和5秒后以3秒淡出，也可以勾选不再提醒，设置也可以更改打开或关闭
 * 		换肤：把相关颜色抽离出来，用一个web同级的class控制用sass循环，把选择的颜色保存在localstorage，所涉及的颜色：header和aside的背景色，h1的颜色
 * 		换背景：点击更换web容器的背景图片，可以取标签和阮一峰这种柔和一点的，百度一下
 * 		反馈页列表：第一次留下大名，直接提交内容，谁都可以留言
 */

const scrollToTop = pos => $('html').stop(true).animate({ scrollTop: pos })
const asideActive = () => { for(let i = $('h1').length - 1; i >= 0; i--) if ($('h1').eq(i).offset().top < $(window).scrollTop() + 200) return i }
let asideClick = true	// 点击左边菜单不触发asideActive
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
$(window).on('scroll', function(){
	if(!scrollTimer) {
		scrollTimer = setTimeout(() => {
			scrollTimer = null
			asideClick && (vue.asideActive = asideActive())
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
		aside: [],
		asideActive: 0,
		article: ''
	},
	created() {
		initHash(this)
	},
	methods: {
		init() {
			this.article = formatHtml(commonData[menuParent][menuChild].content)	// 运行之后才有aside.title
			this.aside = commonData[menuParent][menuChild].title
		},
		asideTitle(index) {
			this.asideActive = index
			asideClick = false
			clearTimeout(asideTimer)
			asideTimer = setTimeout(()=>{ asideClick = true }, 400)
			$('article').find('h1').eq(index).click()
		},
		changePage(parent, child) {
			isPageHash = true
			this.index = false
			this.menuParent = menuParent = parent
			this.menuChild = menuChild = child
			this.init()
			location.hash = parent + '/' + child	// 手动加记录
		}
	}
})

//console.log(commonData)