commonData.html.applet.content = `
	#介绍
	微信小程序和网页的区别在哪里？
	页面的样式和功能：文本、图片、事件都差不多，但微信小程序还有更多内置的的功能，例如 tab 配置导航，组件中的 picker、map，API 中的扫码、支付等
	兼容适配：web 要考虑到多种兼容性，而小程序是统一标准，自适应手机单位 rpx，也省了适配机型
	数据管理：小程序有微信后台可以查看流量数据、管理和运营
	体验：小程序旨在用完即走，加上运营规则，避免了大部分的营销、刷流量、广告等违规内容

	##起步
	开发小程序的第一步，你需要@[注册|https://mp.weixin.qq.com/wxopen/waregister?action=step1]一个小程序帐号，通过这个帐号你就可以管理你的小程序。
	一个帐号只能发布一个小程序，同一个主体身份下个人帐户可创建 5 个、企业 50 个的小程序账号
	登录@[小程序平台|https://mp.weixin.qq.com]，在菜单 “设置”-“开发设置” 看到小程序的·AppID·了 。
	小程序的·AppID·相当于小程序平台的一个身份证，后续你会在很多地方要用到 AppID (注意这里要区别于服务号或订阅号的 AppID)。
	有了小程序帐号之后，就需要@[下载微信开发者工具|https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=201861]来开发小程序。

	##用户身份
	一个团队进行小程序的开发，那么团队成员的身份管理是很有必要的。
	管理员可在小程序管理后台统一管理项目成员（包括开发者、体验者及其他成员）、设置项目成员的权限，包括：开发者/体验者权限、登录小程序管理后台、开发管理、查看小程序数据分析等。	管理入口位于：用户身份 – 成员管理。权限说明：
	!!
	开发者权限：可使用小程序开发者工具及开发版小程序进行开发
	体验者权限：可使用体验版小程序
	登录：可登录小程序管理后台，无需管理员确认
	数据分析：使用小程序数据分析功能查看小程序数据
	开发管理：小程序提交审核、发布、回退
	开发设置：设置小程序服务器域名、消息推送及扫描普通链接二维码打开小程序
	暂停服务设置：暂停小程序线上服务
	!!

	##小程序的版本
	!!
	开发版本：使用开发者工具上传的最新版本代码。开发版本可删除，不影响线上版本和审核中版本的代码。
	审核中版本：只能有一份代码处于审核中。有审核结果后可以发布到线上，也可直接重新提交审核，覆盖原审核版本。
	线上版本：线上所有用户使用的代码版本，该版本代码在新版本代码发布后被覆盖更新。
	!!

	##公众号关联小程序
	公众号关联小程序后，将可在图文消息、自定义菜单、模板消息等功能中使用小程序。
	关联规则：
	!!
	所有公众号都可以关联小程序。
	一个公众号可关联10个同主体的小程序，3个不同主体的小程序。
	一个小程序可关联500个公众号。
	公众号一个月可新增关联小程序13次，小程序一个月可新增关联500次。
	!!
	关联流程：登录公众号后台-小程序-小程序管理-添加-关联小程序

	##客服
	用户可使用小程序客服消息功能，与小程序的客服人员进行沟通。
	客服消息会话入口有两个：
	1、小程序内：开发者在小程序内添加客服消息按钮组件，用户可在小程序内唤起客服会话页面，给小程序发消息；
	2、已使用过的小程序客服消息会聚合显示在微信会话“小程序客服消息”内，用户可以在小程序外查看历史并发送客服消息。
	可通过以下两种方式下回复用户的消息：
	1、调用发送客服消息接口；
	2、使用公众平台网页版客服工具。

	##小程序二维码
	在小程序后台可查看下载小程序码
	也可以自定义配置二维码链接扫码打开
	进入“设置-开发设置-扫普通链接二维码打开小程序”，开启功能后即可配置二维码规则，注意配置的链接需要校验
	二维码链接内容会以参数q的形式带给页面，在onLoad事件中提取"q"参数并自行UrlDecode一次，即可获取原二维码的完整内容

	##常见问题
	!!
	小程序代码包大小限制为 10M
	·background-image·不能使用本地图片，可用网络图片，或者 base64，或者使用·<image/>·标签
	获取输入框中的内容可以使用·bindinput·或·bindblur·事件
	在Page之外声明的变量并不会在页面返回到上一级之后销毁，也就是不会重置，当然作用域还是在当前页面有效
	!!

	##相关小程序
	!!
	小程序示例：展示官方demo
	小程序开发助手：展示开发过的小程序、成员预览时间、小程序更新前后大小
	小程序数据助手：展示用户的流量数据
	小游戏数据助手：展示小游戏的流量数据
	公众平台助手：管理公众号的消息留言通知、流量数据
	!!

	#框架

	##文件结构
	小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。
	一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：
	!!
	app.js!：小程序逻辑，公共js，比如声明全局变量
	app.json!：小程序公共设置
	app.wxss：小程序公共样式表
	!!
	一个小程序页面由四个文件组成，分别是：
	!!
	wxml!：页面结构
	wxss：页面样式表
	js!：页面逻辑
	json：页面配置
	!!
	^^注意：为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。^^

	##app.json
	配置项列表：
	!!
	pages{String Array}!：设置页面路径
	window{Object}：设置默认页面的窗口表现
	tabBar{Object}：设置底部 tab 的表现
	networkTimeout{Object}：设置网络超时时间
	debug{Boolean}：设置是否开启 debug 模式，在控制台面板显示调试信息以 info 的形式给出，有Page的注册，页面路由，数据更新，事件触发
	!!

	###pages
	接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成。每一项代表对应页面的【路径+文件名】信息，^^数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 pages 数组进行修改。^^
	文件名不需要写文件后缀，因为框架会自动去寻找路径下 .json, .js, .wxml, .wxss 四个文件进行整合。
	比如初始开发目录为：
	!!
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
	!!

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
	!!
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
	!!

	###tabBar
	如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。	^^注意：当设置 position 为 top 时将不会显示 icon，配置最少2个、最多5个。^^属性说明：
	!!
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
	!!

	###networkTimeout
	可以设置各种网络请求的超时时间。
	!!
	request{Number}[60000]：wx.request 的超时时间，单位毫秒
	connectSocket{Number}[60000]：wx.connectSocket 的超时时间，单位毫秒
	uploadFile{Number}[60000]：wx.uploadFile 的超时时间，单位毫秒
	downloadFile{Number}[60000]：wx.downloadFile 的超时时间，单位毫秒
	!!
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

	##app.js
	每个页面有独立的作用域，并提供模块化能力。
	由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。
	开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。类似 ServiceWorker，所以逻辑层也称之为 App Service。
	###App()
	App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。
	!!
	onLaunch：生命周期函数--监听小程序初始化，当小程序初始化完成时触发，全局只触发一次
	onShow：生命周期函数--监听小程序显示，当小程序启动，或从后台进入前台显示，onLaunch和onShow参数如下 :
		path{String}：打开小程序的路径
		query{Object}：打开小程序的query
		scene{Number}：打开小程序的场景值
		shareTicket{String}：shareTicket，详见@[转发|javascript:;" onclick="$('h1:eq(3)~h2:eq(6)').click()]
		referrerInfo{Object}：当场景为由从另一个小程序或公众号或App打开时，返回此字段
			appId{String}：来源小程序或公众号或App的 appId，支持返回的场景有：1020、1035、1036、1037、1038、1043
			extraData{Object}：来源小程序传过来的数据，scene=1037或1038时支持
	onHide：生命周期函数--监听小程序隐藏，当小程序从前台进入后台
	onError：错误监听函数，当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	onPageNotFound：页面不存在监听函数，当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，必须是同步处理，异步处理（例如 setTimeout 异步执行）无效
		path{String}：不存在页面的路径
		query{Object}：打开不存在页面的query
		isEntryPage{Boolean}：是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）
	其他：开发者可以添加任意的函数或数据到参数中，用 this 可以访问
	!!
	前台、后台定义：当用户点击右上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间（一般是5分钟），或者系统资源占用过高，才会被真正的销毁。
	关闭小程序：当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序，且没有置顶小程序的情况下退出，小程序会被销毁。
	^^注意：^^
	如果开发者没有添加 onPageNotFound 监听，当跳转页面不存在时，将推入微信客户端原生的页面不存在提示页面
	如果 onPageNotFound 回调中又重定向到另一个不存在的页面，将推入微信客户端原生的页面不存在提示页面，并且不在回调 onPageNotFound
	由于Android系统限制，目前还无法获取到按 Home 键退出到桌面，然后从桌面再次进小程序的场景值，对于这种情况，会保留上一次的场景值。
	生命周期示意图：
	!./img/html/wechat-applet07.png,600

	###getApp()
	全局的 getApp() 函数可以用来获取或修改小程序实例
	··
	// app.js
	App({
		globalData: 'I am global data'
	})

	// other.js
	var app = getApp()
	console.log(app.globalData) // I am global data
	app.globalData = '来自 app.js 的 globalData'
	console.log(app.globalData) // 来自 app.js 的 globalData'
	··
	^^注意：^^
	App() 必须在 app.js 中注册，且不能注册多个。
	不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
	不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
	通过 getApp() 获取实例之后，不要私自调用生命周期函数。

	##Page.js
	Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
	!!
	data：页面的数据
	onLoad：生命周期函数--监听页面加载，直到关闭当前页面栈再进入当前页面才会再次触发
	onReady：生命周期函数--监听页面初次渲染完成，直到关闭当前页面栈再进入当前页面才会再次触发
	onShow：生命周期函数--监听页面显示，每次打开页面都会调用一次
	onHide：生命周期函数--监听页面隐藏，每次关闭页面都会调用一次
	onUnload：生命周期函数--监听页面卸载，当当前页面栈被关闭时触发一次
	onPullDownRefresh：页面下拉刷新，需在app.json的window选项中或当前页面的json文件中设置·enablePullDownRefresh·为·true·，当处理完数据刷新后·wx.stopPullDownRefresh()·可以停止下拉刷新
	onReachBottom：页面上拉触底，可在app.json的window选项中或当前页面的json文件中设置触发距离onReachBottomDistance，默认为50。在触发距离内滑动期间，本事件只会被触发一次。
在触发距离内滑动期间，本事件只会被触发一次
	onShareAppMessage：用户点击右上角转发，详见@[转发|javascript:;" onclick="$('h1:eq(3)~h2:eq(6)').click()]
	onPageScroll：监听页面滚动，每次页面滚动时触发，返回参数如下 :
		scrollTop{Number}：页面在垂直方向已滚动的距离（单位px）
	onTabItemTap：当前是 tab 页时，点击 tab 时触发，可用于回到顶部或刷新等
	其他：开发者可以添加任意的函数或数据到参数中，在页面的函数中用 this 可以访问
	!!
	###Page.prototype.route
	·route·字段可以获取到当前页面的路径
	··
	Page({
		onLoad: function () {
			console.log(this.route)
		}
	})
	··
	###Page.prototype.setData()
	·setData·函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步），参数说明：
	!!
	data{Object}!：这次要改变的数据
		key：要改变的 data 的键名，以数据路径的形式给出，如·'array[2].message'·、·'a.b.c.d'·，并且不需要在 this.data 中预先定义
		value：要改变的 data 的键值
	callback{Function}!：回调函数，在这次setData对界面渲染完毕后调用
	!!
	^^注意：^^
	!!
	直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
	单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
	请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题
	!!
	事实上 setData 中的 key 只能以字符串或中括号的形式书写，并且是中括号的形式时就代表这是一个变量，示例代码：
	··
	Page({
		data: {
			array: [],
			object: {}
		},
		onLoad: function (options) {
			const age = 'age'
			this.setData({
				name: 'Tom', // key 为普通字符串，可不用引号
				'array[0]': 'changed data', // array 和下标表示需要加引号
				'object.text': 'changed data' // object 的 key 表示需要加引号
				[age]: 20 // age 是个变量，用 [] 包裹
		    }, () => {
		    	const index = 0
		    	// 当  key 是个链式写法还带变量时，不加引号语法错误，加引号又无法表示变量
		    	this.setData({ array[index].text: 'new data' })
		    	this.setData({ 'array[index].text': 'new data' })
		    	// 所以可以使用先赋值改变再 setData 的方式
		    	this.data.array[index].text = 'new data'
		    	this.setData({ array: this.data.array })
		    })

			// 假如要一次性修改很多数据，如果直接在循环里面直接调用 setData 是很耗性能的，因为它会不停的渲染
			for (let i = 0; i < 100; i++) {
				this.data.array.push(i)
				this.setData({ array: this.data.array })
			}
			// 建议先修改 data（并且这能很好的修改变量），再 setData，这样只会渲染一次，大大减少性能消耗
			for (let i = 0; i < 100; i++) this.data.array.push(i)
			this.setData({ array: this.data.array })
		}
	})
	··
	··
	// 这里有5个input，需要获取输入的值
	<input bindblur="inputValue" data-type="input1"/>
	<input bindblur="inputValue" data-type="input2"/>
	<input bindblur="inputValue" data-type="input3"/>
	<input bindblur="inputValue" data-type="input4"/>
	<input bindblur="inputValue" data-type="input5"/>

	Page({
		data: {
			input1: '',
			input2: '',
			input3: '',
			input4: '',
			input5: ''
		},
		inputValue(e) {
			// 一般是判断类型进行赋值
			if (e.currentTarget.dataset.type === 'input1') {
				this.setData({ input1: e.detail.value })
			} else if (e.currentTarget.dataset.type === 'input2') {
				this.setData({ input2: e.detail.value })
			}
			......

			// 而可以直接用变量进行对应赋值，减少书写量
			this.setData({ [e.currentTarget.dataset.type]: e.detail.value })
		}
	})
	··
	###路由
	框架以栈的形式维护了当前的所有页面
	·getCurrentPages()·：该方法用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。不要尝试修改页面栈，会导致路由以及页面状态错误。
	Tab 切换对应的生命周期（以 A、B 页面为 Tabbar 页面，C 是从 A 页面打开的页面，D 页面是从 C 页面打开的页面为例）：
	%%
	当前页面,路由后页面,触发的生命周期（按顺序）
	,,
	A,B,A.onHide()，B.onLoad()，B.onShow()
	A,B（再次打开）,A.onHide()，B.onShow()
	C,A,C.onUnload()，A.onShow()
	C,B,C.onUnload()，B.onLoad()，B.onShow()
	D,B,D.onUnload()，C.onUnload()，B.onLoad()，B.onShow()
	D（从转发进入）,A,D.onUnload()，A.onLoad()，A.onShow()
	D（从转发进入）,B,D.onUnload()，B.onLoad()，B.onShow()
	%%
	###模块化
	在 JavaScript 文件中声明的变量和函数只在该文件中有效；不同的文件中可以声明相同名字的变量和函数，不会互相影响。
	可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过·module.exports·或者·exports·才能对外暴露接口。
	^^需要注意的是：^^
	·exports·是·module.exports·的一个引用，因此在模块里边随意更改·exports·的指向会造成未知的错误，所以更推荐用·module.exports·，并且·require()·返回的是·module.exports·而不是·exports·
	小程序目前不支持引入·node_modules·，开发者需要使用到·node_modules·时候拷贝出相关的代码到小程序的目录中
	··
	// common.js
	function sayHello(name) {
		console.log(\`Hello \${name} !\`)
	}
	function sayGoodbye(name) {
		console.log(\`Goodbye \${name} !\`)
	}

	module.exports.sayHello = sayHello
	exports.sayGoodbye = sayGoodbye
	// 或者
	module.exports = {
		sayHello: sayHello
	}
	exports = {
		sayGoodbye
	}
	··
	​在需要使用这些模块的文件中，使用·require(path)·相对路径将公共代码引入，暂时不支持绝对路径
	··
	var common = require('common.js')
	Page({
		helloMINA: function() {
			common.sayHello('MINA')
		},
		goodbyeMINA: function() {
			common.sayGoodbye('MINA')
		}
	})
	··
	###module.exports和exports的区别
	先来补点 js 基础。示例：
	··
	// 当 a 是个 object 或 array 才会造成引用，如果是 string、number、boolean、undefined、null 就是独立的

	var a = {name: '张三'}
	var b = a
	console.log(a)	// {name: '张三'}
	console.log(b)	// {name: '张三'}
	// a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一个对象，也就是同一块内存地址，所以输出一样

	b.name = '李四'
	console.log(a)	// {name: '李四'}
	console.log(b)	// {name: '李四'}
	// 修改 b 时，即 a 和 b 指向同一块内存地址的内容发生了改变，所以 a 也会被改变，所以输出一样

	var b = {name: '王五'}
	console.log(a)	// {name: '李四'}
	console.log(b)	// {name: '王五'}
	// 当对 b 覆盖时，b 就指向了一块新的内存地址，即 a 和 b 不再指向同一块内存，a 和 b 已毫无关系，所以输出不一样
	··
	而·exports·就是指向的·module.exports·的引用，初始值都为空对象·{}·，所以：
	··
	console.log(module.exports)	// {}
	console.log(exports)	// {}

	module.exports.sayHello = 'sayHello'	// 同时改变
	console.log(module.exports)	// {sayHello: 'sayHello'}
	console.log(exports)	// {sayHello: 'sayHello'}

	module.exports = {sayMina: 'sayMina'}	// 重新赋值后断开了与 exports 的引用
	console.log(module.exports)	// {sayMina: 'sayMina'}
	console.log(exports)	// {sayHello: 'sayHello'}
	··
	而·require()·返回的是·module.exports·，所以更推荐用·module.exports·，每个 js 的 module 都是独立的，不同 js 对 module.exports 进行赋值都是可以的

	##事件
	绑定：
	!!
	bind：冒泡
	catch：不冒泡
	capture-bind：捕获
	capture-catch：取消冒泡和中断捕获
	!!

	类型：
	!!
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
	!!

	事件对象：
	!!
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
	!!

	写法：·bindtap="eventName"·或·bind:tap="eventName"·
	传参：在元素上自定义的以·data-·开头的属性，多个单词用-连接，不能大写，有也会转换成小写，在事件回调中·e.currentTarget.dataset·可拿到
	特殊事件：·<canvas/>·中的触摸事件不可冒泡，所以没有 currentTarget
	··
	<view bindtap="onclick" data-name="foo">click me</view>
	Page({
		onclick(e) {
			console.log(e.currentTarget.dataset)	// foo
		}
	})
	··

	##wxml
	WXML（WeiXin Markup Language）是框架设计的一套标签语言，结合基础组件、事件系统，可以构建出页面的结构

	###数据绑定
	动态数据均来自对应 Page 的 data，使用 Mustache 语法（双大括号 {{}}）将变量包起来，比如：
	··
	<view>{{message}}</view>	// 文本内容
	<view id="item-{{id}}"></view>	// 组件属性
	<view>{{a+b}}+{{c}}+d</view>	// 算数运算，结果是：3 + 3 + d
	<view hidden="{{flag?true:false}}">Hidden</view>	// 三元运算
	<view wx:for="{{[id, 1, 2, 3, 4]}}">{{item}}</view>	// 组合，得到：[0, 1, 2, 3, 4]
	<template is="objectCombine" data="{{...obj1, ...obj2, e: 5}}"></template>	// 扩展运算符 ... 将对象展开，组成：{a: 1, b: 2, c: 3, d: 4, e: 5}
	<template is="objectCombine" data="{{...obj3, ...obj4, a, f: 6}}"></template>	// 变量名相同的话后边会覆盖前面：{a: 1, b: 3, f: 6}
	<template is="objectCombine" data="{{foo, bar}}"></template>	// 对象的 key 和 value 相同可以间接表达

	Page({
		data: {
			message: 'Hello MINA!',
			id: 0,
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
	··
	// 默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item
	<view wx:for="{{array}}">{{index+1}}、{{item.message}}</view>

	// 使用 wx:for-item 可以指定元素的变量名，使用 wx:for-index 可以指定下标的变量名
	<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="name">{{idx+1}}、{{name.message}}</view>

	Page({
		data: {
			array: [
				{ message: 'foo' },
				{ message: 'bar' }
			]
		}
	})

	// 循环一个对象，index 代表 key，item 代表 value
	<view wx:for="{{obj}}">{{index}}：{{item}}</view>
	Page({
		data: {
			obj: {
				a: '123',
				b: '456',
				c: '789'
			}
		}
	})

	// wx:for也可以嵌套，这是一个九九乘法表
	<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
		<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
			<text wx:if="{{i <= j}}">
				{{i}} * {{j}} = {{i * j}}
			</text>
		</view>
	</view>

	// 当wx:for的值为字符串时，会将字符串解析成字符串数组
	<view wx:for="array">{{item}}</view>
	// 等同于
	<view wx:for="{{['a','r','r','a','y']}}">{{item}}</view>

	//  如果花括号和引号之间如果有空格，将最终被解析成为字符串
	<view wx:for="{{[1,2,3]}} ">{{item}}</view>
	// 等同于
	<view wx:for="{{[1,2,3] + ' '}}">{{item}}</view>
	// 等同于
	<view wx:for="{{[1, ',', 2, ',', 3, ' ']}}">{{item}}</view>	// 1,2,3' '
	··
	·wx:key·：如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 <input/> 中的输入内容，<switch/> 的选中状态），需要使用·wx:key·来指定列表中项目的唯一的标识符。
	当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。
	也就是说假设有一列·<input>·，都是通过循环·arr·创建的，当在·<input>·中输入值后，给·arr·添加一个元素触发渲染层重新渲染，如果没有·wx:key·那所有内容会重新创建，原来·<input>·的值也就不在了，都是一个新的·<input>·框了，而如果有·wx:key·就不会重新创建，只会重新排个序，原来·<input>·的值还在。
	如不提供·wx:key·，控制台会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。
	·wx:key·的值以两种形式提供：
	字符串，代表在 for 循环的 array 中 item 的某个属性·property·，该·property·的值需要是列表中唯一的字符串或数字，且不能动态改变。
	保留关键字·*this·代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。
	··
	// 这里的 objectArray 中的 id 的值和 unique 的值都是唯一的字符串或数字，所以 wx:key 填 id 或 unique 都可以
	<switch wx:for="{{objectArray}}" wx:key="unique"> {{item.id}} </switch>

	// 这里的 numberArray 中每一项都是唯一的数字，所以 wx:key 填 *this 就可以
	<switch wx:for="{{numberArray}}" wx:key="*this"> {{item}} </switch>

	Page({
		data: {
			objectArray: [
				{id: 5, unique: 'unique_5'},
				{id: 4, unique: 'unique_4'},
				{id: 3, unique: 'unique_3'},
				{id: 2, unique: 'unique_2'},
				{id: 1, unique: 'unique_1'},
				{id: 0, unique: 'unique_0'},
			],
			numberArray: [1, 2, 3, 4]
		}
	})
	··

	###条件检测
	使用·wx:if·来判断是否需要渲染该代码块
	··
	<view wx:if="{{condition}}"> True </view>
	··
	也可以用·wx:elif·和·wx:else·来添加一个·else·块：
	··
	<view wx:if="{{length > 5}}"> 1 </view>
	<view wx:elif="{{length > 2}}"> 2 </view>
	<view wx:else> 3 </view>
	··
	使用·hidden·可以隐藏代码块，也就是使用了·display:none·
	··
	<view hidden> True </view>
	··
	·wx:if vs hidden·：
	·wx:if·是惰性的，如果在初始渲染条件为·false·，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。
	相比之下，·hidden·就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。
	·wx:if·有更高的切换消耗而·hidden·有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用·hidden·更好，如果在运行时条件不大可能改变则·wx:if·较好。

	###模板
	在模板中定义代码片段，然后在不同的地方调用，只在当前页面使用。
	使用 name 属性，作为模板的名字。然后在·<template/>·内定义代码片段，如：
	··
	// 需要的 data 包括 index、msg、time
	<template name="msgItem">
		<view>
			<text> {{index}}: {{msg}} </text>
			<text> Time: {{time}} </text>
		</view>
	</template>
	··
	使用模板：使用 is 属性为 template 的 name，声明需要的使用的模板，然后将模板所需要的 data 传入，如：
	··
	<template is="msgItem" data="{{...item}}"/>
	Page({
		data: {
			item: {
				index: 0,
				msg: 'this is a template',
				time: '2016-09-15'
			}
		}
	})
	··
	可以动态决定具体需要渲染哪个模板：
	··
	<template name="odd">
		<view> odd </view>
	</template>
	<template name="even">
		<view> even </view>
	</template>

	<block wx:for="{{[1, 2, 3, 4, 5]}}">
		<template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
	</block>
	··
	模板拥有自己的作用域，只能使用 data 传入的数据以及模版定义文件中定义的·<wxs/>·模块

	###引用
	两种文件引用方式·import·和·include·
	·import·可以在该文件中使用目标文件定义的·template·，比如在·item.wxml·中定义了一个叫·item·的·template·：
	··
	<!-- item.wxml -->
	<template name="item">
		<text>{{text}}</text>
	</template>
	··
	其他页面引用：
	··
	<import src="item.wxml"/>
	<template is="item" data="{{text: 'forbar'}}"/>
	··
	import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template。
	如：C import B，B import A，在C中可以使用B定义的template，在B中可以使用A定义的template，但是C不能使用A定义的template。
	·include·可以将目标文件^^除了 ^^<template/> <wxs/> 外的整个代码引入，相当于是拷贝到·include·位置，如：
	··
	<!-- header.wxml -->
	<view> header </view>

	<!-- footer.wxml -->
	<view> footer </view>

	<!-- index.wxml -->
	<include src="header.wxml"/>
	<view> body </view>
	<include src="footer.wxml"/>
	··

	##wxss
	WXSS（WeiXin Style Sheets）是一套样式语言，用于描述 WXML 的组件样式
	目前支持的选择器有：·.class|#id|element|element, element|::after|::before·。
	app.wxss为全局样式。在page的wxss文件中为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。

	与 CSS 相比，WXSS 扩展的特性有：尺寸单位和样式导入

	###尺寸单位
	单位：·rpx·，根据750rpx屏幕宽度进行自适应。比如：
	iPhone6的屏幕宽度为375px，共有750个物理像素，1rpx=0.5px=1物理像素，1px=2rpx
	在iPhone5下1rpx=0.42px，1px = 2.34rpx
	在iPhone6 Plus下1rpx=0.552px，1px = 1.81rpx
	开发时可以以iPhone6作为参考标准。

	###样式导入
	使用·@import·语句可以导入外联样式表，·@import·后跟需要导入的外联样式表的相对路径，用·;·表示语句结束
	··
	/* common.wxss */
	.small-p {
		padding:5px;
	}
	··
	··
	/* app.wxss */
	@import "common.wxss";
	.middle-p {
		padding:15px;
	}
	··

	###内联样式
	框架组件上支持使用 style、class 属性来控制组件的样式。
	静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。
	··
	<view class="normal_view"/>
	<view style="color:{{color}};"/>
	··

	##wxs
	WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构
	WXS 代码模块可以编写在 wxml 文件中的·<wxs>·标签内，或以·.wxs·为后缀名的文件内。相当于·<script>·标签
	每一个·.wxs·文件和·<wxs>·标签都是一个单独的模块。每个模块都有自己独立的作用域。即在一个模块里面定义的变量与函数，默认为私有的，对其他模块不可见。一个模块要想对外暴露其内部的私有变量与函数，只能通过·module.exports·实现。
	每个 wxs 模块均有一个内置的 module 对象。通过 exports 属性，可以对外共享本模块的私有变量与函数。
	·<wxs>·标签：
	··
	<wxs module="foo">
		var some_msg = "hello world";
		module.exports = {
				msg : some_msg,
		}
	</wxs>
	<view> {{foo.msg}} </view>
	··
	wxs文件：
	··
	// /pages/tools.wxs
	var foo = "'hello world' from tools.wxs";
	var bar = function (d) {
		return d;
	}
	module.exports = {
		FOO: foo,
		bar: bar,
	};
	module.exports.msg = "some msg";
	··
	··
	<!-- page/index/index.wxml -->
	<wxs src="./../tools.wxs" module="tools" />
	<view> {{tools.msg}} </view>
	<view> {{tools.bar(tools.FOO)}} </view>
	··
	·require·函数：在.wxs模块中引用其他 wxs 文件模块，可以使用 require 函数。需要注意如下几点：
	只能引用 .wxs 文件模块，且必须使用相对路径。
	wxs 模块均为单例，wxs 模块在第一次被引用时，会自动初始化为单例对象。多个页面，多个地方，多次引用，使用的都是同一个 wxs 模块对象。
	如果一个 wxs 模块在定义之后，一直没有被引用，则该模块不会被解析与运行。
	^^注意：^^
	<wxs> 模块只能在定义模块的 WXML 文件中被访问到。使用 <include> 或 <import> 时，<wxs> 模块不会被引入到对应的 WXML 文件中。
	<template> 标签中，只能使用定义该 <template> 的 WXML 文件中定义的 <wxs> 模块。

	##自定义组件
	开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。
	和页面一样，一个自定义组件由 json wxml wxss js 4个文件组成。首先需要在 json 文件中声明这是一个自定义组件：
	··
	{
		"component": true
	}
	··
	然后 wxml 和 wxss 就和平时写页面一样。区别在于 js，不是 Page() 而是 Component()
	使用已注册的自定义组件前，首先要在页面的 json 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：
	··
	{
		"usingComponents": {
			"component-tag-name": "path/to/the/custom/component"
		}
	}
	··
	这样，在页面的 wxml 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，即组件的文件名，节点属性即传递给组件的属性值。
	··
	<view>
		<!-- 以下是对一个自定义组件的引用 -->
		<component-tag-name inner-text="Some text"></component-tag-name>
	</view>
	··
	^^注意：^^
	因为 WXML 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。
	自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用 usingComponents 字段）。
	自定义组件和使用自定义组件的页面所在项目根目录名不能以“wx-”为前缀，否则会报错。

	###behaviors
	behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。
	每个 behavior 可以包含一组属性、数据、生命周期函数和方法，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。每个组件可以引用多个 behavior 。 behavior 也可以引用其他 behavior 。
	behavior 需要使用 Behavior() 构造器定义。

	###组件间关系
	有时需要实现这样的组件：
	··
	<custom-ul>
		<custom-li> item 1 </custom-li>
		<custom-li> item 2 </custom-li>
	</custom-ul>
	··
	这个例子中， custom-ul 和 custom-li 都是自定义组件，它们有相互间的关系，相互间的通信往往比较复杂。此时在组件定义时加入 relations 定义段，可以解决这样的问题。注意：必须在两个组件定义中都加入 relations 定义，否则不会生效。

	###抽象节点
	有时，自定义组件模版中的一些节点，其对应的自定义组件不是由自定义组件本身确定的，而是自定义组件的调用者确定的。这时可以把这个节点声明为“抽象节点”。相当于将组件名作为值的写法，比如：
	··
	<selectable-group generic:selectable="custom-checkbox" />
	··
	selectable-group 是个抽象节点，custom-checkbox 是个组件，注意组件值（custom-checkbox）只能是静态值，不能包含数据绑定。因而抽象节点特性并不适用于动态决定节点名的场景。

	###tips
	在计时过程中使用·this.setData({ 'menuList.phoneCode.indicate': time + '秒' })·等渲染操作时，由于 menuList 被改变，所以触发视图渲染刷新，导致 picker 这类弹出式组件在渲染时被收起或报错
	解决：把计时的变量抽离出来，比如改成 slot 插槽，这样就不影响 menuList 本身

	##插件
	插件的开发和使用自小程序基础库版本 1.9.6 开始支持。
	插件是对一组 js 接口或自定义组件的封装，用于提供给第三方小程序调用。插件必须嵌入在其他小程序中才能被用户使用。
	插件开发者可以像开发小程序一样编写一个插件并上传代码，在插件发布之后，其他小程序方可调用。小程序平台会托管插件代码，其他小程序调用时，上传的插件代码会随小程序一起下载运行。
	相对于普通 js 文件或自定义组件，插件拥有更强的独立性，拥有独立的 API 接口、域名列表等，但同时会受到一些限制，如一些 API 无法调用或功能受限。
	对于插件开发者，请阅读@[开发插件|https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/development.html]章节；对于插件使用者，请阅读@[使用插件|https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html]章节。

	##运行机制
	小程序启动会有两种情况，一种是「冷启动」，一种是「热启动」。 假如用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需将后台态的小程序切换到前台，这个过程就是热启动；冷启动指的是用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动。
	小程序没有重启的概念，当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁，当短时间内（5s）连续收到两次以上收到系统内存告警，会进行小程序的销毁。
	当退出小程序，在小程序没被销毁前再次进入小程序，打开逻辑：
	A. 打开首页： @[场景值|https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html]有 1001, 1019, 1022, 1023, 1038, 1056
	B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他
	%%
	上一次的场景,当前打开的场景,效果
	,,
	A,A,保留原来的状态
	B,A,清空原来的页面栈，打开首页（相当于执行 wx.reLaunch 到首页）
	A 或 B,B,清空原来的页面栈，打开指定页面（相当于执行 wx.reLaunch 到指定页）
	%%

	###更新机制
	小程序冷启动时如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。 如果需要马上应用最新版本，可以使用 @[wx.getUpdateManager|https://developers.weixin.qq.com/miniprogram/dev/api/getUpdateManager.html] API 进行处理。

	#组件

	每个页面默认有个·<page></page>·滚动父容器，可以不用添加最大父容器

	##目录
	!!
	视图容器
		view：视图容器，可以当成·div·标签
		scroll-view：可滚动视图容器
		swiper：轮播图
		movable-view：可移动的视图容器，在页面中可以拖拽滑动
		cover-view：覆盖在原生组件（map/video/canvas/camera）之上的文本视图，支持嵌套（cover-view/cover-image）
	基础内容
		icon：图标，目前有![./img/html/wechat-applet05.jpg,auto,30]，注意wxss无法改变color、size、line-height
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
		navigator：页面链接，可以当成·a·标签，对应API可见@[页面导航|javascript:;" onclick="$('h1:eq(3)~h2:eq(1)').click()]
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
	!!
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
	!!
	selectable{Boolean}[false]：文本是否可选中
	space{String}[false]：是否显示连续空格，可选 :
		ensp：中文字符空格一半大小
		emsp：中文字符空格大小
		nbsp：根据字体设置的空格大小
	decode{Boolean}[false]：是否解码，可解析的有 : ·&amp;nbsp;· ·&amp;lt;· ·&amp;gt;· ·&amp;amp;· ·&amp;apos;· ·&amp;ensp;· ·&amp;emsp;·
	!!
	注意：各个操作系统的空格标准并不一致，<text/> 组件内只支持 <text/> 嵌套，除了文本节点以外的其他节点都无法长按选中

	##image
	!!
	src{String}：图片资源地址
	mode{String}[scaleToFill]：图片裁剪缩放模式
		scaleToFill：100%
		aspectFit：contain
		aspectFill：cover
		top | right | bottom | left | center | top left | top right | bottom left | bottom right：显示原图大小对应的位置
	lazy-load{Boolean}[false]：图片懒加载，只在page与scroll-view下的image有效
	binderror{HandleEvent}：当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}
	bindload{HandleEvent}：当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}
	!!

	##input
	!!
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
	!!

	##open-data
	用于展示微信开放的数据，比如获取用户头像、昵称无需授权
	!!
	type{String}：开放数据类型，可选 :
		groupName：拉取群名称
		userNickName：用户昵称
		userAvatarUrl：用户头像
		userGender：用户性别
		userCity：用户所在城市
		userProvince：用户所在省份
		userCountry：用户所在国家
		userLanguage：用户的语言
	open-gid{String}：群id，当·type="groupName"·时生效，只有当前用户在此群内才能拉取到群名称，获取·open-gid·的方法可查看 @[转发|javascript:;" onclick="$('h1:eq(3)~h2:eq(6)').click()]
	lang{String}[en]：以哪种语言展示 userInfo，当·type="user*"·时生效，有效值有 en（英文）、zh_CN（简体中文）、zh_TW（繁体中文）
	!!
	··
	// 得到什么类型的结果就是什么类型的元素
	<open-data type="userAvatarUrl"/>	// 相当于image标签
	<open-data type="userNickName"/>	// 相当于text标签
	··

	##button
	!!
	size{String}[default]：按钮的大小，可选 default、mini
	type{String}[default]：按钮的样式类型，可选 primary、default、warn
	plain{Boolean}[false]：按钮是否镂空，背景色透明
	disabled{Boolean}[false]：是否禁用
	loading{Boolean}[false]：名称前是否带 loading 图标
	form-type{String}：用于 <form/> 组件，点击分别会触发·<form/>·组件的 submit/reset 事件，可选 submit、reset
	open-type{String}：微信开放能力，可选 :
		contact：打开客服会话
		share：触发用户转发
		getUserInfo：获取用户信息，可以从·bindgetuserinfo·回调中获取到用户信息
		getPhoneNumber：获取用户手机号，可以从·bindgetphonenumber·回调中获取到用户信息
		launchApp：打开APP，可以通过·app-parameter·属性设定向APP传的参数
		openSetting：打开授权设置页
	hover-class{String}[button-hover]：指定按钮按下去的样式类。当·hover-class="none"·时，没有点击态效果
		button-hover默认为：·{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}·
	hover-stop-propagation{Boolean}[false]：指定是否阻止本节点的祖先节点出现点击态
	hover-start-time{Number}[20]：按住后多久出现点击态，单位毫秒
	hover-stay-time{Number}[70]：手指松开后点击态保留时间，单位毫秒
	lang{String}[en]：指定返回的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。当·open-type="getUserInfo"·时生效
	bindgetuserinfo{Handler}：用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与·wx.getUserInfo·返回的一致。当·open-type="getUserInfo"·时生效
	session-from{String}：会话来源。当·open-type="contact"·时生效
	send-message-title{String}[当前标题]：会话内消息卡片标题。当·open-type="contact"·时生效
	send-message-path{String}[当前分享路径]：会话内消息卡片点击跳转小程序路径。当·open-type="contact"·时生效
	send-message-img{String}[截图]：会话内消息卡片图片。当·open-type="contact"·时生效
	show-message-card{Boolean}[false]：显示会话内消息卡片。当·open-type="contact"·时生效
	bindcontact{Handler}：客服消息回调。当·open-type="contact"·时生效
	bindgetphonenumber{Handler}：获取用户手机号回调。当·open-type="getphonenumber"·时生效
	app-parameter{String}：打开 APP 时，向 APP 传递的参数。当·open-type="launchApp"·时生效
	binderror{Handler}：当使用开放能力时，发生错误的回调。当·open-type="launchApp"·时生效
	bindopensetting{Handler}：在打开授权设置页后回调。当·open-type="openSetting"·时生效
	!!

	##swiper
	!!
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
	!!
	注意：如果在 bindchange 的事件回调函数中使用 setData 改变 current 值，则有可能导致 setData 被不停地调用，因而通常情况下请在改变 current 值前检测 source 字段来判断是否是由于用户触摸引起


	##picker
	从底部弹起的滚动选择器，现支持五种选择器，通过mode来区分，分别是普通、多列、时间、日期、省市区，默认是普通选择器。选择器的选项>=5个在手机上就会循环展示。

	###普通选择器：mode="selector"（默认可以不填）
	!!
	range{Array/Object Array}[[]]：mode为 selector 或 multiSelector 时，range 有效
	range-key{String}：当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
	value{Number}[0]：value 的值表示选择了 range 中的第几个（下标从 0 开始）
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = { value: value }
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	!!

	###多列选择器：mode="multiSelector"
	!!
	range{二维Array/二维Object Array}[[]]：mode为 selector 或 multiSelector 时，range 有效
	range-key{String}：当 range 是一个 二维Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
	value{Array}[[]]：value 的值表示选择了 range 中的第几个
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcolumnchange{EventHandle}：某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	!!

	###时间选择器：mode="time"
	!!
	value{String}：选中的时间，格式为"hh:mm"
	start{String}：时间范围的开始，格式为"hh:mm"
	end{String}：时间范围的结束，格式为"hh:mm"
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	!!

	###日期选择器：mode="date"
	!!
	value{String}[0]：选中的日期，格式为"YYYY-MM-DD"
	start{String}：日期范围的开始，格式为"YYYY-MM-DD"
	end{String}：日期范围的结束，格式为"YYYY-MM-DD"
	fields{String}[day]：选择器的粒度，可选year、month、day
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value}
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	!!

	###省市区选择器：mode="region"
	!!
	value{Array}[[]]：选中的省市区，默认选中每一列的第一个值
	custom-item{String}：可为每一列的顶部添加一个自定义的项
	bindchange{EventHandle}：value 改变时触发 change 事件，event.detail = {value: value, code: code, postcode: postcode }，其中字段 code 是统计用区划代码，postcode 是邮政编码
	bindcancel{EventHandle}：取消选择或点遮罩层收起 picker 时触发
	disabled{Boolean}[false]：是否禁用
	!!

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
	!!
	^^网络^^
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
	^^媒体^^
		图片
			wx.chooseImage：从本地相册选择图片或使用相机拍照
			wx.previewImage：预览图片
			wx.getImageInfo：获取图片信息
			wx.saveImageToPhotosAlbum：保存图片到系统相册
		录音、音频、音乐、视频的播放、控制等
	^^文件^^
		wx.saveFile：保存文件到本地
		wx.getFileInfo：获取文件信息
		wx.getSavedFileList：获取本地已保存的文件列表
		wx.getSavedFileInfo：获取已保存到本地文件的文件信息
		wx.removeSavedFile：删除本地存储的文件
		wx.openDocument：新开页面打开文档，支持格式有 doc, xls, ppt, pdf, docx, xlsx, pptx
	^^数据缓存^^
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
	^^位置^^
		wx.getLocation：获取当前位置的经纬度、速度、高度
		wx.chooseLocation：打开地图选择位置
		wx.openLocation：​使用微信内置地图查看位置
		wx.createMapContext：操作组件内 <map/> 组件
	^^设备^^
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
	^^界面^^
		交互反馈
			wx.showToast：显示消息提示框，可选 success、loading、none
			wx.showLoading：显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
			wx.hideToast：隐藏消息提示框
			wx.hideLoading：隐藏 loading 提示框，调用 wx.showToast() 也可覆盖loading 提示框
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
	^^第三方平台^^
		wx.getExtConfig：获取第三方平台自定义的数据字段
		wx.getExtConfigSync：上面的同步接口
	^^开放接口^^
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
	^^其他^^
		数据常规分析：开发者通过数据分析接口，可获取到小程序的各项数据指标，便于进行数据存储和整理
		wx.reportAnalytics：自定义数据上报接口
		wx.getUpdateManager：管理小程序更新
		wx.createWorker：创建一个多线程 Worker 线程，并返回 Worker 实例
		wx.reportMonitor：自定义业务数据监控上报接口
		wx.setEnableDebug：设置是否打开调试开关，此开关对正式版也能生效
	!!

	##页面导航
	!!
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
	!!

	##提示框

	###消息提示框
	在指定时间 duration 后自动消失
	!!
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
	!!

	###loading提示框
	需调用 wx.hideLoading() 后才会消失
	!!
	wx.showLoading({
		title{String}!：提示的内容
		mask{Boolean}[false]：是否显示透明蒙层，防止触摸穿透
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：完成的回调函数
	})
	wx.hideLoading()：隐藏loading提示框
	!!

	###模态弹窗
	!!
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
	!!

	###操作菜单
	!!
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
	!!

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
	!!
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
	!!
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
	!!
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
	!!
	返回一个 uploadTask 对象，可通过·onProgressUpdate()·监听上传进度变化事件，调用·abort()·可取消上传任务
	·onProgressUpdate·返回参数说明：
	!!
	progress{Number}：下载进度百分比
	totalBytesWritten{Number}：已经下载的数据长度，单位 Bytes
	totalBytesExpectedToWrite{Number}：预期需要下载的数据总长度，单位 Bytes
	!!
	示例代码：
	··
	const uploadTask = wx.uploadFile({
    url: 'http://example.weixin.qq.com/upload',
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
	!!
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
	!!
	返回一个 downloadTask 对象，可通过·onProgressUpdate()·监听下载进度变化事件，参数同 uploadTask，调用·abort()·可取消下载任务

	##图片和文件
	###图片
	!!
	^^从本地相册选择图片或使用相机拍照^^
	文件的临时路径在小程序本次启动期间可以正常使用，如需持久保存需在主动调用 wx.saveFile，在小程序下次启动时才能访问得到
		wx.chooseImage({
			count{Number}[9]：最多可以选择的图片张数
			sizeType{Array/String}[['original','compressed']]：original-原图，compressed-压缩图，默认都有
			sourceType{Array/String}[['album','camera']]：album-从相册选图，camera-使用相机，默认都有
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
	^^预览图片，左右滑动可切换图片，长按可选择保存或转发、收藏^^
		wx.previewImage({
			urls{StringArray}!：图片路径列表
			current{String}[urls[0]]：当前显示图片路径
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	^^获取图片信息^^
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
	^^保存图片到系统相册^^
		wx.saveImageToPhotosAlbum({
			filePath{String}!：图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	!!
	###文件
	!!
	^^保存文件到本地^^
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
	^^获取文件信息^^
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
	^^获取本地已保存的文件列表^^
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
	^^获取本地文件的文件信息^^
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
	^^删除本地存储的文件^^
		wx.removeSavedFile({
			filePath{String}!：需要删除的文件路径
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	^^新开页面打开文档^^
	支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
		wx.openDocument({
			filePath{String}!：文件路径，可通过 downFile 获得
			fileType{String}!：指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
			success{Function}：成功的回调函数
			fail{Function}：失败的回调函数
			complete{Function}：完成的回调函数
		})
	!!

	##常用

	###打电话
	!!
	wx.makePhoneCall({
		phoneNumber{String}!：需要拨打的电话号码
		success{Function}：成功的回调
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	!!

	###设置页面标题
	!!
	wx.setNavigationBarTitle({
		title{String}!：页面标题
		success{Function}：成功的回调
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	!!

	###滚动页面
	!!
	wx.pageScrollTo({
		scrollTop{Number}!：滚动到页面的目标位置（单位px）
		duration{Number}：滚动动画的时长，默认300ms，单位 ms
	})
	!!

	###下拉刷新
	在当前页面的 json 文件中的 window 属性设置·enablePullDownRefresh·为 true
	在 Page 中定义·onPullDownRefresh·函数，当用户手动下拉的时候就会触发该事件
	当处理完数据刷新后调用·wx.stopPullDownRefresh()·可以停止下拉刷新
	也可以使用·wx.startPullDownRefresh()·主动调用下拉刷新
	!!
	wx.startPullDownRefresh({
		success{Function(res)}：成功的回调
			res：{
				errMsg{String}：接口调用的结果
			}
		fail{Function}：失败的回调
		complete{Function}：完成的回调
	})
	!!

	###获取位置
	获取当前位置的经纬度、速度、高度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用
	!!
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
	!!

	##转发
	在 Page 中定义 onShareAppMessage 函数，右上角菜单才会显示“转发”按钮， return 一个 Object 用于自定义转发内容
	!!
	onShareAppMessage(res) {
		res：{
			from{String}：转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
			target{Object}：如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
		}
		return {
			title：转发的标题，默认为当前小程序名称
			path：转发的路径，默认为当前页面路径 ，必须是以 / 开头的完整路径
			imageUrl：图片路径，支持PNG及JPG，默认为当前页面的截图，长宽比是 5:4
		}
	}
	!!
	通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识。
	调用·wx.showShareMenu·并且设置 withShareTicket 为·true·，当用户将小程序转发到任一群聊之后，此转发卡片在群聊中被其他用户打开时，可以在·App.onLaunch()·或·App.onShow·获取到一个 shareTicket。通过调用·wx.getShareInfo()·接口传入此 shareTicket 可以获取到转发信息。
	注意只有转发到群聊中打开才可以获取到 shareTickets 返回值，单聊没有 shareTickets，shareTicket 仅在当前小程序生命周期内有效。
	!!
	^^显示当前页面的转发按钮^^
		wx.showShareMenu({
			withShareTicket{Boolean}：是否使用带 shareTicket 的转发
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	^^隐藏转发按钮^^
		wx.hideShareMenu({
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	^^更新转发属性^^
		wx.updateShareMenu({
			withShareTicket{Boolean}：是否使用带 shareTicket 的转发
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
	^^获取转发详细信息^^
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
	!!

	##数据缓存
	大小限制为 10MB，异步接口无阻塞有回调函数，同步接口有阻塞无回调函数但写法简单
	!!
	^^存储^^
		wx.setStorage({
			key{String}!：键名
			data{Object/String}!：键值
			success{Function}：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.setStorageSync(key{String}!, data{Object/String}!)
	^^读取单个^^
		wx.getStorage({
			key{String}!：键名
			success{Function(res)}!：成功的回调，res = {data: key对应的内容}
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.getStorageSync(key{String}!)：返回的结果即键值
	^^读取全部^^
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
	^^删除单个^^
		wx.removeStorage({
			key{String}!：键名
			success{Function}!：成功的回调
			fail{Function}：失败的回调
			complete{Function}：完成的回调
		})
		wx.removeStorageSync(key{String}!)
	^^删除全部^^
		wx.clearStorage()
		wx.clearStorageSync()
	!!

	##WXML节点信息
	·wx.createSelectorQuery()·：返回一个·SelectorQuery·对象实例，调用相关方法以获取相关节点：
	!!
	in(component)：选择自定义组件 component 内的节点
	select(selector)：在当前页面下选择第一个匹配的节点，返回一个NodesRef对象实例，用于获取节点信息，selector支持 :
		#id、.class、#id, .class、.parent>.child、.parent .children、.parent >>> .children（跨自定义组件的后代选择器）
	selectAll(selector)：在当前页面下选择所有匹配的节点，返回一个数组形式的NodesRef对象实例
	selectViewport()：选择显示区域（当前页面），可用于获取显示区域的尺寸、滚动位置等信息，返回一个NodesRef对象实例
	exec([callback])：执行所有的请求，请求结果按请求次序构成数组，在callback的第一个参数中返回
	!!
	返回的 NodesRef 对象实例可调用的方法有：
	!!
	boundingClientRect([callback])：返回节点信息，包括 id、dataset、left、right、top、bottom、width、height，单位为px
	scrollOffset([callback])：返回节点滚动位置信息，节点必须是 scroll-view 或 viewport，包括 id、dataset、scrollTop、scrollLeft，单位为px
	fields(fields,[callback])：自定义指定获取节点的相关信息，返回值是nodesRef对应的selectorQuery。可指定获取的字段包括
		id{Boolean}[false]：是否返回节点id
		dataset{Boolean}[false]：是否返回节点dataset
		rect{Boolean}[false]：是否返回节点布局位置（left、right、top、bottom）
		size{Boolean}[false]：是否返回节点尺寸（width、height）
		scrollOffset{Boolean}[false]：是否返回节点的 scrollLeft scrollTop ，节点必须是scroll-view或viewport
		properties{StringArray}[[]]：指定节点属性名列表，以返回对应属性值（ id、class、style 和事件绑定的属性值不可获取）
	!!

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

	###wx.login
	调用接口·wx.login()·获取临时登录凭证，以换取用户的 openid、session_key、unionid
	用户向公众号发送消息时，公众号方收到的消息发送者是一个OpenID，是使用用户微信号加密后的结果，每个用户对每个公众号有一个唯一的 OpenID
	!!
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
	!!
	然后在服务器后台调用指定接口，使用 code 换取 openid、session_key、unionid，地址：·https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code·
	参数说明：
	!!
	appid!：小程序唯一标识，在小程序后台或微信开发者工具可查看
	secret!：小程序的 app secret，在小程序后台查看
	js_code!：wx.login 得到的 code
	grant_type!：填写为 authorization_code 即可
	!!
	返回的结果：
	!!
	openid：用户唯一标识
	session_key：会话密钥，生成对比 signature 以校验数据的完整性和解密 encryptedData
	unionid：用户在开放平台的唯一标识符（满足UnionID下发条件才会出现）
	!!
	·session_key·说明：用于在服务器解密wx.getUserInfo()返回的敏感数据，为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。
	·unionid·说明：如果开发者拥有多个移动应用（比如在APP内开发了微信分享、微信支付）、网站应用（比如在某网站开放了微信快捷登录）、和公众帐号，微信针对用户在不同的应用下都有唯一的一个·openId·，所以在不同的公众账号下·openid·是不一样的，但·unionid·却是一样的。
	对于拥有多个账号的企业来说，·unionid·可以帮助识别不同公众账号下的用户是否是同一个人。这样在不同账号下对该用户提供的服务可以连续起来了，可以实现多个小程序、公众号、APP之间数据互通。还可以去除重复关注的用户数，便于统计真实的关注用户总数
	·unionid·作为互通的用户标识，不建议作为用户ID，应该用·openid·。否则一旦发生小程序、公众号或者APP迁移到其他的开放平台下，就无法识别出来原来的用户了（迁移指微信开放平台的a帐号迁移到了b帐号）。而迁移小程序只要·appid·不变，·openid·就是不会变的。当然如果能保证账号之间不会迁移用·unionid·作为用户标识也是可以的。
	·unionid·获得途径：
	1、调用接口wx.getUserInfo，从解密数据中获取UnionID。注意本接口需要用户授权，需妥善处理拒绝授权后的情况
	2、如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。可以通过wx.login获取到该用户UnionID
	3、如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。也可以通过wx.login获取到
	微信开放平台绑定小程序流程
	前提：@[微信开放平台|https://open.weixin.qq.com/]帐号必须已完成开发者资质认证
	开发者资质认证流程：登录微信开放平台 – 帐号中心 – 开发者资质认证
	登录微信开放平台—管理中心—公众帐号—绑定公众帐号

	###wx.getUserInfo
	获取用户信息，当用户授权过才可以使用该接口，否则会报错，只能使用@[<button>|javascript:;" onclick="$('h1:eq(2)~h2:eq(5)').click()]将·open-type·设为·getUserInfo·引导用户授权，比·wx.login()·的优势在于解密后就能获得·unionid·，而·wx.login()·需要一定的条件
	!!
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
				rawData{String}：不包括敏感信息的原始数据字符串（userInfo的字符串版），用于计算签名
				signature{String}：微信端使用 sha1( rawData + session_key ) 得到的加密版字符串，用于校验用户信息
				encryptedData{String}：包括敏感数据在内的完整用户信息的加密数据
				iv{String}：加密算法的初始向量
			}
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	!!
	###加密解密
	为了确保返回用户数据的安全性，微信会对明文数据进行签名。开发者可以根据业务需要对数据包进行签名校验，确保数据的完整性。
	1、通过调用接口（如 wx.getUserInfo）获取数据时，接口会同时返回 rawData、signature，其中 signature = sha1( rawData + session_key )
	··
	// 假设用户的 session-key
	HyVFkGl5F5OQWJZZaNzBBg==

	// 假设用户的 rawData
	{"nickName":"Band","gender":1,"language":"zh_CN","city":"Guangzhou","province":"Guangdong","country":"CN","avatarUrl":"avatarUrl"}

	// 加密 sha1( rawData + session_key ) 得到 signature2，用来对比 signature
	75e81ceda165f4ffa64f4068af58c64b8f54b88c
	··
	2、开发者将 signature、rawData 发送到开发者服务器进行校验。服务器利用用户对应的 session_key 使用相同的算法计算出签名 signature2 ，比对 signature 与 signature2 即可校验数据的完整性。
	3、对 encryptedData 进行解密：
	!!
	对称解密使用的算法为·AES-128-CBC·，数据采用·PKCS#7·填充
	对称解密的目标密文为·Base64_Decode(encryptedData)·
	对称解密秘钥·aeskey = Base64_Decode(session_key)·，·aeskey·是16字节
	对称解密算法初始向量为·Base64_Decode(iv)·，其中·iv·由数据接口返回
	!!
	··
	// 部分 nodejs 的 crypto 解密示例
	// 需要 appId、sessionKey、encryptedData、iv
	var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
	decipher.setAutoPadding(true)	// 设置自动 padding，删除填充补位
	var decoded = decipher.update(encryptedData, 'binary', 'utf8')	// encryptedData 的更新解密
	decoded += decipher.final('utf8')	// 加上剩余的解密内容
	decoded = JSON.parse(decoded)	// 转成对象
	if (decoded.watermark.appid !== appId) {	// 判断敏感数据归属的 appId 和自己的 appId 是否一致
		throw new Error('Illegal Buffer')
	}

	// decoded 即 encryptedData 解密后的数据
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

	###会话密钥session_key有效性
	开发者如果遇到因为session_key不正确而校验签名失败或解密失败，请关注下面几个与session_key有关的注意事项。
	!!
	wx.login()调用时，用户的session_key会被更新而致使旧session_key失效。开发者应该在明确需要重新登录时才调用wx.login()，及时通过登录凭证校验接口更新服务器存储的session_key。
	微信不会把session_key的有效期告知开发者。我们会根据用户使用小程序的行为对session_key进行续期。用户越频繁使用小程序，session_key有效期越长。
	开发者在session_key失效时，可以通过重新执行登录流程获取有效的session_key。使用接口wx.checkSession()可以校验session_key是否有效，从而避免小程序反复执行登录流程。
	当开发者在实现自定义登录态时，可以考虑以session_key有效期作为自身登录态有效期，也可以实现自定义的时效性策略。
	!!
	wx.checkSession(OBJECT)可校验用户当前session_key是否有效。
	!!
	wx.checkSession({
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	!!
	示例代码：
	··
	wx.checkSession({
		success: function(){
			// session_key 未过期，并且在本生命周期一直有效
		},
		fail: function(){
			// session_key 已经失效，需要重新执行登录流程
			wx.login() //重新登录
			......
		}
	})
	··

	###设计规范
	当开发者在小程序首页就调用·wx.getUserInfo·时，会造成一进入小程序就出现授权弹窗，然后用户脑海闪过一些哲学问题：
	你是谁？
	我在哪里？
	我为什么要同意？
	……
	这就导致了部分用户点击拒绝授权，如果开发者没有对拒绝的情况做处理，可能会因为不良体验而流失用户。
	所以微信端做出了调整，以前调用·wx.getUserInfo·接口会进行一次弹窗授权（拒绝之后再次调用不会弹窗，只能在授权设置中开启，设置在：右上角 - 关于 - 右上角 - 设置），并且·wx.getUserInfo·依赖·wx.login·，现改为·wx.getUserInfo·不依赖·wx.login·就能得到数据，并不会调用授权窗口，改用·button·组件来获取用户信息（授权无限制以解决用户再次授权），其实如果只需要展示而不获取用户的开放信息（头像、昵称等）用@[<open-data>|javascript:;" onclick="$('h1:eq(2)~h2:eq(4)').click()]组件就行了，还不用弹窗授权
	一个好的互联网产品，首页应该传递给用户产品理念，在需要展示用户信息的地方才去提示授权，比如未登录的淘宝在浏览完商品后点击购买才要求登录，如果在小程序使用前一定要用户登录或进行到需要用户登录的操作时，可以将·wx.getUserInfo·的·button·组件放置到页面中，并说明：
	为什么需要授权？
	需要用户的什么信息？
	授权有什么好处？
	接下来在页面上放置一个明显的登录按钮，建议不要有其他的点击区域，让用户专注登录。
	用户可能会更改昵称和头像，建议定期使用·wx.getUserInfo·更新信息，如果用户授权后又在设置中关掉了授权或本地删除了小程序，需用·button·组件重新授权

	###wx.getSetting
	获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
	!!
	wx.getSetting({
		success{Function(res)}：成功的回调函数
			res：authSetting用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	!!

	###获取用户登录态建议实践
	!!
	小程序内调用·wx.login()·获取 code 并传给服务器
	服务器请求指定接口得到openid、session_key、unionid
	服务器以安全起见自定义和openid、session_key、unionid关联的登录态并返回小程序
		比如生成加密随机数称之为3rd_session，以3rd_session为key，openid、session_key、unionid为value进行存储，然后把3rd_session传回小程序
	小程序把3rd_session存入本地作为用户登录态
	之后比如请求数据·wx.request()·就携带自定义登录态3rd_session，服务器查询到对应的openid、session_key以返回相关数据
	定期更新登录态的信息，比如用 session_key 的有效期作为登录态的有效期，用·wx.checkSession()·来检查是否有效，若失效则重新请求并保存 session_key 到服务器
	!!
	!./img/html/wechat-applet06.jpg,600
	###获取用户信息建议实践
	尽量使用·<open-data>·展示用户头像昵称等公开信息
	使用·wx.getSetting·获取用户的授权情况
	若已授权直接使用·wx.getUserInfo·获取用户最新的信息
	若未授权则展示获取用户信息的按钮或界面
	用 button 组件的方式获得用户授权后，调用 wx.getUserInfo 就可以直接获取用户信息。用户有可能会修改昵称头像，最好是定期获取用户信息以更新
	例如：
	··
	wx.getSetting({
		withCredentials: false,
		success: res => {
			if (res.authSetting['scope.userInfo']) {
				wx.getUserInfo({
					success: res => {
						// ...
					}
				})
			} else {
				wx.navigateTo('/getUserInfo/getUserInfo')
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

	###在小程序后台开通微信支付（服务号也行）
	!./img/html/wechat-applet01.png,800

	###交互过程示意图
	!./img/html/wechat-applet02.jpg,800

	###在微信支付服务后台生成预支付交易单
	URL地址：·https://api.mch.weixin.qq.com/pay/unifiedorder·
	请求参数：
	!!
	appid{String}!：小程序的 appid
	mch_id{String}!：微信支付的商户号
	device_info{String(32)}：自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
	nonce_str{String(32)}!：随机字符串，长度要求在 32 位以内。推荐@[随机数生成算法|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3]
	sign{String(32)}!：通过签名算法计算得出的签名值，详见@[签名生成算法|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3]
	sign_type{String}[MD5]：签名类型，支持HMAC-SHA256和MD5
	body{String(128)}!：商品简要描述，比如腾讯充值中心-QQ会员充值，规范详见@[参数规定|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]
	detail{String(6000)}：商品详细描述，规范详见@[单品优惠参数说明|https://pay.weixin.qq.com/wiki/doc/api/danpin.php?chapter=9_102&index=2]
	attach{String(127)}：附加数据，在查询 API 和支付通知中原样返回，可作为自定义参数使用
	out_trade_no{String(32)}!：商户系统内部订单号，自定义生成，要求 32个字符内，在同一个商户号下唯一。详见@[商户订单号|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]
	fee_type{String}[CNY]：标价币种，需符合 ISO 4217 标准的三位字母代码，详见@[货币类型|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]
	total_fee{Int}!：订单总金额，单位为分，详见@[支付金额|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]
	spbill_create_ip{String(16)}!：终端IP，APP 和 H5 支付提交用户端 ip，Native 支付填调用微信支付 API 的机器 IP
	time_start{String(14)}：订单生成时间，格式为 yyyyMMddHHmmss，如 2018年12月25日9点10分10秒 表示为 20181225091010。详见@[时间规则|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]
	time_expire{String(14)}：订单失效时间，格式同上为 yyyyMMddHHmmss。由于在请求支付的时候有一个必传参数 prepay_id 只有两小时的有效期，所以在重入时间超过 2 小时的时候需要重新请求下单接口获取新的 prepay_id。详见@[时间规则|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]，建议最短失效时间间隔大于 1 分钟
	goods_tag{String(32)}：订单优惠标记，使用代金券或立减优惠功能时需要的参数，说明详见代金券或立减优惠
	notify_url{String(256)}!：异步接收微信支付结果通知的回调地址，通知 url 必须为外网可访问的 url，不能携带参数
	trade_type{String(16)}!：交易类型，小程序填 JSAPI，详见@[参数规定|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2]
	product_id{String(32)}：trade_type=NATIVE 时，此参数必传。此参数为二维码中包含的商品 ID，商户自行定义。
	limit_pay{String(32)}：指定支付方式，填 no_credit 可限制用户不能使用信用卡支付
	openid{String(128)}!：trade_type=JSAPI 时此参数必传，用户在商户 appid 下的唯一标识
	!!
	返回值：
	!!
	return_code{String(16)}!：返回状态码，SUCCESS 或 FAIL，此字段是通信标识，非交易标识，交易是否成功需要查看 result_code 来判断
	return_msg{String(128)}：返回信息，如果有值则是错误原因，签名失败 或 参数格式校验错误
	!!
	以下字段在·return_code·为 SUCCESS 的时候有返回：
	!!
	appid{String(32)}!：调用接口提交的小程序ID
	mch_id{String(32)}!：调用接口提交的商户号
	device_info{String(32)}：自定义的参数，请求支付的终端设备号等
	nonce_str{String(32)}!：微信返回的随机字符串
	sign{String(32)}!：微信返回的签名值，详见@[签名算法|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3]
	result_code{String(16)}!：业务结果，SUCCESS/FAIL
	err_code{String(32)}：详见@[统一下单|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1&index=1]
	err_code_des{String(128)}：错误信息描述
	!!
	以下字段在·return_code·和·result_code·都为 SUCCESS 的时候有返回：
	!!
	trade_type{String(16)}!：交易类型，取值为：JSAPI，NATIVE，APP等，说明详见参数规定
	prepay_id{String(64)}!：微信生成的预支付会话标识，用于后续接口调用中使用，该值有效期为2小时
	code_url{String(64)}：二维码链接，trade_type 为 NATIVE 时有返回，用于生成二维码，展示给用户进行扫码支付
	!!

	###调用的API
	!!
	wx.requestPayment({
		timeStamp{String}!：时间戳从1970年1月1日00:00:00至今的秒数，即当前的时间
		nonceStr{String}!：随机字符串，长度为32个字符以下
		package{String}!：统一下单接口返回的 prepay_id 参数值，提交格式如·prepay_id=*·
		signType{String}!：签名算法，暂支持 MD5
		paySign{String}!：MD5 签名
		success{Function}：成功的回调函数
		fail{Function}：失败的回调函数
		complete{Function}：结束的回调函数
	})
	!!
	详细说明需查看：@[小程序支付接口文档|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1]
	所有参数在服务器调用统一下单接口返回：@[小程序支付统一下单接口|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1&index=1]
	登录@[微信商户平台|pay.weixin.qq.com]可设置签名密钥

	###示例代码：
	··
	wx.requestPayment({
		timeStamp: 'timeStamp',
		nonceStr: 'nonceStr',
		package: 'package',
		signType: 'MD5',
		paySign: 'paySign',
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

	##模板
	###getAccessToken
	首先获取小程序全局唯一后台接口调用凭据（access_token）。调用各后台接口时都需使用 access_token
	请求地址：·GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET·
	参数说明：
	!!
	grant_type{String}!：填写 client_credential
	appid{String}!：小程序 AppID
	secret{String}!：小程序 AppSecret
	!!
	成功返回：
	!!
	access_token{String}：获取到的凭证
	expires_in{Number}：凭证有效时间，单位:秒。目前是 7200 秒之内的值
	!!
	错误返回：
	!!
	errcode{Number}：错误码，-1:系统繁忙，0:请求成功，40001:AppSecret 错误，40002:grant_type 错误，40013:AppID 错误
	errmsg{String}：错误信息
	!!
	注意事项：
	access_token 的存储至少要保留 512 个字符空间；
	access_token 的有效期目前为 2 个小时，需定时刷新，重复获取将导致上次获取的 access_token 失效
	建议使用中控服务器统一获取和刷新 access_token，其他业务逻辑服务器所使用的 access_token 均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致 access_token 覆盖而影响业务
	access_token 的有效期通过返回的 expire_in 来传达，目前是7200秒之内的值，中控服务器需要根据这个有效时间提前去刷新。在刷新过程中，中控服务器可对外继续输出的老 	access_token，此时公众平台后台会保证在5分钟内，新老 access_token 都可用，这保证了第三方业务的平滑过渡
	access_token 的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新 access_token 的接口，这样便于业务服务器在API调用获知 access_token 已超时的情况下，可以触发 access_token 的刷新流程
	###发送模板消息
	请求地址：·POST https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN·
	请求参数：
	!!
	access_token{String}!：接口调用凭证
	touser{String}!：接收者（用户）的 openid
	template_id{String}!：所需下发的模板消息的id
	page{String}：点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
	form_id{String}!：表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
	data{String}：模板内容，不填则下发空模板
	emphasis_keyword{String}：模板需要放大的关键词，不填则默认无放大
	!!
	data 和 emphasis_keyword 示例：
	··
	data: {
		keyword1: {
			value: '339208499'
		},
		keyword2: {
			value: '2015年01月05日 12:30'
		},
		keyword3: {
			value: '腾讯微信总部'
		},
		keyword4: {
			value: '广州市海珠区新港中路397号'
		}
	},
	emphasis_keyword: 'keyword1.DATA'
	··
	错误返回：
	!!
	errcode{Number}：错误码，0:成功，40037:template_id 错误，41028:form_id 错误或过期，41029:form_id 已使用，41030:page 错误，45009:接口调用超过限额（目前默认每个帐号日调用限额为 100 万）
	errmsg{String}：错误信息
	!!

	##canvas
	画布，首先需要·canvas·组件，并设置·canvas-id·，若设置重复的 id 则只有第一个生效
	然后使用·wx.createCanvasContext('canvas-id')·创建 canvas 的绘图上下文
	··
	<canvas canvas-id="myCanvas"></canvas>

	const C = wx.createCanvasContext('myCanvas')

	// canvas 内部使用 px 单位，所以数值需手动适配，以 750 为基准
	const screenW = wx.getSystemInfoSync().windowWidth
	const rpx = length => Math.floor(screenW / 750 * length)
	··
	!!
	.setFillStyle(color)：设置填充色，默认为黑色
	.fillRect(x, y, w, h)：矩形
	!!

	#工具

	##介绍
	开发小程序需使用@[微信开发者工具|https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html]
	新建项目时需要在小程序后台注册后的 AppID，没有的话也可选择体验模式，但体验模式无法进行代码真机预览和上传等操作，部分 API 无法正常调用，注意登录的微信号需要是该 AppID 的小程序后台绑定过的开发者
	微信小程序运行在三端：iOS、Android 和 用于调试的开发者工具。
	三端的脚本执行环境以及用于渲染非原生组件的环境是各不相同的：
	在 iOS 上，小程序的 javascript 代码是运行在 JavaScriptCore 中，是由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10
	在 Android 上，小程序的 javascript 代码是通过 X5 JSCore来解析，是由 X5 基于 Mobile Chrome 53/57 内核来渲染的
	在 开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的
	尽管三端的环境是十分相似的，但是还是有些许区别：
	wxss 渲染表现不一致。尽管可以通过开启样式补全来规避大部分的问题 ，还是建议开发者需要在 iOS 和 Android 上分别检查小程序的真实表现。
	在 0.10.101000 以及之后版本的开发工具中，会默认使用 babel 将开发者 ES6 语法代码转换为三端都能很好支持的 ES5 的代码，帮助开发者解决环境不同所带来的开发问题。注意在开启 ES6 转换功能的情况下会启用 javasctipt 严格模式

	##快捷键
	!!
	ctrl + X：剪切，如果没有选中文字则剪切当前行
	ctrl + C：复制，如果没有选中文字则复制当前行
	shift + alt + F：格式化代码
	alt + ⬆：代码上移一行
	alt + ⬇：代码下移一行
	shift + alt + ⬆：复制并向上粘贴
	shift + alt + ⬇：复制并向下粘贴
	ctrl + F：当前文件内搜索
	shift + ctrl + F：整个项目内搜索
	shift + ctrl + R：替换
	ctrl + D：选择下一个匹配
	ctrl + shift + L：选择所有匹配
	ctrl + U：光标回退到上一个位置
	ctrl + I：选中当前行
	shift + home：选中从行首到光标处
	shift + end：选中从光标处到行尾
	!!

	##Git 状态展示
	如果所在的小程序工程目录（project.config.json 所在目录）存在 Git 仓库，编辑器可以展示目前的 Git 状态
	文件图标状态的含义如下：
	!!
	U：文件未追踪（Untracked）
	A：新文件（Added, Staged）
	M：文件有修改（Modified）
	+M：文件有修改（Modified, Staged）
	C：文件有冲突（Conflict）
	D：文件被删除（Deleted）
	!!
	文件夹目录图标状态的含义如下：
	!!
	小红点：目录下至少存在一个删除状态的文件
	小橙点：目录下至少存在一个冲突状态的文件
	小蓝点：目录下至少存在一个未追踪状态的文件
	小绿点：目录下至少存在一个修改状态的文件
	!!
	如果某一文件存在修改（Modified），可以右键点击此文件，并选择 “与上一版本比较”，则可以查看当前工作区文件与 HEAD 版本的比较
	比较时文件夹目录图标状态的含义如下：
	!!
	蓝色线条：此处的代码有变动
	绿色线条：此处的代码是新增的
	红色三角箭头：此处有代码被删除
	!!

	##项目配置文件
	可以在项目根目录使用·project.config.json·文件对项目进行配置
	!!
	miniprogramRoot{Path String}：指定小程序源码的目录(需为相对路径)
	qcloudRoot{Path String}：指定腾讯云项目的目录(需为相对路径)
	pluginRoot{Path String}：指定插件项目的目录(需为相对路径)
	compileType{String}：编译类型，可选 miniprogram（小程序）、plugin（小程序插件）
	setting{Object}：项目设置
		es6{Boolean}：是否启用 es5 转 es6
		postcss{Boolean}：上传代码时样式是否自动补全
		minified{Boolean}：上传代码时是否自动压缩
		urlCheck{Boolean}：是否检查安全域名和 TLS 版本
	libVersion{String}：基础库版本
	appid{String}：项目的 appid，只在新建项目时读取
	projectname{String}：项目名字，只在新建项目时读取
	packOptions{Object}：打包配置选项，打包是预览 、上传时对项目进行的必须步骤
		ignore{Object Array}：用以配置打包时对符合指定规则的文件或文件夹进行忽略，以跳过打包的过程，这些文件或文件夹将不会出现在预览或上传的结果内。每项如下 :
			type{String}：类型，可选folder（文件夹）、file（文件）、suffix（后缀）、prefix（前缀）
			value{String}：路径或取值，不支持通配符、正则表达式。若是路径则以小程序目录 (miniprogramRoot) 为根目录
	scripts{Object}：自定义预处理
		beforeCompile：编译前预处理命令
		beforePreview：预览前预处理命令
		beforeUpload：上传前预处理命令
	!!

	##腾讯云
	开发者可以使用小程序腾讯云支持，开发环境提供免费的主机、https 域名。开发完毕后，还可以三个月内继续使用免费的生产环境。而这一切只需要开发者提供域名。
	目前服务端支持 NodeJS 和 PHP 两种语言，开发者可以使用微信开发者工具同时进行服务端和小程序的开发。
	开发环境
	!!
	免费使用
	自动分配测试用二级域名 xxxxxxx.qcloud.la
	自动部署免费 HTTPS
	仅可用于线上调试，不可发布
	代码部署、运行和数据库与生产环境完全分开
	与微信开发工具打通，可一键部署、调试、重启和恢复代码
	!!
	生产环境
	!!
	免费使用
	用户需购买或使用已有的腾讯云域名
	自动部署免费 HTTPS
	用于线上发布，不可调试
	使用微信开发工具上传代码，在腾讯云控制台操作部署，上传和发布分离，降低误操作风险
	!!
	通过微信公众平台授权登录腾讯云
	打开 微信公众平台 注册并登录小程序，按如下步骤操作：
	!!
	单击左侧菜单栏中的【设置】
	单击右侧 Tab 栏中的【开发者工具】
	单击【腾讯云】，进入腾讯云工具页面，单击【开通】
	使用小程序绑定的微信扫码即可将小程序授权给腾讯云，开通之后会自动进去腾讯云微信小程序控制台，显示开发环境已开通，此时可以进行后续操作
	!!
	注意：此时通过小程序开发者工具查看腾讯云状态并不会显示已开通，已开通状态会在第一次部署开发环境之后才会同步到微信开发者工具上
	服务端、客户端的 Demo、SDK 的具体文档：@[开发环境和生产环境|https://github.com/tencentyun/wafer2-startup/wiki/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E5%92%8C%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83]

	#小游戏

	##介绍
	微信小游戏是小程序的一个类目。用户完成小程序注册后，可选择“游戏”类目并开始开发、调试小游戏
	需要两个必要文件：
	!!
	game.js：小游戏入口文件
	game.json：配置文件
	!!
	每个小游戏允许上传的代码包总大小为 4MB

	##game.json
	开发者工具和客户端需要读取这个配置，完成相关界面渲染和属性设置。
	!!
	deviceOrientation{String}[portrait]：屏幕方向，可选 portrait（竖屏）、landscape（横屏）
	showStatusBar{Boolean}[false]：是否显示状态栏
	networkTimeout：
	!!

	@@!
	小程序官方文档|https://developers.weixin.qq.com/miniprogram/introduction/index.html?t=2018413
	小程序社区：疑难解答、教程、demo、资源|http://www.wxapp-union.com
	小程序club：同上|http://www.wxappclub.com
	知乎：如何入门微信小程序开发，有哪些学习资料？|https://www.zhihu.com/question/50907897
	知乎：「微信小程序」剖析（二）：框架原理 | 在浏览器上运行的猜想|https://zhuanlan.zhihu.com/p/22607204
	公众号：一起脱去小程序的外套和内衣 - 微信小程序架构解析|https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247485680&amp;idx=1&amp;sn=119e4d94a4d5e995700c0e9358a61dbb&source=41#wechat_redirect
	@@

	&2018/6/7
`