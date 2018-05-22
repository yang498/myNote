commonData.html.weex = {
	name: '微信小程序',
	content: `
	#介绍
	组件完成
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
		icon：图标，目前有¡(./imgs/html/wechat-applet05.jpg,auto,30)，注意wxss无法改变color、size、line-height
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
		wx.openDocument：新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
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
		屏幕亮度
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
	
	##消息提示框
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
	
	##loading提示框
	‖
	wx.showLoading({
		title{String}!：提示的内容
		mask{Boolean}[false]：是否显示透明蒙层，防止触摸穿透
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	wx.hideToast()：隐藏loading提示框
	‖
	
	##模态弹窗
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
	
	##操作菜单
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
	
	##打电话
	‖
	wx.makePhoneCall({
		phoneNumber{String}!：需要拨打的电话号码
		success{Function}：成功的回调
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	
	##设置页面标题
	‖
	wx.setNavigationBarTitle({
		title{String}!：页面标题
		success{Function}：成功的回调
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	‖
	
	##滚动页面
	‖
	wx.pageScrollTo({
		scrollTop{Number}!：滚动到页面的目标位置（单位px）
		duration{Number}：滚动动画的时长，默认300ms，单位 ms
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
	
	##登录
	调用接口·wx.login()·获取临时登录凭证
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
	开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
	
	##微信支付
	
	###在小程序后台开通微信支付
	!./imgs/html/wechat-applet01.png,1000
	
	###交互过程示意图
	!./imgs/html/wechat-applet02.jpg,1000
	
	###调用的API
	‖
	wx.requestPayment({
		timeStamp{String}!：时间戳从1970年1月1日00:00:00至今的秒数，即当前的时间
		nonceStr{String}!：随机字符串，长度为32个字符以下
		package{String}!：统一下单接口返回的 prepay_id 参数值，提交格式如·prepay_id=*·
		signType{String}!：签名算法，暂支持 MD5
		paySign{String}!：签名
		success{Function}：接口调用成功的回调函数
		fail{Function}：接口调用失败的回调函数
		complete{Function}：接口调用结束的回调函数
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
	
	&2018.5.9
	`
}