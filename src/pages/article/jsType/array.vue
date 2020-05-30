<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# array

## 概述

### 定义

一组有序值的集合，索引从 0 开始，以中括号包裹，值之间以逗号·,·分隔

··js
var arr = ['a', 'b', 'c']
arr[0] // 'a'
arr[1] // 'b'
arr[0] = 'A' // 重新赋值
··

### 特殊的对象

本质上数组属于一种特殊的对象，索引值为键名

··js
typeof [1, 2, 3] // 'object'

var arr = ['a', 'b', 'c']
arr['0'] // 'a'
arr[0] // 'a
··

### length

数组的·length·属性为所有成员数量
·length·属性可写，若设置的长度小于当前长度则相当于把多余的数组成员删除，若大于则会用空位代替

··js
['a', 'b', 'c'].length // 3

var arr = [ 'a', 'b', 'c' ]
arr.length = 2
arr // ["a", "b"]

var a = ['a']
a.length = 3
a[1]  // undefined
··

由于数组本质上是一种对象，所以可以为数组添加属性，但不影响·length·，·length·只等于最大的整数键名加 1

··js
var a = []

a['p'] = 'abc'
a.length // 0

a[2.1] = 'abc'
a.length // 0
··

### 类似数组的对象

对象的键名为非负正整数且有·length·属性
因为本质是个对象，所以·length·不会随着成员的变化而变化，也不具备数组的方法
常见的类似数组的对象为函数的参数·arguments·，DOM 元素集，字符串

··js
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
··

可将类似数组的对象转换为真正的数组：

··js
// slice
Array.prototype.slice.call(arrayLike)
// ...
[...arrayLike]
··

或通过·call·使用数组的方法

··js
Array.prototype.forEach.call(arrayLike, (value, index) => {
    console.log(index + ' : ' + value)
})
··

## 构造函数

··js
var arr = new Array(2)
// 等同于
var arr = Array(2)
··

不同的参数的行为不一致

··js
Array() // []
Array(2) // [ empty x 2 ]
Array(3.2) // RangeError: Invalid array length
Array('abc') // ['abc']
Array(1, 2) // [1, 2]
··

所以直接使用数组字面量是更好的做法

··js
var arr = [1, 2]
··

## 方法

### 静态方法

!!
Array.isArray(obj)：返回一个布尔值，判断参数是否为数组，可以弥补·typeof·运算符的不足
!!

### 实例方法

以下方法前面省略·Array.prototype.·

!!
valueOf()：返回数组本身
toString()：将数组转换为字符串，相当于把数组内所有的·[·和·]·去掉

push(...obj)：在数组的最后添加元素，并返回添加后的数组长度。注意会改变原数组
pop()：删除数组的最后一个元素，并返回该元素。注意会改变原数组
unshift(...obj)：在数组的第一个位置添加元素，并返回添加后的数组长度。注意会改变原数组
shift()：删除数组的第一个元素，并返回该元素。注意会改变原数组
reverse()：颠倒数组元素，返回改变后的数组。注意会改变原数组
sort(fn)：对数组排序，返回改变后的数组，默认按照字典顺序从小到大排序。注意会改变原数组
    排序时数值会被先转成字符串再按照字典顺序比较，所以·101·会排在·11·的前面
    fn(a, b) {Function}：接受两个参数分别为当前比较的两个元素，假设参数是·a·和·b·，·return a - b·：
        如果返回值大于·0·则·a·排在·b·后面，否则·a·排在·b·前面，即从小到大，可以·return b - a·从大到小
splice(start, count, ...add)：删除指定位置的元素并在该位置添加元素，返回被删除的元素。注意会改变原数组
    start {Number} [0]：开始删除的位置，可以是负数表示倒数
    count {Number} [length - start]：删除的个数，默认从·start·开始全都删除，如果只想添加可以设为·0·
    ...add：要添加的元素

join(str)：将所有数组元素转换为字符串，并以参数字符串连接为一个字符串返回，参数默认为·,·
concat(...obj)：将所有参数合并到数组中，返回一个新数组，如果参数是数组则是合并里面的元素
slice(start, end)：提取目标数组的一部分，参数可以是负数表示倒数，若·start·大于·end·则返回空数组
    start {Number} [0]：开始位置
    end {Number} [length]：结束位置（不含该位置）

map(fn(item, index, arr), thisObj)：遍历数组，把每次函数返回的结果组成一个新数组返回
    fn(item, index, arr) {Function}：回调函数
        item：当前循环的元素
        index {Number} ：当前循环的索引
        arr：原数组
    thisObj：将回调函数内部的·this·指向此参数
forEach(fn(item, index, arr), thisObj)：遍历数组，参数同·map()·
    注意，·forEach·不能通过·break·或·return·中断，可以抛出错误中断，例如·throw new Error()·
filter(fn(item, index, arr), thisObj)：过滤数组，把每次返回为·true·的元素组成新数组返回，参数同·map()·

some(fn(item, index, arr), thisObj)：若函数返回有一次·true·则返回·true·，否则·false·，参数同·map()·
every(fn(item, index, arr), thisObj)：若函数返回全是·true·则返回·true·，否则·false·，参数同·map()·
    注意，空数组也返回·true·

reduce(fn(a, b, index, arr), initial)：遍历数组返回累计值，参数·index·和·arr·同·map()·
    fn(a, b, index, arr) {Function}：回调函数
        a：累积值，默认为数组的第一个元素
        b：当前元素，默认为数组的第二个元素
    initial：对累积值指定初始值，注意当空数组使用此方法时会报错，设定初始值可以防止报错
reduceRight(fn(a, b, index, arr), initial)：从右到左遍历数组返回累计值，参数同·reduce()·

indexOf(obj, start)：遍历查找参数在数组中第一次出现的索引，若没找到返回·-1·
    注意，此方法内部使用·===·进行比较
    obj：查找的值
    start {Number}：起始查找位置，可以是负数表示倒数
lastIndexOf(obj, start)：从右到左遍历查找第一次出现的索引，参数同·indexOf()·
!!

### sort()

··js
['d', 'c', 'b', 'a'].sort() // ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort() // [1, 2, 3, 4]

[11, 101].sort() // [101, 11]

[10111, 1101, 111].sort((a, b) => a - b) // [111, 1101, 10111]

// 使用 localeCompare 可按拼音排序中文
[...'北上广深'].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')) // ["北", "广", "上", "深"]
··

### reduce()

··js
[1, 2, 3, 4].reduce((a, b) => {
    console.log(a, b)
    return a + b
})
// 1 2
// 3 3
// 6 4
// 结果：10

// 参数若为对象内部相加需使用初始值，否则相加不了
[{ count: 1 }, { count: 2 }].reduce((a, b) => a + b.count, 0)
// 结果：3

// 找出字符长度最长的数组成员
strArr.reduce((long, item) => long.length > item.length ? long : item, '')
··

## es6 方法

### 静态方法

!!
Array.from(obj, fn(item, index), thisObj)：将类似数组或可遍历（iterable）的对象转换为数组，参数同·map()·
Array.of(...obj)：将一组值转换为数组，主要是弥补·Array()·因参数个数不同而导致的差异
!!

### 实例方法

以下方法前面省略·Array.prototype.·

!!
copyWithin(target, start, end)：复制指定位置的成员到目标位置，返回当前数组。注意会改变原数组
    注意，若目标位置中有元素会被覆盖，包括复制的元素本身
    target：从该位置开始替换数据。可以是负数表示倒数
    start [0]：从该位置开始复制。可以是负数表示倒数
    end [length]：到该位置前停止复制。可以是负数表示倒数（不含该位置）

find(fn(item, index, arr), thisObj)：找出第一个返回·true·的元素，没有则返回·undefined·，参数同·map()·
findIndex(fn(item, index, arr), thisObj)：找出第一个返回·true·的位置，没有则返回·-1·，参数同·map()·
includes(obj, start)：判断数组是否有参数值，可以比较·NaN·，第二个参数为起始查找位置
    obj：查找的值
    start {Number}：起始查找位置，可以是负数表示倒数

fill(value, start, end)：使用给定值填充数组
    value：填充的值
    start [0]：填充的起始位置。可以是负数表示倒数
    end [length]：填充的结束位置。可以是负数表示倒数（不含该位置）
flat(n)：将 n 维数组拉平成一维数组，返回一个新数组，会跳过数组空位
    n[1]：指定要拉平的层数，可以用·Infinity·表示拉平所有层
flatMap(fn(item, index, arr), thisObj)：相当于先·map()·再·flat()·，因为不能指定层数所以只能拉平一层

keys()：返回数组键名的遍历器对象（Iterator）
values()：返回数组键值的遍历器对象（Iterator）
entries()：返回数组键值对的遍历器对象（Iterator）
!!

### Array.from()

任何有·length·属性的对象都可以通过·Array.from·方法转为数组，而扩展运算符无法转换

··js
Array.from({ length: 3 })
// [ undefined, undefined, undefined ]
··

对于还没有部署该方法的浏览器，可以用·Array.prototype.slice·替代

··js
const toArray = (() => Array.from || obj => [].slice.call(obj))()
··

### copyWithin()

··js
[1, 2, 3, 4, 5].copyWithin(0, 3) 
// [4, 5, 3, 4, 5]
// 复制第 3 个元素直到最后（4 5），替换掉从第 0 个开始的元素（1 2）
// 即复制 4 5 替换了 1 2

[1, 2, 3, 4, 5].copyWithin(0, 2) 
// [3, 4, 5, 4, 5]
// 复制 3 4 5 替换了 1 2 3

[1, 2, 3, 4, 5].copyWithin(0, 1)
// [2, 3, 4, 5, 5]
··

## es6

### 扩展运算符

扩展运算符是三个点·...·，用于将一个数组或遍历器（Iterator）对象转为用逗号分隔的参数序列

··js
console.log(...[1, 2, 3])
// 1 2 3
··

也可用于函数的参数，传入参数时表示将数组转为参数序列，接受参数时表示接收剩余的所有参数

··js
function push(array, ...items) {
    array.push(...items)
}

function add(x, y) {
    return x + y
}
add(...[1, 2]) // 3
··

注意只能在数组中或给方法传参时使用，否则会报错，即要有可使用的容器接收，以下写法错误

··
...[1, 2]
(...[1, 2])
console.log((...[1, 2]))
··

### 扩展运算符的应用

··js
// 获取最大值
Math.max(...[14, 3, 77])

// 合并数组
const arr1 = ['a', 'b']
const arr2 = ['c']
[...arr1, ...arr2]
// [ 'a', 'b', 'c']

// 解构赋值（只能放在最后，因为代表了之后的所有参数）
const [first, ...rest] = [1, 2, 3, 4, 5]
first // 1
rest  // [2, 3, 4, 5]

// 分割字符串
[...'hello']
// [ "h", "e", "l", "l", "o" ]

// NodeList 对象实现了 Iterator
let nodeList = document.querySelectorAll('div')
let array = [...nodeList]
// [<div>, ...]

// 没有部署 Iterator 接口的类似数组的对象无法转换
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
[...arrayLike]
// TypeError: Cannot spread non-iterable object.
··

### 数组的空位

数组的某个位置是空元素，即两个逗号之间没有任何值
数组的空位不影响·length·属性，如果最后一个元素后面有逗号，并不会产生空位
例如，·Array·构造函数返回的数组都是空位，或使用·delete·删除元素也会形成空位

··js
Array(3) // [, , ,]
··

读取空位返回·undefined·，但值是空位和·undefined·不一样，空位某些方法遍历时会跳过，而·undefined·不会
ES5 对空位的处理：

!!
跳过：·forEach()· ·filter()· ·reduce()· ·every()· ·some()· ·for...in· ·Object.keys·
循环时跳过但返回结果保留：·map()·
将空位视为·undefined·再被当成空字符串：·join()· ·toString()·
!!

ES6 则是明确将空位转为·undefined·，除了·copyWithin()·会连空位一起拷贝

## 小技巧

### 快速生成数组

··js
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

&2019/07/15
            `
        }
    }
}
</script>
