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
$.escapeSelector(selector)：转义选择器中的关键字·. # , : [ ] = @·
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
:nth-child(index/odd/even/equation)：根据条件选择
:nth-last-child(index/even/odd/equation)：·:nth-child()·的倒数版
:nth-of-type(index/even/odd/equation)：和·:nth-child()·不同的是会忽略其他不同的元素
:nth-last-of-type(index/even/odd/equation)：·:nth-of-type()·的倒数版
:only-child：如果某个元素是其父元素的唯一子元素，那么它就会被选中
:only-of-type：和·:only-child·不同的是会忽略其他不同的元素
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
:gt(index)：下标大于给定 index 的元素，比如·$('li:gt(2)')·
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
.has(selector)：选择含有指定 selector 的元素
$.contains(parent, child)：返回 Boolean 值，判断一个 DOM 元素是否包含另一个 DOM 元素，必须都是原生元素，不支持文本和注释节点
.filter(selector/function(index))：筛选元素
$.grep(array, function(item, index) [, invert])：筛选元素或数组，·invert·默认为·false·，若为·true·将返回和筛选条件相反的元素
.slice(start [, end])：截取元素，包括 start 不包括 end
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
###.slice(start [, end])
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
.closest(selector/element [, element])：和·find()·相反，往上找，可以传入第二个参数以限定范围（原生元素）
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
.hasClass()：是否有 class
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
###.hasClass(className)
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
!!
.width()：获取宽度，不包括 padding 和 border
.height()：获取高度，用法同 .width()
.innerWidth()：获取宽度，包括 padding，不包括 border，用法同上
.innerHeight()：获取高度，用法同上
.outerWidth()：获取宽度，包括 padding 和 border，可传入一个 true 表示包括 margin，用法同上
.outerHeight()：获取高度，用法同上
!!
###.width([value/function])
为匹配的元素集合中获取第一个元素的当前计算宽度值，返回数字，不包括 padding 和 border，设置了·box-sizing: border-box;·也会减去 padding 和 border
·.css(width)·返回的是带单位的字符串，为样式设置的计算宽度
可以传入第二个参数以设置宽度，传入数字时单位默认为 px，也可以传入自定义单位的字符串
或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和 width，返回值作为要设置的宽度

##位置
!!
.offset()：获取或设置相对于文档的 left 和 top 值
.offsetParent()：获取离指定元素最近的非 static 定位的祖先元素
.position()：返回一个对象，包含 left 和 top 值，坐标相对于离指定元素最近的非 static 定位的祖先元素
.scrollTop([value])：获取或设置相对于顶部滚动的距离，即网页卷去的高度，可以传入 1 个数值以设置这个距离，比如设为 0 表示回到顶部
.scrollLeft([value])：获取或设置相对于左边滚动的距离，用法同·.scrollTop()·
!!
###.offset([coordinates/function])
返回一个对象，包含 left 和 top，坐标相对于文档，即网页左上角
可以传入 1 个参数以设置 left 和 top，形式如·{left: 100, top: 100}·，使用后该元素将会添加·relative·定位
或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和 coordinates，返回值作为要设置的宽度

##.get()
###.get(index)
获取元素指定的下标：·.get(index)·
!!
index{Number}：指定获取的元素下标
!!
例如·$('li').get(0)·获取第一个原生元素，其实等同于·$('li')[0]·，好处在于 index 可以设置为复数表示倒数
###.get()
返回一个包含所有匹配元素的原生元素的数组，即把 jQuery 元素转成原生元素

###.toArray()
将 jQuery 元素转成原生元素，以数组的形式返回，等同于·.get()·

###$.makeArray()
·$.makeArray(obj)·：将 jQuery 元素转成原生元素，以数组的形式返回，等同于·.get()·

##.index()
###.index()
查找匹配元素的相对于同级元素的索引值，若匹配元素有多个则取第一个，若没有匹配元素则返回·-1·
###.index(element)
在匹配的元素中查找参数 element，element 可以是 jQuery 元素或原生元素
例如·$('div').index($('.demo'))·表示在所有·div·中查找·div.demo·的索引值，所以索引值以·$('div')·为查找基础，不再是所有同级元素

#DOM 操作
##复制
###.clone([withDataAndEvents] [, deepWithDataAndEvents])
深拷贝指定元素，包括子元素，参数的属性：
!!
withDataAndEvents{Boolean}[false]：该元素是否复制绑定的事件和·.data()·设置的值
deepWithDataAndEvents{Boolean}[withDataAndEvents]：该元素的所有后代元素是否复制绑定的事件和·.data()·设置的值，默认和第一个参数保持一致，即·.clone()·等同于·.clone(false, false)·，·.clone(true)·等同于·.clone(true, true)·
!!
比如·$('.demo').clone().appendTo('.test')·
若元素未经复制就进行添加等操作表示移动该元素
比如·$('.demo').appendTo('.test')·表示·$('.demo')·被移动到·$('.test')·里面的末尾处
注意元素的动态状态也会复制，比如·<input type="text">·输入的值，选中的复选框，出于性能方面的考虑，·<textarea>·输入的值和·<select>·选中的值不会被复制，复制的元素在插入到文档之前可修改该元素

##内部添加
!!
.text([text/function])：获取或设置文本
.html([html/function])：获取或设置 html，用法同·.text()·
.append(content [, ...content] / function(index, html))：在元素里面的最后添加，比如·$('.demo').append($('i'), '<p></p>')·
.appendTo(target)：写法和 .append() 相反，比如·$('<p></p>').appendTo('.demo')·
.prepend(content [, ...content] / function(index, html))：在元素里面的开头添加，用法同·.append()·
.prependTo(target)：写法和 .prepend() 相反
!!
###.text([text/function])
获取或设置匹配元素集合中每个元素的合并文本，包括所有的后代元素
不传入参数表示获取，传入 1 个参数表示设置内容为传入的参数
或者传入一个函数，接受 2 个参数，分别是当前元素的 index 和文本内容，返回值作为要设置的文本内容
比如·$('.demo').text()·

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
.pushStack()：生成新的 jQuery 对象
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

###.pushStack(elements, name, arguments)
生成新的 jQuery 对象，通常用于链式调用中
··
// .demo 删除 class 之后把 p 元素删除，.demo 再添加 class
$('.demo').removeClass('active').pushStack($('p')).remove().end().addClass('active')
··

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
##.each()
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

##$.each()
###$.each(jQueryDOM/array/object, callback(index, item))
和·.each()·类似，不同的是还可以遍历数组和对象

##.map()
###.map(callback(index, domElement))
通过一个函数匹配当前集合中的每个元素，通过返回值生成新的 jQuery 对象
比如：
··
const res = $('input')
    .map((index, item) => $(item).val())
    .get() // 此时返回的仍是一个 jQuery 包装的数组，用 .get() 可转为原生数组
    .join(', ')
$('p').text(res)
··

##$.map()
###$.map(jQueryDOM/array/object, callback(item, index))
和·.map()·类似，不同的是还可以遍历数组和对象，注意回调函数的参数位置相反

#事件
##.on()
绑定事件：·.on(events [, selector] [, data], handler(eventObject))·
!!
events{String}：事件类型，比如·click·点击事件，可选择添加一个或多个命名空间比如·click.demo·、·click.demo.active·，相当于元素的 class
selector{String}：触发事件的元素为指定后代元素，即事件代理，常用于变动的后代元素，可选择不填或 null
data{Anything}：事件被触发时传递给事件处理函数的 event.data，若是 String 类型则需要填写 selector 或为 null，否则会被当做 selector
handler{Function}：事件触发时执行的函数
!!
所有以事件名为方法名的方法都是该事件的快捷写法，注意简写的方式没有事件代理
比如·.click([data,] handler(eventObject))·等同于·.on('click', [data,] handler(eventObject))·
快捷写法支持的事件包括：
!!
鼠标：
    click：左键点击
    contextmenu：右键点击
    dblclick：左键双击
    mousedown：左键或右键按下
    mouseup：左键或右键松开
    mouseover：当指针覆盖元素时（冒泡）
    mouseout：当指针离开元素时（冒泡）
    mouseenter：当指针覆盖元素时（不冒泡）
    mouseleave：当指针离开元素时（不冒泡）
    hover(fn(e), fn(e))：当指针覆盖和离开时，等同于.mouseenter(fn(e)).mouseleave(fn(e))
键盘：
    keydown：按下按键时，如果不抬起来会一直触发（input 和 textarea 元素中）
    keyup：松开按键时（input 和 textarea 元素中）
    keypress：按下按键时，不抬起来也只触发一次，且只有字母、数字、符号键和 enter 键按下能触发（input 和 textarea 元素中）
表单：
    focus：获得焦点（不冒泡），设置 tabindex 属性也可获得焦点
    blur：失去焦点（不冒泡）
    focusin：获得焦点（冒泡）
    focusout：失去焦点（冒泡）
    select：选中完文本时（input 和 textarea 元素中）
    change：元素的值改变的时（input、 textarea 和 select 元素中）
浏览器：
    resize：当浏览器的尺寸改变（在·$(window)·上绑定 ），不同浏览器略有不同，例如 Chrome 是改变时持续调用，Opera 在改变后调用
    scroll：页面滚动时触发（在·$(window)·或滚动容器上绑定），鼠标点击或拖动滚动条、按箭头键、或使用鼠标的滚轮都可能触发
文档加载：
    ready：写法·$(fn)·，当文档准备就绪时（其他写法都已弃用，例如·$(document).on('ready', fn)·，实际上·$(document)·什么也没选择）
    $.holdReady(Boolean)：延迟 ready 事件的触发，在 ready 事件触发前调用，例如先执行·$.holdReady(true)·，即使文档准备就绪也不会触发·$(fn)·，需再执行·$.holdReady(false)·才触发·$(fn)·
!!
·$.holdReady(Boolean)·例如：
··
// 延迟就绪事件，直到已加载插件
$.holdReady(true)
$.getScript('myplugin.js', function () {
    $.holdReady(false)
})
··

##.off()
移除事件：·.off([events] [, selector ] [, handler ])·
!!
events：一个或多个空格分隔的事件类型和可选的命名空间，或只有命名空间，比如·click.demo·、·click.demo.active·，相当于元素的 class
selector：事件代理的元素
handler：要移除的事件方法（一个事件可绑定多个方法）
!!
··
$('#demo').off() // 移除所有事件

$('#demo').off('click') // 移除点击事件

$('#demo').off('.test') // 移除指定命名空间的所有事件

$('#demo').off('click', '*') // 移除所有代理事件

$('#demo').click(f1).click(f2)
$('#demo').off('click', f1) // 仅移除 f1，f2 事件仍触发
··

##.one()
用法同·.on()·，事件只会触发一次

##.trigger()
手动触发事件：·.trigger(event [, extraParameters])·
!!
event{String/$.Event}：事件类型的字符串或 jQuery 的事件对象
extraParameters{Array/Object}：传递给事件函数的参数
!!
通过·.on()·或快捷方式绑定的事件可以用·.trigger()·手动触发
所有以事件名为调用的方法都是该事件的快捷写法，比如·.click()·等同于·.trigger('click')·，trigger 的快捷写法支持的事件同·on()·的支持
··
$('#btn1').click(function (e, a, b) {
    console.log(e, a, b)
})

// 点击 btn2 同时触发 btn1
$('#btn2').click(function () {
    console.log('222')
    $('#btn1').click(['aaa', 'bbb'])
})
··

##.triggerHandler()
用法同·.trigger()·，不同之处有：
!!
triggerHandler 不触发默认事件，例如表单提交 submit
triggerHandler 只触发第一个匹配到的元素，trigger 会触发所有匹配的元素
triggerHandler 触发的函数不冒泡
!!

##事件对象
!!
currentTarget：调用事件的对象，一般情况下等同于 this（前提没有使用箭头函数或改变了 this 的指向）
target：触发事件的元素，可以是元素本身或子元素冒泡触发的子元素，通常同于和 this 比较是否冒泡了
data：传递的参数
type：事件的类型
namespace：当前事件的命名空间
which：键盘和鼠标事件中的键盘码（@[参考对照表|http://www.t086.com/article/4315]）或鼠标码（左键 1，中建 2，右键 3）
result：事件处理程序的最后返回值，例如点击事件绑定了 2 个函数，第一个函数中 return 了一个字符串，第二个函数将可以接收到
relatedTarget：返回事件涉及的元素，例如 mouseover 事件指向是从哪个元素进来的，mouseout 事件指向是离开到最近的那个元素
pageX：鼠标相对于当前文档左侧的距离，包括滚动的距离
pageY：鼠标相对于当前文档顶部的距离，包括滚动的距离
timeStamp：事件触发时距离 1970/1/1 的毫秒数
preventDefault()：阻止默认行为，例如点击 a 标签会跳转到对应的链接，调用此方法后不会跳转
stopPropagation()：阻止事件的冒泡行为
stopImmediatePropagation()：阻止其它的事件执行和冒泡行为，例如点击事件绑定了 2 个函数，第一个函数中使用此方法后将不触发第二个函数
isDefaultPrevented()：返回 Boolean 值，检测·event.preventDefault()·是否被调用过
isPropagationStopped()：返回 Boolean 值，检测·event.stopPropagation()·是否被调用过
isImmediatePropagationStopped()：返回 Boolean 值，检测·event.stopImmediatePropagation()·是否被调用过
!!

#过渡动画
##显示隐藏
!!
.hide()：隐藏元素
.show()：显示元素
.toggle()：如果元素显示就隐藏，隐藏就显示
!!
###.hide()
隐藏元素
直接使用·.hide()·没有动画，相当于·.css('display', 'none')·
注意如果 css 设置了·!important·例如·display: block !important;·将隐藏不了，权重不够

^^传入多个参数：^^·.hide([duration] [, easing] [, complete])·
!!
duration{Number/String}[400/normal]：动画持续时间，单位 ms，默认 normal(400)，可选 fast(200)、slow(600)
easing{String}[swing]：运动曲线，可选 swing（类似 ease）或 linear，其他曲线需要使用插件，比如 @[jQuery Easing Plugin|http://gsgd.co.uk/sandbox/jquery/easing/]
complete{Function}：动画完成时执行的函数
!!
3 个参数都是单独可选的，也表示启用其他默认参数，比如传入一个函数将默认启用了·duration 的 400·和·easing 的 swing·
动画改变的是：width、height、opacity，直到变成 0，然后设置行内样式·display:none;·
在开始动画前会将·display·属性值保存在 jQuery 的数据缓存中，如果再次恢复比如使用·.show()·其·display·可以恢复到其初始值
注意如果原来是·display:inline;·将会在动画的过程中暂时变成·display:inline-block;·，因为这样才能对 width 和 height 做出改变

^^传入一个 Object：^^·.hide(options)·
!!
duration{Number/String}[400/normal]：动画持续时间，单位 ms，默认 normal(400)，可选 fast(200)、slow(600)
easing{String}[swing]：运动曲线，可选 swing（类似 ease）或 linear，其他曲线需要使用插件，比如 @[jQuery Easing Plugin|http://gsgd.co.uk/sandbox/jquery/easing/]
queue{Boolean/String}[true]：是否将动画放置在效果队列中，若设为 false 将立即开始动画，若设为一个字符串则表示为该动画队列加上名称，执行时只是加入队列中，动画不会立即启动，执行该队列需调用·$(selector).dequeue('queuename')·才会启动，例如·$('.demo').animate({width: 200}).hide({queue: true})·表示先改变宽度再隐藏，设为 false 将立即隐藏
specialEasing{Object}：分别为属性定义运动曲线，例如·{ width: 'linear', height: 'swing' }·
step{Function(now, tween)}：每个动画元素的每个动画属性在每帧调用的函数
    now{Number}：当前帧的属性值
    tween{Object}：当前帧的属性
        easing{String}：当前属性应用的运动曲线
        elem{Element}：当前动画的元素
        prop{String}：当前动画的 css 属性名
        start{Number}：当前动画的起始值
        end{Number}：当前动画的目标值
        now{Number}：字面上理解是当前动画的当前值？为何和 end 一样
        pos{Number}：1 ？为何总是 1
        unit{String}：属性单位，默认 px
        options{Object}：其他属性，例如 duration 和 queue
progress{Function(animation, progress, remainingMs)}：每帧动画完成后调用的一个函数
    animation{Object}：当前动画的属性，比如当前动画的元素、duration
    progress{Number}：当前动画的进度，范围 0~1
    remainingMs{Number}：当前动画剩余的时间，单位 ms
complete{Function}：在动画完成时要执行的函数
done{Function(animation, jumpedToEnd)}：在动画完成时要执行的函数（Promise 对象状态已完成）
fail{Function(animation, jumpedToEnd)}：动画失败完成时执行的函数（Promise 对象状态未完成）
always{Function(animation, jumpedToEnd)}：在动画完成或未完成情况下停止时执行的函数（Promise 对象状态已完成或未完成）
!!

###.show()
显示元素，和·.hide()·相反，用法同·.hide()·

###.toggle()
如果元素显示就隐藏，隐藏就显示，用法同·.hide()·，多了一种用法：·.toggle(Boolean)·，传入 true 或 false 来指定显示或隐藏元素

##淡入淡出
!!
.fadeOut()：以改变透明度的形式渐渐隐藏元素，不传参数默认动画时长 400ms，其他参数用法同·.hide()·
.fadeIn()：以改变透明度的形式渐渐显示元素，不传参数默认动画时长 400ms，其他参数用法同·.hide()·
.fadeToggle()：如果元素显示就淡出，隐藏就淡入，不传参数默认动画时长 400ms，其他参数用法同·.hide()·
.fadeTo(duration, opacity [, easing] [, complete])：仅改变元素的透明度
    duration{Number/String}：动画持续时间，单位 ms，可选 normal(400)、fast(200)、slow(600)
    opacity{Number}：目标透明度，范围 0~1
    easing{String}[swing]：运动曲线，可选 swing（类似 ease）或 linear
    complete{Function}：在动画完成时要执行的函数
!!

##滑动
!!
.slideUp()：以改变高度的形式渐渐隐藏元素，不传参数默认动画时长 400ms，其他参数用法同·.hide()·
.slideDown()：以改变高度的形式渐渐显示元素，不传参数默认动画时长 400ms，其他参数用法同·.hide()·
.slideToggle()：如果元素显示就滑动隐藏，隐藏就滑动显示，不传参数默认动画时长 400ms，其他参数用法同·.hide()·
!!

##.animate()
根据设置的 css 属性进行动画，2 种使用方式：
·.animate(properties [, duration] [, easing] [, complete])·
·.animate(properties, options)·
参数·properties{Object}·是要设置的 css 属性和值的键值对，其他参数用法同·.hide()·
用于动画的属性必须是数字的，例如 width、left 可以执行动画，background-color 不能，除非使用 @[jQuery.Color|https://github.com/jquery/jquery-color] 插件，设置的值可以只用数字表示，默认加上 px，也可以定义非样式属性：scrollTop 和 scrollLeft
可以提供一个以 += 或 -= 开始的字符串值，那么目标值就是以这个属性的当前值加上或者减去给定的数字来计算的
··
$('.demo').animate({
    width: 200,
    height: '+=50',
    lateX: 400 // 自定义的值将从 0 开始变化，在 step 方法中使用
}, {
    duration: 1000,
    specialEasing: {
        width: 'linear',
        height: 'swing'
    },
    step: function (now, tween) {
        if (tween.prop == 'lateX') {
            $(this).css('transform', 'translateX(' + now + 'px)')
        }
    },
    progress: function (an, pro, ms) {
        if (pro > 0.5) {
            console.log('动画进行了一半')
        }
    }
})
··

##.stop()
停止当前动画：·.stop([queue] [, clearQueue] [, jumpToEnd])·
!!
queue{String}[false]：指定要停止动画队列的名称
clearQueue{Boolean}[false]：是否取消所有列队动画
jumpToEnd{Boolean}[false]：是否当前动画立即完成
!!
··
$('.demo').animate({width: 600}, 3000).animate({width: 100}, 2000)

// 在 $('.demo') 进行第一个宽度变为 600 的动画中时：
$('.demo').stop() // 停止当前动画，开始执行下一个动画宽变为 100
$('.demo').stop(true) // 停止所有动画，因为把其余等待的动画队列清掉了
$('.demo').stop(false, true) // 立即完成当前动画，即宽立即变为 600，开始执行下一个动画宽变为 100
$('.demo').stop(true, true) // 立即完成当前动画并停止其他动画，因为把其余等待的动画队列清掉了
··
停止动画将不触发动画完成时的回调 complete 和 done，同时将触发 fail 回调

##.queue()
显示或操作动画队列
###.queue([queueName])
!!
queueName{String}[fx]：指定要获取的动画队列的名称
!!
获取动画正在执行时的队列信息，返回一个数组，第一个元素是当前动画·"inprogress"·，其他元素是即将执行的动画函数，通常用来获取还有多少个动画队列
###.queue([queueName], newQueue)
!!
queueName{String}[fx]：指定要获取的动画队列的名称
newQueue{Array}：一个替换当前列队内容的函数数组
!!
替换当前剩余的动画队列
··
$('.demo').queue([]) // 清除动画队列，即当前动画执行完就停止动画
··
###.queue([queueName], callback(next))
!!
queueName{String}[fx]：指定要获取的动画队列的名称
callback{Function}：要添加进队列的函数
!!
在当前动画队列最后执行的函数
··
$('.demo').queue(function () {
    console.log(123) // 当前元素的所有动画执行完毕之后打印 123
    $(this).dequeue() // 继续执行其他队列
})
··

##其他
!!
.finish([queue])：立即完成所有动画
    queue{String}[fx]：指定要完成动画队列的名称
.delay(duration [, queue])：延迟动画
    duration{Number/String}：动画要延迟的时间，单位 ms，可选 fast(200)、slow(600)
    queue{String}[fx]：指定延迟的动画队列的名称
.dequeue([queueName])：执行队列
    queueName{String}[fx]：指定要执行的动画队列的名称
.clearQueue([queueName])：删除所有未执行的动画队列，等同于·.queue([])·
    queueName{String}[fx]：指定要删除的动画队列的名称
$.queue()：·.queue()·的另一种写法，元素作为第一个参数
$.dequeue()：·.dequeue()·的另一种写法，元素作为第一个参数
jQuery.fx.off{Boolean}[false]：全局禁用所有动画，即立即完成动画
jQuery.fx.interval{Number}[13]：（在 v3.0 中已标记为弃用）全局设置动画的频率，单位 ms
!!

#Ajax
##$.ajax()
执行 http 请求：·$.ajax(url [, options])·或·$.ajax([options])·
·options {Object}·：请求参数设置，可以使用·$.ajaxSetup()·设置任何默认参数，可设置的属性如下：
!!
url{String}[当前页面地址]：请求地址
async{Boolean}[true]：是否异步
method{String}[GET]：请求方法（1.9.0 之前的版本需使用 type）
data{Object/Array/String}：携带的数据，会转换成查询字符串（字符串类型不转换），若包含数组如·{a: [1, 2]}·将转换为·a=1&a=2·
processData{Boolean}[true]：是否将 data 转换成查询字符串
dataType{String}[通过 MIME 类型的响应信息来判断]：指定返回的数据类型，可用的类型有：
    text：纯文本字符串
    xml： XML 文档
    html：HTML 文本
    script：执行该脚本并将该脚本以文本形式返回
    json：JSON 格式，如果是不规范的 JSON 格式将报错
    jsonp：跨域请求 JSON 数据，会在请求的 url 最后添加·&callback=jQuery随机数_TIMESTAMP·，并附加查询字符串变量·&_=[TIMESTAMP]·
    多个用空格分割的值：例如将 jsonp 以 text 接受并以 xml 解析使用·jsonp text xml·或简写·jsonp xml·

jsonp{String/Boolean}：在 jsonp 请求中指定·&callback=jQuery随机数_TIMESTAMP·的·callback·为新名称，设为 false 将不添加该 callback
jsonpCallback{String/Function}：在 jsonp 请求中指定·&callback=jQuery随机数_TIMESTAMP·的·jQuery随机数_TIMESTAMP·为新名称
crossDomain{Boolean}[同域为 false， 跨域为 true]：指定是否跨域
contentType{Boolean/String}[application/x-www-form-urlencoded; charset=UTF-8]：声明传递给服务器的数据类型
context：指定回调函数的上下文（下方有举例）
global{Boolean}[true]：是否触发全局 Ajax 事件处理程序
headers{Object}：一个额外的"{键:值}"对映射到请求一起发送，此设置在 beforeSend 函数调用之前被设置
scriptCharset{String}：在请求·script·脚本时设置其·charset·属性
timeout{Number}：设置请求超时时间，单位毫秒

converters{Object}：将返回的原始数据转换为 js 对象，每个转换器的值是一个函数
    默认为·{"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}·
accepts{Object}[取决于 dataType]：dataType 的 MIME 类型，可自定义（下方有举例）
cache{Boolean}[true(dataType 为 script/jsonp 时为 false)]：是否缓存此页面
contents{Object}：一个以"{字符串/正则表达式}"配对的对象，根据给定的内容类型，解析请求的返回结果
ifModified{Boolean}[false]：是否忽略 HTTP 包 Last-Modified 头信息判断，只有上次请求响应改变时，才允许请求成功
isLocal{Boolean}[取决于当前的位置协议]：是否允许当前环境被认定为本地
mimeType{String}：指定一个 MIME 类型来覆盖 XHR 的 MIME 类型
username{String}：用于响应 http 访问认证请求的用户名
password{String}：用于响应 http 访问认证请求的密码
traditional{Boolean}[false]：是否以传统的方式来序列化数据（参考下方 url 序列化中的·$.param()·）
xhr{Function}：默认为·XMLHttpRequest·对象，老版本 IE 为·ActiveXObject·
xhrFields{Object}：以“文件名-文件值”组成的映射，用于设定原生的 XHR对象，也可在跨域请求时用来设置·withCredentials·为·true·

dataFilter{Function(data, type)}：处理请求的原始响应数据的函数，data 是 Ajax 返回的原始数据，type 是 dataType 参数
beforeSend{Function(jqXHR, settings)}：请求发送前的回调函数，可以用来修改请求发送前的 jqXHR，返回 false 将取消这个请求
statusCode{Object}：响应状态码和对应执行的函数（下方有举例）
success{Function(data, textStatus, jqXHR)}：请求成功的回调函数，也可以接受函数组成的数组，每个函数将被依次调用
error{Function(jqXHR, textStatus, errorThrown)}：请求失败的回调函数，也可以接受函数组成的数组，每个函数将被依次调用
complete{Function(jqXHR, textStatus)}：请求完成的回调函数，也可以接受函数组成的数组，每个函数将被依次调用
!!
··
// accepts
$.ajax({
    accepts: {
        mycustomtype: 'application/x-some-custom-type'
    },
    // 补充返回的数据的转换方法
    converters: {
        'text mycustomtype': function(result) {
            // parse code
            return newresult
        }
    },
    dataType: 'mycustomtype'
})

// context
$.ajax({
    url: 'test.html',
    context: document.body,
    success: function () {
        console.log(this) // body 元素
    }
})

// statusCode
$.ajax({
    statusCode: {
        404: function() {
            alert('page not found')
        }
    }
})
··

##全局 Ajax
!!
$.ajaxSetup(options{Object})：配置·$.ajax()·的默认值，参数同·$.ajax()·
$(document).ajaxStart(function)：在请求开始时执行的函数，和·ajaxSend·的区别在于当前进行的所有 ajax 请求只触发一次
$(document).ajaxSend(function (event, jqXHR, ajaxOptions))：在每次请求发送之前执行的函数
$(document).ajaxSuccess(function (event, XMLHttpRequest, ajaxOptions))：在每次请求成功时执行的函数
$(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError))：在每次请求失败时执行的函数
$(document).ajaxComplete(function (event, XMLHttpRequest, ajaxOptions))：在每次请求完成时执行的函数
$(document).ajaxStop(function)：在每次请求完成时执行的函数，和·ajaxComplete·的区别在于当前进行的所有 ajax 请求只触发一次
!!

##快捷方法
!!
$.get()：get 请求
$.getJSON()：获取 json 数据
$.getScript()：获取 script 数据
$.post()：post 请求
.load()：在指定元素中加载 DOM
!!
###$.get()
可使用和·$.ajax()·一样的对象参数，或快捷写法·.get(url [, data] [, success] [, dataType])·，等同于：
··
$.ajax({
    url: url,
    data: data,
    success: success,
    dataType: dataType
})
··
###$.getJSON()
·$.getJSON(url [, data] [, success(data, textStatus, jqXHR)])·，如果 url 包含字符串·callback=?·将被视为·jsonp·请求，等同于：
··
$.ajax({
    dataType: 'json',
    url: url,
    data: data,
    success: success
})
··

###$.getScript()
·$.getScript(url [, success(script, textStatus, jqXHR)])·，等同于：
··
$.ajax({
    dataType: 'script',
    url: url,
    success: success
})
··
###$.post()
可使用和·$.ajax()·一样的对象参数，或快捷写法·$.post(url [, data] [, success] [, dataType])·，等同于：
··
$.ajax({
    method: 'POST',
    url: url,
    data: data,
    success: success,
    dataType: dataType
})
··
###.load()
·.load(url [, data] [, complete(responseText, textStatus, XMLHttpRequest)])·
将请求返回的 HTML 数据插入至匹配的元素中，默认使用·GET·，若·data·参数提供一个对象将使用·POST·，且不支持·jsonp·
在·url·中以空格隔开选择器可选择只加载返回结果中的指定内容
注意若请求的 html 中含有脚本将会被执行，若请求的 url 包含以空格隔开的选择器将不会执行
··
// 给 result 加载内容，若 $('#result') 未获取到元素将不会触发请求
$('#result').load('ajax/test.html')

// 只插入返回结果中的 #container li 部分
$('#result').load('ajax/test.html #container li')
··

##url 序列化
!!
.serialize()：将表单内的元素序列化成 url 查询字符串，形如·a=1&b=2·
.serializeArray()：将表单内的元素序列化成对象数组，形如·[{ name: a, value: 1}, {name: b, value: 2}]·
$.param()：将对象、对象数组、表单元素转换成 url 的查询字符串
!!

###.serialize()
将表单内的元素序列化成 url 查询字符串，形如·a=1&b=2·，表单元素应包含 name 和 value 属性
例如·$('form').serialize()·或·$('input, textarea, select').serialize()·

###.serializeArray()
将表单内的元素序列化成对象数组，形如·[{ name: a, value: 1}, {name: b, value: 2}]·，表单元素应包含 name 和 value 属性
例如·$('form').serializeArray()·或·$('input, textarea, select').serializeArray()·

###$.param()
将对象序列化成 url 的查询字符串：·$.param(obj [, traditional])·
!!
obj{Object/Array/jQuery}：如果是数组应是一个对象数组，形如·[{ name: a, value: 1}, {name: b, value: 2}]·，如果是 jQuery 表单元素如 input 应包含 name 和 value 属性
traditional{Boolean}[false]：是否以传统的方式来序列化数据
!!
注意此方法能力有限，对嵌套的对象或数组可能达不到预期
··
const obj = {
    a: {
        one: 1,
        two: 2,
        three: 3
    },
    b: [1, 2, 3],
    c: 'ss'
}

console.log($.param(obj))
// a%5Bone%5D=1&a%5Btwo%5D=2&a%5Bthree%5D=3&b%5B%5D=1&b%5B%5D=2&b%5B%5D=3&c=ss
// 即 a[one]=1&a[two]=2&a[three]=3&b[]=1&b[]=2&b[]=3&c=ss

console.log($.param(obj, true))
// a=%5Bobject%20Object%5D&b=1&b=2&b=3&c=ss
// 即 a=[object Object]&b=1&b=2&b=3&c=ss
··

#全局对象
##$()
!!
$(selector [, content])：选择元素，或使用第二个参数指定范围，例如·$('span', this)·
$(selector)[index]：获取原生元素，可通过下标获取，和数组一样 index 需·>= 0·，例如·$('li')[0]·
$(selector).length：获取匹配元素的数量
$(element [, ownerDocument])：创建 DOM 元素，或使用第二个参数在指定 document 内创建，例如·$('<div>123</div><p>456</p>')·
$(element [, attributes{Object}])：创建 DOM 元素，并以对象的形式添加属性，例如·$('<div></div>', {class: 'demo'})·
$(callback{Function})：当 DOM 完成加载时执行函数，例如·$(function () {})·
!!

##$.extend()
###$.extend([deep], target [, object1] [, objectN])
将多个对象合并到第一个对象
!!
deep{Boolean}[false]：是否深拷贝（浅拷贝只拷贝第一维，用于一维数组或对象，深拷贝拷贝所有维，用于多维数组和对象）
target{Object}：目标对象
objectN：被合并的对象，如果目标对象和被合并对象有相同的属性，被合并对象将会覆盖目标对象的相同属性
!!
··
let obj = {
    name: 'abc',
    add: 'xyz'
}
let newObj = $.extend({}， obj)
··
###$.extend(object)
将自定义对象合并到 jQuery 对象中
··
$.extend({
    check: function () {
        return this.each(function () { this.checked = true })
    },
    uncheck: function () {
        return this.each(function () { this.checked = false })
    }
})

$('input[type=checkbox]').check()
··
###$.fn.extend()
·$.fn.extend()·是另一种写法，即·$.extend === $.fn.extend·
··
// jQuery 源码
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // 判断是否需要深拷贝
    if ( typeof target === "boolean" ) {
        deep = target;

        // 目标对象改为第二个参数
        target = arguments[ i ] || {};
        i++;
    }

    // 当目标不是个对象或函数时则视为一个空对象
    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
        target = {};
    }

    // 如果只传递一个参数将目标对象当作 jQuery 本身，即表示这是在 jQuery 上扩展新属性
    if ( i === length ) {
        target = this;
        i--;
    }

    // 循环被合并的对象
    for ( ; i < length; i++ ) {

        // options 代表每项，null/undefined 不处理
        if ( ( options = arguments[ i ] ) != null ) {

            // name 代表每项的每个属性
            for ( name in options ) {
                src = target[ name ]; // 目标对象的同属性的属性值
                copy = options[ name ]; // 被合并对象的当前属性值

                // 防止无限循环，当目标对象和被合并对象的属性值相等 ???
                if ( target === copy ) {
                    continue;
                }

                // 如果是深拷贝，并且是个对象或数组则进行递归拷贝，copyIsArray 代表当前是个数组
                if ( deep && copy && ( jQuery.isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];
                        // 当目标对象的当前属性值不是数组或对象时用空数组或空对象代替，因为被合并对象的当前属性值是对象或数组
                    } else {
                        clone = src && jQuery.isPlainObject( src ) ? src : {};
                    }

                    // 递归调用自身拷贝子对象或数组
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // 如果是浅拷贝则直接赋值，值为 undefined 时不合并
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // 返回改变后的目标对象
    return target;
};
··

##$.noConflict()
删除·$·变量：·$.noConflict([removeAll{Boolean}])·，若传入·true·会将·jQuery·变量也删掉，通常用于避免变量冲突
·$.noConflict()·返回 jQuery 对象，可重新定义一个变量代替 $
··
// 用闭包重新使用 $
$.noConflict()
(function ($) {
    // code
})(jQuery)

// 用 _ 代替 $ 和 jQuery
const _ = $.noConflict(true)
··

##工具
!!
$.isArray(obj)：判断是否是数组
$.isPlainObject(obj)：判断是否是对象
$.isEmptyObject(obj)：判断是否是空对象
$.isFunction(obj)：判断是否是函数
$.isNumeric(obj)：判断是否是数字
$.isWindow(obj)：判断是否是·window·对象
$.isXMLDoc(node)：检查一个 DOM 节点是否在 XML 文档中
$.type(obj)：获取参数的数据类型，范围·undefined null boolean number string function array date error symbol regexp object·

$.uniqueSort(array)：去重并排序一个由原生元素组成的数组
$.merge(arr1, arr2)：将第二个数组的内容合并到第一个数组
$.inArray(value, array [, fromIndex])：在数组中查找指定值的索引，没有找到则返回·-1·，类似原生的·.indexOf()·
$.trim(str)：去掉字符串开头和结尾的空白字符
$.parseHTML(data [, context] [, isScripts])：返回一个将字符串解析成原生元素的数组
$.parseXML(data)：将符合格式的字符串转换成 XML 格式
$.proxy(function, context)：接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境
$.globalEval(code)：执行代码，和·eval·的区别是全局执行（在·<head>·中生成·<script>·执行）

$.now()：返回当前时间，等同于·Date.now()·
$.ready：一个异步对象，当文档准备就绪时，它处于 resolves 状态，例如·$.when($.ready, $.ajax()).done(function () { ... })·
$.readyException(error)：定义此方法后，使用·$()·方法抛出错误时，此方法会触发
$.error(message)：抛出异常错误，接收一个字符串转为参数，如果不是字符串会默认转换成字符串
$.noop()：一个空函数，源码就是·noop: function () {}·，在传递空函数的时候可以用一下
.jquery：获取 jQuery 脚本的版本号，返回字符串，例如·'3.2.1'·，使用方式：·$.fn.jquery·或·$().jquery·
!!

##延迟对象
即需要等待一定时间才执行的方法，可使用延迟方法，比如 $.ajax()、动画、setTimeout
!!
deferred.done(function (data, textStatus, jqXHR))：等同于 ajax 的 success
deferred.fail(function (jqXHR, textStatus, errorThrown))：等同于 ajax 的 error
deferred.always(function (data|jqXHR, textStatus, jqXHR|errorThrown))：等同于 ajax 的 complete
deferred.then(function (即 jqXHR.done), function(即 jqXHR.fail))：包含·.done()·和·.fail()·方法
deferred.catch(function (即 jqXHR.fail))：等同于·deferred.then(null, fn)·

deferred.progress(progressCallbacks, progressCallbacks)：当 Deferred（延迟）对象生成正在执行中的进度通知时，调用添加处理程序
    progressCallbacks{Function/Array Function}：当 Deferred（延迟）对象生成正在执行中的进度通知时被调用
    progressCallbacks{Function/Array Function}：附加的函数
deferred.notify(args)：调用 Deferred（延迟）对象上进行中的回调 （progressCallbacks）
    args{Object}：传递参数给进行中的回调
deferred.notifyWith(context [, args])：调用 Deferred（延迟）对象上进行中的回调（progressCallbacks）
    context{Object}：Context（上下文） 作为 this 对象传递给进行中的回调（progressCallbacks）
    args{Array}：一个可选的参数数组传递给进行中的回调（progressCallbacks）
deferred.resolve(args)：调用成功的回调函数，参数同 notify
deferred.resolveWith(context [, args])：调用成功的回调函数，参数同 notifyWith
deferred.reject(args)：调用失败的回调函数，参数同 notify
deferred.rejectWith(context [, args])：调用失败的回调函数，参数同 notifyWith
deferred.state()：返回一个字符串，表示 Deferred（延迟）对象的当前状态，可能的值有 pending、resolved、rejected

deferred.promise()：返回 Deferred（延迟）的 Promise（承诺）对象
.promise([type] [, target])：为 DOM 绑定延迟对象，通常用于动画中
    type{String}[fx]：需要待观察队列类型
    target{Object}[fx]：将要绑定 promise 方法的对象
$.when()：可让零到多个延迟对象执行延迟方法
!!
###deferred.promise()
··
const obj = {
    hello: function (name) {
        alert('Hello' + name )
    }
}
const defer = $.Deferred() // 创建延时对象

defer.promise(obj) // 创建 promise
defer.resolve('John') // 调用成功

obj.done(function(name) {
    obj.hello(name) // 先 John
}).hello('Karl') // 后 Karl
··

###.promise()
··
// 当前所有动画完成后触发 done
$('div').each(function(i) {
    $(this).fadeIn().fadeOut(1000 * (i+1))
}).promise().done(function () {
    console.log('finfsh!')
})
··
###$.when()
使用·$.when(deferreds)·可让零到多个延迟对象执行延迟方法
当延迟对象都被解决（resolved）将触发成功的回调，任意一个被拒绝（rejected）将触发失败的回调
··
// 都请求成功触发 successFn，任意一个失败触发 failFn
$.when($.ajax('/page1'), $.ajax('/page2'))
    .then(successFn, failFn)
··

##回调对象
管理回调函数列表
!!
$.Callbacks(flags)：创建回调对象
    flags：回调对象的配置，以空格隔开的字符串，支持的参数有：
        once：回调列表只执行第一次，即只执行第一个·fire()·
        memory：将添加到这个列表的后面的最新的回调立即执行
        unique：不添加重复的回调
        stopOnFalse：当一个回调返回·false·时中断调用
callbacks.add(callbacks)：添加一个函数或数组函数到回调列表
callbacks.fire(arguments)：传入一个参数并调用所有回调函数
callbacks.fireWith([context] [, args])：传入一个上下文（·this·）和一个参数并调用所有回调函数
callbacks.fired()：返回一个 Boolean 值，判断回调是否至少被调用过一次
callbacks.has(callback)：返回一个 Boolean 值，传入一个参数回调，判断回调列表中是否有该回调
callbacks.disable()：禁止调用回调
callbacks.lock()：锁定回调列表的当前状态，和·disable·的区别在于·memory·状态下会触发新添加的回调，·disable·不会
callbacks.locked()：返回一个 Boolean 值，判断回调列表是否已被锁定
callbacks.remove(callbacks)：在回调列表中删除一个函数或数组函数
callbacks.empty()：删除所有回调
!!
··
const foo = str => console.log(str)
const bar = str => foo('bar: ' + str)
const callbacks = $.Callbacks() // 创建回调对象

callbacks.add(foo) // 添加 foo
callbacks.fire('foo') // foo

callbacks.add(bar) // 添加 bar
callbacks.fire('foo')
// foo
// bar: foo

callbacks.remove(bar)
callbacks.fire('foo') // foo
··

@@
jQuery 官方文档|https://jquery.com/
jQuery 中文文档|https://www.jquery123.com/
HTML 中文网 jQuery 文档|https://www.css88.com/jqapi-1.9/
插件 - jQuery插件库|http://www.jq22.com/
插件 - jQuery之家|http://www.htmleaf.com/
@@

&2019/3/28
`