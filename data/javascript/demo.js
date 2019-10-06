commonData.javascript.demo.content = `
#小技巧

（在团队项目中，还是要少用语义难以理解的小技巧，避免增加沟通成本）

##一句话
!!
使用构造函数时如果不传参数则可以省略括号，例如·new Date·
!!

##判断数据类型
·Object.prototype.toString()·返回对象的类型字符串，因此可以用来判断一个值的类型
不同数据类型的·Object.prototype.toString()·返回值如下：
!!
数值：返回·[object Number]·
字符串：返回·[object String]·
布尔值：返回·[object Boolean]·
undefined：返回·[object Undefined]·
null：返回·[object Null]·
数组：返回·[object Array]·
arguments 对象：返回·[object Arguments]·
函数：返回·[object Function]·
Error 对象：返回·[object Error]·
Date 对象：返回·[object Date]·
RegExp 对象：返回·[object RegExp]·
其他对象：返回·[object Object]·
!!
由于实例对象可能会自定义·toString()·，从而被覆盖掉，所以最好直接使用·Object.prototype.toString()·
而通过函数的·call()·，可以在任意值上调用
··
const type = obj => {
    const str = Object.prototype.toString.call(obj)
    return str.match(/\[object (.*?)\]/)[1].toLowerCase()
}

type({}) // "object"
type([]) // "array"
type(5) // "number"
type(null) // "null"
type() // "undefined"
type(/abcd/) // "regex"
type(new Date()) // "date"
··
在此基础上可延伸出判断某种数据类型的方法
··
const type = obj => {
    const str = Object.prototype.toString.call(obj)
    return str.match(/\[object (.*?)\]/)[1].toLowerCase()
}
  
['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp'].forEach(item => {
    type['is' + item] = obj => type(o) === item.toLowerCase()
})

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
··

#编程模式

##三元嵌套
··
// bad
let result = null
if (conditionA) {
	if (conditionB) {
		result = "A & B"
	} else {
		result = "A"
	}
} else {
	result = "Not A"
}

// good
const result = !conditionA
  ? "Not A"
  : conditionB
  ? "A & B"
  : "A"
··

##object 代替 switch
不必担心·case·或·break·，代码意图明确，当需要用·switch·处理很多逻辑时可以考虑用·object literal·代替
··
// switch
switch (str) {
	case 'a': return 'AAA'
	case 'b': return 'BBB'
	case 'c': return 'CCC'
	default: return 'DDD'
}

// object literal
const swap = {
	a: () => 'AAA',
	b: () => 'BBB',
	c: () => 'CCC',
	default: () => 'DDD'
}
const str = (swap[str] || swap['default'])()
··

&2019/07/13
`