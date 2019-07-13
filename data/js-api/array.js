commonData.jsApi.array.content = `
#介绍

##定义
数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示，任何类型的数据都可以放入数组
··
var arr = ['a', 'b', 'c']
arr[0] // 'a'
arr[1] // 'b'
arr[2] // 'c'
arr[0] = 'A' // 重新赋值
··

##特殊的对象
本质上，数组属于一种特殊的对象
即数组的键名就是每个成员的索引值，而对象的键名一律为字符串，所以数组的键名其实也是字符串，非字符串的键名会被转为字符串
··
typeof [1, 2, 3] // 'object'

var arr = ['a', 'b', 'c']
arr['0'] // 'a'
arr[0] // 'a
··

##length
数组的·length·属性，返回数组的成员数量
JavaScript 使用一个 32 位整数保存数组的元素个数。这意味着数组成员最多只有 4294967295 个（2^32 - 1）
·length·属性是可写的，若设置的长度小于当前长度则相当于把多余的数组成员删除，设为·0·将清空数组，若大于则会用空位代替
··
['a', 'b', 'c'].length // 3

var arr = [ 'a', 'b', 'c' ]
arr.length = 2
arr // ["a", "b"]

var a = ['a']
a.length = 3
a[1]  // undefined
··
由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响·length·属性的值，·length·只等于最大的整数键名加 1
··
var a = []

a['p'] = 'abc'
a.length // 0

a[2.1] = 'abc'
a.length // 0
··

##in 运算符
检查某个键名是否存在的运算符·in·，适用于对象，也适用于数组
注意，如果数组的某个位置是空位，·in·运算符返回·false·
··
var arr = [ 'a', , 'c' ]
2 in arr  // true
'2' in arr // true
1 in arr // false
4 in arr // false
··

##for...in 循环
·for...in·循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象，并且还会遍历非数字键
··
var a = [1, 2, 3]
a.foo = true

for (var key in a) {
    console.log(key)
}
// 0
// 1
// 2
// foo
··

##数组的空位
当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）
数组的空位不影响·length·属性。
如果最后一个元素后面有逗号，并不会产生空位。即有没有这个逗号，结果都是一样的
读取数组的空位返回·undefined·
使用·delete·命令删除一个数组成员会形成空位，并且不会影响·length·属性
··
var a = [1, , 1]
a.length // 3

var b = [1, 2, 3,]
b // [1, 2, 3]

a[1] // undefined
··
数组某个元素值是空位和值是·undefined·是不一样的，空位在一些方法遍历时会跳过，而·undefined·起码代表有值而不会被跳过
会跳过的方法有：·map· ·forEach· ·for...in· ·Object.keys·
··
[, , ,]
[undefined, undefined, undefined]
··

##类似数组的对象
如果一个对象的所有键名都是正整数或零，并且有·length·属性，可以称之为“类似数组的对象”（array-like object）
··
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
··
但因为本质是个对象，所以·length·不会随着成员的变化而变化，也不具备数组的方法
典型的“类似数组的对象”是函数的·arguments·对象，以及大多数 DOM 元素集，还有字符串
··
function fn() { return arguments }
var arrayLike = fn('a', 'b')

var elts = document.getElementsByTagName('h3')
··
数组的·slice·方法可以将“类似数组的对象”变成真正的数组
··
var arr = Array.prototype.slice.call(arrayLike)
··
或者通过·call()·把数组的方法放到对象上面
··
function print(value, index) {
    console.log(index + ' : ' + value)
}
  
Array.prototype.forEach.call(arrayLike, print)
··

#构造函数
·Array·是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组
··
var arr = new Array(2)
// 等同于
var arr = Array(2)
··
但不同的参数，会导致它的行为不一致
··
// 无参数时，返回一个空数组
Array() // []

// 单个正整数参数，表示返回的新数组的长度
Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
Array(3.2) // RangeError: Invalid array length

// 单个非数值作为参数，则该参数是返回的新数组的成员
Array('abc') // ['abc']

// 多参数时，所有参数都是返回的新数组的成员
Array(1, 2) // [1, 2]
··
所以直接使用数组字面量是更好的做法
··
var arr = [1, 2]
··

#方法
!!
^^静态方法^^（即定义在对象本身，而不是定义在对象实例的方法）
Array.isArray(obj)：返回一个布尔值，判断参数是否为数组，可以弥补·typeof·运算符的不足

^^实例方法^^（以下方法前面省略·String.prototype.·）
valueOf()：所有对象都拥有的方法，表示对该对象求值，数组的·valueOf·方法返回数组本身
toString()：所有对象都拥有的方法，表示将该对象转换为字符串，对于数组相当于把所有的·[·和·]·去掉

push(...obj)：在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组
pop()：删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组
unshift(...obj)：在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组
shift()：删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组
reverse()：颠倒数组元素顺序，返回改变后的数组。注意，该方法将改变原数组
sort(fn)：对数组进行排序，默认按照字典顺序从小到大排序。注意，该方法将改变原数组
    排序时数值会被先转成字符串，再按照字典顺序进行比较，所以·101·会排在·11·的前面，可以传入一个函数作为参数来自定义排序
    fn(a, b){f}：接受两个参数，表示当前进行比较的两个数组成员，假设参数是·a·和·b·，进行·return a - b·：
        如果该函数的返回值大于·0·，表示·a·排在·b·后面，否则·a·排在·b·前面，即从小到大排列，可以·return b - a·从大到小排列
splice(start, count, ...add)：删除原数组的一部分成员，并可以在删除的位置添加新成员，返回被删除的元素。注意，该方法会改变原数组
    start{n}[0]：开始位置，可以是负数表示倒数
    count{n}[数组长度-start]：删除的个数，注意不填则默认从·start·开始全都删除，如果只想添加元素可以设为·0·
    ...add：要添加的元素

join(str)：将所有数组成员以参数字符串连接为一个字符串返回，参数默认为逗号
concat(...obj)：合并多个任意类型的参数为一个新数组
slice(start, end)：提取目标数组的一部分，返回一个新数组，参数可以是负数表示倒数，若·start·大于·end·则返回空字符串
    start{n}[0]：开始位置
    end{n}[数组的长度]：结束位置（不含该位置）

map(fn(item, index, arr), array)：遍历每个成员依次执行参数函数，把每次的返回的执行结果组成一个新数组返回
    item：当前循环的数组元素
    index{n}：当前循环的数组元素的索引
    arr：原数组
    array：将回调函数内部的·this·指向此参数
forEach(fn(item, index, arr), array)：遍历每个成员依次执行参数函数，参数的说明同·map()·
    注意，·forEach·循环不能通过·break·或·return·中断，可以使用抛出错误来中断，例如·throw 'err'·
filter(fn(item, index, arr), array)：遍历过滤数组，把每次的返回的执行结果为·true·的成员组成新数组返回，参数的说明同·map()·

some(fn(item, index, arr), array)：遍历判断若参数函数有一次的返回值是·true·则结果为·true·，否则·false·，参数的说明同·map()·
    注意，对于空数组使用只返回·false·，不会执行参数函数
every(fn(item, index, arr), array)：遍历判断若参数函数有一次的返回值是·false·则结果为·false·，否则·true·，参数的说明同·map()·
    注意，对于空数组使用只返回·true·，不会执行参数函数

reduce(fn(a, b, index, arr), initial)：从左到右遍历数组，最终累计为一个值，参数·index·和·arr·的说明同·map()·
    a：累积变量，默认为数组的第一个成员
    b：当前变量，默认为数组的第二个成员
    initial：对累积变量指定初值，当空数组使用此方法时会报错，设定初始值则可以不报错并返回此初始值
reduceRight(fn(a, b, index, arr), initial)：从右到左遍历数组，最终累计为一个值，参数的说明和用法同·reduce()·

indexOf(obj, start)：查找参数在原数组中第一次出现的索引，若没找到返回·-1·，可以传入第二个参数表示从哪开始找起
    注意，此方法使用·===·进行比较，而·NaN·不等于自身，所以当查找·NaN·时始终返回·false·
lastIndexOf(obj, start)：和·indexOf()·相似，区别在于：·indexOf()·是从左往右找，·lastIndexOf()·是从右往左找，
!!

##join()
··
// 多维数组将第一维连接，其他维相当于把所有的 [ 和 ] 去掉以逗号连接
[1,2,[3,4,[5,6]]].join('|') // "1|2|3,4,5,6"

// 如果数组成员是 undefined 或 null 或空位，会被转成空字符串
[undefined, null].join('#') // "#"

// 通过 cal l方法也可用于字符串或类似数组的对象
Array.prototype.join.call('hello', '-') // "h-e-l-l-o"
Array.prototype.join.call({ 0: 'a', 1: 'b', length: 2 }, '-') // "a-b"
··

##sort()
··
['d', 'c', 'b', 'a'].sort() // ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort() // [1, 2, 3, 4]

[11, 101].sort() // [101, 11]

[10111, 1101, 111].sort((a, b) => a - b) // [111, 1101, 10111]

[
    { name: "张三", age: 30 },
    { name: "李四", age: 24 },
    { name: "王五", age: 28 }
].sort((o1, o2) => o1.age - o2.age)
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]

// 使用 localeCompare 按拼音排序中文
['深圳', '北京', '上海', '广州'].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')) // ['北京', '广州', '上海', '深圳']
··

##reduce()
··
[1, 2, 3, 4, 5].reduce((a, b) => {
    console.log(a, b)
    return a + b
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15

[1, 2, 3, 4, 5].reduce((a, b) => a + b, 10) // 25

// 找出字符长度最长的数组成员
strArr.reduce((long, item) => long.length > item.length ? long : item, '')
··

#小技巧
##快速生成数组
··
// 0-9，可根据 index 进行增减
Array.from(Array(10), (item, index) => index)

// 0-9
[...Array(10).keys()]

// 数组成员都是 undefined
[...Array(10)]

// 数组成员都是 ''
Array(10).fill('')

// 数组成员都是空格
[...(''.padEnd(10))]
··

&2019/07/13
`