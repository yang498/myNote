commonData.js.grammar = {
	name: '语法',
	content: `
	#window
	
	##window
	window对象指当前的浏览器窗口，也是所有对象的顶层对象，所有其他对象都是它的下属。JavaScript规定，浏览器环境的所有全局变量，都是window对象的属性
	
	##document
	document对象是文档的根节点，也就是整个网页，window.document属性就指向这个对象
	document.documentElement：html
	3种节点
	元素：nodeType = 1
	属性：nodeType = 2
	文本：nodeType = 3
	其他
	注释：nodeType = 8
	文档：nodeType = 9
	nodeType
	%%
	序号,类型,描述
	,,1,800
	1,Element,元素
	2,Attr,属性
	3,Text,文本
	4,CDATASection,文档中的 CDATA 部分（不会由解析器解析的文本）
	5,EntityReference,实体引用
	6,Entity,实体
	7,ProcessingInstruction,处理指令
	8,Comment,注释
	9,Document,整个文档
	10,DocumentType,向为文档定义的实体提供接口，也就是html的开头&lt;!DOCTYPE html&gt;
	11,DocumentFragment,轻量级的 Document 对象，能够容纳文档的某个部分
	12,Notation,DTD 中声明的符号
	%%
	
	##location
	window.location返回一个location对象，用于获取窗口当前的URL信息。它等同于document.location对象，在iframe中获取也是如此
	··
	window.location === document.location	// true
	··
	
	#宽高位置
	
	##window
	window.innerWidth、window.innerHeight：网页在当前窗口中可见部分的宽高，包括滚动条
	window.outerWidth、window.outerHeight：整个浏览器的宽高
	window.screen.width、window.screen.height：整个屏幕的宽高
	window.screen.availWidth、window.screen.availHeight：整个屏幕可利用的宽高，也就是不包括任务栏
	window.screenTop、window.screenLeft：浏览器窗口距离屏幕顶部和左侧的距离
	
	##element
	el.clientWidth、el.clientHeight：元素可视部分的宽高，包括padding，不包括border和滚动条
	el.clientTop、el.clientLeft：元素border-top和border-left的宽度
	el.offsetWidth、el.offsetHeight：元素可视部分的宽高，包括padding和border和滚动条
	el.offsetTop、el.offsetLeft：元素相对于父级元素的top和left值，该父级元素的css需设置了非static的其他定位，否则是body
	el.scrollWidth、el.scrollHeight：元素的滚动内容宽高，包括padding，不包括border和滚动条，如果是获取body的宽高，若其宽高小于浏览器窗口的宽高则还是按浏览器窗口的宽高
	el.scrollTop、el.scrollLeft：元素被卷去的top和left值，可手动赋值修改
	
	##event
	clientX / clientY：鼠标位置相对于浏览器内容区域左上角的水平垂直偏移量，该参照点会随着滚动条的移动而移动
	pageX / pageY：鼠标位置相对于浏览器内容区域左上角的水平垂直偏移量，不会随着滚动条而变动
	screenX / screenY：鼠标位置相对于屏幕左上角的水平垂直偏移量

	&2018.4.14
	`
}