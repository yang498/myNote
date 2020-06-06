<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# math

## 概述

·Math·对象提供数学运算功能，不是构造函数，只有属性和静态方法

## 属性

!!
Math.E：常数  e
Math.LN2：2 的自然对数
Math.LN10：10 的自然对数
Math.LOG2E：以 2 为底的 e 的对数
Math.LOG10E：以 10 为底的 e 的对数
Math.PI：常数 Pi
Math.SQRT1_2：0.5 的平方根
Math.SQRT2：2 的平方根
!!

··js
Math.E // 2.718281828459045
Math.LN2 // 0.6931471805599453
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.LOG10E // 0.4342944819032518
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476
Math.SQRT2 // 1.4142135623730951
··

## 常用方法

!!
Math.ceil()：向上取整
Math.floor()：向下取整
Math.max()：最大值
Math.min()：最小值
Math.round()：四舍五入
Math.random()：0 到 1 之间的随机数，大于等于 0，小于 1
!!

··js
Math.ceil(3.2) // 4
Math.ceil(-3.2) // -3

Math.floor(3.2) // 3
Math.floor(-3.2) // -4

Math.max(2, -1, 5) // 5
Math.min(2, -1, 5) // -1

Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(-1.1) // -1
Math.round(-1.5) // -1 （负数时五是舍去）
Math.round(-1.6) // -2
··

### Math.random()

··js
// 生成任意范围的随机数
const random = (min, max) => Math.random() * (max - min) + min
random(1.5, 6.5) // 2.4942810038223864

// 生成任意范围的随机整数
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
randomInt(1, 6) // 5

// 返回任意长度的随机字符串
const randomStr = len => {
    const STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                'abcdefghijklmnopqrstuvwxyz' +
                '0123456789-_'
    let str = ''
    for (let i = 0; i < len; i++) str += STR[Math.floor(Math.random() * STR.length)]
    return str
}
randomStr(6) // "shift"
··

## 不常用方法

!!
Math.abs()：绝对值
Math.pow()：指数运算
Math.sqrt()：平方根
Math.log()：自然对数
Math.exp()：e 的参数次方
!!

··js
Math.abs(1) // 1
Math.abs(-1) // 1

// 等同于 2 ** 3
Math.pow(2, 3) // 8

Math.sqrt(4) // 2
Math.sqrt(-4) // NaN

Math.log(Math.E) // 1
Math.log(10) // 2.302585092994046

Math.exp(1) // 2.718281828459045
Math.exp(3) // 20.085536923187668
··

## 三角函数方法

!!
Math.sin()：返回参数的正弦（参数为弧度值）
Math.cos()：返回参数的余弦（参数为弧度值）
Math.tan()：返回参数的正切（参数为弧度值）
Math.asin()：返回参数的反正弦（返回值为弧度值）
Math.acos()：返回参数的反余弦（返回值为弧度值）
Math.atan()：返回参数的反正切（返回值为弧度值）
!!

## es6 方法

!!
Math.trunc()：取整数部分
Math.sign()：判断返回：正数·+1·、负数·-1·、0·0·、-0·-0·、其他·NaN·
Math.cbrt()：立方根
Math.clz32()：计算一个数的 32 位二进制形式的前导 0 的个数
Math.imul()：两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数
Math.fround()：返回一个数的 32 位单精度浮点数形式
Math.hypot()：所有参数的平方和的平方根
Math.expm1()：e 的参数次方 - 1，即·Math.exp(x) - 1·
Math.log1p()：1 + 参数的自然对数，即·Math.log(1 + x)·，如果参数小于 -1 返回·NaN·
Math.log2()：以 2 为底的参数的对数。如果参数小于 0 返回 NaN
Math.log10()：以 10 为底的参数的对数。如果参数小于 0 返回 NaN
!!

··js
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

Math.cbrt(8) // 2

Math.clz32(0) // 32，0 的二进制形式全为 0，所以有 32 个前导 0
Math.clz32(1) // 31
Math.clz32(0b01000000000000000000000000000000) // 1
// 左移运算符 << 与 Math.clz32 方法直接相关，相当于 32 减参数之和
// << 是用来将一个数的各二进制位全部左移若干位，例如 8 << n 的值为 8 * (2^n)
Math.clz32(1 <¿< 1) // 30
Math.clz32(1 <¿< 2) // 29

Math.imul(2, 4) // 8

// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25
// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1

Math.hypot(3, 4) // 5
Math.hypot(3, 4, 5) // 7.0710678118654755
··

## es6 三角函数方法

!!
Math.sinh()：返回参数的双曲正弦
Math.cosh()：返回参数的双曲余弦
Math.tanh()：返回参数的双曲正切
Math.asinh()：返回参数的反双曲正弦
Math.acosh()：返回参数的反双曲余弦
Math.atanh()：返回参数的反双曲正切
!!

## 指数运算符

ES2016 新增了一个指数运算符·**·

··js
2 ** 2 // 4
2 ** 3 // 8
··

当多个连用时从右边开始计算

··js
2 \\** 3 ** 0
// 相当于
2 \\** (3 ** 0)
··

指数运算符可以与等号结合·**=·

··js
a **= 3
// 等同于
a = a ** 3
··

&2019/4/3
`
        }
    }
}
</script>
