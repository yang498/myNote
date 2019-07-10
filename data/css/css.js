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
	·background: color image repeat position/size origin attachment·：背景样式
	!!
	background-color：背景颜色
	background-image：背景图片，比背景颜色层级高，支持·url(imgUrl)·、渐变等，可指定多个背景图片以逗号隔开，层级越后越低
		·url()·括号内的引号可省略，当省略时注意若·imgUrl·内包含括号、空格、单双引号需使用·\\·进行转码
	background-repeat[repeat]：背景图片的重复方式
		写法：可写 2 个值以空格隔开分别指定水平和垂直方向，在多个背景图片下可写多个值以逗号隔开分别指定重复方式
		repeat|repeat-x|repeat-y|no-repeat：分别是·重复|只在水平方向重复|只在垂直方向重复|不重复·
		space：不裁剪重复，把边上裁剪的部分顶出去，所以图像之间会有些空隙，·background-position·会被忽视
		round：不裁剪重复，边上裁剪的部分尽可能的顶进来，所以图像会适当的缩小，图像之间没有空隙
	background-position[0% 0%]：背景图片的位置
		背景图片距离的位置是和容器的相对位置^^重合^^的，例如·0% 50%·表示背景图片的左边界和容器边界重合、中心点和容器的中心点重合
		写法：可写 2 个值以空格隔开分别指定水平和垂直方向，在多个背景图片下可写多个值以逗号隔开分别指定位置
		单位：支持 px、百分比等单位，可以是负数
		top|left|right|bottom|center：放在指定边缘，分别代表·50% 0%|0% 50%|100% 50%|50% 100%|50% 50%·
		left|right + 距离：定义 x 轴位置，相对于该方位的距离，例如·right 10px·表示 x 轴上距离容器右侧 10px
		top|bottom + 距离：定义 y 轴位置，相对于该方位的距离，例如·bottom 10px·表示 y 轴上距离容器底部 10px
			所以可以写 4 个值，例如·right 10px bottom 10px·表示背景图片距离右侧 10px、距离底部 10px
	background-position-x[left]：单独设置背景图片 x 轴的位置
	background-position-y[top]：单独设置背景图片 y 轴的位置
	background-size[auto auto]：背景图片的大小
		写法：可写 2 个值以空格隔开分别指定宽度和高度，在多个背景图片下可写多个值以逗号隔开分别指定大小
		单位：支持 px、百分比等单位
		auto：保持背景图片的原比例
		cover：保持背景图片的比例完全覆盖背景区域，左右或上下部分可能会被裁剪
		contain：保持背景图片的比例完全嵌入背景区域，不会被裁剪
	background-attachment[scroll]：背景图片是否随容器滚动，在多个背景图片下可写多个值以逗号隔开分别指定滚动方式
		scroll：容器内固定，容器外滚动
		fixed：绝对固定，不管处于哪个容器都不会滚动
		local：跟随容器滚动
	background-origin[padding-box]：背景图片的显示区域起点，当·background-attachment·设为·fixed·时会忽略此属性
		padding-box：以 padding 区域为起点
		border-box：以 border 区域为起点
		content-box：以原始内容区域为起点，即不包括 padding 和 border
	background-clip[border-box]：背景图片或颜色的裁剪范围
		border-box：在 border 区域内显示
		padding-box：在 padding 区域内显示
		content-box：在原始内容区域内显示，即不包括 padding 和 border
		text：在文字区域内显示，注意如果要显示背景图片需把文字颜色去掉，即·color: transparent;·
			·text·属性兼容性不太好，若不支持需加上·-webkit-·前缀，即·-webkit-background-clip: text;·
	background-blend-mode：多个背景图片下定义混合模式，例如高亮、柔光、减淡等，参考 @[MDN 中文|https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode] 和 @[MDN 英文|https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode]
	!!

	#渐变
	渐变属于·background-image·
	##linear-gradient()
	线性渐变
	!!
	linear-gradient()
	!!

	#小技巧

	##水平垂直居中定宽高
	@[参考|https://segmentfault.com/a/1190000016389031]，此部分代码为公共部分：
	··
	<div class="box">
		<div class="item size">居中</div>
	</div>

	.box {
		border: 2px solid #000;
		width: 300px;
		height: 300px;
	}
	.item {
		color: #fff;
		background: #f08;
		font-weight: bold;
	}
	.size {
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	··
	·absolute + 负 margin·：
	··
	.box {
		position: relative;
	}
	.item {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -50px;
		margin-top: -50px;
	}
	··
	·absolute + margin auto·：
	··
	.box {
		position: relative;
	}
	.item {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	··
	·absolute + calc·：
	··
	.box {
		position: relative;
	}
	.item {
		position: absolute;
		top: calc(50% - 50px);
		left: calc(50% - 50px);
	}
	··
	##水平垂直居中不定宽高
	此部分代码为公共部分，和上面一样，只去掉了·size·样式名，即宽高：
	··
	<div class="box">
		<div class="item">居中</div>
	</div>
	··
	·absolute + transform·：
	··
	.box {
		position: relative;
	}
	.item {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	··
	·flex·：
	··
	.box {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	··
	·grid·：
	··
	.box {
		display: grid;
		justify-items: center;
		align-items: center;
	}
	··
	·子元素设为 inline-block·：
	··
	.box {
		line-height: 300px;
		text-align: center;
	}
	.item {
		display: inline-block;
		line-height: initial;
	}
	··
	·父元素设置 display: table-cell·（table 布局特性）：
	··
	.box {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	.item {
		display: inline-block;
	}
	··
	·writing-mode·（让文字以垂直方向排列，同时改变 css 方向，例如 text-align）：
	··
	<div class="box">
		<div class="box-inner">
			<div class="item">居中</div>
		</div>
	</div>

	.box {
		writing-mode: vertical-lr; /* 子元素垂直居中 */
		text-align: center;
	}
	.box-inner {
		writing-mode: horizontal-tb; /* 子元素水平居中 */
		display: inline-block;
		width: 100%;
	}
	.item {
		display: inline-block;
	}
	··

	##文字超出省略
	###单行超出省略
	··
	overflow: hidden;  // 超出隐藏
	white-space: nowrap;  // 文字不换行
	text-overflow: ellipsis;  // 超出部分显示...
	··

	###多行超出省略，WebKit 扩展属性，该方法适用于 WebKit 内核浏览器（Chrome 和 Safari）和移动端
	·display: -webkit-box;·是老式的·flex·布局，已慢慢淘汰，语法@[参考|https://www.cnblogs.com/whiteMu/p/5378747.html]
	··
	overflow: hidden;  // 超出隐藏
	display: -webkit-box;  // 设为弹性伸缩盒子模型
	-webkit-box-orient: vertical;  // 子元素垂直排列
	-webkit-line-clamp: 2;  // 控制显示行数，例如只显示 2 行，超出部分显示...
	··

	##超出行数的显示隐藏
	仿微信朋友圈，每段文字最多展示 5 行，若有多出的文字则显示“全文”按钮，点击可查看全文
	全文按钮只在文字超过 5 行时显示，所以要先判断文字是否超出了 5 行，即判断高度
	注意由于 js 的执行晚于 dom 渲染，如果直接判断会造成超出的文字出现一下又消失，所以超出的文字开始是隐藏的
	··
	<div class="text">
		<p>明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。</p>
	</div>

	.text {
		width: 150px;
		max-height: 100px;
		overflow: hidden;
	}
	.text.active {
		max-height: none;
	}
	p {
		width: 150px;
		line-height: 20px; /* 父容器的高是行高的 5 倍 */
		margin: 0;
	}
	a {
		color: #08f;
		cursor: pointer;
	}

	// 这里使用了 jQuery
	if ($('p').height() > 100) $('.text').after('<a>全文</a>')
	$('a').click(function () {
		$('.text').toggleClass('active').hasClass('active') ? $(this).text('收起') : $(this).text('全文')
	})
	··

	&2019/7/10
`