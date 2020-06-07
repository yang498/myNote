<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# es6

## 概述

ECMAScript 6.0 版（简称 ES6）是 JavaScript 语言的下一代标准，已在 2015 年 6 月正式发布

### ECMAScript

ECMAScript 和 JavaScript 的关系：

!!
1996 年 11 月，JavaScript 的创造者 Netscape 公司将 JavaScript 提交给标准化组织 ECMA，希望能成为国际标准
次年，ECMA 规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版
之所以不叫 JavaScript，有两个原因
    一是商标，Java 是 Sun 公司的商标，只有 Netscape 公司可以合法使用，且 JavaScript 也是 Netscape 公司的商标
    二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性
因此 ECMAScript 是 JavaScript 的标准规格，JavaScript 是 ECMAScript 的一种实现，日常场合这两个词可以互换
!!

### ES2015

ECMAScript 2015（简称 ES2015）和 ES6 的关系：

!!
2011 年 ECMAScript 5.1 版发布后，就开始制定 6.0 版了
但标准委员会为了更好的改进和发展，决定不再以 6.1、6.2 这种版本记号，改成以年份为标记
ES6 的第一个版本在 2015 年发布，正式名称就是《ECMAScript 2015 标准》
因此 ES6 是个泛指，含义是 5.1 版以后的 JavaScript 下一代标准，包括 ES2015、ES2016、ES2017 等等
!!

## Promise

### 概述

异步编程的一种解决方案，简单说就是一个容器，里面保存一个异步操作的结果
有三种状态：·pending·（进行中）、·fulfilled·（已成功）和·rejected·（已失败）
·Promise·的构造函数接受一个函数，且有两个参数方法 ·resolve· 和 ·reject·
·resolve·是成功时执行的函数，·reject·是失败时执行的函数

··js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (/* 异步操作成功 */){
            resolve()
        } else {
            reject()
        }
    }, 1000)
})
··

### then()

·Promise.prototype.then()·：监听 Promise 的状态变化，接受两个回调函数作为参数，分别在成功和失败时执行

··js
promise.then(value => {
    console.log('成功')
}, error => {
    console.log('失败')
})
··

Promise 新建后回调函数立即执行，·resolve· 和 ·reject· 异步执行：

··js
const promise = new Promise((resolve, reject) => {
    resolve('1')
    console.log('2')
})
promise.then(res => console.log(res))
console.log('3')

// 2
// 3
// 1
··

·then·会返回的新的 Promise 实例。因此可以采用链式写法，且前一个·then·返回的值可作为后一个·then·的参数使用：
··js
promise.then(() => {
    return 123
}).then(res => {
    console.log(res) // 123
})
··

如果前一个·then·返回的还是一个 Promise 对象，这时后一个·then·就会等待该 Promise 对象的状态发生变化时才会调用：

··js
promise.then(() => {
    return new Promise(resolve => resolve(123))
}).then(res => {
    console.log(res) // 123
})
··

### catch()

·Promise.prototype.catch()·：发生错误时触发，即·.then(null, fn)·的别名
Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获：

··js
promise.then(function(post) {
    return new Promise(resolve => resolve())
}).then(function(comments) {
    // some code
}).catch(function(error) {
    // 处理前面所有 Promise 产生的错误
})
··

Promise 内部的错误不会影响到 Promise 外部的代码：

··js
const promise = new Promise((resolve, reject) => {
    resolve(x + 2) // 报错，x 没有声明
})
promise.then(function() {
    console.log('everything is great')
})
setTimeout(() => { console.log(123) }, 2000)

// Uncaught (in promise) ReferenceError: x is not defined
// 123
··

### finally()

·Promise.prototype.finally()·：不管 Promise 对象最后状态如何都会执行的操作，即：

··js
promise.finally(() => console.log(123))
// 等同于
promise.then(() => console.log(123), () => console.log(123))
··

具体实现：

··js
Promise.prototype.finally = function (callback) {
    const P = this.constructor
    return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    )
}
··

### Promise.all()

将多个 Promise 实例包装成一个新的 Promise 实例，接受一个由 Promise 对象数组作为参数

··js
// p1、p2、p3 都是 Promise 对象
const p = Promise.all([p1, p2, p3])
p.then(list => {
    // ...
}).catch(error => {
    // ...
})
··

上面的代码中·p·的状态由·p1 p2 p3·决定
如果都成功·p·才会触发·then·，并会将·p1 p2 p3·的返回值组成数组传给·p·
如果有一个失败·p·就会触发·catch·，并会将第一个失败的返回值会传递给·p·
注意，如果参数自己定义并触发了·catch·方法，并不会触发·Promise.all()·的·catch·，而是触发·then·

### Promise.race()

用法同·Promise.all()·，·p·的状态取决于·p1 p2 p3·中第一个改变的状态，第一个改变的返回值会传递给·p·

··js
// 超时处理：5 秒内无结果就会触发 catch
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
])

p
.then(console.log)
.catch(console.error)
··

### Promise.allSettled()

用法同·Promise.all()·，不管·p1 p2 p3·的状态，都触发完毕·p·就会触发·then·，且参数为所有结果的返回值组成的数组
该数组的格式为固定格式的对象数组，形如：
··js
[
    { status: "fulfilled", value: 1 }, // 成功
    { status: "rejected", reason: 2 } // 失败
]
··

··js
// 输出失败的请求
const p = Promise.allSettled([ fetch('index.html'), fetch('https://does-not-exist/') ])
p.then(list => {
    list.filter(item => item.status === 'rejected').map(item => item.reason)
})
··

### Promise.any()

用法同·Promise.all()·，·p1 p2 p3·只要有一个成功就触发·then·，都失败才触发·catch·，和·Promise.all()·相反
注意·catch·接受的错误数组是个由·AggregateError·组成的数组

### Promise.resolve()

将参数转为 Promise 对象，参数分成四种情况：

#### Promise 实例将不做任何修改直接返回这个实例

#### 不传参数直接·resolve·一个 Promise 对象

#### 定义了·then·方法的对象会立即执行

··js
const p = Promise.resolve({
    then (resolve, reject) {
        resolve(123)
    }
})
p.then(console.log) // 123
··

#### 未定义了·then·方法的对象或其他值直接·resolve·这个值

··js
Promise.resolve('foo')
// 等同于
new Promise(resolve => resolve('foo'))
··

注意立即·resolve()·的 Promise 对象，是在本轮事件循环结束时执行，而不是在下一轮的开始时

··js
setTimeout(() => console.log(3))
Promise.resolve().then(() => console.log(2)
console.log(1)
// 1
// 2
// 3
··

### Promise.reject()

将参数转为 Promise 对象，并直接·reject·这个值，不管参数是什么

··js
const p = Promise.reject('出错了')
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
··

### Promise.try()

有时候不知道或者不想区分函数·f·是同步还是异步操作，想用 Promise 统一处理
但如果·f·是同步函数则会在本轮事件循环的末尾执行，本意是让同步函数同步执行，异步函数异步执行：

··js
const f = () => console.log('now')
Promise.resolve().then(f)
console.log('next')
// next
// now
··

·try·方法就可以做到：

··js
const f = () => console.log('now')
Promise.try(f)
console.log('next')
// now
// next
··

@@
[ECMAScript 6 入门](http://es6.ruanyifeng.com/)
@@

&2020/06/06
`
        }
    }
}
</script>
