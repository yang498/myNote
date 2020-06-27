<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# vue

## 介绍

本文档基于 Vue 2.x
轻量级的 MVVM 框架，吸收了 angular 和 react 的优点，因为是国人开发，所以中文支持友好，方便学习
特点：数据驱动视图，响应式，组件式，能构建方便的单页应用
本文档使用·vm·(ViewModel) 这个变量名表示 Vue 实例来做示例

### 安装

Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性

·<script>·引入

··html
<script src="https://vuejs.org/js/vue.js">&lt;/script>
<script src="https://vuejs.org/js/vue.min.js">&lt;/script>
··

npm

··bash
npm i vue
··

#### 调试工具

在浏览器上安装 [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) 以方便审查和调试 Vue 应用

#### 命令行工具

快速搭建单页应用的脚手架 [Vue CLI](https://cli.vuejs.org/zh/guide/)，全局安装：

··bash
npm i vue-cli -g
··

安装后在命令行输入 vue 可以看到相应的命令，比如初始化：

··bash
vue init <project>
··

使用 scss 需安装·sass-loader·（依赖于·node-sass·）：

··bash
npm i node-sass -D
npm i sass-loader -D
··

## 选项

### el

Vue 实例的挂载元素，只在由·new·创建的实例中使用，可以是 CSS 选择器或 HTMLElement 实例
注意只能挂载一个目标元素，不能是多个元素
在实例挂载之后，元素可以用·vm.$el·访问
如果在实例化时不填写这个选项，也可显式调用·vm.$mount(el)·
注意：挂载的元素会被 Vue 生成的 DOM 替换，因此不推荐挂载到·<html>·或者·<body>·上

### 数据

!!
data：数据对象，Vue 将会递归将·data·的属性转换为·getter/setter·，从而让·data·的属性能够响应数据变化
methods：方法对象，不应该使用·=>·来定义函数，因为会改变·this·的指向，方法中的·this·本就绑定为 Vue 实例
computed：计算属性，根据其他数据的变化而生成对应的数据
    虽然使用方法返回值也能得到相同的结果，但函数总是会执行一遍，所以计算属性会更减少消耗
watch：监听属性，监听数据变化时执行某些操作
!!

Vue 实例代理了数据对象上所有的属性和方法，例如访问·vm.a·等价于访问·vm.$data.a·
注意以·_·或·$·开头的属性不会被代理，因为可能会和 Vue 内置的属性或方法冲突，可以用如·vm.$data._xxx·访问

#### methods

··js
// <button @click="greet">Greet</button>

var vm = new Vue({
    el: 'button',
    methods: {
        greet: function (e) {
            alert(e.target.tagName)
        }
    }
})
··

如果不传参数例如上面的·@click="greet"·，在方法中默认第一个参数即为事件对象
如果加了括号或参数例如·@click="greet()"·或·@click="greet('msg')"·，是没有事件对象的
此时可以用特殊变量·$event·作为事件对象参数，且不限参数位置，例如·@click="warn('msg', $event)"·

### 生命周期

%%
| 钩子 | 说明 |
| :-: | :- |
| beforeCreate | 实例刚被创建，在属性创建之前，即·el·和数据未初始化 |
| created | 实例创建完成，进行了数据观测、属性和方法的运算、·watch/event· 事件回调，即有数据，无·el· |
| beforeMount | 模板编译/挂载之前，即完成了·el·和数据的初始化，但未渲染值，即·<div>{{ message }}</div>· |
| mounted | 模板编译/挂载之后，渲染完毕，·el·被新创建的·vm.$el·替换，即·<div>msg</div>· |
| beforeUpdate | 组件更新之前，即执行·vm.message = 'change'·后、虚拟 DOM 重新渲染前触发 |
| updated | 组件更新之后，即执行·vm.message = 'change'·后、虚拟 DOM 重新渲染后触发触发 |
| activated | ·<keep-alive>·组件激活时 |
| deactivated | ·<keep-alive>·组件移除时 |
| beforeDestroy | 实例销毁前，即执行·vm.$destroy()·后、真正销毁前触发 |
| destroyed | 实例销毁后，即执行·vm.$destroy()·后、真正销毁后触发 |
| errorCaptured | 当捕获一个来自子孙组件的错误时被调用 |
%%

![600](https://cn.vuejs.org/images/lifecycle.png)

### 和组件的顺序

假设有 App.vue，通过·import·和·components·使用了 hello.vue，通过·<router-view>·使用了 foo.vue，打印顺序如下：

··js
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

可以看出：·import·的方式在实例挂载前组件就已全部加载完毕，·<router-view>·的方式属于异步加载则在后面

#### 注意

Vue 组件页面产生进程就算组件页面切换了也不会结束
例如在组件页面中写了定时器，在切换到其他页面之后还是会触发，所以要注意清除定时器，不然再次访问会重复添加定时器
因为页面每次会重新运行而 js 进程是不会终止的

## 指令

### {{ }} / v-text

文本插值：

··html
<span>Message: {{ message }}</span>
<span>{{ number + 1 }}</span>
<span>{{ ok ? 'YES' : 'NO' }}</span>
<span>{{ message.split('').reverse().join('') }}</span>
<span>{{ change(message) }}</span> <!-- 在 methods 中定义了 change 方法 -->
··

以下情况不会生效

··html
{{ var a = 1 }} <!-- 这是语句，不是表达式 -->
{{ if (ok) { return message } }} <!-- 流控制也不会生效，需使用三元表达式 -->
··

·v-text·等同于·{{}}·

··html
<span v-text="msg"></span>
<!-- 等同于 -->
<span>{{ msg }}</span>
··

### v-html

更新 html，即改变·innerHTML·，插入的内容不会作为 Vue 模板进行编译
注意避免渲染未知的 html ，可能会导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)，例如渲染用户提交的内容

··html
<div v-html="html"></div>
··

### v-show

若绑定的值为·true·则保持元素本来的·display·值，值为·false·则设为·display: none;·

··html
<h1 v-show="ok">Hello!</h1>
··

### v-if / else / else-if

是否渲染元素，在切换时元素和其数据都将被销毁并重建

··html
<h1 v-if="ok">Yes</h1>
··

切换多个元素可以使用·<template>·元素来包裹，·<template>·元素不会被渲染

··html
<template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph</p>
</template>
··

**v-else** 元素必须紧跟在带·v-if·或者·v-else-if·的元素的后面，否则它将不会被识别

··html
<div v-if="Math.random() > 0.5">Now you see me</div>
<div v-else>Now you don't</div>
··

**v-else-if** 类似于·v-else·，也必须紧跟在带·v-if·或者·v-else-if·的元素之后

··html
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else> Not A/B </div>
··

#### v-show VS v-if

·v-if·有更高的切换开销，·v-show·有更高的初始渲染开销。所以频繁地切换用·v-show·较好，否则用·v-if·

### key

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
所以添加一个具有**唯一值**的·key·属性可以表明元素是独立的，无需复用，即每次切换都重新渲染
也可用于刷新任何元素或组件

··html
<input placeholder="username" key="username-input" v-if="loginType === 'username'">
<input placeholder="email address" key="email-input" v-else>
··

### v-for

根据数据进行列表渲染

··html
<div v-for="item in array"></div> <!-- array 为源数据，item 代表源数据的每一项 -->
<div v-for="item of array"></div> <!-- 同上，另一种写法 -->
<div v-for="(item, index) in array"></div> <!-- index 为当前项的索引值 -->
<div v-for="(value, key, index) in object"></div> <!-- 循环对象时 item 为键值，key 为键名，index 为当前项的索引 -->
··

可以加上·key·属性可重用和重新排序现有元素，让渲染更高效（当在组件中使用·v-for·时为了高效·key·是必须的）

··html
<div v-for="item in items" :key="item.id">{{item.name}}</div>
··

·v-for·的优先级比·v-if·更高，所以·v-if·每次循环都会判断

··html
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>
··

#### 一段取值范围的 v-for

··html
<span v-for="n in 10">{{ n }} </span> <!-- n 为 1-10 -->
··

### 数组更新检测

能改变原数组触发视图更新的方法有 7 个：·push·、·pop·、·shift·、·unshift·、·splice·、·sort·、·reverse·
当用返回新数组的方法时，例如·filter·可以用新数组替换旧数组：·vm.arr = vm.arr.filter(item => item)·

#### js 的限制无法检测数组

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

#### js 的限制无法检测对象

!!
利用键名直接设置键值时，例如·vm.userInfo.age = 22·
!!

代替方案：

!!
vm.$set：·vm.$set(vm.items, key, newValue)·
Vue.set：·Vue.set(vm.items, key, newValue)·
!!

需要添加多个对象可以用·Object.assign()·或扩展运算符等

··js
vm.userInfo = Object.assign({}, vm.userInfo, { age: 27 })
// 或
vm.userInfo = { ...vm.userInfo, age: 27 }
··

### v-on / @

绑定事件监听器，可缩写为·@·，可监听原生 DOM 事件或自定义元素组件上的自定义事件。支持的修饰符：

!!
.stop：阻止冒泡，调用·event.stopPropagation()·
.prevent：阻止默认行为，调用·event.preventDefault()·
.capture：添加事件侦听器时使用·capture·捕获模式
.self：事件是从侦听器绑定的元素本身触发时才触发回调
.native：监听子组件根元素的原生事件
.once：该事件只触发一次
.left：点击鼠标左键时触发
.right：点击鼠标右键时触发
.middle：点击鼠标中键时触发
.passive：提升移动端的性能，此模式会忽略·event.preventDefault()·行为
<keyCode>：事件是从特定键触发时才触发回调，例如 13 代表 enter 键
    常用的按键别名：·enter tab delete esc spac up down left right·
    自定义别名：使用全局·config.keyCodes·对象，例如·Vue.config.keyCodes.f1 = 112·
    按键名（多单词用 - 连接）：例如·@keyup.page-down="onPageDown"·
    系统修饰键：按住按键时才触发事件，例如·@click.ctrl·为·Ctrl + Click·，·@keyup.alt.67·为·Alt + C·
        常用的系统修饰键别名：·ctrl alt shift meta（windows 对应 ⊞，mac 对应 ⌘）·
    特殊修饰符·.exact·：控制由精确的系统修饰符组合触发的事件，例如：
        @click.ctrl：即使·Alt·或·Shift·被一同按下时也会触发
        @click.ctrl.exact：有且只有·Ctrl·被按下的时候才触发
        @click.exact：没有任何系统修饰符被按下的时候才触发
    注意修饰符顺序，例如·@click.prevent.self·阻止所有点击，·@click.self.prevent·只阻止对元素自身的点击
!!

··html
<button @click="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!-- 按下 enter 触发 -->
<input @keyup.13.108="onEnter">

<!-- 对象语法（不能缩写成 @ 且不支持修饰符） -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
··

### v-bind / :

动态绑定数据，可缩写为·:·，支持的修饰符：

!!
.prop：直接绑定在元素对象上而不是元素的属性对象上，即不会出现在渲染后的标签里
.camel：将短横线连接的属性转换为驼峰式，例如 SVG 的·viewBox·可写成·:view-box.camel·，不然默认渲染成小写
.sync：语法糖，会扩展成一个更新父组件绑定值的·v-on·侦听器，详细说明见下面的 **组件 - $emit()**
!!

··html
<img :src="imageSrc">

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div> <!-- red 是否存在取决于 isRed 的真假 -->
<div :class="{ red: isRed }" class="blue"></div> <!-- 可和 class 共存 -->
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 批量绑定（不能缩写成 :） -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
··

### v-model

双向绑定，适用于·<input> <select> <textarea>·和自定义组件

··html
<!-- 文本框 -->
<input type="text" v-model="value"/>
<!-- 等同于 -->
<input :value="value" @input="value=$event.target.value"/>

<!-- 多选框 -->
<input type="text" v-model="value"/>
<!-- 等同于 -->
<input type="checkbox" :checked="checked" @change="$event.target.checked"/>
··

支持的修饰符：

!!
.lazy：将·input·改为·change·事件
.number：值转为数字类型，因为即使·type="number"·也是返回字符串
.trim：值的首尾空格过滤
!!

··html
<!-- 多选 checked: [] -->
<input type="checkbox" value="A" v-model="checked"> A
<input type="checkbox" value="B" v-model="checked"> B

<!-- 单选 picked: '' -->
<input type="radio" value="A" v-model="picked"> A
<input type="radio" value="B" v-model="picked"> B

<!-- 下拉单选 selected: '' -->
<select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
</select>

<!-- 下拉多选 selected: [] -->
<select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
</select>
··

注意如果·v-model·的初始值未匹配任何选项，在 iOS 中会无法选择第一项，所以推荐提供空值（如请选择）的禁用选项

### 其他

!!
v-pre：不绑定数据
v-cloak：隐藏未编译的·{{}}·标签直到实例准备完毕，和 CSS 例如·[v-cloak] { display: none }·一起用
v-once：只渲染一次，可以用于优化更新性能
!!

## 组件

### 全局注册

参数和·new Vue·时基本相同，不同的是·el·选项换成·template·模板，组件模板同样只能有一个根元素
且·data·是个函数，这样多次复用时数据才是独立的，如果只是一个对象，那么多个同样的组件之间数据会造成引用，即是共用的

··js
// 定义一个名为 button-counter 的新组件，或使用驼峰法 buttonCounter：
Vue.component('button-counter', {
    template: '<button @click="count++">You clicked me {{ count }} times.</button>',
    data () {
        return {
            count: 0
        }
    }
})

// 直接在 Vue 中使用，可以多次复用
// <button-counter></button-counter>
// <button-counter></button-counter>
··

### 局部注册

通过对象定义组件：

··js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

// 然后在 components 选项定义组件，属性名就是组件名，属性值就是局部组件
new Vue({
    el: '#app'
    components: {
        'component-a': ComponentA,
        'component-b': ComponentB,
    }
})
··

### props

使用·props {Array/Object}·可以给组件传值

··js
Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})

// 定义的 title 属性即传给组件的值
// <blog-post title="My journey with Vue"></blog-post>
··

注意 html 中是不区分大小写的，所以如果·props·是·postTitle·，则在使用时需改成·post-title·：

··html
<!-- props: ['postTitle'] -->
<blog-post post-title="My journey with Vue"></blog-post>
··

#### 类型

一般以字符串数组的方式列出 prop：

··js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
··

也可以用对象的形式指定值类型，可选·String/Number/Boolean/Array/Object/Date/Function/Symbol/null(任意类型)·

··js
props: {
    title: String,
    author: [String, Number], // 用数组表示多类型
    content: {  // 用对象指定属性
        type: String, // 类型（不声明即是 null）
        required: true, // 是否必填
        default: '空', // 默认值
        default: () => [], // 对象或数组默认值必须以函数返回
        validator: value => ['success', 'error'].indexOf(value) > -1, // 返回 Boolean 值的验证函数
    }
}
··

#### 单向数据流

父子 prop 之间形成了一个单向下行绑定，子组件不应直接改变·props·的值，可以通过用新的值接收代理：

··
props: ['initialCounter', 'show'],
data () {
    return {
        // 只接收
        counter: this.initialCounter
    }
},
computed: {
    // 用新值接收并改变，外部需使用 .sync 修饰符进行同步
    showCopy: {
        get () {
            return this.show
        },
        set (val) {
            this.$emit('update:show', val)
        }
    }
}
··

#### 替换/合并已有的特性

··js
Vue.component('blog-post', {
    template: '<span class="demo" message="hhh">demo</span>'
})

// html
// <blog-post class="active" message="hello"></blog-post>

// 渲染结果是 class 和 style 会合并，其他属性会覆盖组件的
// <blog-post class="demo active" message="hello"></blog-post>
··

如果不希望组件的属性被覆盖，可以在组件的选项中设置·inheritAttrs: false·，不影响·class·和·style·的合并

··js
Vue.component('blog-post', {
    inheritAttrs: false
})
··

#### 传递属性

传递未在·props·声明的属性，默认渲染为组件根元素的属性，通过使用·v-bind="$attrs"·可指定渲染到哪个元素或嵌套组件：
如果传递的属性内部已存在将无法覆盖，即是个补漏的
同样传递事件使用·v-on="$listeners"·，适用于对原生元素或组件的二次封装

··js
Vue.component('base-input', {
    props: ['label', 'value'],
    template: \`
        <label>
        {{ label }}
        <input
            v-bind="$attrs"
            :value="value"
            @:input="$emit('input', $event.target.value)"
        >
        </label>
    \`
})

// 直接使用 placeholder 给内部的 input 属性
// <base-input v-model="username" placeholder="Enter your username"></base-input>
··

### $emit()

当组件向外部传值时需通过·$emit()·自定义事件，第二个之后的参数代表要传递的参数：

··js
Vue.component('blog-post', {
    template: \`<button @click="$emit('welcome', 20, 30)">Click me to be welcomed</button>\`
})

// <blog-post @welcome="fz = $event"></blog-post> // 通过 $event 可快速访问第一个参数 20
// <blog-post @welcome="(f1, f2) => fz = f1"></blog-post> // 定义函数
··

注意不同于组件名和·props·，事件名不会进行大小写转换，传什么就是什么，即·$emit('myEvent')·就使用·@myEvent·接收

#### 在组件上使用 v-model

··js
Vue.component('custom-input', {
    props: ['value'],
    template: \`<input :value="value" @input="$emit('input', $event.target.value)" />\`
})

// <custom-input v-model="searchText"></custom-input>
data: {
    searchText: ''
}
··

一个组件上的·v-model·默认会利用名为·value·的 prop 和名为·input·的事件
但是像单选框、复选框等类型的输入控件可能会将·value·特性用于不同的目的，使用·model·选项可以用来避免这样的冲突

··js
Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: \`
        <input
            type="checkbox"
            :checked="checked"
            @:change="$emit('change', $event.target.checked)"
        >
    \`
})
··

#### 将原生事件绑定到组件

在一个组件的根元素上监听一个原生事件可使用·.native·修饰符：

··html
<base-input @focus.native="onFocus"></base-input>
··

·<base-input>·渲染的是个·<input>·倒没问题，但若做了如下重构：

··html
<label>
  {{ label }}
  <input :value="value" @input="$emit('input', $event.target.value)">
</label>
··

这时监听的是·<label>·元素，所以不会触发·focus·事件
使用·v-on="$listeners"·可以将事件指向指定的元素或嵌套组件，和·props·的·$attrs·对应，此时也无需·.native·修饰符
传递的·$listeners·不存在覆盖，因为事件就是可以多次监听的

··js
Vue.component('base-input', {
    props: ['label', 'value'],
    template: \`
        <label>
            {{ label }}
            <input :value="value" @input="$emit('input', $event.target.value)" v-on="$listeners">
        </label>
    \`
})

// <base-input @focus="onFocus"></base-input>
··

#### .sync 修饰符

如果需要对一个 prop 进行双向绑定，推荐·update:myPropName·的模式

··js
this.$emit('update:title', newTitle)
··

然后父组件可以监听那个事件·update:title·更新数据属性。例如：

··html
<text :title="doc.title" @update:title="doc.title = $event"></text>
··

所以有个缩写，即·.sync·修饰符

··html
<text :title.sync="doc.title"></text>
··

也支持用一个对象同时设置多个 prop：·v-bind.sync="doc"·
注意带有·.sync·修饰符不能和表达式一起使用，例如·:title.sync="doc.title + '!'"·无效
以字面量对象例如·v-bind.sync="{ title: doc.title }"·也无效，因为这种解析起来比较复杂，有很多边缘情况需要考虑

### slot----

和 HTML 元素一样，我们经常需要向一个组件传递 html 内容或嵌套组件
直接给组件标签内添加内容是无效的，需要使用·<slot>·在组件内声明哪里接收：

··js
Vue.component('alert-box', {
    template: \`
        <div class="demo-alert-box">
            <strong>Hello </strong>
            <slot></slot>
        </div>
    \`
})

// 添加文本
// <alert-box>World</alert-box>

// 浏览器中渲染
// <div class="demo-alert-box">
//     <strong>Hello </strong>
//     World
// </div>
··

#### 多个插槽

通过·<slot>·的·name·属性定义名称来使用，可以保留一个未命名插槽作为默认插槽，未定义名称的都会在其中输出：

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

··html
<blog-post>
    <h1 slot="header">这里是 header 内部</h1>
    <h2 slot="header">这里是 header 内部2</h2>

    <p>这里是 main 内部</p>
    <p>这里是 main 内部2</p>

    <p slot="footer">这里是 footer 内部</p>
</blog-post>
··

多个相同的插槽可以使用·<template>·包裹：

··html
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

#### 插槽的默认内容

在·<slot>·元素内添加内容可作为默认内容，如果在使用这个插件时提供了内容将会覆盖默认的，否则就显示默认的：

··html
<button type="submit">
    <slot>Submit</slot>
</button>
··

#### 编译作用域

----

### 动态切换组件

通过 Vue 的·<component>·元素和·is·属性可以切换组件，相当于使用·v-if·：

··html
<component :is="currentTabComponent" class="tab" ></component>
··

### 模板的注意事项

有些 HTML 元素，诸如·<ul> <ol> <table> <select>·，对应的子元素诸如·<li> <tr> <option>·只能出现在特定的元素内部。例如：

··html
<table>
    <blog-post-row></blog-post-row>
</table>
··

·<blog-post-row>·会被作为无效的内容提升到外部，即等同于：

··html
<blog-post-row></blog-post-row>
<table>
</table>
··

此时需要使用原生元素和·is·属性来代替才会正常渲染：

··html
<table>
    <tr is="blog-post-row"></tr>
</table>
··

从字符串模板或单文件组件中使用的话这条限制不存在

## 单文件组件

放在过渡之后

### 介绍

通常在项目中使用·Vue.component·来定义全局组件，这在很多中小规模的项目中运作的很好，但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

!!
全局定义：强制要求每个 component 中的命名不得重复
字符串模板：缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的·\\·
不支持 CSS：意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
没有构建步骤：限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel
!!

而文件扩展名为·.vue·的单文件组件为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

#### 写法

把 html、css、js 写到一个文件中，从而实现对组件的封装， 一个.vue 文件就是一个单独的组件：

··html
<!-- html 部分，使用 <template> 标签包裹，同样使用一个元素来作为根元素 -->
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
&lt;/script>

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

#### 怎么看待关注点分离？
一个重要的事情值得注意，关注点分离不等于文件类型分离。
在现代 UI 开发中，相比于把代码库分离成三大层次文件（html、css、js），把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，使得组件更加内聚且更可维护。
即便你不喜欢单文件组件，你仍然可以把 JavaScript、CSS 分离成独立的文件然后做到热重载和预编译。比如：

··html
<template>
    <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js">&lt;/script>
<style src="./my-component.css"></style>
··

### Vue CLI

（把安装的 CLI 目录说明拿下来，不要冲突了）
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：交互式、快速、零配置、依赖可升级扩展、丰富的插件、图形界面
Vue CLI 分为几个独立的部分：

!!
CLI：一个全局安装的 npm 包，提供了终端里的 vue 命令，包括 vue create、vue serve、vue ui等
CLI 服务：一个开发环境依赖，也是一个 npm 包，局部安装在每个 @vue/cli 创建的项目中，基于 webpack
CLI 插件：提供插件，名字以 @vue/cli-plugin- (内建插件) 或 vue-cli-plugin- (社区插件) 开头
!!

#### 全局安装

··bash
npm i -g @vue/cli
··

安装完成后可以访问·vue·命令，比如·vue -V·

#### 使用命令

创建新项目：

··bash
vue create hello-world
··

然后会提示选取一个 preset。直接按回车将选择默认的包含了基本的 Babel + ESLint 设置的 preset，也可以按上下键选“手动选择特性”来选取需要的特性
如果安装出现这样的错误：

··bash
command failed: npm install --loglevel error --registry=https://registry.npm......
··

可以试试直接使用·cnpm·初始化：

··bash
vue create -r cnpm project-name
··

#### 使用图形化界面

··bash
vue ui
··

上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程

#### 运行

初始化完毕后可在·package.json·中查看可使用的命令：

··js
{
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    }
}
··

在初始化的·README.md·中也可以看到，所以运行项目可使用命令：

··bash
npx vue-cli-service serve
··

或者：

··bash
npm run serve
··

然后在浏览器中打开

··bash
http://localhost:8080/
··

即可访问初始化的·index.html·

### Vue CLI 配置

有两种方式可以对项目进行配置：vue.config.js 和 package.json
vue.config.js 是一个可选的配置文件，没有的话可以自行新建，这个文件应该导出一个包含了选项的对象：

··js
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

··js
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
}
··

可配置的参数有：

!!
baseUrl {String} [/]：运行·npm run build·打包后的引用资源的开头 url 路径
outputDir {String} [dist]：运行·npm run build·打包后的输出路径，注意目标目录在构建之前会被清除（构建时传入 --no-clean 可关闭该行为）
assetsDir {String}：放置生成的静态资源（js、css、img、fonts）的（相对于 outputDir 的）目录
indexPath {String} [index.html]：指定生成的 index.html 的输出路径 (相对于 outputDir)，也可以是一个绝对路径
filenameHashing {Boolean} [true]：通过 Vue CLI 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，如果不想使用带 hash 的 index.html 可设为 false 关闭
pages {Object}：自定义  entry, template, filename, title 和 chunks 的配置
lintOnSave {Boolean}[true]：是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。安装 @vue/cli-plugin-eslint 后生效
runtimeCompiler {Boolean} [false]：是否使用包含运行时编译器的 Vue 构建版本
transpileDependencies {StringArray/RegExpArray}：默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果想通过 Babel 显式转译某依赖，可以在这个选项中列出来
productionSourceMap {Boolean} [true]：如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
crossorigin {String}：设置生成的 HTML 中·<link rel="stylesheet">·和·<script>·标签的·crossorigin·属性
integrity {Boolean} [false]：如果你构建后的文件是部署在 CDN 上的，启用该选项可在生成的 HTML 中的·<link rel="stylesheet">·和·<script>·标签上启用 Subresource Integrity (SRI)以提供额外的安全性
configureWebpack {Object/Function}：webpack 配置方式，参考 @[配合 webpack > 简单的配置方式|https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F]
css：
    modules {Boolean} [false]：css 模块配置方式，参考 @[配合 CSS > CSS Modules|https://cli.vuejs.org/zh/guide/css.html#css-modules]
    extract {Boolean/Object}：是否将组件中的 CSS 提取至一个独立的 CSS 文件中，而不是注入到 JavaScript 中的 inline 代码
    sourceMap {Boolean} [false]：是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    loaderOptions {Object}：向 CSS 相关的 loader 传递选项，参考 @[向预处理器 Loader 传递选项|https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9]
devServer {Object}：所有 webpack-dev-server 的 @[选项|https://webpack.js.org/configuration/dev-server/] 都支持
    proxy {Object/String}：将任何未知请求 (没有匹配到静态文件的请求) 代理到指定地址
parallel {Boolean}：是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
pwa {Object}：向 @[PWA 插件|https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa] 传递选项
pluginOptions {Object}：这是一个不进行任何 schema 验证的对象，可传递任何第三方插件选项
!!

### 初始化项目分析

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

#### public/index.html

该文件是一个会被 @[html-webpack-plugin|https://github.com/jantimon/html-webpack-plugin] 处理的模板，可以看到没有任何的 css 和 js 文件的引入，因此直接将该文件在浏览器中运行是什么都不会发生的，需运行·npm run dev·指令，在构建过程中对应的资源链接会被自动注入，或者运行·npm run build·将项目打包成静态文件后再在浏览器中运行查看

#### src/components/HelloWorld.vue

该组件的有个 msg 的 props 作为标题，在使用该组件时传入 msg，其余都是静态页面

###src/App.vue

该组件作为入口组件

··html
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
        name: 'app',    // 组件名为 app，该选项在单文件中不那么重要了，反正 import 时会重新命名
        components: {   // 声明使用的组件
            HelloWorld
        }
    }
&lt;/script>
··

###src/main.js

··js
import Vue from 'vue'   // 引入 Vue.js，并用 Vue 这个变量表示它
import App from './App.vue' // 引入 App.vue 这个组件，并用 App 这个变量表示它

// 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
    render: h => h(App) // 渲染 App 这个组件，只包含运行时版只能使用渲染函数或包含编译器的构建，参考@[版本说明|https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A]
}).$mount('#app')   // 挂载 el 为 index.html 中的 #app

// 在渲染时 App.vue 中的内容会代替 index.html 中的 <div id="app"></div>
··

## 过渡动画

### 介绍

使用·<transition>·元素可以定义·v-if·、·v-show·和动态组件（·is·）的过渡动画，注意只能包含一个根元素
在进入/离开的过渡中，会有 6 个·class·切换：

!!
v-enter：元素被插入之前的状态
v-enter-active：开始的过渡状态。即定义·transition·
v-enter-to：元素被插入之后的状态

v-leave：元素被移除之前的状态
v-leave-active：移除的过渡状态。即定义·transition·
v-leave-to：元素被移除之后的状态
!!

!./img/js-library/vue02.png,600

### CSS 过渡

可以给·<transition>·声明·name·属性以更换·v·来自定义过渡效果
例如做个淡入淡出，一般元素都是可见的，所以只需定义过渡状态、被插入之前和被移除之后的状态即可：

··html
<button @:click="show = !show"> Toggle </button>
<transition name="fade">
    <p v-if="show">hello</p>
</transition>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
··

### CSS 动画

动画一般只定义·active·，在·keyframes·中定义起始和结束的运动状态

··html
<button @click="show = !show">Toggle show</button>
<transition name="bounce">
    <p v-if="show">hello</p>
</transition>

<style>
.bounce-enter-active {
    animation: bounce-in .5s;
}
.bounce-leave-active {
    animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
    0% { transform: scale(0); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
}
</style>
··

### 自定义类名

通常结合 CSS 动画库使用，定义对应的属性：
·enter-class·插入之前、·enter-active-class·插入的过渡、·enter-to-class·插入之后
·leave-class·离开之前、·leave-active-class·离开的过渡、·leave-to-class·离开之后

··html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
    <button @click="show = !show"> Toggle render </button>
    <transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
        <p v-if="show">hello</p>
    </transition>
</div>
··

### JavaScript 钩子

在属性中声明 JavaScript 钩子，在 methods 中定义对应的方法即可
通常可以结合 JS 动画库例如·Velocity.js·

··html
<transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"

    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
>
    <!-- ... -->
</transition>

// 在 enter 和 leave 中必须使用 done() 结束。否则将同步调用，过渡会立即完成
<srcipt>
methods: {
    beforeEnter(el) { },
    enter(el, done) { done() },
    afterEnter(el) { },
    enterCancelled(el) { },

    beforeLeave(el) { },
    leave(el, done) { done() },
    afterLeave(el) { },
    leaveCancelled(el) { }, // 只用于 v-show 中
}
</srcipt>
··

### 初始渲染过渡

使用·appear·属性可定义组件在初始渲染的过渡（未使用·v-if·或·v-show·）：

··html
// 自定义 CSS 类名
<transition
    appear
    appear-class="custom-appear-class"
    appear-to-class="custom-appear-to-class"
    appear-active-class="custom-appear-active-class"
>
    <!-- ... -->
</transition>

// 自定义 JavaScript 钩子
<transition
    appear
    @before-appear="customBeforeAppearHook"
    @appear="customAppearHook"
    @after-appear="customAfterAppearHook"
    @appear-cancelled="customAppearCancelledHook"
>
    <!-- ... -->
</transition>
··

### 多个元素过渡

使用·v-if/v-else-if/v-else·可以用来定义多个元素过渡。例如一个列表和为空的状态：

··html
<transition>
    <table v-if="items.length > 0">
        <!-- ... -->
    </table>
    <p v-else>Sorry, no items found.</p>
</transition>
··

注意相同的元素之间切换需要加上·key·来保持独立性，否则会因为高效渲染复用而没有过渡：

··html
<transition name="fade">
    <button @click="show=!show" v-if="show" key="on">on</button>
    <button @click="show=!show" v-else key="off">off</button>
</transition>

<transition name="fade">
    <button @click="show=!show" :key="show">{{show ? 'on' : 'off'}}</button>
</transition>
··

### 其他

#### 显性的过渡持续时间

··html
<transition :duration="1000">...</transition>
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
··

#### 过渡模式

多个元素过渡同时生效不能满足所有要求，所以有过渡模式·mode·：

!!
in-out：新元素先过渡进入完，再让当前元素过渡离开
out-in：当前元素过渡完，再让新元素过渡进入
!!

例如·<transition mode="out-in">·

### 列表过渡

使用·<transition-group>·组件可以实现列表过渡，不同于·<transition>·，会默认渲染为一个·<span>·。也可以通过·tag·属性更换为其他元素
注意这个组件不能使用过渡模式·mode·了，且内部元素总是需要提供唯一的·key·属性

#### 列表排序过渡

定义·v-move·的样式会在元素的改变定位的过程中应用过渡，也可以通过·name·属性来自定义前缀

··css
.flip-list-move {
    transition: transform 1s;
}
··

内部的实现是 Vue 使用了一个叫 @[FLIP|https://aerotwist.com/blog/flip-your-animations/] 简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置。
需要注意的是使用 FLIP 过渡的元素不能设置为·display: inline·。作为替代方案，可以设置为·display: inline-block·或者放置于·flex·中
FLIP 动画不仅可以实现单列过渡，@[多维网格也同样可以过渡|https://jsfiddle.net/chrisvfritz/sLrhk1bc/]

#### 列表的交错过渡

通过·data·属性与 JavaScript 通信 ，就可以实现列表的交错过渡

#### 可复用的过渡

将·<transition>·或者·<transition-group>·作为根组件，然后将任何子组件放置在其中就可以了

#### 动态过渡

所有过渡特性都可以动态绑定，通过事件钩子可获取上下文中的所有数据，根据组件的状态不同，过渡也会有不同的表现

### 状态过渡

对于数据元素本身的动效呢也可以过渡，例如：数字和运算、颜色的显示、SVG 节点的位置、元素的大小和其他的属性等等
结合一些动画库即可实现，例如 @[Tween.js|https://github.com/tweenjs/tween.js] 和 @[Color.js|https://github.com/brehaut/color-js]

##  Vue Router

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌

### 安装

直接下载/CDN

··html
<script src="/path/to/vue.js">&lt;/script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js">&lt;/script> // 指向最新
<script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js">&lt;/script> // 指定版本
··

npm

··bash
npm i vue-router
··

注意在模块化项目中使用时（非 script 标签），必须通过 Vue.use() 声明使用路由功能：

··js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
··

### 起步

将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们

··html
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

### 动态路由匹配

参数、响应变化、高级匹配

### 嵌套路由

被渲染组件同样可以包含自己的嵌套 <router-view>，这需要在 VueRouter 的参数中使用 children 配置

··js
const routes = [
    {
        // 以 /¿ 开头的嵌套路径会被当作根路径
        path: '/user/:id',
        component: User,
        children: [
            // 当 /¿user/¿:id/profile 匹配成功，UserProfile 会被渲染在 User 的 <router-view> 中
            { path: 'profile', component: UserProfile },
            // 当访问 /user/:id 时还没有匹配到子路由，所以 <router-view> 还不会渲染，可以提供一个空的子路由在匹配 /user/:id 成功时即渲染
            { path: '', component: UserHome }
        ]
    }
]
··

### 编程式的导航

··js
router.push(location{String/Object}, onComplete?, onAbort?) // 产生历史纪录
router.replace(location, onComplete?, onAbort?) // 不产生历史纪录
router.go(n) // 前进或后退多少步
router.push('user') // 路径
router.push({ name: 'user', params: { userId: '123' }})
router.push({ path: 'register', query: { plan: 'private' }})
router.push({ path: '/user', params: { userId }}) // path 不能和 params 一起写
router.push({ path: \`/user/\${userId}\` }) // path 需和 params 写成完整路径才有效
··

### 命名多视图

··html
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
 
### 重定向

··js
routes: [{ path: '/a', redirect: '/b' }] // path
routes: [{ path: '/a', redirect: { name: 'foo' }}] // name
routes: [{ path: '/a', redirect: to => { }}] // 以目标路由作为参数，return 要重定向的字符串路径或路径对象
··

### 别名

··js
/a 的别名是 /b，即当访问 /b 时 URL 不变，返回的结果仍是 /a
routes: [{ path: '/a', component: A, alias: '/b' }]
··

路由组件传参：路由的值作为参数组件

HTML5 History 模式：vue-router 默认使用 hash 模拟完整路径的模式，使用 history 模式就像正常的 url，这需要后台的配置支持

### 导航守卫

路由在跳转时的一些监听函数

··js
router.beforeEach((to, from, next) => { }) // 全局前置守卫，导航之前
router.beforeResolve((to, from, next) => { }) // 全局解析守卫，目标组件被调用后
router.afterEach((to, from) => { }) // 全局后置钩子，导航确认后， DOM 更新前
routes: [{ path: '/foo', component: Foo, beforeEnter: (to, from, next) => { } } ] // 路由独享的守卫，还有 beforeRouteUpdate、beforeRouteLeave
··

路由元信息：定义路由的时候可以配置 meta 字段

过渡动效：可以用 <transition> 组件给 <router-view> 添加一些过渡效果

数据获取：一般在组件生命周期钩子中获取数据，获取期间显示加载中，也可以在导航之前获取数据成功后执行导航

### 滚动行为

··js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) { // savedPosition 通过浏览器的前进/后退按钮触发时才可用
    // return 期望滚动到哪个的位置
  }
})
··

### 路由懒加载

把不同路由对应的组件分割成不同的代码块，当被访问的时候才加载对应组件
将异步组件定义为返回一个 Promise 的工厂函数，在 Webpack 2 中可以使用动态 import 语法来定义代码分块点

## Vuex

把组件的共享状态抽取出来，以一个全局单例模式管理呢
在这种模式下，组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为
通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护
适用于大型单页应用，如果应用够简单最好不要使用 Vuex，一个简单的 store 模式就够了

### store 仓库

和单纯的全局对象的不同点：
Vuex 的状态存储是响应式的，若状态发生变化，相应的组件也会更新
不能直接改变 store 中的状态，只能提交 (commit) mutation。这样可以跟踪状态的变化，从而能够实现一些工具更好地了解应用

### 安装

直接下载/CDN

··html
<script src="/path/to/vue.js">&lt;/script>
<script src="https://unpkg.com/vuex">&lt;/script> // 指向最新
<script src="https://unpkg.com/vuex@2.0.0">&lt;/script> // 指定版本
··

NPM

··bash
npm i vuex
··

注意在模块化项目中使用时（非 script 标签），必须通过 Vue.use() 声明使用路由功能：

··js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
··

Vuex 依赖 Promise，如果你支持的浏览器并没有实现 Promise (比如 IE)，可以使用一个 polyfill 的库，例如 es6-promise

··html
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js">&lt;/script>
npm install es6-promise --save
import 'es6-promise/auto' // 使用 Vuex 之前
··

### 起步

··js
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

··js
const app = new Vue({ store }).$mount('#app')
··

该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到

### State

Vuex 使用单一状态树，用一个对象包含全部的应用层级状态
在 Vue 组件中获得 Vuex 状态
mapState 辅助函数：当一个组件需要获取多个状态时，都声明为计算属性会有些重复和冗余，可以使用 mapState 帮助生成计算属性

@@
[官方文档](https://cn.vuejs.org/v2/guide/)
[Vue Router](https://router.vuejs.org/zh/)
[Vuex](https://vuex.vuejs.org/zh/)
[Vue SSR](https://ssr.vuejs.org/zh/)
[Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)
[Vue CLI](https://cli.vuejs.org/zh/guide/)
[Vue Loader](https://vue-loader.vuejs.org/zh/)
[周边资源](https://github.com/vuejs/awesome-vue)
@@

&2018/9/13
            `
        }
    }
}
</script>
