<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# 浏览器

## URL

·<a>·元素和·<area>·元素都部署了这个接口。即它们的 DOM 节点对象可以使用 URL 的实例属性和方法

··js
var a = document.createElement('a')
a.href = 'http://example.com/?foo=1'

a.hostname // "example.com"
a.search // "?foo=1"
··

### new URL

·new URL(url)·：接受一个·url·生成·URL·实例

··js
var url = new URL('http://www.example.com/index.html')
url.href // "http://www.example.com/index.html"
··

·new URL(relUrl, absUrl)·：如果 url 是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准

··js
var url1 = new URL('index.html', 'http://example.com')
url1.href // "http://example.com/index.html"

var url2 = new URL('page2.html', 'http://example.com/page1.html')
url2.href // "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href // "http://example.com/"
··

### 实例方法

（URL 实例的属性同 location 对象）

!!
URL.createObjectURL(file)：用来为上传/下载的文件、流媒体文件生成一个 URL 字符串，以·blob:·开头
    这个 URL 对应内存的一个 Blob 对象，与·data://URL·（URL 包含实际数据）和·file://URL·（本地文件系统里面的文件）都不一样
URL.revokeObjectURL(blobUrl)：释放·createObjectURL()·生成的实例以节省内存，参数即·createObjectURL()·返回的 url
!!

预览上传的图片

··js
// <input id="file" type="file" accept="image/*"/>
// <img id="img"/>

const $file = document.querySelector('#file')
const $img = document.querySelector('#img')
$file.onchange = function () {
    $img.src = URL.createObjectURL(this.files[0]) // 形如 blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1
}
··

## URLSearchParams

·URLSearchParams·对象用于处理 url 的查询字符串（即 url 问号后面的部分）

## Blob

Blob (Binary Large Object)：二进制大对象，Blob 对象表示一个二进制文件的数据内容，通常用来读写文件

·new Blob(array [, options])·：生成实例对象

!!
array {Array}：由字符串或二进制对象组成的数组
options {Object}：配置
    type {String}：数据的 MIME 类型，[参考 MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)
!!

返回的实例属性方法

!!
myBlob.size {Number}：数据的大小
myBlob.type {String}：数据的类型
myBlob.slice([start, end, contentType])：拷贝原来的数据并返回一个·Blob·实例
    start {Number} [0]：指定起始的字节位置
    end {Number} [myBlob.size]：指定结束的字节位置，该位置本身将不包含在拷贝的数据之中
    contentType {String}：数据类型
!!

保存 html 数据：

··js
const htmlFragment = '<a id="a"><b id="b">hey!</b></a>'
const myBlob = new Blob([htmlFragment], {type: 'text/html'})

myBlob.size // 32
myBlob.type // "text/html"
··

## File

·File·对象代表一个文件，用来读写文件信息，继承自·Blob·对象

### new File

·new File(array, name [, options])·：主动生成·File·实例对象

!!
array {Array}：以二进制对象或字符串组成的数组，表示文件的内容
name {String}：文件名或文件路径
options {Object}：设置实例的属性
    type {String}：实例对象的 MIME 类型
    lastModified {Number}[Date.now()]：上次修改的时间
!!

··js
const file = new File(['foo'], 'foo.txt', {type: 'text/plain'})
··

生成实例对象后的属性：

!!
File.name：文件名或文件路径
File.size：文件大小（单位字节）
File.type：文件的 MIME 类型
File.lastModified：最后修改时间的时间戳格式
File.lastModifiedDate：最后修改时间的字符串格式
File.slice()：复制截取原来的数据，此方法继承于·Blob·对象
!!

··js
const myFile = new File([], 'file.bin', {lastModified: new Date(2018, 1, 1)})
myFile.name // "file.bin"
myFile.size // 0
myFile.type // ""
myFile.lastModified // 1517414400000
myFile.lastModifiedDate // Thu Feb 01 2018 00:00:00 GMT+0800 (中国标准时间)
··

### FileList

类似数组的对象，代表一组选中的文件，每个成员都是一个·File·实例对象，实例对象的属性同上·new File·的
它主要出现在两个场合：

!!
选择文件：·<input type="file">·的·files·属性
拖拽文件：目标区的·DataTransfer.files·属性
!!

··js
// <input id="file" type="file"/>

const file = document.querySelector('#file').files[0]
file instanceof File // true
··

有个·item()·方法可以选择哪个文件，但方括号可以直接选择，即·files[0]·等同于·files.item(0)·，所以用不上了

### new FileReader

读取·File·对象或·Blob·对象，返回的实例属性：

!!
FileReader.error {Error}：读取文件时产生的错误对象
FileReader.readyState {Number}：读取文件时的当前状态，·0·尚未加载，·1·正在加载，·2·加载完成
FileReader.result：读取完成后的文件内容

FileReader.onabort：abort 事件（用户终止读取操作）的监听函数。
FileReader.onerror：error 事件（读取错误）的监听函数。
FileReader.onload：load 事件（读取操作完成）的监听函数，通常在这个函数里面使用·result·属性，拿到文件内容
FileReader.onloadstart：loadstart 事件（读取操作开始）的监听函数
FileReader.onloadend：loadend 事件（读取操作结束）的监听函数
FileReader.onprogress：progress 事件（读取操作进行中）的监听函数

FileReader.abort(file)：终止读取操作，·readyState·属性将变成·2·
FileReader.readAsArrayBuffer(file)：以·ArrayBuffer·的格式读取文件
FileReader.readAsBinaryString(file)：以·BinaryString·的格式读取文件
FileReader.readAsDataURL(file)：以·DataURL·（Base64 编码）的格式读取文件，对于图片文件可直接用于·<img>·的·src·属性
    注意，不能直接对 Base64 解码，必须把前缀·data:*/*;base64,·从字符串里删除后再进行
FileReader.readAsText(file [, encode])：以·text·的格式读取文件
    file：文件的 Blob 实例
    encode [UTF-8]：文本编码
!!

预览上传的图片：

··js
// <input id="file" type="file" accept="image/*"/>
// <img id="img"/>

const $file = document.querySelector('#file')
const $img = document.querySelector('#img')
$file.onchange = function () {
    const reader = new FileReader()
    if (this.files[0]) reader.readAsDataURL(this.files[0]) // 加个判断防止选择文件时点击取消也会触发
    reader.onload = () => $img.src = reader.result
}
··

## 浏览器

### Network

get - Query String Parameters
post - Form Data：Content-Type: application/x-www-form-urlencoded (默认)
post - Request Payload：Content-Type:application/json;charset=UTF-8（jq 默认会把 data 转成查询字符串，如果先 JSON.stringify(data) 就是个对象）

&2019/4/18
`
        }
    }
}
</script>
