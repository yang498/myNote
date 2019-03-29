commonData.js.regexp.content = `
	#新建
	有两种方式新建：
	··
	// 字面量形式，以斜杠开始和结束
	var reg = /xyz/

	// 使用 RegExp 构造函数
	var reg = new RegExp('xyz')
	// 第二个参数表示修饰符
	var reg = new RegExp('xyz', 'g')
	··

	#属性
	!!
	RegExp.prototype.ignoreCase：返回一个 Boolean 值，表示是否设置了·i·修饰符
	RegExp.prototype.global：返回一个 Boolean 值，表示是否设置了·g·修饰符
	RegExp.prototype.multiline：返回一个 Boolean 值，表示是否设置了·m·修饰符
	RegExp.prototype.lastIndex：返回一个数值，表示下一次开始搜索的位置。该属性可读写，但只在进行连续搜索时有意义
	RegExp.prototype.source：返回正则表达式的字符串形式
	!!
	··
	var r = /abc\\s/igm

	r.ignoreCase // true
	r.global // true
	r.multiline // true
	r.lastIndex // 0
	r.source // "abc"
	··

	#方法
	##test()
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

	r.lastIndex // 4
	r.test(s) // false

	r.lastIndex = 2
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

	#常用正则
	··
	// 匹配任意字符串
	new RegExp('')
	/[^]/
	/\\s\\S/

	// 匹配中文
	/[\\u4e00-\\u9fa5]/
	··

	&2019.3.29
`