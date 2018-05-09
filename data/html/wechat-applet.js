commonData.html.weex = {
	name: '微信小程序',
	content: `
	#介绍
	##注册
	##其他
	
	#框架
	
	##文件结构
	小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。
	一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：
	‖
	app.js!：小程序逻辑，公共js，比如声明全局变量
	app.json!：小程序公共设置
	app.wxss：小程序公共样式表
	‖
	一个小程序页面由四个文件组成，分别是：
	‖
	wxml!：页面结构
	wxss：页面样式表
	js!：页面逻辑
	json：页面配置
	‖
	♭注意：为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。♭
	
	##app.json
	配置项列表：
	‖
	pages{String Array}!：设置页面路径
	window{Object}：设置默认页面的窗口表现
	tabBar{Object}：设置底部 tab 的表现
	networkTimeout{Object}：设置网络超时时间
	debug{Boolean}：设置是否开启 debug 模式，在控制台面板显示调试信息以 info 的形式给出，有Page的注册，页面路由，数据更新，事件触发
	‖
	
	###pages
	接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成。每一项代表对应页面的【路径+文件名】信息，♭数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 pages 数组进行修改。♭
	文件名不需要写文件后缀，因为框架会自动去寻找路径下 .json, .js, .wxml, .wxss 四个文件进行整合。
	比如初始开发目录为：
	‖
	pages/
		index/
			index.wxml
			index.js
			index.wxss
		logs/
			logs.wxml
			logs.js
	app.js
	app.json
	app.wxss
	‖

	则需要在 app.json 中写
	··
	{
	  "pages":[
		"pages/index/index",
		"pages/logs/logs"
	  ]
	}
	··
	
	###window
	用于设置小程序的状态栏、导航条、标题、窗口背景色。属性说明：
	‖
	navigationBarBackgroundColor{HexColor}[#000000]：导航栏背景颜色，如"#000000"	
	navigationBarTextStyle{String}[white]：导航栏标题颜色，仅支持 black/white	
	navigationBarTitleText{String}：导航栏标题文字内容	
	navigationStyle{String}[default]：导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮， 该属性只在 app.json 中生效
	backgroundColor{HexColor}[#ffffff]：窗口的背景色	
	backgroundTextStyle{String}[dark]：下拉 loading 的样式，仅支持 dark/light	
	backgroundColorTop{String}[#ffffff]：顶部窗口的背景色，仅 iOS 支持
	backgroundColorBottom{String}[#ffffff]：底部窗口的背景色，仅 iOS 支持
	enablePullDownRefresh{Boolean}[false]：是否开启下拉刷新，详见页面相关事件处理函数	
	onReachBottomDistance{Number}[50]：页面上拉触底事件触发时距页面底部距离，单位为px
	‖
	
	###tabBar
	如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。	♭注意：当设置 position 为 top 时将不会显示 icon，配置最少2个、最多5个。♭属性说明：
	‖
	color{HexColor}!：tab 上的文字默认颜色
	selectedColor{HexColor}!：tab 上的文字选中时的颜色
	backgroundColor{HexColor}!：tab 的背景色
	borderStyle{String}[black]：tabbar上边框的颜色， 仅支持 black/white
	list{Array}!：tab 的列表，最少2个、最多5个 tab
		pagePath{String}!：页面路径，必须在 pages 中先定义
		text{String}!：tab 上按钮文字
		iconPath{String}：图片路径，大小限制为40kb，建议尺寸为 81*81px，当 postion 为 top 时此参数无效，不支持网络图片
		selectedIconPath{String}：选中时的图片路径，同 iconPath
	position{String}[bottom]：可选值 bottom、top
	‖
	
	###networkTimeout
	可以设置各种网络请求的超时时间。
	‖
	request{Number}[60000]：wx.request 的超时时间，单位毫秒
	connectSocket{Number}[60000]：wx.connectSocket 的超时时间，单位毫秒
	uploadFile{Number}[60000]：wx.uploadFile 的超时时间，单位毫秒
	downloadFile{Number}[60000]：wx.downloadFile 的超时时间，单位毫秒
	‖
	示例代码：
	··
	{
		"pages": [
			"pages/index/index",
			"pages/logs/index"
		],
		"window": {
			"navigationBarTitleText": "Demo"
		},
		"tabBar": {
			"list": [{
				"pagePath": "pages/index/index",
				"text": "首页"
			}, {
				"pagePath": "pages/logs/logs",
				"text": "日志"
			}]
		},
		"networkTimeout": {
			"request": 10000,
			"downloadFile": 10000
		},
		"debug": true
	}
	··
	
	###page.json
	每一个小程序页面也可以使用.json文件来对本页面的窗口表现进行配置。只是设置 app.json 中的 window 配置项的内容，会覆盖 app.json 的 window 中相同的配置项，无需写 window 这个键，如：
	··
	{
	  "navigationBarBackgroundColor": "#ffffff",
	  "navigationBarTextStyle": "black",
	  "navigationBarTitleText": "微信接口功能演示",
	  "backgroundColor": "#eeeeee",
	  "backgroundTextStyle": "light"
	}
	··
	
	###示例图片
	!./imgs/html/wechat-applet03.jpg,450
	!./imgs/html/wechat-applet04.png,550
	
	##wxml
	
	###数据绑定
	动态数据均来自对应 Page 的 data，使用 Mustache 语法（双大括号 {{}}）将变量包起来，比如：
	··
	// 内容
	&lt;view&gt;{{message}}&lt;/view&gt;
	Page({
	  data: {
		message: 'Hello MINA!'
	  }
	})
	
	// 组件属性
	&lt;view id="item-{{id}}"&gt; &lt;/view&gt;
	Page({
	  data: {
		id: 0
	  }
	})
	
	// 控制属性
	&lt;view wx:if="{{condition}}"&gt; &lt;/view&gt;
	Page({
	  data: {
		condition: true
	  }
	})
	
	// boolean关键字无需在data声明，注意不要直接写 checked="false"，这表示字符串，代表真值
	&lt;checkbox checked="{{false}}"&gt; &lt;/checkbox&gt;
	
	// 三元运算
	&lt;view hidden="{{flag?true:false}}"&gt; Hidden &lt;/view&gt;
	
	// 算数运算
	&lt;view&gt; {{a + b}} + {{c}} + d &lt;/view&gt;
	Page({
	  data: {
		a: 1,
		b: 2,
		c: 3
	  }
	})
	··
	
	##事件
	
	绑定：
	‖
	bind：冒泡
	catch：不冒泡
	capture-bind：捕获
	capture-catch：取消冒泡和中断捕获
	‖
	
	类型：
	‖
	touchstart：手指触摸动作开始
	touchmove：手指触摸后移动
	touchend：手指触摸动作结束	
	touchcancel：手指触摸动作被打断，如来电提醒，弹窗
	tap：手指触摸后马上离开（也就是点击事件）
	longpress：长按350ms触发，该事件触发后tap事件将不被触发
	transitionend：会在 WXSS transition 或 wx.createAnimation 动画结束后触发
	animationstart：会在一个 WXSS animation 动画开始时触发
	animationiteration：会在一个 WXSS animation 一次迭代结束时触发
	animationend：会在一个 WXSS animation 动画完成时触发
	touchforcechange：在支持 3D Touch 的 iPhone 设备，重按时会触发
	其他无特殊声明的都是不冒泡事件，比如submit、input、scroll
	‖
	
	事件对象：
	‖
	eventName(e) {
		e：{
			"type"："tap",	事件类型
			"timeStamp"：895,	事件生成时的时间戳，从页面打开开始计算
			"target"：{	事件的目标对象属性
				"id"："tapTest",	对象元素的id值
				"dataset"：{	data-定义的数据，属性名会转换成驼峰
					"hi"："WeChat"
				},
				offsetLeft：9	相对于父容器且不包括padding和滚动条的px单位距离
				offsetTop：6
			},
			"currentTarget"：{	事件的当前对象属性
				"id"："tapTest",
				"dataset"：{
					"hi"："WeChat"
				},
				offsetLeft：12,
				offsetTop：18
			},
			"detail"：{	事件的信息
				"x"：53, 同pageX
				"y"：14
			},
			"touches"：[{	触摸点信息
				"identifier"：0,	触摸点的标识符
				"pageX"：53,	相对于文档的距离，包括滚动距离
				"pageY"：14,
				"clientX"：53,	相对于屏幕除了导航栏的距离
				"clientY"：14
			}],
			"changedTouches"：[{	变化的触摸点信息，如从无变有（touchstart），位置变化（touchmove），从有变无（touchend、touchcancel）。
				"identifier"：0,
				"pageX"：53,
				"pageY"：14,
				"clientX"：53,
				"clientY"：14
			}],
			canvasTouch：[{	canvas专属的触摸点信息
				"identifier"：0,	触摸点的标识符
				"x"：53,	相对于canvas左上角的距离
				"y"：14,
			}]
		}
	}
	‖
	
	写法：·bindtap="eventName"·或·bind:tap="eventName"·
	传参：自定义的以·data-·开头的属性，多个单词用-连接，不能大写，有也会转换成小写，在·e.currentTarget.dataset·可拿到，比如·data-name="WeChat"·
	特殊事件：·&lt;canvas/&gt;·中的触摸事件不可冒泡，所以没有 currentTarget
	
	#组件
	
	注释·&lt;!-- --&gt;·左右的横杠就是2根，不然会全部注释
	每个页面默认有个·&lt;page&gt;&lt;/page&gt;·滚动父容器，可以不用添加最大父容器
	
	##input
	‖
	value{String}：输入框的初始内容
	type{String}[text]：input的类型，可选text（文本）、number（数字）、digit（有小数点的数字）、idcard（身份证）
	password{Boolean}[false]：是否是密码类型
	placeholder{String}：输入框为空时的占位符内容
	placeholder-style{String}：指定 placeholder 的样式
	placeholder-class{String}[input-placeholder]：指定 placeholder 的样式类
	disabled{Boolean}[false]：是否禁用
	maxlength{Number}[140]：最大输入长度，设置为 -1 的时候无限制
	cursor-spacing{Number}[0]：指定光标与键盘的距离，单位 px，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
	focus{Boolean}[false]：是否自动聚焦
	confirm-type{String}[done]：设置键盘右下角按钮的文字，可选done（完成）、send（发送）、search（搜索）、next（下一个）、go（前往）
	confirm-hold{Boolean}[false]：点击键盘右下角按钮时是否保持键盘不收起
	cursor{Number}：指定focus时的光标位置
	selection-start{Number}[-1]：光标起始位置，自动聚焦时有效，需与selection-end搭配使用
	selection-end{Number}[-1]：光标结束位置，自动聚焦时有效，需与selection-start搭配使用
	adjust-position{Boolean}[true]：键盘弹起时，是否自动上推页面
	bindinput{EventHandle}：当键盘输入时触发，event.detail = {value, cursor}，可以 return 一个字符串，将替换输入框的内容
	bindfocus{EventHandle}：输入框聚焦时触发，event.detail = {value: value}	
	bindblur{EventHandle}：输入框失去焦点时触发，event.detail = {value: value}
	bindconfirm{EventHandle}：点击完成按钮时触发，event.detail = {value: value}
	‖
	
	##picker
	从底部弹起的滚动选择器，现支持五种选择器，通过mode来区分，分别是普通、多列、时间、日期、省市区，默认是普通选择器。选择器的选项>=5个在手机上就会循环展示。
	
	###普通选择器：mode="selector"（默认可以不填）
	‖
	range{Array/Object Array}[[]]：mode为 selector 或 multiSelector 时，range 有效
	range-key{String}：当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
	value{Number}[0]：value 的值表示选择了 range 中的第几个（下标从 0 开始）
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = { value: value }
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	‖
	
	###多列选择器：mode="multiSelector"
	‖
	range{二维Array/二维Object Array}[[]]：mode为 selector 或 multiSelector 时，range 有效
	range-key{String}：当 range 是一个 二维Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
	value{Array}[[]]：value 的值表示选择了 range 中的第几个
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcolumnchange{EventHandle}：某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	‖
	
	###时间选择器：mode="time"
	‖
	value{String}：选中的时间，格式为"hh:mm"
	start{String}：时间范围的开始，格式为"hh:mm"
	end{String}：时间范围的结束，格式为"hh:mm"
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	‖
	
	###日期选择器：mode="date"
	‖
	value{String}[0]：选中的日期，格式为"YYYY-MM-DD"
	start{String}：日期范围的开始，格式为"YYYY-MM-DD"
	end{String}：日期范围的结束，格式为"YYYY-MM-DD"
	fields{String}[day]：选择器的粒度，可选year、month、day
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	‖
	
	###省市区选择器：mode="region"
	‖
	value{Array}[[]]：选中的省市区，默认选中每一列的第一个值
	custom-item{String}：可为每一列的顶部添加一个自定义的项
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	‖
	
	示例：
	··
	// 将&lt;picker&gt;标签包围要点击触发的区域即可触发选择器
	&lt;picker bind:change="pickerChange" value="{{index}}" range="{{array}}"&gt;
		&lt;text&gt;选择：{{array[index]}}&lt;/text&gt;
	&lt;/picker&gt;
	Page({
		data: {
			array: ['九江', '吉安', '莆田', '广州', '深圳'],
			index: 0
		},
		pickerChange(e) {
			this.setData({ index: e.detail.value })
		}
	})

	// 对象数组
	&lt;picker bind:change="pickerChange" value="{{index}}" range="{{array}}" range-key="name"&gt;
		&lt;text&gt;选择：{{array[index].name}}&lt;/text&gt;
	&lt;/picker&gt;
	Page({
		data: {
			array: [
					{ id:0, name:'九江' },
					{ id:1, name:'吉安' },
					{ id:2, name:'莆田' },
					{ id:3, name:'广州' },
					{ id:4, name:'深圳' }
				],
			index: 0
		},
		pickerChange(e) {
			this.setData({ index: e.detail.value })
		}
	})

	// 二维数组
	&lt;picker mode="multiSelector" bind:change="pickerChange" value="{{index}}" range="{{array}}"&gt;
		&lt;text&gt;选择：{{array[0][index[0]]}}-{{array[1][index[1]]}}-{{array[2][index[2]]}}&lt;/text&gt;
	&lt;/picker&gt;
	Page({
		data: {
			array: [
					['123', '456'],
					['吉安', '九江', '莆田'],
					['吉安', '广州', '深圳']
				],
			index: [0, 0, 0]
		},
		pickerChange(e) {
			this.setData({ index: e.detail.value })
		}
	})
	··
	
	#API
	
	##微信支付
	
	###需要在小程序后台开通微信支付
	!./imgs/html/wechat-applet01.png,1000
	
	###小程序支付的交互过程示意图
	!./imgs/html/wechat-applet02.jpg,1000
	
	###调用的API方法：wx.requestPayment(obj)
	‖
	obj：{
		timeStamp{String}!：时间戳从1970年1月1日00:00:00至今的秒数，即当前的时间
		nonceStr{String}!：随机字符串，长度为32个字符以下
		package{String}!：统一下单接口返回的 prepay_id 参数值，提交格式如·prepay_id=*·
		signType{String}!：签名算法，暂支持 MD5
		paySign{String}!：签名
		success{Function}：接口调用成功的回调函数
		fail{Function}：接口调用失败的回调函数
		complete{Function}：接口调用结束的回调函数
	}
	‖
	了解更多信息查看：α(小程序支付接口文档|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
	
	###示例时间戳秒数：
	··
	// 该方法最好在服务器上运行返回，否则本地时间可能被用户改过或手机获取不准
	const timeStamp = () => Math.floor(Date.now() / 1000)
	··
	
	###示例随机字符串：
	··
	// 如果有指定长度的参数就返回指定长度的随机字符串，不指定就返回随机16-32位
	const getRandomInt = (min, max) => max ? Math.floor(Math.random() * (max - min + 1)) + min : getRandomInt(0, min)
	const nonceStr = length => {
		length = length >= 16 ? length : getRandomInt(16, 32)
		let str = ''
		const nonce = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		for (let i = 0; i < length; i++) str += nonce[getRandomInt(nonce.length - 1)]
		return str
	}
	··
	
	###package
	统一下单接口返回的 prepay_id 参数值，格式如：·prepay_id=wx2017033010242291fcfe0db70013231072·
	
	###示例代码：
	··
	wx.requestPayment({
		timeStamp: timeStamp(),
		nonceStr: nonceStr(),
		package: '待定',
		signType: 'MD5',
		paySign: '待定',
		success(res){	//支付成功
			res: { requestPayment: ok }
		},
		fail(res){	//用户取消支付
			res: { requestPayment: fail cancel }
		},
		complete(res){	// 调用支付失败，其中 detail message 为后台返回的详细失败原因
			res: { requestPayment: fail (detail message) }
		}
	})
	··
	
	αα
	小程序官方文档αhttps://developers.weixin.qq.com/miniprogram/introduction/index.html?t=2018413)
	αα
	
	&2018.5.8
	`
}