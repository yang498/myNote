commonData.css.css.content = `
	#display
	##flex
	flex 为弹性布局，IE10+ 支持，可灵活控制子元素的排列顺序，@[参考|http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html]
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
		row[默认值]：水平方向
		row-reverse：水平方向，顺序倒置
		column：垂直方向
		column-reverse：垂直方向，顺序倒置
	flex-wrap：一行排不下的换行方式
		nowrap[默认值]：不换行
		wrap：换行
		wrap-reverse：换行，每行顺序倒置，也就是第 1 行在最下面，最后一行在最上面
	flex-flow：flex-direction 和 flex-wrap 的简写
	justify-content：子元素在水平方向的对齐方式
		flex-start[默认值]：左对齐
		flex-end：右对齐
		center：居中
		space-between：两端对齐，间隔相等
		space-around：每个子元素两侧产生的间隔相等
		space-evenly：每个子元素之间的间隔相等
	align-items：子元素在垂直方向的对齐方式
		stretch[默认值]：如果子元素未设置高度或设为 auto，将占满整个容器的高度
		flex-start：顶对齐
		flex-end：底对齐
		center：居中
		baseline：以子元素的第一行文字的基线对齐
	align-content：多行对齐方式，如果子元素只有一行该属性不起作用，
		stretch[默认值]：每行垂直方向平均占满
		其余属性和 justify-content 属性相同
	!!
	###子元素的属性
	!!
	align-self：设置单个子元素的对齐方式，可覆盖 align-items 属性，如果没有父元素，则等同于 stretch
		auto[默认值]：继承父元素的 align-items 的属性
		其余属性和 align-items 属性相同
	order：定义子元素的排列顺序，数值越小，排列顺序越靠前，默认为 0，可以为负数
	flex-grow：定义子元素的放大比例，默认为 0，即不放大，可以是小数，负数无效，单独 1 个子元素设为 1 就会占满剩余空间
	flex-shrink：定义子元素的缩小比例，默认为 1，即如果空间不足该子元素将缩小，可以是小数，负数无效，设为 0 将不缩小
	flex-basis：定义子元素在水平方向占据的空间，即设置宽度，默认值为 auto，即子元素的本来大小。可以使用各种单位。
	flex：flex-grow、flex-shrink 和 flex-basis 的简写，默认值为·0 1 auto·，后两个属性可选。
		两个快捷值：·auto·(1 1 auto) 和·none·(0 0 auto)
	!!

	##grid
	grid 为网格布局，能控制子元素的布局，@[参考|http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html]
	注意：设为网格布局以后容器的·float、vertical-align 和 column-*·等设置都将失效，子元素若未设置宽高将默认填满
	··
	div {
		display: grid;
	}
	··
	行内元素也可以使用 grid 布局
	··
	div {
		display: inline-grid;
	}
	··
	###容器的属性
	!!
	grid-template-columns：定义列宽，可使用·百分比、repeat()、fr、minmax()、auto·，用中括号可定义网格线名称（网格线在单元格两侧）
	grid-template-rows：定义行高
	grid-template-areas：指定单元格名，不用的区域用·.·表示，则每个区域的水平垂直线的起始线命名为·区域名-start·，终止线为·区域名-end·
	grid-template：·grid-template-columns grid-template-rows grid-template-areas·的简写

	grid-auto-columns 和 grid-auto-rows：假设定义了 3*3 但实际有 10 个单元格，此属性可控制多出单元格的列宽和行高，属性同·grid-template-columns·，注意多出的单元格处于第 4 列或行才是多出的列或行，若不指定这两个属性多出的单元格将处于最小列宽和行高
	grid-auto-flow[row]：指定排列方向，·row·先行后列、·column·先列后行、·row dense·横向紧密填满、·column dense·竖向紧密填满
	grid：·grid-template-rows grid-template-columns grid-template-areas  grid-auto-rows grid-auto-columns grid-auto-flow·的简写

	justify-items[stretch]：定义单元格的水平位置，·start·起始、·end·结束、·center·居中、·stretch·拉伸
	align-items[stretch]：定义单元格的垂直位置，属性同·justify-items·
	place-items：定义垂直水平位置的简写，·<align-items> <justify-items>·，若不写第二个值则第二个值和第一个值相等

	justify-content[start]：定义列的水平位置，·start·起始、·end·结束、·center·居中、·stretch·拉伸、
		·space-around·每列的两侧间隔相等、·space-between·两端对齐且间隔相等、·space-evenly·每列的间隔相等
	align-content[start]：定义行的垂直位置，属性同·justify-content·
	place-content：定义垂直水平位置的简写，·<align-content> <justify-content>·，若不写第二个值则第二个值和第一个值相等

	row-gap：行间距
	column-gap：列间距
	gap：行列间距简写，·<row-gap> <column-gap>·，若不写第二个值则第二个值和第一个值相等
	!!
	###子元素的属性
	!!
	·grid-column-start·左边框、·grid-column-end·右边框、·grid-row-start·上边框、·grid-row-end·下边框：
		指定单元格的四个边框分别定位在哪根网格线，即可指定单元格在容器中的位置和可跨行跨列，值可以是网格线的数字或自定义的名字
		使用·span 数字·可指定跨多少行
		若产生了项目的重叠，则可使用·z-index·属性指定项目的层级
	grid-column：·grid-column-start grid-column-end·的简写，以· / ·隔开
	grid-row：·grid-row-start grid-row-end·的简写，以· / ·隔开
	grid-area：指定项目放在哪一个区域，值为自定义的区域名称，也可以是·grid-row-start grid-column-start grid-row-end grid-column-end·的简写，即指定了大小，也指定了位置
	justify-self：单独设置水平位置，属性同·justify-items·
	align-self：单独设置垂直位置，属性同·align-items·
	place-self：·align-self justify-self·的简写，若不写第二个值则第二个值和第一个值相等
	!!
	··
	// 假设 div.container 有 9 个 div 子元素，定义 3 行 3 列的宽度为 100px，即将子元素 9 等分
	.container {
		display: grid;
		grid-template-columns: 100px 100px 100px;
		grid-template-rows: 100px 100px 100px;
		grid-template-areas: "header header header"
							"main main sidebar"
							"footer footer .";
	}

	// 单位还可以是百分比
	grid-template-columns: 33.33% 33.33% 33.33%;
	// 重复写太麻烦，使用 repeat()，第一个参数是重复次数，第二个是重复的值
	grid-template-columns: repeat(3, 33.33%);
	grid-template-columns: repeat(2, 100px 20px 80px);
	// 若单元格大小固定，但容器大小不确定，希望容纳尽可能多的单元格使用 auto-fill 自动填充
	grid-template-columns: repeat(auto-fill, 100px);
	// 使用 fr 关键字可以表示比例的关系
	grid-template-columns: 1fr 1fr; // 各占 50%
	grid-template-columns: 1fr 3fr; // 第一个占 25%，第二个占 75%
	grid-template-columns: 100px 1fr 3fr; // 第二个占容器宽度减 100px 后的 25%，第二个占容器宽度减 100px 后的 75%
	// minmax() 可让长度固定在一个范围中，偏向最大值，即尽可能填满，第一个参数是最小值，第二个是最大值
	grid-template-columns: 1fr 1fr minmax(100px, 1fr);
	// auto 可表示填充剩下的长度
	grid-template-columns: 100px auto 100px;
	// 每根网格线（比如 3 个格子由 4 根线围成）还可定义名称以方便引用，写在方括号中
	grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
	grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];

	// 定义子元素所处的位置，可指定 span 跨越多少个单元格
	.item1 {
		grid-column-start: 1; // 竖向网格线的第 1 根
		grid-column-end: header-end; // 定义区域名称的右边框
		grid-row-start: span 2; // 上边框与下边框之间有 2 个单元格，即跨 2 格
		grid-row-end: span 2; // 等同于 grid-row-start
	}
	// 简写
	.item1 {
		grid-column: 1 /¿ header-end;
		grid-row: span 2;
	}

	// grid-area
	.item1 {
		grid-area: header;
	}
	.item1 {
		grid-area: 1 /¿ 1 / 3 /¿ 3;
	}
	··

	#background
	·background: color image repeat origin position attachment·：背景色
	!!
	background-color：背景颜色
	background-image：背景图片，比背景颜色层级高，支持·url(imgUrl)·、渐变等，可指定多个背景图片以逗号隔开，层级越后越低
	background-repeat[repeat]：背景图片的重复方式
		写法：可写 2 个值以空格隔开分别指定水平和垂直方向，在多个背景图片下可写多个值以逗号隔开分别指定重复方式
		repeat|repeat-x|repeat-y|no-repeat：分别是·重复|只在水平方向重复|只在垂直方向重复|不重复·
		space：不裁剪重复，把边上裁剪的部分顶出去，所以图像之间会有些空隙，·background-position·会被忽视
		round：不裁剪重复，边上裁剪的部分尽可能的顶进来，所以图像会适当的缩小，图像之间没有空隙
	background-attachment[scroll]：背景图片是否随容器滚动，在多个背景图片下可写多个值以逗号隔开分别指定滚动方式
		scroll：容器内固定，容器外滚动
		fixed：绝对固定，不管处于哪个容器都不会滚动
		local：跟随容器滚动
	background-origin：背景图片的中心点
	background-position：
	!!

	#渐变
	渐变属于·background-image·
	##linear-gradient()
	线性渐变
	!!
	linear-gradient()
	!!

	#小技巧
	##文字超出省略
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

	&2019/3/29
`