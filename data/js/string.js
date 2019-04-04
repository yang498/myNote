commonData.js.string.content = `
	#string

	##介绍
	·String·对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。
	字符串字面量（通过单引号或双引号定义）和直接调用 String 方法（没有通过 new 生成字符串对象实例）的字符串都是基本字符串。
	当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候（基本字符串是没有这些方法的），JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。
	··
	var s1 = 'abc'
	var s2 = new String('abc')

	typeof s1	// string
	typeof s2	// object（字符串对象）
	s2.valueOf()	// abc（原始字符串）
	··
	这里的s2对于s1来说就是个包装类，s1是个基本字符串类型，没有长度length，但当调用s1.length的时候还是会有长度5，这也是发生一个隐式转换，自动转换为了一个包装对象，但是length这个临时对象返回了以后它会自动销毁，也就是一次性用品。
	字符串对象是一个类似数组的对象（很像数组，但不是数组）。
	··
	var str = new String('abc')	// {0: 'a', 1: 'b', 2: 'c', length: 3}
	str[1]	// b
	str.length	// 3
	··
	改变长度并不会影响字符串，而数组会，也无法改变字符串之中的单个字符。
	··
	var s = 'hello';

	delete s[0]	// hello
	s[1] = 'a'	// hello
	s[5] = '!'	// hello
	s.length = 3	// hello
	··
	单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号。同时用需要转义。
	··
	'key = "value"'
	"It's a long journey"
	'Did she say \\'¿Hello\\'¿?'
	"Did she say \\"¿Hello\\"¿?"
	··
	字符串只能写在一行内，分成多行将会报错。
	··
	'a
	b
	c'
	// SyntaxError: Unexpected token ILLEGAL
	··
	分成多行的方式。
	··
	// 每行尾部使用反斜杠，反斜杠后面必须是换行符，不能有其他字符（比如空格），否则会报错
	var longString = 'Long \\
	long \\
	long \\
	string'

	// 使用+连接
	var longString = 'Long '
		+ 'long '
		+ 'long '
		+ 'string'

	// 使用注释
	(function () {/*
		line 1
		line 2
		line 3
	*/}).toString().split('\\n').slice(1, -1).join('')

	// es6的\`
	var longString = \`Long
	long
	long
	string\`
	··
	反斜杠 \\ 作为转义符来表示一些特殊字符，如果在非特殊字符前面使用反斜杠，则反斜杠会被省略。
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
	\\HHH：反斜杠后面紧跟三个八进制数（000到377），代表一个字符。HHH对应该字符的 Unicode 码点，比如\\251表示版权符号。显然，这种方法只能输出256种字符
	\\xHH：\\x后面紧跟两个十六进制数（00到FF），代表一个字符。HH对应该字符的 Unicode 码点，比如\\xA9表示版权符号。这种方法也只能输出256种字符
	\\uXXXX：\\u后面紧跟四个十六进制数（0000到FFFF），代表一个字符。XXXX对应该字符的 Unicode 码点，比如\\u00A9表示版权符号
	!!
	Unicode编码：包括世界上所有文字和符号的字符编码方案，它的范围从0（0x0000）到1114112（0x10FFFF），开头的128个Unicode编码单元和ASCII字符编码一样。
	JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。
	JavaScript 不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，即将字符写成·\\uxxxx·的形式，其中xxxx代表该字符的 Unicode 码点。比如·\\u00A9·代表版权符号 ©。
	解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 Unicode 形式表示。输出给用户的时候，所有字符都会转成字面形式。
	··
	var f\u006F\u006F = 'abc';
	foo	// abc
	··
	我们还需要知道，每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。
	但是， UTF-16 有两种长度：对于码点在·U+0000·到·U+FFFF·之间的字符，长度为16位（即2个字节）；对于码点在·U+10000·到·U+10FFFF·之间的字符，长度为32位（即4个字节），而且前两个字节在·0xD800·到·0xDBFF·之间，后两个字节在·0xDC00·到·0xDFFF·之间。举例来说，码点·U+1D306·对应的字符为·𝌆·，它写成 UTF-16 就是·0xD834 0xDF06·。
	JavaScript 对 UTF-16 的支持是不完整的，由于历史原因，只支持两字节的字符，不支持四字节的字符。这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到·U+FFFF·，因此两字节足够表示了。后来，Unicode 纳入的字符越来越多，出现了四字节的编码。但是，JavaScript 的标准此时已经定型了，统一将字符长度限制在两字节，导致无法识别四字节的字符。上一节的那个四字节字符𝌆，浏览器会正确识别这是一个字符，但是 JavaScript 无法识别，会认为这是♭两个字符♭，这需要注意一下。
	··
	'𝌆'.length	// 2
	··

	##Base64 转码
	有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。
	所谓 Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。
	JavaScript 原生提供两个 Base64 相关的方法：
	!!
	btoa()：任意值转为 Base64 编码
	atob()：Base64 编码转为原来的值
	!!
	··
	var string = 'Hello World!';
	btoa(string)	// SGVsbG8gV29ybGQh
	atob('SGVsbG8gV29ybGQh')	// Hello World!
	btoa('你好')	// 报错，不适合非 ASCII 码的字符
	// 所以需要先转码再使用
	btoa(encodeURIComponent('你好'))	// JUU0JUJEJUEwJUU1JUE1JUJE
	decodeURIComponent(atob('JUU0JUJEJUEwJUU1JUE1JUJE'))	// 你好
	··

	#方法
	##String()
	·String(obj)·：可以将任意类型的值转为字符串，不改变原值
	##.slice()
	·String.prototype.slice(begin, end)·：提取字符串，不改变原值，begin为开始位置，end为结束位置（不含该位置），可以是负数，begin不填默认为0，end不填直到字符串末尾，如果begin大于end则返回空字符串
	##.substring()
	·String.prototype.substring(begin, end)·：基本同·slice()·，区别在于：不支持负数，如果任一参数小于0就会当作0。如果begin大于end则参数位置互换
	##.substr()
	·String.prototype.substr(begin, length)·：基本同·slice()·，区别在于：第二个参数是长度，若小于0就会当作0，也就是返回空字符串
	··
	'JavaScript'.substr(4, 6)	// "Script"，从第4个位置开始，取6个
	'JavaScript'.substr(-6)	// "Script"，从第-6也就是第4个位置开始，直到最后
	'JavaScript'.substr(4, -1)	// ""，长度小于0不存在，返回空字符串
	··
	##.split()
	·String.prototype.split(str|reg, length)·：按照给定参数的规则分割字符串，返回一个由分割出来的子字符串组成的数组，不改变原值。
	如果参数为空就返回数组的唯一成员就是原字符串。
	如果参数为''则返回数组的成员是原字符串的每一个字符。
	如果满足分割规则的两个部分中间没有其他字符或处于开头结尾，则返回空字符串。
	length参数表示要分割几个
	··
	'a|b|c'.split('|')	// ['a', 'b', 'c']
	'a|b|c'.split()	// ['a|b|c']
	'a|b|c'.split('')	// ['a', '|', 'b', '|', 'c']
	'|a||c|'.split('|')	// ['', 'a', '', 'c', '']
	'a|b|c'.split('|', 0)	// []
	'a|b|c'.split('|', 1)	// ['a']
	'a|b|c'.split('|', 4)	// ['a', 'b', 'c']
	··
	还可以使用正则表达式作为参数来分隔

	#es6
	##模板字符串

	&2018.4.15
`