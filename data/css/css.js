commonData.css.css = {
	content: `
	#css
	单行超出省略
	white-space: nowrap;	// 能保证文字是一行可省略，比如不包含中文
	overflow: hidden;	// 超出隐藏
	text-overflow: ellipsis;	// 超出部分显示...

	多行超出省略，该方法适用于WebKit内核浏览器及移动端
	overflow: hidden;	// 超出隐藏
	display: -webkit-box;	// 将对象作为弹性伸缩盒子模型显示
	-webkit-box-orient: vertical;	// 设置或检索伸缩盒对象的子元素的排列方式
	-webkit-line-clamp: 2;	// 只显示2行
	`
}