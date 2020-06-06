<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# regexp

## 概述

字面量形式新建，以斜杠开始和结束：

··js
var reg = /xyz/g
··

·RegExp·构造函数新建，第一个是正则内容，第二个是修饰符：
··js
var reg = new RegExp('xyz', 'g')
··

## 规则

### 字符类

!!
^：表示字符串应以什么开始，注意只在第一个位置才有效
$：表示字符串应以什么结束，注意只在最后一个位置才有效
|：或关系，即·/cat|dog/·表示匹配·cat·或·dog·
\\：转义符，以匹配元字符本身，需要转义的字符有：·. ^ $ [ { ( ) * + ? | \\ /·
    **注意**，若使用·new RegExp()·则需要用两个·\\·，因为字符串内部会先转义一次
!!

### 范围匹配

指定一段范围使用·[]·表示，比如·[xyz]·表示 x、y、z 之中任选一个匹配，·[210]·表示2、1、0 之中任选一个匹配
!!
^：在方括号内以·^·开头表示除了方括号内的字符都可以匹配，比如·[^xyz]·表示除了 x、y、z 之外都可以匹配
    **注意**·^·只在第一个位置才有效，否则就是字面含义
-：在方括号内连续的字符可用·-·连接，比如所有数字字母可以写成·[0-9a-zA-Z]·
    **注意**·[1-30]·不是从 1 到 30，而是 1 到 3 和 0
!!

### 重复匹配

!!
\\{n}：n 次
\\{n,}：n 到无限次
\\{n,m}：n 到 m 次
?：0 或 1 次，等同于·{0, 1}·
*：0 到无限次，等同于·{0,}·
+：1 到无限次，等同于·{1,}·
*?：0 到无限次，一旦条件满足就不再匹配
+?：1 到无限次，一旦条件满足就不再匹配
!!

### 预定义

!!
\\d：匹配数字，相当于·[0-9]·
\\D：匹配非数字，相当于·[^0-9]·
\\w：匹配字母、数字和下划线，相当于·[A-Za-z0-9_]·
\\W：匹配非字母、数字和下划线，相当于·[^A-Za-z0-9_]·
\\s：匹配空格字符，相当于·[ \\t\\r\\n\\v\\f]·
\\S：匹配非空格字符，相当于·[^ \\t\\r\\n\\v\\f]·
\\b：匹配单词的边界，即单词的前或后只能是·-·或空格或没有字符
\\B：匹配非单词边界，即在词的内部
.：匹配除回车·\\r·、换行·\\n·、行分隔符·\\u2028·和段分隔符·\\u2029·以外的所有字符
    若加上修饰符·s·将指代任意字符，比如·/c.t/s·表示 c 和 t 之间任意一个字符都可以，包括·\\n·
    注意码点大于·0xFFFF·的 Unicode 字符，点字符不能正确匹配，会认为是两个字符，需加上·u·修饰符才能正确识别
!!

··js
// \\b 的例子
var res = /\\bworld/.test('hello world') // true
var res = /\\bworld/.test('hello-world') // true
var res = /\\bworld/.test('helloworld') // false

// \\B 的例子
var res = /\\Bworld/.test('hello-world') // false
var res = /\\Bworld/.test('helloworld') // true
··

### 特殊字符

对一些不能打印的特殊字符的表示

!!
\\cX：匹配·Ctrl-[X]·，·X·是·A-Z·中任一个字母，用来匹配控制字符
\\[\\b]：匹配退格键(U+0008)，注意不是·\\b·
\\n：匹配换行键
\\r：匹配回车键
\\t：匹配制表符 tab（U+0009）
\\v：匹配垂直制表符（U+000B）
\\f：匹配换页符（U+000C）
\\0：匹配·null·字符（U+0000）
\\xhh：匹配一个以两位十六进制数（·\\x00·-·\\xFF·）表示的字符
\\uhhhh：匹配一个以四位十六进制数（·\\u0000·-·\\uFFFF·）表示的 Unicode 字符
!!

### 修饰符

!!
g：全局匹配，默认只匹配一次，加上·g·将匹配所有符合条件的结果
i：不区分字母的大小写，默认是区分大小写的
m：多行模式，让·^·和·$·可匹配行首和行尾，即会识别换行符·\\n·
s：将·.·字符提升为所有字符
y：粘连匹配，与·g·类似也是全局匹配，·g·是剩余位置中存在匹配就可以，·y·是匹配必须从剩余的第一个位置开始
u：Unicode 模式，用来正确处理大于·\\uFFFF·的 Unicode 字符，即会正确处理四个字节的 UTF-16 编码
!!
··js
// m
var res = /^b/m.test('a\\nb') // true
var res = /world$/m.test('hello world\\n') // true

// y
var str = 'aaa_aa_a'
var g = /a+/g
var y = /a+/y
// 第一次行为相同，都剩余 _aa_a
g.exec(str) // ["aaa"]
y.exec(str) // ["aaa"]
// 第二次：g 在剩余的字符串中匹配到 aa，而 y 必须从头开始匹配，第一个字符串是下划线，所以匹配失败
g.exec(str) // ["aa"]
y.exec(str) // null

// 最后一个 a 因为不是出现在下一次匹配的头部所以不会被替换
'aaxa'.replace(/a/gy, '-') // '--xa'
··

### 组匹配

·()·表示分组匹配

··js
var res = /(fred){2}/.test('fredfred') // true
'abc'.replace(/(.)b(.)/, '$1+$2') // 'a+c'
··

#### 引用

用·\\·加数字可引用对应顺序的组匹配内容

··js
var res = /(.)b(.)\\1b\\2/.test('abcabc') // true
var res = /y(..)(.)\\2\\1/.test('yabccab') // true
··

#### 嵌套

··js
// \\1 指向外层括号，\\2 指向内层括号
var res = /y((..)\\2)\\1/.test('yabababab') // true
··

#### 非捕获组

·(?:x)·表示不返回该组匹配的内容

··js
// 正则匹配 foo 或者 foofoo
'foofoo'.match(/(foo){1, 2}/) // ["foofoo", "foo"] 占用一个组匹配
'foofoo'.match(/(?:foo){1, 2}/) // ["foofoo"] 不占用
··

### 具名组匹配

为每一个组匹配指定一个名字，在·()·内部的开头加上·?<name>·即可

··js
let reg = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/u
'2015-01-02'.replace(reg, '$<day>/$<month>/$<year>') // '02/01/2015'

const RE_DATE = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
const matchObj = RE_DATE.exec('1999-12-31')
const year = matchObj.groups.year // 1999
const month = matchObj.groups.month // 12
const day = matchObj.groups.day // 31
··

#### 引用

使用·\\k<组名>·引用具名组匹配

··js
const reg = /^(?<word>[a-z]+)_\\k<word>$/
reg.test('abc_abc') // true
reg.test('abc_ab') // false
··

### 断言

!!
先行断言：·x(?=y)·，·x·只有在·y·前面才匹配，例如匹配后面跟着百分号的数字·/\\d+(?=%)/·
先行否定断言：·x(?!y)·，·x·只有不在·y·前面才匹配，例如要匹配后面跟的不是百分号的数字·/\\d+(?!%)/·
后行断言：·(?<=y)x·，·x·只有在·y·后面才匹配，例如只匹配钱符号之后的数字·/(?<=￥)\\d+/·
后行否定断言：·(?<!y)x·，·x·只有不在·y·后面才匹配，例如只匹配不在钱符号后面的数字·/(?<!￥)\\d+/·
!!

后行断言是先匹配·/(?<=y)x/·的·x·，再回到左边匹配·y·。这种先右后左与其他正则相反，会导致一些不符合预期的行为

组匹配：

··js
// 后 2 个元素相反，因为顺序不同
var res = /^(\\d+)(\\d+)$/.exec('1053') // ["1053", "105", "3"]
var res = /(?<=(\\d+)(\\d+))$/.exec('1053') // ["", "1", "053"]
··

引用

··js
// 后行断言的反斜杠引用 \\1 需放在括号的前面才能引用，与先行断言相反
var res = /(?<=(o)d\\1)r/.exec('hodor')  // null
var res = /(?<=\\1d(o))r/.exec('hodor')  // ["r", "o"]
··

### Unicode 属性类

·\\p{...}·匹配符合 Unicode 某种属性的所有字符，反向匹配为·\\P{...}·
**注意**使用时一定要加上·u·修饰符才能正确识别
Unicode 属性类要指定属性名和属性值，某些属性可以只写属性名或属性值

··js
var reg = /\\p{UnicodePropertyName=UnicodePropertyValue}/
var reg = /\\p{UnicodePropertyName}/
var reg = /\\p{UnicodePropertyValue}/
··

··js
// 匹配一个希腊文字母
var res = /\\p{Script=Greek}/u.test('π') // true

// 匹配各种数字
const regex = /^\\p{Number}+$/u
regex.test('²³¹¼½¾') // true
regex.test('㉛㉜㉝') // true
regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true

// 匹配 Emoji
var reg = /\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F/gu
··

## 属性

!!
RegExp.prototype.global：返回 Boolean 值，表示是否设置了·g·修饰符，全局匹配
RegExp.prototype.ignoreCase：返回 Boolean 值，表示是否设置了·i·修饰符，不区分大小写
RegExp.prototype.multiline：返回 Boolean 值，表示是否设置了·m·修饰符，换行匹配
RegExp.prototype.dotAll：返回 Boolean 值，表示是否设置了·s·修饰符，提升·.·为所有字符
RegExp.prototype.sticky：返回 Boolean 值，表示是否设置了·y·修饰符，粘连匹配
RegExp.prototype.unicode：返回 Boolean 值，表示是否设置了·u·修饰符，Unicode 模式
RegExp.prototype.lastIndex：返回数值，表示下一次开始搜索的位置。该属性可读写，只在进行连续搜索时有意义
RegExp.prototype.source：返回正则表达式内容的字符串形式
RegExp.prototype.flags：返回正则表达式修饰符的字符串形式
!!

··js
var r = /abc/gimsyu

r.global // true
r.ignoreCase // true
r.multiline // true
r.dotAll // true
r.sticky // true
r.unicode // true
r.lastIndex // 0
r.source // "abc"
r.flags // "gimuys"
··

## 方法

字符串对象有 4 个方法可以使用正则表达式：·match()·、·replace()·、·search()·和·split()·
ES6 将这 4 个方法，在语言内部全部调用·RegExp·的实例方法，即所有与正则相关的方法全都定义在·RegExp·对象上
·String.prototype.match·调用·RegExp.prototype[Symbol.match]·
·String.prototype.replace·调用·RegExp.prototype[Symbol.replace]·
·String.prototype.search·调用·RegExp.prototype[Symbol.search]·
·String.prototype.split·调用·RegExp.prototype[Symbol.split]·

### R.p.test()

返回一个 Boolean 值，判断当前模式是否能匹配参数字符串

··js
var res = /cat/.test('cats and dogs') // true
··

若有·g·修饰符，则每一次·test()·都从上一次结束的位置开始向后匹配

··js
var r = /x/g
var s = '_x_x'

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex = 1
r.test(s) // true
··

### R.p.exec()

以数组的形式返回匹配的结果，若匹配失败返回·null·

··js
/x/.exec('_x_x') // ["x"]
··

如果是组匹配，则第一个成员整个匹配的结果，后面的成员与圆括号的匹配结果对应

··js
/_(x)/.exec('_x_x') // ["_x", "x"]
··

·exec·方法的返回数组还包含以下两个属性

!!
input：整个原字符串
index：整个模式匹配成功的开始位置（从 0 开始计数）
!!

若正则表达式加上·g·全局匹配，则可以使用多次·exec·方法，下一次搜索的位置从上一次匹配成功结束的位置开始

··js
var reg = /a/g
var str = 'abc_abc_abc'

var r1 = reg.exec(str)
r1 // ["a"]
r1.index // 0
reg.lastIndex // 1

var r2 = reg.exec(str)
r2 // ["a"]
r2.index // 4
reg.lastIndex // 5
··

### S.p.match()

以数组的形式返回匹配的结果，若匹配失败返回·null·
若没有·g·修饰符则等同于·exec()·
若有·g·修饰符则返回所有匹配的结果，且没有·input·和·index·属性，也不会捕获分组的内容
注意·lastIndex·属性，对·match·方法无效，匹配总是从字符串的第一个字符开始

··js
'abba'.match(/a/g) // ["a", "a"]
··

### S.p.search()

返回第一个满足条件的匹配结果在整个字符串中的位置，若匹配失败返回·-1·

··js
'_x_x'.search(/x/) // 1
··

### S.p.split()

·split(separator, [limit])·：返回一个根据条件分割后的各个部分组成的数组，·separator·为条件，·limit·为要分隔几个

··js
// 非正则分隔
'a,  b,c, d'.split(',') // [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */) // [ 'a', 'b', 'c', 'd' ]
··

如果带有组匹配，则组匹配的部分也会作为数组成员返回

··js
'aaa*a*'.split(/a*/) // ["", "*", "*"]

'aaa*a*'.split(/(a*)/) // [ '', 'aaa', '*', 'a', '*' ]
··

### S.p.replace()

·replace(search, replacement)·：将字符串中匹配的值替换成新值，·search·为条件，·replacement·为新值

··js
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
··

第二个参数可以使用·$·指代所替换的内容：

!!
$&：匹配的子字符串
$\`：匹配结果前面的文本
$'：匹配结果后面的文本
$n：组匹配的第 n 组内容
$$：转义·$·
!!

··js
'13344445555'.replace(/(\\d{3})\\d{4}(\\d{4})/, '$1****$2') // "133****5555"
··

第二个参数还可以是一个函数，函数的返回值为新值，函数的参数：

!!
第一个：每次匹配的结果
第二个 ~ 倒数第三个：对应组匹配的结果（若设置了组匹配）
倒数第二个：当前匹配结果在原字符串中的位置
最后一个：原字符串
!!

··js
'3 and 5'.replace(/\\d/g, res => 2 * res) // "6 and 10"

'3 and 5'.replace(/\\d (and) \\d/g, (res, $1, index, str) => {
    return res
})
··

### S.p.matchAll()

以遍历器（Iterator）的形式返回所有匹配的结果，可直接使用·for...of·循环

··js
const string = 'test1test2test3'
const regex = /t(e)(st(\\d?))/g
for (const match of string.matchAll(regex)) console.log(match)
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
··

## 常用正则

··js
// 任意字符
var res = /./s
var res = /[^]/
var res = /[\\s\\S]/ // 类似的有 /[\\d\\D]/ 等

// 中文
var res = /[\\u4e00-\\u9fa5]/

// 手机号
var res = /^1[3-9]\\d{9}$/
··

&2019/4/2
            `
        }
    }
}
</script>
