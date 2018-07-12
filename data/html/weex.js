commonData.html.weex = {
	content: `
	#起步
	
	##介绍
	使用 Weex 可以构建一个真正的原生应用，它不是一个 HTML5 库或开发框架，不是一套全新的技术，不是为了解决纯 native 开发的体验问题，不是一个以自身为中心的移动应用开发框架，而是一套简单易用的跨平台开发方案，能以 web 的开发体验构建高性能、可扩展的 native 应用，并遵循 W3C 标准实现了统一的 JSEngine 和 DOM API，打造三端一致的 native 应用。其工作架构如下所示：
	!./img/html/weex02.jpg,600
	在本地用一个叫做 transformer 的工具把所有代码转成 JavaScript 代码
	在客户端运行一个 JavaScript 引擎，随时接收 JavaScript 代码
	在客户端设计一套 JS Bridge，让 native 代码可以和 JavaScript 引擎相互通信
	Weex 在 iOS 中使用 JSCore ，在 Android 中使用 v8，因此都支持es5
	¡(./img/html/weex03.jpg,450)¡(./img/html/weex04.png,450)
	Weex 的结构是解耦的，渲染引擎与语法层是分开的，也不依赖任何特定的前端框架，目前主要支持 Vue.js 和 Rax 这两个前端框架。
	在开发 Weex 页面就像开发普通网页一样；在渲染 Weex 页面时和渲染原生页面一样。
	
	##安装开发环境
	安装 weex-toolkit 脚手架工具
	使用npm安装：·npm install -g weex-toolkit·
	查看版本号：·weex -v·
	查看是否安装成功：·weex·
	如果使用·cnpm·安装后提示权限错误（permission error）：
	!./img/html/weex01.jpg
	先卸载之前的·cnpm uninstall -g weex-toolkit·，使用·sudo·关键字进行安装
	·sudo cnpm install -g weex-toolkit·
	windows是不支持·sudo·的，卸载完直接用·npm install -g weex-toolkit·
	如果还不行，直接删除npm和npm-cache目录下与weex相关的文件和目录
	
	##初始化
	·weex init project-name·
	或在建好的文件夹下直接·weex init·
	通过·cnpm install·安装项目依赖
	如果以后出现·cannot find module ...·这样的错误，可以试试删除node_modules重装依赖·cnpm install·
	
	##目录
	‖
	src/*：编写页面代码
	dist/*：生成的js文件
	app.js：weex页面的入口
	webpack.config.js：webpack 配置文件，用于生成 .we 文件的 JSBunlde
	config.json：项目配置文件，本地IP
	build/*：构建脚本
	weex.html：web端展示页面
	index.html：用iframe内嵌weex.html展示效果，或手机下载playground扫一扫
	assets：资源文件，用于网页浏览
		style.css：css文件，
		qrcode.js：生成二维码
		url.js：生成链接
		phantom-limb.js：鼠标模拟touch
	.babelrc：转es5配置
	.eslintrc：.babelrc转换标准
	‖
	
	##常用命令
	‖
	npm run dev：监听文件改动编译生成js文件，比如改动src/foo.vue后，自动编译到dist/app.web.js，让webpack.config.js 去控制文件的输入和输出，以及如何处理等
	npm run serve：开启服务查看页面，在http://localhost:8080/index.html可查看
	npm run build：打包
	npm run debug：调试模式
	weex src/foo.vue：预览指定页面
	weex debug：调试，也可调试单文件weex debug foo.vue
	weex compile src dist：打包指定目录，src为源文件目录，dist为打包目标目录，可以单文件打包weex compile src/foo.vue dist
	weex platform add android/ios：用模拟器查看运行效果
	‖
	
	#组件
	
	##目录
	‖
	text：文本容器
	a：链接，注意不能在里面直接添加文本，需用text标签包裹
	div：容器，不能直接添加文本，里面用text标签包裹，超出会隐藏
	scroller：可滚动的容器
	image：图片，必须要有宽高，不支持子组件
	input：输入框，不支持子组件
	textarea：文本域
	list：列表滚动容器，适合长列表的展示，相当于·<ul>·
		cell：子组件，相当于·<li>·
	recycle-list：list的升级版，具有回收和复用的能力，可以大幅优化内存占用和渲染性能
		cell-slot：子节点
	refresh：下拉刷新，只能在scroller、list、waterfall中使用
		loading-indicator：转圈动画的子组件，注意Android和iOS的样式是不一样的
	loading：上拉加载，属性同refresh
		loading-indicator：转圈动画的子组件，注意Android和iOS的样式是不一样的
	slider：轮播图
		indicator：轮播图的指示器小点组件
	switch：开关
	video：视频
	waterfall：瀑布流布局的组件容器
	web：网页容器
	‖
	
	##image
	·<image>·不支持background，只有background-color，src也不支持相对和本地路径，需用网络路径代替，resize属性在iOS上无效，需要设置好宽高，placeholder属性为，注意当源图片的src是个空字符串或不存在时不显示占位图
	属性：
	‖
	placeholder{String}：URL、Base64，在图片下载中时显示一张占位图，当加载后会被删除
	resize{String}[stretch]：显示模式，可选cover（完全覆盖）、contain（完全显示）、stretch（拉伸覆盖）
	‖
	###模块方法
	save：保存图片内容到本地文件或相册，此操作可能需要设备相关权限
	‖
	callback{Function}：在图片被写入到本地文件或相册后的回调
		result{Object}：回调结果对象，属性列表
			success{Boolean}：标记图片是否已写入完成
			errorDesc{String}：如果图像没有成功写入，该字符串包含了详细的错误描述
	‖
	示例：
	··
	<image ref="poster" src="path/to/image.png"/>
	// methods
	const $image = this.$refs.poster
	$image.save(result => {
	  if (result.success) {
		// Do something to hanlde success
	  } else {
		console.log(result.errorDesc)
		// Do something to hanlde failure
	  }
	})
	··
	###事件
	load：当加载完成 src 指定的图片时触发
	事件对象：
	‖
	success{Boolean}：标记图片是否成功加载
	size{Object}：加载的图片大小对象
		naturalWidth{Number}：图片宽度，如果图片加载失败则为0
		naturalHeight{Number}：图片高度，如果图片加载失败则为0
	‖
	
	##refresh
	下拉刷新，只能在scroller、list、waterfall中使用
	###属性
	‖
	display{String}[show]：控制组件的显示隐藏，可选show、hide
	‖
	事件：
	‖
	refresh：下拉完时触发，即手松开的时候
	pullingdown：被下拉时触发，即手移动的时候，事件参数对象属性如下
		dy: 前后两次回调滑动距离的差值
		pullingDistance: 下拉的距离
		viewHeight: refresh 组件高度
		type: “pullingdown” 常数字符串
	‖
	###示例
	··
	<list>
		<refresh class="refresh" :display="refreshing?'show':'hide'" @refresh="onrefresh" @pullingdown="onpullingdown">
			<loading-indicator class="refresh-indicator" :style="{'color':(pullingBorder?'rgba(0,140,214,1)':'rgba(0,140,214,0.5)')}"/>
			<div class="refresh-content" v-if="platform==='ios'&&!refreshing">
				<text class="refresh-arrow">{{pullingBorder?'&uarr;':'&darr;'}}</text>
				<text class="refresh-text">{{pullingBorder?'释放刷新':'下拉刷新'}}</text>
			</div>
		</refresh>
		
		<cell></cell>
		...
	</list>
	
	// script
	data: {
		refreshing: false,	// 是否显示下拉刷新
		pullingBorder: false,	// 下拉刷新是否到了松手可刷新的边界值
		pullingDistance: 170	// 下拉刷新的最低刷新下拉距离
	},
	methods: {
		onrefresh() {
			this.refreshing = true	// 手松开显示加载中
			this.init()	// 加载数据
		},
		onpullingdown(e) {
			this.pullingBorder = Math.abs(e.pullingDistance) > this.pullingDistance ? true : false
		},
		init() {
			stream.fetch({
				method: 'GET',
				type:'json',
				url: url
			}, res => {
				// 加载完数据隐藏加载动画
				this.refreshing = false
			})
	}
	
	// css
	.refresh {
		width: 750px;
		padding-top: 20px;
		padding-bottom: 20px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.refresh-indicator {
		width: 75px;
		height: 75px;
	}

	.refresh-content {
		width: 260px;
		flex-direction: row;
		align-items: center;
	}

	.refresh-arrow {
		color: #008cd6;
		font-size: 50px;
		margin-right: 10px;
	}

	.refresh-text {
		color: #008cd6;
		font-size: 32px;
	}
	··
	
	#模块
	使用模块需要先引入，比如·const animation = weex.requireModule('animation')·
	
	##目录
	‖
	animation：过渡动画
	clipboard：获取或设置粘贴板的内容
	dom：滚动节点到某个位置，获取节点信息，添加字体规则
	globalEvent：监听持久性事件，例如定位信息，陀螺仪等的变化
	setViewport：改变页面的相对满屏宽度（原来是750px），注意需要在入口文件的·new Vue·之前使用
	modal：消息提示框，支持·toast·、·alert·、·confirm·、·prompt·
	navigator：页面跳转，在切换的时候还可以应用动画效果
	picker：选择器，支持自定义数据单选、日期选择、时间选择
	storage：本地数据存储，支持setItem、getItem、removeItem、length、getAllKeys
	stream：网络请求
	webSocket：客户端和服务器双向通信
	webview：操作·<web>·网页的前进、后退、刷新、向当前页面发送数据
	‖
	
	##animation
	过渡动画：·animation.transition(el, options, callback)·
	‖
	el：将要执行动画的元素，通过设置ref属性和this.$refs调用
	options：参数
		styles：动画样式
			width{Length}：目标宽度
			height{Length}：目标高度
			backgroundColor{String}：目标颜色
			opacity{Number/0-1}[1]：目标透明度
			transformOriginn{String/x,y}[center center]：动画中心点
			transform{String}：变形，多个动画用空格隔开
				translate/translateX/translateY{px/%}：目标位置
				rotate/rotateX/rotateY{Number}：旋转角度
				scale/scaleX/scaleY{Number}：缩放
				perspective{Number}[+∞]：观察者距离z=0平面的距离
		duration{Number}[0]：持续时间，单位毫秒
		delay{Number}[0]：延迟时间，单位毫秒
		needLayout{Boolean}[false]：执行时是否产生布局动画即LayoutAnimation
		timingFunction{String}[linear]：运动曲线
			linear：匀速
			ease：逐渐变慢
			ease-in：由慢到快
			ease-out：由快到慢
			ease-in-out：由慢到快，到中间点再由快到慢
			cubic-bezier(x1, y1, x2, y2)：自定义α(贝塞尔|http://cubic-bezier.com/)值
	callback：动画执行完毕之后的回调函数。在iOS上可以获取动画执行是否成功的信息，Android木有
	‖
	示例：
	··
	const animation = weex.requireModule('animation')
	
	animation.transition(this.$refs.xx, {
		styles: {
			color: '#f00',
			backgroundColor: '#ccc',
			transform: 'translateY(-100%) rotate(180deg)',
			transformOrigin: 'center center'
		},
		duration: 800,
		timingFunction: 'ease',
	}, () => {
		modal.toast({ message: 'animation finished' })
	})
	··
	
	##clipboard
	获取或设置粘贴板的内容，注意仅支持文本拷贝，不支持 html5。
	###API
	‖
	getString(callback(res))：获取粘贴板的内容
		res.data：获取到的文本内容
		res.result：返回状态，可能为 success 或 fail
	setString(text)：将一段文本复制到剪切板，相当于手动复制文本
	‖
	###示例
	··
	const clipboard = weex.requireModule('clipboard')
	
	clipboard.setString('来自clipboard')
	clipboard.getString(res => {
		this.message = 'text from clipboard:' + res.data
	})
	··
	
	##dom
	###scrollToElement(ref, options)
	滚动到相应节点，这个 API 只能用于可滚动组件的子节点，例如 <scroller>，<list> 等可滚动组件中。
	‖
	ref{Node}：要滚动的节点
	options{Object}:
		offset{Number}[0]: 一个到其可见位置的偏移距离
		animated{Boolean}[true]：是否需要附带滚动动画
	‖
	··
	const dom = weex.requireModule('dom')
	
	dom.scrollToElement(this.$refs.item10[0], { offset: 10 })
	··
	###getComponentRect(ref, callback)
	通过标签的 ref 获得其布局信息，返回的信息在 callBack 中：
	··
	{
		result: true,
		size: {
			bottom: 60,
			height: 15,
			left: 0,
			right: 353,
			top: 45,
			width: 353
		}
	}
	··
	如果想要获取到 Weex 视口容器的布局信息，可以指定 ref 为字符串 'viewport'，即·getComponentRect('viewport', callback)·
	###addRule(type, contentObject)
	addRule是可以为 dom 添加一条规则，目前支持自定义字体fontFace规则，构建自定义的font-family，可以在text使用
	··
	const dom = weex.requireModule('dom')
	dom.addRule('fontFace', {
		'fontFamily': "iconfont2",	// 注意不要和已有的字体名称冲突，所以要特殊一点
		'src': "url('http://×at.alicdn.com/t/font_1469606063_76593.ttf')"
	})
	··
	
	##modal
	··
	const modal = weex.requireModule('modal')	//引入模块
	
	// 提示消息，在显示一段时间之后自动消失
	modal.toast({
		message{String}：'要提示的消息',
		duration{Number}[3]: 持续的时间，以秒为单位，Android大于3秒会使用系统变量LONG，否则是SHORT
	})
	
	// 提示警告框
	modal.alert({
		message{String}：'要提示的消息',
		okTitle{String}[OK]：'确定按钮的文字'
	}, callback{Function}：用户操作完成后的回调)
	
	// 确认框
	modal.confirm({
		message{String}：'要提示的消息',
		okTitle{String}[OK]：'确定按钮的文字',
		cancelTitle{String}[Cancel]：'取消按钮的文字'
	}, callback{Function(res)}：用户操作完成后的回调，res为确定按钮上的文字)
	
	// 提示输入框
	modal.prompt({
		message{String}：'要提示的消息',
		okTitle{String}[OK]：'确定按钮的文字',
		cancelTitle{String}[Cancel]：'取消按钮的文字'
	}, callback{Function(res{Object})}：用户操作完成后的回调，res参数如下：
		result{String}：用户按下的按钮上的文字信息,
		data{String}：用户输入的信息
	)
	··
	
	##picker
	
	###pick(options, [callback])：单选
	‖
	options：样式参数
		items{Array}：数据源
		index{Number}：默认选中的选项
		textColor{Color}：选项文字的颜色
		selectionColor{Color}：选中item的背景色
		confirmTitle{String}：确认按钮的文字
		cancelTitle{String}：取消按钮的文字
		confirmTitleColor{Color}：确认按钮的文字颜色
		cancelTitleColor{Color}：取消按钮的文字颜色
		title{String}：对话框的标题
		titleColor{Color}：对话框标题的文字颜色
		titleBackgroundColor{Color}：对话框标题的背景色
	callback{Function(res{Object})}：选择完的回调函数。res参数属性如下
		result{String}：结果三种类型 success, cancel, error
		data{Number}：选择的选项，仅成功确认时候存在
	‖
	
	###pickDate(options, [callback])：日期选择
	‖
	options{Object}：选项参数
		value{String}：必填，默认选中的选项，时间格式为yyyy-MM-dd
		max{String}：可选，date 的最大值
		min{String}：可选，date 的最小值
	callback{Function(ret{Object})}：选择完的回调函数。res参数属性如下
		result{String}：结果三种类型 success, cancel, error
		data{String}：选择的值，格式为yyyy-MM-dd，仅成功确认的时候存在。
	‖
	
	###pickTime(options, [callback])：时间选择
	‖
	options{Object}：选项参数
		value{String}：必填，默认选中的选项，时间格式为HH:mm
	callback{Function(ret{Object})}：选择完的回调函数。res参数属性如下
		result{String}：结果三种类型 success, cancel, error
		data{String}：选择的值，格式为HH:mm，仅成功确认的时候存在。
	‖
	
	##stream
	网络请求：·stream.fetch(options, callback, [progressCallback])·
	‖
	options{Object}：请求的选项
		method{String}：GET/POST，GET请求不支持body方式传递参数，需使用url传参
		url{String}：请求的URL
		headers{Object}：HTTP请求头
		type{String}：响应类型，json、text或是jsonp
		body{String}：HTTP请求体，如果是JSON格式需先将其转为字符串
	callback{Function(res)}：响应结果回调，res参数属性如下
		status{Number}：返回的状态码
		ok{Boolean}：如果状态码在200~299之间就为真
		statusText{String}：状态描述文本
		data{Object|String}：返回的数据，如果请求类型是json和jsonp为object，否则是string
		headers{Object}：响应头
	progressCallback{Function(res)}：关于请求状态的回调，在请求完成后被调用，res参数属性如下
		readyState{Number}：当前状态，数字说明如下
			1：state，请求连接中
			2：opened，返回响应头中
			3：received，正在加载返回数据
		status{Number}：响应状态码
		length{Number}：已经接受到的数据长度，可以从响应头中获取总长度
		statusText{String}：状态文本
		headers{Object}：响应头
	‖
	♭注意：♭
	默认·Content-Type·是·application/x-www-form-urlencoded·，如果需要通过POST json，需设为·application/json·
	如果url带有中文需先用·encodeURI()·或·encodeURIComponent()·进行转码
	
	#事件
	‖
	click：点击
	longpress：长按
	swipe：轻扫，根据 type 可判断方向
	appear：当元素在屏幕上可见
	disappear：当元素在屏幕上消失
	page（不支持网页端）：通过 viewappear 和 viewdisappear切换页面前后触发
	tap：低延迟点击
	touchstart：手指按下
	touchmove：手指移动
	touchend：手指抬起
	touchcancel：触摸取消，比如手指按住屏幕的时候提示电量不足了、闹钟响了、打电话来了等
	pan：拖动
	panstart：拖动开始
	panmove：拖动中
	panend：拖动结束
	horizontalpan：水平拖动
	verticalpan：垂直拖动
	‖
	注意：在scroller, list，webview滚动容器上有些可能无效


	#实例变量
	每个 Weex 页面的 JS 上下文中都有一个相互独立的 weex 变量，它可以像全局变量一样使用，不过它在不同页面中是隔离而且只读的。
	注意：weex 实例变量只在 Vue 框架中暴露了，目前还不支持在 Rax 框架中使用。
	Weex 实例变量的类型定义如下：
	··
	declare type Weex = {
		config: WeexConfigAPI;	// 当前环境信息
		document: WeexDocument;	// 当前页面的文档模型对象
		requireModule: (name: string) => Object | void;	// 引用自定义或内置的模块
		supports: (condition: string) => boolean | void;	// 检测某个功能在当前环境中是否可用
		isRegisteredModule: (moduleName: string, methodName: string) => boolean	// 检测某个特定的模块或者接口是否可用
		isRegisteredComponent: (moduleName: string, methodName: string) => boolean	// 检测某个特定的组件是否可用
	}
	··
	
	##weex.config
	包含了当前 Weex 页面的所有环境信息
	··
	declare type WeexConfigAPI = {
		bundleUrl: string;
		bundleType?: string;
		env: WeexEnvironment;
	}
	··
	通过调用·this.$getConfig()·也能获取同样的信息：·weex.config === this.$getConfig()·
	还提供了全局环境变量WXEnvironment：·weex.config.env === WXEnvironment·
	比如返回：
	‖
	bundleUrl：xxx.js，当前页面js的url
	bundleType：当前页面的开发框架，可以是 "Vue" 或者 "Rax"
	env：环境对象
		appGroup：WXApp，当前APP应用类型
		appName：WXSample，当前APP应用名字
		appVersion：0.5.2.5，当前APP应用版本
		deviceWidth：1080，设备宽度
		deviceHeight：1920，设备高度
		deviceModel：vivoX6D，设备型号
		platform：Android，当前运行平台
		osName：Android，操作系统名称
		osVersion：5.1，系统版本
		weexVersion：0.9.4，weex sdk版本
		scale：3.0，页面缩放比例
	‖
	
	##weex.supports
	Weex 的组件和模块都是可以注册和配置的，这样导致了在不同环境中组件和模块的支持情况不一样。就使用 weex.supports 接口在运行期检测某个功能在当前环境中是否可用。
	使用格式为·weex.supports('@{type}/{name}')·
	type 必须是 "component" 和 "module" 之一
	name 可以是标签名、模块名，也可以指定模块中的某个方法名（和模块名用·.·隔开）
	♭返回值：♭
	支持该特性返回·true·。
	不支持该特性返回·false·。
	参数格式错误或无法确定是否支持返回·null·。
	♭示例：♭
	··
	// 检测某个组件是否可用：
	weex.supports('@component/slider') // true
	weex.supports('@component/my-tab') // false
	
	// 检测某个模块是否可用：
	weex.supports('@module/stream')  // true
	weex.supports('@module/abcdef')  // false
	
	// 检测某个模块是否包含某个方法：
	weex.supports('@module/dom.getComponentRect') // true
	weex.supports('@module/navigator.jumpToPage') // false
	
	// 无效的输入：
	weex.supports('div') // null
	weex.supports('module/*') // null
	weex.supports('@stream/fetch') // null
	weex.supports('getComponentRect') // null
	··
	
	#常见问题
	
	##css
	在 Weex 里， 每一个 Vue 组件的样式都是 scoped
	&nbsp;
	唯一的布局模型display：flex，默认为垂直布局：flex-direction: column，align-items：stretch，所以在不改变flex-direction为row的情况下宽度是100%填满的，最大父容器默认填满整个屏幕，div跟随内容撑高，滚动容器填满剩余空间（Android没有内容也会没有高度）
	&nbsp;
	不支持display：none和v-show，用v-if或translate100%代替
	不支持浮动，用flex-direction: row进行横向排列
	&nbsp;
	css单位只支持px，内容会自动适配好，宽度以750基准
	&nbsp;
	宽设为100%可以用750px或父容器设置align-items: stretch;
	高设为100%可以用父容器设置flex-direction: row;align-items: stretch;或flex设置得足够大;
	line-height在ios不会居中而会贴近底部，建议用padding或flex居中
	overflow 在 Android 默认为 hidden 且无法修改
	&nbsp;
	选择器只支持.class，重复写同一个class，后者会覆盖前者，需换个class，主要从性能角度考虑，传统的css可以理解为是一个N对N的数据库，匹配过程非常复杂，性能也得不到非常好的保证，而单个可以，注意行内style样式的权重比页内和页外都要低，不要冲突了
	&nbsp;
	position：不要用fixed定位，在Android端会被当成absolute，用相对于最大无滚动父容器的absolute的伪fixed，或者用·<div><scroller><btn></div>·隔开的方式，支持sticky定位
	&nbsp;
	不支持margin、padding、border的复合写法，要分开写，比如margin-left: 10px，border-color: #f00;，也不支持margin的auto
	&nbsp;
	滚动区域是不包括padding部分的
	&nbsp;
	定位默认为relative，z-index无效，用v-if渲染出来的元素层级会高点
	&nbsp;
	引入外部css样式：<style src="./common.css"/>
	&nbsp;
	ios设置flex-direction: row;子元素横排无效，需再加一层div
	&nbsp;
	给·<scroller>·和·<list>·加高度，ios没问题，在Android上大于屏幕会是100%
	
	##js
	默认不会开启事件冒泡，需在每个template的最大父容器上添加·bubble="true"·属性
	&nbsp;
	目前在 Weex 里不支持事件冒泡和捕获，因此 Weex 原生组件不支持事件修饰符，例如.prevent，.capture，.stop，.self
	&nbsp;
	es6（暂时发现）：支持·let·, ·const·, ·=>·，对象属性同名简写，不支持·for of·循环
	
	##vue的不支持
	‖
	组件
		transition：在移动端 enter 与 leave 的概念可能有点不同，并且 Weex 不支持·display: none;·
		transition-group：同 transition
		keep-alive：移动端的原生组件不能被前端缓存
	生命周期
		activated：不支持·<keep-alive>·
		deactivated：不支持·<keep-alive>·
	模板指令
		v-html：Weex 中没有 HTML 解析器
		v-show：不支持·display:none;·，
		v-cloak：不支持·[attr]·选择器，只支持·.class·
	实例方法
		vm.$mount()：无需手动安装 Vue 实例
	选项
		template：Weex 用的是 α(只包含运行时构建|https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6)
		comments
	全局API
		Vue.compile：同 template
	全局配置
		Vue.config.devtools：只在 Web 环境下支持
		Vue.config.performance：同 Vue.config.devtools
		Vue.config.keyCodes：在移动端不需要
	‖
	
	#动态性
	
	##说明
	今天在移动端，尤其是像手机淘宝这样的 App 中，动态性问题逐渐成为一个比较棘手的问题。所谓动态性，就是把移动应用本身的灵活性、迭代更新的周期和成本优化到极致。比如手机淘宝的店铺首页，它允许商家实时装修自己的店铺，更新自家的商品、活动等信息；再比如淘宝、天猫每次大促的会场页面，要求我们非常灵活的及时调整界面信息和状态，确保在瞬息万变的活动当天紧跟促销节奏，应对各种突发情况。
	所以我们不必要为这些动态性在多个端投入重复的精力，更不应该因此而频繁的触发新版本。所以动态性问题在今天的移动端显得尤其重要。
	有时候可能只改了那么1、2行代码就想更新一个版本的代价也就比较高了，尤其iOS还有审核周期
	
	##解决方案
	通过在线加载文件，比如在原生界面中嵌入 webview，React Native 在线加载 js 文件
	这样只需修改在线文件即可修改页面
	比如加载weex编译的js文件
	
	##工作模式
	Weex的三种工作模式。
	###全页模式
	目前支持单页使用或整个App使用Weex开发（还不完善，需要开发Router和生命周期管理），这是主推的模式，可以类比RN。
	###Native Component模式
	把Weex当作一个iOS/Android组件来使用，类比ImageView。这类需求遍布手淘主链路，如首页、主搜结果、交易组件化等，这类Native页面主体已经很稳定，但是局部动态化需求旺盛导致频繁发版，解决这类问题也是Weex的重点。
	###H5 Component模式
	在H5种使用Weex，类比WVC。一些较复杂或特殊的H5页面短期内无法完全转为Weex全页模式（或RN），比如互动类页面、一些复杂频道页等。这个痛点的解决办法是：在现有的H5页面上做微调，引入Native解决长列表内存暴增、滚动不流畅、动画/手势体验差等问题。
	&nbsp;
	另外，WVC将会融入到Weex中，成为Weex的H5 Components模式。
	
	αα
	
	weex官方文档αhttp://weex-project.io/cn/guide/index.html
	
	weex playground：Weex Native 运行时实例 & Weex 文件预览工具αhttp://weex-project.io/cn/tools/playground.html
	
	淘宝 NPM 镜像的 weex 扩展组件αhttps://npm.taobao.org/package/weex-components
	
	weex功能扩展 - 马伟奇的简书αhttps://www.jianshu.com/p/88ebcdc21d66
	
	weex学院：疑难解答、demoαhttps://www.weexdaxue.com
	
	github - weex相关插件αhttps://github.com/weex-plugins
	
	github - joggerplus/awesome-weex：教程、文章、工具、demoαhttps://github.com/joggerplus/awesome-weex
	
	github - vczero/weex-learning：Weex 学习/实践指南αhttps://github.com/vczero/weex-learning
	
	demo：Weex 300行代码开发一款简易的跑步Appαhttps://segmentfault.com/a/1190000008901154
	
	demo：Weex开发之路（二） - 完成一个ToDoList项目αhttp://ios.jobbole.com/91773/
	
	UI库 - Weex UIαhttps://alibaba.github.io/weex-ui/#/
	
	UI库 - BUI-Weexαhttp://dev.bingocc.com/buiweex/
	
	weex封装扩展 - erosαhttps://bmfe.github.io/eros-docs/#/
	
	weex封装扩展 - Natαhttp://natjs.com/#/zh-cn/
	αα

	&2018.7.5
	`
}