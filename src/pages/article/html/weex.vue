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

### 平台差异

!!
没有 DOM：没有·document Element Event File·等对象
没有 BOM：没有·window·对象，不支持使用全局变量，如果是想要获取设备或环境信息可使用·WXEnvironment·变量
调用原生 API：通过注册、调用模块来实现。其中一些是 Weex 内置的，如·clipboard navigator storage·等
!!

### Playground

[PlaygroundWeex](https://weex.apache.org/zh/guide/playground.html) 是 Weex 示例 App，可扫码预览 Weex 代码构建后的页面

### 开发环境

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

### image

·<image>·不支持background，只有background-color，src也不支持相对和本地路径，需用网络路径代替，resize属性在iOS上无效，需要设置好宽高，placeholder属性为，注意当源图片的src是个空字符串或不存在时不显示占位图

属性：
!!
placeholder{String}：URL、Base64，在图片下载中时显示一张占位图，当加载后会被删除
resize{String}[stretch]：显示模式，可选cover（完全覆盖）、contain（完全显示）、stretch（拉伸覆盖）
!!
###模块方法
save：保存图片内容到本地文件或相册，此操作可能需要设备相关权限
!!
callback{Function}：在图片被写入到本地文件或相册后的回调
    result{Object}：回调结果对象，属性列表
        success{Boolean}：标记图片是否已写入完成
        errorDesc{String}：如果图像没有成功写入，该字符串包含了详细的错误描述
!!
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
!!
success{Boolean}：标记图片是否成功加载
size{Object}：加载的图片大小对象
    naturalWidth{Number}：图片宽度，如果图片加载失败则为0
    naturalHeight{Number}：图片高度，如果图片加载失败则为0
!!

##refresh
下拉刷新，只能在scroller、list、waterfall中使用
###属性
!!
display{String}[show]：控制组件的显示隐藏，可选show、hide
!!
事件：
!!
refresh：下拉完时触发，即手松开的时候
pullingdown：被下拉时触发，即手移动的时候，事件参数对象属性如下
    dy: 前后两次回调滑动距离的差值
    pullingDistance: 下拉的距离
    viewHeight: refresh 组件高度
    type: “pullingdown” 常数字符串
!!
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
!!
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
!!

##animation
过渡动画：·animation.transition(el, options, callback)·
!!
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
        cubic-bezier(x1, y1, x2, y2)：自定义@[贝塞尔|http://cubic-bezier.com/]值
callback：动画执行完毕之后的回调函数。在iOS上可以获取动画执行是否成功的信息，Android木有
!!
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
!!
getString(callback(res))：获取粘贴板的内容
    res.data：获取到的文本内容
    res.result：返回状态，可能为 success 或 fail
setString(text)：将一段文本复制到剪切板，相当于手动复制文本
!!
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
!!
ref{Node}：要滚动的节点
options{Object}:
    offset{Number}[0]: 一个到其可见位置的偏移距离
    animated{Boolean}[true]：是否需要附带滚动动画
!!
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
    'fontFamily': "iconfont2",  // 注意不要和已有的字体名称冲突，所以要特殊一点
    'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
})
··

##modal
··
const modal = weex.requireModule('modal')   //引入模块

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
!!
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
!!

###pickDate(options, [callback])：日期选择
!!
options{Object}：选项参数
    value{String}：必填，默认选中的选项，时间格式为yyyy-MM-dd
    max{String}：可选，date 的最大值
    min{String}：可选，date 的最小值
callback{Function(ret{Object})}：选择完的回调函数。res参数属性如下
    result{String}：结果三种类型 success, cancel, error
    data{String}：选择的值，格式为yyyy-MM-dd，仅成功确认的时候存在。
!!

###pickTime(options, [callback])：时间选择
!!
options{Object}：选项参数
    value{String}：必填，默认选中的选项，时间格式为HH:mm
callback{Function(ret{Object})}：选择完的回调函数。res参数属性如下
    result{String}：结果三种类型 success, cancel, error
    data{String}：选择的值，格式为HH:mm，仅成功确认的时候存在。
!!

##stream
网络请求：·stream.fetch(options, callback, [progressCallback])·
!!
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
!!
^^注意：^^
默认·Content-Type·是·application/x-www-form-urlencoded·，如果需要通过POST json，需设为·application/json·
如果url带有中文需先用·encodeURI()·或·encodeURIComponent()·进行转码

#事件
!!
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
!!
注意：在scroller, list，webview滚动容器上有些可能无效

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
!!
组件
    transition：在移动端 enter 与 leave 的概念可能有点不同，并且 Weex 不支持·display: none;·
    transition-group：同 transition
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
    template：Weex 用的是 @[只包含运行时构建|https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6]
    comments：是否保留且渲染模板中的 HTML 注释
全局API
    Vue.compile：同 template
全局配置
    Vue.config.devtools：只在 Web 环境下支持
    Vue.config.performance：同 Vue.config.devtools
    Vue.config.keyCodes：在移动端不需要
!!

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
另外，WVC将会融入到Weex中，成为Weex的H5 Components模式。

@@
[weex 官方文档](https://weex.apache.org/zh/guide/introduction.html)
[weex playground](https://weex.apache.org/zh/guide/playground.html)
[github - awesome-weex](https://github.com/joggerplus/awesome-weex)
@@

&2020/07/19
            `
        }
    }
}
</script>
