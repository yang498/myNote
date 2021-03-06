<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# jQuery

本文档记录版本·v3.2.1·

## 概述

jQuery 就是把 javascript 一些常用的功能和兼容性问题进行了封装
引入 jQuery 会提供 2 个全局变量：·jQuery·，和简写·$·
链接引入：

··html
<script src="https://unpkg.com/jquery@3.2.1/dist/jquery.js">&lt;/script>
<script src="https://unpkg.com/jquery@3.2.1/dist/jquery.min.js">&lt;/script>
··

npm 安装：

··bash
npm i jquery
··

## css 选择器

使用·$()·可以用来选择 DOM 元素，用法和 CSS 类似，并做了些扩展

### 基本

!!
*：所有元素
element：元素名
.class：样式名
#id：id 名，如果有多个相同 id 的元素只返回第一个
selector, selectorN：多选
$.escapeSelector(selector)：转义选择器中的关键字·. # , : [ ] = @·
!!

#### $.escapeSelector(selector)

例如获取·id="#demo.text"·，则·$('##demo.text')·是无效的，应改成·$('#' + $.escapeSelector('#demo.text'))·
也可以直接使用斜杠转义：·$('#\\\\#demo\\\\.text')·，或自定义加斜杠：

··js
function jq (selector) {
    return selector.replace(/[:\\.\\[\\],=@]/g, '\\\\$&')
}
$('#' + jq('#demo.text'))
··

### 层级

!!
parent > child：子元素，所有子元素为·parent >·
ancestor descendant：后代元素，所有后代元素为·ancestor *·
prev + next：下一个指定元素，所有紧邻元素为·prev +·
prev ~ siblings：后面所有指定的元素，后面所有的元素为·prev ~·
!!

### 属性

单个属性值的引号是可选的，即·[attr=value]·和·[attr="value"]·相等
多个属性值时就必须用引号了，比如·[attr=val1 val2]·会报错，需加上引号·[attr="val1 val2"]·
且多个属性值的顺序也是不能变的，即匹配的是整个字符串

!!
\\[attr]：指定属性，如·$('[class]')·
\\[attr="value"]：属性只等于该值，如·$('[class="demo"]')·
\\[attr!="value"]：属性不等于该值，如·$('[class!="demo"]')·
\\[attr*="value"]：含有指定字符串，如·$('[class*="acti"]')·
\\[attr~="value"]：含有指定单词，如·$('[class*="active"]')·
\\[attr^="value"]：以指定字符串开头的属性，如·$('[class^="text-"]')·
\\[attr$="value"]：以指定字符串结尾的属性，如·$('[class$="-text"]')·
\\[attr|="value"]：正好是·value·或以·value-·开头的属性
    如·$('a[hreflang|="en"]')·选择·hreflang="en"·或·hreflang="en-UK"·，不会选择·hreflang="english"·
!!

### 子元素

!!
:first-child：第一个，如·$('li:first-child')·
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

#### :nth-child(index/odd/even/equation)

·index·从 1 开始且不能为负数，可以是字符串·odd·奇数或·even·偶数，也可以是 n 倍如·4n·

··html
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

<script>
    $('li:nth-child(1)')    // A （必须是父元素的第一个子元素，所以没有 E）
    $('li:nth-child(2)')    // B E
    $('li:nth-child(odd)')  // A C F H
    $('li:nth-child(even)') // B D E G
    $('li:nth-child(4n)')   // D G
&lt;/script>
··

### 集合筛选

!!
:eq(index)：第·index·个，·index·可以为负数表示倒数，如·$('li:eq(2)')·表示在所有的·li·元素中选择第 3 个
:first：第一个，比如·$('li:first')·
:last：最后一个，比如·$('li:last')·
:gt(index)：下标大于给定·index·的元素，比如·$('li:gt(2)')·
:lt(index)：下标小于给定·index·的元素，和·:gt(index)·相反
:odd：下标为奇数，即 1 3 5 7 9...，比如·$('li:odd')·
:even：下标为偶数，即 0 2 4 6 8...，比如·$('li:even')·
!!

### 内容筛选

!!
:not(selector)：除了指定的元素
:has(selector)：后代元素中包含指定元素的元素，根据匹配结果的·length·可判断是否包含某元素
:contains(text)：后代元素中包含指定文本的元素，·text·可加可不加引号
:empty：没有子元素的元素，有空格也不行，即空标签
:parent：非空标签，和·:empty·相反
:hidden：隐藏的元素，包括其隐藏的后代元素，即·display:none·、·type="hidden"·、·head style script·等
:visible：未隐藏的元素，和·:hidden·相反
!!

### 其他筛选

!!
:lang(language)：指定语言，如·$(':lang(en)')·选择·lang="en"/lang="en-us"·
:animated：正在执行 jQuery 动画的元素，如正在执行·fadeToggle()·动画，就能被·$(':animated')·获取到
:target：·id·和当前·hash·值相同的元素，如网址是·xxx.com/#foo·，则·$(":target")·将匹配·<h1 id="foo">·
:header：所有标题，即·$('h1, h2, h3, h4, h4, h6')·
:root：根元素，即·$('html')·
!!

### 表单筛选

!!
:input：表单元素，即·$('input, textarea, select, button')·
:text：文本类型元素，若·<input/>·无 type 属性（默认为 text）则·$('[type="text"]')·获取不到，而·:text·可以
:password：密码类型元素，即·$('[type="password"]')·
:radio：单选类型元素，即·$('[type="radio"]')·
:checkbox：多选类型元素，即·$('[type="checkbox"]')·
:file：文件类型元素，即·$('[type="file"]')·
:image：图片类型元素，即·$('[type="image"]')·
:button：按钮类型元素，即·$('button, [type="button"]')·
:submit：提交类型元素，即·$('[type="submit"]')·
:reset：重置类型元素，即·$('[type="reset"]')·
:checked：选中的元素，适用·<checkbox> <radio> <option>·
:selected：选中的元素，适用·<option>·
:disabled：禁用的元素，即·$('[disabled]')·
:enabled：未禁用的元素，即·$(':not([disabled])')·
:focus：已获取焦点的元素，适用于表单元素和·a·标签
!!

## 方法选择器

### 筛选

!!
.eq(index)：第 index 个，index 可以为负数表示倒数
.first()：第一个
.last()：最后一个
.not(selector/function(index))：除了给定选择器或函数返回值的元素
.has(selector)：后代元素中包含指定·selector·的元素，根据匹配结果的length可判断是否包含某元素
$.contains(parent, child)：判断一个元素是否包含另一个元素，必须都是原生元素，不支持文本和注释节点
.filter(selector/function(index))：筛选出指定元素，可以是选择器或函数，函数的用法同数组的·filter·
$.grep(array, function(item, index) [, invert])：筛选元素或数组
    ·invert·默认为·false·，若为·true·将返回和筛选条件相反的元素
.slice(start [, end])：截取指定下标内的元素，用法同数组的·slice·
!!


### 子元素

!!
.children()：子元素，不包括文字和注释节点
.contents()：子元素，包扩文本和注释节点，·<iframe>·内的元素也可获取（跨域无法访问）
!!

### 父元素

!!
.parent([selector])：父级元素，可以传入一个参数 selector 以筛选获得的父元素
.parents([selector])：所有祖先元素，可以传入一个参数 selector 以筛选获得的父元素
.parentsUntil([selector/element] [, selector])：所有祖先元素直到第一个参数为止，第二个参数可以进行筛选
!!

### 兄弟元素

!!
.prev([selector])：前一个，可以传入一个参数 selector 以筛选获得的兄弟元素
.next([selector])：后一个，和·.prev()·相反
.prevAll([selector])：前面所有，用法同·.prev()·
.nextAll([selector])：后面所有，和·.prevAll()·相反
.siblings([selector])：前后所有，即·.prevAll()·和·.nextAll()·加起来
.prevUntil([selector/element] [, selector])：前面直到哪里，可以传入第二个参数进行筛选
.nextUntil([selector/element] [, selector])：后面直到哪里，和·.prevUntil()·相反
!!

### 查找

!!
.find(selector/element)：往下找，在所有子孙元素中找到匹配的元素
.closest(selector/element [, element])：往上找，可以传入第二个参数限定范围（原生元素）
!!

### 判断

!!
.is(selector/function(index))：判断若能根据选择器至少找到 1 个则返回·true·，否则·false·
    可以传入一个函数，返回的 Boolean 值直接作为结果
!!

## DOM 属性

### css

!!
.addClass(class/fn(index, class))：添加 class，多个样式名以空格隔开
.removeClass(class/fn(index, class))：删除 class，多个样式名以空格隔开，没有参数将全部移除
.toggleClass(class/fn(index, class) [, state])：切换 class，多个样式名以空格隔开，没有参数将全部切换
    state [Boolean]：指定是添加还是删除样式
.hasClass(class)：是否含有 class，可以传入·''·判断有没有类名
.css()：获取或设置样式
$.cssHooks：扩展·.css()·
$.cssNumber：在用·.css()·设置数值时哪些属性不用加 px，例如·$.cssNumber.left = true·
!!

#### .css(className/classNameArr [, value/function])

获取或设置样式，2 个单词以上的属性名可以使用连字符或驼峰法，如·background-color·和·backgroundColor·

··js
// 获取属性值
$('.demo').css('color')
// 获取多个属性值，返回属性名和属性值组成的对象
$('.demo').css(['color', 'background-color', 'font-size'])

// 设置属性值
$('.demo').css('color', '#f00')
// 设置多个属性值
$('.demo').css({
    'color': '#f00',
    'font-size': '20px'
})

// 若设置的值为数字，将会转换为字符串并添加 px
$('.demo').css('width', 50)
// 只有部分值支持设置字符串数字补全 px，具体可打印 $.cssHooks 查看，一般带 set 的有字符串补全
$('.demo').css('left', '50') // left: ''
$.cssHooks.left = {
    get: $.cssHooks.left.get,
    set: function (el, value) {
        el.style.left = /^\\d+$/.test(value) ? value + 'px' : value
    }
}
$('div').css('left', '50') // left: '50px'

// 若设置的值为空字符串，如果行内 style 中有这个属性将会移除
$('.demo').css('color', '')
// 设置相对值可使用以 += 或者 -= 开头的字符串，即在原来的基础上进行增减
$('.demo').css('padding-left', '+=20')
// 设置一个函数，返回值即为要设置的值
$('.demo').css('width', function (index, style) {
    return '100px'
})
··

### 属性

!!
.val([value/function])：获取或设置 value 值
.attr(name [, value/function])：获取或设置属性值，若设置多个值可传入对象，用法同·.css()·
.removeAttr(name)：删除属性值，多个属性可使用空格隔开
.prop()：获取或设置 Boolean 值的属性，如·disabled, checked·，用法同·.attr()·
.removeProp()：删除属性值，多个属性可使用空格隔开
    注意删除原生的属性如·disabled·将完全移除该属性，不能再次被添加到元素上
!!

### 数据

!!
.data([key] [, value])：在元素上读取或存储以·data-·开头的属性数据
.removeData([name])：删除数据，不传入参数表示全部删除，删除多个可传入以空格隔开的字符串或字符串数组
$.data()：.data() 的另一种写法，原生元素作为第一个参数
$.removeData()：.removeData() 的另一种写法，原生元素作为第一个参数
$.hasData()：判断元素是否有 .data() 绑定的数据，原生元素作为参数
!!

#### .data([key] [, value])

··js
$('.demo').data('test-a', 'hhhh')   // 存储
$('.demo').data()   // {testA: "hhhh"}

// <div class="demo" data-demo="demo" data-test-a="hh"></div>
$('.demo').data()   // {demo: "demo", testA: "hh"}
$('.demo').data('testA')    // "hh"
$('.demo').data({'test-a': 'aaa', 'test-b': 'bbbb'})
$('.demo').data()   // {demo: "demo", testA: "aaa", testB: "bbbb"}
··

### 尺寸

!!
.width([value/fn])：获取或设置宽度，不包括·padding border·
.height([value/fn])：获取或设置高度，用法同·.width()·
.innerWidth([value/fn])：获取或设置宽度，包括·padding·，不包括·border·，用法同上
.innerHeight([value/fn])：获取或设置高度，用法同上
.outerWidth([value/fn])：获取或设置宽度，包括·padding border·，可传入·true·表示包括·margin·，用法同上
.outerHeight([value/fn])：获取或设置高度，用法同上
!!

### 位置

!!
.offset([obj/fn])：获取或设置相对于文档的·left top·
.offsetParent()：获取离指定元素最近的非·static·定位的祖先元素
.position()：返回一个对象，包含·left top·，坐标相对于离指定元素最近的非 static 定位的祖先元素
.scrollTop([value])：获取或设置·scrollTop·，可传入数值以设置这个距离，例如设为 0 表示回到顶部
.scrollLeft([value])：获取或设置·scrollLeft·，用法同·.scrollTop()·
!!

### 索引

!!
.index([el])：不传入参数表示获取元素在所有同级元素中的位置，若元素有多个则取第一个，若没有匹配元素返回·-1·
    传入一个元素表示在匹配的元素中查找参数位置，如·$('div').index($('.demo'))·，相当于数组的·indexOf()·
!!

### 获取原生元素

·$()·选择的是 jQuery 封装过的对象，像数组一样选择对应的下标即可获取原生元素，例如·$('.demo')[0]·

!!
.get([index])：获取指定下标的原生元素，·index·可以设置为负数表示倒数
    若不传入参数·.get()·则获取所有原生元素组成的数组，即把 jQuery 元素转成原生元素
.toArray()：等同于·.get()·
$.makeArray($el)：等同于·.get()·
!!

## DOM 操作

### 复制

!!
.clone([dataEvent] [, deep])：拷贝指定元素，包括子元素
dataEvent {Boolean} [false]：是否将事件和·data-·属性也拷贝
deep {Boolean} [dataEvent]：是否所有后代元素也将事件和·data-·属性拷贝，默认和第一个参数保持一致
!!

··js
$('.demo').clone().appendTo('.test')

// 若元素未经复制就进行添加等操作表示移动该元素
$('.demo').appendTo('.test') // $('.demo')被移动到$('.test')内部的末尾处
··

### 内部添加

!!
.text([text/fn])：获取或设置文本
.html([html/fn])：获取或设置 html
.append(...content/fn)：在元素里面的最后添加，例如·$('.demo').append($('i'), '<p></p>')·
.appendTo(target)：写法和·.append()·相反，例如·$('<p></p>').appendTo('.demo')·
.prepend(...content/fn)：在元素里面的开头添加，用法同·.append()·
.prependTo(target)：写法和·.prepend()·相反
!!

### 外部添加

!!
.after(...content/fn)：在匹配元素的后面添加参数（作为兄弟节点），参数用法同·.append()·
.before(...content/fn)：在元素前面添加，用法同·.after()·
.insertAfter(target)：和·.after()·的写法相反，要添加的内容被添加到元素的后面
.insertBefore(target)：和·.before()·的写法相反，要添加的内容被添加到元素的前面
!!

### 外部包裹

!!
.wrap(el/fn)：为每个元素添加父元素，传入多个元素只使用第一个，传入多层元素保留只使用最里面的第一个子元素
.wrapAll(el/fn)：为所有的元素添加一个父元素，若中间有其他元素会被排除，多个元素或多层元素效果同·.wrap()·
.wrapInner(el/fn)：为每个元素的内部添加父元素，多个元素或多层元素效果同·.wrap()·
.unwrap([selector])：为每个元素删除父元素，和 .wrap() 相反，可传入选择器在筛选哪些元素的父元素应该被删除
!!

### 删除

!!
.remove([selector])：删除元素和其后代，包括绑定的事件和·.data()·绑定的数据，可传入选择器筛选哪些被删除
.detach()：删除元素和其后代，保留绑定的事件和·.data()·绑定的数据，适用于把元素删除之后再添加到页面中
.empty()：删除元素的后代，即把元素变成空标签
!!

### 替换

!!
.replaceWith(newContent/function)：将元素替换成指定元素
.replaceAll(target)：和·.replaceWith()·写法相反，指定元素把目标元素替换
!!

## DOM 状态

### 追加

!!
.add(selector/html [, context])：在已选择的元素中追加指定元素，可选择第二个参数筛选要追加的元素
.addBack()：在已选择的元素中追加前一个选择的元素，如·$('.demo').nextAll().addBack()·
.pushStack(el, name, args)：生成新的 jQuery 对象，常用于链式调用中
!!

### 回退

!!
.end()：返回元素的上一次状态，通常用于链式调用中
!!

### DOM 遍历

!!
.each(function(index, item))：循环元素并执行函数，·this·即当前原生元素，使用·return false·可结束循环
$.each(jQueryDOM/array/object, function(index, item))：和·.each()·类似，还可以遍历数组和对象
.map(function(index, item))：在函数内部返回新的值以生成新的 jQuery 对象
$.map(jQueryDOM/array/object, function(item, index))：和·.map()·类似，，还可以遍历数组和对象
!!

## 事件

### .on()

绑定事件：·.on(events [, selector] [, data], handler(eventObject))·

!!
events {String}：事件类型，可添加一个或多个命名空间例如·click.demo·，相当于元素的 class
selector {String}：触发事件的元素为指定后代元素，即事件代理，常用于变动的后代元素，可选择不填或填写·null·
data：事件触发时传递给回调函数的·event.data·，若是字符串类型则必须传入·selector·，不然会被当做·selector·
handler {Function}：事件触发时执行的函数
!!
所有以事件名为方法名的方法都是该事件的快捷写法，注意简写的方式没有事件代理
例如·.click([data,] handler(eventObject))·等同于·.on('click', [data,] handler(eventObject))·
快捷写法支持的事件包括：
!!
**鼠标**
    click：左键点击
    contextmenu：右键点击
    dblclick：左键双击
    mousedown：左键或右键按下
    mouseup：左键或右键松开
    mouseover：当指针覆盖元素时（冒泡）
    mouseout：当指针离开元素时（冒泡）
    mouseenter：当指针覆盖元素时（不冒泡）
    mouseleave：当指针离开元素时（不冒泡）
    hover(fn(e), fn(e))：当指针覆盖和离开时，等同于·.mouseenter(fn(e)).mouseleave(fn(e))·

**键盘**
    keydown：按下按键时，如果不抬起来会一直触发（·<input>·和·<textarea>·元素中）
    keyup：松开按键时（·<input>·和·<textarea>·元素中）
    keypress：按下按键时，不抬起来也只触发一次（·<input>·和·<textarea>·元素中）

**表单**
    focus：获得焦点（不冒泡），设置 tabindex 属性也可获得焦点
    blur：失去焦点（不冒泡）
    focusin：获得焦点（冒泡）
    focusout：失去焦点（冒泡）
    select：选中完文本时（·<input>·和·<textarea>·元素中）
    change：元素的值改变的时

**浏览器**
    scroll：页面滚动时触发（在·$(window)·或滚动容器上绑定）
    resize：当浏览器的尺寸改变（在·$(window)·上绑定 ）
        不同浏览器略有不同，例如 Chrome 是改变时持续调用，Opera 在改变后调用

**文档加载**
    ready：写法·$(fn)·，当文档准备就绪时
        其他写法都已弃用，例如·$(document).on('ready', fn)·，实际上·$(document)·什么也没选择
    $.holdReady(Boolean)：是否不触发·ready·事件，即用来延迟·ready·事件
        例如先执行·$.holdReady(true)·，后续不会触发·$(fn)·，需再执行·$.holdReady(false)·才触发·$(fn)·
!!

### .off()

移除事件：·.off([events] [, selector ] [, handler ])·

!!
events：一个或多个空格分隔的事件类型和可选的命名空间，或只有命名空间
selector：事件代理的元素
handler：要移除的事件方法（一个事件可绑定多个方法）
!!

### .one()

用法同·.on()·，事件只会触发一次

### .trigger()

手动触发事件：·.trigger(event [, extraParameters])·
通过·.on()·或快捷方式绑定的事件可以用·.trigger()·手动触发
以事件名为调用的方法都是该事件的快捷写法，例如·.click()·等同于·.trigger('click')·

!!
event {String/$.Event}：事件类型的字符串或 jQuery 的事件对象
extraParameters {Array/Object}：传递给事件函数的参数
!!

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

### .triggerHandler()

用法同·.trigger()·，不同之处有：

!!
·triggerHandler·不触发默认事件，例如表单提交·submit·
·triggerHandler·只触发第一个匹配到的元素，·trigger·会触发所有匹配的元素
·triggerHandler·触发的函数不冒泡
!!

### 事件对象

注意，jQuery 的事件对象重定义过，所以一些特殊属性例如拖拽事件产生的·e.dataTransfer·属性是没有的，需改回原生事件监听

!!
currentTarget：调用事件的对象，一般情况下等同于·this·（前提没有使用箭头函数或改变了·this·的指向）
target：触发事件的元素，可以是元素本身或子元素冒泡触发的子元素，通常同于和·this·比较是否冒泡了
data：传递的参数
type：事件的类型
namespace：当前事件的命名空间
which：键盘和鼠标事件中的键盘码（[参考对照表](http://www.t086.com/article/4315)）或鼠标码（左键 1，中建 2，右键 3）
result：事件的返回值，例如事件绑定了 2 个函数，第一个函数中返回了一个字符串，第二个函数将可以接收到
relatedTarget：事件涉及的元素，例如·mouseover·是从哪个元素进来的，·mouseout·是离开到最近的那个元素
pageX：鼠标相对于当前文档左侧的距离，包括滚动的距离
pageY：鼠标相对于当前文档顶部的距离，包括滚动的距离
timeStamp：事件触发时的时间戳

preventDefault()：阻止默认行为，例如点击·<a>·会跳转到对应的链接，调用此方法后不会跳转
stopPropagation()：阻止事件的冒泡行为
stopImmediatePropagation()：阻止其它的事件执行和冒泡行为，例如事件绑定了 2 个函数将只触发第一个
isDefaultPrevented()：返回 Boolean 值，检测·event.preventDefault()·是否被调用过
isPropagationStopped()：返回 Boolean 值，检测·event.stopPropagation()·是否被调用过
isImmediatePropagationStopped()：返回 Boolean 值，检测·event.stopImmediatePropagation()·是否被调用过
!!

## 过渡动画

### 显示隐藏

!!
.hide()：隐藏元素
.show()：显示元素，和·.hide()·相反，用法同·.hide()·
.toggle()：如果元素显示就隐藏，隐藏就显示，用法同·.hide()·，多了可传入一个 Boolean 值指定显示或隐藏元素
!!

#### .hide()

隐藏元素，直接使用·.hide()·没有动画，相当于·.css('display', 'none')·

**传入多个参数：**·.hide([duration] [, easing] [, complete])·

!!
duration {Number/String} [400]：动画持续时间，单位 ms，可填字符串·normal(400) fast(200) slow(600)·
easing {String} [swing]：运动曲线，可选·swing·(类似·ease·) 或·linear·，其他需使用插件如 [jQuery Easing](http://gsgd.co.uk/sandbox/jquery/easing/)
complete {Function}：动画完成时执行的函数
!!

3 个参数都是单独可选的，但传入一个参数也表示启用其他默认参数，例如传入函数将默认启用了·duration·和·easing·
动画改变的是：·width height opacity· 直到 0，然后设置·display:none;·
如果是·display:inline;·的元素将会在动画中暂时变成·display:inline-block;·，因为这样才能改变·width height·

**传入一个 Object：**·.hide(options)·

!!
duration {Number/String} [400]：动画持续时间，同上
easing {String} [swing]：运动曲线，同上
queue {Boolean/String} [true]：是否将动画放置在效果队列中
    设为·true/false·将立即开始动画
    设为字符串表示为该动画队列加上名称，动画不会启动，需调用·.dequeue('queuename')·才会启动
specialEasing {Object}：分别为属性定义运动曲线，例如·{ width: 'linear', height: 'swing' }·
step {Function(now, tween)}：每个动画元素的每个动画属性在每帧调用的函数
    now {Number}：当前帧的属性值
    tween {Object}：当前帧的属性
        easing {String}：当前属性应用的运动曲线
        elem {Element}：当前动画的元素
        prop {String}：当前动画的 css 属性名
        start {Number}：当前动画的起始值
        end {Number}：当前动画的目标值
        now {Number}：当前动画的当前值
        pos {Number}：1
        unit {String}：属性单位
        options {Object}：其他属性，例如·duration·和·queue·
progress {Function(animation, progress, remainingMs)}：每帧动画完成后调用的一个函数
    animation {Object}：当前动画的属性，比如当前动画的元素、·duration·
    progress {Number}：当前动画的进度，范围·0~1·
    remainingMs {Number}：当前动画剩余的时间，单位 ms
complete {Function}：在动画完成时要执行的函数
done {Function(animation, jumpedToEnd)}：动画成功时执行的函数
fail {Function(animation, jumpedToEnd)}：动画失败时执行的函数
always {Function(animation, jumpedToEnd)}：在动画完成时执行的函数
!!

### 淡入淡出
!!
.fadeOut()：以改变透明度的形式渐渐隐藏元素，不传参数默认动画时长 400ms，参数用法同·.hide()·
.fadeIn()：以改变透明度的形式渐渐显示元素，不传参数默认动画时长 400ms，参数用法同·.hide()·
.fadeToggle()：如果元素显示就淡出，隐藏就淡入，不传参数默认动画时长 400ms，参数用法同·.hide()·
.fadeTo(duration, opacity [, easing] [, complete])：仅改变元素的透明度
    duration {Number/String}：动画持续时间，单位 ms，可选·normal·(400)、·fast·(200)、·slow·(600)
    opacity {Number}：目标透明度，范围 ·0~1·
    easing {String} [swing]：运动曲线，可选 ·swing·（类似 ·ease·）或 ·linear·
    complete {Function}：在动画完成时要执行的函数
!!

### 滑动

!!
.slideUp()：以改变高度的形式渐渐隐藏元素，不传参数默认动画时长 400ms，参数用法同·.hide()·
.slideDown()：以改变高度的形式渐渐显示元素，不传参数默认动画时长 400ms，参数用法同·.hide()·
.slideToggle()：如果元素显示就滑动隐藏，隐藏就滑动显示，不传参数默认动画时长 400ms，参数用法同·.hide()·
!!

### .animate()

根据设置的 css 属性进行动画，2 种使用方式：
·.animate(properties [, duration] [, easing] [, complete])·
·.animate(properties, options)·
参数·properties {Object}·是要设置的 css 属性和值的键值对，其他参数用法同·.hide()·
可以提供一个以·+=·或·-=·开始的字符串值，那么目标值就是以这个属性的当前值加上或者减去给定的数字来计算的

··js
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

### .stop()

停止当前动画：·.stop([queue] [, clearQueue] [, jumpToEnd])·

!!
queue {String} [false]：指定要停止动画队列的名称
clearQueue {Boolean} [false]：是否取消所有列队动画
jumpToEnd {Boolean} [false]：是否当前动画立即完成
!!

··js
$('.demo').animate({ width: 600 }, 3000).animate({ width: 100 }, 2000)

// 在 $('.demo') 进行第一个宽度变为 600 的动画中时：
$('.demo').stop() // 停止当前动画，开始执行下一个动画宽变为 100
$('.demo').stop(true) // 停止所有动画，因为把其余等待的动画队列清掉了
$('.demo').stop(false, true) // 立即完成当前动画，即宽立即变为 600，开始执行下一个动画宽变为 100
$('.demo').stop(true, true) // 立即完成当前动画并停止其他动画，因为把其余等待的动画队列清掉了
··

停止动画将不触发动画完成时的回调·complete·和·done·，将触发·fail·回调

### .queue()

!!
.queue([queueName])：获取动画队列，返回一个数组，可传入一个参数指定要获取的名称
.queue([queueName], newQueue)：可传入一个函数数组·newQueue·替换当前列队
    传入空数组可清除动画队列，即当前动画执行完就停止动画
.queue([queueName], callback(next))：可传入一个函数队列执行完之后要执行的函数
!!

### 其他

!!
.finish([queue])：立即完成所有动画
    queue {String} [fx]：指定要完成动画队列的名称
.delay(duration [, queue])：延迟动画
    duration {Number/String}：动画要延迟的时间，单位 ms，可选·fast·(200)、·slow·(600)
    queue {String} [fx]：指定延迟的动画队列的名称
.dequeue([queueName])：执行队列
    queueName {String} [fx]：指定要执行的动画队列的名称
.clearQueue([queueName])：删除所有未执行的动画队列，等同于·.queue([])·
    queueName {String} [fx]：指定要删除的动画队列的名称
$.queue()：·.queue()·的另一种写法，元素作为第一个参数
$.dequeue()：·.dequeue()·的另一种写法，元素作为第一个参数
jQuery.fx.off {Boolean} [false]：全局禁用所有动画，即立即完成动画
jQuery.fx.interval {Number} [13]：（在 v3.0 中已标记为弃用）全局设置动画的频率，单位 ms
!!

## Ajax

### $.ajax()

执行 http 请求：·$.ajax(url [, options])·或·$.ajax([options])·，·options {Object}·请求参数配置如下：

!!
url {String} [当前页面地址]：请求地址
async {Boolean} [true]：是否异步
method {String} [GET]：请求方法（1.9.0 之前的版本需使用 type）
data {Object/Array/String}：请求参数
processData {Boolean} [true]：是否将·data·转换成查询字符串
dataType {String} [通过 MIME 类型的响应信息判断]：指定返回的数据类型，可选：
    text：纯文本字符串
    xml： XML 文档
    html：HTML 文本
    script：执行该脚本并将该脚本以文本形式返回
    json：JSON 格式，如果是不规范的 JSON 格式将报错
    jsonp：跨域请求 JSON 数据，会在请求的 url 最后拼接·&callback=jQuery<随机数>_<timestamp>·
    多个用空格分割的值：例如将 jsonp 以 text 接受并以 xml 解析使用·jsonp text xml·或简写·jsonp xml·

jsonp {String/Boolean}：在 jsonp 请求中指定·callback·为新名称，设为·false·将不添加该·callback·
jsonpCallback {String/Function}：在 jsonp 请求中指定·jQuery<随机数>_<timestamp>·为新名称
crossDomain {Boolean} [同域为 false, 跨域为 true]：指定是否跨域
contentType {Boolean/String} [application/x-www-form-urlencoded; charset=UTF-8]：指定传递的数据类型
context：指定回调函数的上下文（下面有例子）
global {Boolean} [true]：是否触发全局 Ajax 事件处理程序
headers {Object}：设置额外的请求头，例如 token
scriptCharset {String}：在请求·script·脚本时设置其·charset·属性
timeout {Number}：设置请求超时时间，单位毫秒

converters {Object}：将返回的原始数据转换为 js 对象，每个转换器的值是一个函数，默认为：
    ·{"* text": String, "text html": true, "text json": $.parseJSON, "text xml": $.parseXML}·
accepts {Object} [取决于 dataType]：·dataType·的 MIME 类型，可自定义（下面有例子）
cache {Boolean} [true(dataType 为 script/jsonp 时为 false)]：是否缓存此页面
contents {Object}：根据给定的内容类型，解析请求的返回结果
ifModified {Boolean} [false]：是否忽略 Last-Modified 头信息判断，只有上次请求响应改变时，才允许请求成功
isLocal {Boolean} [取决于当前的位置协议]：是否允许当前环境被认定为本地
mimeType {String}：指定一个 MIME 类型来覆盖 XHR 的 MIME 类型
username {String}：用于响应 http 访问认证请求的用户名
password {String}：用于响应 http 访问认证请求的密码
traditional {Boolean} [false]：是否以传统的方式来序列化数据（参考下方 url 序列化中的·$.param()·）
xhr {Function}：默认为·XMLHttpRequest·对象，老版本 IE 为·ActiveXObject·
xhrFields {Object}：设定原生的 XHR 对象，也可在跨域请求时用来设置·withCredentials·为·true·

beforeSend {Function(jqXHR, settings)}：请求前的回调函数，可修改请求的 jqXHR，返回·false·将取消这个请求
dataFilter {Function(data, type)}：处理响应数据的函数，data 是返回的数据，type 是·dataType·参数
statusCode {Object}：响应状态码和对应执行的函数（下面有例子）
success {Function(data, textStatus, jqXHR)}：请求成功的回调函数，也可传入函数数组将被依次调用
error {Function(jqXHR, textStatus, errorThrown)}：请求失败的回调函数，也可传入函数数组将被依次调用
complete {Function(jqXHR, textStatus)}：请求完成的回调函数，也可传入函数数组将被依次调用
!!

··js
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

### 全局 Ajax

!!
$.ajaxSetup(options{Object})：配置·$.ajax()·的默认值，参数同·$.ajax()·
$(document).ajaxStart(fn)：请求开始时执行的函数，和·ajaxSend·的区别在于当前进行的所有请求只触发一次
$(document).ajaxSend(fn (event, jqXHR, ajaxOptions))：在每次请求发送之前执行的函数
$(document).ajaxSuccess(fn (event, XMLHttpRequest, ajaxOptions))：在每次请求成功时执行的函数
$(document).ajaxError(fn (event, jqXHR, ajaxSettings, thrownError))：在每次请求失败时执行的函数
$(document).ajaxComplete(fn (event, XMLHttpRequest, ajaxOptions))：在每次请求完成时执行的函数
$(document).ajaxStop(fn)：请求完成时执行的函数，和·ajaxComplete·的区别在于当前进行的所有请求只触发一次
!!

### 快捷方法

!!
$.get(url [, data] [, success] [, dataType])：get 请求，也可使用和·$.ajax()·一样的对象参数
$.getJSON(url [, data] [, success)：get 请求获取 json 数据，即·dataType·默认为·json·
$.getScript(url [, success])：get 请求获取 script 数据，即·dataType·默认为·script·
$.post(url [, data] [, success] [, dataType])：post 请求，也可使用和·$.ajax()·一样的对象参数
.load(url [, data] [, complete])：在指定元素中加载数据，即将返回的 HTML 数据插入至匹配的元素中
    默认使用 get 请求，若·data·参数提供一个对象将使用 post 请求，不支持·jsonp·
    在·url·参数中加入以空格隔开选择器可对返回的结果进行筛选，如·$('#result').load('/test.html #demo')·
!!

### url 序列化

!!
.serialize()：将表单内的元素转成查询字符串，形如·a=1&b=2·，表单元素应包含·name·和·value·属性
    例如·$('form').serialize()·或·$('input, textarea, select').serialize()·
.serializeArray()：将表单内的元素转成对象数组，形如·[{ name: a, value: 1 }, { name: b, value: 2 }]·
$.param(obj [, traditional])：将对象、对象数组、表单元素转成的查询字符串
    traditional {Boolean} [false]：是否不处理嵌套的对象，即直接转成字符串如·[object Object]·
    注意此方法能力有限，对嵌套的对象或数组可能达不到预期
!!

#### $.param

··js
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

## 全局对象

### $()

!!
$(selector [, content])：选择元素，第二个参数可指定范围，例如·$('span', this)·
$(selector).length：获取匹配元素的数量
$(element [, ownerDocument])：创建 DOM 元素，可在指定 document 内创建，例如·$('<div>123</div>')·
$(element [, attributes])：创建 DOM 元素，可添加属性，例如·$('<div></div>', { class: 'demo' })·
$(callback)：当 DOM 完成加载时执行函数，例如·$(function () {})·
!!

### $.extend()

!!
$.extend([deep], target [, ...obj])：将多个对象合并到第一个对象
    deep {Boolean} [false]：是否深拷贝
    target {Object}：目标对象
    ...obj：被合并的对象，如果合并对象中有相同的属性则后面覆盖前面
$.extend(object)：将自定义对象合并到 jQuery 对象中
$.fn.extend()：·extend()·的另一种写法，即·$.extend === $.fn.extend·
!!

#### $.extend(object)

··js
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

#### jQuery extend 源码

··js
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

### $.noConflict()

用于避免变量冲突，删除·$·变量，传入·true·会将·jQuery·变量也删掉，用变量接受返回的值即重命名·jQuery·

··js
// 只在闭包内使用 $
$.noConflict()
(function ($) {
    // code...
})(jQuery)

// 用 _ 代替 $ 和 jQuery
const _ = $.noConflict(true)
··

### 工具

!!
$.isArray(obj)：判断是否是数组
$.isPlainObject(obj)：判断是否是对象
$.isEmptyObject(obj)：判断是否是空对象
$.isFunction(obj)：判断是否是函数
$.isNumeric(obj)：判断是否是数字
$.isWindow(obj)：判断是否是·window·对象
$.isXMLDoc(node)：检查一个 DOM 节点是否在 XML 文档中
$.type(obj)：获取参数的类型，如：
    ·undefined null boolean number string function array date error symbol regexp object·

$.uniqueSort(array)：去重并排序一个由原生元素组成的数组
$.merge(arr1, arr2)：将第二个数组的内容合并到第一个数组
$.inArray(value, array [, fromIndex])：在数组中查找指定值的索引，没有找到则返回·-1·，类似·.indexOf()·
$.trim(str)：去掉字符串开头和结尾的空白字符
$.parseHTML(data [, context] [, isScripts])：返回一个将字符串解析成原生元素的数组
$.parseXML(data)：将符合格式的字符串转换成 XML 格式
$.proxy(function, context)：接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境
$.globalEval(code)：执行代码，和·eval·的区别是全局执行，即在·<head>·中生成·<script>·执行

$.now()：返回当前时间，等同于·Date.now()·
$.ready：一个延迟对象，当文档准备就绪时，它处于·resolves·状态，可在·$.when()·中使用
$.readyException(error)：定义此方法后，使用·$()·方法抛出错误时，此方法会触发
$.error(message)：抛出异常错误，接收一个字符串转为参数，如果不是字符串会默认转换成字符串
$.noop()：一个空函数，源码就是·noop: function () {}·，在传递空函数的时候可以用一下
.jquery：获取 jQuery 脚本的版本号，返回字符串，例如·'3.2.1'·，使用方式：·$.fn.jquery·或·$().jquery·
!!

### 延迟对象

使用·$.Deferred()·创建延时对象，用来处理异步操作如·$.ajax()·、·setTimeout·

!!
deferred.done(function (data, textStatus, jqXHR))：等同于 ajax 的 success
deferred.fail(function (jqXHR, textStatus, errorThrown))：等同于 ajax 的 error
deferred.always(function (data|jqXHR, textStatus, jqXHR|errorThrown))：等同于 ajax 的 complete
deferred.then(function (即 jqXHR.done), function(即 jqXHR.fail))：包含·.done()·和·.fail()·方法
deferred.catch(function (即 jqXHR.fail))：等同于·deferred.then(null, fn)·

deferred.progress(callbacks, callbacks)：当延迟对象生成正在执行中的进度通知时，调用添加处理程序
    callbacks {Function/ArrayFunction}：当延迟对象生成正在执行中的进度通知时被调用
    callbacks {Function/ArrayFunction}：附加的函数
deferred.notify(args)：调用延迟对象上进行中的回调
    args {Object}：传递参数给进行中的回调
deferred.notifyWith(context [, args])：调用延迟对象上进行中的回调
    context {Object}：Context（上下文） 作为 this 对象传递给进行中的回调
    args {Array}：一个可选的参数数组传递给进行中的回调
deferred.resolve(args)：调用成功的回调函数，参数同·notify·
deferred.resolveWith(context [, args])：调用成功的回调函数，参数同·notifyWith·
deferred.reject(args)：调用失败的回调函数，参数同·notify·
deferred.rejectWith(context [, args])：调用失败的回调函数，参数同·notifyWith·
deferred.state()：返回一个字符串，表示延迟对象的当前状态，值为·pending、resolved、rejected·中的一种
deferred.promise()：返回延迟的 Promise 对象

.promise([type] [, target])：为 DOM 绑定延迟对象，通常用于动画中
    type {String} [fx]：需要待观察队列类型
    target {Object} [fx]：将要绑定 promise 方法的对象

$.when()：可让零到多个延迟对象执行延迟方法
!!

#### deferred.promise()

··js
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

#### .promise()

··js
// 当前所有动画完成后触发 done
$('div').each(function(i) {
    $(this).fadeIn().fadeOut(1000 * (i + 1))
}).promise().done(function () {
    console.log('finfsh!')
})
··

#### $.when()

使用·$.when(deferreds)·可让零到多个延迟对象执行延迟方法
当延迟对象都被解决（resolved）将触发成功的回调，任意一个被拒绝（rejected）将触发失败的回调

··js
// 都请求成功触发 successFn，任意一个失败触发 failFn
$.when($.ajax('/page1'), $.ajax('/page2'))
    .then(successFn, failFn)
··

### 回调对象

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
callbacks.lock()：锁定当前状态，和·disable·的区别在于·memory·状态下会触发新添加的回调，·disable·不会
callbacks.locked()：返回一个 Boolean 值，判断回调列表是否已被锁定
callbacks.remove(callbacks)：在回调列表中删除一个函数或数组函数
callbacks.empty()：删除所有回调
!!

··js
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
[jQuery 官网](https://jquery.com/)
[jQuery 中文](https://www.jquery123.com/)
[HTML 中文网 jQuery 文档](https://www.css88.com/jqapi-1.9/)
[插件 - jQuery插件库](http://www.jq22.com/)
[插件 - jQuery之家](http://www.htmleaf.com/)
@@

&2019/3/28
`
        }
    }
}
</script>
