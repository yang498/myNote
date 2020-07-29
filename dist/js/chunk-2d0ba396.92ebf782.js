(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ba396"],{"35fd":function(n,e,r){"use strict";r.r(e);var t=function(){var n=this,e=n.$createElement,r=n._self._c||e;return r("div",{domProps:{innerHTML:n._s(n.format(n.text))}})},a=[],s={data:function(){return{text:"\n# regexp\n\n## 概述\n\n字面量形式新建，以斜杠开始和结束：\n\n··js\nvar reg = /xyz/g\n··\n\n·RegExp·构造函数新建，第一个是正则内容，第二个是修饰符：\n··js\nvar reg = new RegExp('xyz', 'g')\n··\n\n## 规则\n\n### 字符类\n\n!!\n^：表示字符串应以什么开始，注意只在第一个位置才有效\n$：表示字符串应以什么结束，注意只在最后一个位置才有效\n|：或关系，即·/cat|dog/·表示匹配·cat·或·dog·\n\\：转义符，以匹配元字符本身，需要转义的字符有：·. ^ $ [ { ( ) * + ? | \\ /·\n    **注意**，若使用·new RegExp()·则需要用两个·\\·，因为字符串内部会先转义一次\n!!\n\n### 范围匹配\n\n指定一段范围使用·[]·表示，比如·[xyz]·表示 x、y、z 之中任选一个匹配，·[210]·表示2、1、0 之中任选一个匹配\n!!\n^：在方括号内以·^·开头表示除了方括号内的字符都可以匹配，比如·[^xyz]·表示除了 x、y、z 之外都可以匹配\n    **注意**·^·只在第一个位置才有效，否则就是字面含义\n-：在方括号内连续的字符可用·-·连接，比如所有数字字母可以写成·[0-9a-zA-Z]·\n    **注意**·[1-30]·不是从 1 到 30，而是 1 到 3 和 0\n!!\n\n### 重复匹配\n\n!!\n\\{n}：n 次\n\\{n,}：n 到无限次\n\\{n,m}：n 到 m 次\n?：0 或 1 次，等同于·{0, 1}·\n*：0 到无限次，等同于·{0,}·\n+：1 到无限次，等同于·{1,}·\n*?：0 到无限次，一旦条件满足就不再匹配\n+?：1 到无限次，一旦条件满足就不再匹配\n!!\n\n### 预定义\n\n!!\n\\d：匹配数字，相当于·[0-9]·\n\\D：匹配非数字，相当于·[^0-9]·\n\\w：匹配字母、数字和下划线，相当于·[A-Za-z0-9_]·\n\\W：匹配非字母、数字和下划线，相当于·[^A-Za-z0-9_]·\n\\s：匹配空格字符，相当于·[ \\t\\r\\n\\v\\f]·\n\\S：匹配非空格字符，相当于·[^ \\t\\r\\n\\v\\f]·\n\\b：匹配单词的边界，即单词的前或后只能是·-·或空格或没有字符\n\\B：匹配非单词边界，即在词的内部\n.：匹配除回车·\\r·、换行·\\n·、行分隔符·\\u2028·和段分隔符·\\u2029·以外的所有字符\n    若加上修饰符·s·将指代任意字符，比如·/c.t/s·表示 c 和 t 之间任意一个字符都可以，包括·\\n·\n    注意码点大于·0xFFFF·的 Unicode 字符，点字符不能正确匹配，会认为是两个字符，需加上·u·修饰符才能正确识别\n!!\n\n··js\n// \\b 的例子\nvar res = /\\bworld/.test('hello world') // true\nvar res = /\\bworld/.test('hello-world') // true\nvar res = /\\bworld/.test('helloworld') // false\n\n// \\B 的例子\nvar res = /\\Bworld/.test('hello-world') // false\nvar res = /\\Bworld/.test('helloworld') // true\n··\n\n### 特殊字符\n\n对一些不能打印的特殊字符的表示\n\n!!\n\\cX：匹配·Ctrl-[X]·，·X·是·A-Z·中任一个字母，用来匹配控制字符\n\\[\\b]：匹配退格键(U+0008)，注意不是·\\b·\n\\n：匹配换行键\n\\r：匹配回车键\n\\t：匹配制表符 tab（U+0009）\n\\v：匹配垂直制表符（U+000B）\n\\f：匹配换页符（U+000C）\n\\0：匹配·null·字符（U+0000）\n\\xhh：匹配一个以两位十六进制数（·\\x00·-·\\xFF·）表示的字符\n\\uhhhh：匹配一个以四位十六进制数（·\\u0000·-·\\uFFFF·）表示的 Unicode 字符\n!!\n\n### 修饰符\n\n!!\ng：全局匹配，默认只匹配一次，加上·g·将匹配所有符合条件的结果\ni：不区分字母的大小写，默认是区分大小写的\nm：多行模式，让·^·和·$·可匹配行首和行尾，即会识别换行符·\\n·\ns：将·.·字符提升为所有字符\ny：粘连匹配，与·g·类似也是全局匹配，·g·是剩余位置中存在匹配就可以，·y·是匹配必须从剩余的第一个位置开始\nu：Unicode 模式，用来正确处理大于·\\uFFFF·的 Unicode 字符，即会正确处理四个字节的 UTF-16 编码\n!!\n··js\n// m\nvar res = /^b/m.test('a\\nb') // true\nvar res = /world$/m.test('hello world\\n') // true\n\n// y\nvar str = 'aaa_aa_a'\nvar g = /a+/g\nvar y = /a+/y\n// 第一次行为相同，都剩余 _aa_a\ng.exec(str) // [\"aaa\"]\ny.exec(str) // [\"aaa\"]\n// 第二次：g 在剩余的字符串中匹配到 aa，而 y 必须从头开始匹配，第一个字符串是下划线，所以匹配失败\ng.exec(str) // [\"aa\"]\ny.exec(str) // null\n\n// 最后一个 a 因为不是出现在下一次匹配的头部所以不会被替换\n'aaxa'.replace(/a/gy, '-') // '--xa'\n··\n\n### 组匹配\n\n·()·表示分组匹配\n\n··js\nvar res = /(fred){2}/.test('fredfred') // true\n'abc'.replace(/(.)b(.)/, '$1+$2') // 'a+c'\n··\n\n#### 引用\n\n用·\\·加数字可引用对应顺序的组匹配内容\n\n··js\nvar res = /(.)b(.)\\1b\\2/.test('abcabc') // true\nvar res = /y(..)(.)\\2\\1/.test('yabccab') // true\n··\n\n#### 嵌套\n\n··js\n// \\1 指向外层括号，\\2 指向内层括号\nvar res = /y((..)\\2)\\1/.test('yabababab') // true\n··\n\n#### 非捕获组\n\n·(?:x)·表示不返回该组匹配的内容\n\n··js\n// 正则匹配 foo 或者 foofoo\n'foofoo'.match(/(foo){1, 2}/) // [\"foofoo\", \"foo\"] 占用一个组匹配\n'foofoo'.match(/(?:foo){1, 2}/) // [\"foofoo\"] 不占用\n··\n\n### 具名组匹配\n\n为每一个组匹配指定一个名字，在·()·内部的开头加上·?<name>·即可\n\n··js\nlet reg = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/u\n'2015-01-02'.replace(reg, '$<day>/$<month>/$<year>') // '02/01/2015'\n\nconst RE_DATE = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/\nconst matchObj = RE_DATE.exec('1999-12-31')\nconst year = matchObj.groups.year // 1999\nconst month = matchObj.groups.month // 12\nconst day = matchObj.groups.day // 31\n··\n\n#### 引用\n\n使用·\\k<组名>·引用具名组匹配\n\n··js\nconst reg = /^(?<word>[a-z]+)_\\k<word>$/\nreg.test('abc_abc') // true\nreg.test('abc_ab') // false\n··\n\n### 断言\n\n!!\n先行断言：·x(?=y)·，·x·只有在·y·前面才匹配，例如匹配后面跟着百分号的数字·/\\d+(?=%)/·\n先行否定断言：·x(?!y)·，·x·只有不在·y·前面才匹配，例如要匹配后面跟的不是百分号的数字·/\\d+(?!%)/·\n后行断言：·(?<=y)x·，·x·只有在·y·后面才匹配，例如只匹配钱符号之后的数字·/(?<=￥)\\d+/·\n后行否定断言：·(?<!y)x·，·x·只有不在·y·后面才匹配，例如只匹配不在钱符号后面的数字·/(?<!￥)\\d+/·\n!!\n\n后行断言是先匹配·/(?<=y)x/·的·x·，再回到左边匹配·y·。这种先右后左与其他正则相反，会导致一些不符合预期的行为\n\n组匹配：\n\n··js\n// 后 2 个元素相反，因为顺序不同\nvar res = /^(\\d+)(\\d+)$/.exec('1053') // [\"1053\", \"105\", \"3\"]\nvar res = /(?<=(\\d+)(\\d+))$/.exec('1053') // [\"\", \"1\", \"053\"]\n··\n\n引用\n\n··js\n// 后行断言的反斜杠引用 \\1 需放在括号的前面才能引用，与先行断言相反\nvar res = /(?<=(o)d\\1)r/.exec('hodor')  // null\nvar res = /(?<=\\1d(o))r/.exec('hodor')  // [\"r\", \"o\"]\n··\n\n### Unicode 属性类\n\n·\\p{...}·匹配符合 Unicode 某种属性的所有字符，反向匹配为·\\P{...}·\n**注意**使用时一定要加上·u·修饰符才能正确识别\nUnicode 属性类要指定属性名和属性值，某些属性可以只写属性名或属性值\n\n··js\nvar reg = /\\p{UnicodePropertyName=UnicodePropertyValue}/\nvar reg = /\\p{UnicodePropertyName}/\nvar reg = /\\p{UnicodePropertyValue}/\n··\n\n··js\n// 匹配一个希腊文字母\nvar res = /\\p{Script=Greek}/u.test('π') // true\n\n// 匹配各种数字\nconst regex = /^\\p{Number}+$/u\nregex.test('²³¹¼½¾') // true\nregex.test('㉛㉜㉝') // true\nregex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true\n\n// 匹配 Emoji\nvar reg = /\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F/gu\n··\n\n## 属性\n\n!!\nRegExp.prototype.global：返回 Boolean 值，表示是否设置了·g·修饰符，全局匹配\nRegExp.prototype.ignoreCase：返回 Boolean 值，表示是否设置了·i·修饰符，不区分大小写\nRegExp.prototype.multiline：返回 Boolean 值，表示是否设置了·m·修饰符，换行匹配\nRegExp.prototype.dotAll：返回 Boolean 值，表示是否设置了·s·修饰符，提升·.·为所有字符\nRegExp.prototype.sticky：返回 Boolean 值，表示是否设置了·y·修饰符，粘连匹配\nRegExp.prototype.unicode：返回 Boolean 值，表示是否设置了·u·修饰符，Unicode 模式\nRegExp.prototype.lastIndex：返回数值，表示下一次开始搜索的位置。该属性可读写，只在进行连续搜索时有意义\nRegExp.prototype.source：返回正则表达式内容的字符串形式\nRegExp.prototype.flags：返回正则表达式修饰符的字符串形式\n!!\n\n··js\nvar r = /abc/gimsyu\n\nr.global // true\nr.ignoreCase // true\nr.multiline // true\nr.dotAll // true\nr.sticky // true\nr.unicode // true\nr.lastIndex // 0\nr.source // \"abc\"\nr.flags // \"gimuys\"\n··\n\n## 方法\n\n字符串对象有 4 个方法可以使用正则表达式：·match()·、·replace()·、·search()·和·split()·\nES6 将这 4 个方法，在语言内部全部调用·RegExp·的实例方法，即所有与正则相关的方法全都定义在·RegExp·对象上\n·String.prototype.match·调用·RegExp.prototype[Symbol.match]·\n·String.prototype.replace·调用·RegExp.prototype[Symbol.replace]·\n·String.prototype.search·调用·RegExp.prototype[Symbol.search]·\n·String.prototype.split·调用·RegExp.prototype[Symbol.split]·\n\n### R.p.test()\n\n返回一个 Boolean 值，判断当前模式是否能匹配参数字符串\n\n··js\nvar res = /cat/.test('cats and dogs') // true\n··\n\n若有·g·修饰符，则每一次·test()·都从上一次结束的位置开始向后匹配\n\n··js\nvar r = /x/g\nvar s = '_x_x'\n\nr.lastIndex // 0\nr.test(s) // true\n\nr.lastIndex // 2\nr.test(s) // true\n\nr.lastIndex = 1\nr.test(s) // true\n··\n\n### R.p.exec()\n\n以数组的形式返回匹配的结果，若匹配失败返回·null·\n\n··js\n/x/.exec('_x_x') // [\"x\"]\n··\n\n如果是组匹配，则第一个成员整个匹配的结果，后面的成员与圆括号的匹配结果对应\n\n··js\n/_(x)/.exec('_x_x') // [\"_x\", \"x\"]\n··\n\n·exec·方法的返回数组还包含以下两个属性\n\n!!\ninput：整个原字符串\nindex：整个模式匹配成功的开始位置（从 0 开始计数）\n!!\n\n若正则表达式加上·g·全局匹配，则可以使用多次·exec·方法，下一次搜索的位置从上一次匹配成功结束的位置开始\n\n··js\nvar reg = /a/g\nvar str = 'abc_abc_abc'\n\nvar r1 = reg.exec(str)\nr1 // [\"a\"]\nr1.index // 0\nreg.lastIndex // 1\n\nvar r2 = reg.exec(str)\nr2 // [\"a\"]\nr2.index // 4\nreg.lastIndex // 5\n··\n\n### S.p.match()\n\n以数组的形式返回匹配的结果，若匹配失败返回·null·\n若没有·g·修饰符则等同于·exec()·\n若有·g·修饰符则返回所有匹配的结果，且没有·input·和·index·属性，也不会捕获分组的内容\n注意·lastIndex·属性，对·match·方法无效，匹配总是从字符串的第一个字符开始\n\n··js\n'abba'.match(/a/g) // [\"a\", \"a\"]\n··\n\n### S.p.search()\n\n返回第一个满足条件的匹配结果在整个字符串中的位置，若匹配失败返回·-1·\n\n··js\n'_x_x'.search(/x/) // 1\n··\n\n### S.p.split()\n\n·split(separator, [limit])·：返回一个根据条件分割后的各个部分组成的数组，·separator·为条件，·limit·为要分隔几个\n\n··js\n// 非正则分隔\n'a,  b,c, d'.split(',') // [ 'a', '  b', 'c', ' d' ]\n\n// 正则分隔，去除多余的空格\n'a,  b,c, d'.split(/, */) // [ 'a', 'b', 'c', 'd' ]\n··\n\n如果带有组匹配，则组匹配的部分也会作为数组成员返回\n\n··js\n'aaa*a*'.split(/a*/) // [\"\", \"*\", \"*\"]\n\n'aaa*a*'.split(/(a*)/) // [ '', 'aaa', '*', 'a', '*' ]\n··\n\n### S.p.replace()\n\n·replace(search, replacement)·：将字符串中匹配的值替换成新值，·search·为条件，·replacement·为新值\n\n··js\n'aaa'.replace('a', 'b') // \"baa\"\n'aaa'.replace(/a/, 'b') // \"baa\"\n'aaa'.replace(/a/g, 'b') // \"bbb\"\n··\n\n第二个参数可以使用·$·指代所替换的内容：\n\n!!\n$&：匹配的子字符串\n$`：匹配结果前面的文本\n$'：匹配结果后面的文本\n$n：组匹配的第 n 组内容\n$$：转义·$·\n!!\n\n··js\n'13344445555'.replace(/(\\d{3})\\d{4}(\\d{4})/, '$1****$2') // \"133****5555\"\n··\n\n第二个参数还可以是一个函数，函数的返回值为新值，函数的参数：\n\n!!\n第一个：每次匹配的结果\n第二个 ~ 倒数第三个：对应组匹配的结果（若设置了组匹配）\n倒数第二个：当前匹配结果在原字符串中的位置\n最后一个：原字符串\n!!\n\n··js\n'3 and 5'.replace(/\\d/g, res => 2 * res) // \"6 and 10\"\n\n'3 and 5'.replace(/\\d (and) \\d/g, (res, $1, index, str) => {\n    return res\n})\n··\n\n### S.p.matchAll()\n\n以遍历器（Iterator）的形式返回所有匹配的结果，可直接使用·for...of·循环\n\n··js\nconst string = 'test1test2test3'\nconst regex = /t(e)(st(\\d?))/g\nfor (const match of string.matchAll(regex)) console.log(match)\n// [\"test1\", \"e\", \"st1\", \"1\", index: 0, input: \"test1test2test3\"]\n// [\"test2\", \"e\", \"st2\", \"2\", index: 5, input: \"test1test2test3\"]\n// [\"test3\", \"e\", \"st3\", \"3\", index: 10, input: \"test1test2test3\"]\n··\n\n## 常用正则\n\n··js\n// 任意字符\nvar res = /./s\nvar res = /[^]/\nvar res = /[\\s\\S]/ // 类似的有 /[\\d\\D]/ 等\n\n// 中文\nvar res = /[\\u4e00-\\u9fa5]/\n\n// 手机号\nvar res = /^1[3-9]\\d{9}$/\n··\n\n&2019/4/2\n            "}}},o=s,c=r("2877"),p=Object(c["a"])(o,t,a,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0ba396.92ebf782.js.map