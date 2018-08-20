commonData.jsLibrary.vue = {
	content: `
	#起步
	下个：组件
	再下个：cli,.vue形式
	最后再全部浏览下所有的文档
	
	##介绍
	Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
	一种轻量级的mvvm框架，它同时吸收了angular和react的优点，因为是国人开发的，所以对中文的支持是非常好的，方便学习，特点：数据驱动视图，响应式。
	使用scss需安装sass-loader：
	··
	npm install --save-dev node-sass		//sass-loader依赖于node-sass
	npm install --save-dev sass-loader
	··
	
	vue-cli目录：
	config：环境配置文件
	build：打包构建文件
	static：放置静态文件，比如公共样式、js、图片、字体
	index.html：入口文件，npm run dev开启服务
	src：vue文件
	assets：资源文件
	components：vue组件
	router.js：路由器
	main.js：主js文件，实例化vue
	App.vue：主vue文件，首页

	Package.json说明
	private：私有
	scripts：npm脚本指令，npm run 自定义指令
	dependencies：依赖，上线不必用到
	devDependencies：开发依赖，一直用到
	engines：node和npm的要求版本
	browserslist（数组）：浏览器版本

	app.vue引入组件不能用@

	egret startserver -a

	
	##安装
	Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性
	可以在浏览器上安装 @[Vue Devtools|https://github.com/vuejs/vue-devtools#vue-devtools] 以方便审查和调试 Vue 应用
	###直接用·<script>·引入
	@[开发版本：未压缩，包含完整的警告和调试模式|https://vuejs.org/js/vue.js]
	@[生产版本：压缩版，删除了警告|https://vuejs.org/js/vue.min.js]
	也可以使用 CDN 手动引入指定的版本号，和指定·vue.js·或·vue.min.js·
	··
	<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
	··
	###NPM
	在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。默认安装最新稳定版：
	··
	cnpm install vue
	··
	###命令行工具 (CLI)
	Vue 提供了一个官方的 CLI，为单页面应用快速搭建 (SPA) 繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。全局安装：
	··
	cnpm install -g vue-cli
	··
	安装完成后可以输入 vue 回车，可以看到相应的命令行，比如初始化·vue init·
	
	#选项
	
	##DOM
	###el
	只在由 new 创建的实例中使用，提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。
	在实例挂载之后，元素可以用·vm.$el·访问。
	如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
	注意：所有的挂载元素会被 Vue 生成的 DOM 替换，因此不推荐挂载 root 实例到·<html>·或者·<body>·上。
	
	##数据
	!!
	data：数据对象
	methods：方法对象
	computed：计算属性
	watch：监听属性
	!!
	data、methods、computed 是定义数据，watch 是监听数据
	Vue 实例也代理了数据对象上所有的属性，因此访问·vm.a·等价于访问·vm.$data.a·。
	数据选项的子属性都会被代理到 Vue 实例上，所以可以直接用比如·vm.msg·直接读取
	以·_·或·$·开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。可以使用例如·vm.$data._property·的方式访问这些属性。
	
	###data
	Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。
	实例创建之后，可以通过·vm.$data·或·vm._data·访问原始数据对象。
	如果需要可以使用·JSON.parse(JSON.stringify(vm.$data))·深拷贝 data 来操作
	
	###methods
	方法对象，可以用·v-on·指令监听 DOM 事件
	注意：不应该使用·=>·来定义函数，因为会改变·this·的指向，方法中的·this·本就绑定为 Vue 实例
	··
	<button v-on:click="greet">Greet</button>	// 没有参数可以不用写 ()，即 greet()
	
	var vm = new Vue({
		el: 'button',
		data: {
			name: 'Vue.js'
		},
		// 在 methods 对象中定义方法
		methods: {
			greet: function (e) {
				alert('Hello ' + this.name + '!')
				alert(e.target.tagName)	// e 是原生 DOM 事件
			}
		}
	})

	// 也可以用 JavaScript 直接调用方法
	vm.greet() // 'Hello Vue.js!'
	··
	如果不传参数比如上面的·v-on:click="greet"·，在方法中默认第一个参数即为事件对象
	注意如果加了括号或参数即·v-on:click="greet()"·或·v-on:click="greet('msg')"·，是没有事件对象的，此时可以用特殊变量·$event·作为事件对象参数，且不限参数位置
	··
	<button v-on:click="warn('msg', $event)">submit</button>
	··
	
	###computed
	计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
	注意：如果为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例，可以将其实例作为函数的第一个参数来访问。
	··
	computed: {
		aDouble: vm => vm.a * 2
	}
	··
	计算属性的结果是依赖的响应式属性变化而重新计算的，如果依赖的是非响应式属性则不会更新。
	··
	var vm = new Vue({
		data: { a: 1 },
		computed: {
			// 仅读取
			aDouble: function () {
				return this.a * 2
			},
			// 读取和设置
			aPlus: {
				get: function () {
					return this.a + 1
				},
				set: function (v) {
					this.a = v - 1
				}
			}
		}
	})
	
	vm.aPlus   // 2
	vm.aPlus = 3
	vm.a       // 2
	vm.aDouble // 4
	··
	虽然方法和计算属性的结果是一样的
	··
	computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
	··
	等同于
	··
	methods: {
		reversedMessage: function () {
			return this.message.split('').reverse().join('')
		}
	}
	··
	不同的是计算属性是基于它们的依赖进行缓存的，只要依赖的值没改变，多次访问计算属性会立即返回之前的计算结果，而函数总是会执行一遍，也就是说计算属性比方法更减少消耗
	
	###watch
	监听数据的变化做出相应的处理，可以监听·data·中的变量或·$route·等，键为观察的对象（为对象路径时需用引号），值为对应的处理，可以为函数、方法名（需用引号）、选项
	为函数或方法名时有2个参数，第一个为当前的值，第二个为改变前的值
	选项可以是一个数组，每个元素为函数或方法名，也可以是一个对象，属性如下：
	!!
	handler{Function/String}：函数或方法名（需用引号）
	deep{Boolean}：是否深度监听（不能监听到对象属性值的变化，数组的值变化可以，若数组包含对象请参考前一句话）
	immediate{Boolean}：是否在监听开始之后被立即调用
	!!
	注意：不应该使用·=>·来定义函数，因为会改变·this·的指向，方法中的·this·本就绑定为 Vue 实例
	··
	var vm = new Vue({
		data: {
			a: 1,
			b: 2,
			c: {
				d: {
					e: 5
				}
			}
		},
		
		methods: {
			someMethod: function (val, oldVal) {
				// do something
			}
		},
		
		// 监听数据，当数据改变时触发
		watch: {
			// 为方法时有2个参数，第一个为当前的值，第二个为改变前的值
			a: function (val, oldVal) {
				console.log('new: %s, old: %s', val, oldVal)
			},
			
			// 方法名，注意需用引号
			b: 'someMethod',
			
			// 深度监听，如果没有 deep 是无法监听 c 的变化的
			c: {
				handler: function (val, oldVal) {
					console.log(val, oldVal)
				},
				deep: true
			},
			
			// 该回调将会在监听开始之后被立即调用
			a: {
				handler: 'someMethod',
				immediate: true
			},
			
			// 可以为一个数组，同时执行多个函数或方法
			b: [
				function (val, oldVal) { /* ... */ },
				'someMethod'
			],
			
			// 为对象路径时需用引号
			'c.d.e': function (val, oldVal) { /* ... */ }
		}
	})
	··
	
	##生命周期
	每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的：
	··
	var vm = new Vue({
	  // 选项
	})
	··
	虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。
	每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。
	注意：不要在选项属性或回调上使用箭头函数，比如·created: () => console.log(this.a)·或·vm.$watch('a', newValue => this.myMethod())·。因为箭头函数是和父级上下文·this·绑定在一起的。
	假设有：
	··
	<div id="web">{{message}}</div>
	
	var vm = new Vue({
		el: '#web'
		data: {
			message: 'msg'
		}
	})
	··
	在控制台打印·vm.$el·为·<div id="web">msg</div>·
	%%
	生命周期,说明
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
	
	#指令
	
	##{{ }}
	数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：
	··
	<span>Message: {{msg}}</span>
	··
	Mustache 标签将会被替代为对应数据对象上 msg 属性的值。无论何时，绑定的数据对象上 msg 属性发生了改变，插值处的内容都会更新
	对于所有的数据绑定都提供了完全的 JavaScript 表达式支持
	··
	{{ number + 1 }}

	{{ ok ? 'YES' : 'NO' }}

	{{ message.split('').reverse().join('') }}
	
	{{ change(message) }}	// 在 methods 中定义了 change 方法

	<div :id="'list-' + id"></div>
	··
	以下情况不会生效
	··
	{{ var a = 1 }}	// 这是语句，不是表达式

	{{ if (ok) { return message } }}	// 流控制也不会生效，需使用三元表达式
	··
	
	##v-text
	更新元素的值，即改变·textContent·，同·{{}}·
	··
	<span v-text="msg"></span>
	// 等同于
	<span>{{msg}}</span>
	··
	
	##v-html
	更新元素的值，即改变·innerHTML·，插入的内容不会作为 Vue 模板进行编译
	注意不要渲染未知的 html ，可能会导致 @[XSS 攻击|https://en.wikipedia.org/wiki/Cross-site_scripting]，比如渲染用户提交的内容
	··
	<div v-html="html"></div>
	··
	
	##v-show
	若绑定的值为·true·不改变，为·false·则·style·设为·display: none;·
	··
	<h1 v-show="ok">Hello!</h1>
	··
	
	##v-if/else/else-if
	^^v-if^^ 根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建
	··
	<h1 v-if="ok">Yes</h1>
	··
	想同时切换多个元素可以使用·<template>·元素来包裹，·<template>·元素是不会渲染的
	··
	<template v-if="ok">
	  <h1>Title</h1>
	  <p>Paragraph 1</p>
	  <p>Paragraph 2</p>
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
	<div v-else-if="type === 'C'"> C </div>
	<div v-else> Not A/B/C </div>
	··
	^^v-show VS v-if：^^·v-if·有更高的切换开销，而·v-show·有更高的初始渲染开销。所以频繁地切换用·v-show·较好，否则用·v-if·
	###用 key 管理可复用的元素
	Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
	··
	<template v-if="loginType === 'username'">
		<label>Username</label>
		<input placeholder="Enter your username">
	</template>
	<template v-else>
		<label>Email</label>
		<input placeholder="Enter your email address">
	</template>
	··
	在上面的代码中切换 loginType 将会保留已输入的内容。因为两个模板使用了相同的元素，<input> 仅仅是替换了它的 placeholder。
	所以添加一个具有唯一值的·key·属性可以表明元素是独立的，无需复用，即每次切换都会清空输入的值
	··
	<template v-if="loginType === 'username'">
		<label>Username</label>
		<input placeholder="Enter your username" key="username-input">
	</template>
	<template v-else>
		<label>Email</label>
		<input placeholder="Enter your email address" key="email-input">
	</template>
	··
	
	##v-for
	根据一组数组的选项列表进行渲染，写法有：
	!!
	item in array：array 为源数据，item 代表源数据的每一项
	item of array：同上，另一种写法
	(item, index) in array：index 为当前项的索引
	(value, key, index) in object：当循环对象时 item 作为键值，index 作为键名，第 3 个为当前项的索引
		注意在遍历对象时，是按·Object.keys()·的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的
	!!
	··
	<div v-for="item in array"></div>
	<div v-for="item of array"></div>
	<div v-for="(item, index) in array"></div>
	<div v-for="(value, key, index) in object"></div>
	··
	###key
	为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。说白了就是更高效，如果遍历输出的 DOM 内容比较简单或者就是要高性能不加也行
	··
	<div v-for="item in items" :key="item.id">{{item.name}}</div>
	··
	###组件的 v-for
	当在组件中使用 v-for 时，key 现在是必须的。
	循环的数据不会被自动传递到组件里，因为组件有自己独立的作用域，这更有利于组件的重复使用，所以需要用·props·：
	··
	<my-component v-for="(item, index) in items" :item="item" :index="index" :key="item.id" ></my-component>
	··
	###v-for with v-if
	当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。
	··
	<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>
	··
	如果是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 <template>)上。如：
	··
	<ul v-if="todos.length">
		<li v-for="todo in todos">{{ todo }}</li>
	</ul>
	<p v-else>No todos left!</p>
	··
	###数组更新检测
	能改变原数组触发视图更新的方法有7个：·push()·、·pop()·、·shift()·、·unshift()·、·splice()·、·sort()·、·reverse()·
	比如：·vm.arr.push({message: 'msg'})·
	当用返回新数组的方法时，比如·slice()·、·filter()·等，可以用新数组替换旧数组
	比如：·vm.arr = vm.arr.filter(item => item.message.match(/Foo/))·
	重新替换数组并不会丢弃现有 DOM 重新渲染整个列表，Vue 仍会高效的重用，请放心食用
	###js限制
	由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
	!!
	利用索引直接设置一个项时，例如：vm.items[1] = 'x'
	修改数组的长度时，例如：vm.items.length = 2
	!!
	第一类问题可以用·splice()·方法代替：·vm.items.splice(index, 1, newValue)·
	也可以用·Vue.set·：·Vue.set(vm.items, index, newValue)·
	或·vm.$set·：·vm.$set(vm.items, index, newValue)·
	还有 Vue 不能检测对象属性的添加或删除：
	··
	var vm = new Vue({
		data: {
			userInfo: {
				name: 'a'
			}
		}
	})
	vm.userInfo.age = 22 // 不是响应式的
	··
	也需要用·Vue.set·：·Vue.set(vm.userInfo, 'age', 22)·
	或·vm.$set·：·vm.$set(vm.userInfo, 'age', 22)·
	需要添加多个对象可以用·Object.assign()·方法，注意这样写是无效的：
	··
	Object.assign(vm.userInfo, {
		age: 27,
		favoriteColor: 'Vue Green'
	})
	··
	这是浅拷贝，所以应该这样：
	··
	vm.userInfo = Object.assign({}, vm.userInfo, {
		age: 27,
		favoriteColor: 'Vue Green'
	})
	··
	即给·vm.userInfo·赋值一个新对象，或者深拷贝赋值：
	··
	var obj = JSON.parse(JSON.stringify(vm.userInfo))
	obj.age = 27,
	obj.favoriteColor = 'Vue Green'
	vm.userInfo = obj
	··
	###显示过滤/排序结果
	有时想要显示一个数组的过滤或排序副本可以使用计算属性：
	··
	<li v-for="n in evenNumbers">{{ n }}</li>
	
	data: {
		numbers: [ 1, 2, 3, 4, 5 ]
	},
	computed: {
		evenNumbers: vm => vm.numbers.filter(number => number % 2 === 0)
	}
	··
	在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 可以使用 method 方法：
	··
	<li v-for="n in even(numbers)">{{ n }}</li>
	methods: {
		even: arr => arr.filter(number => number % 2 === 0)
	}
	··
	###一段取值范围的 v-for
	··
	<span v-for="n in 10">{{ n }} </span>	// n 为 1-10
	··
	
	##v-on
	绑定事件监听器，可缩写为·@·，用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。支持的修饰符有：
	!!
	.stop：阻止冒泡，调用 event.stopPropagation()
	.prevent：阻止默认行为，调用 event.preventDefault()
	.capture：添加事件侦听器时使用 capture 捕获模式
	.self：事件是从侦听器绑定的元素本身触发时才触发回调
	.keyCode/keyAlias：事件是从特定键触发时才触发回调，比如13代表enter键，可以查看@[keyCode对照表|http://www.t086.com/article/4315]，这通常是比较难记的，所以最常用的按键提供了别名:
		.enter：回车
		.tab：制表
		.delete：删除和退格
		.esc：退出
		.space：空格
		.up：上
		.down：下
		.left：左
		.right：右
		可以通过全局·config.keyCodes·对象自定义按键修饰符别名，比如·Vue.config.keyCodes.f1 = 112·
		也可以使用任意有效按键名转换为短横线隔开的形式来作为修饰符，比如·@keyup.page-down="onPageDown"·
		
		系统修饰键：在按下相应按键时才触发相应事件，比如·@click.ctrl·为·Ctrl + Click·，·@keyup.alt.67·为·Alt + C·
			注意修饰键在于比如·Ctrl·键需要按住再按其他键才会触发，单按·Ctrl·是不会触发的，想要触发就换成keyCode的17
			.ctrl：控制
			.alt：alt
			.shift：shift
			.meta：windows对应⊞，mac对应⌘
		特殊修饰符·.exact·：控制由精确的系统修饰符组合触发的事件，比如:
			@click.ctrl：即使 Alt 或 Shift 被一同按下时也会触发
			@click.ctrl.exact：有且只有 Ctrl 被按下的时候才触发
			@click.exact：没有任何系统修饰符被按下的时候才触发
	.native：监听组件根元素的原生事件
	.once：该事件只触发一次
	.left：点击鼠标左键时触发
	.right：点击鼠标右键时触发
	.middle：点击鼠标中键时触发
	.passive：以 { passive: true } 模式添加侦听器，此模式会忽略 event.preventDefault() 行为
	!!
	注意使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用·v-on:click.prevent.self·会阻止所有的点击，而·v-on:click.self.prevent·只会阻止对元素自身的点击。
	··
	<!-- 方法处理器 -->
	<button v-on:click="doThis"></button>

	<!-- 内联语句 -->
	<button v-on:click="doThat('hello', $event)"></button>

	<!-- 缩写 -->
	<button @click="doThis"></button>

	<!-- 停止冒泡 -->
	<button @click.stop="doThis"></button>

	<!-- 阻止默认行为 -->
	<button @click.prevent="doThis"></button>

	<!-- 阻止默认行为，没有表达式 -->
	<form @submit.prevent></form>

	<!--  串联修饰符 -->
	<button @click.stop.prevent="doThis"></button>

	<!-- 键修饰符，键别名 -->
	<input @keyup.enter="onEnter">

	<!-- 键修饰符，键代码 -->
	<input @keyup.13="onEnter">

	<!-- 点击回调只会触发一次 -->
	<button v-on:click.once="doThis"></button>

	<!-- 对象语法 (2.4.0+) -->
	<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
	
	<!-- 在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器) -->
	<my-component @my-event="handleThis"></my-component>

	<!-- 内联语句 -->
	<my-component @my-event="handleThis(123, $event)"></my-component>

	<!-- 组件中的原生事件 -->
	<my-component @click.native="onClick"></my-component>
	··
	###为什么在 HTML 中监听事件?
	Vue 的事件处理都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。
	扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
	纯粹的逻辑，和 DOM 完全解耦，更易于测试。
	当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。
	
	##v-bind
	动态地绑定一个或多个特性，或一个组件 prop 到表达式，可以缩写为·:·
	在绑定 class 和 style 时，如果是包含键值对的对象，字符串的键可以不用引号，但使用了连字符必须要用引号。·v-bind:class·指令也可以与普通的 class 属性共存。style 的键可以使用驼峰式，编译时会自动转换。
	当·v-bind:style·使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
	style 还可以绑定多重值，通常用于前缀中，这样只会渲染数组中最后一个被浏览器支持的值。
	··
	<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
	··
	在绑定 prop 时，prop 必须在子组件中声明。
	没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
	支持的修饰符有：
	!!
	.prop：被用于绑定 DOM 属性 (property)
	.camel：将用短横线连接的特性名转换为驼峰式
	.sync：语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器
	!!
	··
	<!-- 绑定一个属性 -->
	<img v-bind:src="imageSrc">

	<!-- 缩写 -->
	<img :src="imageSrc">

	<!-- 内联字符串拼接 -->
	<img :src="'/path/to/images/' + fileName">

	<!-- class绑定 -->
	<div :class="{ red: isRed }"></div>	// red 是否存在取决于 isRed 的真假
	<div :class="{ red: isRed }" class="blue"></div>	// 共存
	<div :class="[classA, classB]"></div>
	<div :class="[classA, { classB: isB, classC: isC }]">

	<!-- style绑定 -->
	<div :style="{ fontSize: size + 'px' }"></div>
	<div :style="[styleObjectA, styleObjectB]"></div>

	<!-- 绑定一个有属性的对象 -->
	<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

	<!-- 通过 prop 修饰符绑定 DOM 属性 -->
	<div v-bind:text-content.prop="text"></div>

	<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
	<my-component :prop="someThing"></my-component>

	<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
	<child-component v-bind="$props"></child-component>

	<!-- XLink -->
	<svg><a :xlink:special="foo"></a></svg>
	
	<!-- .camel 可将属性名称驼峰化，在使用字符串模板或通过 vue-loader/vueify 编译时，无需使用 .camel -->
	<svg :view-box.camel="viewBox"></svg>
	··
	
	##v-model
	在表单控件或者组件上创建双向绑定。适用的组件有：·<input> <select> <textarea> components·
	··
	<input v-model="searchText"/>
	// 等同于
	<input :value="searchText" @input="searchText=$event.target.value"/>
	··
	支持的修饰符有：
	!!
	.lazy：取代 input 改为 change 事件
	.number：输入字符串转为数字类型，因为即使·type="number"·也是返回字符串
	.trim：输入首尾空格过滤
	!!
	注意·v-model·会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。应在 data 选项中声明初始值。
	·v-model·不会更新需要拼写语言的过程，如果需要就用·input·事件
	··
	<!-- 多个复选框，绑定到同一个数组 -->
	<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
	<label for="jack">Jack</label>
	<input type="checkbox" id="john" value="John" v-model="checkedNames">
	<label for="john">John</label>
	<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
	<label for="mike">Mike</label>
	<br>
	<span>Checked names: {{ checkedNames }}</span>
	// 只要该复选框被选中，它的value就会出现在 checkedNames 中，否则会自动删除
	data: {
    checkedNames: []
	}
	
	<!-- 单选 -->
	<input type="radio" id="one" value="One" v-model="picked">
	<label for="one">One</label>
	<br>
	<input type="radio" id="two" value="Two" v-model="picked">
	<label for="two">Two</label>
	<br>
	<span>Picked: {{ picked }}</span>
	// picked 为选择的值
	data: {
    picked: ''
	}
	
	<!-- 下拉框单选 -->
	<select v-model="selected">
		<option disabled value="">请选择</option>
		<option>A</option>
		<option>B</option>
		<option>C</option>
	</select>
	<span>Selected: {{ selected }}</span>
	// selected 为选择的 option 值，如果 option 有 value 就取 value 的值，没有就取选项文本的值
	data: {
    selected: ''
	}
	// 如果 v-model 的初始值未能匹配任何选项，在 iOS 中会无法选择第一个选项，所以推荐提供一个值为空的禁用选项
	
	<!-- 下拉框多选 -->
	<select v-model="selected" multiple>
		<option>A</option>
		<option>B</option>
		<option>C</option>
	</select>
	<br>
	<span>Selected: {{ selected }}</span>
	
	data: {
    selected: []
	}
	··
	###复选框
	··
	<input type="checkbox" v-model="toggle" true-value="yes" false-value="no">
	
	vm.toggle === 'yes'	// 当选中时
	vm.toggle === 'no'	// 当没有选中时
	··
	这里的·true-value·和·false-value·特性并不会影响输入控件的 value 特性，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(比如“yes”或“no”)，请换用单选按钮。
	###单选框
	··
	<input type="radio" v-model="pick" v-bind:value="a">

	vm.pick === vm.a	// 当选中时
	··
	
	##v-pre
	跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。
	··
	<span v-pre>{{这个元素将保持现在的样子，不会被编译}}</span>
	··
	
	##v-cloak
	和 CSS 规则如·[v-cloak] { display: none }·一起用，可以隐藏未编译的 Mustache 标签直到实例准备完毕。
	··
	[v-cloak] {
		display: none;
	}
	// 这个元素在 vue 实例准备好后才会显示
	<div v-cloak>{{ message }}</div>
	··
	
	##v-once
	只渲染元素或组件一次。随后的重新渲染将被视为静态内容并跳过。这可以用于优化更新性能。
	··
	<span v-once>This will never change: {{msg}}</span>
	··
	
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
	
	##列表的交错过渡
	
	
	&2018.7.25
	`
}