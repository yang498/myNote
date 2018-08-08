commonData.css.css = {
	content: `
	#display
	##flex
	flex 为弹性布局，IE10+支持，可灵活控制子元素的排列顺序
	注意：设为 flex 布局以后，子元素的·float·、·clear·和·vertical-align·属性将失效
	··
	.box{
	  display: flex;
	}
	··
	行内元素也可以使用 flex 布局
	··
	.box{
	  display: inline-flex;
	}
	··
	###容器的属性
	!!
	flex-direction：控制排列方向
		row（默认）：水平方向
		row-reverse：水平方向，顺序倒置
		column：垂直方向
		column-reverse：垂直方向，顺序倒置
	flex-wrap：一行排不下的换行方式
		nowrap（默认）：不换行
		wrap：换行
		wrap-reverse：换行，每行顺序倒置，也就是第1行在最下面，最后一行在最上面
	flex-flow：flex-direction 和 flex-wrap 的简写
	justify-content：子元素在水平方向的对齐方式
		flex-start（默认）：左对齐
		flex-end：右对齐
		center：居中
		space-between：两端对齐，间隔相等
		space-around：每个子元素两侧产生的间隔相等
	align-items：子元素在垂直方向的对齐方式
		stretch（默认）：如果子元素未设置高度或设为auto，将占满整个容器的高度
		flex-start：顶对齐
		flex-end：底对齐
		center：居中
		baseline：以子元素的第一行文字的基线对齐
	align-content：多行对齐方式，如果子元素只有一行该属性不起作用，
		stretch（默认值）：每行垂直方向平均占满
		其余属性和 justify-content 属性相同
	!!
	###子元素的属性
	!!
	align-self：设置单个子元素的对齐方式，可覆盖 align-items 属性，如果没有父元素，则等同于stretch
		auto（默认值）：继承父元素的 align-items 的属性
		其余属性和 align-items 属性相同
	order：定义子元素的排列顺序，数值越小，排列顺序越靠前，默认为0，可以为负数
	flex-grow：定义子元素的放大比例，默认为0，即不放大，可以是小数，负数无效，单独1个子元素设为1就会占满剩余空间
	flex-shrink：定义子元素的缩小比例，默认为1，即如果空间不足该子元素将缩小，可以是小数，负数无效，设为0将不缩小
	flex-basis：定义子元素在水平方向占据的空间，即设置宽度，默认值为auto，即子元素的本来大小。可以使用各种单位。
	flex：flex-grow、flex-shrink 和 flex-basis的简写，默认值为·0 1 auto·，后两个属性可选。
		两个快捷值：auto (·1 1 auto·) 和 none (·0 0 auto·)
	!!
	
	#技巧
	##超出省略
	###单行超出省略
	··
	white-space: nowrap;	// 能保证文字是一行可省略，比如不包含中文
	overflow: hidden;	// 超出隐藏
	text-overflow: ellipsis;	// 超出部分显示...
	··

	###多行超出省略，该方法适用于WebKit内核浏览器及移动端
	··
	overflow: hidden;	// 超出隐藏
	display: -webkit-box;	// 将对象作为弹性伸缩盒子模型显示
	-webkit-box-orient: vertical;	// 设置或检索伸缩盒对象的子元素的排列方式
	-webkit-line-clamp: 2;	// 只显示2行
	··
	`
}