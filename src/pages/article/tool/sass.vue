<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# sass

## 概述

### 介绍

sass 是一种 css 预处理工具，更好书写，简单便捷
scss 是 sass 3 引入的新语法，其语法完全兼容 css
sass 文件使用·.sass·后缀，scss 文件使用·.scss·后缀
sass 是以严格的缩进式语法来书写，不带大括号和分号，而 scss 与 css 的书写格式类似，所以一般常用 scss

#### css
··css
#box {
    width: 400px;
    height: 400px;
}

#box h1 {
    font-size: 22px;
    color: red;
}

#box p {
    font-size: 18px;
    color: green;
}
··

#### sass

··sass
#box
    width: 400px
    height: 400px
    h1
    font-size: 22px
    color: red
    p
    font-size: 18px
    color: green
··

#### scss

··scss
#box {
    width: 400px;
    height: 400px;
    h1 {
        font-size: 22px;
        color: red;
    }
    p {
        font-size: 18px;
        color: green;
    }
}
··

### 安装

#### ruby

因为 sass 依赖于 ruby 环境来编译，先在[官网下载](https://rubyinstaller.org/downloads)安装 ruby 环境
注意安装时勾选 Add Ruby executables to your PATH 这个选项以添加环境变量
也可以使用其他的方式编译，例如·gulp·、·webpack·等，一些编辑器也能自动编译

#### sass

安装完毕后在开始菜单栏找到 Ruby 文件，打开 Start Command Prompt with Ruby，在命令行中输入：

··bash
gem install sass
··

升级 sass 版本：

··bash
gem update sass
··

查看 sass 版本：

··bash
sass -v
··

帮助，查看所有命令

··bash
sass -h
··

### 指令

### 编译模式

写法：·scss --watch scss:css --style 编译模式·
现有如下 scss：

··scss
#box {
    width: 400px;
    height: 400px;
    h1 {
        font-size: 22px;
        color: red;
    }
    p {
        font-size: 18px;
        color: green;
    }
}
··

### nested 嵌套

默认输出方式，保持一定的缩进

··css
#box {
    width: 400px;
    height: 400px;
    border: 1px solid gray; }
    #box h1 {
    font-size: 22px;
    color: red; }
    #box p {
    font-size: 18px;
    color: green; }
··

### expanded 展开

··css
#box {
    width: 400px;
    height: 400px;
    border: 1px solid gray;
}
#box h1 {
    font-size: 22px;
    color: red;
}
#box p {
    font-size: 18px;
    color: green;
}
··

### compact 紧凑

··css
#box { width: 400px; height: 400px; border: 1px solid gray; }
#box h1 { font-size: 22px; color: red; }
#box p { font-size: 18px; color: green; }
··

### compressed 压缩

··css
#box{width:400px;height:400px;border:1px solid gray}#box h1{font-size:22px;color:red}#box p{font-size:18px;color:green}
··

@@
[Sass 中文网](http://sass.bootcss.com)
@@

&2019/09/12
`
        }
    }
}
</script>
