commonData.jsLibrary.jquery = {
	content: `
	#介绍
	jQuery 是 javascript 的一个库，把常用的一些功能和兼容性问题进行了封装，方便使用和提高开发效率。
	引入 jQuery 后，就会提供 2 个全局变量：·jQuery·和相等的简写·$·，即·jQuery === $·，所以·jQuery()·和·$()·是一样的。
	可以通过各种方式使用：
	··
	// 官网最新版本，压缩版在 .js 前加上 .min 即可
	<script src="https://×code.jquery.com/jquery-git.js"></script>

	// 官网指定版本，压缩版在 .js 前加上 .min 即可
	<script src="https://×code.jquery.com/jquery-3.2.1.js"></script>

	// github 克隆
	git clone git://×github.com/jquery/jquery.git
	// 可以查看并构建特定的版本
	git checkout 3.2.1

	// npm
	npm install jquery

	// yarn
	yarn add jquery

	// bower
	bower install jquery
	··
	更多 CDN：@[CDNJS|https://cdnjs.com/libraries/jquery/]，@[jsDelivr|https://www.jsdelivr.com/package/npm/jquery]，@[Microsoft|https://www.asp.net/ajax/cdn#jQuery_Releases_on_the_CDN_0]，@[Google|https://developers.google.com/speed/libraries/devguide#jquery]

	#选择器
	使用·$()·可以用来选择 DOM 元素
	jQuery 使用 CSS 语法来选择元素，并且做了些扩展，所以 jQuery 扩展的选择器要比 css 的选择器消耗多一点性能
	注意 html 中标签和属性名是不区分大小写的，属性值和 css、js 选择器是区分大小写的，比如·<P Class="Demo">·等同于·<p class="Demo">·，·#Demo·和·#demo·是不同的，但是这种大写行为不应该发生，按照 w3c 标准统一都该使用小写，而且代码也易读
	·$()·选择的元素是 jQuery 对象，所以能使用 jQuery 方法，想要使用原生的元素只需选择对应的下标即可，比如·$('.demo')[0]·

	##基本
	!!
	*：所有
	element：标签名
	.class：样式名
	#id：id 名
	selector, selectorN：多选
	$.escapeSelector()：转义选择器中的特殊字符·. # , : [ ] = @·
	html：可以选择一段 html 以使用 jQuery 的方法
	!!

	###*
	选择所有元素
	比如·$('*')·表示选择当前页面所有元素，包扩 html、head 等，·$('#dome *')·表示选择·id="dome"·元素下的所有元素

	###element
	选择给定元素名的所有元素
	比如·$('div')·表示选择所有·div·元素

	###.class
	选择给定样式类名的所有元素
	比如·$('.demo')·表示选择所有·class="demo"·的元素

	####id
	选择给定 id 的元素，如果有多个相同 id 的元素（但应避免这种行为）只返回第一个
	比如·$('#demo')·表示选择·id="demo"·的元素

	###selector, selectorN
	选择给定选择器的所有元素
	比如·$("div, #demo, .class")·表示选择所有·<div></div>·、·id="demo"·、·class="text"·的元素

	###$.escapeSelector(selector)
	如果定义的选择器包含·. # , : [ ] = @·，需先用该方法转义，否则获取不了或有歧义，当然也不建议这种选择器符号出现在选择器中
	比如要获取·id="#demo.text"·，则·$('##demo.text')·是无效的，应改成·$('#' + $.escapeSelector('#demo.text'))·
	也可以直接使用斜杠转义：·$('#\\\\#demo\\\\.text')·
	也可以自定义加斜杠的方法：
	··
	function jq(selector) {
		return selector.replace(/[:\\.\\[\\],=@]/g, '\\\\$&')
	}
	··
	使用：·$('#' + jq('#demo.text'))·

	###html
	可以选择一段 html 以使用 jQuery 的方法
	比如：
	··
	var html = '<div class="demo"><i></i></div>'
	$(html).find('i')	// <i></i>
	··

	##层级
	!!
	parent>child：所有子元素
	ancestor descendant：所有后代元素
	prev+next：下一个元素
	prev~siblings：后面的所有元素
	!!
	###parent>child
	选择 parent 的子元素中筛选 child 的所有元素
	比如·$('#demo>.text')·，若 child 为空则选择 parent 的所有子元素：·$('#demo>')·
	###ancestor descendant
	选择 ancestor 下所有的 descendant 元素，包括孙元素、曾孙元素等
	比如·$('#demo .text')·，若 descendant 为 * 则选择 ancestor 的所有子孙元素：·$('#demo *')·
	###prev+next
	选择同一层级中所有紧接在 prev 元素后的 next 元素
	比如·$('#demo+.text')·，若 next 为空则选择所有 prev 的紧邻元素：·$('#demo+')·
	###prev~siblings
	选择同一层级中所有在 prev 元素之后的 siblings 元素
	比如·$('#demo~.text')·，若 siblings 为空则选择所有 prev 之后的所有元素：·$('#demo~')·

	##属性
	属性值的引号是可选的，也就是·[attr=value]·和·[attr="value"]·是一样的，但是当要表示多个属性值时，就必须用引号了，比如·[attr=val1 val2]·是会报错的，需加上引号·[attr="val1 val2"]·，而且多个属性值的顺序也是不能变的，比如要获取·class="demo active"·需写成·$('[class="demo active"]')·，写成·$('[class="active demo"]')·是获取不了的
	!!
	[attr]：属性
	[attr="value"]：属性 + 值
	[attr!="value"]：不包括该属性 + 值
	[attr*="value"]：含有指定字符串的属性
	[attr~="value"]：含有指定子属性（单词）
	[attr^="value"]：以指定字符串开头的属性
	[attr$="value"]：以指定字符串结尾的属性
	[attr|="value"]：正好是 value 或以 value- 开头的属性
	!!
	###[attr]
	选择所有含有 attr 属性的元素
	比如·$('[class]')·
	###[attr="value"]
	选择所有含有 attr="value" 指定属性值的元素，注意属性值是全部的属性值
	比如·$('[class="demo"]')·表示选择·class="demo"·，·$('[class="demo text"]')·表示选择·class="demo text"·
	###[attr!="value"]
	选择所有不含有 attr="value" 指定属性值的元素，注意属性值是全部的属性值，等同于·:not([attr="value"])·
	比如·$('[class!="demo"]')·表示选择不含有·class="demo"·属性的所有元素
	###[attr*="value"]
	选择所有含有指定字符串的属性的元素
	比如·$('[class*="acti"]')·表示选择含有 acti 字符的类的元素
	###[attr~="value"]
	选择所有含有指定子属性的元素，可以理解为单词选择器
	比如·$('[class*="active"]')·表示选择含有 active 类的元素
	###[attr^="value"]
	选择所有含有以指定字符串开头的属性的元素
	比如·$('[class^="text-"]')·表示选择以 text- 开头的类的元素
	###[attr$="value"]
	选择所有含有以指定字符串结尾的属性的元素
	比如·$('[class$="-text"]')·表示选择以 -text 结尾的类的元素
	###[attr|="value"]
	选择所有属性值正好是 value 或以 value- 开头的元素，通常用于选择 a 链接中的 hreflang 属性
	比如·$('a[hreflang|="en"]')·表示选择·hreflang="en"·或·hreflang="en-UK"·，不会选择·hreflang="english"·

	##子元素
	!!
	:first：第一个
	:last：最后一个
	:first-child：所有父级元素下的第一个子元素
	:last-child：所有父级元素下的最后一个子元素
	:first-of-type：:first-child 的忽略其他元素版
	:last-of-type：:last-child 的忽略其他元素版
	:nth-child()：第几个，顺序从所有同级元素开始算
	:nth-last-child()：:nth-child() 的倒数版
	:nth-of-type()：:nth-child() 的忽略其他元素版
	:nth-last-of-type()：:nth-of-type() 的倒数版
	:only-child：父元素只包含唯一子元素的那个子元素
	:only-of-type：:only-child 的忽略其他元素版
	!!
	###:first
	在匹配的集合中选择第一个元素
	比如·$('li:first')·表示选择第 1 个 li 元素
	###:last
	在匹配的集合中选择最后一个元素
	比如·$('li:last')·表示选择最后 1 个 li 元素
	###:first-child
	选择所有父级元素下的第一个子元素，若指定的元素之前有其他元素则不会被获取
	比如·$('li:first-child')·表示如果有多个 ul 将会选择每个 ul 下的第 1 个 li 元素，若第 1 个 li 之前有其他元素则不会被获取
	###:last-child
	选择所有父级元素下的最后一个子元素，若指定的元素之后有其他元素则不会被获取
	比如·$('li:last-child')·表示如果有多个 ul 将会选择每个 ul 下的最后 1 个 li 元素，若最后 1 个 li 之后有其他元素则不会被获取
	###:first-of-type
	选择所有父级元素下的第一个子元素，忽略指定的元素之前的其他元素
	比如·$('li:first-of-type')·表示如果有多个 ul 将会选择每个 ul 下的第 1 个 li 元素，若第 1 个 li 之前有其他元素也不影响
	###:last-of-type
	选择所有父级元素下的最后一个子元素，忽略指定的元素之后的其他元素
	比如·$('li:last-of-type')·表示如果有多个 ul 将会选择每个 ul 下的最后 1 个 li 元素，若最后 1 个 li 之后有其他元素也不影响
	###:nth-child(index/odd/even/equation)
	在匹配的集合中选择所有符合索引值为的元素，注意顺序是从所有同级元素开始算的，index 和 css 一样是从 1 开始的，且不能为负数，可以是字符串 odd 奇数或 even 偶数，也可以是个方程式，比如 4n
	比如：
	··
	<ul>
		<li>A</li>
		<li>B</li>
		<li>C</li>
		<li>D</li>
	</ul>
	<ul>
		<p>P</p>
		<li>E</li>
		<li>F</li>
		<li>G</li>
		<li>H</li>
	</ul>

	$('li:nth-child(1)')	// A （必须是父元素的第一个子元素，所以没有 E）
	$('li:nth-child(2)')	// B E
	$('li:nth-child(odd)')	// A C F H
	$('li:nth-child(even)')	// B D E G
	$('li:nth-child(4n)')	// D G
	··
	###:nth-last-child(index/even/odd/equation)
	·:nth-child()·的倒数版
	###:nth-of-type(index/even/odd/equation)
	和·:nth-child()·不同的是会忽略其他不同的元素，引用上面例子的 html：
	··
	$('li:nth-child(1)')	// A E
	$('li:nth-child(2)')	// B F
	$('li:nth-child(odd)')	// A C E G
	$('li:nth-child(even)')	// B D F H
	$('li:nth-child(4n)')	// D H
	··
	###:nth-last-of-type(index/even/odd/equation)
	·:nth-of-type()·的倒数版
	###:only-child
	如果某个元素是其父元素的唯一子元素，那么它就会被选中，若父元素有其他子元素，就不会被匹配
	比如·$('button:only-child')·表示选择所有 button 如果是其父元素的唯一子元素
	###:only-of-type
	和·:only-child·不同的是会忽略其他不同的元素
	比如·$('button:only-child')·表示选择所有 button 如果其父元素不含其他 button 元素，有其他比如 input 元素不管

	##基本筛选
	!!
	:eq()：第几个
	:gt()：大于给定 index 的元素
	:lt()：小于给定 index 的元素
	:odd：奇数
	:even：偶数
	!!
	###:eq(index)
	在匹配的集合中选择索引值为 index 的元素，index 可以为负数表示倒数
	比如·$('li:eq(2)')·表示选择第 3 个 li 元素
	###:gt(index)
	在匹配的集合中选择索引值大于给定 index 的元素，index 可以为负数表示从 -1 即最后一个开始算起
	比如·$('li:eq(2)')·表示选择第 3 个之后的所有 li 元素，不包括第 3 个，·$('li:eq(-1)')·将不选择任何元素，·$('li:eq(-3)')·表示选择最后 2 个元素，因为 -1 和 -2 大于 -3
	###:lt(index)
	·:gt(index)·的小于版
	###:odd
	选择索引值为奇数元素，即选择索引值为 1 3 5 7 9... 的元素
	比如·$('li:odd')·表示选择所有 li 中第 1 3 5 7 9... 个元素
	###:even
	选择索引值为偶数元素，即选择索引值为 0 2 4 6 8... 的元素

	##内容筛选
	!!
	:not()：除了指定的元素
	:has()：后代元素中包含指定元素的元素
	:contains()：后代元素中包含指定文本的元素
	:empty：没有子元素的元素，有空格也不行，即空标签
	:parent：和 :empty 相反，即非空标签
	:hidden：隐藏的元素，即 display:none、type="hidden"，包括隐藏的后代元素
	:visible：和·:hidden·相反，即未隐藏的元素
	!!
	###:not(selector)
	在选择的元素中除去给定选择器的元素，selector 可以是任意的选择器
	比如·$('input:not(:checked, :disabled)')·表示选择所有除了已选择和已禁用的 input 元素
	###:has(selector)
	选择匹配的元素中的任何后代元素中包含指定 selector 的元素，selector 可以是任意的选择器，根据 length 的长度可判断是否包含某元素
	比如·$('.demo:has(.text)')·表示在所有·class="demo"·的元素中选择后代元素包含了·class="text"·的
	###:contains(text)
	选择匹配的元素的任何后代元素中包含指定文本的元素，text 可以是任意字符，区分大小写，可选择用引号包裹，也可以不用
	比如·$('.demo:contains(哈哈)')·表示在所有·class="demo"·的元素中选择含有“哈哈”文本的
	###:empty
	选择所有没有子元素的元素，文本节点包括空格也不行，即匹配空标签
	比如·$('.demo:empty')·匹配·<div class="demo"></div>·
	###:parent
	选择所有含有子元素或者文本的父级元素，和·:empty·相反，即匹配非空标签
	###:hidden
	选择所有隐藏的元素，隐藏的标准是：·display:none·，·input type="hidden"·，祖先节点符合以上情况，不会被渲染的标签（head、meta、title、style、script 等）
	###:visible
	选择所有显示的元素，和·:hidden·相反

	##其他筛选
	!!
	:lang()：指定语言的元素,
	:animated：jQuery 动画中的元素,
	:target：id 和当前 hash 值相同的元素,
	:header：所有标题，即 h1, h2, h3, h4, h4, h6,
	:root：根元素，即 html
	!!
	###:lang(language)
	选择指定语言的所有元素
	比如·$('div:lang(en)')·表示选择·<div lang="en">·和·<div lang="en-us">·及其所有子元素，如果子元素中有其他语言比如·<div lang="fr">·将不会被选择
	###:animated
	选择所有正在执行动画效果的元素，这个动画指的是 jQuery 的动画，不包括 css 或其他生成的动画
	比如某个元素正在执行·fadeToggle()·动画，就能被·$(':animated')·获取到
	###:target
	如果页面的网址包含 hash 值，将匹配 ID 和 hash 相匹配的元素
	比如页面的网址是·http://example.com/#foo·，那么·$( "h1:target" )·将匹配·<h1 id="foo">·元素
	注意是在页面 DOM 渲染完之后才能获取，比如放在·$(function(){})·中
	###:header
	选择所有标题元素，等同于·$('h1, h2, h3, h4, h4, h6')·
	###:root
	选择根元素，等同于·$('html')·

	##表单筛选
	!!
	:input：表单元素，即 input, textarea, select, button
	:text：文本类型元素
	:password：密码类型元素
	:radio：单选类型元素
	:checkbox：多选类型元素
	:file：文件类型元素
	:image：图片类型元素
	:button：按钮类型元素，即 button, [type="button"]
	:submit：提交类型元素
	:reset：重置类型元素
	:checked：选中的元素
	:selected：option 中选中的元素
	:disabled：禁用的元素
	:enabled：未禁用的元素
	:focus：获取焦点的元素
	!!
	###:input
	选择所有表单元素，即·$('input, textarea, select, button')·
	###:text
	选择所有类型为文本的元素，即·$('[type="text"]')·
	注意如果只是一个·<input/>·标签而没有 type 属性，虽然默认为·type="text"·，但·$('[type="text"]')·是获取不到的，而·:text·可以，这是他们之间一点小小的区别
	###:password
	选择所有类型为密码的元素，即·$('[type="password"]')·
	###:radio
	选择所有类型为单选按钮的元素，即·$('[type="radio"]')·，选择单选按钮可以写成·$(':radio[name="gender"]')·
	###:checkbox
	选择所有类型为多选按钮的元素，即·$('[type="checkbox"]')·
	###:file
	选择所有类型为文件的元素，即·$('[type="file"]')·
	###:image
	选择所有类型为图片的元素，即·$('[type="image"]')·
	###:button
	选择所有按钮元素和类型为按钮的元素，即·$('button, [type="button"]')·
	###:submit
	选择所有类型为提交按钮的元素，即·$('[type="submit"]')·
	注意如果只是一个·<button>·标签而没有 type 属性也会被获取
	###:reset
	选择所有类型为重置按钮的元素，即·$('[type="reset"]')·
	###:checked
	匹配所有选中的元素，适用的元素有：checkbox、radio、option
	###:selected
	匹配所有选中的元素，只适用于·<option>·元素
	###:disabled
	选择所有被禁用的元素，即·$('[disabled]')·
	###:enabled
	选择所有没被禁用的元素，即·$(':not([disabled])')·
	###:focus
	选择当前获取焦点的元素，适用于表单元素和 a 标签，按 Tab 键也能选择焦点，所以给其他元素添加 tabindex 属性，也能被 :focus 选择

	#DOM 属性
	##css
	!!
	.addClass()：添加 class
	.removeClass()：删除 class
	.toggleClass()：切换 class
	.has()：是否有 class
	.css()：获取或设置样式
	$.cssHooks：扩展 .css()
	$.cssNumber：在用 .css() 设置数值时哪些属性不用加 px
	!!
	###.addClass(className/function)
	为每个匹配的元素添加指定的样式类名，多个样式名以空格隔开
	比如·$('.demo').addClass('active')·，·$('.demo').addClass('active tab')·
	还可以是个函数，接受 2 个参数
	··
	// index 为当前元素在所有匹配的元素即 $('.demo') 的索引值，currentClass 为当前元素的类名
	$('.demo').addClass(function (index, currentClass) {
		return 'active'	// 返回结果表示要添加的类名，可以是字符串或方法函数
	})
	··
	###.removeClass([className]/function)
	为每个匹配的元素移除指定的样式类名，多个样式名以空格隔开，没有参数将全部移除，函数用法同·.addClass()·
	###.toggleClass(className/function [, state])
	为每个匹配的元素切换指定的样式类名，多个样式名以空格隔开，没有参数将切换元素已有的全部类名，函数用法同·.addClass()·
	可以指定第二个参数类型为 Boolean 值，通过控制第二个参数的值判断是该添加还是删除样式，比如：
	··
	$('.demo').toggleClass(className/function, state)
	// 等同于
	state ? $('.demo').addClass(className/function) : $('.demo').removeClass(className/function)
	··
	###.has(className)
	判断元素是否有指定的类名，返回一个 Boolean 值，多个样式名以空格隔开，可以设为·''·判断有没有类名
	###.css(className/classNameArr [, value/function])
	获取或设置样式属性的计算值，2 个单词以上的属性名可以使用连字符或驼峰法，即·background-color·和·backgroundColor·是一样的
	比如·$('.demo').css('color')·表示返回该元素的颜色值
	获取多个属性用数组表示，返回一个 object 对象，键名即属性名，键值即对应的属性值
	比如·$('.demo').css(['color', 'background-color', 'font-size'])·
	可以传入第二个参数表示给指定的属性设置新属性，即设置行内 style，多个值用空格隔开
	注意设置样式会忽略·!important·声明，需换成类名代替或使用其他插件
	比如·$('.demo').css('color', '#f00')·，·$('.demo').css('border', '1px solid #ccc')·
	若设置的值为数字，默认将其转换为一个字符串，并添在结尾处添加 px
	比如·.css('width', 50)·，·.css('width', '50')·，·.css('width', '50px')·这 3 条语句是等价的
	可以在控制台打印·$.cssHooks·看，默认会将 number 类型会自动加 px，而其中包含 set 方法的表示可以补全字符串类型的，即·.css('width', '50')·会加上 px，而·.css('left', '50')·则不会，因为 left 没有 set 方法，当然也可以自定义·$.cssHooks·补全
	若设置的值为空字符串，如果行内 style 中有这个属性将会移除
	比如·$('.demo').css('color', '')·
	可以设置一个相对值，以 += 或者 -= 开头的字符串，在原有的基础上加上或减去相应的值
	比如·$('.demo').css('padding-left', '+=20')·表示原来是 10 的话改变之后将是 30
	可以设置一个函数，返回的值即为要设置的值，如果未返回或返回 undefined 将不会做什么改变，该函数接受 2 个参数
	比如：
	··
	// index 为当前元素在所有匹配的元素即 $('.demo') 的索引值，style 为当前元素所设置属性的原有的样式值
	$('.demo').css('width', function (index, style) {
		return '100px'
	})
	··
	同时设置多个属性用键值对表示，键名可以不用引号，但包含连字符时必须得用引号
	比如：
	··
	$('.demo').css({
		'color': '#f00',
		'background-color': '#f80',
		'font-size': '18px'
	})
	··
	###$.cssHooks
	自定义拓展·.css()·属性，比如用·rotate·代替·transform: rotate()·或·-webkit-transform: rotate()·等，即·.css('rotate', 10})·，然而·$.cssHook·并不完善，所以会出现 rotateX/perspective 等无效的情况，平时也不常用，有兴趣再了解
	###$.cssNumber
	定义·.css()·属性中哪些属性值不需要使用单位，以确定在设置数值时哪些需要加上单位 px
	默认包含的属性有：·zIndex fontWeight opacity zoom lineHeight widows orphans fillOpacity columnCount order flexGrow flexShrink·，这些属性的值都为·$.cssNumber.someCSSProp = true·
	比如·$.cssNumber.left = true·表示之后的·.css('left', 100)·是不会自动加单位 px 的，即这是个无效的设置

	##属性
	!!
	.val()：获取或设置 value 值
	.attr()：获取或设置属性值
	.removeAttr()：删除属性值
	.prop()：获取或设置包含 Boolean 值的属性值
	.removeProp()：删除由·.prop()·方法自定义的属性，或永久删除原生属性
	!!
	###.val([value/function])
	获取或设置元素的 value 值，通常用于表单元素中
	比如·$('input.name').val()·表示获取输入框的值
	可以传入第二个参数表示设置匹配元素的属性
	比如·$('input.name').val('bilibili')·
	可以设置一个函数，返回的值即为要设置的值，如果未返回或返回 undefined 将不会做什么改变
	该函数接受 2 个参数，index 为当前匹配元素的索引值，value 为当前元素所设置属性的原有的值
	###.attr(attributeName [, value/function])
	获取匹配的元素集合中的第一个元素的属性的值，若要获取所有元素的属性需要循环中一一获取
	比如·$('.demo').attr('title')·表示获取该元素上 title 的值
	可以传入第二个参数表示设置匹配元素的属性，如果是多个目标元素可以全部同时设置
	比如·$('.demo').attr('title', 'hello world')·
	可以设置一个函数，返回的值即为要设置的值，如果未返回或返回 undefined 将不会做什么改变
	该函数接受 2 个参数，index 为当前匹配元素的索引值，value 为当前元素所设置属性的原有的值
	同时设置多个属性用键值对表示，键名可以不用引号，但包含连字符时必须得用引号
	注意设置 class 时必须用引号，因为是构造函数“类”的关键字
	比如：
	··
	$('.demo').attr({
		'title': 'hello world',
		'alt': '好啊好啊'
	})
	··
	###.removeAttr(attributeName)
	移除匹配的元素集合中的指定属性，多个属性使用空格隔开
	比如·$('.demo').removeAttr('id')·，·$('.demo').removeAttr('title alt')·
	###.prop(propertyName [, value/function])
	获取或设置匹配的元素集合中的第一个元素的属性的值，若要获取所有元素的属性需要循环中一一获取
	因为·.attr()·虽能获取设置属性值，但在特定的属性中，比如·checked selected disabled·，得到的是·'checked' 'selected' 'disabled'·没错，但更希望是个 Boolean 值，而·.prop()·就能做到这一点，用法还是和·.attr()·一样的
	比如·$('.demo').prop('checked')·返回 true/false，·$('.demo').prop('checked', true)·设置为 true
	###.removeProp(propertyName)
	用来删除由·.prop()·方法设置的自定义属性集，多个属性使用空格隔开
	注意不要用来删除原生的属性，比如 checked disabled，这将完全移除该属性，不能再次被添加到元素上。使用·.prop()·来设置这些属性设置为 false 代替比较好

	##数据
	!!
	.data()：在元素上存储或读取任意相关数据，包括元素上的 data- 开头的属性
	.removeData()：删除·.data()·绑定的数据，不影响元素上的 data- 属性
	$.data()：.data() 的另一种写法，原生元素作为第一个参数
	$.removeData()：.removeData() 的另一种写法，原生元素作为第一个参数
	$.hasData()：判断元素是否有 .data() 绑定的数据，原生元素作为参数
	!!
	###.data([key] [, value])
	在指定的元素上存储或读取任意相关数据，key 为字符串类型，value 为任意非 undefined 类型
	如果匹配的是多个元素，只读取第一个，需要全部读取要用循环，当然存储是全部存储
	不传入参数表示读取全部，传入 1 个参数表示读取，传入 2 个参数表示存储，已存在会覆盖，也可以传入一个 object 对象以存储多个数据
	如果传入的 key 包含连字符，将会自动转换成驼峰写法
	此为临时存储的数据，页面刷新就会没有
	比如：
	··
	$('.demo').data('test-a', 'hhhh')	// 存储
	$('.demo').data()	// 返回 {testA: "hhhh"}
	··
	如果元素上有以·data-·开头的属性，那也会被·.data()·方法使用，·data-·之后的字符串就是 key，值就是 value
	比如：
	··
	<div class="demo" data-demo="demo" data-test-a="hh"></div>

	$('.demo').data()	// 返回 {demo: "demo", testA: "hh"}
	$('.demo').data({'test-a': 'hhhh', 'test-b': 'bbbb'})	// 覆盖存储，不会直接修改元素的 data- 里面的属性值
	$('.demo').data()	// 返回 {demo: "demo", testA: "hhhh", testB: "bbbb"}
	··
	###.removeData([name/list])
	在指定的元素上移除用·.data()·绑定的数据，不影响元素上的·data-·属性，需使用·.removeAttr()·来移除·data-·属性
	不传入参数表示全部删除，传入 1 个参数表示删除指定的数据，删除多个可传入以空格隔开的字符串或字符串数组
	如果传入的字符串包含连字符，将会自动转换成驼峰写法
	比如·$('.demo').removeData('demo')·
	###$.data(element [, key] [, value])
	·.data()·的另一种写法，把目标元素放在第一个参数，注意 element 是原生的
	比如·$.data($('.demo')[0], 'test', 'hhhh')·
	###$.removeData(element, [name/list])
	·.removeData()·的另一种写法，把目标元素放在第一个参数，注意 element 是原生的
	比如·$.removeData($('.demo')[0], 'test')·
	###$.hasData(element)
	判断元素是否有·.data()·绑定的数据，如果有返回 true，否则返回 false，注意 element 是原生的
	比如·$.hasData($('.demo')[0])·

	##尺寸
	!!
	.width()：获取宽度，不包括 padding 和 border
	.height()：获取高度，用法同 .width()
	.innerWidth()：获取宽度，包括 padding，不包括 border，用法同 .width()
	.innerHeight()：获取高度，用法同 .innerWidth()
	.outerWidth()：获取宽度，包括 padding 和 border，可传入一个 true 表示包括 margin，用法同 .width()
	.outerHeight()：获取高度，用法同·.outerWidth()·
	!!
	###.width([value/function])
	为匹配的元素集合中获取第一个元素的当前计算宽度值，返回数字，不包括 padding 和 border，设置了·box-sizing: border-box;·也会减去 padding 和 border
	·.css(width)·返回的是带单位的字符串，为样式设置的计算宽度
	可以传入第二个参数以设置宽度，传入数字时单位默认为 px，也可以传入自定义单位的字符串
	或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和 width，返回值作为要设置的宽度
	###.height([value/function])
	获取高度，用法同·.width()·
	###.innerWidth([value/function])
	获取宽度，包括 padding，不包括 border，用法同·.width()·
	###.innerHeight([value/function])
	获取高度，用法同·.innerWidth()·
	###.outerWidth([includeMargin/value/function])
	获取宽度，包括 padding 和 border，可传入一个·true·表示包括 margin，用法同·.width()·
	###.outerHeight([includeMargin/value/function])
	获取高度，用法同·.outerWidth()·

	##位置
	!!
	.offset()：获取或设置相对于文档的 left 和 top 值
	.offsetParent()：获取离指定元素最近的非 static 定位的祖先元素
	.position()：获取相对于离指定元素最近的非 static 定位的祖先元素的 left 和 top 值
	.scrollTop()：获取或设置相对于顶部滚动的距离
	.scrollLeft()：获取或设置相对于左边滚动的距离
	!!
	###.offset([coordinates/function])
	返回一个对象，包含 left 和 top，坐标相对于文档，即网页左上角
	可以传入 1 个参数以设置 left 和 top，形式如·{left: 100, top: 100}·，使用后该元素将会添加·relative·定位
	或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和 coordinates，返回值作为要设置的宽度
	###.offsetParent()
	获取离指定元素最近的非 static 定位的祖先元素
	###.position()
	返回一个对象，包含 left 和 top 值，坐标相对于离指定元素最近的非 static 定位的祖先元素
	###.scrollTop([value])
	获取或设置相对于顶部滚动的距离，即网页卷去的高度
	可以传入 1 个数值以设置这个距离，比如设为 0 表示回到顶部
	###.scrollLeft([value])
	获取或设置相对于左边滚动的距离，用法同·.scrollTop()·

	#DOM 操作
	##复制
	###.clone([withDataAndEvents] [, deepWithDataAndEvents])
	深拷贝指定元素，包括子元素
	!!
	withDataAndEvents{Boolean}[false]：该元素是否复制绑定的事件和·.data()·设置的值
	deepWithDataAndEvents{Boolean}[withDataAndEvents]：该元素的所有后代元素是否复制绑定的事件和·.data()·设置的值，默认和第一个参数保持一致，即·.clone()·等同于·.clone(false, false)·，·.clone(true)·等同于·.clone(true, true)·
	!!
	比如·$('.demo').clone().appendTo('.test')·
	若元素未经复制就进行添加等操作表示移动该元素
	比如·$('.demo').appendTo('.test')·表示·$('.demo')·被移动到·$('.test')·里面的末尾处
	注意元素的动态状态也会复制，比如·<input type="text">·输入的值，选中的复选框，出于性能方面的考虑，·<textarea>·输入的值和·<select>·选中的值不会被复制
	复制的元素在插入到文档之前，可以修改该复制的元素

	##内部添加
	!!
	.text()：获取或设置文本
	.html()：获取或设置 html
	.append()：在元素里面的最后添加
	.appendTo()：写法和 .append() 相反
	.prepend()：在元素里面的开头添加
	.prependTo()：写法和 .prepend() 相反
	!!
	###.text([text/function])
	获取或设置匹配元素集合中每个元素的合并文本，包括所有的后代元素
	不传入参数表示获取，传入 1 个参数表示设置内容为传入的参数
	或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和文本内容，返回值作为要设置的文本内容
	比如·$('.demo').text()·
	###.html([html/function])
	获取匹配元素集合中第一个元素或设置所有每个元素的 html 内容，包括所有的后代元素，用法同·.text()·
	###.append(content [, ...content] / function(index, html))
	在每个匹配元素里面的末尾处添加参数内容，可以接受任何数量的额外的参数，或者传入一个函数，返回值作为要添加的内容
	比如·$('.demo').append('<i></i>')·，·$('.demo').append($('i'), '<p></p>', document.createElement('div'))·
	###.appendTo(target)
	和·.append()·的写法相反，要添加的内容被添加到元素里面的末尾处
	比如·$('<p></p>').appendTo('.demo')·
	###.prepend(content [, ...content] / function(index, html))
	在每个匹配元素里面的开始处添加参数内容，和·.append()·的用法一样
	###.prependTo(target)
	和·.prepend()·的写法相反，要添加的内容被添加到元素里面的开始处

	##外部添加
	!!
	.after()：在元素后面添加
	.before()：在元素前面添加
	.insertAfter()：写法和 .after() 相反
	.insertBefore()：写法和 .before() 相反
	!!
	###.after(content [, ...content] / function(index, html))
	在匹配元素的每个元素后面插入参数的内容，作为兄弟节点，参数用法同·.append()·
	比如·$('.demo').after('<i></i>')·
	###.before(content [, ...content] / function(index, html))
	在匹配元素的每个元素前面插入参数的内容，作为兄弟节点，用法同·.after()·
	###.insertAfter(target)
	和·.after()·的写法相反，要添加的内容被添加到元素的后面
	###.insertBefore(target)
	和·.before()·的写法相反，要添加的内容被添加到元素的前面

	##外部包裹
	!!
	.wrap()：为每个元素添加父元素
	.wrapAll()：为所有的元素添加一个父元素
	.wrapInner()：为每个元素的内部添加父元素
	.unwrap()：为每个元素删除父元素，和 .wrap() 相反
	!!
	###.wrap(element/function(index))
	为匹配的每个元素的外部包裹一个指定的标签，若传入多个元素只使用第一个，若传入多层元素则保留所有元素只使用最里面的第一子元素
	比如现有元素：
	··
	<div class="demo"></div>
	<div class="demo"></div>
	··
	添加外层标签
	··
	$('.demo').wrap('<div class="test"></div>')

	// 变成
	<div class="test">
		<div class="demo"></div>
	</div>
	<div class="test">
		<div class="demo"></div>
	</div>
	··
	添加多个外层标签
	··
	<div class="test">
		<div class="first"></div>
		<div class="second">
			<div class="child"></div>
		</div>
		<div class="third"></div>
	</div>

	$('.demo').wrap('.test')

	// 变成
	<div class="test">
		<div class="first">
			<div class="demo"></div>
		</div>
		<div class="second">
			<div class="child"></div>
		</div>
		<div class="third"></div>
	</div>
	<div class="test">
		<div class="first">
			<div class="demo"></div>
		</div>
		<div class="second">
			<div class="child"></div>
		</div>
		<div class="third"></div>
	</div>
	··
	###wrapAll(element/function(index))
	为匹配的所有元素的外部包裹一个指定的标签，若中间有其他元素会被忽略，多个元素或多层元素效果同·.wrap()·
	比如现有元素：
	··
	<div class="demo"></div>
	<div class="middle"></div>
	<div class="demo"></div>
	··
	添加外层标签
	··
	$('.demo').wrap('<div class="test"></div>')

	// 变成
	<div class="test">
		<div class="demo"></div>
		<div class="demo"></div>
	</div>
	<div class="middle"></div>
	··
	###.wrapInner(element/function(index))
	在匹配元素的内容外部包裹一个指定的标签，多个元素或多层元素效果同·.wrap()·
	··
	<div class="demo">123 <i></i></div>
	<div class="demo">123 <i></i></div>
	··
	添加外层标签
	··
	$('.demo').wrapInner('<div class="test"></div>')

	// 变成
	<div class="demo">
		<div class="test">123 <i></i></div>
	</div>
	<div class="demo">
		<div class="test">123 <i></i></div>
	</div>
	··
	###.unwrap([selector])
	将匹配元素集合的父级元素删除，保留自身，包括兄弟元素，和·.wrap()·相反
	可选择传入一个选择器在匹配的元素中筛选哪些元素的父元素应该被删除

	##删除
	!!
	.remove()：删除元素和其后代，包括删除绑定的事件和·.data()·绑定的数据
	.detach()：删除元素和其后代，保留绑定的事件和·.data()·绑定的数据
	.empty()：删除元素的后代，即把元素变成空标签
	!!
	###.remove([selector])
	删除匹配的元素和其所有的后代元素，包括删除绑定的事件和·.data()·绑定的数据
	可选择传入一个选择器在匹配的元素中筛选哪些应该被删除
	比如·$('.demo').remove()·，·$('.demo').remove(':first')·
	###.detach([selector])
	和·.remove()·的用法一样，不同的是会保留绑定的事件和·.data()·绑定的数据，适用于当把元素删除之后再把该元素添加到页面中
	比如：
	··
	<input type="button" value="添加" />
	<div class="demo remove">remove</div>
	<div class="demo detach">detach</div>

	$('.demo').on('click', function () {
		console.log(123)
	})
	var remove = $('.remove').remove()	// 再次被添加无点击效果
	var detach = $('.detach').detach()	// 再次被添加有点击效果
	$('input').on('click', function () {
		$(this).after(remove, detach)
	})
	··
	###.empty()
	删除匹配元素的所有后代元素，即把元素变成空标签

	##替换
	!!
	.replaceWith()：元素被替换成指定元素
	.replaceAll()：和 .replaceWith() 相反，指定元素把目标元素替换
	!!
	###.replaceWith(newContent/function)
	将匹配的元素替换成指定元素，直接使用页面的元素替换表示移动该元素覆盖目标元素
	比如：
	··
	<div class="demo">123</div>
	<div class="demo">456</div>

	// 替换
	$('.demo').replaceWith('<h2>demo<h2>')

	// 变成
	<h2>demo</h2>
	<h2>demo</h2>
	··
	###.replaceAll(target)
	和·.replaceWith()·的写法相反，将匹配的元素替换掉每个目标元素
	比如：·$('<h2>demo<h2>').replaceAll('.demo')·

	#DOM 状态
	##追加
	###.add(selector/html [, context])
	在已选择的元素中追加选择指定元素，即·$('.demo').add('p')·等同于·$('.demo, p')·
	比如·$('.demo').removeClass('red').add('p').addClass('active')·表示 .demo 删除 red 类再和 p 元素一起添加 active 类
	也可以追加 html，即·.add('<p></p>')·，但要先添加页面中才会生效
	比如·$('.demo').removeClass('red').add('<p></p>').insertAfter('.demo:last').addClass('active')·
	注意：
	··
	var $demo = $('.demo')

	$demo.add('p')	// 临时保存，不会保存到 $demo 变量中
	console.log($demo)	// .demo

	$demo = $demo.add('p')	// 再次保存才行
	console.log($demo)	// .demo, p
	··
	可选择第二个参数筛选要追加的元素
	比如·$('.demo').add('p', '.box')·表示 p 属于 .box 的后代元素才会被追加，等同于·$('.demo').add('.box p')·

	##回退
	###.end()
	返回元素的上一次状态，通常用于链式调用中
	比如：
	··
	<div class="demo">
		<div class="first">
			<div class="child"></div>
		</div>
		<div class="second"></div>
	</div>

	$('.demo').find('.first').end()	// .demo
	$('.demo').find('.child').end()	// .demo
	$('.demo').find('.first').find('.child').end()	// .first
	$('.demo').find('.first').find('.child').end().end()	// .demo
	$('.demo').find('.first').removeClass('active').end().find('.second').addClass('active')
	··

	#DOM 遍历
	##循环
	###.each(function(index, item))
	循环元素并执行函数
	接受 2 个参数，index 为当前元素的索引，item 代表当前元素，注意是原生的，也可以用·this·表示当前元素
	使用·return false·可结束循环
	比如：
	··
	$('.demo').each(function (index, item) {
		console.log($(this).css('color'))
	})
	··
	##循环返回
	###.map(callback(index, domElement))
	通过一个函数匹配当前集合中的每个元素，生成新的 jQuery 对象
	比如：
	··
	$('p').append($('input').map(function(){
		return $(this).val()
	}).get().join(', '))
	··

	#DOM 选择
	##筛选
	!!
	.eq()：第几个
	.first()：第一个
	.last()：最后一个
	.not()：除了哪个
	.has()：包含哪个才可以
	.filter()：符合条件的
	.slice()：截取一段
	!!
	###.eq(index)
	在匹配的集合中选择索引值为 index 的元素，index 可以为负数表示倒数
	比如·$('li').eq(2)·表示选择第 3 个 li 元素
	###.first()
	在匹配的集合中选择第一个元素
	比如·$('li').first()·表示选择第 1 个 li 元素
	###.last()
	在匹配的集合中选择最后一个元素
	比如·$('li').last()·表示选择最后 1 个 li 元素
	###.not(selector/function(index))
	在选择的元素中除去给定选择器或函数返回值的元素
	比如·$('.demo').not(':checked, :disabled')·表示选择所有除了已选择和已禁用的 input 元素
	###.has(selector)
	选择匹配的元素中的任何后代元素中包含指定 selector 的元素，selector 可以是任意的选择器，根据 length 的长度可判断是否包含某元素
	比如·$('.demo').has('.text')·表示在所有·class="demo"·的元素中选择后代元素包含了·class="text"·的
	###.filter(selector/function(index))
	筛选出指定的元素
	比如：
	··
	<ul>
	  <li>A</li>
	  <li>B</li>
	  <li class="mark">C</li>
	  <li class="mark">D</li>
	</ul>

	$('li').filter('.mark')	// C, D
	$('li').filter(':odd')	// B, D
	$('li').filter(function (index) {	// A, D
		return index % 3 === 0
	})
	··
	###.slice(start [, end ])
	根据指定的下标范围，生成新的 jQuery 对象，start 和 end 都是整数，包括 start 不包括 end，可以是负数表示倒数，不填 end 表示直到最后
	比如·$('li').slice(2, 4)·表示选择下标为第 2 和 第 3 的 li 元素
	
	##子元素
	!!
	.children()：子元素
	.contents()：包含文本、注释、iframe 的子元素
	!!
	###.children()
	获得匹配元素的所有子元素，只获取元素，不包括文字和注释节点
	比如·$('.demo').children()·
	###.contents()
	获得匹配元素的所有子元素，和 .children() 不同的是包括文字和注释节点
	而且还能获取 iframe 的内容（跨域无法访问，iframe 的网址需要和当前页面同域）
	比如·$('.demo').contents()·，$('iframe').contents().find('.demo')
	
	##父元素
	!!
	.parent()：父元素
	.parents()：祖先元素
	.parentsUntil()：祖先元素直到哪里
	!!
	
	##兄弟元素
	!!
	.prev()：前一个
	.next()：后一个
	.prevAll()：前面所有
	.nextAll()：后面所有
	.siblings()：前后所有
	.prevUntil()：前面直到哪里
	.nextUntil()：后面直到哪里
	!!
	
	##查找
	!!
	.find()：往下找
	.closest()：往上找
	!!

	##判断
	###.is(selector/function(index))
	判断当前元素合中如果至少一个匹配给定的参数，即若能根据后面的选择器在当前元素中至少找到 1 个，则返回 true，否则返回 false
	可以传入一个函数，返回 Boolean 值作为结果
	比如：
	··
	<ul>
		<li>AAA</li>
		<li>BBB <span>bbb</span></li>
		<li class="mark">CCC</li>
		<li class="mark">DDD <span>ddd</span></li>
	</ul>

	$('li').is('.mark')	// true
	$('ul').on('click', function (event) {
		$(event.target).is('li') && $(event.target).css('color', 'red')	// 点击 span 不会触发
	})
	··

	&2018.8.9
	`
}