<template>
    <div v-html="format(text)"></div>
</template>

<script>
/* eslint-disable no-useless-escape */
export default {
    data () {
        return {
            text: `
# string

## 概述

### 语法

字符串就是零个或多个排在一起的字符，放在引号之中：

··js
'string' // 单引号
"string" // 双引号
\`string\` // 反单引号
'key = "value"' // 不同的引号之间可以相互嵌套
'Did she say \\'Hello\\'?' // 相同引号的嵌套需用 \\ 在引号前面转义
··

单双引号的字符串只能写在一行内，否则报错，分成多行的方式：

··js
// 每行尾部使用反斜杠，注意反斜杠后面除了换行符不能有其他字符
var longString = 'Long \\
    string'

// 使用 + 连接
var longString = 'Long '
    + 'string'

// 使用反单引号
var longString = \`Long
    string\`
··

特殊字符需要使用反斜杠·\\·转义，如果在非特殊字符前面使用反斜杠会被省略

!!
\\\\0：null（·\\u0000·）
\\b：后退键（·\\u0008·）
\\f：换页符（·\\u000C·）
\\n：换行符（·\\u000A·）
\\r：回车键（·\\u000D·）
\\t：制表符（·\\u0009·）
\\v：垂直制表符（·\\u000B·）
\\'：单引号（·\\u0027·）
\\"：双引号（·\\u0022·）
\\\\：反斜杠（·\\u005C·）
\\HHH：·\\·接三个八进制数（000 到 377）代表一个字符，·HHH·对应该字符的 Unicode 码点
\\xHH：·\\x·接两个十六进制数（00 到 FF）代表一个字符，·HH·对应该字符的 Unicode 码点
\\uXXXX：·\\u·接四个十六进制数（0000 到 FFFF）代表一个字符，·XXXX·对应该字符的 Unicode 码点
!!

### 字符串对象

通过引号和·String()·定义的字符串是基本字符串，通过·new String()·定义的是字符串对象
只有·new String()·生成字符串对象才有字符串的属性方法，或者通过索引查询值
当基本字符串也使用字符串的属性方法时，JavaScript 会自动将其转化为字符串对象，虽然结果相同，但本质有点区别

··js
'abc' === String('abc') // true
'abc' === new String('abc') // false
typeof 'abc'    // string
typeof new String('abc')    // object
new String('abc')   // {0: 'a', 1: 'b', 2: 'c', length: 3}
new String('abc').valueOf() // abc（原始字符串）
new String('abc') + 'd' // abcd

// 字符串类似数组，有长度和索引
'abc'[1]    // b
'abc'.length    // 3

// 改变长度和某个字符不会改变字符串，除了对字符串重新赋值
var s = 'hello'
delete s[0]
s[1] = 'a'
s.length = 3
··

String 对象还可以当作工具方法使用，将任意类型的值转为字符串

··js
String(true) // "true"
String(5) // "5"
··

### 字符集

JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示
所以将字符写成·\\uxxxx·的形式也能表示字符，输出的时候依然会转成字面形式
一开始每个字符都是以 16 位（2 个字节）的 UTF-16 格式储存，码点处于·0000~FFFF·，
而随着纳入的字符越来越多，并出现了 4 个字节的编码，范围也扩大到了·10FFFF·
对于码点在·U+0000~U+FFFF·之间的字符，长度为 16 位（2 个字节）
在·U+10000~U+10FFFF·之间的字符，长度为 32 位（4 个字节）
4 个字节的字符其中前两个字节在·0xD800~0xDBFF·之间，后两个字节在·0xDC00~0xDFFF·之间
例如码点·U+1D306·对应的字符为·𝌆·，它写成 UTF-16 就是·0xD834 0xDF06·。
例如·𝌆·，浏览器会正确识别这是一个字符，实际在 JavaScript 内部是由两个字符组成的

··js
'𝌆'.length  // 2
··

### Base64 转码

Base64 是一种编码方法，可以将任意 [ASCII](http://www.asciitable.com/) 码字符转成·0~9 A~Z a~z + /·这 64 个字符组成。用于避免出现特殊字符简化处理
有时需要以文本格式传递二进制数据也可以使用 Base64 编码
有两个 Base64 转换的方法：

!!
btoa()：任意值转为 Base64 编码
atob()：Base64 编码转为原来的值
!!

··js
btoa('Hello World!') // SGVsbG8gV29ybGQh
atob('SGVsbG8gV29ybGQh') // Hello World!

btoa('你好') // 报错，不适合非 ASCII 码的字符
// 所以需要先转码再使用
btoa(encodeURIComponent('你好'))    // JUU0JUJEJUEwJUU1JUE1JUJE
decodeURIComponent(atob('JUU0JUJEJUEwJUU1JUE1JUJE'))    // 你好
··

## 属性方法

### 静态方法

!!
String.fromCharCode(...Unicode)：返回由 Unicode 码点组成的字符串
    Unicode {Number}：一个或多个数值，代表 Unicode 码点
    注意码点大于·0xFFFF·的字符需用 2 个参数表示
!!

### 实例属性

!!
String.prototype.length：字符串的长度
!!

### 实例方法

以下方法前面省略·String.prototype.·

!!
slice(begin, end)：指定范围提取字符串某一段，参数可以是负数表示倒数，若·begin·大于·end·则返回空字符串
    begin {Number} [0]：开始位置
    end {Number} [length]：结束位置（不含该位置）
substring(begin, end)：和·slice()·相似，区别在于：任一参数小于 0 就会当作 0，·begin·大于·end·则参数互换
    此方法太违反直觉，建议使用·slice()·
substr(begin, length)：和·slice()·相似，区别在于第二个参数是长度
    begin {Number} [0]：开始位置
    length {Number} [length - begin]：要提取的长度
split(rule, length)：按照给定参数的规则分割字符串，返回一个由分割出来的子字符串组成的数组
    rule {String/Regexp}：分割规则，关于正则分割见《regexp》
    length {Number}：指定要分割几个
indexOf(str, start)：查找参数在原字符串中第一次出现的索引，若没找到返回·-1·，第二个参数表示起始查找位置
lastIndexOf(str, start)：和·indexOf()·相似，区别在于从右往左找

localeCompare(compareStr, lang)：比较两个字符串，左边小于右边返回·<0·的数，相等返回 0，大于返回·>0·的数
    实际上是在比较 Unicode 码点大小的基础上，又考虑了自然语言的顺序
    lang {String}：比较的语言，默认为英文，可选简体中文（拼音）·zh-Hans-CN·，更多语言见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
trim()：去除字符串两端的空格，包括制表符·\\t \\v·、换行符·\\n·和回车符·\\r·
toLowerCase()：将字符串的英文字母全部转为小写
toUpperCase()：将字符串的英文字母全部转为大写
match(str/reg)：以数组的形式返回匹配的结果，若匹配失败返回·null·，关于正则匹配见《regexp》
search(str/reg)：和·indexOf()·相似，区别在于：没有第二个参数，且可以使用正则，关于正则匹配见《regexp》
replace(str/reg, newStr)：将字符串匹配的部分替换为新字符串，见《regexp》

concat(...obj)：将任意对象连接成字符串，可以用·+·代替
charAt(index)：返回指定位置的字符，可以用下标替代
charCodeAt(index)：返回指定位置的 Unicode 码点，即·String.fromCharCode()·的逆操作
    注意 4 个字节的字符需连续使用 2 次，即·charCodeAt(index) + ' ' + charCodeAt(index + 1)·
!!

### split()

··js
'a|b|c'.split('|')  // ['a', 'b', 'c']
'a|b|c'.split() // ['a|b|c']
'a|b|c'.split('')   // ['a', '|', 'b', '|', 'c']
'|a||c|'.split('|') // ['', 'a', '', 'c', '']
'a|b|c'.split('|', 1)   // ['a']
··

### localeCompare()

··js
'a' < 'b' // true （a 的 Unicode 码点小于 b，即先 a 后 b）
'a'.localeCompare('b') // -1 （同 Unicode 码点排序）

'a' < 'A' // false （a 的 Unicode 码点大于 A，即先 A 后 a）
'a'.localeCompare('A') // -1 （语言顺序上又是先 a 后 A）

['深圳', '北京', '上海', '广州'].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')) // 中文按拼音排序
··

## es6 方法

### 静态方法

!!
String.fromCodePoint(...Unicode)：·fromCharCode()·的升级版，能识别码点大于·0xFFFF·的字符
String.raw(str)：返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，通常用于模板字符串的处理方法
!!

### 实例方法

以下方法前面省略·String.prototype.·

!!
includes(str, start)：判断是否在原字符串中找到了参数字符串，第二个参数表示起始搜索的位置
startsWith(str, start)：判断参数字符串是否在原字符串的头部，第二个参数表示起始搜索的位置
endsWith(str, n)：判断参数字符串是否在原字符串的尾部，第二个参数表示在前·n·个字符中匹配
repeat(n)：将字符串重复·n·次
padStart(length, str)：在字符串前面使用第二个参数·str·补全为新的长度即第一个参数·length·
    如果省略第二个参数，默认使用空格补全长度
padEnd(length, str)：在原字符串后面补全为新的长度，用法同·padStart()·
trimStart()：消除字符串头部的空格，浏览器还部署了额外的别名方法·trimLeft()·
trimEnd()：消除字符串尾部的空格，浏览器还部署了额外的别名方法·trimRight()·
matchAll()：返回一个正则表达式在当前字符串的所有匹配，详见《regexp》

codePointAt(index)：·charCodeAt()·的升级版，能正确处理 4 字节字符
normalize()：一些带有语调和重音符号的语言的字符串，和对应的合成符号是不相等的，此方法将其标准化以相等
!!

## es6

### Unicode 表示法

对于超出范围·\\u0000~\\uFFFF·的增强表示：·\\u{xxxxx}·，将码点放入大括号

··js
// 原来
'\\uD842\\uDFB7' // 𠮷
// 现在
'\\u{20BB7}' // 𠮷
··

于是共有 6 种方法可以表示一个字符：

··js
'\z' === 'z'  // true
'\\172' === 'z' // true
'\\x7A' === 'z' // true
'\\u007A' === 'z' // true
'\\u{7A}' === 'z' // true
··

### 遍历器接口

ES6 为字符串添加了遍历器接口（详见《es6 - Iterator》），即可以用·for...of·循环
而且·for...of·可以识别大于·0xFFFF·的码点，传统的·for·循环无法识别

··js
for (let codePoint of 'foo') console.log(codePoint)
// f
// o
// o
··

### 模板字符串

增强版字符串表示法，使用·\`·反单引号，可以用来定义多行字符串，空格和缩进都会被保留
模板字符串中嵌入变量，需要将变量名写在·\${}·之中，大括号内部可以放入任意的表达式和运算：

··js
let x = 1
let y = 2
\`\${x} + \${y} = \${x + y}\` // 1 + 2 = 3
··

·\${}·中可以继续嵌套：

··js
const tmpl = addrs => \`
<table>
\${addrs.map(addr => \`¿
    <tr><td>\${addr.first}</td></tr>
    <tr><td>\${addr.last}</td></tr>
\`¿).join('')}
</table>
\`
··

如果要在模板字符串中表示·\${}·字符串，需在·$·前面加上转义符，即·\`\\\${}\`·

### 标签模板

模板字符串可以紧跟在一个函数名后面，相当于将括号改成模板字符串

··js
alert\`123\`
// 等同于
alert(123)
··

当模板字符里面有变量时不是简单的合并，而会处理成多个参数：

··js
let a = 5
let b = 10

tag\`Hello \${ a + b } world \${ a * b }\`
// 等同于
tag(['Hello ', ' world ', ''], 15, 50)
··

相当于对字符串模板进行·split()·分割，参数就是·\${}·，再依次把·\${}·中计算的结果作为后面的参数

&2019/7/13
`
        }
    }
}
</script>
