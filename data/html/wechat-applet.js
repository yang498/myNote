commonData.html.wechatApplet = {
	name: '微信小程序',
	content: `
	#介绍
	组件完成
	##注册
	
	##关联公众号
	在要关联的公众号的左边菜单栏选择小程序管理，点击关联小程序
	公众号可关联同主体的10个小程序及不同主体的3个小程序，同一个小程序可关联最多500个公众号
	
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
	!./img/html/wechat-applet03.jpg,400
	!./img/html/wechat-applet04.png,500
	
	##wxml
	
	###数据绑定
	动态数据均来自对应 Page 的 data，使用 Mustache 语法（双大括号 {{}}）将变量包起来，比如：
	··
	<view>{{message}}</view>	// 文本内容
	<view id="item-{{id}}"></view>	// 组件属性
	<view wx:if="{{condition}}"></view>	// 控制属性
	<view>{{a+b}}+{{c}}+d</view>	// 算数运算，结果是：3 + 3 + d
	<view hidden="{{flag?true:false}}">Hidden</view>	// 三元运算
	<view wx:if="{{length>5}}"></view>	// 逻辑判断
	<view wx:for="{{[id, 1, 2, 3, 4]}}">{{item}}</view>	// 组合，得到：[0, 1, 2, 3, 4]
	<template is="objectCombine" data="{{...obj1, ...obj2, e: 5}}"></template>	// 扩展运算符 ... 将对象展开，组成：{a: 1, b: 2, c: 3, d: 4, e: 5}
	<template is="objectCombine" data="{{...obj3, ...obj4, a, f: 6}}"></template>	// 变量名相同的话后边会覆盖前面：{a: 1, b: 3, f: 6}
	<template is="objectCombine" data="{{foo, bar}}"></template>	// 对象的 key 和 value 相同可以间接表达
	
	Page({
		data: {
			message: 'Hello MINA!',
			id: 0,
			condition: true,
			a: 1,
			b: 2,
			c: 3,
			obj1: {
				a: 1,
				b: 2
			},
			obj2: {
				c: 3,
				d: 4
			},
			obj3: {
				a: 1,
				b: 2
			},
			obj4: {
				b: 3,
				f: 4
			},
			foo: 'my-foo',
			bar: 'my-bar'
		}
	})
	
	// boolean关键字无需在data声明，注意不要直接写 checked="false"，这表示字符串，代表真值
	<checkbox checked="{{false}}"> </checkbox>
	
	// 花括号和引号之间如果有空格，将最终被解析成为字符串
	<view wx:for="{{[1,2,3]}} ">{{item}}</view>
	等同于：
	<view wx:for="{{[1,2,3] + ' '}}">{{item}}</view>
	··
	
	###列表渲染
	在组件上使用·wx:for·控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件
	默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item
	
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
	其他事件属于特定组件，比如submit、input、scroll，且无特殊声明的都是不冒泡事件
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
	特殊事件：·<canvas/>·中的触摸事件不可冒泡，所以没有 currentTarget
	
	#组件
	
	注释·<!-- -->·左右的横杠就是2根，不然会全部注释
	每个页面默认有个·<page></page>·滚动父容器，可以不用添加最大父容器
	
	##目录
	‖
	视图容器
		view：视图容器，可以当成·div·标签
		scroll-view：可滚动视图容器
		swiper：轮播图
		movable-view：可移动的视图容器，在页面中可以拖拽滑动
		cover-view：覆盖在原生组件（map/video/canvas/camera）之上的文本视图，支持嵌套（cover-view/cover-image）
	基础内容
		icon：图标，目前有¡(./img/html/wechat-applet05.jpg,auto,30)，注意wxss无法改变color、size、line-height
		text：文字容器，内联元素
		rich-text：富文字容器
		progress：进度条
	表单
		button：按钮
		checkbox：多选
		form：表单
		input：输入框
		label：选中绑定的组件，可以绑定的有 button、checkbox、radio、switch
		picker：列表选择器
		picker-view：在页面上显示的列表选择器
		radio：单选
		slider：滑杆选择器
		switch：开关
		textarea：文本域
	导航
		navigator：页面链接，可以当成·a·标签
	媒体
		audio：音频，1.6.0 版本开始，该组件不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
		image：图片，默认宽300px、高225px（4 : 3）
		video：视频
		camera：相机
		live-player：实时音视频播放，客户端
		live-pusher：实时音视频录制，主播端
	地图
		map：地图
	画布
		canvas：画布
	开放能力
		open-data：展示微信开放的数据，比如群名称
		web-view：承载网页的容器，会自动铺满整个小程序页面。个人类型与海外类型的小程序暂不支持使用
		ad：广告，目前暂时以邀请制开放申请，请留意后续模板消息的通知
	其他
		block：常用于wx:for，以包含多个节点，自身不在页面中显示，比如用于通讯录列表和车的品牌列表 :
	‖
	··
	<block wx:for="{{list}}">
		<text>{{letter}}</text>	// A,B,C
		<text wx:for="{{item.name}}">{{item}}</text>	// 每个字母后面有很多名字
	</block>
	
	Page({
		data: {
			list: [
				{letter: 'A', name: ['a1', 'a2', 'a3']},
				{letter: 'B', name: ['b1', 'b2', 'b3']},
				{letter: 'C', name: ['c1', 'c2', 'c3']},
				...
			]
		}
	})
	··
	
	##text
	‖
	selectable{Boolean}[false]：文本是否可选中
	space{String}[false]：是否显示连续空格，可选 : 
		ensp：中文字符空格一半大小
		emsp：中文字符空格大小
		nbsp：根据字体设置的空格大小
	decode{Boolean}[false]：是否解码，可解析的有 : ·&amp;nbsp;· ·&amp;lt;· ·&amp;gt;· ·&amp;amp;· ·&amp;apos;· ·&amp;ensp;· ·&amp;emsp;·
	‖
	注意：各个操作系统的空格标准并不一致，<text/> 组件内只支持 <text/> 嵌套，除了文本节点以外的其他节点都无法长按选中
	
	##image
	‖
	src{String}：图片资源地址
	mode{String}[scaleToFill]：图片裁剪缩放模式
		scaleToFill：100%
		aspectFit：contain
		aspectFill：cover
		top | right | bottom | left | center | top left | top right | bottom left | bottom right：显示原图大小对应的位置
	lazy-load{Boolean}[false]：图片懒加载，只在page与scroll-view下的image有效
	binderror{HandleEvent}：当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}
	bindload{HandleEvent}：当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}
	‖
	
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
	
	##button
	
	##swiper
	‖
	indicator-dots{Boolean}[false]：是否显示指示点
	indicator-color{Color}[rgba(0, 0, 0, 0.3)]：指示点颜色
	indicator-active-color{Color}[#000]：选中指示点颜色
	autoplay{Boolean}[false]：是否自动切换
	current{Number}[0]：当前所在页面的 index
	current-item-id{String}[""]：当前所在滑块的 item-id ，不能与 current 被同时指定
	interval{Number}[5000]：自动切换时间间隔
	duration{Number}[500]：切换滑动时间
	circular{Boolean}[false]：是否无缝切换
	vertical{Boolean}[false]：滑动方向是否为纵向
	previous-margin{String}["0px"]：前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
	next-margin{String}["0px"]：后边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
	display-multiple-items{Number}[1]：同时显示的滑块数量
	skip-hidden-item-layout{Boolean}[false]：是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
	bindchange{EventHandle}：current 改变时会触发 change 事件，event.detail = {current: current, source: source}
	bindanimationfinish{EventHandle}：动画结束时会触发 animationfinish 事件，event.detail 同上
	子组件
		swiper-item{item-id}[""]：该 swiper-item 的标识符
	‖
	注意：如果在 bindchange 的事件回调函数中使用 setData 改变 current 值，则有可能导致 setData 被不停地调用，因而通常情况下请在改变 current 值前检测 source 字段来判断是否是由于用户触摸引起

	
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
	// 将<picker>标签包围要点击触发的区域即可触发选择器
	<picker bind:change="pickerChange" value="{{index}}" range="{{array}}">
		<text>选择：{{array[index]}}</text>
	</picker>
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
	<picker bind:change="pickerChange" value="{{index}}" range="{{array}}" range-key="name">
		<text>选择：{{array[index].name}}</text>
	</picker>
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
	<picker mode="multiSelector" bind:change="pickerChange" value="{{index}}" range="{{array}}">
		<text>选择：{{array[0][index[0]]}}-{{array[1][index[1]]}}-{{array[2][index[2]]}}</text>
	</picker>
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
	
	##目录
	‖
	♭网络♭
		发起请求
			wx.request：发起网络请求
		上传下载
			wx.uploadFile：上传文件
			wx.downloadFile：下载文件
		WebSocket
			wx.connectSocket：创建一个 WebSocket 连接
			wx.onSocketOpen：监听WebSocket连接打开事件
			wx.onSocketError：监听WebSocket错误
			wx.sendSocketMessage：通过 WebSocket 连接发送数据
			wx.onSocketMessage：监听WebSocket接受到服务器的消息事件
			wx.closeSocket：关闭 WebSocket 连接
			wx.onSocketClose：监听WebSocket关闭
			SocketTask：WebSocket 任务，可通过 wx.connectSocket 接口创建返回
	♭媒体♭
		图片
			wx.chooseImage：从本地相册选择图片或使用相机拍照
			wx.previewImage：预览图片
			wx.getImageInfo：获取图片信息
			wx.saveImageToPhotosAlbum：保存图片到系统相册
		录音、音频、音乐、视频的播放、控制等
	♭文件♭
		wx.saveFile：保存文件到本地
		wx.getFileInfo：获取文件信息
		wx.getSavedFileList：获取本地已保存的文件列表
		wx.getSavedFileInfo：获取已保存到本地文件的文件信息
		wx.removeSavedFile：删除本地存储的文件
		wx.openDocument：新开页面打开文档，支持格式有 doc, xls, ppt, pdf, docx, xlsx, pptx
	♭数据缓存♭
		wx.setStorage：异步存储本地存储在指定的 key 中，若原来 key 有内容会覆盖
		wx.setStorageSync：上面的同步接口
		wx.getStorage：异步获取本地存储在指定的 key 中的内容
		wx.getStorageSync：上面的同步接口
		wx.getStorageInfo：异步获取本地存储的信息，包含所有key、占用的空间、可用的空间
		wx.getStorageInfoSync：上面的同步接口
		wx.removeStorage：异步从本地缓存中异步移除指定 key
		wx.removeStorageSync：上面的同步接口
		wx.clearStorage：清空所有本地缓存
		wx.clearStorageSync：上面的同步接口
	♭位置♭
		wx.getLocation：获取当前位置的经纬度、速度、高度
		wx.chooseLocation：打开地图选择位置
		wx.openLocation：​使用微信内置地图查看位置
		wx.createMapContext：操作组件内 <map/> 组件
	♭设备♭
		系统信息
			wx.getSystemInfo：获取系统信息，比如手机品牌、操作系统等
			wx.getSystemInfoSync：上面的同步接口
			wx.canIUse：判断小程序的API、回调、参数、组件等是否在当前版本可用
		网络状态
			wx.getNetworkType：获取网络类型，比如wifi或者4G
			wx.onNetworkStatusChange：监听网络状态变化
		工具
			wx.makePhoneCall：打电话
			wx.addPhoneContact：添加联系人到手机通讯录
			wx.scanCode：调起客户端扫码界面，扫码成功后返回对应的结果
			wx.getClipboardData：获取系统剪贴板的内容
			wx.setClipboardData：设置系统剪贴板的内容
			wx.onUserCaptureScreen：监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
			wx.vibrateLong：使手机发生较长时间的振动（400ms）
			wx.vibrateShort：使手机发生较短时间的振动（15ms）
			wx.setScreenBrightness：设置屏幕亮度
			wx.getScreenBrightness：获取屏幕亮度
			wx.setKeepScreenOn：设置是否保持常亮状态，仅在当前小程序生效，离开小程序后失效
		加速度计、罗盘、蓝牙、iBeacon、NFC、Wi-Fi的初始化、监听、关闭等
	♭界面♭
		交互反馈
			wx.showToast：显示消息提示框，可选 success、loading、none
			wx.showLoading：显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
			wx.hideToast：隐藏消息提示框
			wx.hideLoading：隐藏 loading 提示框
			wx.showModal：​显示模态弹窗
			wx.showActionSheet：显示操作菜单
		设置导航条
			wx.setNavigationBarTitle：设置当前页面的标题
			wx.showNavigationBarLoading：在当前页面显示导航条加载动画
			wx.hideNavigationBarLoading：隐藏导航条加载动画
			wx.setNavigationBarColor：设置当前页面导航条的颜色
			wx.setTopBarText：动态设置置顶栏文字内容，只有当前小程序被置顶时能生效
		设置tabBar
			wx.setTabBarBadge：为 tabBar 某一项的右上角添加文本，比如未读消息数
			wx.removeTabBarBadge：移除 tabBar 某一项右上角的文本
			wx.showTabBarRedDot：显示 tabBar 某一项的右上角的红点
			wx.hideTabBarRedDot：隐藏 tabBar 某一项的右上角的红点
			wx.setTabBarStyle：设置 tabBar 的整体样式
			wx.setTabBarItem：设置 tabBar 某一项的内容
			wx.showTabBar：显示 tabBar
			wx.hideTabBar：隐藏 tabBar
		导航
			wx.navigateTo：保留当前页面，跳转到应用内非 tabBar 的页面
			wx.redirectTo：关闭当前页面，跳转到应用内非 tabBar 的页面，所以不能退回
			wx.reLaunch：关闭所有页面，打开到任意页面，如果是tabBar则不能带参数
			wx.switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面（不会刷新 tabBar 页面），不能带参数
			wx.navigateBack：关闭当前页面，返回上一页面或多级页面
		工具
			wx.createAnimation：创建一个动画实例animation。调用实例的方法来描述动画（wxss也不差）
			wx.pageScrollTo：将页面滚动到目标位置
			onPullDownRefresh：在 Page 中定义该处理函数，监听该页面用户下拉刷新事件，且要在该页面的json文件中设置enablePullDownRefresh为true
			wx.startPullDownRefresh：开始下拉刷新，效果与用户手动下拉刷新一致
			wx.stopPullDownRefresh：停止当前页面下拉刷新
		WXML节点信息
			wx.createSelectorQuery：返回一个SelectorQuery对象实例
			selectorQuery.in：将选择器的选取范围更改为自定义组件内
			selectorQuery.select：在当前页面下选择第一个匹配选择器selector的节点信息
			selectorQuery.selectAll：在当前页面下选择所所有匹配选择器selector的节点信息
			selectorQuery.selectViewport：选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息
			nodesRef.boundingClientRect：添加节点的布局位置的查询请求
			nodesRef.scrollOffset：添加节点的滚动位置查询请求
			nodesRef.fields：获取节点的相关信息
			selectorQuery.exec：执行所有的请求，在callback的第一个参数中返回
		canvas绘图、WXML节点布局相交状态
	♭第三方平台♭
		wx.getExtConfig：获取第三方平台自定义的数据字段
		wx.getExtConfigSync：上面的同步接口
	♭开放接口♭
		登录
			wx.login：获取临时登录凭证（code）
			wx.checkSession：校验用户当前session_key是否有效
			wx.authorize：提前向用户发起授权请求
			wx.getUserInfo：获取用户信息
			getPhoneNumber：获取微信用户绑定的手机号，需先调用login接口并只能用 <button> 组件的点击来触发
			wx.requestPayment：发起微信支付
		转发
			onShareAppMessage：在 Page 中定义该函数，设置该页面的转发信息，右上角菜单才会显示 “转发” 按钮
			wx.showShareMenu：显示当前页面的转发按钮
			wx.hideShareMenu：隐藏转发按钮
			wx.updateShareMenu：更新转发属性
			wx.getShareInfo：获取转发详细信息
		工具
			wx.chooseAddress：调起用户编辑收货地址原生界面
			wx.navigateToMiniProgram：打开同一公众号下关联的另一个小程序
			wx.navigateBackMiniProgram：返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
			launchApp：打开App，需由 <button> 组件调用
		模板消息（微信通知），客服消息（客服会话时用户发送消息相关），获取小程序的二维码，卡券，微信设置，微信运动，发票抬头，生物认证（指纹、人脸识别），附近的小程序，插件管理，内容安全（检验图片或文字是否违规）
	♭其他♭
		数据常规分析：开发者通过数据分析接口，可获取到小程序的各项数据指标，便于进行数据存储和整理
		wx.reportAnalytics：自定义数据上报接口
		wx.getUpdateManager：管理小程序更新
		wx.createWorker：创建一个多线程 Worker 线程，并返回 Worker 实例
		wx.reportMonitor：自定义业务数据监控上报接口
		wx.setEnableDebug：设置是否打开调试开关，此开关对正式版也能生效
	‖
	
	##页面导航
	‖
	wx.navigateTo({	保留当前页面跳转到非 tabBar 的页面，可返回原页面，目前页面路径最多只能十层
		url{String}!：路径，可带参数，参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔
		success{Function}：接口调用成功的回调函数
		fail{Function}：接口调用失败的回调函数
		complete{Function}：接口调用结束的回调函数
	})
	wx.redirectTo(Object)：关闭当前页面，跳转到应用内非 tabBar 的页面，所以不能退回，属性同navigateTo
	wx.reLaunch(Object)：关闭所有页面，打开到任意页面，如果是tabBar则不能带参数，属性同navigateTo
	wx.switchTab(Object)：跳转到 tabBar 页面并关闭所有非 tabBar 页面（不刷新 tabBar 页面），不能带参数，属性同navigateTo
	wx.navigateBack({	关闭当前页面返回上一页面或多级页面（不刷新返回的页面）
		delta{Number}[1]：返回的页面数，如果 delta 大于现有页面数，则返回到首页，可通过 getCurrentPages() 获取当前的页面栈决定需要返回几层
	})
	‖
	
	##提示框
	
	###消息提示框
	在指定时间 duration 后自动消失
	‖
	wx.showToast({
		title{String}!：提示的内容
		icon{String}：图标，可选success、loading、none
		image{String}：自定义图标的本地路径，会覆盖icon
		duration{Number}[1500]：持续时间，单位ms
		mask{Boolean}[false]：是否显示透明蒙层，防止触摸穿透
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	wx.hideToast()：主动隐藏消息提示框
	‖
	
	###loading提示框
	需调用 wx.hideLoading() 后才会消失
	‖
	wx.showLoading({
		title{String}!：提示的内容
		mask{Boolean}[false]：是否显示透明蒙层，防止触摸穿透
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	wx.hideLoading()：隐藏loading提示框
	‖
	
	###模态弹窗
	‖
	wx.showModal({
		title{String}!：提示的标题
		content{String}!：提示的内容
		showCancel{Boolean}[true]：是否显示取消按钮
		cancelText{String}[取消]：取消按钮的文字，最多 4 个字符
		cancelColor{HexColor}[#000]：取消按钮的文字颜色
		confirmText{String}[确定]：确定按钮的文字，最多 4 个字符
		cancelColor{HexColor}[#3CC51F]：确定按钮的文字颜色
		success{Function(res)}：成功的回调函数
			res:{
				confirm{Boolean}：为 true 时表示点击了确定按钮
				cancel{Boolean}：为 true 时表示点击了取消按钮，用于 Android 系统区分点击取消按钮还是点击蒙层关闭
			}
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	‖
	
	###操作菜单
	‖
	wx.showActionSheet({
		itemList{String Array}!：按钮的文字数组，数组长度最大为6个
		itemColor{HexColor}[#000]：按钮的文字颜色
		success{Function(res)}：成功的回调函数
			res：{
				tapIndex{Number}:点击的按钮从上到下的顺序，从0开始
			}
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	‖
	
	##网络请求
	
	###说明
	注意在小程序后台配置域名白名单，只支持·https·（request、uploadFile、downloadFile）和·wss·（connectSocket）协议。
	域名不能使用·IP地址·或·localhost·，不能带端口号，且必须经过·ICP备案·。
	出于安全考虑·api.weixin.qq.com·不能被配置为服务器域名，相关API也不能在小程序内调用。开发者应将 appsecret 保存到后台服务器中，通过服务器使用 appsecret 获取 accesstoken，并调用相关 API。
	对于每个接口，分别可以配置最多 20 个域名。
	在微信开发者工具中可开启不校验请求域名跳过服务器域名的校验，手机也开启调试模式不会进行服务器域名的校验。当然上线还是会开启校验。
	默认请求超时时间和最大超时时间都是 60s，request、uploadFile、downloadFile 的最大并发限制是 10 个。
	网络请求的 referer header 不可设置。其格式固定为·https://servicewechat.com/{appid}/{version}/page-frame.html·，其中·{appid}·为小程序的 appid，·{version}·为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本。
	小程序进入后台运行后（非置顶聊天），如果 5s 内网络请求没有结束，会回调错误信息·fail interrupted·；在回到前台之前，网络请求接口调用都会无法调用。
	只要服务器有返回东西都会进入 success 回调，最好根据 statusCode 再判断。
	小程序会自动对 BOM 头进行过滤。
	
	###发起网络请求
	‖
	wx.request({
		url{String}!：服务器接口地址
		data{Object/String/ArrayBuffer}：请求的参数，如果是非 String 类型会转换成 String 类型，转换规则如下 :
			GET请求： query string（encodeURIComponent(k)=encodeURIComponent(v)&...）
			POST请求且且 header['content-type'] 为 application/json 的数据：对数据进行 JSON 序列化
			POST请求且且 header['content-type'] 为 application/x-www-form-urlencoded 的数据：同 GET 的 query string
		header{Object}[{'content-type':'application/json'}]：请求头，不能设置 Referer
		method{String}[GET]：请求方式（需大写），有效值 OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		dataType{String}[json]：设置返回的数据格式，设为 json 会尝试对返回的数据做一次 JSON.parse
		responseType{String}[text]：设置响应的数据类型，可选 text、arraybuffer
		success{Function(res)}：成功的回调函数
			res：{
				data{Object/String/ArrayBuffer}：返回的数据
				statusCode{Number}：返回的 HTTP 状态码
				header{Object}：返回的 HTTP Response Header
			}
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	‖
	返回一个 requestTask 对象，可调用·abort()·用于中断请求任务，比如：
	··
	const requestTask = wx.request({
		url: 'test.php',
		success: function(res) {
			console.log(res.data)
		}
	})
	
	requestTask.abort()	// 取消请求任务
	··
	
	###上传文件
	将本地资源上传到开发者服务器，客户端发起一个·HTTPS POST·请求，其中·content-type·为·multipart/form-data·
	比如通过·wx.chooseImage·等接口获取到一个本地资源的临时文件路径后上传到服务器
	‖
	wx.uploadFile({
		url{String}!：服务器接口地址
		filePath{String}!：要上传文件资源的路径
		name{String}!：文件对应的 key ，在服务器端通过这个 key 可以获取到文件二进制内容
		header{Object}[{'content-type':'application/json'}]：请求头，不能设置 Referer
		formData{Object}[json]：	其他额外的 form data
		success{Function(res)}：成功的回调函数
			res：{
				data{Object/String/ArrayBuffer}：返回的数据
				statusCode{Number}：返回的 HTTP 状态码
			}
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	‖
	返回一个 uploadTask 对象，可通过·onProgressUpdate()·监听上传进度变化事件，调用·abort()·可取消上传任务
	·onProgressUpdate·返回参数说明：
	‖
	progress{Number}：下载进度百分比
	totalBytesWritten{Number}：已经下载的数据长度，单位 Bytes
	totalBytesExpectedToWrite{Number}：预期需要下载的数据总长度，单位 Bytes
	‖
	示例代码：
	··
	const uploadTask = wx.uploadFile({
    url: 'http://×example.weixin.qq.com/upload',
    filePath: tempFilePaths[0],
    name: 'file',
    success: function(res){
			console.log(res.data)
		}
	})

	uploadTask.onProgressUpdate(res => {
		console.log('上传进度', res.progress)
		console.log('已经上传的数据长度', res.totalBytesSent)
		console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
	})

	uploadTask.abort() // 取消上传任务
	··
	
	###下载文件
	下载文件资源到本地，客户端直接发起一个·HTTP GET·请求，返回文件的本地临时路径
	文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用·wx.saveFile·，才能在小程序下次启动时访问得到。
	注意在·header·中指定合理的·Content-Type·字段，以保证客户端正确处理文件类型
	‖
	wx.downloadFile({
		url{String}!：服务器接口地址
		header{Object}[{'content-type':'application/json'}]：请求头，不能设置 Referer
		success{Function(res)}：成功的回调函数
			res：{
				tempFilePath{String}：临时文件路径，下载后的文件会存储到一个临时文件
				statusCode{Number}：返回的 HTTP 状态码
			}
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	‖
	返回一个 downloadTask 对象，可通过·onProgressUpdate()·监听下载进度变化事件，参数同 uploadTask，调用·abort()·可取消下载任务
	
	##图片
	‖
	♭从本地相册选择图片或使用相机拍照♭
	文件的临时路径在小程序本次启动期间可以正常使用，如需持久保存需在主动调用 wx.saveFile，在小程序下次启动时才能访问得到
		wx.chooseImage({
			count{Number}[9]：最多可以选择的图片张数
			sizeType{String Array}[['original','compressed']]：original-原图，compressed-压缩图，默认都有
			sourceType{String Array}[['album','camera']]：album-从相册选图，camera-使用相机，默认都有
			success{Function(res)}!：成功的回调函数
				res：{
					tempFilePaths{StringArray}：图片的本地文件路径列表
					tempFiles{ObjectArray}：{	图片的本地文件列表，每一项是一个 File 对象
						File：{
							path{String}：本地文件路径
							size{Number}：本地文件大小，单位B
						}
					}
				}
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭预览图片，左右滑动可切换图片，长按可选择保存或转发、收藏♭
		wx.previewImage({
			urls{StringArray}!：图片路径列表
			current{String}[urls[0]]：当前显示图片路径
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭获取图片信息♭
		wx.getImageInfo({
			src{String}!：图片的路径，可以是相对、临时文件、存储文件、网络路径
			success{Function(res)}：成功的回调函数
				res：{
					width{Number}：图片宽度，单位px
					height{Number}：图片高度，单位px
					path{String}：图片的路径
					orientation：图片的方向，有效值有
						up（默认）、down（180度旋转）、left（左旋90度）、right（右旋90度）、
						up-mirrored（水平翻转）、down-mirrored（down的水平翻转）
						left（left的水平翻转）、right（right的水平翻转）
				}
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭保存图片到系统相册♭
		wx.saveImageToPhotosAlbum({
			filePath{String}!：图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	‖
	
	##文件
	‖
	♭保存文件到本地♭
	注意这会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用，本地文件存储的大小限制为 10M
		wx.saveFile({
			tempFilePath{String}!：需要保存的文件的临时路径
			success{Function(res)}：成功的回调函数
				res：{
					savedFilePath：文件的保存路径
				}
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭获取文件信息♭
		wx.getFileInfo({
			filePath{String}!：本地文件路径
			digestAlgorithm{String}：计算文件摘要的算法，默认值 md5，有效值 md5、sha1
			success{Function(res)}：成功的回调函数
				res：{
					errMsg{String}：调用结果
					size{Number}：文件大小，单位B
					digest{String}：按照传入的 digestAlgorithm 计算得出的的文件摘要
				}
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭获取本地已保存的文件列表♭
		wx.getSavedFileList({
			success{Function(res)}：成功的回调函数
				res：{
					errMsg{String}：接口调用结果
					fileList{Object Array}：文件列表，每一项如下
						filePath{String}：文件的本地路径
						createTime{Number}：文件的保存时的时间戳
						size{Number}：文件大小，单位B
				}
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭获取本地文件的文件信息♭
	此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，需使用 wx.getFileInfo
		wx.getSavedFileInfo({
			filePath{String}!：文件路径
			success{Function(res)}：成功的回调函数
				res：{
					errMsg{String}：调用结果
					size{Number}：文件大小，单位B
					createTime{Number}：文件保存时的时间戳
				}
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭删除本地存储的文件♭
		wx.removeSavedFile({
			filePath{String}!：需要删除的文件路径
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	♭新开页面打开文档♭
	支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
		wx.openDocument({
			filePath{String}!：文件路径，可通过 downFile 获得
			fileType{String}!：指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	‖
	
	##常用
	
	###打电话
	‖
	wx.makePhoneCall({
		phoneNumber{String}!：需要拨打的电话号码
		success{Function}：成功的回调
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	
	###设置页面标题
	‖
	wx.setNavigationBarTitle({
		title{String}!：页面标题
		success{Function}：成功的回调
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	
	###滚动页面
	‖
	wx.pageScrollTo({
		scrollTop{Number}!：滚动到页面的目标位置（单位px）
		duration{Number}：滚动动画的时长，默认300ms，单位 ms
	})
	‖
	
	###下拉刷新
	在当前页面的 json 文件中的 window 属性设置·enablePullDownRefresh·为 true
	在 Page 中定义·onPullDownRefresh·函数，当用户手动下拉的时候就会触发该事件
	当处理完数据刷新后调用·wx.stopPullDownRefresh()·可以停止下拉刷新
	也可以使用·wx.startPullDownRefresh()·主动调用下拉刷新
	‖
	wx.startPullDownRefresh({
		success{Function(res)}：成功的回调
			res：{
				errMsg{String}：接口调用的结果
			}
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	
	###获取位置
	获取当前位置的经纬度、速度、高度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用
	‖
	wx.getLocation({
		type{String}[wgs84]：返回 gps 坐标，选择 gcj02 返回可用于 wx.openLocation 的坐标
		altitude{Boolean}：传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
		success{Function(res)}!：成功的回调
			res：{
				latitude：	纬度，浮点数，范围为-90~90，负数表示南纬
				longitude：	经度，浮点数，范围为-180~180，负数表示西经
				speed：速度，浮点数，单位m/s
				accuracy：	位置的精确度
				altitude：高度，单位 m
				verticalAccuracy：垂直精度，单位 m（Android 无法获取，返回 0）
				horizontalAccuracy：水平精度，单位 m
			}
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	
	##转发
	在 Page 中定义 onShareAppMessage 函数，右上角菜单才会显示“转发”按钮， return 一个 Object 用于自定义转发内容
	‖
	onShareAppMessage(res) {
		res：{
			from{String}：转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
			target{Object}：如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
		}
		return {
			title：转发的标题，默认为当前小程序名称
			path：转发的路径，	当前页面路径 ，必须是以 / 开头的完整路径
			imageUrl：图片路径，支持PNG及JPG，默认为当前页面的截图，长宽比是 5:4
		}
	}
	‖
	通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识。
	调用·wx.showShareMenu·并且设置 withShareTicket 为·true·，当用户将小程序转发到任一群聊之后，此转发卡片在群聊中被其他用户打开时，可以在·App.onLaunch()·或·App.onShow·获取到一个 shareTicket。通过调用·wx.getShareInfo()·接口传入此 shareTicket 可以获取到转发信息。
	注意只有转发到群聊中打开才可以获取到 shareTickets 返回值，单聊没有 shareTickets，shareTicket 仅在当前小程序生命周期内有效。
	‖
	♭显示当前页面的转发按钮♭
		wx.showShareMenu({
			withShareTicket{Boolean}：是否使用带 shareTicket 的转发
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	♭隐藏转发按钮♭
		wx.hideShareMenu({
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	♭更新转发属性♭
		wx.updateShareMenu({
			withShareTicket{Boolean}：是否使用带 shareTicket 的转发
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	♭获取转发详细信息♭
		wx.getShareInfo({
			shareTicket{String}!：shareTicket
			timeout{Number}：超时时间，单位 ms
			success{Function(res)}：成功的回调
				res：{
					errMsg{String}：错误信息
					encryptedData{String}：转发信息的加密数据，解密后可得 { openGId: 群对当前小程序的唯一 ID }
					iv{String}：加密算法的初始向量
				}
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	‖
	
	##数据缓存
	大小限制为 10MB，异步接口无阻塞有回调函数，同步接口有阻塞无回调函数但写法简单
	‖
	♭存储♭
		wx.setStorage({
			key{String}!：键名
			data{Object/String}!：键值
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.setStorageSync(key{String}!, data{Object/String}!)
	♭读取单个♭
		wx.getStorage({
			key{String}!：键名
			success{Function(res)}!：成功的回调，res = {data: key对应的内容}
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.getStorageSync(key{String}!)：返回的结果即键值
	♭读取全部♭
		wx.getStorageInfo({
			success{Function(res)}!：成功的回调
				res：{
					keys{String Array}：所有键名
					currentSize{Number}：占用的空间大小, 单位kb
					limitSize{Number}：可用的空间大小，单位kb
				}
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.getStorageInfoSync()：返回的结果即上面的异步接口成功的回调的res
	♭删除单个♭
		wx.removeStorage({
			key{String}!：键名
			success{Function}!：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.removeStorageSync(key{String}!)
	♭删除全部♭
		wx.clearStorage()
		wx.clearStorageSync()
	‖
	
	##WXML节点信息
	·wx.createSelectorQuery()·：返回一个·SelectorQuery·对象实例，调用相关方法以获取相关节点：
	‖
	in(component)：选择自定义组件 component 内的节点
	select(selector)：在当前页面下选择第一个匹配的节点，返回一个NodesRef对象实例，用于获取节点信息，selector支持 :
		#id、.class、#id, .class、.parent>.child、.parent .children、.parent >>> .children（跨自定义组件的后代选择器）
	selectAll(selector)：在当前页面下选择所有匹配的节点，返回一个数组形式的NodesRef对象实例
	selectViewport()：选择显示区域（当前页面），可用于获取显示区域的尺寸、滚动位置等信息，返回一个NodesRef对象实例
	exec([callback])：执行所有的请求，请求结果按请求次序构成数组，在callback的第一个参数中返回
	‖
	返回的 NodesRef 对象实例可调用的方法有：
	‖
	boundingClientRect([callback])：返回节点信息，包括 id、dataset、left、right、top、bottom、width、height，单位为px
	scrollOffset([callback])：返回节点滚动位置信息，节点必须是 scroll-view 或 viewport，包括 id、dataset、scrollTop、scrollLeft，单位为px
	fields(fields,[callback])：自定义指定获取节点的相关信息，返回值是nodesRef对应的selectorQuery。可指定获取的字段包括
		id{Boolean}[false]：是否返回节点id
		dataset{Boolean}[false]：是否返回节点dataset
		rect{Boolean}[false]：是否返回节点布局位置（left、right、top、bottom）
		size{Boolean}[false]：是否返回节点尺寸（width、height）
		scrollOffset{Boolean}[false]：是否返回节点的 scrollLeft scrollTop ，节点必须是scroll-view或viewport
		properties{StringArray}[[]]：指定节点属性名列表，以返回对应属性值（ id、class、style 和事件绑定的属性值不可获取）
	‖
	
	示例代码：
	··
	// 获取某个节点的相关信息
	const query = wx.createSelectorQuery()
	const ref = query.select('.class')
	ref.boundingClientRect(res => {
		console.log(res)
	}).exec()
	
	// 获取多个节点的相关信息
	 wx.createSelectorQuery().selectAll('.a-class').boundingClientRect().exec(function(res){
		res.forEach(item => {
			console.log(item)
		})
	})
	
	// 获取 fields
	 wx.createSelectorQuery().select('#id').fields({
		dataset: true,
		size: true,
		scrollOffset: true,
		properties: ['scrollX', 'scrollY']
	}, res => {
		res.dataset    // 节点的dataset
		res.width      // 节点的宽度
		res.height     // 节点的高度
		res.scrollLeft // 节点的水平滚动位置
		res.scrollTop  // 节点的竖直滚动位置
		res.scrollX    // 节点 scroll-x 属性的当前值
		res.scrollY    // 节点 scroll-y 属性的当前值
	}).exec()
	··
	
	##登录
	
	###进入小程序登录流程时序说明
	‖
	小程序内调用·wx.login()·获取code并传给服务器
	服务器请求指定接口得到openid、session_key、unionid
	服务器以安全起见自定义和openid、session_key、unionid关联的登录态并返回小程序
		比如生成加密随机数称之为3rd_session，以3rd_session为key，openid、session_key、unionid为value进行存储，然后把3rd_session传回小程序
	小程序把3rd_session存入本地作为用户登录态
	之后比如请求数据·wx.request()·就携带自定义登录态3rd_session，服务器查询到对应的openid、session_key以返回相关数据
	‖
	!./img/html/wechat-applet06.jpg,600
	
	###wx.login
	调用接口·wx.login()·获取临时登录凭证，以换取用户的 openid、session_key、unionid
	‖
	wx.login({
		timeout{Number}：超时时间，单位 ms
		success{Function(res)}!：成功的回调
			res：{
				errMsg{String}：调用结果
				code{String}：用户登录凭证（有效期五分钟）
			}
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	然后在服务器后台调用指定接口，使用 code 换取 openid、session_key、unionid，地址：·https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code·
	参数说明：
	‖
	appid!：小程序唯一标识，在小程序后台或微信开发者工具可查看
	secret!：小程序的 app secret，在小程序后台查看
	js_code!：wx.login 得到的 code
	grant_type!：填写为 authorization_code 即可
	‖
	返回的结果：
	‖
	openid：用户唯一标识
	session_key：会话密钥
	unionid：用户在开放平台的唯一标识符（满足UnionID下发条件才会出现）
	‖
	·openid·说明：用户在小程序、订阅号、服务号的唯一标识
	·session_key·说明：用于解密wx.getUserInfo()返回的敏感数据
	·unionid·说明：如果开发者拥有多个移动应用（比如在APP内开发了微信分享、微信支付）、网站应用（比如在某网站开放了微信快捷登录）、和公众帐号，微信针对用户在不同的应用下都有唯一的一个·openId·，所以在不同的公众账号下·openid·是不一样的，但·unionid·却是一样的。
	对于拥有多个账号的企业来说，·unionid·可以帮助识别不同公众账号下的用户是否是同一个人。这样在不同账号下对该用户提供的服务可以连续起来了，可以实现多个小程序、公众号、APP之间数据互通。还可以去除重复关注的用户数，便于统计真实的关注用户总数
	·unionid·作为互通的用户标识，不建议作为用户ID，应该用·openid·。否则一旦发生小程序、公众号或者APP迁移到其他的开放平台下，就无法识别出来原来的用户了（迁移指微信开放平台的a帐号迁移到了b帐号）。而迁移小程序只要·appid·不变，·openid·就是不会变的。当然如果能保证账号之间不会迁移用·unionid·作为用户标识也是可以的。
	·unionid·获得途径：
	1、调用接口wx.getUserInfo，从解密数据中获取UnionID。注意本接口需要用户授权，需妥善处理拒绝授权后的情况
	2、如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。可以通过wx.login获取到该用户UnionID
	3、如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。也可以通过wx.login获取到
	
	###wx.getUserInfo
	获取用户信息，当用户授权才可以使用该接口，否则会报错，只能使用α(<button>|javascript:;" onclick="$('h1:eq(2)×~h2:eq(4)×')×.click()×)将·open-type·设为·getUserInfo·引导用户授权
	‖
	wx.getUserInfo({
		withCredentials{Boolean}：是否带上登录态信息，也就是是否返回敏感信息
		lang{String}[en]：指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
		timeout{Number}：超时时间，单位 ms
		success{Function(res)}：成功的回调函数
			res：{
				userInfo{OBJECT}：用户基本信息 : {
					nickName{String}：昵称，
					avatarUrl{String}：头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效
					gender{String}：性别，1代表男，2代表女，0代表未知
					city{String}：所在城市
					province{String}：所在省份
					country{String}：所在国家
					language{String}：语言，简体中文为zh_CN
				}
				rawData{String}：不包括敏感信息的原始数据字符串，用于计算签名
				signature{String}：使用 sha1( rawData + session_key ) 得到字符串，用于校验用户信息
				encryptedData{String}：包括敏感数据在内的完整用户信息的加密数据
				iv{String}：加密算法的初始向量
			}
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	‖
	encryptedData 解密后为以下 json 结构
	··
	{
			"openId": "OPENID",
			"nickName": "NICKNAME",
			"gender": GENDER,
			"city": "CITY",
			"province": "PROVINCE",
			"country": "COUNTRY",
			"avatarUrl": "AVATARURL",
			"unionId": "UNIONID",
			"watermark":
			{
					"appid":"APPID",
			"timestamp":TIMESTAMP
			}
	}
	··

	建议使用场景：
	‖
	调用·wx.login·获得·code·，服务器请求指定接口获得·session_key·，用·session_key·解密·wx.getUserInfo()·返回的敏感数据
	定期使用·wx.getSetting·获取用户的授权情况，若已授权就使用·wx.getUserInfo()·获取用户的最新信息，若未授权就显示授权按钮提示登录并更新信息
	‖
	
	###背景
	以前调用·wx.getUserInfo·接口会进行一次弹窗授权（拒绝之后再次调用不会弹窗），并且·wx.getUserInfo·依赖·wx.login·（这会有点麻烦），·wx.login·返回的code不能换取unionid，根据解密·wx.getUserInfo·加密的数据才会出现
	当开发者在小程序首页就调用·wx.getUserInfo·，造成一进入小程序就出现授权弹窗，然后用户脑海闪过一些哲学问题：
	你是谁？
	我在哪里？
	我为什么要同意？
	……
	这就导致了部分用户点击拒绝授权，如果开发者没有对拒绝的情况做处理，可能会因为不良体验而流失用户。
	所以微信端做出了调整，·wx.getUserInfo·不依赖·wx.login·就能得到数据，改用·button·组件来获取用户信息（点击弹窗无限制以解决用户再次授权），·wx.login·返回的code能换取unionid
	这段垮掉：注意调用·wx.getUserInfo·将参数·withCredentials·设为·false·不会出现弹窗授权即可获取昵称头像等信息
	改成不依赖login
	一个好的互联网产品，首页应该传递给用户产品理念，在需要展示用户信息的地方才去提示授权，比如未登录的淘宝在浏览完商品后点击购买才要求登录，如果在小程序使用前一定要用户登录或进行到需要用户登录的操作时，可以将·wx.getUserInfo·的·button·组件放置到页面中，并说明：
	为什么需要授权？
	需要用户的什么信息？
	授权有什么好处？
	接下来在页面上放置一个明显的登录按钮，建议不要有其他的点击区域，让用户专注登录。
	用户可能会更改昵称和头像，建议定期使用·wx.getUserInfo·更新信息，如果用户授权后又在设置中关掉了授权或本地删除了小程序，需用·button·组件重新授权
	
	###wx.getSetting
	获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
	‖
	wx.getSetting({
		success{Function(res)}：成功的回调函数
			res：authSetting用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	‖
	实践
	··
	// 若之前已获取过用户信息
	if (wx.getStorageSync('userInfo')) {
		// 用户可能会更改昵称和头像，假设每周更新一次，如果时间戳到期就重新获取以更新
		if (wx.getStorageSync('userInfoDeadline') < Date.now()) {
			
		} else {
			// 
		}
	} else {
		
	}
	wx.getSetting({
		success: res => {
			// 若已授权直接获取用户信息
			// 若未授权在需要展示或用到的时候再用button授权
			if (res.authSetting['scope.userInfo']) {
				wx.getUserInfo({
					success: res => {
						// 使用用户信息
					}
				})
			}
		}
	})
	··
	
	###getPhoneNumber
	获取微信用户绑定的手机号，需先调用login接口，目前该接口针对非个人开发者，且完成了认证的小程序开放
	将·<button>·组件 open-type 的值设置为 getPhoneNumber，把事件返回的加密数据发送到服务器进行解密再返回来
	··
	<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号</button>
	Page({
    getPhoneNumber: function(res) { 
        console.log(res.detail.errMsg)	// 调用结果说明
        console.log(res.detail.iv)	// 加密算法的初始向量
        console.log(res.detail.encryptedData)	// 包括敏感数据在内的完整用户信息的加密数据
    }
})
	··
	服务器解密后可得
	··
	{
    "phoneNumber": "13580006666", 	// 用户绑定的手机号（国外手机号会有区号）
    "purePhoneNumber": "13580006666",	// 没有区号的手机号
    "countryCode": "86",	// 区号
    "watermark": {	// 水印
			"appid": "APPID",	// 小程序的appid
			"timestamp": TIMESTAMP	// 时间戳
		}
	}
	··
	
	##微信支付
	
	###在小程序后台开通微信支付
	!./img/html/wechat-applet01.png,800
	
	###交互过程示意图
	!./img/html/wechat-applet02.jpg,800
	
	###调用的API
	‖
	wx.requestPayment({
		timeStamp{String}!：时间戳从1970年1月1日00:00:00至今的秒数，即当前的时间
		nonceStr{String}!：随机字符串，长度为32个字符以下
		package{String}!：统一下单接口返回的 prepay_id 参数值，提交格式如·prepay_id=*·
		signType{String}!：签名算法，暂支持 MD5
		paySign{String}!：签名
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	‖
	了解更多信息查看：α(小程序支付接口文档|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
	
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
	
	###加密解密
	
	###示例代码：
	··
	wx.requestPayment({
		timeStamp: new Date().getSeconds(),
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
	
	&2018.6.3
	`
}