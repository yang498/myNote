commonData.javascript.grammar.content = `
#包装对象

##介绍
数值、字符串、布尔值通过构造函数生成的对象即为包装对象
设计目的是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型，其次是使得原始类型的值也有办法调用自己的方法
三种包装对象各自提供了许多实例方法，而它们共同具有、从·Object·对象继承的方法是·valueOf()·和·toString()·
·valueOf()·返回包装对象实例的原始类型的值
··
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true
··
·toString()·返回对应的字符串形式
··
new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
··

##原始类型的自动转换
当原始类型的值调用包装对象才有的属性或方法时，会自动转为包装对象实例，并在使用后立刻销毁实例
··
'abc'.length // 3
// abc 本身是字符串而不是对象，不能调用 length 属性
// 但使用时自动将其转为包装对象，在这个对象上调用 length 属性。调用结束后，这个临时对象就会被销毁
··
调用结束后，包装对象实例会自动销毁
这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性
如果要为字符串添加属性，只有在它的原型对象·String.prototype·上定义
··
var s = 'Hello World'
s.x = 123
s.x // undefined
··

#数据类型转换

##介绍
JavaScript 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值
虽然变量的数据类型是不确定的，但是数据运算是有要求的。若与预期不符就会自动转换类型
例如减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值
··
'4' - '3' // 1
··
强制转换：主要指使用·Number() String() Boolean()·手动转换成数字、字符串或者布尔值

##Number()
··
// 数值：不变
Number(324) // 324

// 字符串：如果可以解析为数值则转换为相应的数值，否则返回 NaN，空字符串转为 0
// Number 和 parseInt 都会自动过滤字符串前后的空格类型字符
Number('324') // 324
Number('324abc') // NaN
parseInt('324abc') // 324（类似的 parseInt）
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成 0
Number(null) // 0

// 对象：返回 NaN，除非是包含单个数值的数组（先后调用了对象的 valueOf() 和 toString() 再使用 Number()）
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
··

##String()
··
// 原始类型值
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"

// 对象
/*
先调用了对象的 toString()
	若返回原始类型值则直接使用 String()
	若返回对象则继续使用 valueOf()，
		若返回原始类型值则直接使用 String()
		若返回对象则报错（自定义 valueOf() 和 String() 返回对象的情况）
*/
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
··

##Boolean()
··
// 原始类型值
Boolean(true) // true
Boolean(false) // false
// 以下五个值为 false，其他都为 true
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false（包扩 -0 和 +0）
Boolean(NaN) // false
Boolean('') // false

// 对象始终为 true
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
··

##自动转换为布尔值
对非布尔值类型的数据求布尔值，自动使用·Boolean()·转换
注意对于对象会先用·String()·再使用·Boolean()·转换比较
··
if ('abc') {
	console.log('hello')
}
// "hello"

[] == false // true（相当于 '' == false）
({}) == false // false（相当于 '[object object] == false'）（注意行首是大括号则作为代码块执行了，加圆括号解释为对象）
({valueOf: function () { return false }}) == false // true
··

##自动转换为字符串
只在加法·+·的情况下，运算符两边有值且任意一边是字符串就转为字符串：
··
'5' + 1 // '51'
1 + '5' // '15'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function () {} // "5function () {}"
'5' + undefined // "5undefined"
'5' + null // "5null"
··

##自动转换为数值
加法·+·两边都不是字符串 或 非加法·+·运算符 或 一元运算符（即·+·和·-·） 的情况下，对于非数值调用·Number()·自动转换：
··
null + 1 // 1
undefined + 1 // NaN

'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false /¿ '5' // 0
'abc' - 1   // NaN

+ 'abc' // NaN
- 'abc' // NaN
+ true // 1
- false // 0
+ {foo: 'bar'} // NaN
- [1, 2, 3] // NaN
+ [] // 0
··

#JSON

##JSON 格式
JSON 格式（JavaScript Object Notation）是一种用于数据交换的文本格式，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式
书写规范：
!!
复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象
原始类型的值只有字符串、数值（十进制）、布尔值和·null·（不能使用·NaN·, ·Infinity·, ·-Infinity·和·undefined·）
字符串必须使用双引号表示，不能使用单引号
对象的键名必须使用双引号
数组或对象最后一个成员的后面，不能加逗号
!!
··
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]
··

##JSON 对象
·JSON·对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：·JSON.stringify()·和·JSON.parse()·

##JSON.stringify()
将 JSON 对象转为 JSON 字符串：·JSON.stringify(obj, propArr/fn, format)·
··
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'

// 不符合规范的值会被忽略
var obj = {
	a: undefined,
	b: function () {}
}
JSON.stringify(obj) // "{}"
··

##第二个参数
第二个参数表示只转换指定的属性（只在转换对象时有效，对数组无效）：
··
var obj = {
	'prop1': 'value1',
	'prop2': 'value2',
	'prop3': 'value3'
}

JSON.stringify(obj, ['prop1', 'prop2'])
// "{"prop1":"value1","prop2":"value2"}"
··
还可以是一个函数更改返回值（该函数会递归处理每个键值对，且第一个是对象本身）：
··
JSON.stringify({ a: 1, b: 2 }, function (key, value) {
	if (typeof value === "number") value = 2 * value
	return value
})
// '{"a": 2,"b": 4}'

var o = {a: 1}
JSON.stringify(o, function (key, value) {
	if (typeof value === 'object') return {b: 2}
	return value * 2
})
// "{"b": 4}"
··

##第三个参数
第三个参数表示增加字符串的可读性，在每个属性前面添加指定的字符
传入数字（·1-10·）表示空格的个数，传入字符串（长度·<=10·）表示该字符串
··
JSON.stringify({ p1: 1, p2: { a: 1, b: [1, 2] } }, null, 4)
/*
"{
  "p1": 1,
  "p2": {
	"a": 1,
	"b": [
	  1,
	  2
	]
  }
}"
*/

JSON.stringify({ p1: 1, p2: { a: 1, b: [1, 2] } }, null, '|---')
/*
"{
|---"p1": 1,
|---"p2": {
|---|---"a": 1,
|---|---"b": [
|---|---|---1,
|---|---|---2
|---|---]
|---}
}"
*/
··

##参数对象 toJSON
如果参数对象有自定义的·toJSON·方法，那么·JSON.stringify()·会直接使用这个方法的返回值作为参数
··
var user = {
	lastName: '张',
	firstName: '三',
	toJSON: function () {
		return {
			name:  this.firstName + this.lastName
		}
	}
}
JSON.stringify(user)
// "{"name":"张三"}"

JSON.stringify(new Date) // Date 也有定义过
// ""2015-01-01T00:00:00.000Z""

// 转换正则
RegExp.prototype.toJSON = RegExp.prototype.toString
JSON.stringify(/foo/) // ""/foo/""
··

##JSON.parse()
将 JSON 字符串转换成对应的值，即·JSON.stringify()·的逆操作
··
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null
··
可以传入一个函数作为第二个参数，用法与·JSON.stringify()·类似
··
JSON.parse('{"a": 1, "b": 2}', function (key, value) {
	if (key === 'a') return value + 10
	return value
})
// {a: 11, b: 2}
··

#window

##window
window对象指当前的浏览器窗口，也是所有对象的顶层对象，所有其他对象都是它的下属。JavaScript规定，浏览器环境的所有全局变量，都是window对象的属性

##document
document对象是文档的根节点，也就是整个网页，window.document属性就指向这个对象
有document.head和document.body，document.documentElement代表html根节点

3种节点
元素：nodeType = 1
属性：nodeType = 2
文本：nodeType = 3
其他
注释：nodeType = 8
文档：nodeType = 9
nodeType
%%
序号,类型,描述
,,1
1,Element,元素
2,Attr,属性
3,Text,文本
4,CDATASection,文档中的 CDATA 部分（不会由解析器解析的文本）
5,EntityReference,实体引用
6,Entity,实体
7,ProcessingInstruction,处理指令
8,Comment,注释
9,Document,整个文档
10,DocumentType,向为文档定义的实体提供接口，也就是html的开头&lt;!DOCTYPE html&gt;
11,DocumentFragment,轻量级的 Document 对象，能够容纳文档的某个部分
12,Notation,DTD 中声明的符号
%%

##location
window.location返回一个location对象，用于获取窗口当前的URL信息。它等同于document.location对象，在iframe中获取也是如此
··
window.location === document.location	// true
··

#宽高位置

##window
!!
window.innerWidth、window.innerHeight：网页在当前窗口中可见部分的宽高，包括滚动条
window.outerWidth、window.outerHeight：整个浏览器的宽高
window.screen.width、window.screen.height：整个屏幕的宽高
window.screen.availWidth、window.screen.availHeight：整个屏幕可利用的宽高，也就是不包括任务栏
window.screenTop、window.screenLeft：浏览器窗口距离屏幕顶部和左侧的距离
!!

##element
!!
el.clientWidth、el.clientHeight：元素可视部分的宽高，包括padding，不包括border和滚动条
el.clientTop、el.clientLeft：元素border-top和border-left的宽度
el.offsetWidth、el.offsetHeight：元素可视部分的宽高，包括padding和border和滚动条
el.offsetTop、el.offsetLeft：元素相对于父级元素的top和left值，该父级元素的css需设置了非static的其他定位，否则是body
el.scrollWidth、el.scrollHeight：元素的滚动内容宽高，包括padding，不包括border和滚动条，如果是获取body的宽高，若其宽高小于浏览器窗口的宽高则还是按浏览器窗口的宽高
el.scrollTop、el.scrollLeft：元素被卷去的top和left值，可手动赋值修改
!!

##event待
!!
clientX / clientY：鼠标位置相对于浏览器内容区域左上角的水平垂直偏移量，该参照点会随着滚动条的移动而移动
pageX / pageY：鼠标位置相对于浏览器内容区域左上角的水平垂直偏移量，不会随着滚动条而变动
screenX / screenY：鼠标位置相对于屏幕左上角的水平垂直偏移量
!!

##其他
两个相同的对象并不相等：
··
{}=={}	// false
[]==[]	// false
··

谜之 js
··
!!¿[]	// true
[] == false	// true
[0] == false // true

+ []	// 0
+ {}	// NaN
[] + {}	// "[object Object]"
{} + []	// 0

// 非 0 的数可以转换成 true，但 true 只能转换成 1
!!2	// true
true == 1	// true
true == 2	// false

// 判断数组是否为空
arr.length === 0
JSON.stringify(arr) === '[]'

// 判断对象是否为空
Object.keys(obj).length === 0
JSON.stringify(obj) === '{}'
··

##this
··
var a = 'a'
var obj = {
	a: 1,
	b: this.a,	// 'a'
	c: function () {
		console.log(this.a)	// 1
	},
	d: function () {
		var e = function () {
			console.log(this.a)
		}
		e()	// 'a'
	}
}
··

#其他
##判断数组或对象为空
简单的和 false 比较是不准确的
··
{} == false // Uncaught SyntaxError: Unexpected token ==
{} === false // Uncaught SyntaxError: Unexpected token ===
!{} // false
!{a:1} // false

[] == false // true
[] === false // false
[0] == false // true
[1] == false // false
!¿[] // false
!¿[0] // false
!¿[1] // false
··
1、length
··
arr.length === 0
Object.keys(obj).length === 0
··
2、JSON.stringify
··
JSON.stringify(arr) === '[]'
JSON.stringify(obj) === '{}'
··
#待
··
//调用函数只会作用于原来的地方，在这个地方调用，并不是把函数拿过来用
var a='a';
function fnA(){
	console.log(a);
}
function fnB(){
	var a=66;
	fnA();
}
fnB();

//原生dataset会改变标签里面的data值
//jq.data不会改变标签里面的data值

//时间戳从页面加载开始计时e.timeStamp
//offsetX相对于元素左上角边框以内
//pageX相对于文档左上角
//clientX相对于浏览器左上角
//screenX相对于屏幕左上角
··

##运算符优先级
@[参照 MDN|https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table]

&2019/8/8
`