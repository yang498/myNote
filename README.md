# 70% 的时间用在原生语言上，30% 的时间用在框架上，框架可能会过时，而原生语言不会，但也要学习框架的编程风格、设计模式、底层原理，说不定是什么黑科技

# 目录

- **common-data.js**：所有文档用一个 commonData 对象变量作为容器，一级菜单作为子属性预先定义好，二级菜单在各自的文件内定义作为二级子属性，可选择定义 name 属性作为展示的名称，否则就用该二级属性名
- **data/*.js**：一个 js 文件为一个文档作为二级菜单
- **regexp.js**：解析文档的正则
- **format-html.js**：解析文档的方法
- **index.html**：用 vue 做成单页模式，自定义路径达到切换页面的效果
- **common.js**：如果有 hash 值并且合法就执行解析 ，点击二级菜单或改变 hash 值重新解析，绑定滚动事件响应当前 h1 和 h2，	点击 h1 和 h2 滚动到相应位置

# 匹配规则

优先参考 markdown 和使用键盘上的字符，有冲突了再将常见字符转成特殊字符

**标题**：h1 #，h2 ##，h3 ###

**图片**：!src,width,height

**行内图片**：![src,width,height]

**链接**：@[text|href]

**加粗**：^^text^^

**行内代码**：·code·

**代码块**：

	··
	code
	··

**列表**：

	!!
	text
	!!

**表格**：

	%%
	a,b,c（thead）
	,0,1,800（居中为 0 或空，左对齐为 1，最后的数字为宽）
	1,2,3（tbody）
	%%

**底部链接**：

	@@（加 ! 表示多行）
	text|href
	@@


**最后更新时间**：&number

# Tips

页内标题点击(右中括号后面接¿不会被解析)：@[注意|javascript:;" onclick="$('h1:eq(1)~h2:eq(0)').click()]

如果包含多个 3 级标题，在 2 级标题开头用列表说明
