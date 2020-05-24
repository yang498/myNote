<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# object

## 概述

### 键名命名规范

若省略引号则不能包含空格或运算符
以数字开头和非数字字符的组合须加上引号

··js
// 报错
var obj = {
    1p: 'Hello World'
}

// 不报错
var obj = {
    20: 'Hello World',
    p1: 'Hello World',
    '1p': 'Hello World',
    'h w': 'Hello World',
    'p+q': 'Hello World'
}
··

### 对象引用

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址
修改其中一个变量，会影响到其他所有变量

··js
var o1 = {}
var o2 = o1

o1.a = 1
o2.a // 1

o2.b = 2
o1.b // 2
··

但是，这种引用只局限于对象，如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝

··js
var x = 1
var y = x

x = 2
y // 1
··

### 表达式还是语句？

对象采用大括号表示，所以如果行首是一个大括号，它是表达式表示一个对象还是语句表示一段代码？
为了避免这种歧义，JavaScript 引擎的做法是一律解释为代码块

··js
{ console.log(123) } // 123
··

如果要解释为对象，最好在大括号前加上圆括号。因为圆括号里面只能是表达式

··js
({ foo: 123 }) // 正确
({ console.log(123) }) // 报错
··

这种差异在·eval·语句（作用是对字符串求值）中反映得最明显

··js
eval('{foo: 123}') // 123
eval('({foo: 123})') // {foo: 123}
··

### 读取属性

使用点运算符·.·或方括号运算符·[]·
注意，使用方括号运算符·[]·时，键名必须放在引号里面（数字除外），否则是个变量
方括号运算符内部还可以使用表达式运算

··js
var obj = {
    p: 'Hello World'
}

obj.p // "Hello World"
obj['p'] // "Hello World"
··

### delete

·delete·命令用于删除对象的属性，删除成功后返回·true·

··js
var obj = { p: 1 }
delete obj.p
obj // {}
··

注意，删除一个不存在或继承的属性，·delete·不报错且返回·true·，只有当该属性存在且不得删除时使用·delete·会返回·false·

··js
var obj = Object.defineProperty({}, 'p', {
    value: 123,
    configurable: false
})
obj.p // 123
delete obj.p // false
··

### in

·in·运算符用于检查对象是否包含某个属性（键名，不是键值），左边是属性名，右边是一个对象
注意，继承的属性也会返回·true·，可使用对象的·hasOwnProperty·方法判断是否为对象自身的属性

··js
var obj = { p: 1 }
'p' in obj // true
'toString' in obj // true
obj.hasOwnProperty('toString') // false
··

### for...in

遍历一个对象的全部属性

··js
var obj = { a: 1, b: 2, c: 3 }

for (var i in obj) console.log(i)
// a
// b
// c
··

### with

操作同一个对象的多个属性时，提供一些书写的方便

··js
var obj = {
    p1: 1,
    p2: 2
}

with (obj) {
    p1 = 4
    p2 = 5
}
// 等同于
obj.p1 = 4
obj.p2 = 5
··

注意，·with·内部操作的必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量

··js
var obj = {}
with (obj) {
    p1 = 4
}

obj.p1 // undefined
p1 // 4
··

因此，不建议使用·with·语句，用一个临时变量代替

## 属性描述对象

### 介绍

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等
这个内部数据结构称为“属性描述对象”（attributes object），可通过一些静态方法来操作

··js
{
    value: 123,
    writable: true,
    enumerable: true,
    configurable: true,
    get: undefined,
    set: undefined
}
··

!!
value [undefined]：属性值
writable {Boolean} [true]：·value·是否可改变，若设为·false·可通过·Object.defineProperty/ies()·修改
enumerable {Boolean} [true]：·value·是否可遍历
configurable {Boolean} [true]：·value·是否可修改属性描述对象，和是否可删除此属性
    若·configurable·设为·false·，则修改·writable·将·true·改为·false·是允许的
    至于·value·，只要·writable·和·configurable·有一个为·true·，就允许改动
get {Function}：取值函数（getter）
set {Function}：存值函数（setter），接受赋予的值作为参数
    注意，若定义了·get·或·set·，就不能将·writable·属性设为·true·，也不能设置·value·
        因为此时获取该属性返回的不是·value·，而是·get·返回的值，同理，赋值时就会调用·set·
!!

### 写法

第一种是通过·Object.defineProperty/ies()·定义：

··js
var obj = Object.defineProperty({}, 'p', {
    get: function () {
        return 'getter'
    },
    set: function (value) {
        console.log('setter: ' + value)
    }
})

obj.p // "getter"
obj.p = 123 // "setter: 123"
··

第二种是直接在对象上定义，方法名即属性名：

··js
var obj = {
    get p() {
        return 'getter'
    },
    set p(value) {
        console.log('setter: ' + value)
    }
}
··

### 用法

存取器往往用于，属性的值依赖对象内部数据的场合：

··js
// next 属性的存值函数和取值函数，都依赖于内部属性 $n
var obj ={
    $n : 5,
    get next() { return this.$n++ },
    set next(n) {
        if (n >= this.$n) this.$n = n
        else throw new Error('新的值必须大于当前值')
    }
}

obj.next // 5

obj.next = 10
obj.next // 10

obj.next = 5
// Uncaught Error: 新的值必须大于当前值
··

### 对象的拷贝

有时，我们需要将一个对象的所有属性，拷贝到另一个对象：

··js
var extend = function (to, from) {
    for (var property in from) to[property] = from[property]
    return to
}

extend({}, { a: 1 }) // {a: 1}
··

但如果遇到存取器定义的属性，会只拷贝值：

··js
extend({}, {
    get a() { return 1 }
})
// {a: 1}
··

可以通过·Object.defineProperty()·来拷贝属性描述对象

··js
var extend = function (to, from) {
    for (var property in from) {
        if (from.hasOwnProperty(property)) {
            Object.defineProperty(
                to,
                property,
                Object.getOwnPropertyDescriptor(from, property)
            )
        }
    }
    return to
}

extend({}, { get a() { return 1 } })
// { get a(){ return 1 } })
··

## Object

JavaScript 的所有其他对象都继承自·Object·对象，即那些对象都是·Object·的实例

### Object()

·Object·本身是一个函数，可以当作工具方法使用，将任意值转为对象
如果参数为空（或者为·undefined·和·null·），·Object()·返回一个空对象

··js
var obj = Object()
var obj = Object(undefined)
var obj = Object(null)
··

### instanceof

验证一个对象是否为指定的构造函数的实例
当对·Object·函数传入原始类型的值时返回原始类型值对应的包装对象

··js
var obj = Object(1)
obj instanceof Object // true
obj instanceof Number // true
··

如果·Object·方法的参数是一个对象则返回该对象，即不用转换

··js
var value = {}
var obj = Object(value) // 返回原对象
obj === value // true
··

判断变量是否为对象（包括数组、函数）：

··js
function isObject(value) {
    return value === Object(value)
}
··

### new Object()
构造函数可以用来生成新对象，以下写法相等

··js
var obj = new Object()
var obj = Object()
var obj = {}
··

其中·Object(value)·表示将·value·转成一个对象，·new Object(value)·则表示新生成一个对象

## 静态方法

!!
Object.keys(obj)：返回一个由参数对象的键名组成的数组，只返回可遍历的属性
Object.getOwnPropertyNames(obj)：用法和·Object.keys()·一样，且可返回不可遍历的属性，例如数组的·length·

Object.getOwnPropertyDescriptor(obj, key)：获取属性描述对象，只能用于自身的属性，不能用于继承的属性
Object.getPrototypeOf(obj)：获取对象的·Prototype·对象
Object.create(obj)：指定原型对象和属性，返回一个新的对象，即复制对象

Object.defineProperty(obj, key, attrObj)：定义或修改属性描述对象，返回修改后的对象
Object.defineProperties(obj, \\{keys: attrObjs})：：定义或修改多个属性描述对象，返回修改后的对象
    若·defineProperty/ies()·未定义·writable configurable enumerable·则默认都为·false·

Object.preventExtensions(obj)：禁止对象添加新的属性
Object.seal(obj)：禁止对象添加新的属性，也不能删除已有的属性，即把·configurable·属性设为·false·
Object.freeze(obj)：禁止对象添加新属性、删除旧属性、改变属性值，若子属性还是对象则无法冻结，可循环深冻结

Object.isExtensible(obj)：判断对象是否可扩展
Object.isSealed(obj)：判断对象是否可配置
Object.isFrozen(obj)：判断对象是否被冻结
!!

## 实例方法

以下方法前面省略·Object.prototype.·

!!
valueOf()：返回对象的原始值，默认返回对象本身，主要用于自动类型转换时调用
toString()：返回对象的字符串形式，即·"[object Object]"·，不同类型返回对应的值
toLocaleString()：和·toString()·返回的结果相同，作用是方便自定义，例如·Date·对象就自定义过

isPrototypeOf()：判断当前对象是否为另一个对象的原型
hasOwnProperty(key)：判断对象是否有某属性，只能判断自身的属性，继承的属性只会返回·false·
propertyIsEnumerable()：判断某个属性是否可遍历，只能判断自身的属性，继承的属性只会返回·false·
!!

## es6

### 属性

!!
__proto__：用来读取或设置当前对象的·prototype·对象
    前后的双下划线说明它本质上是一个内部属性，并从兼容性考虑，所以尽量不直接操作这个属性
    可使用·Object.setPrototypeOf()·、·Object.getPrototypeOf()·、·Object.create()·组合代替
!!

### 静态方法

!!
Object.is(a, b)：比较两个值是否相等，和·===·类似，还包括了·NaN·可以等于本身和·+0·不等于·-0·
Object.assign(target, ...source)：将源对象复制到目标对象，若有同名属性则后面覆盖前面
Object.getOwnPropertyDescriptors(obj)：返回对象上所有属性的描述对象
Object.setPrototypeOf(obj, proto)：设置一个对象的·prototype·对象，返回参数对象本身
Object.values()：返回对象的键值组成的数组，只返回可遍历的属性
Object.entries()：返回对象的键值对数组组成的数组，只返回可遍历的属性
Object.fromEntries()：将一个键值对数组转为对象，即·Object.entries()·的逆操作
!!

### 属性简写

若属性和变量名相同则可简写成一个：

··js
const foo = 'abc'
const obj = { foo }
// 等同于
const obj = { foo: foo }
··

方法也可以简写：

··js
const o = {
    method () {
        return "Hello!"
    }
}
// 等同于
const o = {
    method: function () {
        return "Hello!"
    }
}
··

### 属性表达式

可使用方括号将属性名定义变量：

··js
let propKey = 'foo'

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
}
··

还可用于方法名的简写：

··js
let obj = {
    ['h' + 'ello'] () {
        return 'hi'
    }
}
··

但不能用于属性的简写，否则报错：

··js
const baz = { [foo] } // 报错
··

注意，若属性名表达式返回的是对象则会转换成字符串

### 方法的 name 属性

函数的·name·属性返回函数名。对象方法也是函数，也有·name·属性：
若是取值函数（getter）和存值函数（setter），则·name·属性不在该方法上，而在属性的描述对象的·get·和·set·属性上：

··js
const obj = {
    get foo() {},
    set foo(x) {}
}
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo')
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
··

·Function·构造函数创造的函数，·name·属性返回·anonymous·

··js
(new Function()).name // "anonymous"
··

·bind·方法创造的函数，·name·属性返回·bound·加上原函数的名字

··js
const doSomething = function () {}
doSomething.bind().name // "bound doSomething"
··

如果对象的方法是·Symbol·值则返回这个·Symbol·值的描述

··js
const key = Symbol('description')
let obj = {
    [key] () {},
}
obj[key].name // "[description]"
··

### super

·this·总是指向函数所在的当前对象，而·super·指向当前对象的原型对象，且只能用在对象的**简写**方法之中

··js
const obj = {
    name: '张三',
    getName: function () {
        console.log(this.name)
    }
}
obj.getName() // 张三
··

··js
const obj = {
    foo: 'world',
    find () {
        console.log(super.foo)
    }
}
const proto = {
    foo: 'hello'
}

obj.find() // undefined
obj.__proto__ = proto
obj.find() // "hello"
··

以下写法错误：

··js
// 不能用于属性
const obj = {
  foo: super.foo
}

// 不是属性方法的简写形式
const foo = {
    foo: () => super.foo
}
const bar = {
    bar: function () {
        return super.bar
    }
}
··

其实·super.foo·等同于·Object.getPrototypeOf(this).foo·
或·super.foo()·等同于·Object.getPrototypeOf(this).foo.call(this)·

### 扩展运算符

扩展运算符·...·可取出对象的所有可遍历属性，并需要对象容器包裹

#### 解构赋值

将剩余的值拷贝到新对象上

··js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }
··

#### 拷贝对象

空对象和除了字符串以外的类型将没有效果

··js
let z = { a: 3, b: 4 }
let n = { ...z }
n // { a: 3, b: 4 }

let foo = { ...['a', 'b', 'c'] }
foo // {0: "a", 1: "b", 2: "c"}

{...'hello'} // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
··

等同于使用·Object.assign()·：

··js
let aClone = { ...a }
// 等同于
let aClone = Object.assign({}, a)
··

可以用于合并两个对象，若有相同属性则后面覆盖前面：

··js
let ab = { ...a, ...b }
let axy = { ...a, x: 1, y: 2 }
··

扩展运算符后面可以跟表达式：

··js
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2
}
··

&2019/08/03
            `
        }
    }
}
</script>
