commonData.jsLibrary.jquery.content = `
	#介绍
	jQuery 是 javascript 的一个库，把一些常用的功能和兼容性问题进行了封装，方便使用和提高开发效率。
	一些使用方式：
	··
	// 官网最新版本，压缩版在 .js 前加上 .min 即可
	<script src="https://code.jquery.com/jquery-git.js"></script>

	// 官网指定版本，压缩版在 .js 前加上 .min 即可
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>

	// github 克隆
	git clone git://github.com/jquery/jquery.git

	// npm
	npm install jquery
	··
	更多 CDN：@[CDNJS|https://cdnjs.com/libraries/jquery/]，@[jsDelivr|https://www.jsdelivr.com/package/npm/jquery]，@[Microsoft|https://www.asp.net/ajax/cdn#jQuery_Releases_on_the_CDN_0]，@[Google|https://developers.google.com/speed/libraries/devguide#jquery]
	引入 jQuery 后，就会提供 2 个全局变量：·jQuery·和相等的简写·$·，即·jQuery === $·，所以·jQuery()·和·$()·是一样的。

	#选择器
	使用·$()·可以用来选择 DOM 元素，基本使用 CSS 语法，并做了些扩展
	注意 html 中标签和属性名是不区分大小写的，属性值和 css、js 选择器是区分大小写的，比如·<P Class="Demo">·等同于·<p class="Demo">·，·#Demo·和·#demo·是不同的，但是这种大写行为不应该发生，按照 w3c 标准统一都该使用小写，而且代码也易读
	·$()·选择的元素是 jQuery 对象，所以能使用 jQuery 方法，想要使用原生的元素只需选择对应的下标即可，比如·$('.demo')[0]·

	##基本
	!!
	*：所有元素，比如·$('*')·，包扩 html、head、body 等，·$('#dome *')·表示选择·id="dome"·元素下的所有元素
	element：元素名，比如·$('div')·表示选择所有·div·元素
	.class：样式名，比如·$('.demo')·表示选择所有·class="demo"·的元素
	#id：id 名，比如·$('#demo')·表示选择·id="demo"·的元素，如果有多个相同 id 的元素只返回第一个
	selector, selectorN：多选以·,·分隔，比如·$("div, #demo, .class")·表示选择所有·<div></div>·、·id="demo"·、·class="text"·的元素
	!!
	###$.escapeSelector(selector)
	如果定义的选择器包含·. # , : [ ] = @·，需先用该方法转义，否则获取不了或有歧义，当然也不建议这种选择器符号出现在选择器中
	比如要获取·id="#demo.text"·，则·$('##demo.text')·是无效的，应改成·$('#' + $.escapeSelector('#demo.text'))·
	也可以直接使用斜杠转义：·$('#\\\\#demo\\\\.text')·
	也可以自定义加斜杠的方法：
	··
	function jq(selector) {
		return selector.replace(/[:\\.\\[\\],=@]/g, '\\\\$&')
	}

	$('#' + jq('#demo.text'))
	··

	###html
	可以选择一段 html 以使用 jQuery 的方法
	比如：
	··
	var html = '<div class="demo"><i></i></div>'
	$(html).find('i')	// <i></i>
	··

	##层级
	!!
	parent>child：子元素，比如·$('#demo>.text')·，所有子元素：·$('#demo>')·
	ancestor descendant：后代元素，比如·$('#demo .text')·，所有后代元素：·$('#demo *')·
	prev+next：下一个元素，比如·$('#demo+.text')·，所有紧邻元素：·$('#demo+')·
	prev~siblings：后面的元素，比如·$('#demo~.text')·，所有后面的元素：·$('#demo~')·
	!!

	##属性
	属性值的引号是可选的，即·[attr=value]·和·[attr="value"]·相等
	但要表示多个属性值时就必须用引号了，比如·[attr=val1 val2]·会报错，需加上引号·[attr="val1 val2"]·，而且多个属性值的顺序也是不能变的，比如要获取·class="demo active"·需写成·$('[class="demo active"]')·，写成·$('[class="active demo"]')·是获取不了的
	!!
	[attr]：属性，比如·$('[class]')·
	[attr="value"]：属性 + 值，比如·$('[class="demo"]')·，·$('[class="demo text"]')·
	[attr!="value"]：不包括该属性 + 值，比如·$('[class!="demo"]')·
	[attr*="value"]：含有指定字符串，比如·$('[class*="acti"]')·表示选择含有 acti 字符的类的元素
	[attr~="value"]：含有指定单词，比如·$('[class*="active"]')·表示选择含有 active 类的元素
	[attr^="value"]：以指定字符串开头的属性，比如·$('[class^="text-"]')·表示选择以 text- 开头的类的元素
	[attr$="value"]：以指定字符串结尾的属性，比如·$('[class$="-text"]')·表示选择以 -text 结尾的类的元素
	[attr|="value"]：正好是 value 或以 value- 开头的属性，比如·$('a[hreflang|="en"]')·表示选择·hreflang="en"·或·hreflang="en-UK"·，不会选择·hreflang="english"·
	!!

	##子元素
	!!
	:first-child：第一个，比如·$('ul :first-child')·选择每个 ul 下的第 1 个子元素，注意·$('li:first-child')·若 li 不是第一个子元素则不会匹配
	:last-child：最后一个，和·:first-child·相反
	:first-of-type：第一个，和·:first-child·的区别在于·$('li:first-child')·若 li 不是第一个子元素也可以获取
	:last-of-type：最后一个，和·:first-of-type·相反
	!!
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

	##集合筛选
	!!
	:eq(index)：第 index 个，index 可以为负数表示倒数，比如·$('li:eq(2)')·表示在匹配的 li 元素中选择第 3 个
	:first：第一个，比如·$('li:first')·
	:last：最后一个，比如·$('li:last')·
	:gt(index)：下标大于给定 index 的元素，比如·$('li:gt(2)')·，·$('li:eq(-3)')·表示选择最后 2 个元素，·$('li:eq(-1)')·将不选择任何元素
	:lt()：下标小于给定 index 的元素，和·:gt(index)·相反
	:odd：下标为奇数，即 1 3 5 7 9...，比如·$('li:odd')·
	:even：下标为偶数，即 0 2 4 6 8...，比如·$('li:even')·
	!!

	##内容筛选
	!!
	:not(selector)：除了指定的元素，比如·$('input:not(:checked, :disabled)')·表示选择所有除了已选择和已禁用的 input 元素
	:has(selector)：后代元素中包含指定元素的元素，根据匹配结果的 length 可判断是否包含某元素，比如·$('.demo:has(.text)')·
	:contains(text)：后代元素中包含指定文本的元素，text 可选用引号包裹，比如·$('.demo:contains(哈哈)')·
	:empty：没有子元素的元素，有空格也不行，即空标签，比如·$('.demo:empty')·匹配·<div class="demo"></div>·
	:parent：非空标签，和·:empty·相反
	:hidden：隐藏的元素，包括其隐藏的后代元素，即 display:none、type="hidden"、祖先节点符合以上情况、不渲染的标签（head、style、script 等）
	:visible：未隐藏的元素，和·:hidden·相反
	!!

	##其他筛选
	!!
	:lang(language)：指定语言，比如·$('div:lang(en)')·选择·lang="en"/lang="en-us"·及其后代元素，若后代元素中有非 en 语言将不会被匹配
	:animated：正在执行 jQuery 动画效果，比如某个元素正在执行·fadeToggle()·动画，就能被·$(':animated')·获取到
	:target：id 和当前 hash 值相同的元素，比如页面的网址是·http://example.com/#foo·，那么·$("h1:target")·将匹配·<h1 id="foo">·元素
	:header：所有标题，等同于·$('h1, h2, h3, h4, h4, h6')·
	:root：根元素，等同于·$('html')·
	!!

	##表单筛选
	!!
	:input：表单元素，即·$('input, textarea, select, button')·
	:text：文本类型元素，即·$('[type="text"]')·，但若·<input/>·无 type 属性（默认为 text）则·$('[type="text"]')·获取不到，·:text·可以
	:password：密码类型元素，即·$('[type="password"]')·
	:radio：单选类型元素，即·$('[type="radio"]')·
	:checkbox：多选类型元素，即·$('[type="checkbox"]')·
	:file：文件类型元素，即·$('[type="file"]')·
	:image：图片类型元素，即·$('[type="image"]')·
	:button：按钮类型元素，即·$('button, [type="button"]')·
	:submit：提交类型元素，即·$('[type="submit"]')·
	:reset：重置类型元素，即·$('[type="reset"]')·
	:checked：选中的元素，适用的元素有：checkbox、radio、option
	:selected：选中的元素，只适用于·<option>·元素
	:disabled：禁用的元素，即·$('[disabled]')·
	:enabled：未禁用的元素，即·$(':not([disabled])')·
	:focus：已获取焦点的元素，适用于表单元素和 a 标签
	!!

	#方法选择器
	##筛选
	在匹配的集合中进行筛选
	!!
	.eq(index)：第 index 个，index 可以为负数表示倒数
	.first()：第一个
	.last()：最后一个
	.not(selector/function(index))：除了给定选择器或函数返回值的元素
	!!
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
	.children()：子元素，不包括文字和注释节点
	.contents()：子元素，包扩文本和注释节点，iframe 也可获取（跨域无法访问），比如·$('iframe').contents().find('.demo')·
	!!

	##父元素
	!!
	.parent()：父元素
	.parents()：祖先元素
	.parentsUntil()：祖先元素直到哪里
	!!
	###.parent([selector])
	获取元素的父元素，可以传入一个参数 selector 以筛选获得的父元素
	比如·('p').parent()·表示获取所有 p 元素的父元素，·('p').parent('.active')·表示获取带有 active 类的父元素
	###.parents([selector])
	获取元素的所有祖先元素，可以传入一个参数 selector 以筛选获得的祖先元素
	###.parentsUntil([selector/element] [, selector])
	获取元素的所有祖先元素，直到遇到选择器或某元素停止，结果不包含终点元素
	比如·('p').parentsUntil('body')·表示获取 body 内所有 p 元素的祖先元素
	可以传入第二个参数 selector 以筛选获得的祖先元素
	比如·('p').parentsUntil('body', div)·表示获取 body 内所有 p 元素的 div 标签祖先元素

	##兄弟元素
	!!
	.prev([selector])：前一个，可以传入一个参数 selector 以筛选获得的兄弟元素
	.next([selector])：后一个，和·.prev()·相反
	.prevAll([selector])：前面所有，用法同·.prev()·
	.nextAll([selector])：后面所有，和·.prevAll()·相反
	.siblings([selector])：前后所有，即·.prevAll()·和·.nextAll()·加起来
	.prevUntil([selector/element] [, selector])：前面直到哪里，可以传入第二个参数 selector 以筛选获得的兄弟元素
	.nextUntil([selector/element] [, selector])：后面直到哪里，和·.prevUntil()·相反
	!!

	##查找
	!!
	.find(selector/element)：往下找，在所有子孙元素中找到匹配的元素
	!!
	###.closest(selector/element [, element])
	从内向外从自己开始在所有祖先元素中找到最先匹配的那个元素，可以传入第二个参数以限定范围（原生元素）
	比如·$('ul').closest('div', $('.active')[0])·表示找到 ul 的最近祖先元素中的 div 元素，并且属于 .active 类的子孙元素

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
	$('.demo').data()	// {testA: "hhhh"}
	··
	如果元素上有以·data-·开头的属性，那也会被·.data()·方法使用，·data-·之后的字符串就是 key，值就是 value
	比如：
	··
	<div class="demo" data-demo="demo" data-test-a="hh"></div>

	$('.demo').data()	// {demo: "demo", testA: "hh"}
	$('.demo').data('testA')	// "hh"
	$('.demo').data({'test-a': 'aaa', 'test-b': 'bbbb'})	// 覆盖存储
	$('.demo').data()	// {demo: "demo", testA: "aaa", testB: "bbbb"}
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
	###.width([value/function])
	为匹配的元素集合中获取第一个元素的当前计算宽度值，返回数字，不包括 padding 和 border，设置了·box-sizing: border-box;·也会减去 padding 和 border
	·.css(width)·返回的是带单位的字符串，为样式设置的计算宽度
	可以传入第二个参数以设置宽度，传入数字时单位默认为 px，也可以传入自定义单位的字符串
	或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和 width，返回值作为要设置的宽度
	!!
	.width()：获取宽度，不包括 padding 和 border
	.height()：获取高度，用法同 .width()
	.innerWidth()：获取宽度，包括 padding，不包括 border，用法同上
	.innerHeight()：获取高度，用法同上
	.outerWidth()：获取宽度，包括 padding 和 border，可传入一个 true 表示包括 margin，用法同上
	.outerHeight()：获取高度，用法同上
	!!

	##位置
	###.offset([coordinates/function])
	返回一个对象，包含 left 和 top，坐标相对于文档，即网页左上角
	可以传入 1 个参数以设置 left 和 top，形式如·{left: 100, top: 100}·，使用后该元素将会添加·relative·定位
	或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和 coordinates，返回值作为要设置的宽度
	!!
	.offset()：获取或设置相对于文档的 left 和 top 值
	.offsetParent()：获取离指定元素最近的非 static 定位的祖先元素
	.position()：返回一个对象，包含 left 和 top 值，坐标相对于离指定元素最近的非 static 定位的祖先元素
	.scrollTop([value])：获取或设置相对于顶部滚动的距离，即网页卷去的高度，可以传入 1 个数值以设置这个距离，比如设为 0 表示回到顶部
	.scrollLeft([value])：获取或设置相对于左边滚动的距离，用法同·.scrollTop()·
	!!

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
	###.text([text/function])
	获取或设置匹配元素集合中每个元素的合并文本，包括所有的后代元素
	不传入参数表示获取，传入 1 个参数表示设置内容为传入的参数
	或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和文本内容，返回值作为要设置的文本内容
	比如·$('.demo').text()·
	!!
	.text([text/function])：获取或设置文本
	.html([html/function])：获取或设置 html，用法同·.text()·
	.append(content [, ...content] / function(index, html))：在元素里面的最后添加，比如·$('.demo').append($('i'), '<p></p>')·
	.appendTo(target)：写法和 .append() 相反，比如·$('<p></p>').appendTo('.demo')·
	.prepend(content [, ...content] / function(index, html))：在元素里面的开头添加，用法同·.append()·
	.prependTo(target)：写法和 .prepend() 相反
	!!

	##外部添加
	!!
	.after(content [, ...content] / function(index, html))：在匹配元素的每个元素后面插入参数的内容，作为兄弟节点，参数用法同·.append()·
	.before(content [, ...content] / function(index, html))：在元素前面添加，用法同·.after()·
	.insertAfter(target)：和·.after()·的写法相反，要添加的内容被添加到元素的后面
	.insertBefore(target)：和·.before()·的写法相反，要添加的内容被添加到元素的前面
	!!

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
	!!
	.add()：在已选择的元素中追加指定元素
	.addBack()：在已选择的元素中追加前一个选择的元素
	!!
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
	###.addBack()
	在已选择的元素中追加前一个选择的元素
	比如·$('.demo').nextAll().addBack()·表示选择 .demo 和之后所有的兄弟元素

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

	#遍历
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

	#事件
	##事件绑定
	###.on(events [, selector] [, data], handler(eventObject))
	!!
	events{String}：事件类型，比如·click·点击事件，可选择添加一个或多个命名空间比如·click.demo·、·click.demo.active·，相当于元素的 class，用于指定删除绑定的事件
	selector{String}：触发事件的元素为指定后代元素，即事件代理，常用于变动的后代元素，可选择不填或 null
	data{Anything}：事件被触发时传递给事件处理函数的 event.data，若是 String 类型则需要填写 selector 或为 null，否则会被当做 selector
	handler{Function}：事件触发时执行的函数
	!!
	所有以事件名为方法名的方法都是该事件的快捷写法，比如·.click([data,] handler(eventObject))·等同于·.on('click', [data,] handler(eventObject))·
	快捷写法支持的事件包括：
	!!
	表单：
		blur：失去焦点（事件不支持冒泡）
		change：
	!!

	###.trigger()
	所有以事件名为调用的方法都是该事件的快捷写法，比如·.click()·等同于·.trigger('click')·

	##浏览器
	###.resize([eventData,] handler(eventObject))
	当浏览器窗口的尺寸改变时触发（在某些浏览器如 Opera 只在调整窗口操作结束时被调用），一般用于监听·$(window)·
	!!
	eventData{PlainObject}：一个对象，它包含的数据键值对映射将被传递给事件处理程序。
	handler(eventObject){Function}：事件触发时执行的函数
	!!

	#过渡动画
	##.hide()
	###.hide([duration] [, easing] [, complete])
	隐藏匹配的元素，直接使用·.hide()·没有动画，相当于·.css('display', 'none')·
	!!
	duration{Number/String}[400/normal]：动画持续时间，单位 ms，默认 normal(400)，可选 fast(200)、slow(600)
	easing{String}[swing]：运动曲线，可选 swing（类似 ease）或 linear，其他曲线需要使用插件，比如 @[jQuery Easing Plugin|http://gsgd.co.uk/sandbox/jquery/easing/]
	complete{Function}：动画完成时执行的函数
	!!
	3 个参数都是单独可选的，也表示启用其他默认参数，比如传入一个函数将默认启用了·duration 的 400·和·easing 的 swing·
	动画改变的是：width、height、opacity，直到变成 0，然后设置行内样式·display:none;·
	在开始动画前会将·display·属性值保存在 jQuery 的数据缓存中，如果再次恢复比如使用·.show()·其·display·可以恢复到其初始值
	注意如果原来是·display:inline;·将会在动画的过程中暂时变成·display:inline-block;·，因为这样才能对 width 和 height 做出改变
	###.hide(options)
	也可以传入一个 object ，支持的选项有：
	!!
	duration{Number/String}[400/normal]：动画持续时间，单位 ms，默认 normal(400)，可选 fast(200)、slow(600)
	easing{String}[swing]：运动曲线，可选 swing（类似 ease）或 linear，其他曲线需要使用插件，比如 @[jQuery Easing Plugin|http://gsgd.co.uk/sandbox/jquery/easing/]
	complete{Function}：在动画完成时要执行的函数
	queue{Boolean/String}[true]：是否将动画放置在效果队列中，若设为 false 将立即开始动画，若设为一个字符串则表示为该动画队列加上名称，执行时只是加入队列中，动画不会立即启动，执行该队列需调用·.dequeue('queuename')·才会启动
	specialEasing{Object}：一组一个或多个通过相应的参数和相对简单函数定义的 CSS 属性
	step
	!!

	@@
	jQuery 官方文档|https://jquery.com/
	jQuery 中文文档|https://www.jquery123.com/
	css88 jQuery 文档|https://www.css88.com/jqapi-1.9/
	插件 - jQuery插件库|http://www.jq22.com/
	插件 - jQuery之家|http://www.htmleaf.com/
	@@

	&2018.8.26
`