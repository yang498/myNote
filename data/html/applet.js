commonData.html.applet.content = `
#介绍
微信小程序和网页的区别在哪里？
!!
代码差异不大：小程序也是用 JavaScript，从网页开发迁移到小程序的开发成本并不高
页面的样式和功能：微信小程序有更多封装的模块以及微信生态，例如组件中的 picker、map，API 中的扫码、支付等
兼容适配：web 要考虑到多种兼容性，而小程序只需要处理 iOS 和 Android 的微信客户端，并有自适应单位 rpx
数据管理：小程序有微信后台可以查看流量数据、管理和运营
体验：小程序旨在用完即走，加上运营规则，避免了大部分的营销、刷流量、广告等违规内容
!!

##起步
!!
首先@[注册|https://mp.weixin.qq.com/wxopen/waregister?action=step1]一个小程序帐号，通过这个帐号你就可以管理你的小程序
	也可以通过已注册的订阅号或服务号在关联小程序时快速注册，沿用之前的资质
一个帐号只能发布一个小程序，同一个主体身份下个人帐户可创建 5 个、企业 50 个的小程序账号
@[下载微信开发者工具|https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=201861]来开发小程序
	需要填写的小程序·AppID·，登录@[小程序平台|https://mp.weixin.qq.com]，在菜单【设置 - 开发设置】可以看到
!!

##公众号关联小程序
公众号关联小程序后，将可在图文消息、自定义菜单、模板消息等功能中使用小程序。关联规则：
!!
所有公众号都可以关联小程序。
一个公众号可关联10个同主体的小程序，3个不同主体的小程序。
一个小程序可关联500个公众号。
公众号一个月可新增关联小程序13次，小程序一个月可新增关联500次。
!!
关联流程：登录公众号后台-小程序-小程序管理-添加-关联小程序

##常见问题
!!
小程序代码包大小限制为 2M，如果太大可考虑分包加载，代码包大小的优化应考虑尽量少使用本地图片和类库，改为从网络加载
·background-image·不能使用本地图片，可用网络图片或 base64，或改用·<image/>·标签
获取输入框中的内容可以使用·bindinput·或·bindblur·事件
iOS 上页面最后的元素·margin-bottom·无效，所以在页面底部留白的还是改用空高·<view>·或父容器·padding·
自定义弹窗阻止页面滑动：在遮罩和弹窗容器上·catchtouchmove·一个空方法，若弹窗是可滚动的则只在遮罩上使用
	如果页面是·<srcoll-view>·则可以改成在弹窗出现时将页面·<srcoll-view>·的·scroll-y·设为·false·
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
.wxml!：页面结构
.wxss：页面样式表
.js!：页面逻辑
.json：页面配置
!!
^^注意：为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。^^

##app.json
配置项列表：
!!
pages{String Array}!：设置页面路径，指定小程序由哪些页面组成，第一项指定了小程序的启动页面
window{Object}：设置页面的窗口样式，例如导航条、标题、窗口背景色
tabBar{Object}：设置底部 tab 的表现，配置最少2个、最多5个，注意当设置 position 为 top 时将不会显示 icon
networkTimeout{Object}：设置网络超时时间
debug{Boolean}：设置是否开启 debug 模式，在控制台面板显示调试信息以 info 的形式给出
!!
例如：
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
每一个小程序页面也可以使用 .json 文件来对本页面的窗口样式进行单独配置，如：
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

###App()
App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。
!!
onLaunch：生命周期函数--监听小程序初始化，当小程序初始化完成时触发，全局只触发一次，可接受一个参数对象，属性：
	path{String}：打开小程序的路径
	query{Object}：打开小程序的携带的参数
	scene{Number}：打开小程序的场景值
	shareTicket{String}：shareTicket，详见转发
	referrerInfo{Object}：当场景为由从另一个小程序或公众号或App打开时，返回此字段
		appId{String}：来源小程序或公众号或App的 appId，支持返回的场景有：1020、1035、1036、1037、1038、1043
		extraData{Object}：来源小程序传过来的数据，scene=1037或1038时支持
onShow：生命周期函数--监听小程序显示，当小程序启动，或从后台进入前台显示，可接受一个参数对象，属性同 onLaunch
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
###注意
App() 必须在 app.js 中注册，且不能注册多个。
不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
通过 getApp() 获取实例之后，不要调用生命周期函数。

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
onShareAppMessage：用户点击右上角转发，设置该函数右上角菜单才会显示转发选项
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
callback{Function}!：回调函数，在这次 setData 对界面渲染完毕后调用
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
		})

		// 当 key 是个链式写法还带变量时，不加引号语法错误，加引号又无法表示变量
		const index = 0
		this.setData({ array[index].text: 'new data' })
		this.setData({ 'array[index].text': 'new data' })
		// 所以可以使用先赋值改变再 setData 的方式
		this.data.array[index].text = 'new data'
		this.setData({ array: this.data.array })

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

##模块化
在 JavaScript 文件中声明的变量和函数只在该文件中有效，可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块
模块只有通过·module.exports·或者·exports·才能对外暴露接口
注意·exports·是·module.exports·的一个引用，因此在模块里边随意更改·exports·的指向会造成未知的错误，所以更推荐用·module.exports·
并且·require()·返回的是·module.exports·而不是·exports·
小程序目前不支持引入·node_modules·，开发者需要使用到·node_modules·时候拷贝出相关的代码到小程序的目录中
··
// util.js
function sayHello(name) {
	console.log(\`Hello \${name} !\`)
}
module.exports = {
	sayHello
}

// 其他 js 文件，使用 require() 引入，只支持相对路径，不支持绝对路径
const util = require('util.js')
Page({
	helloMINA: function() {
		util.sayHello('MINA')
	}
})
··

###module.exports 和 exports 的区别
··
// object 或 array 才会造成引用，如果是 string、number、boolean、undefined、null 就是独立的

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
而·require()·返回的是·module.exports·，所以更推荐用·module.exports·
每个 js 的·module·对象都是独立的，所以不同 js 对·module.exports·进行赋值是互不影响的

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
其他事件属于特定组件如 submit、input、scroll，无特殊声明的都是不冒泡事件
特殊事件：·<canvas/>·中的触摸事件不可冒泡，所以事件对象没有 currentTarget
!!

写法：·bindtap="eventName"·或·bind:tap="eventName"·
传参：在 wxml 元素上自定义的以·data-·开头的属性，多个单词用-连接，不能大写，有也会转换成小写，通过事件对象·e.currentTarget.dataset·可拿到

··
<view bindtap="onclick" data-name="foo">click me</view>

Page({
	onclick(e) {
		console.log(e.currentTarget.dataset.name)	// foo
	}
})
··

事件对象：
··
eventName(e) {
	e: {
		"type"："tap", // 事件类型
		"timeStamp"：895, // 事件生成时的时间戳，从页面打开开始计算
		"target"：{ // 事件的目标对象属性
			"id"："tapTest", // 对象元素的 id 值
			"dataset"：{ // wxml 中定义的 data- 数据，即靠 data- 可传参，属性名会转换成驼峰
				"hi"："WeChat"
			},
			"offsetLeft"：9 // 相对于父容器且不包括 padding 和滚动条的 px 单位距离
			"offsetTop"：6
		},
		"currentTarget"：{ // 事件的当前对象属性
			"id"："tapTest",
			"dataset"：{
				"hi"："WeChat"
			},
			"offsetLeft"：12,
			"offsetTop"：18
		},
		"detail"：{ // 事件的信息
			"x"：53, // 同pageX
			"y"：14
		},
		"touches"：[{ // 触摸点信息
			"identifier"：0, // 触摸点的标识符
			"pageX"：53, // 相对于文档的距离，包括滚动距离
			"pageY"：14,
			"clientX"：53, // 相对于屏幕除了导航栏的距离
			"clientY"：14
		}],
		"changedTouches"：[{ // 变化的触摸点信息，如 touchstart 从无变有，touchmove 位置变化，touchend、touchcancel 从有变无
			"identifier"：0,
			"pageX"：53,
			"pageY"：14,
			"clientX"：53,
			"clientY"：14
		}],
		canvasTouch：[{ // canvas 专属的触摸点信息
			"identifier"：0, // 触摸点的标识符
			"x"：53, // 相对于 canvas 左上角的距离
			"y"：14,
		}]
	}
}
··

#wxml
WXML（WeiXin Markup Language）是框架设计的一套标签语言，结合基础组件、事件系统，可以构建出页面的结构

##{{ }}
动态数据均来自对应 Page 的 data，使用 Mustache 语法（双大括号·{{}}·）将变量包起来，比如：
··
<view>{{message}}</view> // 文本内容
<view id="item-{{id}}"></view> // 组件属性
<view>{{a+b}}+{{c}}+d</view> // 算数运算，结果是：3 + 3 + d
<view hidden="{{flag?true:false}}">Hidden</view> // 三元运算
<view wx:for="{{[id, 1, 2, 3, 4]}}">{{item}}</view> // 组合，得到：[0, 1, 2, 3, 4]
<view data-obj="{{...obj1, ...obj2, e: 5}}"></view> // 扩展运算符 ... 将对象展开，组成：{a: 1, b: 2, c: 3, d: 4, e: 5}
<view data-obj="{{...obj3, ...obj4, a, f: 6}}"></view> // 变量名相同的话后边会覆盖前面：{a: 1, b: 3, f: 6}
<view data-obj="{{foo, bar}}"></view> // 对象的 key 和 value 相同可以间接表达

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

// 表示 boolean 值时注意不要直接写 checked="false"，这表示字符串，代表 true
<checkbox checked="{{false}}"> </checkbox>

// 花括号和引号之间如果有空格，将最终被解析成为字符串
<view wx:for="{{[1,2,3]}} ">{{item}}</view>
// 等同于：
<view wx:for="{{[1,2,3] + ' '}}">{{item}}</view>
··

##wx:for
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
###wx:key
如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如·<input/>·中的输入内容，·<switch/>·的选中状态），需要使用·wx:key·来指定列表中项目的唯一的标识符。
当数据改变触发渲染层重新渲染的时候，会校正带有 wx:key 的组件，框架会确保他们被重新排序，而不是重新创建，并能提高列表渲染时的效率。
如不提供·wx:key·，控制台会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。
·wx:key·的值以两种形式提供：
!!
字符串：代表在 for 循环的 array 中 item 的某个属性·property·，该·property·的值需要是列表中唯一的字符串或数字，且不能动态改变。
*this：代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。
!!
··
// 这里的 objectArray 中的 id 的值和 unique 的值都是唯一的字符串或数字，所以 wx:key 填 id 或 unique 都可以
<switch wx:for="{{objectArray}}" wx:key="unique"> {{item.id}} </switch>

// 这里的 numberArray 中每一项都是唯一的数字，所以 wx:key 填 *this 就可以
<switch wx:for="{{numberArray}}" wx:key="*this"> {{item}} </switch>

Page({
	data: {
		objectArray: [
			{id: 0, unique: 'unique_0'},
			{id: 1, unique: 'unique_1'},
			{id: 2, unique: 'unique_2'},
			{id: 3, unique: 'unique_3'}
		],
		numberArray: [1, 2, 3, 4]
	}
})
··

##wx:if
判断是否需要渲染该代码块
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

##模板
###template
在模板页面中定义代码片段，然后在不同的地方调用，只在当前页面使用。
使用·name·属性，作为模板的名字。然后在·<template/>·内定义代码片段，如：
··
// /¿components/¿dome/¿dome.wxml
<template name="msgItem">
	<view class="demo">
		<text> {{index}}: {{msg}} </text>
		<text> Time: {{time}} </text>
	</view>
</template>

// /components/dome/dome.wxss
.demo {
	height: 200rpx;
}
··
使用·is·属性指定 template 的·name·，然后传入所需要的·data·，如：
··
<!-- 引入 -->
<import¿ src="../../components/dome/dome.wxml"/>

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
import 有作用域范围，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template。
如：C import B，B import A，C 不能使用 A 定义的 template。

###include
可以将目标文件除了·<template/>·和·<wxs/>·代码外的整个代码引入，相当于是拷贝到·include·位置，如：
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
app.wxss为全局样式。在 page 的 wxss 文件中为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。
与 CSS 相比，WXSS 扩展的特性有：尺寸单位和样式导入

###尺寸单位
单位：·rpx·，根据 750rpx 屏幕宽度进行自适应，由于换算采用的浮点数运算，所以运算结果会和预期结果有一点点偏差。例如：
iPhone6 的屏幕宽度为 375px，共有 750 个物理像素，·1rpx = 0.5px = 1物理像素，1px = 2rpx·
在 iPhone5 下·1rpx = 0.42px，1px = 2.34rpx·
在 iPhone6 Plus 下·1rpx = 0.552px，1px = 1.81rpx·
开发时可以以 iPhone6 作为参考标准。

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
注意
!!
WXS 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行。
WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。
WXS 的运行环境和其他 JavaScript 代码是隔离的，WXS 中不能调用其他 JavaScript 文件中定义的函数，也不能调用小程序提供的API。
WXS 函数不能作为组件的事件回调。
由于运行环境的差异，在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异
!!
WXS 代码模块可以编写在 wxml 文件中的·<wxs>·标签内，或以·.wxs·为后缀名的文件内然后引入·<wxs src="xxx.wxs" module="x" />·
每一个·.wxs·文件和·<wxs>·标签都是一个单独的模块。每个模块都有自己独立的作用域，通过每个页面单独的·module.exports·可以导出
标签形式：
··
<wxs module="foo">
	var some_msg = "hello world"
	module.exports = {
		msg: some_msg
	}
</wxs>
<view> {{foo.msg}} </view>
··
文件引入形式：
··
// /pages/tools.wxs
var foo = "'hello world' from tools.wxs"
var bar = function (d) {
	return d
}
module.exports = {
	FOO: foo,
	bar: bar,
};
module.exports.msg = "some msg"
··
··
<!-- page/index/index.wxml -->
<wxs src="./../tools.wxs" module="tools" />
<view> {{tools.msg}} </view>
<view> {{tools.bar(tools.FOO)}} </view>
··
在 .wxs 模块中可以使用·require()·引用其他 wxs 文件模块。需注意：
!!
只能引用 .wxs 文件模块，且必须使用相对路径。
wxs 模块均为单例，wxs 模块在第一次被引用时，会自动初始化为单例对象。多个页面，多个地方，多次引用，使用的都是同一个 wxs 模块对象。
如果一个 wxs 模块在定义之后，一直没有被引用，则该模块不会被解析与运行。
·<wxs>·模块只能在定义模块的 WXML 文件中被访问到。使用·<include>·或·<import>·时，·<wxs>·模块不会被引入
·<template>·标签中，只能使用定义该·<template>·的 WXML 文件中定义的·<wxs>·模块
!!

##自定义组件
开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用
和页面一样，一个自定义组件由·json wxml wxss js·4个文件组成。首先需要在·json·文件中声明这是一个自定义组件：
··
{
	"component": true
}
··
然后 wxml 和 wxss 就和平时写页面一样。区别在于 js，不是·Page()·而是·Component()·，@[参考官方|https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/]
使用自定义组件前先要在页面的 json 文件中进行引用声明，key 为指定自定义组件的名称，value 为自定义组件的路径：
··
{
	"usingComponents": {
		"component-tag-name": "/components/demo/demo"
	}
}
··
其他页面的引用，节点属性即传递给组件的属性值：
··
<view>
	<!-- 以下是对一个自定义组件的引用 -->
	<component-tag-name inner-text="Some text"></component-tag-name>
</view>
··
注意：
!!
因为 WXML 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。
自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用·usingComponents·字段）。
自定义组件和使用自定义组件的页面所在项目根目录名不能以·wx-·为前缀，否则会报错。
!!

###tips
假设·menuList·是传递给组件的数据，若在计时过程中使用·this.setData({ 'menuList.phoneCode.indicate': time + '秒' })·这种一直计时等渲染操作时，由于·menuList·被改变，所以触发视图渲染刷新，导致·picker·这类弹出式组件在渲染时被收起或报错
解决：把计时的变量抽离出来，比如改成使用组件属性传值或改成 slot 插槽，这样就不影响 menuList 本身

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

每个页面默认有个·<page></page>·父容器，可以不用添加最大父容器

##目录
!!
视图容器
	view：视图容器，可以当成·div·标签
	scroll-view：可滚动视图容器
	swiper：轮播图
	swiper-item：仅可放置在·<swiper>·组件中，宽高自动设置为 100%
	以及 movable-view、cover-image、cover-view、movable-area
基础内容
	icon：图标，目前有![./img/html/wechat-applet05.jpg,auto,30]，注意wxss无法改变color、size、line-height
	text：文字容器，内联元素
	rich-text：富文字容器
	progress：进度条
表单
	button：按钮
	input：输入框
	picker：列表选择器
	switch：开关
	textarea：文本域
	以及 checkbox、checkbox-group、editor、form、label、picker-view、picker-view-column、radio、radio-group、slider
导航
	functional-page-navigator：仅在插件中有效，用于跳转到插件功能页
	navigator：页面链接，相当于·<a>·
媒体
	image：图片，默认宽 300px、高 225px（4 : 3）
	以及 audio、video、camera、live-player、live-pusher
地图
	map：地图
画布
	canvas：画布
开放能力
	open-data：展示微信开放的数据，比如群名称
	web-view：承载网页的容器，会自动铺满整个小程序页面。个人类型与海外类型的小程序暂不支持使用
	以及 ad、official-account
原生组件说明：层级是最高的，还无法在·<picker-view>·中使用，部分 CSS 样式无法应用于原生组件
无障碍访问：为了更好地满足视障人士对于小程序的访问需求，基础库自 2.5.0 起，支持部分 ARIA 标签
block：常用于·wx:for·，以包含多个节点，自身不在页面中显示
!!

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
open-gid{String}：群id，当·type="groupName"·时生效，只有当前用户在此群内才能拉取到群名称，获取·open-gid·的方法可查看转发
lang{String}[en]：以哪种语言展示 userInfo，当·type="user*"·时生效，有效值有 en（英文）、zh_CN（简体中文）、zh_TW（繁体中文）
!!
··
// 得到什么类型的结果就是什么类型的元素
<open-data type="userAvatarUrl"/>	// 相当于image标签
<open-data type="userNickName"/>	// 相当于text标签
··

##picker
从底部弹起的滚动选择器，现支持五种选择器，通过 mode 来区分，分别是普通、多列、时间、日期、省市区，默认是普通选择器。选择器的选项>=5个在手机上就会循环展示。

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
^^基础^^
	wx.canIUse：判断小程序的API，回调，参数，组件等是否在当前版本可用
	wx.base64ToArrayBuffer：将 Base64 字符串转成 ArrayBuffer 对象
	wx.arrayBufferToBase64：将 ArrayBuffer 对象转成 Base64 字符串
	wx.getSystemInfo/Sync：异/同步获取系统信息
^^更新^^
	wx.getUpdateManager：获取全局唯一的版本更新管理器，用于管理小程序更新，返回·UpdateManager·对象用来管理更新
^^小程序^^
	wx.getLaunchOptionsSync：获取小程序启动时的参数。与·App.onLaunch·的回调参数一致
	以及·wx.on/offPageNotFound··wx.on/offError··wx.on/offAudioInterruptionBegin/End··wx.on/offAppShow··wx.on/offAppHide·
^^调试^^
	wx.setEnableDebug：设置是否打开调试开关。此开关对正式版也能生效
	wx.getLogManager：获取日志管理器对象
^^路由^^
	wx.navigateTo：保留当前页面，跳转到应用内非 tabBar 的页面
	wx.redirectTo：关闭当前页面，跳转到应用内非 tabBar 的页面，所以不能退回
	wx.reLaunch：关闭所有页面，打开到任意页面，如果是 tabBar 则不能带参数
	wx.switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面（不会刷新 tabBar 页面），不能带参数
	wx.navigateBack：关闭当前页面，返回上一页面或多级页面
^^交互反馈^^
	wx.showToast：显示消息提示框，可选 success、loading、none
	wx.showLoading：显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
	wx.hideToast：隐藏消息提示框
	wx.hideLoading：隐藏 loading 提示框，调用 wx.showToast() 也可覆盖loading 提示框
	wx.showModal：​显示模态弹窗
	wx.showActionSheet：显示操作菜单
	导航栏：设置当前页面的标题、导航条的颜色、显示隐藏导航条加载动画
	wx.setBackgroundTextStyle：动态设置下拉背景字体、loading 图的样式
	wx.setBackgroundColor：动态设置窗口的背景色
	Tab Bar：显示隐藏 TabBar 某一项右上角的红点、显示隐藏 tabBar、设置样式内容
	wx.loadFontFace：动态加载网络字体。文件地址需为下载类型。iOS 仅支持 https 格式文件地址
	wx.startPullDownRefresh：开始下拉刷新，效果与用户手动下拉刷新一致
	wx.stopPullDownRefresh：停止当前页面下拉刷新
	wx.pageScrollTo：将页面滚动到目标位置，单位 px
	wx.createAnimation：创建一个动画实例 animation。调用实例的方法来描述动画，其实可以尽量使用 wxss 代替
	wx.setTopBarText：动态设置置顶栏文字内容，只有当前小程序被置顶时能生效（貌似微信7.0版本开始不生效了）
	wx.nextTick：延迟一部分操作到下一个时间片再执行（类似于 setTimeout）
	wx.getMenuButtonBoundingClientRect：获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
	wx.onWindowResize：监听窗口尺寸变化事件
	wx.offWindowResize：取消监听窗口尺寸变化事件
	wx.onKeyboardHeightChange：监听键盘高度变化
^^网络^^
	wx.request：发起网络请求
	wx.downloadFile：下载文件
	wx.uploadFile：上传文件
	WebSocket：创建 WebSocket 连接
	mDNS：发起局域网网络请求
	UDP 通信：创建局域网内的 WebSocket 连接
^^数据缓存^^
	wx.setStorage/Sync：异/同步存储本地存储在指定的 key 中，若原来 key 有内容会覆盖，本地缓存大小限制为 10MB
	wx.getStorage/Sync：异/同步获取本地存储在指定的 key 中的内容
	wx.getStorageInfo/Sync：异/同步获取本地存储的信息，包含所有key、占用的空间、可用的空间
	wx.removeStorage/Sync：异/同步从本地缓存中异步移除指定 key
	wx.clearStorage/Sync：异/同步清空所有本地缓存
^^媒体^^
	wx.saveImageToPhotosAlbum：保存图片到系统相册
	wx.previewImage：预览图片
	wx.getImageInfo：获取图片信息
	wx.compressImage：压缩图片
	wx.chooseMessageFile：从客户端会话选择文件
	wx.chooseImage：从本地相册选择图片或使用相机拍照
	以及操作地图组件、视频、音频、背景音频、实时音视频、录音、相机、富文本
^^位置^^
	wx.openLocation：​使用微信内置地图查看位置
	wx.getLocation：获取当前的地理位置、速度
	wx.chooseLocation：打开地图选择位置
^^转发^^
	wx.updateShareMenu：更新转发属性
	wx.showShareMenu：显示当前页面的转发按钮
	wx.hideShareMenu：隐藏转发按钮
	wx.getShareInfo：获取转发详细信息
^^画布^^
	wx.createCanvasContext：创建 canvas 的绘图上下文对象
	wx.canvasToTempFilePath：把当前画布导出生成指定大小的图片。注意在·draw()·回调里调用该方法才能保证图片导出成功
^^文件^^
	wx.saveFile：保存文件到本地
	wx.removeSavedFile：删除本地缓存文件
	wx.openDocument：新开页面打开文档，支持格式有·doc, xls, ppt, pdf, docx, xlsx, pptx·
	wx.getSavedFileList：获取该小程序下已保存的本地缓存文件列表
	wx.getSavedFileInfo：获取本地文件的文件信息
	wx.getFileSystemManager：获取全局唯一的文件管理器
	wx.getFileInfo：获取临时文件信息
^^开放接口^^
	wx.login：获取临时登录凭证（code）
	wx.checkSession：校验用户当前 session_key 是否有效，用户越使用小程序越保持有效，越久未使用越有可能失效
	wx.navigateToMiniProgram：打开另一个小程序
	wx.navigateBackMiniProgram：返回到上一个小程序。只有在当前小程序是被其他小程序打开时可以调用成功
	wx.getAccountInfoSync：获取当前帐号信息，返回小程序 appId 和使用的插件信息
	wx.getUserInfo：获取用户信息，接口后续将不再出现授权弹窗，不建议使用，改为使用·<button>·获取
	wx.reportMonitor：自定义业务数据监控上报接口
	wx.reportAnalytics：自定义分析数据上报接口
	wx.requestPayment：发起微信支付
	wx.authorize：提前向用户发起授权请求，不会实际调用对应接口，若之前已授权则不会出现授权弹窗直接调用成功
	wx.openSetting：调起客户端小程序向用户请求过的权限设置界面
	wx.getSetting：获取某项功能或数据有没有被授权
	以及获取收货地址、卡券、发票、生物认证、微信运动
^^设备^^
	wx.setClipboardData：设置系统剪贴板的内容
	wx.getClipboardData：获取系统剪贴板的内容
	wx.makePhoneCall：打电话
	以及 iBeacon、WiFi、低功耗蓝牙、手机通讯录联系人、蓝牙、电量、NFC、网络状况、屏幕亮度、截屏事件
	以及 加速计、罗盘、设备方向、陀螺仪、性能、扫码、振动
^^Worker^^
	wx.createWorker：创建一个 Worker 线程，目前限制最多只能创建一个 Worker
^^第三方平台^^
	wx.getExtConfig/Sync：获取授权的第三方平台给的自定义数据字段
^^WXML^^
	wx.createSelectorQuery：返回一个 SelectorQuery 对象实例以获取节点信息
	wx.createIntersectionObserver：用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见
^^广告^^
	wx.createRewardedVideoAd：创建激励视频广告组件
	wx.createInterstitialAd：创建插屏广告组件
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
	delta{Number}[1]：返回的页面数，如果·delta·大于现有页面数则返回到首页，可通过·getCurrentPages()·获取当前的页面栈情况
})
!!

##提示框

###消息提示框
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

##网络请求

###说明
注意在小程序后台配置域名白名单，只支持·https·和·wss·协议。且不能使用·IP地址·或·localhost·，不能带端口号，必须经过·ICP备案·。
出于安全考虑·api.weixin.qq.com·不能被配置为服务器域名，相关API也不能在小程序内调用，只能在后台调用。
在微信开发者工具中可开启不校验请求域名跳过服务器域名的校验，手机也开启调试模式不会进行服务器域名的校验。当然上线还是会开启校验。
默认请求超时时间和最大超时时间都是 60s，request、uploadFile、downloadFile 的最大并发限制是 10 个。
只要服务器有返回东西都会进入 success 回调，最好根据 statusCode 再判断。

###发起网络请求
!!
wx.request({
	url{String}!：接口地址
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

##转发
在 Page 中定义 onShareAppMessage 函数，右上角菜单才会显示转发按钮， return 一个 Object 用于自定义转发内容
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
调用·wx.showShareMenu·并且设置 withShareTicket 为·true·，当用户将小程序转发到任一群聊之后，此转发卡片在群聊中被其他用户打开时，可以在·App.onLaunch()·或·App.onShow()·获取到一个 shareTicket。通过调用·wx.getShareInfo()·接口传入此 shareTicket 可以获取到转发信息。
注意只有转发到群聊中打开才可以获取到 shareTickets 返回值，单聊没有 shareTickets，shareTicket 仅在当前小程序生命周期内有效。

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
scrollOffset([callback])：返回节点滚动位置信息，节点必须是 scroll-view 或 viewport，包括 id、dataset、scrollTop、scrollLeft，单位为 px
context：添加节点的 Context 对象查询请求，目前支持 VideoContext、CanvasContext、LivePlayerContext 和 MapContext 
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
用户向公众号发送消息时，公众号方收到的消息发送者是一个OpenID，是使用用户微信号加密后的结果，每个用户(微信号)对每个公众号有一个唯一的 OpenID
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
然后在服务器后台调用指定接口，使用 code 换取 openid、session_key、unionid，地址
··
https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
··
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
属性说明：
!!
session_key：用于在服务器解密·wx.getUserInfo()·返回的敏感数据，为了数据安全不建议服务器把·session_key·下发到小程序
unionid：如果开发者拥有多个移动应用（比如在 APP 内开发了微信分享、微信支付）、网站应用（比如在某网站开放了微信快捷登录）、和公众帐号，微信针对用户在不同的应用下都有唯一的一个·openId·，所以在不同的公众账号下·openid·是不一样的，但·unionid·却是一样的
	对于拥有多个账号的企业来说，·unionid·可以帮助识别不同公众账号下的用户是否是同一个人。这样在不同账号下对该用户提供的服务可以连续起来了，可以实现多个小程序、公众号、APP之间数据互通。还可以去除重复关注的用户数，便于统计真实的关注用户总数
	unionid 作为互通的用户标识，不建议作为用户ID，应该用·openid·。否则一旦发生小程序、公众号或者APP迁移到其他的开放平台下，就无法识别出来原来的用户了（迁移指微信开放平台的a帐号迁移到了b帐号）。而迁移小程序只要·appid·不变，·openid·就是不会变的。当然如果能保证账号之间不会迁移用·unionid·作为用户标识也是可以的。
unionid 获得途径：
	调用接口 wx.getUserInfo，从解密数据中获取 UnionID。注意本接口需要用户授权，需妥善处理拒绝授权后的情况
	如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。可以通过wx.login获取到该用户UnionID
	如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。也可以通过wx.login获取到
!!

###设计规范
当开发者在小程序首页就调用·wx.getUserInfo()·或·wx.authorize()·时，会造成一进入小程序就出现授权弹窗
这就导致了部分用户在不了解这个小程序前可能会点击拒绝，如果开发者没有对拒绝的情况做处理，可能会因为不良体验而流失用户
所以微信端做出了调整，·wx.getUserInfo()·不依赖·wx.login()·就能得到数据，并不会调用授权窗口，改用·button·组件来获取用户信息
如果只需要展示而不获取用户的开放信息（头像、昵称等）用·<open-data>·组件就行了，还不用弹窗授权
一个好的互联网产品，首页应该传递给用户产品理念，在需要展示用户信息的地方才去提示授权，比如未登录的淘宝在浏览完商品后点击购买才要求登录
如果在小程序使用前一定要用户登录或进行到需要用户登录的操作时，可以将获取用户信息的·button·组件放置到页面中，并说明：
为什么需要授权？ 需要用户的什么信息？ 授权有什么好处？
接下来在页面上放置一个明显的登录按钮，建议不要有其他的点击区域，让用户专注登录
用户可能会更改昵称和头像，建议定期使用·wx.getUserInfo·更新信息，如果用户关掉了授权或本地删除了小程序则用·button·组件重新授权

###登录流程时序建议
!./img/html/wechat-applet06.jpg,600

##微信支付
首先开通@[微信支付平台|https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F]，然后关联小程序，交互过程示意图：
!./img/html/wechat-applet02.jpg,700
在微信支付服务后台生成预支付交易单，参考@[微信支付接口文档|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1]
URL 地址：·https://api.mch.weixin.qq.com/pay/unifiedorder·，参考@[小程序支付统一下单接口|https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1&index=1]
返回的结果都是小程序支付 API 的参数，所以请求成功后就可以调起支付窗口：
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

#工具

##介绍
开发小程序需使用@[微信开发者工具|https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html]
新建项目时需要在小程序后台注册后的 AppID，没有的话也可选择体验模式，但体验模式无法进行代码真机预览和上传等操作，部分 API 无法正常调用，注意登录的微信号需要是该 AppID 的小程序后台绑定过的开发者
微信小程序运行在三端：iOS、Android 和 用于调试的开发者工具。
三端的脚本执行环境以及用于渲染非原生组件的环境是各不相同的：
!!
iOS：小程序的 javascript 代码是运行在 JavaScriptCore 中，是由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10
Android：小程序的 javascript 代码是通过 X5 JSCore来解析，是由 X5 基于 Mobile Chrome 53/57 内核来渲染的
开发工具：小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的
!!
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

#云开发
开发者可以使用云开发开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。同开发者已经使用的云服务相互兼容，并不互斥。
%%
能力,作用,说明
,,1
云函数,无需自建服务器,在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码
数据库,无需自建数据库,一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库
存储,无需自建存储和 CDN,在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
云调用,原生微信服务集成,基于云函数免鉴权使用小程序开放接口的能力，包括服务端调用、获取开放数据等能力
%%

@@!
小程序官方文档|https://developers.weixin.qq.com/miniprogram/introduction/index.html?t=2018413
小程序社区：疑难解答、教程、demo、资源|http://www.wxapp-union.com
小程序club：同上|http://www.wxappclub.com
知乎：如何入门微信小程序开发，有哪些学习资料？|https://www.zhihu.com/question/50907897
知乎：「微信小程序」剖析（二）：框架原理 | 在浏览器上运行的猜想|https://zhuanlan.zhihu.com/p/22607204
公众号：一起脱去小程序的外套和内衣 - 微信小程序架构解析|https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247485680&amp;idx=1&amp;sn=119e4d94a4d5e995700c0e9358a61dbb&source=41#wechat_redirect
@@

&2019/5/23
`