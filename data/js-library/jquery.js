commonData.jsLibrary.jquery = {
	content: `
	#介绍
	jQuery 是 javascript 的一个库，把常用的一些功能和兼容性问题进行了封装，方便使用和提高开发效率。
	引入 jQuery 后，就会提供2个全局变量·jQuery·和相等的简写·$·，即·jQuery()·和·$()·是一样的。
	
	#选择器
	jQuery 使用 CSS 语法来选择元素
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
	
	###selector,selectorN
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
	
	##属性,=后面为空呢
	###[attr]
	选择所有含有 attr 属性的元素
	比如·$('[class]')·
	###[attr="value"]
	选择所有含有 attr="value" 指定属性值的元素，注意属性值是所有属性
	比如·$('[class="demo"]')·，如果·class="demo text"·则是·$('[class="demo text"]')·才能匹配
	###[attr*="value"]
	选择所有含有指定字符串的属性的元素
	比如·$('[class*="acti"]')·表示选择含有 acti 字符的类的元素
	###[attr~="value"]
	选择所有含有指定子属性的元素，可以理解为单词选择器
	比如·$('[class*="active"]')·表示选择含有 active 类的元素
	###[attr^="value"]
	选择所有含有指定字符串开头的属性的元素
	比如·$('[class^="acti"]')·表示选择含有 active 类的元素
	
	&2018.7.25
	`
}