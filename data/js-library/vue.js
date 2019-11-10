commonData.jsLibrary.vue.content = `
#起步
本文档基于 Vue 2.x
##介绍
一种轻量级的 MVVM 框架，它同时吸收了 angular 和 react 的优点，因为是国人开发的，所以对中文的支持是非常好的，方便学习
特点：数据驱动视图，响应式，能构建方便的单页应用

##安装
Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性
可以在浏览器上安装 @[Vue Devtools|https://github.com/vuejs/vue-devtools#vue-devtools] 以方便审查和调试 Vue 应用
###直接用·<script>·引入
··
<script src="https://vuejs.org/js/vue.js"></script>
<script src="https://vuejs.org/js/vue.min.js"></script>
··
###NPM
··
cnpm install vue
··
###命令行工具 (CLI)
Vue 提供了一个官方的 CLI，为单页面应用快速搭建 (SPA) 繁杂的脚手架,全局安装：
··
cnpm install -g vue-cli
··
安装后在命令行输入 vue 可以看到相应的命令，比如初始化：
··
vue init <project>
··
###CLI 初始化的目录：
!!
config：环境配置文件
build：打包构建文件
static：放置静态文件，比如公共样式、js、图片、字体
index.html：入口 html 文件
src：vue 组件
assets：资源文件
components：vue 组件
router.js：路由器
main.js：主 js 文件，实例化 vue
App.vue：主 vue 文件，首页
!!

###Package.json
!!
private：私有
scripts：npm脚本指令，npm run 自定义指令
dependencies：依赖，上线不必用到
devDependencies：开发依赖，一直用到
engines：node和npm的要求版本
browserslist：浏览器版本
!!
使用 scss 需安装 sass-loader：
··
npm install --save-dev node-sass		//sass-loader依赖于node-sass
npm install --save-dev sass-loader
··


#选项

本文档使用·vm·(ViewModel 的缩写) 这个变量名表示 Vue 实例

##DOM
###el
Vue 实例的挂载元素，只在由·new·创建的实例中使用，可以是 CSS 选择器或 HTMLElement 实例
在实例挂载之后，元素可以用·vm.$el·访问
如果在实例化时不填写这个选项，也可显式调用·vm.$mount(el)·
注意：挂载的元素会被 Vue 生成的 DOM 替换，因此不推荐挂载到·<html>·或者·<body>·上

##数据
!!
data：数据对象，Vue 将会递归将·data·的属性转换为·getter/setter·，从而让·data·的属性能够响应数据变化
methods：方法对象，不应该使用·=>·来定义函数，因为会改变·this·的指向，方法中的·this·本就绑定为 Vue 实例
computed：计算属性，虽然使用方法也能得到相同的结果，但函数总是会执行一遍，所以计算属性会更减少消耗
watch：监听属性，当需要在数据变化时执行异步或开销较大的操作时，比计算属性更合适
!!
Vue 实例也代理了数据对象上所有的属性和方法，例如访问·vm.a·等价于访问·vm.$data.a·
注意以·_·或·$·开头的属性不会被代理，因为可能会和 Vue 内置的属性或方法冲突，但仍然可以用·vm.$data._property·的方式访问

###methods
··
<button @click="greet">Greet</button>

var vm = new Vue({
	el: 'button',
	methods: {
		greet: function (e) {
			alert(e.target.tagName)
		}
	}
})

// 也可以直接调用方法
vm.greet() // 'Hello Vue.js!'
··
如果不传参数例如上面的·@click="greet"·，在方法中默认第一个参数即为事件对象
如果加了括号或参数例如·@click="greet()"·或·@click="greet('msg')"·，是没有事件对象的
此时可以用特殊变量·$event·作为事件对象参数，且不限参数位置，例如·@click="warn('msg', $event)"·

##生命周期
%%
钩子,说明
,1
beforeCreate,实例刚被创建，在属性创建之前，即 el 和 data 未初始化
created,实例创建完成，进行了数据观测、属性和方法的运算、watch/event 事件回调，即有 data ，无 el
beforeMount,模板编译/挂载之前，即完成了 el 和 data 的初始化，但未渲染值，即·<div id="web">{{message}}</div>·
mounted,模板编译/挂载之后，渲染完毕，el 被新创建的 vm.$el 替换，即·<div id="web">msg</div>·
beforeUpdate,组件更新之前，即执行·vm.message = 'change'·后、虚拟 DOM 重新渲染前触发
updated,组件更新之后，即执行·vm.message = 'change'·后、虚拟 DOM 重新渲染后触发触发
activated,·<keep-alive>·组件激活时
deactivated,·<keep-alive>·组件移除时
beforeDestroy,实例销毁前，即执行·vm.$destroy()·后、真正销毁前触发，销毁后就不能再用 vue 控制挂载的元素了
destroyed,实例销毁后，即执行·vm.$destroy()·后、真正销毁后触发，销毁后就不能再用 vue 控制挂载的元素了
errorCaptured,当捕获一个来自子孙组件的错误时被调用
%%
!./img/js-library/vue01.png,600

##和组件的顺序
假设有 App.vue，通过·import·和·components·使用了 hello.vue，通过·<router-view>·使用了 foo.vue，打印顺序如下：
··
App beforeCreate
App created
App beforeMount

hello beforeCreate
hello created
hello beforeMount
hello mounted

App mounted

foo beforeCreate
foo created
foo beforeMount
foo mounted
··
可以看出：·import·的方式在实例挂载前组件就已全部加载完毕，·<router-view>·的方式则在后面加载
###注意
Vue 组件页面产生进程就算组件页面切换了也不会结束
例如在组件页面中写了定时器，在切换到其他页面之后还是会触发，所以要注意清除定时器，不然再次访问会重复添加定时器
因为页面每次会重新运行而 js 进程却不会终止

#指令

##{{ }}/v-text
文本插值：
··
<span>Message: {{msg}}</span>
<span>{{ number + 1 }}</span>
<span>{{ ok ? 'YES' : 'NO' }}</span>
<span>{{ message.split('').reverse().join('') }}</span>
<span>{{ change(message) }}</span> // 在 methods 中定义了 change 方法
··
以下情况不会生效
··
{{ var a = 1 }} // 这是语句，不是表达式
{{ if (ok) { return message } }} // 流控制也不会生效，需使用三元表达式
··
·v-text·等同于·{{}}·
··
<span v-text="msg"></span>
// 等同于
<span>{{msg}}</span>
··

##v-html
更新 html，即改变·innerHTML·，插入的内容不会作为 Vue 模板进行编译
注意避免渲染未知的 html ，可能会导致 @[XSS 攻击|https://en.wikipedia.org/wiki/Cross-site_scripting]，例如渲染用户提交的内容
··
<div v-html="html"></div>
··

##v-show
若绑定的值为·true·则保持元素本来的·display·值，值为·false·则设为·display: none;·
··
<h1 v-show="ok">Hello!</h1>
··

##v-if/else/else-if
是否渲染元素，在切换时元素和其数据都将被销毁并重建
··
<h1 v-if="ok">Yes</h1>
··
切换多个元素可以使用·<template>·元素来包裹，·<template>·元素不会被渲染
··
<template v-if="ok">
	<h1>Title</h1>
	<p>Paragraph</p>
</template>
··
^^v-else^^ 元素必须紧跟在带·v-if·或者·v-else-if·的元素的后面，否则它将不会被识别
··
<div v-if="Math.random() > 0.5">Now you see me</div>
<div v-else>Now you don't</div>
··
^^v-else-if^^ 类似于·v-else·，也必须紧跟在带·v-if·或者·v-else-if·的元素之后
··
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else> Not A/B </div>
··
###v-show VS v-if
·v-if·有更高的切换开销，·v-show·有更高的初始渲染开销。所以频繁地切换用·v-show·较好，否则用·v-if·

##key
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
所以添加一个具有^^唯一值^^的·key·属性可以表明元素是独立的，无需复用，即每次切换都重新渲染
··
<input placeholder="username" key="username-input" v-if="loginType === 'username'">
<input placeholder="email address" key="email-input" v-else>
··
也可用于刷新·<router-view>·，当两次切换路径的参数不同而路径相同是不会刷新组件的
··
<router-view :key="Date.now()"></router-view>
··

##v-for
根据数据进行列表渲染
··
<div v-for="item in array"></div> // array 为源数据，item 代表源数据的每一项
<div v-for="item of array"></div> // 同上，另一种写法
<div v-for="(item, index) in array"></div> // index 为当前项的索引值
<div v-for="(value, key, index) in object"></div> // 循环对象时 item 作为键值，key 作为键名，index 为当前项的索引
··
可以加上·key·属性可重用和重新排序现有元素，让渲染更高效（当在组件中使用·v-for·时为了高效·key·是必须的）
··
<div v-for="item in items" :key="item.id">{{item.name}}</div>
··
·v-for·的优先级比·v-if·更高，所以·v-if·每次循环都会判断
··
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>
··
###一段取值范围的 v-for
··
<span v-for="n in 10">{{ n }} </span> // n 为 1-10
··

##数组更新检测
能改变原数组触发视图更新的方法有 7 个：·push()·、·pop()·、·shift()·、·unshift()·、·splice()·、·sort()·、·reverse()·
当用返回新数组的方法时，例如·slice()·、·filter()·等，可以用新数组替换旧数组，例如：·vm.arr = vm.arr.filter(item => item)·
###js 的限制无法检测数组
!!
利用索引直接设置一个项时，例如·vm.items[1] = 'x'·
修改数组的长度时，例如·vm.items.length = 2·
!!
代替方案：
!!
新数组替换旧数组:
splice()：·vm.items.splice(index, 1, newValue)·
vm.$set：·vm.$set(vm.items, index, newValue)·
Vue.set：·Vue.set(vm.items, index, newValue)·
!!
###js 的限制无法检测对象
!!
利用键名直接设置键值时，例如·vm.userInfo.age = 22·
!!
代替方案：
!!
vm.$set：·vm.$set(vm.items, key, newValue)·
Vue.set：·Vue.set(vm.items, key, newValue)·
!!
需要添加多个对象可以用·Object.assign()·方法，注意避免对象的引用不要这样写：
··
Object.assign(vm.userInfo, {age: 27})
··
应该：
··
vm.userInfo = Object.assign({}, vm.userInfo, {age: 27})
// 或
vm.userInfo = {...vm.userInfo, age: 27}
··

##v-on
绑定事件监听器，可缩写为·@·，可监听原生 DOM 事件或自定义元素组件上的自定义事件。支持的修饰符：
!!
.stop：阻止冒泡，调用·event.stopPropagation()·
.prevent：阻止默认行为，调用·event.preventDefault()·
.capture：添加事件侦听器时使用·capture·捕获模式
.self：事件是从侦听器绑定的元素本身触发时才触发回调
.native：监听组件根元素的原生事件
.once：该事件只触发一次
.left：点击鼠标左键时触发
.right：点击鼠标右键时触发
.middle：点击鼠标中键时触发
.passive：提升移动端的性能，此模式会忽略·event.preventDefault()·行为
<keyCode>：事件是从特定键触发时才触发回调，例如 13 代表 enter 键
	常用的按键别名：·enter tab delete esc spac up down left right·
	自定义别名：使用全局·config.keyCodes·对象，例如·Vue.config.keyCodes.f1 = 112·
	按键名（多单词用 - 连接）：例如·@keyup.page-down="onPageDown"·
	系统修饰键：在按下相应按键时才触发相应事件，例如·@click.ctrl·为·Ctrl + Click·，·@keyup.alt.67·为·Alt + C·
		常用的系统修饰键别名：·ctrl alt shift meta（windows 对应 ⊞，mac 对应 ⌘）·
		注意此时需要按住修饰键再按其他键才会触发
	特殊修饰符·.exact·：控制由精确的系统修饰符组合触发的事件，例如：
		@click.ctrl：即使 Alt 或 Shift 被一同按下时也会触发
		@click.ctrl.exact：有且只有 Ctrl 被按下的时候才触发
		@click.exact：没有任何系统修饰符被按下的时候才触发
	注意使用修饰符的顺序很重要，例如·@click.prevent.self·会阻止所有点击，·@click.self.prevent·只会阻止对元素自身的点击
!!
··
<button @click="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!-- 按下 enter 触发 -->
<input @keyup.13.108="onEnter">

<!-- 对象语法（不能缩写成 @ 并且不支持修饰符） -->
<button v-on="{mousedown: doThis, mouseup: doThat}"></button>
··

##v-bind
动态绑定数据，可缩写为·:·，支持的修饰符：
!!
.prop：被用于绑定 DOM 属性 (property)
.camel：将用短横线连接的特性名转换为驼峰式
.sync：语法糖，会扩展成一个更新父组件绑定值的·v-on·侦听器
!!
··
<img :src="imageSrc">

<!-- class 绑定 -->
<div :class="{red: isRed}"></div> // red 是否存在取决于 isRed 的真假
<div :class="{red: isRed}" class="blue"></div> // 共存
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<!-- style 绑定 -->
<div :style="{fontSize: size + 'px'}"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 批量绑定（不能缩写成 :） -->
<div v-bind="{id: someProp, 'other-attr': otherProp}"></div>
··

##v-model
在表单控件或者组件上创建双向绑定，监听输入和输出。适用的组件有：·<input> <select> <textarea> components·
在文本框中：
··
<input type="text" v-model="searchText"/>
// 等同于
<input :value="searchText" @input="searchText=$event.target.value"/>
··
在多选框中：
··
<input type="text" v-model="searchText"/>
// 等同于
<input type="checkbox" :checked="checked" @change="$event.target.checked"/>
··
其它元素依此类推
支持的修饰符有：
!!
.lazy：将·input·改为·change·事件
.number：输入字符串转为数字类型，因为即使·type="number"·也是返回字符串
.trim：输入首尾空格过滤
!!
注意·v-model·会忽略所有表单元素的·value checked selected·特性的初始值而总是将 Vue 实例的数据作为数据来源。应在·data·选项中声明初始值
·v-model·不会更新需要拼写语言的过程，如果需要就用·input·事件
··
<!-- 多个复选框，绑定到同一个数组 -->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames"><label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames"><label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames"><label for="mike">Mike</label>
<span>Checked names: {{ checkedNames }}</span>
// 只要该复选框被选中，它的 value 就会出现在 checkedNames 中，否则会自动删除
data: {
	checkedNames: []
}

<!-- 单选 -->
<input type="radio" id="one" value="One" v-model="picked"><label for="one">One</label>
<input type="radio" id="two" value="Two" v-model="picked"><label for="two">Two</label>
<span>Picked: {{ picked }}</span>
data: {
	picked: ''
}

<!-- 下拉框单选 -->
<select v-model="selected">
	<option disabled value="">请选择</option>
	<option>A</option>
	<option>B</option>
</select>
<span>Selected: {{ selected }}</span>
data: {
	selected: ''
}
// 注意如果 v-model 的初始值未能匹配任何选项，在 iOS 中会无法选择第一个选项，所以推荐提供一个值为空（请选择）的禁用选项

<!-- 下拉框多选 -->
<select v-model="selected" multiple>
	<option>A</option>
	<option>B</option>
</select>
<br>
<span>Selected: {{ selected }}</span>
data: {
	selected: []
}
··

##其他
!!
v-pre：不绑定数据
v-cloak：隐藏未编译的·{{}}·标签直到实例准备完毕，和 CSS 例如·[v-cloak] { display: none }·一起用
v-once：只渲染一次，可以用于优化更新性能
!!

#过渡动画
##概述
Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：
!!
在 CSS 过渡和动画中自动应用 class
可以配合使用第三方 CSS 动画库，如 Animate.css
在过渡钩子函数中使用 JavaScript 直接操作 DOM
可以配合使用第三方 JavaScript 动画库，如 Velocity.js
!!
在下列情形中可以使用·<transition>·元素定义过渡动画，注意只能包含一个根元素
!!
条件渲染：使用 v-if
条件展示：使用 v-show
动态组件
组件根节点
!!
当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理：
!!
自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。
如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意此指浏览器逐帧动画机制，和 Vue 的 nextTick 概念不同)
!!
###同时使用过渡动画
在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 animation 很快的被触发并完成了，而 transition 效果还没结束。在这种情况中，你就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。
###显性的过度动画持续时间
当嵌套的内部元素比根元素有延迟的或更长的过渡效果。可以使用 duration 属性定制一个显性的过渡持续时间 (以毫秒计)：
··
<transition :duration="1000">...</transition>
<transition :duration="{ enter: 500, leave: 800 }">...</transition>	// 定制进入和移出的持续时间
··

##类名
在进入/离开的过渡中，会有 6 个 class 切换：
!!
v-enter：定义进入过渡的开始状态。在元素被插入之前生效，被插入之后的下一帧移除。
v-enter-active：定义进入过渡生效时的状态。在过渡/动画完成之后移除，用来定义进入过渡的过程时间，延迟和曲线函数。
v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
v-leave：定义离开过渡的开始状态。下一帧被移除。
v-leave-active：定义离开过渡生效时的状态。在过渡/动画完成之后移除。用来定义离开过渡的过程时间，延迟和曲线函数。
v-leave-to：定义离开过渡的结束状态。在过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
!!
!./img/js-library/vue02.png,600
这些是默认的类名，即以·v·开头，可以给·<transition>·自定义一个 name 属性以更换开头，比如·<transition name="fade">·代表·v-enter·就会被替换为·fade-enter·
比如 v-if 的过渡
··
<button v-on:click="show = !show"> Toggle </button>
<transition name="fade">
	<p v-if="show">hello</p>
</transition>

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
··
v-if 的动画，一般只定义 active，在 keyframes 中定义起始和结束的运动状态
··
<button @click="show = !show">Toggle show</button>
<transition name="bounce">
	<p v-if="show">hello</p>
</transition>

.bounce-enter-active {
	animation: bounce-in .5s;
}
.bounce-leave-active {
	animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.5);
	}
	100% {
		transform: scale(1);
	}
}
··
###自定义类名
通常通过自定义类名可以结合第三方 CSS 动画库使用，只需定义对应的属性·enter-class·、·enter-active-class·、·enter-to-class·、·leave-class·、·leave-active-class·、·leave-to-class·
··
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
	<button @click="show = !show">
		Toggle render
	</button>
	<transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
		<p v-if="show">hello</p>
	</transition>
</div>
··

##钩子方法
可以在属性中声明 JavaScript 钩子，在 methods 中定义对应的方法即可。共有8个：
··
<transition
	v-on:before-enter="beforeEnter"
	v-on:enter="enter"
	v-on:after-enter="afterEnter"
	v-on:enter-cancelled="enterCancelled"

	v-on:before-leave="beforeLeave"
	v-on:leave="leave"
	v-on:after-leave="afterLeave"
	v-on:leave-cancelled="leaveCancelled"
>
	<!-- ... -->
</transition>

// 在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
methods: {
	beforeEnter: function (el) {
		// ...
	},

	enter: function (el, done) {
		// ...
		done()	// 此回调函数是可选项的设置，与 CSS 结合时使用
	},
	afterEnter: function (el) {
		// ...
	},
	enterCancelled: function (el) {
		// ...
	},

	beforeLeave: function (el) {
		// ...
	},
	leave: function (el, done) {
		// ...
		done()	// 此回调函数是可选项的设置，与 CSS 结合时使用
	},
	afterLeave: function (el) {
		// ...
	},
	// leaveCancelled 只用于 v-show 中
	leaveCancelled: function (el) {
		// ...
	}
}
··
推荐对于仅使用 JavaScript 过渡的元素添加·v-bind:css="false"·，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
一个使用 Velocity.js 的简单例子：
··
<!-- Velocity 和 jQuery.animate 的工作方式类似，也是用来实现 JavaScript 动画的一个很棒的选择 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
	<button @click="show = !show"> Toggle </button>
	<transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
		<p v-if="show"> Demo </p>
	</transition>
</div>

methods: {
	beforeEnter: function (el) {
		el.style.opacity = 0
		el.style.transformOrigin = 'left'
	},
	enter: function (el, done) {
		Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
		Velocity(el, { fontSize: '1em' }, { complete: done })
	},
	leave: function (el, done) {
		Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
		Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
		Velocity(el, {
			rotateZ: '45deg',
			translateY: '30px',
			translateX: '30px',
			opacity: 0
		}, { complete: done })
	}
}
··

##初始渲染过渡
可以通过 appear 特性设置节点在初始渲染的过渡，比如·<transition appear name="fade"></transition>·
也可以自定义 CSS 类名：
··
<transition
	appear
	appear-class="custom-appear-class"
	appear-to-class="custom-appear-to-class"
	appear-active-class="custom-appear-active-class"
>
	<!-- ... -->
</transition>
··
自定义 JavaScript 钩子：
··
<transition
	appear
	v-on:before-appear="customBeforeAppearHook"
	v-on:appear="customAppearHook"
	v-on:after-appear="customAfterAppearHook"
	v-on:appear-cancelled="customAppearCancelledHook"
>
	<!-- ... -->
</transition>
··

##多个元素过渡
使用·v-if/v-else-if/v-else·可以用来定义多个元素过渡。最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：
··
<transition>
	<table v-if="items.length > 0">
		<!-- ... -->
	</table>
	<p v-else>Sorry, no items found.</p>
</transition>
··
注意如果是相同的元素之间切换是没有过渡的：
··
<transition name="fade">
	<button @click="show=!show" v-if="show">on</button>
	<button @click="show=!show" v-else>off</button>
</transition>
··
因为 Vue 会高效渲染而复用相同的组件，即上面的·<button>·没有消失过，所以这时需要加上·key·来保持独立性：
··
<transition name="fade">
	<button @click="show=!show" v-if="show" key="on">on</button>
	<button @click="show=!show" v-else key="off">off</button>
</transition>
··
还可以给同一个元素的·key·设置不同的状态来代替·v-if·和·v-else·：
··
<button @click="show=!show" :key="show">{{show ? 'on' : 'off'}}</button>
··
使用多个 v-if 的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡。例如：
··
<transition name="fade">
	<button @click="show='b'" v-if="show==='a'" key="a">a</button>
	<button @click="show='c'" v-else-if="show==='b'" key="b">b</button>
	<button @click="show='a'" v-else key="c">c</button>
</transition>
··
所以也可以重写为：
··
<transition>
	<button @click="change" :key="arr[stateIndex]">{{arr[showIndex]}}</button>
</transition>

data: {
	stateIndex: 2,
	arr: ['a', 'b', 'c']
},
computed: {
	showIndex: vm => vm.stateIndex + 1 === 3 ? 0 : vm.stateIndex + 1
},
methods: {
	change() {
		this.stateIndex = this.stateIndex===2 ? 0 : this.stateIndex + 1
	}
}
··
同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了过渡模式：
!!
in-out：新元素先进行过渡，完成之后当前元素过渡离开。
out-in：当前元素先进行过渡，完成之后新元素过渡进入。
!!

##列表过渡
使用·<transition-group>·组件可以实现列表过渡，不同于·<transition>·，它会以一个真实元素呈现，即默认渲染为一个·<span>·。也可以通过·tag·属性更换为其他元素。注意这个组件不能使用过渡模式·in-out·和·out-in·了，内部元素总是需要提供唯一的·key·属性值。
··
.list {
	display: flex;
}
.list-item {
	margin-right: 10px;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.fade-enter-active, .fade-leave-active {
	transition: 0.5s linear;
}

<button @click="add">Add</button>
<button @click="remove">Remove</button>
<transition-group name="fade" tag="p">
	<span v-for="item in items" :key="item" class="list-item">{{item}}</span>
</transition-group>

data: {
	arr: [1, 2, 3, 4, 5],
	nextNum: 6
},
methods: {
	randomIndex() {
		return Math.floor(Math.random() * this.arr.length)
	},
	add() {
		this.arr.splice(this.randomIndex(), 0, this.nextNum++)
	},
	remove() {
		this.arr.splice(this.randomIndex(), 1)
	}
}
··
这个例子有个小问题，当添加和移除元素的时候，周围的元素会瞬间移动到他们的新布局的位置，而不是平滑的过渡，下面会解决这个问题。

##列表排序过渡
定义·v-move·的样式会在元素的改变定位的过程中应用过渡，像之前的类名一样，可以通过·name·属性来自定义前缀。
··
.flip-list-move {
	transition: transform 1s;
}

<button @click="shuffle">Shuffle</button>
<transition-group name="flip-list" tag="ul">
	<li v-for="item in items" :key="item">{{ item }}</li>
</transition-group>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

data: {
	items: [1,2,3,4,5,6,7,8,9]
},
methods: {
	shuffle: function () {
		this.items = _.shuffle(this.items)
	}
}
··
内部的实现是 Vue 使用了一个叫 @[FLIP|https://aerotwist.com/blog/flip-your-animations/] 简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置。
@[多维网格也同样可以过渡|https://jsfiddle.net/chrisvfritz/sLrhk1bc/]
需要注意的是使用 FLIP 过渡的元素不能设置为·display: inline·。作为替代方案，可以设置为·display: inline-block·或者放置于 flex 中
所以上面的加减数字的 css 改成
··
.list-item {
	display: inline-block;
	transition: 0.5s;
	margin-right: 10px;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.fade-leave-active {
	position: absolute;
}
··
即可实现周围元素的过渡
FLIP 动画不仅可以实现单列过渡，@[多维网格也同样可以过渡|https://jsfiddle.net/chrisvfritz/sLrhk1bc/]

###列表的交错过渡

#组件
##全局注册
·Vue.component(id, [definition])·：注册或获取全局组件，给定的 id 作为组件的名称
··
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
··
###命名方式
!!
kebab-case 短横线隔开：Vue.component('my-component-name', { /* ... */ })，在 html 中使用·<my-component-name>·
PascalCase 驼峰式：Vue.component('MyComponentName', { /* ... */ })，引用这个元素时都可以使用·<my-component-name>·或·<MyComponentName>·，但在 html 中只能使用·<my-component-name>·
!!

##局部注册
如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件会被包含在最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。在这些情况下可以通过一个普通的 JavaScript 对象来定义组件：
··
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }

// 然后在 new Vue 中的 components 选项定义组件
// 属性名就是 Vue.component 的 id，属性值就是选项
new Vue({
	el: '#app'
	components: {
		'component-a': ComponentA,
		'component-b': ComponentB,
		'component-c': ComponentC
	}
})
··
^^注意^^局部注册的组件在其子组件中不可用
可以在其组件的子属性中再次声明，例如 ComponentA 在 ComponentB 中使用：
··
var ComponentA = { /* ... */ }
var ComponentB = {
	components: {
		'component-a': ComponentA
	}
}
··
也可以在模块系统中局部注册，例如在 ComponentB.js 或 ComponentB.vue 文件中：
··
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
	components: {
		ComponentA,
		ComponentC
	},
}
··
现在 ComponentA 和 ComponentC 都可以在 ComponentB 的模板中使用了

##注册组件
··
// 定义一个名为 button-counter 的新组件：
Vue.component('button-counter', {
	template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
	data: function () {
		return {
			count: 0
		}
	}
})

// 直接在 Vue 中使用，可以多次复用
<button-counter></button-counter>
<button-counter></button-counter>
··
参数和·new Vue·时基本相同，不同的是·el·选项换成·template·模板，组件模板同样只能有一个根元素，且·data·是个函数
^^一个组件的 data 选项必须是一个函数^^，多次复用时数据才是独立的，如果只是一个对象，那么多个同样的组件之间数据是共用的
###动态切换组件
通过 Vue 的·<component>·元素和·is·属性可以切换组件，相当于·if·：
··
<div id="dynamic-component-demo" class="demo">
	<button
		v-for="tab in tabs"
		:key="tab"
		:class="{active: currentTab === tab}"
		@click="currentTab = tab"
	>{{ tab }}</button>
	<component :is="currentTabComponent" class="tab" ></component>
</div>

// js
Vue.component('tab-home', {
	template: '<div>Home component</div>'
})
Vue.component('tab-posts', {
	template: '<div>Posts component</div>'
})
Vue.component('tab-archive', {
	template: '<div>Archive component</div>'
})

new Vue({
	el: '#dynamic-component-demo',
	data: {
		currentTab: 'Home',
		tabs: ['Home', 'Posts', 'Archive']
	},
	computed: {
		currentTabComponent: function () {
			return 'tab-' + this.currentTab.toLowerCase()
		}
	}
})
··
###解析 DOM 模板时的注意事项
有些 HTML 元素，诸如 <ul>、<ol>、<table> 和 <select>，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。比如：
··
<table>
	<blog-post-row></blog-post-row>
</table>
··
·<blog-post-row>·会被作为无效的内容提升到外部，即等同于：
··
<blog-post-row></blog-post-row>
<table>
</table>
··
此时需要使用·is·属性来代替才会正常渲染：
··
<table>
	<tr is="blog-post-row"></tr>
</table>
··
需要注意的是如果我们从以下来源使用模板的话，这条限制是不存在的：
!!
字符串 (例如·template: '...'·)
单文件组件 (·.vue·)
·<script type="text/x-template">·
!!

##props
当要给组件传值的时候需要·props {Array/Object}·，自定义任意属性名即可
··
Vue.component('blog-post', {
	props: ['title'],
	template: '<h3>{{ title }}</h3>'
})

// 定义的 title 属性即传给组件的值
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>

// 和 data 使用
<blog-post v-for="post in posts" :key="post.id" :title="post.title"></blog-post>
··
^^注意^^ html 中是不区分大小写的，所以·postTitle·需改成·post-title·，当然在·template·中使用时没有这个限制，即：
··
Vue.component('blog-post', {
	props: ['postTitle'],
	template: '<h3>{{ postTitle }}</h3>'
})

// html 中使用
<blog-post post-title="My journey with Vue"></blog-post>
··
###类型
一般以字符串数组的方式列出 prop：
··
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
··
也可以用对象的形式指定值类型，key 作为 prop 的名称，value 作为类型，当未按照指定类型传值时 Vue 会在控制台发出警告：
可选·String/Number/Boolean/Array/Object/Date/Function/Symbol/null·
··
props: {
	title: String,	// 字符串
	likes: Number,	// 数字
	isPublished: Boolean,	// 布尔值
	commentIds: null,	// 任意类型
	author: [Array, Object], // 用数组表示多类型
	content: {	// 用对象指定属性
		type: String,	// 类型为字符串
		required: true,	// 是否必填
		default: '空'	// 默认值
	},
	content2: {
		type: [Object, Array],	// 类型为对象或字符串时
		default: function () {	// 默认值必须通过函数返回，否则会造成共用
			return { message: 'hello' }
		}
	},
	content3: {
		validator: function (value) {	// 自定义验证函数
			// 这个值必须匹配下列字符串中的一个，否则 Vue 将会产生一个控制台的警告（开发环境）
			return ['success', 'warning', 'danger'].indexOf(value) !== -1
		}
	}
}
··
而使用的指定类型的方式就需要注意^^没有通过·v-bind·绑定的属性都是字符串类型^^，所以记得加上·v-bind·，比如：
··
Vue.component('blog-post', {
	props: {
		likes: Number,
		isPublished: Boolean
	},
	template: '<span v-if="isPublished">{{ likes }}</span>'
})

// html
<blog-post likes="36" isPublished="false"></blog-post> // 报错，实际都是 String 类型
<blog-post :likes="36" :isPublished="false"></blog-post>	// 用 v-bind 告诉 Vue 这是个表达式而非字符串
··
###传入一个对象的所有属性
直接使用不带参数的·v-bind·可传入一个对象（注意此时不能使用简写·:·）：
··
data: {
	book: {
		id: 1,
		name: 'vue',
		title: 'My Journey with Vue'
	}
}

<blog-post v-bind="book"></blog-post>
// 等同于
<blog-post :id="book.id" :name="book.name" :title="book.title"></blog-post>
··
###替换/合并已有的特性
比如：
··
Vue.component('blog-post', {
	template: '<span class="demo" message="hhh">demo</span>'
})

// html
<blog-post class="active" message="hello"></blog-post>

// 在浏览器中，class 和 style 会合并，其他属性会覆盖组件的
<blog-post class="demo active" message="hello"></blog-post>
··
###禁用继承
如果不希望组件的根元素继承特性，可以在组件的选项中设置·inheritAttrs: false·，注意这个选项对 class 和 style 绑定不影响，	比如：
··
Vue.component('blog-post', {
	template: '<span class="demo" weather="cloudy">demo</span>'
})

// html
<blog-post class="active" weather="sunny"></blog-post>

// 浏览器中显示覆盖了组件的 weather 属性
<span class="demo active" weather="sunny">demo</span>
··
若加上了·inheritAttrs: false·：
··
Vue.component('blog-post', {
	inheritAttrs: false,
	template: '<span class="demo" weather="cloudy">demo</span>'
})

// html
<blog-post class="active" weather="sunny"></blog-post>

// 浏览器中显示未覆盖
<span class="demo active" weather="cloudy">demo</span>
··
默认不会显示未在组件上声明的元素，通过实例属性·$attrs·则可以让继承特性生效，比如：
··
Vue.component('blog-post', {
	template: '<span class="demo">demo</span>',
	created() {
		console.log(this.$attrs)
	}
})

// html
<blog-post class="active" message="hello"></blog-post>

// 浏览器中未显示 message 属性，可以在看到控制台打印 {message: 'hello'}，说明接收到了属性但未使用
<span class="demo active">demo</span>
··
需要在元素上显示时可以加上·v-bind="$attrs"·：
··
Vue.component('blog-post', {
	template: '<span class="demo" v-bind="$attrs">demo</span>',
})

// html
<blog-post class="active" message="hello"></blog-post>

// 浏览器中显示了 message 属性
<span class="demo active" message="hello">demo</span>
··

##$emit()
当组件向外部传值时需通过·$emit()·自定义事件名，相当于模板内将点击事件换个名字：
··
Vue.component('blog-post', {
	template: \`<button v-on:click="$emit('welcome')">Click me to be welcomed</button>\`
})

// 使用
<blog-post @welcome="hi"></blog-post>

methods: {
	hi() {
		alert('Hi!')
	}
}
··
第二个之后的参数代表传递的参数：
··
Vue.component('blog-post', {
	template: \`<button v-on:click="$emit('welcome', 20, 30)">Click me to be welcomed</button>\`
})

// 通过 $event 访问，代表传递的第一个参数 20
<div :style="{'font-size': fz + 'px'}">welcome</div>
<blog-post @welcome="fz = $event"></blog-post>
data: {
	fz: 16
}

// 如果是一个方法，参数与传入的值一一对应
<div :style="{'font-size': fz + 'px'}">welcome</div>
<blog-post @welcome="test"></blog-post>
data: {
	fz: 16
},
methods: {
	test(res1, res2) {
		this.fz = res1	// 20
		console.log(res2)	// 30
	}
}
··
也可以在 methods 里面通过·this.$emit·调用：
··
Vue.component('magic-eight-ball', {
	template: '<button v-on:click="giveAdvice">Click me for advice</button>',
	data: function () {
		return {
			possibleAdvice: ['Yes', 'No', 'Maybe']
		}
	},
	methods: {
		giveAdvice: function () {
			var randomAdviceIndex = Math.floor(Math.random() * this.possibleAdvice.length)
			this.$emit('give-advice', this.possibleAdvice[randomAdviceIndex])
		}
	}
})

// 使用
<magic-eight-ball v-on:give-advice="showAdvice"></magic-eight-ball>
methods: {
	showAdvice: function (advice) {
		alert(advice)
	}
}
··
^^注意大小写^^，如果定义·this.$emit('myEvent')·，在 html 中使用时需改成小写：·@myevent=""·
###在组件上使用 v-model
因为·v-model·的原理是：
··
<input :value="searchText" @input="searchText = $event.target.value">
··
所以在组件上就是同时完成外部向组件内传值、组件向外部传值，由于·$event·在组件内的含义不同，需要改写成：
··
Vue.component('custom-input', {
	props: ['value'],
	template: \`<input :value="value" @input="$emit('input', $event.target.value)" />\`
})

// 现在可以使用 v-model 了
<custom-input v-model="searchText"></custom-input>
data: {
	searchText: ''
}
··
一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。·model·选项可以用来避免这样的冲突：
··
Vue.component('base-checkbox', {
	model: {
	prop: 'checked',
	event: 'change'
	},
	props: {
	checked: Boolean
	},
	template: \`<input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)">\`
})

// html
<base-checkbox v-model="lovingVue"></base-checkbox>
··
这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当·<base-checkbox>·触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新
@[将原生事件绑定到组件|https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6]
@[.sync 修饰符|https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6]

##slot
和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：
··
Vue.component('alert-box', {
	template: \`
		<div class="demo-alert-box">
			<strong>Hello </strong>
		</div>
	\`
})

// 添加文本
<alert-box>World</alert-box>

// 浏览器中
<div class="demo-alert-box">
	<strong>Hello </strong>
</div>
··
直接添加内容是无效的，需要使用 slot 在需要的地方加入：
··
Vue.component('alert-box', {
	template: \`
		<div class="demo-alert-box">
			<strong>Hello </strong>
			<slot></slot>
		</div>
	\`
})

// 添加文本
<alert-box>World</alert-box>

// 浏览器中
<div class="demo-alert-box">
	<strong>Hello </strong>
	World
</div>
··
插槽内可以包含任何模板代码，包括 HTML 和其他组件
###多个插槽
通过·<slot>·的·name·属性定义名称来使用，可以保留一个未命名插槽作为默认插槽，未定义名称的都会在其中输出，比如：
··
Vue.component('blog-post', {
	template: \`
		<div class="container">
			<header>
				<slot name="header"></slot>
			</header>
			<main>
				<slot></slot>
			</main>
			<footer>
				<slot name="footer"></slot>
			</footer>
		</div>
	\`
})
··
在 html 中使用：
··
<blog-post>
	<h1 slot="header">这里是 header 内部</h1>
	<h2 slot="header">这里是 header 内部2</h2>

	<p>这里是 main 内部</p>
	<p>这里是 main 内部2</p>

	<p slot="footer">这里是 footer 内部</p>
</blog-post>
··
多个相同的插槽可以使用·<template>·包裹：
··
<blog-post>
	<template slot="header">
		<h1>这里是 header 内部</h1>
		<h2>这里是 header 内部2</h2>
	</template>

	<p>这里是 main 内部</p>
	<p>这里是 main 内部2</p>

	<p slot="footer">这里是 footer 内部</p>
</blog-post>
··
###插槽的默认内容
在·<slot>·元素内添加内容可作为默认内容，如果在使用这个插件时提供了内容将会覆盖默认的，否则就显示默认的：
··
<button type="submit">
	<slot>Submit</slot>
</button>
··
###编译作用域

#单文件组件
##介绍
通常在项目中使用·Vue.component·来定义全局组件，这在很多中小规模的项目中运作的很好，但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：
!!
全局定义：强制要求每个 component 中的命名不得重复
字符串模板：缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的·\\·
不支持 CSS：意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
没有构建步骤：限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel
!!
而文件扩展名为·.vue·的单文件组件为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。
###写法
把 html、css、js 写到一个文件中，从而实现对组件的封装， 一个.vue 文件就是一个单独的组件：
··
<!-- html 部分，使用 <template> 标签包裹，同样使用一个最大父容器 -->
<template>
	<div class="hello">
		<h1>{{msg}}</h1>
	</div>
</template>

<!-- js 部分，使用 <script> 标签包裹，export default 表示导出该组件，这样在其他页面中用 import 可使用该组件 -->
<script>
	export default {
		name: 'hello'
		data() {
			return {
				msg: 'hello world!'
			}
		}
	}
</script>

<!-- css 部分，使用 <style> 标签包裹，scoped 属性表示此样式只用于当前组件内 -->
<style scoped>
	h1 {
		font-size: 20px;
	}
</style>
··
·export·和·export default·的区别：
·export·能导出多个对象，所以在引入时是一个包含多个对象的对象，要使用其中某一个还需要再索引到其中某个对象，例如·import {foo} from './foo.vue'·
·export default·：只能导出一个对象，且不需要命名，在引入时也是直接使用，例如·import foo from './foo.vue'·
而一个组件就是一个对象，所以是用·export default·是比较合适的，更多区别参考 ES6 - Module 的语法

###怎么看待关注点分离？
一个重要的事情值得注意，关注点分离不等于文件类型分离。
在现代 UI 开发中，相比于把代码库分离成三大层次文件（html、css、js），把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，使得组件更加内聚且更可维护。
即便你不喜欢单文件组件，你仍然可以把 JavaScript、CSS 分离成独立的文件然后做到热重载和预编译。比如：
··
<template>
	<div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
··

##Vue CLI
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：交互式、快速、零配置、依赖可升级扩展、丰富的插件、图形界面
Vue CLI 分为几个独立的部分：
!!
CLI：一个全局安装的 npm 包，提供了终端里的 vue 命令，包括 vue create、vue serve、vue ui等
CLI 服务：一个开发环境依赖，也是一个 npm 包，局部安装在每个 @vue/cli 创建的项目中，基于 webpack
CLI 插件：提供插件，名字以 @vue/cli-plugin- (内建插件) 或 vue-cli-plugin- (社区插件) 开头
!!
###全局安装
··
cnpm install -g @vue/cli
··
安装完成后可以访问·vue·命令，比如·vue -V·
###使用命令
创建新项目：
··
vue create hello-world
··
然后会提示选取一个 preset。直接按回车将选择默认的包含了基本的 Babel + ESLint 设置的 preset，也可以按上下键选“手动选择特性”来选取需要的特性
如果安装出现这样的错误：
··
command failed: npm install --loglevel error --registry=https://registry.npm......
··
可以试试直接使用·cnpm·初始化：
··
vue create -r cnpm project-name
··
###使用图形化界面
··
vue ui
··
上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程
###运行
初始化完毕后可在·package.json·中查看可使用的命令：
··
{
	"scripts": {
		"serve": "vue-cli-service serve",
		"build": "vue-cli-service build",
		"lint": "vue-cli-service lint"
	}
}
··
在初始化的·README.md·中也可以看到，所以运行项目可使用命令：
··
npx vue-cli-service serve
··
或者：
··
npm run serve
··
然后在浏览器中打开
··
http://localhost:8080/
··
即可访问初始化的·index.html·

##Vue CLI 配置
有两种方式可以对项目进行配置：vue.config.js 和 package.json
vue.config.js 是一个可选的配置文件，没有的话可以自行新建，这个文件应该导出一个包含了选项的对象：
··
module.exports = {
	// 选项...
}
··
package.json 中的 vue 字段，也是一个可选的配置选项，没有的话可以自行添加（注意格式）：
··
"vue": {
	// 选项...
}
··
当然如果需求比较多的话还是 vue.config.js 更方便，毕竟还可以添加语句，比如对 baseUrl 根据环境进行配置：
··
module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
}
··
可配置的参数有：
!!
baseUrl{String}[/]：运行·npm run build·打包后的引用资源的开头 url 路径
outputDir{String}[dist]：运行·npm run build·打包后的输出路径，注意目标目录在构建之前会被清除（构建时传入 --no-clean 可关闭该行为）
assetsDir{String}：放置生成的静态资源（js、css、img、fonts）的（相对于 outputDir 的）目录
indexPath{String}[index.html]：指定生成的 index.html 的输出路径 (相对于 outputDir)，也可以是一个绝对路径
filenameHashing{Boolean}[true]：通过 Vue CLI 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，如果不想使用带 hash 的 index.html 可设为 false 关闭
pages{Object}：自定义  entry, template, filename, title 和 chunks 的配置
lintOnSave{Boolean}[true]：是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。安装 @vue/cli-plugin-eslint 后生效
runtimeCompiler{Boolean}[false]：是否使用包含运行时编译器的 Vue 构建版本
transpileDependencies{StringArray/RegExpArray}：默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果想通过 Babel 显式转译某依赖，可以在这个选项中列出来
productionSourceMap{Boolean}[true]：如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
crossorigin{String}：设置生成的 HTML 中·<link rel="stylesheet">·和·<script>·标签的·crossorigin·属性
integrity{Boolean}[false]：如果你构建后的文件是部署在 CDN 上的，启用该选项可在生成的 HTML 中的·<link rel="stylesheet">·和·<script>·标签上启用 Subresource Integrity (SRI)以提供额外的安全性
configureWebpack{Object/Function}：webpack 配置方式，参考 @[配合 webpack > 简单的配置方式|https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F]
css：
	modules{Boolean}[false]：css 模块配置方式，参考 @[配合 CSS > CSS Modules|https://cli.vuejs.org/zh/guide/css.html#css-modules]
	extract{Boolean/Object}：是否将组件中的 CSS 提取至一个独立的 CSS 文件中，而不是注入到 JavaScript 中的 inline 代码
	sourceMap{Boolean}[false]：是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
	loaderOptions{Object}：向 CSS 相关的 loader 传递选项，参考 @[向预处理器 Loader 传递选项|https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9]
devServer{Object}：所有 webpack-dev-server 的 @[选项|https://webpack.js.org/configuration/dev-server/] 都支持
	proxy{Object/String}：将任何未知请求 (没有匹配到静态文件的请求) 代理到指定地址
parallel{Boolean}：是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
pwa{Object}：向 @[PWA 插件|https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa] 传递选项
pluginOptions{Object}：这是一个不进行任何 schema 验证的对象，可传递任何第三方插件选项
!!

##初始化项目分析
默认初始化的项目目录结构是：
!!
node_modules/：npm 依赖包
public/：公共文件
	favicon.ico：网页标签 icon
	index.html：入口文件
src/：主文件
	assets/：资源文件
		logo.png：logo 图片
	components/：Vue 组件
		HelloWorld.vue：HelloWorld 组件
	App.vue：入口组件
	main.js：入口 js
babel.config.js：babel 转换配置
package.json：项目配置信息
package-lock.json：node_modules/ 的依赖包信息
README.md：项目说明文档
!!
###public/index.html
该文件是一个会被 @[html-webpack-plugin|https://github.com/jantimon/html-webpack-plugin] 处理的模板，可以看到没有任何的 css 和 js 文件的引入，因此直接将该文件在浏览器中运行是什么都不会发生的，需运行·npm run dev·指令，在构建过程中对应的资源链接会被自动注入，或者运行·npm run build·将项目打包成静态文件后再在浏览器中运行查看
###src/components/HelloWorld.vue
该组件的有个 msg 的 props 作为标题，在使用该组件时传入 msg，其余都是静态页面
###src/App.vue
该组件作为入口组件
··
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<!-- 使用 HelloWorld 组件，并传入 msg 这个 props 作为标题 -->
		<HelloWorld msg="Welcome to Your Vue.js App"/>
	</div>
</template>

<script>
	// 引入 HelloWorld.vue 这个组件，并用 HelloWorld 这个变量表示它
	import HelloWorld from './components/HelloWorld.vue'

	// 导出本 App.vue 组件
	export default {
		name: 'app',	// 组件名为 app，该选项在单文件中不那么重要了，反正 import 时会重新命名
		components: {	// 声明使用的组件
			HelloWorld
		}
	}
</script>
··
###src/main.js
··
import Vue from 'vue'	// 引入 Vue.js，并用 Vue 这个变量表示它
import App from './App.vue'	// 引入 App.vue 这个组件，并用 App 这个变量表示它

// 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
	render: h => h(App)	// 渲染 App 这个组件，只包含运行时版只能使用渲染函数或包含编译器的构建，参考@[版本说明|https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A]
}).$mount('#app')	// 挂载 el 为 index.html 中的 #app

// 在渲染时 App.vue 中的内容会代替 index.html 中的 <div id="app"></div>
··

#Vue Router
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌

##安装
直接下载/CDN
··
<script src="/path/to/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script> // 指向最新
<script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script> // 指定版本
··
NPM
··
npm install vue-router
··
注意在模块化项目中使用时（非 script 标签），必须通过 Vue.use() 声明使用路由功能：
··
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
··

##起步
将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们
··
// html
<router-link to="/foo">Go to Foo</router-link> // 默认渲染成 a 标签，或者使用 js 例如 this.$router.push('/foo')
<router-view></router-view> // 路由匹配到的组件将渲染在这里
// js
// 1、定义组件（在其他页面写好）
const routes = [ { path: '/foo', component: Foo } ] // 2、定义路由（每个路由映射一个组件）
const router = new VueRouter({ routes }) // 3、创建 router 实例
const app = new Vue({ router }).$mount('#app') // 4、挂载到 vue 实例
··
然后可通过 this.$router 访问路由器，包括路径、参数等

##动态路由匹配
参数、响应变化、高级匹配

##嵌套路由
被渲染组件同样可以包含自己的嵌套 <router-view>，这需要在 VueRouter 的参数中使用 children 配置
··
const routes = [
	{
		// 以 /¿ 开头的嵌套路径会被当作根路径
		path: '/user/:id',
		component: User
		children: [
			// 当 /¿user/¿:id/profile 匹配成功，UserProfile 会被渲染在 User 的 <router-view> 中
			{ path: 'profile', component: UserProfile },
			// 当访问 /user/:id 时还没有匹配到子路由，所以 <router-view> 还不会渲染，可以提供一个空的子路由在匹配 /user/:id 成功时即渲染
			{ path: '', component: UserHome }
		]
	}
]
··

##编程式的导航
··
router.push(location{String/Object}, onComplete?, onAbort?) // 产生历史纪录
router.replace(location, onComplete?, onAbort?) // 不产生历史纪录
router.go(n) // 前进或后退多少步
router.push('user') // 路径
router.push({ name: 'user', params: { userId: '123' }})
router.push({ path: 'register', query: { plan: 'private' }})
router.push({ path: '/user', params: { userId }}) // path 不能和 params 一起写
router.push({ path: \`/user/\${userId}\` }) // path 需和 params 写成完整路径才有效
··

##命名多视图
··
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
routes: [
	{
	  path: '/',
	  components: {
		default: Foo,
		a: Bar,
		b: Baz
	  }
	}
]
··
 
##重定向
··
routes: [{ path: '/a', redirect: '/b' }] // path
routes: [{ path: '/a', redirect: { name: 'foo' }}] // name
routes: [{ path: '/a', redirect: to => { }}] // 以目标路由作为参数，return 要重定向的字符串路径或路径对象
··

##别名
··
/a 的别名是 /b，即当访问 /b 时 URL 不变，返回的结果仍是 /a
routes: [{ path: '/a', component: A, alias: '/b' }]
··

路由组件传参：路由的值作为参数组件

HTML5 History 模式：vue-router 默认使用 hash 模拟完整路径的模式，使用 history 模式就像正常的 url，这需要后台的配置支持

##导航守卫
路由在跳转时的一些监听函数
··
router.beforeEach((to, from, next) => { }) // 全局前置守卫，导航之前
router.beforeResolve((to, from, next) => { }) // 全局解析守卫，目标组件被调用后
router.afterEach((to, from) => { }) // 全局后置钩子，导航确认后， DOM 更新前
routes: [{ path: '/foo', component: Foo, beforeEnter: (to, from, next) => { } } ] // 路由独享的守卫，还有 beforeRouteUpdate、beforeRouteLeave
··

路由元信息：定义路由的时候可以配置 meta 字段

过渡动效：可以用 <transition> 组件给 <router-view> 添加一些过渡效果

数据获取：一般在组件生命周期钩子中获取数据，获取期间显示加载中，也可以在导航之前获取数据成功后执行导航

##滚动行为
··
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) { // savedPosition 通过浏览器的前进/后退按钮触发时才可用
	// return 期望滚动到哪个的位置
  }
})
··

##路由懒加载
把不同路由对应的组件分割成不同的代码块，当被访问的时候才加载对应组件
将异步组件定义为返回一个 Promise 的工厂函数，在 Webpack 2 中可以使用动态 import 语法来定义代码分块点

#Vuex
把组件的共享状态抽取出来，以一个全局单例模式管理呢
在这种模式下，组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为
通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护
适用于大型单页应用，如果应用够简单最好不要使用 Vuex，一个简单的 store 模式就够了

##store 仓库
和单纯的全局对象的不同点：
Vuex 的状态存储是响应式的，若状态发生变化，相应的组件也会更新
不能直接改变 store 中的状态，只能提交 (commit) mutation。这样可以跟踪状态的变化，从而能够实现一些工具更好地了解应用

##安装
直接下载/CDN
··
<script src="/path/to/vue.js"></script>
<script src="https://unpkg.com/vuex"></script> // 指向最新
<script src="https://unpkg.com/vuex@2.0.0"></script> // 指定版本
··
NPM
··
npm install vuex --save
··
注意在模块化项目中使用时（非 script 标签），必须通过 Vue.use() 声明使用路由功能：
··
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
··
Vuex 依赖 Promise，如果你支持的浏览器并没有实现 Promise (比如 IE)，可以使用一个 polyfill 的库，例如 es6-promise
··
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
npm install es6-promise --save
import 'es6-promise/auto' // 使用 Vuex 之前
··

##起步
··
const store = new Vuex.Store({
  state: {
	count: 0
  },
  mutations: {
	increment (state) {
	  state.count++
	}
  }
})
store.commit('increment')
console.log(store.state.count)
··
通过提交 mutation 的方式，而非直接改变 store.state.count，这样可以追踪到状态的变化
··
const app = new Vue({ store }).$mount('#app')
··
该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到

##State
Vuex 使用单一状态树，用一个对象包含全部的应用层级状态
在 Vue 组件中获得 Vuex 状态
mapState 辅助函数：当一个组件需要获取多个状态时，都声明为计算属性会有些重复和冗余，可以使用 mapState 帮助生成计算属性

@@
官方文档|https://cn.vuejs.org/v2/guide/
Vue CLI|https://cli.vuejs.org/zh/guide/
Vue Router|https://router.vuejs.org/zh/
Vuex|https://vuex.vuejs.org/zh/
Vue SSR|https://ssr.vuejs.org/zh/
周边资源|https://github.com/vuejs/awesome-vue
@@

&2018/9/13
`