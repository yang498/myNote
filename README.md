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


	common-data.js：所有文档用一个commonData对象变量作为容器，一级菜单作为子属性预先定义好，二级菜单在各自的文件内定义作为二级子属性，可以定义name属性作为展示的名称
	data*.js：一个文档为js文件作为二级菜单，新添加js注意在index.html引入js
	format-html.js：文档按照规则填写，然后对文档解析，将h1作为左边导航菜单，并给h1添加点击事件，将自己距离文档顶部的距离作为参数而滚动到相应位置的方法
	index.html：用vue的数据响应做成单页模式，显示所有一二级目录
	common.js：
		页面：默认打开首页，如果有hash值并且合法就跳转到响应文档，点击二级菜单和链接改变数据和hash值做成历史记录
		滚动：给window绑定滚动事件，aside的active响应文档的滚动，和hashchange事件，响应用户前进后退和手动改变hash值来跳转页面
		搜索：来自插件
		设置：
			回到上次：页面在关闭前用localstorage记录当前位置，下次再打开提示是否回到上次的位置，也可以勾选不再提醒，设置也可以更改打开或关闭
			换肤：把相关颜色抽离出来，用一个web同级的class控制用sass循环，把选择的颜色保存在localstorage，所涉及的颜色：header和aside的背景色，h1的颜色
			换背景：点击更换web容器的背景图片
			反馈页列表：第一次留下大名，直接提交内容，谁都可以留言
