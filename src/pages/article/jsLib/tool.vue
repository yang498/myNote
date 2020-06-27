<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# js 工具

## js-xlsx

### 介绍

读取和导出 excel 的工具库，支持·xlsx·、·xls·等多种表格格式
由于表格的数据是以二进制保存的，所以会以二进制形式读取或导出
[github](https://github.com/SheetJS/js-xlsx)，[官网](https://sheetjs.com)，安装：

··bash
npm i xlsx
··

dist 目录下的·xlsx.core.min.js·为精简版，·xlsx.full.min.js·为完整版
引入 js 后将会产生·XLSX·这个全局变量：

!!
XLSX.read(excel)：读取表格返回表格对象
    data：表格数据
    option {Object}：配置
        type {String}：读取方式，可选：
            ·array·(8位无符号数组)、·base64·、·binary·、·buffer·、·string·、·file·(node 环境支持)

xlsx.write(workBook, option)：转换成表格格式的字符串数据

XLSX.utils：转换工具
    XLSX.utils.sheet_to_json(sheet)：生成 json 格式，即数组对象，第一行为 key，第二行开始为 value
    XLSX.utils.sheet_to_html(sheet)：生成 html 格式，注意是以·<html></html>·作为起始和结束的
    XLSX.utils.sheet_to_csv(sheet)：生成 csv 格式，以逗号分隔的文本
    XLSX.utils.sheet_to_txt(sheet)：生成 txt 格式，以 tab 分隔的文本

    XLSX.utils.json_to_sheet(data)：将数组对象转成 sheet
    XLSX.utils.aoa_to_sheet(data)：将二维数组转成 sheet
    XLSX.utils.table_to_sheet(data)：将·<table>·元素转成 sheet

    XLSX.utils.book_new()：创建一个空的工作簿对象
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName)：给工作簿添加一个工作表
!!

### XLSX.read()

·XLSX.read(data [, options])·：读取表格

··js
// <input id="file" type="file"/>

const [$, { log }] = [document.querySelector.bind(document), console]
$('#file').onchange = function () {
    if (this.files[0]) {
        const reader = new FileReader()
        reader.readAsBinaryString(this.files[0])
        reader.onload = () => {
            const excel = XLSX.read(reader.result, { type: 'binary' })
            log(excel)
        }
    }
}
··

返回的·excel·对象包含了表格的所有信息，主要看·excel.SheetNames·和·excel.Sheets·属性
·SheetNames·是所有·sheet·名字组成的数组
·Sheets·是所有 sheet 组成的对象，所以通过·SheetNames·可以获取指定的 sheet
·Sheets·中的主要属性：

!!
\\!ref {String}：当前表的范围，例如·A1:H8·
\\!merges {Array}：单元格合并的信息
    例如·[{s: {c: 0, r: 1}, e: {c: 0, r: 4}}]·，表示有 1 个合并单元格，范围是·A2~A5·
    s {Object}：(start) 起始
    e {Object}：(end) 结束
        c {Number}：(column) 列，从 0 开始，即 0 代表 A，1 代表 B，以此类推
        r {Number}：(row) 行，从 0 开始，即 0 代表 1，1 代表 2，以此类推
A1... {Object}：每个单元格，若是合并的单元格只显示起始的子单元格，主要的属性有：
    v {String}：原始值
    t {String}：类型，·b·(Boolean)，·e·(Error)，·n·(Number)，·d·(Date)，·s·(Text)，·z·(Stub)
    f {String}：公式
    r {String}：富文本
    h {String}：HTML 类型富文本
    l {String}：单元格超链接对象
!!

### XLSX.utils

·XLSX.utils.sheet_to_*·：读取表格后将表格转换为可视对象

··js
// <input id="file" type="file"/>

const [$, { log }] = [document.querySelector.bind(document), console]
$('#file').onchange = function () {
    if (this.files[0]) {
        const reader = new FileReader()
        reader.readAsBinaryString(this.files[0])
        reader.onload = () => {
            const excel = XLSX.read(reader.result, { type: 'binary' })
            const sheet1 = excel.Sheets[excel.SheetNames[0]]
            log(XLSX.utils.sheet_to_json(sheet1))
            log(XLSX.utils.sheet_to_html(sheet1))
        }
    }
}
··

·XLSX.utils.*_to_sheet·：将 js 数据转换为表格数据，通常用于下载

··js
// <button>下载表格</button>

const [$, { log }] = [document.querySelector.bind(document), console]

// String 转 ArrayBuffer
const SToAB = str => {
    let buf = new ArrayBuffer(str.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i != str.length; i++) view[i] = str.charCodeAt(i) & 0xFF
    return buf
}

$('button').onclick = function () {
    // 下载的数据
    const arr = [
        ['姓名',  '性别', '年龄', '注册时间'],
        ['李雷',   '男',   22,    new Date],
        ['韩梅梅', '女',   20,    new Date]
    ]
    // 转换成表对象，格式和 XLSX.utils.sheet_to_json 返回的一样
    const excel = {
        SheetNames: ['sheet1'],
        Sheets: {
            sheet1: XLSX.utils.aoa_to_sheet(arr)
        }
    }
    // 转换成表格格式的字符串数据
    const data = XLSX.write(excel, { bookType: 'xlsx', type: 'binary' })
    // 转换成可下载的 blob 对象
    const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const url = URL.createObjectURL(new Blob([SToAB(data)], { type }))
    // 用 a 链接下载
    const a = document.createElement('a')
    a.href = url
    a.download = '用户表'
    a.click()
}
··

## async-validator

本文档记录版本：·v3.3.0·

### 概述

表单异步验证，github: [async-validator](https://github.com/yiminghe/async-validator)

安装：

··bash
npm i async-validator -S
··

### 基本使用

这里使用了 Vue 的方式：

··html
<template>
    <div>
        <input v-model="form.name">
        <p>{{ message.name }}</p>
        <input v-model="form.age">
        <p>{{ message.age }}</p>
        <button @click="submit">submit</button>
    </div>
</template>
··

··js
import Schema from 'async-validator'
let validator = null
export default {
    data () {
        return {
            // 表单对象
            form: {
                name: '张三',
                age: '18'
            },
            // 校验规则
            rules: {
                name: { // 一条校验规则
                    required: true,
                    message: '姓名为必填项'
                },
                age: [ // 多条校验规则
                    {
                        required: true,
                        message: '年龄为必填项'
                    },
                    {
                        validator (rule, value, callback) {
                            value < 18
                                ? callback(new Error('未成年人不符合条件'))
                                : callback()
                        }
                    }
                ]
            },
            // 错误提示
            message: {
                name: '',
                age: ''
            }
        }
    },
    created () {
        // 实例化构造函数表示创建一个校验器，参数为校验规则对象
        validator = new Schema(this.rules)
    },
    methods: {
        // 提交
        submit () {
            this.clearMessage()
            validator.validate(this.form, {
                firstFields: true
            }).then(() => {
                // 校验通过
                console.log('ok')
            }).catch(({ errors }) => {
                // 校验未通过
                // 显示错误信息
                for (let { field, message } of errors) this.message[field] = message
            })
        },
        // 清空校验错误提示
        clearMessage () {
            for (let key in this.message) this.message[key] = ''
        }
    }
}
··

### rules

校验规则，每个校验属性对应要校验的表单对象

!!
type {String}：内置校验类型，可选值如下
    string：必须是 string 类型，默认类型
    number：必须是 number 类型
    boolean：必须是 boolean 类型
    method：必须是 function 类型
    regexp：必须是 regexp 类型
    integer：必须是整数类型
    float：必须是浮点数类型
    array：必须是 array 类型
    object：必须是 object 类型
    enum：必须出现在 ·enmu· 指定的值中
    date：必须是 date 类型
    url：必须是 url 类型
    hex：必须是 16 进制类型
    email：必须是 email 类型
    any：任意类型
required {Boolean}：是否必填
pattern {Regexp}：需要符合的正则
min {Number}：最小值，对于字符串和数组会与 ·length· 比较，对于数字会直接与值比较
max {Number}：最大值，比较规则同上
len {Number}：指定长度，比较规则同上，优先级高于 ·min· 和 ·max·
enum {Array}：指定的值，配合 ·type: 'enum'· 使用
whitespace {Boolean}：是否值不能都是空格
fields {Object}：嵌套规则，必须在父规则上指定 ·required·，否则不会校验
defaultField {Object/Array}：·fields· 属性的扩展，校验 ·object· 和 ·array· 类型中所有的值
transform {Function}：校验前对值进行转换，函数的参数为当前值，返回值为改变后的值
message：校验提示信息，可以任意类型，例如 string、JSX、函数的返回值
validator {Function}：自定义校验函数，参数依次如下
    rule：当前校验字段在 rules 中所对应的校验规则
    value：当前校验字段的值
    callback：校验完成时的回调，传入 ·Error· 或 ·ErrorArray· 表示校验失败，不传即为成功
        如果校验是同步的直接返回 ·false· 或 ·Error/ErrorArray· 也可以
    source：校验对象
    options：配置项，属性如下
        messages：校验错误提示信息，会被合并到默认的提示信息中
asyncValidator {Function}：自定义异步校验函数，参数同 ·validator·
!!

### validate 方法

校验方法：

··js
function (source, [options], callback): Promise
··

!!
source {Object}：需要校验的对象
options {Object}：配置项
    first {Boolean}：第一个未通过校验的字段发生错误就调用 ·callback·，即不再继续校验剩余字段
    firstFields {Boolean/StringArray}：多条校验规则的配置
        Boolean：每个字段的第一个规则发生错误就调用 ·callback·，即不再继续校验该字段的剩余规则
        StringArray：指定字段的第一个规则发生错误就调用 ·callback·
    suppressWarning {Boolean}：是否禁止无效值的内部警告
callback(errors, fields) {Function}：校验完成时的回调，若 ·errors· 存在表示校验失败，否则校验成功
!!

返回的 Promise：

!!
then()：校验通过的回调
catch({ errors, fields })：校验失败的回调
    errors {Array}：所有校验错误的 ·Error· 数组
    fields {Object}：所有校验错误的对象，键名为校验字段名，键值为 ·Error· 数组
!!

### messages 方法

·async-validator· 内部有些内置常用的英语校验提示，如果不指定校验规则中的 ·message·，默认就是使用内置的英语提示
使用 ·messages· 方法可以自定义默认校验提示，·%s· 为校验的字段名，所有可修改的字段见项目源码 ·src/messages.js·

··js
validator.messages({
    required: '%s 必填'
})
··

### FAQ

#### 如何关闭校验错误时的控制台警告

··js
Schema.warning = () => {}
··

#### 如何校验值为 true

··js
{
  type: 'enum',
  enum: [true]
}
··

&2020/06/27
            `
        }
    }
}
</script>
