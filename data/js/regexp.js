commonData.js.regexp.content = `
	#介绍
	正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本
	比如正则表达式给出一个 Email 地址的模式，用它来确定一个字符串是否为 Email 地址。JavaScript 的正则表达式体系是参照 Perl 5 建立的
	有两种方式新建：
	··
	// 字面量形式，以斜杠开始和结束
	var reg = /xyz/g

	// 使用 RegExp 构造函数，参数是字符串，第一个是正则内容，第二个是修饰符
	var reg = new RegExp('xyz', 'g')
	// 参数也可以是正则，但等价于字面量形式（es5 不能用第二个字符串添加修饰符，es6 能添加且会覆盖第一个正则的修饰符）
	var reg = new RegExp(/xyz/i)
	··

	#规则
	大部分字符在正则表达式中就是字面的含义，比如·/a/·匹配·a·，·/b/·匹配·b·，这种字符就叫做“字面量字符”（literal characters）
	还有一部分字符有特殊含义，不代表字面的意思，它们叫做“元字符”（metacharacters），如·. ^ $ | \\ * + ? () [] {}·

	##字符类
	!!
	^：表示字符串应以什么开始，注意只在第一个位置才有效
	$：表示字符串应以什么结束，注意只在最后一个位置才有效
	|：或关系，即·/cat|dog/·表示匹配·cat·或·dog·
	\\：转义符，以匹配元字符本身，需要转义的字符有 12 个：·. ^ $ [ { ( ) * + ? | \\·
		注意若使用·new RegExp()·则需要用两个·\\·，因为字符串内部会先转义一次
	!!
	··
	// test 必须出现在开始位置
	/^test/.test('test123') // true

	// test 必须出现在结束位置
	/test$/.test('new test') // true

	// 从开始位置到结束位置只有 test
	/^test$/.test('test') // true
	/^test$/.test('test test') // false
	··

	##范围匹配
	指定一段范围使用·[]·表示，比如·[xyz]·表示 x、y、z 之中任选一个匹配，·[210]·表示2、1、0 之中任选一个匹配
	!!
	^：在方括号内以·^·开头表示除了方括号内的字符都可以匹配，比如·[^xyz]·表示除了 x、y、z 之外都可以匹配
		注意·^·只在第一个位置才有效，否则就是字面含义
	-：在方括号内连续的字符可用·-·连接，比如所有数字字母可以写成·[0-9a-zA-Z]·，注意·[1-30]·不是从 1 到 30，而是 1 到 3 和 0
	!!

	##重复匹配
	指定重复匹配的次数使用大括号·{}·表示，·{n}·表示重复·n·次，·{n,}·表示至少重复·n·次，·{n,m}·表示重复不少于·n·次，不多于·m·次
	量词符有：
	!!
	?：0 次或 1 次，等同于·{0, 1}·
	*：0 次或多次，等同于·{0,}·
	+：1 次或多次，等同于·{1,}·
	*?：0 次或多次，一旦条件满足就不再匹配
	+?：1 次或多次，一旦条件满足就不再匹配
	!!
	###贪婪模式
	·*·和·+·是一直匹配到不满足为止，这被称为贪婪模式，而对应的就是非贪婪模式，一旦条件满足就不再匹配，即·*?·和·+?·
	··
	'aaa'.match(/a+/) // ["aaa"]
	'aaa'.match(/a+?/) // ["a"]

	'abbbaddda'.match(/a[^]*a/) // ["abbbaddda"]
	'abbbaddda'.match(/a[^]*?a/) // ["abbba"]
	··

	##预定义
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
	··
	// \\b 的例子
	/\\bworld/.test('hello world') // true
	/\\bworld/.test('hello-world') // true
	/\\bworld/.test('helloworld') // false

	// \\B 的例子
	/\\Bworld/.test('hello-world') // false
	/\\Bworld/.test('helloworld') // true
	··

	##特殊字符
	对一些不能打印的特殊字符的表示
	!!
	\\cX：匹配·Ctrl-[X]·，·X·是·A-Z·中任一个字母，用来匹配控制字符
	[¿\\b]：匹配退格键(U+0008)，注意不是·\\b·
	\\n：匹配换行键
	\\r：匹配回车键
	\\t：匹配制表符 tab（U+0009）
	\\v：匹配垂直制表符（U+000B）
	\\f：匹配换页符（U+000C）
	\\0：匹配·null·字符（U+0000）
	\\xhh：匹配一个以两位十六进制数（·\\x00·-·\\xFF·）表示的字符
	\\uhhhh：匹配一个以四位十六进制数（·\\u0000·-·\\uFFFF·）表示的 Unicode 字符
	!!

	##修饰符
	修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部，可以单个或多个使用
	!!
	g：全局匹配，默认只匹配一次，加上·g·将匹配所有符合条件的结果
	i：不区分字母的大小写，默认是区分大小写的
	m：多行模式，修改·^·和·$·的行为，默认·^·和·$·匹配字符串的开始和结尾处，加上·m·后，·^·和·$·将匹配行首和行尾，即会识别换行符·\\n·
	u：Unicode 模式，用来正确处理大于·\\uFFFF·的 Unicode 字符，即会正确处理四个字节的 UTF-16 编码
	y：“粘连”（sticky），与·g·类似也是全局匹配，·g·是剩余位置中存在匹配就可以，·y·是匹配必须从剩余的第一个位置开始
	s：将·.·字符提升为所有字符
	!!
	··
	// m
	/world$/.test('hello world\\n') // false
	/world$/m.test('hello world\\n') // true
	/^b/m.test('a\\nb') // true

	// u
	/^\\uD83D/.test('\\uD83D\\uDC2A') // true
	/^\\uD83D/u.test('\\uD83D\\uDC2A') // false
	/^.$/.test('𠮷') // false
	/^.$/u.test('𠮷') // true
	// 大括号中可表示 Unicode 字符，没有 u 修饰符将被解读为重复的次数
	/\\u{20BB7}/u.test('𠮷')

	// y
	var s = 'aaa_aa_a'
	var r1 = /a+/g
	var r2 = /a+/y
	// 第一次行为相同，都剩余 _aa_a
	r1.exec(s) // ["aaa"]
	r2.exec(s) // ["aaa"]
	// 第二次：g 在剩余的字符串中匹配到 aa，而 y 必须从头开始匹配，第一个字符串是下划线，所以匹配失败
	r1.exec(s) // ["aa"]
	r2.exec(s) // null
	// y 修饰符的设计本意，就是让头部匹配的标志 ^ 在全局匹配中都有效
	'aaxa'.replace(/a/gy, '-') // '--xa'，最后一个 a 因为不是出现在下一次匹配的头部所以不会被替换

	// y 应用：从字符串提取 token（词元），确保了匹配之间不会有漏掉的字符
	const y = /\\s*(\\+|[0-9]+)\\s*/y
	const g = /\\s*(\\+|[0-9]+)\\s*/g
	const tokenize = function (res, str) {
	  let result = []
	  let match
	  while (match = res.exec(str)) result.push(match[1])
	  return result
	}
	tokenize(g, '3 + 4') // [ '3', '+', '4' ]
	tokenize(y, '3 + 4') // [ '3', '+', '4' ]
	tokenize(g, '3x + 4') // [ '3', '+', '4' ]
	tokenize(y, '3x + 4') // [ '3' ]，遇到非法字符停止匹配
	··

	##组匹配
	·()·表示分组匹配，
	··
	/(fred){2}/.test('fredfred') // true
	'abcabc'.match(/(.)b(.)/) // ['abc', 'a', 'c']
	··
	注意若·match·中使用组匹配时还使用了·g·修饰符，将不会捕获分组的内容
	··
	'abcabc'.match(/(.)b(.)/g) // ['abc', 'abc']
	··
	用·\\n·引用括号匹配的内容，·n·是从 1 开始的自然数，表示对应顺序的括号
	··
	/(.)b(.)\\1b\\2/.test('abcabc') // true
	/(.)b(.)\\1b\\2/.test('abcbbb') // false

	/y(..)(.)\\2\\1/.test('yabccab') // true
	··
	括号还可以嵌套
	··
	// \\1 指向外层括号，\\2 指向内层括号
	/y((..)\\2)\\1/.test('yabababab') // true
	··
	###非捕获组
	·(?:x)·称为非捕获组（Non-capturing group），表示不返回该组匹配的内容
	··
	// 正则匹配 foo 或者 foofoo
	'foofoo'.match(/(foo){1, 2}/) // ["foofoo", "foo"] 占用一个组匹配
	'foofoo'.match(/(?:foo){1, 2}/) // ["foofoo"] 不占用
	··

	##具名组匹配
	在组匹配时，每一组的匹配含义不容易看出来，而且匹配的结果只能用数字序号引用，要是组的顺序变了又要修改序号
	··
	const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/

	const matchObj = RE_DATE.exec('1999-12-31')
	const year = matchObj[1] // 1999
	const month = matchObj[2] // 12
	const day = matchObj[3] // 31
	··
	ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用
	在·()·内部的开头加上·?<name>·即可，返回结果的·groups·属性上可读取对应的属性，原返回的数组数据不变
	若没有对应的匹配结果，则属性名还在，属性值为·undefined·
	··
	const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/

	const matchObj = RE_DATE.exec('1999-12-31')
	const year = matchObj.groups.year // 1999
	const month = matchObj.groups.month // 12
	const day = matchObj.groups.day // 31
	··
	###内部引用
	在正则表达式内部引用某个“具名组匹配”，可以使用·\k<组名>·的写法，原来的·\\n·仍可使用，且能同时使用
	··
	const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
	RE_TWICE.test('abc!abc') // true
	RE_TWICE.test('abc!ab') // false
	··
	###解构赋值
	··
	let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
	one  // foo
	two  // bar
	··
	###字符串替换
	使用·replace()·字符串替换时，使用·$<组名>·引用具名组
	··
	let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
	'2015-01-02'.replace(re, '$<day>/$<month>/$<year>') // '02/01/2015'
	··
	若第二个参数是函数，则该函数的参数在最后增加一个·groups·参数，即具名组构成的一个对象


	##断言
	!!
	先行断言：·x(?=y)·，·x·只有在·y·前面才匹配，·y·不会被计入返回结果，比如要匹配后面跟着百分号的数字·/\d+(?=%)/·
	先行否定断言：·x(?!y)·，·x·只有不在·y·前面才匹配，·y·不会被计入返回结果，比如要匹配后面跟的不是百分号的数字·/\d+(?!%)/·
	后行断言：·(?<=y)x·，·x·只有在·y·后面才匹配，·y·不会被计入返回结果，比如只匹配美元符号之后的数字·/(?<=\\$)\\d+/·
	后行否定断言：·(?<!y)x·，·x·只有不在·y·后面才匹配，·y·不会被计入返回结果，比如只匹配不在美元符号后面的数字·/(?<!\\$)\\d+/·
	!!
	后行断言是先匹配·/(?<=y)x/·的·x·，再回到左边匹配·y·。这种“先右后左”的顺序与其他正则操作相反，会导致了一些不符合预期的行为
	组匹配：
	··
	// 后 2 个元素相反，因为顺序不同
	/^(\\d+)(\\d+)$/.exec('1053') // ["1053", "105", "3"]
	/(?<=(\\d+)(\\d+))$/.exec('1053') // ["", "1", "053"]
	··
	引用
	··
	// 后行断言的反斜杠引用 \\1 需放在括号的前面才能引用，与先行断言相反
	/(?<=(o)d\\1)r/.exec('hodor')  // null
	/(?<=\\1d(o))r/.exec('hodor')  // ["r", "o"]
	··

	##Unicode 属性类
	ES2018 引入了一种新的类的写法·\p{...}·和·\P{...}·，允许正则表达式匹配符合 Unicode 某种属性的所有字符
	Unicode 属性类要指定属性名和属性值，某些属性可以只写属性名或属性值
	··
	\\p{UnicodePropertyName=UnicodePropertyValue}
	\\p{UnicodePropertyName}
	\\p{UnicodePropertyValue}
	··
	·\P{…}·是·\p{…}·的反向匹配，即匹配不满足条件的字符，注意使用时一定要加上·u·修饰符才能正确识别
	··
	// 匹配一个希腊文字母
	/\\p{Script=Greek}/u.test('π') // true

	// 匹配各种数字
	const regex = /^\\p{Number}+$/u
	regex.test('²³¹¼½¾') // true
	regex.test('㉛㉜㉝') // true
	regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true

	// 匹配 Emoji
	/\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F/gu
	··

	#属性
	!!
	RegExp.prototype.global：返回一个 Boolean 值，表示是否设置了·g·修饰符，全局匹配
	RegExp.prototype.ignoreCase：返回一个 Boolean 值，表示是否设置了·i·修饰符，不区分大小写
	RegExp.prototype.multiline：返回一个 Boolean 值，表示是否设置了·m·修饰符，换行匹配
	RegExp.prototype.unicode：返回一个 Boolean 值，表示是否设置了·u·修饰符，Unicode 模式
	RegExp.prototype.sticky：返回一个 Boolean 值，表示是否设置了·y·修饰符，粘连匹配
	RegExp.prototype.dotAll：返回一个 Boolean 值，表示是否设置了·s·修饰符，提升·.·为所有字符
	RegExp.prototype.lastIndex：返回一个数值，表示下一次开始搜索的位置。该属性可读写，但只在进行连续搜索时有意义
	RegExp.prototype.source：返回正则表达式内容的字符串形式
	RegExp.prototype.flags：返回正则表达式修饰符的字符串形式
	!!
	··
	var r = /abc\\s/gimuys

	r.global // true
	r.ignoreCase // true
	r.multiline // true
	r.unicode // true
	r.sticky // true
	r.dotAll // true
	r.lastIndex // 0
	r.source // "abc\\s"
	r.flags // "gimuys"
	··

	#方法
	字符串对象有 4 个方法可以使用正则表达式：·match()·、·replace()·、·search()·和·split()·
	ES6 将这 4 个方法，在语言内部全部调用·RegExp·的实例方法，即所有与正则相关的方法全都定义在·RegExp·对象上
	·String.prototype.match·调用·RegExp.prototype[Symbol.match]·
	·String.prototype.replace·调用·RegExp.prototype[Symbol.replace]·
	·String.prototype.search·调用·RegExp.prototype[Symbol.search]·
	·String.prototype.split·调用·RegExp.prototype[Symbol.split]·

	##R.p.test()
	·RegExp.prototype.test()·：返回一个 Boolean 值，判断当前模式是否能匹配参数字符串
	··
	/cat/.test('cats and dogs') // true
	··
	若有·g·修饰符，则每一次·test()·都从上一次结束的位置开始向后匹配
	··
	var r = /x/g
	var s = '_x_x'

	r.lastIndex // 0
	r.test(s) // true

	r.lastIndex // 2
	r.test(s) // true

	r.lastIndex = 1
	r.test(s) // true
	··
	注意·lastIndex·属性只对同一个正则表达式有效
	··
	// 无限循环，因为每次的匹配条件都是新的正则表达式
	var count = 0
	while (/a/g.test('babaa')) count++

	// 定义变量
	var count = 0
	var r = /a/g
	while (r.test('babaa')) count++
	··

	##R.p.exec()
	·RegExp.prototype.exec()·：以数组的形式返回匹配的结果，若匹配失败返回·null·
	··
	/x/.exec('_x_x') // ["x"]
	··
	如果是组匹配，则第一个成员整个匹配的结果，后面的成员与圆括号的匹配结果对应
	··
	/_(x)/.exec('_x_x') // ["_x", "x"]
	··
	·exec·方法的返回数组还包含以下两个属性
	!!
	input：整个原字符串
	index：整个模式匹配成功的开始位置（从 0 开始计数）
	!!
	若正则表达式加上·g·全局匹配，则可以使用多次·exec·方法，下一次搜索的位置从上一次匹配成功结束的位置开始，若·lastIndex·到最后会重置为 0
	··
	var reg = /a/g;
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

	##S.p.match()
	·String.prototype.match()·：以数组的形式返回匹配的结果，若匹配失败返回·null·
	若没有·g·修饰符则等同于·exec()·，若有则返回所有匹配的结果，且没有·input·和·index·属性
	注意·lastIndex·属性，对·match·方法无效，匹配总是从字符串的第一个字符开始
	··
	'abba'.match(/a/g) // ["a", "a"]
	··

	##S.p.search()
	·String.prototype.search()·：返回第一个满足条件的匹配结果在整个字符串中的位置，如果没有任何匹配则返回·-1·。
	··
	'_x_x'.search(/x/) // 1
	··

	##S.p.split()
	·String.prototype.split(separator, [limit])·：返回一个根据条件分割后的各个部分组成的数组，·separator·为条件，·limit·为要分隔几个
	··
	// 非正则分隔
	'a,  b,c, d'.split(',') // [ 'a', '  b', 'c', ' d' ]

	// 正则分隔，去除多余的空格
	'a,  b,c, d'.split(/, */) // [ 'a', 'b', 'c', 'd' ]
	··
	如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回
	··
	'aaa*a*'.split(/a*/) // ["", "*", "*"]

	'aaa*a*'.split(/(a*)/) // [ '', 'aaa', '*', 'a', '*' ]
	··

	##S.p.replace()
	·String.prototype.replace(search, replacement)·：将字符串中匹配的值替换成新值，·search·为条件，·replacement·为新值
	··
	'aaa'.replace('a', 'b') // "baa"
	'aaa'.replace(/a/, 'b') // "baa"
	'aaa'.replace(/a/g, 'b') // "bbb"
	··
	第二个参数可以使用·$·指代所替换的内容：
	!!
	$&：匹配的子字符串
	$\`：匹配结果前面的文本
	$'：匹配结果后面的文本
	$n：匹配成功的第 n 组内容，n 是从 1 开始的自然数
	$$：指代美元符号·$·
	!!
	··
	'13344445555'.replace(/(\\d{3})\\d{4}(\\d{4})/, '$1****$2') // "133****5555"
	··
	第二个参数还可以是一个函数，将每一个匹配内容替换为函数的返回值：
	此函数的第一个参数是每次匹配的结果
	若有组匹配则从第二到倒数第三个是对应组匹配的结果
	倒数第二个是当前匹配结果在原字符串中的 index，最后一个是原字符串
	··
	'3 and 5'.replace(/\\d/g, match => 2 * match) // "6 and 10"
	··

	##S.p.matchAll()
	·String.prototype.matchAll()·：以遍历器（Iterator）的形式返回所有匹配的结果，可直接使用·for...of·循环
	··
	const string = 'test1test2test3'
	const regex = /t(e)(st(\\d?))/g
	for (const match of string.matchAll(regex)) console.log(match)
	// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
	// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
	// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
	··
	使用·...·运算符和·Array.from·方法可以将遍历器转为数组
	··
	[...string.matchAll(regex)]
	Array.from(string.matchAll(regex))
	··

	#常用正则
	··
	// 任意字符
	new RegExp('') // 等同于 /¿(?:)/
	/./s
	/[^]/
	/[\\s\\S]/

	// 中文
	/[\\u4e00-\\u9fa5]/

	// 手机号
	/1[3-9]\d{9}/
	··

	&2019/4/2
`