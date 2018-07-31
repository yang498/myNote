commonData.jsLibrary.jquery = {
	content: `
	#介绍
	jQuery 是 javascript 的一个库，把常用的一些功能和兼容性问题进行了封装，方便使用和提高开发效率。
	引入 jQuery 后，就会提供2个全局变量·jQuery·和相等的简写·$·，即·jQuery()·和·$()·是一样的。
	
	#选择器
	使用·$()·可以用来选择 DOM 元素
	jQuery 使用 CSS 语法来选择元素，并且做了些扩展，所以 jQuery 扩展的选择器要比 css 的选择器消耗多一点性能
	注意 html 中标签和属性名是不区分大小写的，属性值和 css、js 选择器是区分大小写的，比如·<P Class="Demo">·等同于·<p class="Demo">·，·#Demo·和·#demo·是不同的，但是这种大写行为不应该发生，按照 w3c 标准统一都该使用小写，而且代码也易读
	
	##基本
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
	注意如果 id 包含·. : , [ ] = @·这些 css 表示法，必须用·\\\\·转义，否则获取不了
	比如要获取·id="demo.text"·或·id="demo:text"·，则·$('#demo.text, #demo:text')·应改成·$('#demo\\\\.text, #demo\\\\:text')·
	如果不想使用·\\\\·，也可以自定义加斜杠的方法：
	··
	function jq(id) {
		return '#' + id.replace(¦/(:|\\.|\\[|\\]|,|=|@)/g¦, '\\\\$1')
	}
	··
	使用：·$(jq('some.id'))·
	
	###selector, selectorN
	选择给定选择器的所有元素
	比如·$("div, #demo, .class")·表示选择所有·<div></div>·、·id="demo"·、·class="text"·的元素
	
	##层级
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
	###:not(selector)
	在选择的元素除去给定选择器的元素，selector 可以是任意的选择器
	比如·$('input:not(:checked, :disabled)')·表示选择所有除了已选择和已禁用的 input 元素
	###:has(selector)
	选择匹配的元素的任何后代元素中包含指定 selector 的元素，selector 可以是任意的选择器
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
	
	#操作属性
	##css
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
	###.css(className/classNameArr [, val])
	获取或设置样式属性的计算值
	比如·$('.demo').css('color')·表示返回该元素的颜色值，
	
	&2018.7.27
	`
}