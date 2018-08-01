#目录
	html
		weex
	css
	css-library
	js
		类型方法
	js-library
	tool
	other
		interview


	common-data.js：所有文档用一个commonData对象变量作为容器，一级菜单作为子属性预先定义好，二级菜单在各自的文件内定义作为二级子属性，可选择定义name属性作为展示的名称，否则就用该二级属性名
	data*.js：一个文档为js文件作为二级菜单，新添加的js注意在index.html引入
	format-html.js：解析文档
	index.html：用vue的数据响应做成单页模式，自定义路径达到切换页面的效果
	common.js：
		页面：默认打开首页，如果有hash值并且合法就跳转到就执行解析formatHtml(当前页面)，点击二级菜单和链接改变hash值路径并重新解析
		滚动：给window绑定滚动事件，响应当前可视区域的h1和h2
		左边菜单：点击左边h1和h2文字就触发对应的h1和h2点击

#匹配规则：format-html.js
	标题：以#开头，h1：#，h2：##，h3：###
	图片：以!开头，!src,width,height
	行内图片：¡(src,width,height)
	链接：α(text|href)
	底部相关参考链接：
		αα
		textαhref
		αα
	加粗：♭text♭
	列表：‖text‖
	行内代码：·code·
	代码块:··code··，和替换的‥
		正则:¦reg¦
	表格：
		%%
		a,b,c	thead
		,0,1,800	居中为0或空，左对齐为1，最后为宽
		1,2,3
		%%
	time:&number
	
	字符串内的链接是网络路径，在//后加×可取消注释
	页内标题点击：α(注意|javascript:;" onclick="$('h1:eq(1)×~h2:eq(0)×')×.click()×)
	如果包含多个 3 级标题，在 2 级标题开头用列表说明