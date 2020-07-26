<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# demo

## 小技巧

（在团队项目中，还是要少用语义难以理解的小技巧，避免增加沟通成本）

### 一句话

!!
使用构造函数时如果不传参数则可以省略括号，例如·new Date·
!!

### 判断数据类型

·Object.prototype.toString()·返回对象的类型字符串，因此可以用来判断一个值的类型
由于实例对象可能会自定义·toString()·，从而被覆盖掉，所以最好直接使用·Object.prototype.toString()·
而通过函数的·call()·，可以在任意值上调用

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

··js
const type = obj => {
    const str = Object.prototype.toString.call(obj)
    return str.match(/\\[object (.*?)\\]/)[1].toLowerCase()
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

··js
const type = obj => {
    const str = Object.prototype.toString.call(obj)
    return str.match(/\\[object (.*?)\\]/)[1].toLowerCase()
}

const typeList = ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp']
typeList.forEach(item => {
    type['is' + item] = obj => type(o) === item.toLowerCase()
})

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
··

## 编程模式

### 三元嵌套

··js
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
const result = !conditionA ? "Not A" :
    conditionB ? "A & B" : "A"
··

### object 代替 switch

不必担心·case·或·break·，代码意图明确，当需要用·switch·处理很多逻辑时可以考虑用·object literal·代替

··js
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

## 小功能

### 空闲计时

!!
介绍：页面无操作后一段时间后触发事件
场景：当前页面需要一直展示，但用户也可以临时查看其他页面，所以在用户无操作一段时间后仍然返回当前页面
思路：设定时间，递减时间，直到为 0 触发事件，监听鼠标、键盘、触摸事件，有任何事件触发都将时间重置为初始时间
!!

··js
const event = 'click dblclick contextmenu mousemove wheel keydown touchstart touchmove'.split(' ')
const freeTimer = countdown => {
    let time = countdown
    const call = () => {
        time--
        time
            ? setTimeout(call, 1000) : confirm('时间到，是否继续？')
            ? setTimeout(call, 1000) : removeEvent()
    }
    setTimeout(call, 1000)
    let lowerFrame = null
    const watch = e => {
        // 触发频率高的事件降频以减少卡顿
        if (/mousemove|wheel|keydown|touchmove/.test(e.type)) {
            if (!lowerFrame) {
                lowerFrame = setTimeout(() => {
                    lowerFrame = null
                    time = countdown
                }, 100)
            }
        } else {
            time = countdown
        }
    }
    event.forEach(item => document.addEventListener(item, watch))
    const removeEvent = () => event.forEach(item => document.removeEventListener(item, watch))
}
freeTimer(5 * 60)
··

&2019/11/10
`
        }
    }
}
</script>
