<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# weex

本文档记录版本·v0.28.0·

## 概述

### 介绍

使用 Weex 可以构建一个真正的原生应用，一套简单易用的跨平台开发方案
在开发阶段，一个 Weex 页面就像开发普通网页一样；在运行时，Weex 页面又充分利用了各种操作系统的原生组件和能力
Weex 的渲染引擎与语法层是分开的，也不依赖任何特定的前端框架，目前主要支持 Vue.js 和 Rax 这两个前端框架
在开发 Weex 页面就像开发普通网页一样；在渲染 Weex 页面时和渲染原生页面一样

### 动态性

有时 APP 只改了 1、2 行代码就更新一个版本的代价比较高，嵌入 webview 加载 h5 页面可解决部分问题
而 Weex 可以成为 APP 的原生页面，也只需要更新 js 文件即可，可使用 Weex 作为 APP 中需要经常更新的页面
虽然整个 App 可以使用 Weex 开发，但还不适用复杂的场景

### 平台差异

!!
没有 DOM：没有·document Element Event File·等对象
没有 BOM：没有·window·对象，不支持使用全局变量，如果是想要获取设备或环境信息可使用·WXEnvironment·变量
调用原生 API：通过注册、调用模块来实现。其中一些是 Weex 内置的，如·clipboard navigator storage·等
!!

## 开发

使用 [Online Editor](http://dotwe.org/vue?spm=a2c7j.-zh-guide-develop-setup-develop-environment.0.0.1704c8ee7eIejd) 可在线编辑尝鲜

#### 安装依赖

首先需要 node.js 环境，然后安装 [Weex CLI](https://github.com/apache/weex-cli?spm=a2c7j.-zh-guide-develop-setup-develop-environment.0.0.1704c8ee7eIejd)：

··bash
npm i -g weex-toolkit 
··

安装后可使用·weex·指令

··js
weex -v // 版本
weex help // 所有指令
weex doctor // 检查本地开发环境
··

目前·weex-cli·只支持创建 Vue.js 的项目。创建 Rax 的项目可以使用·rax-cli·，参考 [Rax 官方网站](https://alibaba.github.io/rax/?spm=a2c7j.-zh-guide-develop-create-a-new-app.0.0.167c2a18pQcXuW)

### 初始化项目

··bash
weex create <project>
··

然后进入项目，安装依赖（在初始化时可选择自动安装）后启动项目

··bash
npm start
··

打开控制台提示的本地环境网页，使用 Playground APP 即可扫码进行真机体验
[PlaygroundWeex](https://weex.apache.org/zh/guide/playground.html) 是 Weex 示例 App，可扫码预览 Weex 代码构建后的页面

### 编译页面

··bash
weex compile [资源文件] [目标目录] <options>
··

例如编辑 src 目录中的文件打包到 dist 目录：

··bash
weex compile src dist
··

例如编辑 src 目录中的 index.vue 文件打包到 dist 目录：

··bash
weex compile src/index.vue build
··

options 选项：

%%
| 选项 | 默认值 | 描述 |
| :-: | :-: | :-: |
| ·-w, --watch· | ·true· | 监听文件改动并实时编译 |
| ·-d, --devtool [devtool]· | - | 设置 webpack 编译的 devtool 选项 |
| ·-e, --ext [ext]· | ·.vue· | 设置默认编译文件 |
| ·-m, --min· | ·false· | 对产物进行代码混淆及压缩 |
| ·-c, --config· | ·false· | 传入 webpack 配置文件 |
| ·-b, --base· | ·process.cwd()· | 设置基础路径 |
%%

### 预览页面

直接对单个 .vue 文件进行零配置的沙箱预览

··bash
weex preview [file | folder] <options>
··

例如预览指定页面：

··bash
weex preview src/foo.vue
··

还可通过·--entry·预览指定页面：

··bash
weex src --entry src/foo.vue
··

options 选项：

%%
| 选项 | 默认值 | 描述 |
| :-: | :-: | :-: |
| ·-d, --devtool [devtool]· | - | 设置 webpack 编译的 devtool 选项 |
| ·-m, --min· | ·false· | 对产物进行代码混淆及压缩 |
| ·-c, --config· | ·false· | 传入 webpack 配置文件 |
| ·-b, --base· | ·process.cwd()· | 设置基础路径 |
%%

### 添加真机工程

添加 Weex 官方 iOS/Android 工程功能

··bash
weex platform [add|remove] [ios|android]
··

例如：

··bash
weex platform add ios
weex platform remove ios
··

可以使用·weex platform list·查看项目中支持的平台

### 运行真机工程

··js
weex run ios // 运行 iOS 模拟器预览
weex run android // 运行 Android 模拟器/真机预览
weex run web // 运行 Web 端预览
··

### 其他

··js
weex debug [we_file|bundles_dir] [options] // 调试
weex lint [file | folder] <options> // 代码质量检查
··

[集成到 Android 应用](https://weex.apache.org/zh/guide/develop/integrate-to-android-app.html)
[集成到 iOS 应用](https://weex.apache.org/zh/guide/develop/integrate-to-android-app.html)
[Weex 常见错误码](https://weex.apache.org/zh/guide/develop/weex_error_code.html)

## API

每个 Weex 页面的 JS 上下文中都有一个相互独立的·weex·变量
它可以像全局变量一样使用，不过它在不同页面中是隔离而且只读的

### 属性

!!
config：当前 Weex 页面的所有环境信息
    bundleUrl：当前页面 js bundle 的 URL 地址
    bundleType：当前页面是用那种框架开发的，可以是·"Vue"·或者·"Rax"·
    env：环境变量，等同于全局变量·WXEnvironment·
document：当前页面的文档模型对象，主要是内部使用，直接操作 DOM 并不是最佳实践，不建议在开发页面时使用
!!

#### WXEnvironment

!!
appGroup：·WXApp·，当前APP应用类型
appName：·WXSample·，当前APP应用名字
appVersion：·0.5.2.5·，当前APP应用版本
deviceWidth：·1080·，设备宽度
deviceHeight：·1920·，设备高度
deviceModel：·vivoX6D·，设备型号
platform：·Android·，当前运行平台
osName：·Android·，操作系统名称
osVersion：·5.1·，系统版本
weexVersion：·0.9.4·，weex sdk版本
scale：·3.0·，页面缩放比例
!!

### 方法

!!
requireModule：引用自定义的或者内置的模块，参数为大小写敏感的模块名
    如果模块已经注册则返回一个对象，否则返回·undefined·
supports：检测某个功能在当前环境中是否可用，
    正常情况下返回 Boolean 值，参数格式错误或无法确定是否支持则返回 null
    参数为特定格式的字符串·@{type}/{name}·
        type：·component·或·module·
        name：模块名，例如·weex.supports('@component/slider')·
isRegisteredModule：检测某个特定的模块或者接口是否可用，可传入第二个参数为子属性或方法
isRegisteredComponent：检测某个特定的组件是否可用
!!

## 组件

### 组件

!!
text：文本容器
a：链接，注意不能在里面直接添加文本，需用·<text>·
div：容器，不能直接添加文本，需用·<text>·，超出会隐藏
scroller：可滚动的容器
image：图片，必须要有宽高，不支持子组件
input：输入框，不支持子组件
textarea：文本域
list：列表滚动容器，适合长列表的展示
    cell：·<list>·的子组件
recycle-list：·<list>·的升级版，具有回收和复用的能力，可以大幅优化内存占用和渲染性能
    cell-slot：子节点
refresh：下拉刷新，只能在·scroller list waterfall·中使用
    loading-indicator：转圈动画的子组件，注意 Android 和 iOS 的样式有差异
loading：上拉加载，只能在·scroller list waterfall·中使用
    loading-indicator：转圈动画的子组件，注意 Android 和 iOS 的样式有差异
slider：轮播图
    indicator：轮播图的指示器小点组件
video：视频
waterfall：瀑布流布局的组件容器
web：网页容器
richtext：富文本
!!

### refresh

下拉刷新，只能在·scroller list waterfall·中使用

#### 属性

!!
display {String} [show]：控制组件的显示隐藏，可选·show hide·
!!

#### 事件

!!
refresh：下拉完时触发，即手松开的时候
pullingdown：被下拉时触发，即手移动的时候，事件参数对象属性如下
    dy：前后两次回调滑动距离的差值
    pullingDistance：下拉的距离
    viewHeight：组件高度
    type：“pullingdown” 字符串
!!

··html
<list>
    <refresh
        class="refresh"
        :display="refreshing ? 'show' : 'hide'"
        @refresh="onrefresh"
        @pullingdown="onpullingdown"
    >
        <loading-indicator
            class="refresh-indicator"
            :style="{ color: pullingBorder ? 'rgba(0, 140, 214, 1)' : 'rgba(0, 140, 214, 0.5)' }"
        ></loading-indicator>
        <div class="refresh-content" v-if="platform === 'ios' && !refreshing">
            <text class="refresh-arrow">{{ pullingBorder ? '&uarr;' : '&darr;' }}</text>
            <text class="refresh-text">{{ pullingBorder ? '释放刷新' : '下拉刷新' }}</text>
        </div>
    </refresh>

    <cell></cell>
    ...
</list>
··

··js
data: {
    refreshing: false,  // 是否显示下拉刷新
    pullingBorder: false,   // 下拉刷新是否到了松手可刷新的边界值
    pullingDistance: 170    // 下拉刷新的最低刷新下拉距离
},
methods: {
    onrefresh() {
        this.refreshing = true  // 手松开显示加载中
        this.init() // 加载数据
    },
    onpullingdown(e) {
        this.pullingBorder = Math.abs(e.pullingDistance) > this.pullingDistance
    },
    init() {
        stream.fetch({
            url,
            method: 'GET',
            type:'json'
        }, res => {
            this.refreshing = false
        })
}
··

··css
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

## 模块

使用模块需要先引入，比如·const animation = weex.requireModule('animation')·

### 模块

!!
animation：动画
    transition：过渡动画
clipboard：系统剪贴板
    getString：获取系统剪贴板的内容
    setString：设置系统剪贴板的内容
dom：节点
    scrollToElement：让页面滚动到指定·ref·对应的组件
    getComponentRect：获取某个元素 View 的外框
    getLayoutDirection：获取当前的布局方向，是 Left to Right，还是 Right to Left
    addRule：加载自定义字体
globalEvent：监听持久性事件，例如定位信息，陀螺仪等的变化
    addEventListener：注册全局监听事件
    removeEventListener：移除全局监听事件
meta：声明单个页面的元信息，一般无需修改
    setViewport：改变页面的显示宽度（默认 750px），注意需要在入口文件的·new Vue·之前使用
modal：消息提示框，支持·toast·、·alert·、·confirm·、·prompt·
navigator：页面跳转，在切换的时候还可以应用动画效果，支持·push·跳转·pop·返回
picker：选择器，支持·pick·自定义数据单选、·pickDate·日期选择、·pickTime·时间选择
storage：本地数据存储
    setItem：存储数据
    removeItem：删除数据
    getItem：获取数据
    getAllKeys：获取全部存储项键名的数组
    length：存储数量
stream：网络请求
    fetch：发起请求
webview：操作·<web>·网页
    goBack：返回
    goForward：前进
    reload：刷新
webSocket：创建持久性的连接
deviceInfo：获取设备的基本信息并进行设置
    enableFullScreenHeight：开启全屏效果以适配全面屏手机
console-log：有时候线上应用会屏蔽控制台日志，Console-log 可强制将 Weex 日志输出到控制台
!!

### animation

过渡动画：·animation.transition(el, options, callback)·

!!
el：将要执行动画的元素，通过设置·ref·属性调用
options：参数
    styles：动画样式
        width：目标宽度
        height：目标高度
        backgroundColor：目标颜色
        opacity {Number/0-1} [1]：目标透明度
        transformOriginn {String/x,y} [center center]：动画中心点
        transform：变形，多个动画用空格隔开
            translate/translateX/translateY {px/%}：目标位置
            rotate/rotateX/rotateY {Number}：旋转角度
            scale/scaleX/scaleY {Number}：缩放
            perspective {Number} [+∞]：观察者距离z=0平面的距离
    duration {Number} [0]：持续时间，单位毫秒
    delay {Number} [0]：延迟时间，单位毫秒
    needLayout {Boolean} [false]：执行时是否产生布局动画
    timingFunction [linear]：运动曲线
        linear：匀速
        ease：逐渐变慢
        ease-in：由慢到快
        ease-out：由快到慢
        ease-in-out：由慢到快，到中间点再由快到慢
        cubic-bezier(x1, y1, x2, y2)：自定义[贝塞尔](http://cubic-bezier.com)
callback：动画执行完毕之后的回调函数
!!

··js
const animation = weex.requireModule('animation')

animation.transition(this.$refs.demo, {
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

### dom

#### scrollToElement(ref, options)

滚动到相应节点，这个 API 只能用于可滚动组件的子节点，例如·<scroller> <list>·等可滚动组件中。

!!
ref {Node}：要滚动的节点
options {Object}:
    offset {Number} [0]：一个到其可见位置的偏移距离
    animated {Boolean} [true]：是否需要附带滚动动画
!!

··js
const dom = weex.requireModule('dom')

dom.scrollToElement(this.$refs.item10[0], { offset: 10 })
··

#### getComponentRect(ref, callback)

通过标签的 ref 获得其布局信息，返回的信息在 callBack 中：

··js
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

如果想要获取视口信息，可以指定·ref·为字符串·'viewport'·，即·getComponentRect('viewport', callback)·

### modal

··js
const modal = weex.requireModule('modal')

// 提示消息
modal.toast({
    message, // {String} 消息
    duration // {Number} [3] 持续的时间，单位 s，Android 大于 3 秒会使用系统变量 LONG，否则是 SHORT
})

// 提示框
modal.alert({
    message, // {String} 消息
    okTitle, // {String} [OK] 确定按钮的文字
}, callback)

// 确认框
modal.confirm({
    message, // {String} 消息
    okTitle, // {String} [OK] 确定按钮的文字
    cancelTitle // {String} [Cancel] 取消按钮的文字
}, callback(res)) // res 为确定按钮上的文字

// 提示输入框
modal.prompt({
    message, // {String} 要提示的消息
    okTitle, // {String} [OK] 确定按钮的文字
    cancelTitle // {String} [Cancel] 取消按钮的文字
}, callback(res) // res 为一个对象，参数如下
    result // {String} 按下的按钮上的文字
    data // {String} 用户输入的信息
)
··

### picker

#### pick(options, [callback])：单选

!!
options：样式参数
    items {Array}：数据源
    index {Number}：默认选中的选项
    textColor {Color}：选项文字的颜色
    selectionColor {Color}：选中项的背景色
    confirmTitle {String}：确认按钮的文字
    cancelTitle {String}：取消按钮的文字
    confirmTitleColor {Color}：确认按钮的文字颜色
    cancelTitleColor {Color}：取消按钮的文字颜色
    title {String}：对话框的标题
    titleColor {Color}：对话框标题的文字颜色
    titleBackgroundColor {Color}：对话框标题的背景色
callback {Function(res)}：选择完的回调函数。res 参数属性如下
    result {String}：结果说明·success cancel error·
    data {Number}：选择的选项，仅·success·时存在
!!

#### pickDate(options, [callback])：日期选择

!!
options {Object}：选项参数
    value {String}：必填，默认选中的选项，时间格式为·yyyy-MM-dd·
    max {String}：可选，·date·的最大值
    min {String}：可选，·date·的最小值
callback {Function(res)}：选择完的回调函数。res 参数属性如下
    result {String}：结果说明·success cancel error·
    data {String}：选择的值，格式为·yyyy-MM-dd·，仅·success·时存在
!!

#### pickTime(options, [callback])：时间选择

!!
options {Object}：选项参数
    value {String}：必填，默认选中的选项，时间格式为·HH:mm·
callback {Function(res)}：选择完的回调函数。res 参数属性如下
    result {String}：结果说明·success cancel error·
    data {String}：选择的值，格式为·HH:mm·，仅·success·时存在
!!

### stream

网络请求：·stream.fetch(options, callback, [progressCallback])·

!!
options {Object}：请求的选项
    method {String}：·GET/POST·，GET 请求不支持·body·方式传递参数，需在·url·后面加上查询字符串
    url {String}：请求地址
    type {String}：响应类型·json text jsonp·
    headers {Object}：请求头
    body {String}：请求体，如果是 JSON 格式需先将其转为字符串
callback {Function(res)}：响应结果回调，res 参数属性如下
    status {Number}：返回的状态码
    ok {Boolean}：如果状态码在 200~299 之间就为真
    statusText {String}：状态描述文本
    data {Object/String}：返回的数据，请求类型是·json jsonp·为 Object，·text·为 String
    headers {Object}：响应头
progressCallback {Function(res)}：关于请求状态的回调，在请求完成后被调用，res 参数属性如下
    readyState {Number}：当前状态，数字说明如下
        1：state，请求连接中
        2：opened，返回响应头中
        3：received，正在加载返回数据
    status {Number}：响应状态码
    length {Number}：已经接受到的数据长度，可以从响应头中获取总长度
    statusText {String}：状态文本
    headers {Object}：响应头
!!

#### 注意

默认·Content-Type·是·application/x-www-form-urlencoded·，如果需要通过 POST json，需设为·application/json·
如果请求地址带有中文需先用·encodeURI()·或·encodeURIComponent()·进行转码

## 事件

!!
click：点击
longpress：长按
swipe：轻扫，根据事件对象的·type·可判断方向
appear：当元素在屏幕上可见
disappear：当元素在屏幕上消失
page（不支持网页端）：通过·viewappear·和·viewdisappear·切换页面前后触发
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
!!

注意：在·scroller list webview·滚动容器上有些可能无效

## 常见问题

### css

!!
display：
    默认且唯一支持·display: flex·，且默认·flex-direction: column;·
    可使用·v-if·或·translate(100%)·或·absolute·代替·display: none;·和·v-show·
    不支持·flex-shrink·和·flex-basis·
    iOS 设置·flex-direction: row;·子元素横排无效，需再加一层·div·
position：
    默认为·relative·
    ·fixed·在 Android 会被当成·absolute·，可以再加一层父容器进行·absolute·
    支持·sticky·定位
    ·z-index·无效，用·v-if·渲染出来的元素层级会高点
line-height：在 iOS 不会居中且贴近底部，可以用·padding·或·flex·居中
overflow：在 Android 默认为·hidden·且无法修改
margin：不支持·auto·
样式选择器：只支持·.class·，重复写后者会覆盖前者而不会合并，注意行内样式的权重是最低的
滚动区域：不包括·padding·部分的
长度单位：
    只支持·px wx·，内容会自动适配好，宽度以·750px·基准
    宽设为·100%·可以用·750px·或父容器设置·align-items: stretch;·
    高设为·100%·可以用·flex-grow: 1;·或·flex-direction: row; align-items: stretch;·
引入外部样式：例如·<style src="./common.css"/>·
其他：给·<scroller>·和·<list>·加高度在 Android 上大于屏幕会是 100%
!!

### js

!!
默认不会开启事件冒泡，需在每个·template·的最大父容器上添加·bubble="true"·属性
不支持事件冒泡和捕获，因此不支持事件修饰符，例如·.prevent .capture .stop .self·
es6：支持·let const =>·，对象属性同名简写，不支持·for of·循环
!!

### vue

!!
组件
    keep-alive：移动端的原生组件不能被前端缓存
生命周期
    activated：不支持·<keep-alive>·
    deactivated：不支持·<keep-alive>·
模板指令
    v-html：Weex 中没有 HTML 解析器
    v-show：不支持·display:none;·
    v-cloak：不支持·[attr]·选择器，只支持·.class·
实例方法
    vm.$mount()：无需手动安装 Vue 实例
选项
    template：Weex 使用[只包含运行时构建](https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6)
全局 API
    Vue.compile：同 template
全局配置
    Vue.config.devtools：只在 Web 环境下支持
    Vue.config.performance：只在 Web 环境下支持
    Vue.config.keyCodes：在移动端不需要
!!

@@
[weex 官方文档](https://weex.apache.org/zh/guide/introduction.html)
[weex playground](https://weex.apache.org/zh/guide/playground.html)
[github - awesome-weex](https://github.com/joggerplus/awesome-weex)
@@

&2020/07/26
            `
        }
    }
}
</script>
