(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5b95"],{9668:function(n,e,t){"use strict";t.r(e);var o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{domProps:{innerHTML:n._s(n.format(n.text))}})},a=[],r={data:function(){return{text:"\n# 语法\n\n## this\n\n·this·返回当前对象\n\n### 全局环境指向 window\n\n··js\nthis // window\n··\n\n### 构造函数指向实例\n\n··js\nvar Obj = function (p) {\n    this.p = p\n}\nvar o = new Obj('Hello World!')\no.p // \"Hello World!\"\n··\n\n### 对象方法中指向该对象\n\n··js\nvar A = {\n    name: '张三',\n    describe: function () {\n        return this.name\n    }\n}\nA.describe() // \"张三\"\n  \nvar B = {\n    name: '李四'\n}\nB.describe = A.describe\nB.describe() // \"李四\"\n··\n\n### 改变指向\n\n··js\nvar obj = {\n    foo: function () {\n        console.log(this)\n    }\n}\n\n// 情况一\n(obj.foo = obj.foo)() // window\n// 情况二\n(false || obj.foo)() // window\n// 情况三\n(1, obj.foo)() // window\n··\n\nJavaScript 引擎内部·obj·和·obj.foo·储存在两个内存地址，称为地址 A 和 B\n·obj.foo()·调用时从地址 A 调用地址 B，因此地址 B 的运行环境是地址 A，·this·指向·obj·\n但上面三种情况都是直接取出地址 B 进行调用，这样运行环境就是全局环境\n所以要注意下面类似的情况：\n\n··js\nvar o = new Object()\no.f = function () {\n    console.log(this === o)\n}\n\n// jQuery 的写法\n$('#button').on('click', o.f) // false\n// 此时 this 不再指向 o 对象，而是指向按钮的 DOM 对象\n··\n\n### 对象方法的第一层\n\n#### 对象方法嵌套\n\n··js\nvar a = {\n    p: 'a',\n    b: {\n        p: 'b',\n        m: function () {\n            console.log(this.p)\n        }\n    }\n}\n\na.b.m() // \"b\"\n··\n\n#### 对象方法嵌套方法实际是在全局中调用\n\n内层的·this·不指向外部，而指向顶层对象·window·\n\n··js\nvar a = {\n    p: 'a',\n    b: function() {\n        setTimeout(function () {\n            console.log(this.p)\n        })\n    }\n}\n\na.b() // window\n··\n\n常见的做法：用变量固定·this·的值，或使用箭头函数\n\n### F.p.call()\n\n·Function.prototype.call(obj, ...arg)·：指定函数内部·this·的指向并调用该函数\n第一个参数为要指向的对象，后面的参数为函数调用时所需的参数\n如果参数为空、·null·和·undefined·，则默认传入全局对象·window·\n\n··js\nvar obj = {}\n\nvar f = function () {\n    return this\n}\n\nf() === window // true\nf.call(obj) === obj // true\n··\n\n如果参数是一个原始值则会自动转成对应的包装对象\n\n··js\nvar f = function () {\n    console.log(this)\n}\n  \nf.call(5) // Number {[[PrimitiveValue]]: 5}\n··\n\n#### 调用对象的原生方法防止被覆盖\n\n··js\nvar obj = {}\nobj.hasOwnProperty = function () {\n    return true\n}\nObject.prototype.hasOwnProperty.call(obj, 'toString') // false\n··\n\n### F.p.apply()\n\n·Function.prototype.apply(obj, [...arg])·：作用和·call()·一样，区别就是第二个参数是个数组\n\n#### 找出数组最大元素\n\n··js\nvar a = [10, 2, 4, 15, 9]\nMath.max.apply(null, a) // 15\n··\n\n#### 将数组的空元素变为 undefined\n\n空元素和·undefined·的区别详见·js标准库 - array - es6 - 数组的空位·\n\n··js\nArray.apply(null, ['a', ,'b'])\n// [ 'a', undefined, 'b' ]\n··\n\n### F.p.bind()\n\n·Function.prototype.bind(obj, ...arg)·：将方法内的·this·绑定到某个对象，然后返回一个新方法，参数用法同·call()·\n\n#### 直接赋值对象的方法\n\n··js\nvar obj = {\n    a: 'obj',\n    b: function () {\n        console.log(this.a)\n    }\n}\n\nvar f1 = obj.b\nf1() // undefined\n\nvar f2 = obj.b.bind(obj)\nf2() // \"obj\"\n··\n\n#### 使用参数\n\n··js\nvar add = function (x, y) {\n    return x * this.m + y * this.n\n}\n\nvar obj = {\n    m: 2,\n    n: 2\n}\n  \nvar newAdd = add.bind(obj, 5) // 将第一个参数 x 绑定成 5，只要再接受一个参数 y 即可\nnewAdd(5) // 20\n··\n\n#### 每次返回一个新函数\n\n所以监听事件：\n\n··js\nel.addEventListener('click', o.m.bind(o))\nel.removeEventListener('click', o.m.bind(o)) // 移除无效\n··\n\n需改成：\n\n··js\nvar listener = o.m.bind(o)\nel.addEventListener('click', listener)\nel.removeEventListener('click', listener)\n··\n\n## 包装对象\n\n### 介绍\n\n数值、字符串、布尔值通过构造函数生成的对象即为包装对象\n设计目的是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型，其次是使得原始类型的值也有办法调用自己的方法\n三种包装对象各自提供了许多实例方法，而它们共同具有、从·Object·对象继承的方法是·valueOf()·和·toString()·\n·valueOf()·返回包装对象实例的原始类型的值\n\n··js\nnew Number(123).valueOf()  // 123\nnew String('abc').valueOf() // \"abc\"\nnew Boolean(true).valueOf() // true\n··\n\n·toString()·返回对应的字符串形式\n\n··js\nnew Number(123).toString() // \"123\"\nnew String('abc').toString() // \"abc\"\nnew Boolean(true).toString() // \"true\"\n··\n\n### 原始类型的自动转换\n\n当原始类型的值调用包装对象才有的属性或方法时，会自动转为包装对象实例，并在使用后立刻销毁实例\n\n··js\n'abc'.length // 3\n// abc 本身是字符串而不是对象，不能调用 length 属性\n// 但使用时自动将其转为包装对象，在这个对象上调用 length 属性。调用结束后，这个临时对象就会被销毁\n··\n\n调用结束后，包装对象实例会自动销毁\n这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性\n如果要为字符串添加属性，只有在它的原型对象·String.prototype·上定义\n\n··js\nvar s = 'Hello World'\ns.x = 123\ns.x // undefined\n··\n\n## 数据类型转换\n\n### 介绍\n\nJavaScript 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值\n虽然变量的数据类型是不确定的，但是数据运算是有要求的。若与预期不符就会自动转换类型\n例如减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值\n\n··js\n'4' - '3' // 1\n··\n\n强制转换：主要指使用·Number() String() Boolean()·手动转换成数字、字符串或者布尔值\n\n### Number()\n\n··js\n// 数值：不变\nNumber(324) // 324\n\n// 字符串：如果可以解析为数值则转换为相应的数值，否则返回 NaN，空字符串转为 0\n// Number 和 parseInt 都会自动过滤字符串前后的空格类型字符\nNumber('324') // 324\nNumber('324abc') // NaN\nparseInt('324abc') // 324（类似的 parseInt）\nNumber('') // 0\n\n// 布尔值：true 转成 1，false 转成 0\nNumber(true) // 1\nNumber(false) // 0\n\n// undefined：转成 NaN\nNumber(undefined) // NaN\n\n// null：转成 0\nNumber(null) // 0\n\n// 对象：返回 NaN，除非是包含单个数值的数组（先后调用了对象的 valueOf() 和 toString() 再使用 Number()）\nNumber({ a: 1 }) // NaN\nNumber([1, 2, 3]) // NaN\nNumber([5]) // 5\n··\n\n### String()\n\n··js\n// 原始类型值\nString(123) // \"123\"\nString('abc') // \"abc\"\nString(true) // \"true\"\nString(undefined) // \"undefined\"\nString(null) // \"null\"\n\n// 对象\n/*\n先调用了对象的 toString()\n    若返回原始类型值则直接使用 String()\n    若返回对象则继续使用 valueOf()，\n        若返回原始类型值则直接使用 String()\n        若返回对象则报错（自定义 valueOf() 和 String() 返回对象的情况）\n*/\nString({ a: 1 }) // \"[object Object]\"\nString([1, 2, 3]) // \"1,2,3\"\n··\n\n### Boolean()\n\n··js\n// 原始类型值\nBoolean(true) // true\nBoolean(false) // false\n// 以下五个值为 false，其他都为 true\nBoolean(undefined) // false\nBoolean(null) // false\nBoolean(0) // false（包扩 -0 和 +0）\nBoolean(NaN) // false\nBoolean('') // false\n\n// 对象始终为 true\nBoolean({}) // true\nBoolean([]) // true\nBoolean(new Boolean(false)) // true\n··\n\n### 自动转换为布尔值\n\n对非布尔值类型的数据求布尔值，自动使用·Boolean()·转换\n注意对于对象会先用·String()·再使用·Boolean()·转换比较\n\n··js\nif ('abc') {\n    console.log('hello')\n}\n// \"hello\"\n\n[] == false // true（相当于 '' == false）\n({}) == false // false（相当于 '[object object] == false'）（注意行首是大括号则作为代码块执行了，加圆括号解释为对象）\n({valueOf: function () { return false }}) == false // true\n··\n\n### 自动转换为字符串\n\n只在加法·+·的情况下，运算符两边有值且任意一边是字符串就转为字符串：\n\n··js\n'5' + 1 // '51'\n1 + '5' // '15'\n'5' + true // \"5true\"\n'5' + false // \"5false\"\n'5' + {} // \"5[object Object]\"\n'5' + [] // \"5\"\n'5' + function () {} // \"5function () {}\"\n'5' + undefined // \"5undefined\"\n'5' + null // \"5null\"\n··\n\n### 自动转换为数值\n\n加法·+·两边都不是字符串 或 非加法·+·运算符 或 一元运算符（即·+·和·-·） 的情况下，对于非数值调用·Number()·自动转换：\n\n··js\nnull + 1 // 1\nundefined + 1 // NaN\n\n'5' - '2' // 3\n'5' * '2' // 10\ntrue - 1  // 0\nfalse - 1 // -1\n'1' - 1   // 0\n'5' * []    // 0\nfalse / '5' // 0\n'abc' - 1   // NaN\n\n+ 'abc' // NaN\n- 'abc' // NaN\n+ true // 1\n- false // 0\n+ { foo: 'bar' } // NaN\n- [1, 2, 3] // NaN\n+ [] // 0\n··\n\n## JSON\n\n### JSON 格式\n\nJSON 格式（JavaScript Object Notation）是一种用于数据交换的文本格式\n2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式\n书写规范：\n\n!!\n复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象\n原始类型的值只有字符串、数值（十进制）、布尔值和·null·\n    （不能使用·NaN·, ·Infinity·, ·-Infinity·和·undefined·）\n字符串必须使用双引号表示，不能使用单引号\n对象的键名必须使用双引号\n数组或对象最后一个成员的后面，不能加逗号\n!!\n\n··js\n[\"one\", \"two\", \"three\"]\n\n{ \"one\": 1, \"two\": 2, \"three\": 3 }\n\n{\"names\": [\"张三\", \"李四\"] }\n\n[{ \"name\": \"张三\"}, {\"name\": \"李四\"}]\n··\n\n### JSON 对象\n\n·JSON·对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：·JSON.stringify()·和·JSON.parse()·\n\n### JSON.stringify()\n\n将 JSON 对象转为 JSON 字符串：·JSON.stringify(obj, propArr/fn, format)·\n\n··js\nJSON.stringify('abc') // \"\"abc\"\"\nJSON.stringify(1) // \"1\"\nJSON.stringify(false) // \"false\"\nJSON.stringify([]) // \"[]\"\nJSON.stringify({}) // \"{}\"\n\nJSON.stringify([1, \"false\", false])\n// '[1,\"false\",false]'\n\nJSON.stringify({ name: \"张三\" })\n// '{\"name\":\"张三\"}'\n\n// 不符合规范的值会被忽略\nvar obj = {\n    a: undefined,\n    b: function () {}\n}\nJSON.stringify(obj) // \"{}\"\n··\n\n### 第二个参数\n\n第二个参数表示只转换指定的属性（只在转换对象时有效，对数组无效）：\n\n··js\nvar obj = {\n    'prop1': 'value1',\n    'prop2': 'value2',\n    'prop3': 'value3'\n}\n\nJSON.stringify(obj, ['prop1', 'prop2'])\n// \"{\"prop1\":\"value1\",\"prop2\":\"value2\"}\"\n··\n\n还可以是一个函数更改返回值（该函数会递归处理每个键值对，且第一个是对象本身）：\n\n··js\nJSON.stringify({ a: 1, b: 2 }, function (key, value) {\n    if (typeof value === \"number\") value = 2 * value\n    return value\n})\n// '{\"a\": 2,\"b\": 4}'\n\nvar o = { a: 1 }\nJSON.stringify(o, function (key, value) {\n    if (typeof value === 'object') return {b: 2}\n    return value * 2\n})\n// \"{\"b\": 4}\"\n··\n\n### 第三个参数\n\n第三个参数表示增加字符串的可读性，在每个属性前面添加指定的字符\n传入数字（·1-10·）表示空格的个数，传入字符串（长度·<=10·）表示该字符串\n\n··js\nJSON.stringify({ p1: 1, p2: { a: 1, b: [1, 2] } }, null, 4)\n/*\n\"{\n  \"p1\": 1,\n  \"p2\": {\n    \"a\": 1,\n    \"b\": [\n      1,\n      2\n    ]\n  }\n}\"\n*/\n\nJSON.stringify({ p1: 1, p2: { a: 1, b: [1, 2] } }, null, '|---')\n/*\n\"{\n|---\"p1\": 1,\n|---\"p2\": {\n|---|---\"a\": 1,\n|---|---\"b\": [\n|---|---|---1,\n|---|---|---2\n|---|---]\n|---}\n}\"\n*/\n··\n\n### 参数对象 toJSON\n\n如果参数对象有自定义的·toJSON·方法，那么·JSON.stringify()·会直接使用这个方法的返回值作为参数\n\n··js\nvar user = {\n    lastName: '张',\n    firstName: '三',\n    toJSON: function () {\n        return {\n            name:  this.firstName + this.lastName\n        }\n    }\n}\nJSON.stringify(user)\n// \"{\"name\":\"张三\"}\"\n\nJSON.stringify(new Date) // Date 也有定义过\n// \"\"2015-01-01T00:00:00.000Z\"\"\n\n// 转换正则\nRegExp.prototype.toJSON = RegExp.prototype.toString\nJSON.stringify(/foo/) // \"\"/foo/\"\"\n··\n\n### JSON.parse()\n\n将 JSON 字符串转换成对应的值，即·JSON.stringify()·的逆操作\n\n··js\nJSON.parse('{}') // {}\nJSON.parse('true') // true\nJSON.parse('\"foo\"') // \"foo\"\nJSON.parse('[1, 5, \"false\"]') // [1, 5, \"false\"]\nJSON.parse('null') // null\n··\n\n可以传入一个函数作为第二个参数，用法与·JSON.stringify()·类似\n\n··js\nJSON.parse('{\"a\": 1, \"b\": 2}', function (key, value) {\n    if (key === 'a') return value + 10\n    return value\n})\n// {a: 11, b: 2}\n··\n\n## window\n\n### window\n\n·window·对象指当前的浏览器窗口，浏览器环境的所有全局变量都是·window·对象的属性\n\n### document\n\n·document·对象是文档的根节点，即整个网页，·window.document·属性就指向这个对象\n有·document.head·和·document.body·等，·document.documentElement·代表 html 根节点\n\n3 种节点\n元素：nodeType = 1\n属性：nodeType = 2\n文本：nodeType = 3\n\n其他\n注释：nodeType = 8\n文档：nodeType = 9\n\nnodeType\n\n%%\n| 序号 | 类型 | 描述 |\n| :-: | :-: | :- |\n| 1 | Element | 元素 |\n| 2 | Attr | 属性 |\n| 3 | Text | 文本 |\n| 4 | CDATASection | 文档中的 CDATA 部分（不会由解析器解析的文本） |\n| 5 | EntityReference | 实体引用 |\n| 6 | Entity | 实体 |\n| 7 | ProcessingInstruction | 处理指令 |\n| 8 | Comment | 注释 |\n| 9 | Document | 整个文档 |\n| 10 | DocumentType | 向为文档定义的实体提供接口，即html的开头&lt;!DOCTYPE html&gt; |\n| 11 | DocumentFragment | 轻量级的 Document 对象，能够容纳文档的某个部分 |\n| 12 | Notation | DTD 中声明的符号 |\n%%\n\n### location\n\n·window.location·返回一个·location·对象，用于获取窗口当前的 URL 信息\n等同于·document.location·对象，在·iframe·中获取也是如此\n\n··js\nwindow.location === document.location   // true\n··\n\n## 宽高位置\n\n### window\n\n!!\nwindow.innerWidth、window.innerHeight：网页在当前窗口中可见部分的宽高，包括滚动条\nwindow.outerWidth、window.outerHeight：整个浏览器的宽高\nwindow.screen.width、window.screen.height：整个屏幕的宽高\nwindow.screen.availWidth、window.screen.availHeight：整个屏幕可利用的宽高，即不包括任务栏\nwindow.screenTop、window.screenLeft：浏览器窗口距离屏幕顶部和左侧的距离\n!!\n\n### element\n\n!!\nel.clientWidth、el.clientHeight：元素可视部分的宽高，包括·padding·，不包括·border·和滚动条\nel.clientTop、el.clientLeft：元素·border-top·和·border-left·的宽度\nel.offsetWidth、el.offsetHeight：元素可视部分的宽高，包括·padding·和·border·和滚动条\nel.offsetTop、el.offsetLeft：元素相对于父级元素的·top·和·left·值\n    该父级元素需设置非·static·定位，否则会一直往上找到符合条件的父元素直到·body·\nel.scrollWidth、el.scrollHeight：元素的滚动内容宽高，包括·padding·，不包括·border·和滚动条\n    如果是获取·body·的宽高，若其宽高小于浏览器窗口的宽高则还是按浏览器窗口的宽高\nel.scrollTop、el.scrollLeft：元素被卷去的·top和·left·值，可手动赋值修改\n!!\n\n### event 待\n\n!!\nclientX / clientY：鼠标位置相对于浏览器内容区域左上角的水平垂直偏移量，该参照点会随着滚动条的移动而移动\npageX / pageY：鼠标位置相对于浏览器内容区域左上角的水平垂直偏移量，不会随着滚动条而变动\nscreenX / screenY：鼠标位置相对于屏幕左上角的水平垂直偏移量\n!!\n\n### 其他\n\n谜之 js\n\n··js\n!![]   // true\n[] == false // true\n[0] == false // true\n\n+ []    // 0\n+ {}    // NaN\n[] + {} // \"[object Object]\"\n{} + [] // 0\n\n// 非 0 的数可以转换成 true，但 true 只能转换成 1\n!!2 // true\ntrue == 1   // true\ntrue == 2   // false\n\n// 判断数组是否为空\narr.length === 0\nJSON.stringify(arr) === '[]'\n\n// 判断对象是否为空\nObject.keys(obj).length === 0\nJSON.stringify(obj) === '{}'\n··\n\n### this\n\n··js\nvar a = 'a'\nvar obj = {\n    a: 1,\n    b: this.a,  // 'a'\n    c: function () {\n        console.log(this.a) // 1\n    },\n    d: function () {\n        var e = function () {\n            console.log(this.a)\n        }\n        e() // 'a'\n    }\n}\n··\n\n## 其他\n\n### 判断数组或对象为空\n\n简单的和 false 比较是不准确的\n\n··js\n{} == false // Uncaught SyntaxError: Unexpected token ==\n{} === false // Uncaught SyntaxError: Unexpected token ===\n!{} // false\n!{a:1} // false\n\n[] == false // true\n[] === false // false\n[0] == false // true\n[1] == false // false\n![] // false\n![0] // false\n![1] // false\n··\n\n1、length\n\n··js\narr.length === 0\nObject.keys(obj).length === 0\n··\n\n2、JSON.stringify\n\n··js\nJSON.stringify(arr) === '[]'\nJSON.stringify(obj) === '{}'\n··\n\n## 待\n\n··js\n// 调用函数只会作用于原来的地方，在这个地方调用，并不是把函数拿过来用\nvar a = 'a'\nfunction fnA () {\n    console.log(a)\n}\nfunction fnB () {\n    var a = 66\n    fnA()\n}\nfnB()\n\n// 原生 dataset 会改变标签里面的 data 值\n// jq.data 不会改变标签里面的 data 值\n\n// 时间戳从页面加载开始计时 e.timeStamp\n// offsetX 相对于元素左上角边框以内\n// pageX 相对于文档左上角\n// clientX 相对于浏览器左上角\n// screenX 相对于屏幕左上角\n··\n\n### 运算符优先级\n\n[参照 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table)\n\n&2019/9/17\n"}}},i=r,l=t("2877"),s=Object(l["a"])(i,o,a,!1,null,null,null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0e5b95.ed435688.js.map