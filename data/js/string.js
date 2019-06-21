commonData.js.string.content = `
	#介绍

	##语法
	字符串就是零个或多个排在一起的字符，放在引号之中：
	··
	'string' // 单引号
	"string" // 双引号
	\`string\` // 反单引号
	'key = "value"' // 不同的引号之间可以相互嵌套
	'Did she say \\'¿Hello\\'¿?' // 相同引号的嵌套需用 \\ 在引号前面转义
	··
	单双引号的字符串只能写在一行内，否则报错，分成多行的方式：
	··
	// 每行尾部使用反斜杠，注意反斜杠后面除了换行符不能有其他字符
	var longString = 'Long \\
		string'
	
	// 使用 + 连接
	var longString = 'Long '
		+ 'string'

	// 使用注释
	(function () {/*
		line 1
		line 2
	*/}).toString().split('\\n').slice(1, -1).join('')

	// 使用反单引号
	var longString = \`Long
		string\`
	··
	特殊字符需要使用反斜杠·\\·转义，如果在非特殊字符前面使用反斜杠会被省略
	!!
	\\\\0：null（\\u0000）
	\\b：后退键（\\u0008）
	\\f：换页符（\\u000C）
	\\n：换行符（\\u000A）
	\\r：回车键（\\u000D）
	\\t：制表符（\\u0009）
	\\v：垂直制表符（\\u000B）
	\\'：单引号（\\u0027）
	\\"：双引号（\\u0022）
	\\\\：反斜杠（\\u005C）
	\\HHH：·\\·接三个八进制数（000 到 377）代表一个字符，·HHH·对应该字符的 Unicode 码点
	\\xHH：·\\x·接两个十六进制数（00 到 FF）代表一个字符，·HH·对应该字符的 Unicode 码点
	\\uXXXX：·\\u·接四个十六进制数（0000 到 FFFF）代表一个字符，·XXXX·对应该字符的 Unicode 码点
	!!

	##字符串对象
	通过引号和·String()·定义的字符串是基本字符串，通过·new String()·定义的是字符串对象
	只有·new String()·生成字符串对象才有字符串的属性方法，或者通过索引查询值
	当基本字符串也使用字符串的属性方法时，JavaScript 会自动将其转化为字符串对象，虽然结果相同，但本质有点区别
	··
	'abc' === String('abc') // true
	'abc' === new String('abc') // false
	typeof 'abc'	// string
	typeof new String('abc')	// object
	new String('abc').valueOf()	// abc（原始字符串）
	new String('abc') + 'd' // abcd

	// 字符串类似数组，有长度和索引
	var str = new String('abc')	// {0: 'a', 1: 'b', 2: 'c', length: 3}
	str[1]	// b
	str.length	// 3

	// 改变长度和某个字符不会影响字符串，包括长度，除了对字符串重新赋值
	var s = 'hello'
	delete s[0]
	s[1] = 'a'
	s.length = 3
	··

	##字符集
	JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示
	所以将字符写成·\\uxxxx·的形式也能表示字符，输出的时候依然会转成字面形式
	每个字符在 JavaScript 内部都是以 16 位（2 个字节）的 UTF-16 格式储存
	在 JavaScript 第一版发布的时候码点处于·0000~FFFF·，是够用的，而随着纳入的字符越来越多，并出现了 4 个字节的编码，范围也扩大到了·10FFFF·
	对于码点在·U+0000~U+FFFF·之间的字符，长度为 16 位（2 个字节）
	在·U+10000~U+10FFFF·之间的字符，长度为 32 位（4 个字节），而且前两个字节在·0xD800~0xDBFF·之间，后两个字节在·0xDC00~0xDFFF·之间
	举例来说，码点·U+1D306·对应的字符为·𝌆·，它写成 UTF-16 就是·0xD834 0xDF06·。
	例如·𝌆·，浏览器会正确识别这是一个字符，但是 JavaScript 会认为这是两个字符
	··
	'𝌆'.length	// 2
	··

	##Base64 转码
	Base64 是一种编码方法，可以将任意值转成·0~9 A~Z a~z + /·这 64 个字符组成。主要目的不是加密而是为了不出现特殊字符，简化处理
	一些不可打印的符号例如 @[ASCII|http://www.asciitable.com/] 码 0~31 的符号，可以使用 Base64 编码转成可以打印的字符
	有时需要以文本格式传递二进制数据也可以使用 Base64 编码
	JavaScript 原生提供两个 Base64 相关的方法：
	!!
	btoa()：任意值转为 Base64 编码
	atob()：Base64 编码转为原来的值
	!!
	··
	btoa('Hello World!')	// SGVsbG8gV29ybGQh
	atob('SGVsbG8gV29ybGQh')	// Hello World!

	btoa('你好')	// 报错，不适合非 ASCII 码的字符

	// 所以需要先转码再使用
	btoa(encodeURIComponent('你好'))	// JUU0JUJEJUEwJUU1JUE1JUJE
	decodeURIComponent(atob('JUU0JUJEJUEwJUU1JUE1JUJE'))	// 你好
	··

	#属性方法
	字符串方法都是生成新值而不改变原值
	!!
	String(obj)：将任意类型的值转为字符串形式，对于数组相当于把所有的·[·和·]·去掉，对于对象固定转换成·[object Object]·

	^^静态方法^^（即定义在对象本身，而不是定义在对象实例的方法）
	String.fromCharCode(...Unicode)：返回由 Unicode 码点组成的字符串，注意码点大于·0xFFFF·的字符需用 2 个参数表示
		Unicode{n}：一个或多个数值，代表 Unicode 码点

	^^实例属性^^
	String.prototype.length：字符串的长度

	^^实例方法^^（以下方法前面省略·String.prototype.·）
	slice(begin, end)：指定范围提取字符串某一段，若 begin 大于 end 则返回空字符串
		begin{n}[0]：开始位置
		end{n}[字符串末尾]：结束位置（不含该位置），可以是负数
	substring(begin, end)：和·slice()·相似，区别在于：若任一参数小于 0 就会当作 0，若 begin 大于 end 则参数位置互换
	substr(begin, length)：和·slice()·相似，区别在于第二个参数是长度
	split(rule, length)：按照给定参数的规则分割字符串，返回一个由分割出来的子字符串组成的数组
		rule{s/r}：分割规则，关于正则分割查看《regexp》
		length{n}：指定要分割几个
	indexOf()：
	!!
	##split()
	·split(str/reg, length)·：按照给定参数的规则分割字符串，返回一个由分割出来的子字符串组成的数组
	如果参数为空则返回的数组的唯一成员就是原字符串
	如果参数为·''·则返回数组的成员是原字符串的每一个字符
	如果满足分割规则的两个部分中间没有其他字符或处于开头结尾，则返回空字符串
	··
	'a|b|c'.split('|')	// ['a', 'b', 'c']
	'a|b|c'.split()	// ['a|b|c']
	'a|b|c'.split('')	// ['a', '|', 'b', '|', 'c']
	'|a||c|'.split('|')	// ['', 'a', '', 'c', '']
	'a|b|c'.split('|', 1)	// ['a']
	··

	#es6
	##模板字符串

	&2018/4/15
`