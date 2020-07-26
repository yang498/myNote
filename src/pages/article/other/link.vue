<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# 资源链接

## html

[ASCII 码 和 HTML Codes 转义符](http://www.asciitable.com/)
[文件 MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)
[CSS 长度单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)
[CSS 百分比](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage)
[CSS 角度单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)

## js

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence## Table)

[键盘码 keycode](http://www.t086.com/article/4315)
鼠标码：左键 1，中建 2，右键 3
[HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)
[HTTP 响应代码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
CDN 云资源：[NPM](https://unpkg.com)，[CDNJS](https://cdnjs.com)，[jsDelivr](https://www.jsdelivr.com)

## css 库

[组件库 - Bootstrap](https://v4.bootcss.com/)
[轻量组件库 - Bulma](http://lqzh.me/bulma-docs-cn/)
[动画 - Animate](https://daneden.github.io/animate.css/)
[页面模板 - cruip](https://cruip.com/)

## js 库

[echarts](https://www.echartsjs.com/zh/index.html)
[Lodash](https://lodash.com/)
[banner - Slick](http://kenwheeler.github.io/slick/)
[banner - Swiper](https://www.swiper.com.cn/)
[全屏滚动 - fullPage](https://alvarotrigo.com/fullPage/zh/)
[表格 - DataTables](http://www.datatables.club/reference/)
[前端工具精选 - frontendtools](http://frontendtools.com/)
[音频 - howler](https://howlerjs.com/)

## vue

[Vue](https://cn.vuejs.org/v2/guide/)
[Vue element](http://element-cn.eleme.io/#/zh-CN)
[Vue element 后台模板](https://panjiachen.github.io/vue-element-admin/#/dashboard)

## node 库

[Express](http://www.expressjs.com.cn/)
[Koa](https://koa.bootcss.com/)
[连接SQL Server - Tedious](http://tediousjs.github.io/tedious/index.html)

## 工具

[NPM](https://www.npmjs.com/)
[Gulp](https://gulpjs.com/)
[Git](https://git-scm.com/book/zh/v2)
[搜索 - Algolia](https://www.algolia.com/)
[全景图 - Krpano](https://krpano.com/)
[Krpano 中文 - Krpano360](http://www.krpano360.com/)

## 游戏

[Annie2x](http://www.annie2x.com/)

&2019/09/15
`
        }
    }
}
</script>
