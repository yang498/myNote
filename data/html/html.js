commonData.html.html.content = `
#路径
/：根目录，一般用于本地静态服务或网站服务
./：当前目录，本来不写默认就是当前目录，常用于书写完整目录
../：目录层级回到上一级

#命名
图片命名时不应用数字而是类型，数字是连接的，缺少某个就不规整了，而类型是归类独立的

#常见问题

##嵌套
###p 标签内不能嵌套块级（block）元素，否则会被嵌套的标签分隔
··
<p>
    123
    <div>456</div>
</p>

// 在浏览器中变成
<p>
    123
</p>
<div>456</div>
<p></p>
··
a 标签不能嵌套 a 标签，否则会被分开
··
<a>
    123
    <a>a</a>
</a>

// 在浏览器中变成
<a>
    123
</a>
<a>a</a>
··


##readonly 和 disabled
!!
readonly 在输入框中有效，即·input[text], input[password], textarea·，disabled 都可以
readonly 外观无变化，disable 背景会变灰色
readonly 可聚焦，disable 不行
用于表单提交时 readonly 会提交，disable 不会
!!
`