<template>
    <div v-html="format(text)"></div>
</template>

<script>
import img1 from '@/assets/img/applet01.jpg'
export default {
    data () {
        return {
            text: `
# 微信小程序

本文档记录版本·v2.12.0·

## 概述

微信小程序和网页：

!!
代码差异不大：小程序也是用 JavaScript，从网页开发迁移到小程序的开发成本并不高
页面的样式和功能：微信小程序有更多封装的模块以及微信生态，例如组件中的 picker、map，API 中的扫码、支付等
兼容适配：web 要考虑到多种兼容性，而小程序只需要处理 iOS 和 Android 的微信客户端，并有自适应单位 rpx
数据管理：小程序有微信后台可以查看流量数据、管理和运营
体验：小程序旨在用完即走，加上运营规则，避免了大部分的营销、刷流量、广告等违规内容
!!

### 起步

!!
首先[注册](https://mp.weixin.qq.com/wxopen/waregister?action=step1)一个小程序帐号，通过这个帐号你就可以管理你的小程序
    也可以通过已注册的订阅号或服务号在关联小程序时快速注册，沿用之前的资质
一个帐号只能发布一个小程序，同一个主体身份下个人帐户可创建 5 个、企业 50 个的小程序账号
[下载微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=201861)来开发小程序
    需要填写的小程序·AppID·，登录[小程序平台](https://mp.weixin.qq.com)，在菜单【设置 - 开发设置】可以看到
!!

### 公众号关联小程序

公众号关联小程序后，将可在图文消息、自定义菜单、模板消息等功能中使用小程序。关联规则：

!!
所有公众号都可以关联小程序。
一个公众号可关联 10 个同主体的小程序，3 个不同主体的小程序。
一个小程序可关联 500 个公众号。
公众号一个月可新增关联小程序 13 次，小程序一个月可新增关联 500 次。
!!

关联流程：登录公众号后台 - 小程序 - 小程序管理 - 添加 - 关联小程序

### 常见问题

!!
小程序代码包大小限制为 2M，如果太大可考虑分包加载，应考虑尽量少使用本地图片和类库，改为从网络加载
·background-image·不能使用本地图片，可用网络图片或·base64·，或改用·<image/>·标签
获取输入框中的内容可以使用·bindinput·或·bindblur·事件
iOS 上页面最后的元素·margin-bottom·无效，所以在页面底部留白的还是改用空高·<view>·或父容器·padding·
自定义弹窗阻止页面滑动：在遮罩和弹窗容器上·catchtouchmove·一个空方法，若弹窗是可滚动的则只在遮罩上使用
    如果页面是·<srcoll-view>·则可以改成在弹窗出现时将页面·<srcoll-view>·的·scroll-y·设为·false·
!!

### 相关小程序

!!
小程序示例：展示官方 demo
小程序开发助手：展示开发过的小程序、成员预览时间、小程序更新前后大小
小程序数据助手：展示用户的流量数据
小游戏数据助手：展示小游戏的流量数据
公众平台助手：管理公众号的消息留言通知、流量数据
!!

## 框架

### 文件结构

小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。
一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：

!!
app.js!：小程序逻辑，公共js，例如声明全局变量
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

**注意：为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。**

### app.js

每个页面有独立的作用域，并提供模块化能力。
由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力无法使用，如·document·，·window·等。

#### App()

App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。

!!
onLaunch：生命周期函数 - 小程序初始化，全局只触发一次，可接受一个参数对象，属性：
    path {String}：打开小程序的路径
    query {Object}：打开小程序的携带的参数
    scene {Number}：打开小程序的场景值
    shareTicket {String}：shareTicket，详见转发
    referrerInfo {Object}：当场景为由从另一个小程序或公众号或App打开时，返回此字段
        appId {String}：来源小程序或公众号或App的 appId
        extraData {Object}：来源小程序传过来的数据，·scene=1037·或·1038·时支持
onShow：生命周期函数 - 小程序显示，当小程序启动，或从后台进入前台显示，可接受一个参数对象，属性同 onLaunch
onHide：生命周期函数 - 小程序隐藏，当小程序从前台进入后台
onError：错误监听函数，当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
onPageNotFound：页面不存在监听函数，必须是同步处理，异步处理（例如 setTimeout 异步执行）无效
    path {String}：不存在页面的路径
    query {Object}：打开不存在页面的query
    isEntryPage {Boolean}：是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）
其他：开发者可以添加任意的函数或数据到参数中，用 this 可以访问
!!

#### 前台、后台定义

当用户点击右上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；
当再次进入微信或再次打开小程序，又会从后台进入前台
只有当小程序进入后台一定时间（一般是 5 分钟），或者系统资源占用过高，才会被真正的销毁

#### 关闭小程序

当用户从扫一扫、转发等入口（场景值为1007, 1008, 1011, 1025）进入小程序，且没有置顶小程序的情况下退出

#### 生命周期示意图

![600](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)

#### getApp()

全局的 getApp() 函数可以用来获取或修改小程序实例

··js
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

#### 注意

!!
·App()·必须在·app.js·中注册，且不能注册多个
不要在定义于·App()·内的函数中调用·getApp()·，使用·this·就可以拿到·app·实例
不要在·onLaunch·的时候调用·getCurrentPages()，此时·page·还没有生成
通过·getApp()·获取实例之后，不要调用生命周期函数
!!

### Page.js

·Page()·函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。

!!
data：页面的数据
onLoad：生命周期函数- 页面加载，直到关闭当前页面栈再进入当前页面才会再次触发
onReady：生命周期函数- 页面初次渲染完成，直到关闭当前页面栈再进入当前页面才会再次触发
onShow：生命周期函数- 页面显示，每次打开页面都会调用一次
onHide：生命周期函数- 页面隐藏，每次关闭页面都会调用一次
onUnload：生命周期函数- 页面卸载，当当前页面栈被关闭时触发一次
onPullDownRefresh：页面下拉刷新，当处理完数据刷新后·wx.stopPullDownRefresh()·可以停止下拉刷新
    需在·app.json·的·window·选项或当前页面的·json·文件设置·enablePullDownRefresh·为·true·
onReachBottom：页面上拉触底。在触发距离内滑动期间只会被触发一次
    在·app.json·的·window·选项或当前页面的·json·文件设置触发距离·onReachBottomDistance·，默认为·50·
onShareAppMessage：用户点击右上角转发，设置该函数右上角菜单才会显示转发选项
onPageScroll：监听页面滚动，每次页面滚动时触发，返回参数：
    scrollTop {Number}：页面在垂直方向已滚动的距离（单位px）
onTabItemTap：当前是 tab 页时，点击 tab 时触发，可用于回到顶部或刷新等
其他：开发者可以添加任意的函数或数据到参数中，在页面的函数中用·this·可以访问
!!

#### Page.prototype.route

·route·字段可以获取到当前页面的路径

··
Page({
    onLoad: function () {
        console.log(this.route)
    }
})
··

#### Page.prototype.setData()

·setData·函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的·this.data·的值（同步），参数：

!!
data {Object}!：这次要改变的数据
    key：要改变的·data·的键名，以数据路径的形式给出，如·'array[2].message'·、·'a.b.c.d'·，
        可以不在·this.data·中预先定义
    value：要改变的·data·的键值
callback {Function}!：回调函数，在这次·setData·对界面渲染完毕后调用
!!

**注意：**

!!
直接修改·this.data·而不调用·this.setData·是无法改变页面的状态的，还会造成数据不一致。
单次设置的数据不能超过 1024kB，请尽量避免一次设置过多的数据。
请不要把·data·中任何一项的·value·设为·undefined·，否则这一项将不被设置并可能遗留一些潜在问题
!!

··js
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

        // 假如要一次性修改很多数据，建议先修改 data，再 setData，这样只会渲染一次，减少性能消耗
        for (let i = 0; i < 100; i++) this.data.array.push(i)
        this.setData({ array: this.data.array })
    }
})
··

#### 路由

·getCurrentPages()·：获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
不要尝试修改页面栈，会导致路由以及页面状态错误
Tab 切换对应生命周期，以 A、B 页面为 Tabbar 页面，C 是从 A 页面打开的页面，D 页面是从 C 页面打开的页面为例：

%%
| 当前页面 | 路由后页面 | 触发的生命周期（按顺序） |
| :-: | :-: | :-: |
| A | B | A.onHide()，B.onLoad()，B.onShow() |
| A | B（再次打开） | A.onHide()，B.onShow() |
| C | A | C.onUnload()，A.onShow() |
| C | B | C.onUnload()，B.onLoad()，B.onShow() |
| D | B | D.onUnload()，C.onUnload()，B.onLoad()，B.onShow() |
| D（从转发进入） | A | D.onUnload()，A.onLoad()，A.onShow() |
| D（从转发进入） | B | D.onUnload()，B.onLoad()，B.onShow() |
%%

### 模块化

在 JavaScript 文件中声明的变量和函数只在该文件中有效，可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块
模块只有通过·module.exports·或者·exports·才能对外暴露接口
注意·exports·是·module.exports·的一个引用，更推荐用·module.exports·
并且·require()·返回的是·module.exports·而不是·exports·
小程序目前不支持引入·node_modules·，开发者需要使用到·node_modules·时候拷贝出相关的代码到小程序的目录中

··js
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

### 事件

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
longpress：长按 350ms 触发，该事件触发后 tap 事件将不被触发
transitionend：在 WXSS transition 或·wx.createAnimation·动画结束后触发
animationstart：在 WXSS animation 动画开始时触发
animationiteration：在 WXSS animation 一次迭代结束时触发
animationend：在 WXSS animation 动画完成时触发
touchforcechange：在支持 3D Touch 的 iPhone 设备，重按时会触发
其他事件属于特定组件如·submit input scroll·，无特殊声明的都是不冒泡事件
特殊事件：·<canvas/>·中的触摸事件不可冒泡，所以事件对象没有·currentTarget·
!!

写法：·bindtap="eventName"·或·bind:tap="eventName"·
传参：在 wxml 元素上自定义的以·data-·开头的属性，多个单词用-连接，通过事件对象·e.currentTarget.dataset·可拿到

··js
// <view bindtap="onclick" data-name="foo">click me</view>

Page({
    onclick(e) {
        console.log(e.currentTarget.dataset.name)   // foo
    }
})
··

事件对象：

··js
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
        "changedTouches"：[{ // 变化的触摸点信息
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

## wxml

### {{ }}

··html
<view>{{ message }}</view> <!-- 文本内容 -->
<view id="item-{{ id }}"></view> <!-- 组件属性 -->
<view>{{ a + b }} + {{ c }} + d</view> <!-- 算数运算 -->

<!-- 注意花括号和引号之间如果有空格，将最终被解析成为字符串 -->
<view wx:for="{{ [1, 2, 3] }} ">{{ item }}</view>
<!-- 等同于 -->
<view wx:for="{{ [1, 2, 3] + ' ' }}">{{ item }}</view>
··

### wx:for

··html
<!-- 循环数组默认当前下标为 index，当前项为 item -->
<view wx:for="{{ array }}">{{ index + 1 }}、{{ item }}</view>

<!-- wx:for-index 为重命名 index，wx:for-item 为重命名 item -->
<view wx:for="{{ array }}" wx:for-index="i" wx:for-item="name">{{ i + 1 }}、{{ name }}</view>

<!-- 循环对象则 index 为 key，item 为 value -->
<view wx:for="{{ obj }}">{{ index }}：{{ item }}</view>
··

#### wx:key

如果列表中项目的位置会动态改变，并且希望保持状态（如·<input/>·中的输入内容），需使用·wx:key·指定唯一的标识符
当数据改变触发重新渲染时，带有·wx:key·的组件会重新排序而不是重新创建，并能提高列表渲染效率
如不提供·wx:key·控制台会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以忽略
·wx:key·的值以两种形式提供：

!!
String：循环中 item 的某个属性，该属性需要是列表中唯一的字符串或数字，且不能动态改变
*this：循环中 item 本身，需要 item 本身是一个唯一的字符串或者数字
!!

··html
<switch wx:for="{{ objectArray }}" wx:key="unique">{{ item.id }}</switch>
<switch wx:for="{{ numberArray }}" wx:key="*this">{{ item }}</switch>

<script>
Page({
    data: {
        objectArray: [
            { id: 0, unique: 'unique_0' },
            { id: 1, unique: 'unique_1' },
            { id: 2, unique: 'unique_2' }
        ],
        numberArray: [1, 2, 3, 4]
    }
})
&lt;/script>
··

### wx:if / elif / else

··html
<view wx:if="{{condition}}"> True </view>
··

·wx:elif·和·wx:else·：

··
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
··

### hidden

隐藏元素，即使用·display:none·

··html
<view hidden> True </view>
··

### 模板

#### template

在模板页面中定义代码片段，然后在不同的地方调用，只在当前页面使用。
使用·name·属性，作为模板的名字。然后在·<template/>·内定义代码片段，如：

··html
<template name="msgItem">
    <view class="demo">
        <text> {{ index }}: {{ msg }} </text>
        <text> Time: {{ time }} </text>
    </view>
</template>
··

使用·is·属性指定 template 的·name·，然后传入所需要的·data·，如：

··html
<!-- 引入 -->
<import src="../../components/dome/dome.wxml"/>
<template is="msgItem" data="{{ ...item }}"/>

<script>
Page({
    data: {
        item: {
            index: 0,
            msg: 'this is a template',
            time: '2016-09-15'
        }
    }
})
&lt;/script>
··

·import·有作用域范围，不会嵌套引入，如：C import B，B import A，C 不会有 A 的内容

#### include

可以将目标文件除了·<template/>·和·<wxs/>·代码外的整个代码引入，相当于是拷贝到·include·位置，如：

··html
<!-- header.wxml -->
<view> header </view>

<!-- footer.wxml -->
<view> footer </view>

<!-- index.wxml -->
<include src="header.wxml"/>
<view> body </view>
<include src="footer.wxml"/>
··

### wxss

app.wxss 为全局样式，page 的 wxss 文件为局部样式，与 CSS 相比多了尺寸单位·rpx·
·rpx·根据·750rpx·屏幕宽度进行自适应，例如：
iPhone6 的屏幕宽度为·375px·，共有 750 个物理像素，·1rpx = 0.5px = 1物理像素，1px = 2rpx·
在 iPhone5 下·1rpx = 0.42px，1px = 2.34rpx·
在 iPhone6 Plus 下·1rpx = 0.552px，1px = 1.81rpx·
开发时可以以 iPhone6 作为参考标准

### wxs

!!
WXS 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行
WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致
WXS 的运行环境和其他 js 代码是隔离的，不能调用其他 js 文件中定义的函数，也不能调用小程序的 API
WXS 函数不能作为组件的事件回调
!!

WXS 代码编写在 wxml 文件中的·<wxs>·标签内，或以·.wxs·为后缀名的文件然后引入·<wxs src="xxx.wxs" module="x" />·
每一个·.wxs·文件和·<wxs>·标签都是一个单独的模块。通过·module.exports·可以导出
在 .wxs 模块中可以使用·require()·引用其他 wxs 文件模块。需注意：

!!
只能引用·.wxs·文件模块，且必须使用相对路径
wxs 模块均为单例，在第一次被引用时会初始化，其他地方多次引用的都是同一个 wxs 模块对象
如果一个 wxs 模块在定义之后，一直没有被引用，则该模块不会被解析与运行
·<wxs>·模块只能在定义模块的 WXML 文件中被访问到。使用·<include>·或·<import>·时，·<wxs>·模块不会被引入
·<template>·标签中，只能使用定义该·<template>·的 WXML 文件中定义的·<wxs>·模块
!!

### 自定义组件

和页面一样由·json wxml wxss js·4个文件组成。要在·json·文件中声明：

··js
{
    "component": true
}
··

区别在于 js 不是·Page()·而是·Component()·，[参考官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
使用自定义组件前先要在页面的 json 文件中进行引用声明，key 为指定自定义组件的名称，value 为自定义组件的路径：

··js
{
    "usingComponents": {
        "component-tag-name": "/components/demo/demo"
    }
}
··

注意：

!!
因为 WXML 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符
自定义组件和使用自定义组件的页面所在项目根目录名不能以·wx-·为前缀，否则会报错
!!

#### tips

假设·form·是传递给组件的数据，若在计时过程中使用·this.setData({ 'form.code.text': time + '秒' })·会触发视图渲染刷新，导致·picker·这类弹出式组件在渲染时被收起或报错
解决：把计时的变量抽离出来，例如改成使用组件属性传值或改成 slot 插槽，这样就不影响 form 本身

## 组件

每个页面默认有个·<page></page>·父容器，可以不用添加最大父容器

### 目录

!!
视图容器
    view：视图容器，可以当成·div·标签
    scroll-view：可滚动视图容器
    swiper，swiper-item：轮播图和子项（子项宽高自动设置为 100%）
    cover-image，cover-view：覆盖在原生组件上的图片和文本
    movable-area，movable-view：可拖拽区域和拖拽子项
    match-media：指定页面尺寸才显示的容器
    block：常用于·wx:for wx:if·作为包含多个节点的容器，自身不在页面中渲染
基础内容
    icon：图标，目前有![auto,24](${img1})，注意·wxss·无法改变·color、size、line-height·
    text：文本容器，内联元素
    rich-text：富文本容器
    progress：进度条
表单
    input，textarea：输入框，文本域
    radio，radio-group：单选框，单选框组
    checkbox，checkbox-group：多选框，多选框组
    picker，picker-view，picker-view-column：选择器，行内选择器，选择器子项
    button：按钮
    slider：滑杆
    switch：开关
    form：表单容器
    label：点击触发对应的控件
    editor：富文本编辑器
导航
    functional-page-navigator：仅在插件中有效，用于跳转到插件功能页
    navigator：页面链接，相当于·<a>·
媒体
    image：图片，默认宽 300px、高 225px（4 : 3）
    audio，video，camera：音频，视频，相机
    live-player，live-pusher：实时音视频播放和录制
    voip-room：多人音视频对话
地图
    map：地图
画布
    canvas：画布
开放能力
    open-data：展示微信开放的数据，如用户信息和群名称
    web-view：承载网页的容器，会自动铺满整个小程序页面。个人类型与海外类型的小程序暂不支持使用
    ad：广告
    official-account：公众号关注组件
原生组件：
    组件：·camera canvas input(focus 时) live-player live-pusher map textarea video·
    说明：层级最高且部分 CSS 样式不支持等
无障碍访问：
    为了更好地满足视障人士对于小程序的访问需求，支持部分 ARIA 标签
导航栏
    navigation-bar：页面导航条配置节点
页面属性配置节点
    page-meta：用于指定页面的一些属性、监听页面事件
!!

### text

!!
selectable {Boolean} [false]：文本是否可选中
space {String} [false]：是否显示连续空格
    ensp：中文字符空格一半大小
    emsp：中文字符空格大小
    nbsp：根据字体设置的空格大小
decode {Boolean} [false]：是否解码
    可解析：·&amp;nbsp;· ·&amp;lt;· ·&amp;gt;· ·&amp;amp;· ·&amp;apos;· ·&amp;ensp;· ·&amp;emsp;·
!!

注意：各个操作系统的空格标准并不一致，<text/> 组件内只支持 <text/> 嵌套，除了文本节点以外的其他节点都无法长按选中

### image

!!
src {String}：图片资源地址
mode {String} [scaleToFill]：图片裁剪缩放模式
    scaleToFill：宽高 100%
    aspectFit：同·contain·
    aspectFill：同·cover·
    top | right | bottom | left | center：原图对应的位置，可单独使用或两两搭配
lazy-load {Boolean} [false]：懒加载，只在·page·和·scroll-view·中有效
bindload {HandleEvent}：加载完毕时触发，·event.detail = { height, width }·
binderror {HandleEvent}：加载错误时触发，·event.detail = { errMsg }·
!!

## API

### 基础

!!
wx.canIUse：判断小程序的 API、回调、参数、组件等是否在当前版本可用
wx.base64ToArrayBuffer，wx.arrayBufferToBase64：·Base64·和·ArrayBuffer·互转
wx.getSystemInfo/Sync：异/同步获取系统信息
wx.getUpdateManager：获取更新管理器
wx.updateWeChatApp：跳转到更新微信页面
!!

### 路由

!!
wx.navigateTo：保留当前页面，跳转到应用内非 tabBar 的页面
wx.redirectTo：关闭当前页面，跳转到应用内非 tabBar 的页面，所以不能退回
wx.reLaunch：关闭所有页面，打开到任意页面，如果是 tabBar 则不能带参数
wx.switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面（不会刷新 tabBar 页面），不能带参数
wx.navigateBack：关闭当前页面，返回上一页面或多级页面（不会刷新返回的页面）
!!

··js
wx.navigateTo({
    url {String} // 路径，可带查询字符串
    success {Function} // 成功的回调函数
    fail {Function} // 失败的回调函数
    complete {Function} // 完成的回调函数
})

wx.navigateBack({
    delta {Number} [1] // 返回的页面数，可通过 getCurrentPages() 获取当前的页面栈情况
})
··

### 界面

!!
交互：Toast 提示，Loading 加载，Modal 模态框，ActionSheet 操作菜单，Alert 页面返回确认框
导航栏：导航条加载动画，设置页面标题，设置导航条的颜色，隐藏返回首页按钮
背景：设置下拉背景字体、loading 图的样式，设置窗口的背景色
Tab Bar：显示隐藏，整体样式，某一项的内容，右上角红点，右上角文本
字体：·wx.loadFontFace·加载网络字体
下拉刷新：·wx.startPullDownRefresh·，·wx.stopPullDownRefresh·
滚动：·wx.pageScrollTo·
动画：Animation 可创建动画实例，然后调用相关方法进行动画，其实简单的动画用 wxss 即可
置顶：·wx.setTopBarText· 设置置顶栏文字内容，小程序被置顶时生效
自定义组件：·wx.nextTick· 延迟一部分操作到下一个时间片再执行（类似于 setTimeout）
菜单：·wx.getMenuButtonBoundingClientRect· 获取菜单按钮（右上角胶囊按钮）的布局位置信息
窗口：监听或取消窗口尺寸变化，PC 端可设置窗口大小
键盘：监听或取消键盘高度变化，主动收起键盘，获取输入框的光标位置（focus 时）
!!

··js
wx.showToast({
    title {String} // 提示的内容
    icon {String} // 图标，可选success、loading、none
    image {String} // 自定义图标的本地路径，会覆盖icon
    duration {Number} [1500] // 持续时间，单位ms
    mask {Boolean} [false] // 是否显示透明蒙层，防止触摸穿透
    success {Function} // 成功的回调函数
    fail {Function} // 失败的回调函数
    complete {Function} // 完成的回调函数
})
wx.hideToast() // 主动隐藏消息提示框

wx.showLoading({
    title {String} // 提示的内容
    mask {Boolean} [false] // 是否显示透明蒙层，防止触摸穿透
    success {Function} // 成功的回调函数
    fail {Function} // 失败的回调函数
    complete {Function} // 完成的回调函数
})
wx.hideLoading() // 隐藏loading提示框
··

### 网络

!!
wx.request：发起网络请求
wx.downloadFile：下载文件
wx.uploadFile：上传文件
WebSocket：创建 WebSocket 连接
mDNS：发起局域网网络请求
UDP 通信：创建局域网内的 WebSocket 连接
!!

#### 说明
需在小程序后台配置域名白名单，只支持·https·和·wss·协议。且不能使用·IP·或·localhost·或端口号
在微信开发者工具中可开启不校验请求域名跳过服务器域名的校验，当然在线上环境还是会开启校验
出于安全考虑·api.weixin.qq.com·不能被配置为服务器域名，只能在后台调用

··js
wx.request({
    url {String} // 接口地址
    data {Object/String/ArrayBuffer} // 请求的参数
    header {Object} [{'content-type':'application/json'}] // 请求头，不能设置 Referer
    method {String} [GET] // 请求方式（大写），OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    dataType {String} [json] // 设置返回的数据格式，设为 json 会尝试对返回的数据做一次 JSON.parse
    responseType {String} [text] // 设置响应的数据类型，可选 text、arraybuffer
    success {Function(res)} // 成功的回调函数
        res: {
            data {Object/String/ArrayBuffer} // 返回的数据
            statusCode {Number} // 返回的 HTTP 状态码
            header {Object} // 返回的 HTTP Response Header
        }
    fail {Function} // 失败的回调函数
    complete {Function} // 完成的回调函数
})
// 返回一个 requestTask 对象，可调用 abort() 中断请求
··

### 数据缓存

!!
wx.setStorage/Sync：异/同步本地缓存，单个 key 大小限制 1MB，总共大小限制为 10MB
wx.getStorage/Sync：异/同步获取本地缓存
wx.removeStorage/Sync：异/同步删除本地缓存
wx.getStorageInfo/Sync：异/同步获取全部的本地缓存
wx.clearStorage/Sync：异/同步清空全部的本地缓存
周期性更新：设置自定义登录态
!!

### 媒体

!!
地图：创建地图实例，调用相关方法可操作地图
图片：保存、预览图片和视频、获取信息、压缩、从客户端会话选择文件、选择图片或拍照
视频：保存、视频编辑器、获取信息、压缩、选择视频或图片或拍摄，创建视频实例调用相关方法可操作
音频：播放、多音频、创建音频实例调用相关方法可操作
背景音频：播放、监听播放事件、获取背景音频管理器调用相关方法可操作
实时音视频：创建实时音视频实例调用相关方法可操作
录音：开始或结束录音（最多 1 分钟）、获取录音管理器调用相关方法可操作
相机：创建相机实例调用相关方法可操作
富文本：创建富文本编辑器实例调用相关方法可操作
音视频合成：创建音视频处理容器将所有轨道合成一个视频
实时语音：创建/退出实时语音通话、静音、监听成员说话/在线/视频变化、监听被动断开
画面录制器：创建 WebGL 画面录制器
视频解码器：创建视频解码器
!!

### 其他

!!
位置：获取当前位置或打开地图
转发：获取转发信息或显示隐藏转发按钮
画布：创建画布对象进行操作
文件：保存、删除、获取本地缓存文件，或在新开页面打开文档（支持 office 和 pdf）
开放接口：
    登录：·wx.login·获取临时登录凭证，·wx.checkSession·校验 session_key 是否有效，用户越使用小程序越有效
    用户信息：·wx.getUserInfo·获取用户信息，不建议使用，改为使用·<button>·获取
    支付：·wx.requestPayment·发起微信支付
    授权：·wx.authorize·提前向用户发起授权请求，不会实际调用对应接口，若已授权则直接调用成功
    设置：·wx.openSetting·调起权限设置界面，·wx.getSetting·获取某项功能有没有被授权
    其他：小程序跳转，账号信息，数据上报，数据分析，收货地址，卡券，发票，生物认证，微信运动，性能，微信红包
设备：
    常用：NFC，WiFi，蓝牙，联系人，剪贴板，屏幕，电话，扫码，
    其他：外围设备，iBeacon，低功耗蓝牙，电量，网络，加速计，罗盘，设备方向，陀螺仪，性能，振动
Worker：创建 Worker 线程
第三方平台：获取第三方平台自定义的数据字段
WXML：
    wx.createSelectorQuery：返回一个 SelectorQuery 对象实例以获取节点信息
    wx.createIntersectionObserver：用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见
广告：创建激励视频或插屏广告组件
!!

### 转发说明

在 Page 中定义·onShareAppMessage()·，右上角菜单才会显示转发按钮，返回一个对象用于自定义转发内容

··js
onShareAppMessage (res) {
    res：{
        from {String} // 转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
        target {Object} // 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
    }
    return {
        title // 转发的标题，默认为当前小程序名称
        path // 转发的路径，默认为当前页面路径 ，必须是以 / 开头的完整路径
        imageUrl // 图片路径，支持PNG及JPG，默认为当前页面的截图，长宽比是 5:4
    }
}
··

通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识
调用·wx.showShareMenu·并且设置·withShareTicket·为·true·
当转发到群聊后并被其他用户打开时，可以在·App.onLaunch()·或·App.onShow()·获取到·shareTicket·
然后调用·wx.getShareInfo()·接口传入此·shareTicket·可以获取到转发信息
注意单聊没有·shareTickets·，·shareTicket·仅在当前小程序生命周期内有效

### WXML 节点信息说明

·wx.createSelectorQuery()·：返回一个·SelectorQuery·对象实例，调用相关方法以获取相关节点：

!!
in(component)：选择自定义组件 component 内的节点
select(selector)：在当前页面下选择第一个匹配的节点，返回 NodesRef 对象实例，用于获取节点信息，支持：
    ·#id、.class、#id, .class、.parent > .child、.parent .children·
    ·.parent >>> .children·（选择组件内的元素）
selectAll(selector)：在当前页面下选择所有匹配的节点，返回一个数组形式的 NodesRef 对象实例
selectViewport()：选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息，返回 NodesRef 对象实例
exec([call])：执行所有的请求，请求结果按请求次序构成数组，在 call 的第一个参数中返回
!!

返回的 NodesRef 对象实例可调用的方法：

!!
boundingClientRect([call])：返回节点信息·id dataset left right top bottom width height·，单位 px
scrollOffset([call])：返回·scroll-view viewport·滚动位置·id dataset scrollTop scrollLeft·，单位 px
context：添加 Context 对象查询请求，支持 VideoContext、CanvasContext、LivePlayerContext 和 MapContext 
fields(fields, [call])：自定义获取节点的相关信息，返回值是 nodesRef 对应的 selectorQuery：
    id {Boolean} [false]：是否返回节点 id
    dataset {Boolean} [false]：是否返回节点 dataset
    rect {Boolean} [false]：是否返回节点布局位置·left right top bottom·
    size {Boolean} [false]：是否返回节点尺寸·width height·
    scrollOffset {Boolean} [false]：是否返回节点的·scrollLeft scrollTop·（·scroll-view viewport·）
    properties {StringArray} [[]]：指定属性名列表（id、class、style 和事件绑定的属性值不可获取）
!!

··js
const Query = wx.createSelectorQuery()

// 获取某个节点的相关信息
Query.select('.demo').boundingClientRect(res => {
    console.log(res)
}).exec()

// 获取多个节点的相关信息
Query.selectAll('.demo').boundingClientRect().exec(res => {
    res.forEach(item => {
        console.log(item)
    })
})

// 获取 fields
Query.select('#demo').fields({
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

### 微信支付说明

首先开通[微信支付平台](https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F)，然后关联小程序
在微信支付服务后台生成预支付交易单，参考[微信支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
URL 地址：·https://api.mch.weixin.qq.com/pay/unifiedorder·，参考[小程序支付统一下单接口](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1&index=1)
返回的结果都是小程序支付 API 的参数，所以请求成功后就可以调起支付·wx.requestPayment()·

## 登录

### wx.login


调用·wx.login()·可获取临时登录凭证
然后在服务器后台调用指定接口传入临时登录凭证可换取用户的 openid、session_key、unionid

### 后台调用的接口

··html
https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
··

!!
appid!：小程序唯一标识，在小程序后台或微信开发者工具可查看
secret!：小程序的 app secret，在小程序后台查看
js_code!：·wx.login()·得到的 code
grant_type!：填写为·authorization_code·
!!

### 返回的结果

!!
openid：用户唯一标识，每个用户的微信号对每个公众号有一个唯一的 OpenID
session_key：会话密钥，生成对比 signature 以校验数据的完整性和解密 encryptedData
unionid：用户在开放平台的唯一标识符（满足UnionID下发条件才会出现）
!!

### session_key

用于在服务器解密·wx.getUserInfo()·返回的敏感数据，为了数据安全不建议把·session_key·下发到小程序

### unionid

如果开发者拥有多个移动应用（例如在 APP 内使用了微信分享、微信支付）、网站应用（例如微信快捷登录）、和公众帐号
微信针对用户在不同的应用下有唯一的·openId·，但·unionid·却是一样的
所以·unionid·可以帮助识别不同公众账号下的用户是否是同一个人
这样可以实现多个小程序、公众号、APP 之间数据互通。还可以去除重复关注的用户数统计真实的关注用户总数
注意·unionid·不建议作为用户 ID，应该用 ·openid·。因为如果公众号的账号迁移了就无法识别出来原来的用户了
而迁移小程序只要·appid·不变·openid·就不变

#### 获得途径

调用接口·wx.getUserInfo()·，从解密数据中获取 UnionID。注意本接口需要用户授权，需妥善处理拒绝授权后的情况
如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。可以通过·wx.login()·获取
如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过也可以通过·wx.login()·获取

### 设计规范

当开发者在小程序首页就调用·wx.getUserInfo()·或·wx.authorize()·时，会造成一进入小程序就出现授权弹窗
这就导致了部分用户在不了解这个小程序前会点击拒绝，如果没有对拒绝的情况做处理又会因为不良体验而流失用户
好的产品首页应该传递给用户产品理念，在需要展示用户信息的地方才去提示授权
如果一定要用户登录或进行到需要登录时，可以将获取用户信息的·button·组件放置到页面中，并说明：
为什么需要授权？ 需要用户的什么信息？ 授权有什么好处？
接下来在页面上放置一个明显的登录按钮，建议不要有其他的点击区域，让用户专注登录
用户可能会更改昵称和头像，建议定期更新信息

## 工具

### 介绍

开发小程序需使用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
新建项目时需要在小程序后台注册后的 AppID，没有的话也可选择体验模式
体验模式无法进行代码真机预览和上传等操作，部分 API 无法正常调用
注意登录的微信号需要是该 AppID 的小程序后台绑定过的开发者
各机型部分兼容性可能不一致，建议开发者需要在真机上检查真实表现

### 快捷键

!!
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
!!

### 项目配置文件

可以在项目根目录使用·project.config.json·文件对项目进行配置

!!
miniprogramRoot {Path String}：指定小程序源码的目录(需为相对路径)
qcloudRoot {Path String}：指定腾讯云项目的目录(需为相对路径)
pluginRoot {Path String}：指定插件项目的目录(需为相对路径)
compileType {String}：编译类型，可选 miniprogram（小程序）、plugin（小程序插件）
setting {Object}：项目设置
    es6 {Boolean}：是否启用 es5 转 es6
    postcss {Boolean}：上传代码时样式是否自动补全
    minified {Boolean}：上传代码时是否自动压缩
    urlCheck {Boolean}：是否检查安全域名和 TLS 版本
libVersion {String}：基础库版本
appid {String}：项目的 appid，只在新建项目时读取
projectname {String}：项目名字，只在新建项目时读取
packOptions {Object}：打包配置选项，打包是预览 、上传时对项目进行的必须步骤
    ignore  {Object Array}：忽略指定规则的文件或文件夹
        type {String}：类型，可选folder（文件夹）、file（文件）、suffix（后缀）、prefix（前缀）
        value {String}：路径或取值，不支持通配符、正则表达式。若是路径则以小程序目录为根目录
scripts {Object}：自定义预处理
    beforeCompile：编译前预处理命令
    beforePreview：预览前预处理命令
    beforeUpload：上传前预处理命令
!!

## 云开发

无需搭建服务器即可使用云端能力。和开发者已经使用的云服务相互兼容，并不互斥

%%
| 能力 | 作用 | 说明 |
| :-: | :-: | :- |
| 云函数 | 无需自建服务器 | 在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码 |
| 数据库 | 无需自建数据库 | 一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库 |
| 存储 | 无需自建存储和 CDN | 在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理 |
| 云调用 | 原生微信服务集成 | 基于云函数免鉴权使用小程序开放接口的能力，包括服务端调用、获取开放数据等能力 |
%%

@@@
[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework)
[小程序社区：疑难解答、教程、demo、资源](http://www.wxapp-union.com)
[小程序club：同上](http://www.wxappclub.com)
[知乎：如何入门微信小程序开发，有哪些学习资料？](https://www.zhihu.com/question/50907897)
[知乎：「微信小程序」剖析（二）：框架原理  在浏览器上运行的猜想](https://zhuanlan.zhihu.com/p/22607204)
[公众号：一起脱去小程序的外套和内衣 - 微信小程序架构解析](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247485680&amp;idx=1&amp;sn=119e4d94a4d5e995700c0e9358a61dbb&source=41#wechat_redirect)
@@@

&2020/07/19
            `
        }
    }
}
</script>
