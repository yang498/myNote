<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# css

## display

### flex

弹性布局，[参考链接](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
**注意**：·flex·布局中子元素的·float·、·clear·和·vertical-align·属性将失效

··css
.box {
    display: flex;
}
.box {
    display: inline-flex;
}
··

#### 容器的属性

!!
flex-direction：控制排列方向
    row [默认值]：水平方向
    row-reverse：水平方向，顺序倒置
    column：垂直方向
    column-reverse：垂直方向，顺序倒置
flex-wrap：一行排不下的换行方式
    nowrap [默认值]：不换行
    wrap：换行
    wrap-reverse：换行，每行顺序倒置，也就是第 1 行在最下面，最后一行在最上面
flex-flow：·flex-direction flex-wrap·的简写
justify-content [flex-start]：子元素在水平方向的对齐方式
    flex-start：左对齐
    flex-end：右对齐
    center：居中
    space-between：两端对齐，间隔相等
    space-around：每个子元素两侧产生的间隔相等
    space-evenly：每个子元素之间的间隔相等
align-items [stretch]：子元素在垂直方向的对齐方式
    stretch：如果子元素未设置高度或设为·auto·，将占满整个容器的高度
    flex-start：顶对齐
    flex-end：底对齐
    center：居中
    baseline：以子元素的第一行文字的基线对齐
align-content [stretch]：多行对齐方式，如果子元素只有一行该属性不起作用，
    stretch：每行垂直方向平均占满
    其余属性和·justify-content·属性相同
!!

#### 子元素的属性

!!
align-self [auto]：单独设置垂直对齐方式，属性和·align-items·相同，默认·auto·继承父元素的·align-items·
order [0]：排列顺序，数值越小，排列顺序越靠前，可以为负数
flex-grow [0]：放大比例，·0·表示不放大，可以是小数，负数无效，单独 1 个子元素设为·1·就会占满剩余空间
flex-shrink [1]：缩小比例，·1·表示如果空间不足该子元素将缩小，可以是小数，负数无效，设为·0·将不缩小
flex-basis [auto]：宽度，默认·auto·表示子元素本来的宽度。可使用各种单位
flex：·flex-grow flex-shrink flex-basis·的简写，快捷值：·auto·（·1 1 auto·），·none·（·0 0 auto·）
!!

### grid

网格布局，[参考链接](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
**注意**：·grid·布局中子元素的·float·、·vertical-align·和·column-*·等设置都将失效

··css
div {
    display: grid;
}
div {
    display: inline-grid;
}
··

#### 容器的属性
!!
grid-template-columns：列宽，可使用·百分比、repeat()、fr、minmax()、auto·，用中括号可定义网格线名称
grid-template-rows：行高，属性和·grid-template-columns·相同
grid-template-areas：单元格名，每个起始线为·区域名-start·，终止线为·区域名-end·，不用的区域用·.·表示
grid-template：·grid-template-columns grid-template-rows grid-template-areas·的简写

grid-auto-columns：多出元素的列宽，属性和·grid-template-columns·相同
    例如设置了网格为 3*3 但有 10 个元素，最后那个即为多出的元素，若不指定宽高则默认为最小列宽和行高
grid-auto-rows：多出元素的行高，属性和·grid-template-rows·相同
grid-auto-flow [row]：排列方向
    row：先行后列
    column：先列后行
    row dense：横向紧密填满
    column dense：竖向紧密填满
grid：·template-rows template-columns template-areas auto-rows auto-columns auto-flow·的简写

justify-items [stretch]：单元格在水平方向的对齐方式
    stretch：拉伸
    start：起始
    end：结束
    center：居中
align-items [stretch]：单元格在垂直方向的对齐方式，属性同·justify-items·
place-items：·align-items justify-items·的简写，若不写第二个值则第二个值和第一个值相等

justify-content [start]：列在水平方向的对齐方式
    space-around：每列的两侧间隔相等
    space-between：两端对齐且间隔相等
    space-evenly：每列的间隔相等
    其余属性和·justify-items·相同
align-content [start]：行在垂直方向的对齐方式，属性同·justify-content·
place-content：·align-content justify-content·的简写，若不写第二个值则第二个值和第一个值相等

row-gap：行间距
column-gap：列间距
gap：·row-gap column-gap·的简写，若不写第二个值则第二个值和第一个值相等
!!

#### 子元素的属性

!!
grid-column-start：左边框所在的网格线
grid-column-end：右边框所在的网格线
grid-row-start：上边框所在的网格线
grid-row-end：下边框所在的网格线
    可指定单元格在容器中的位置和可跨行跨列，值可以是网格线的数字或自定义的名字
    使用·span 数字·可指定跨多少行，若产生了项目的重叠，则可使用·z-index·属性指定项目的层级
grid-column：·grid-column-start grid-column-end·的简写，以· / ·隔开
grid-row：·grid-row-start grid-row-end·的简写，以· / ·隔开
grid-area：指定项目放在哪一个区域，值为自定义的区域名称
    也可以是·grid-row-start grid-column-start grid-row-end grid-column-end·的简写
justify-self：单独设置水平位置，属性同·justify-items·
align-self：单独设置垂直位置，属性同·align-items·
place-self：·align-self justify-self·的简写，若不写第二个值则第二个值和第一个值相等
!!

··css
/* 假设 div.container 有 9 个 div 子元素，定义 3 行 3 列的宽度为 100px，即将子元素 9 等分 */

.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: "header header header"
                        "main main sidebar"
                        "footer footer .";
}

.container {
    /* 单位还可以是百分比 */
    grid-template-columns: 33.33% 33.33% 33.33%;
    /* 重复写太麻烦，使用 repeat()，第一个参数是重复次数，第二个是重复的值 */
    grid-template-columns: repeat(3, 33.33%);
    grid-template-columns: repeat(2, 100px 20px 80px);
    /* 若单元格大小固定，但容器大小不确定，希望容纳尽可能多的单元格使用 auto-fill 自动填充 */
    grid-template-columns: repeat(auto-fill, 100px);
    /* 使用 fr 关键字可以表示比例的关系 */
    grid-template-columns: 1fr 1fr; /* 各占 50% */
    grid-template-columns: 1fr 3fr; /* 第一个占 25%，第二个占 75% */
    grid-template-columns: 100px 1fr 3fr; /* 第二个和第三个占容器宽度减 100px 后百分比 */
    /* minmax() 可让长度固定在一个范围中，偏向最大值，即尽可能填满，第一个参数是最小值，第二个是最大值 */
    grid-template-columns: 1fr 1fr minmax(100px, 1fr);
    /* auto 可表示填充剩下的长度 */
    grid-template-columns: 100px auto 100px;
    /* 每根网格线（比如 3 个格子由 4 根线围成）还可定义名称以方便引用，写在方括号中 */
    grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}

/* 定义子元素所处的位置，可指定 span 跨越多少个单元格 */
.item1 {
    grid-column-start: 1; /* 竖向网格线的第 1 根 */
    grid-column-end: header-end; /* 定义区域名称的右边框 */
    grid-row-start: span 2; /* 上边框与下边框之间有 2 个单元格，即跨 2 格 */
    grid-row-end: span 2; /* 等同于 grid-row-start */
}
/* 简写 */
.item1 {
    grid-column: 1 / header-end;
    grid-row: span 2;
}

/* grid-area */
.item1 {
    grid-area: header;
}
.item1 {
    grid-area: 1 / 1 / 3 / 3;
}
··

## 文字

### font

字体样式：·font: style variant weight size/line-height family;·
最少简写：·font: size family;·

!!
font-style [normal]：字体样式
    normal：常规
    italic：斜体，若当前字体不支持则会尝试用 oblique 代替
    oblique：倾斜体，在纤细的字体中比 italic 要粗一点点，若当前字体不支持则会尝试用 italic 代替
font-weight [normal]：字体粗细，一些字体只提供·normal·和·bold·两种值
    <number>：粗细程度，范围·1~1000·，通常写成整百的形式
    normal：常规，相当于·400·
    bold：粗体，相当于·700·
    lighter：细体，相当于·100·
    bolder：粗体，和·bold·差不多
font-size [medium]：字体大小，浏览器默认·medium·代表·16px·
    <绝对大小关键字>：·xx-small, x-small, small, medium, large, x-large, xx-large·
    <相对大小关键字>：·larger, smaller·（比父元素的字体大或小）
    <length>：字体大小，参考 [<length>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)
    <percentage>：以父元素为基准的百分比，参考 [<percentage>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage)
line-height [normal]：字体行高
    normal：约为·1.2·，取决于·font-family·
    <length>：尺寸单位
    <percentage>：以当前元素·font-size·为基准的倍数，子元素默认继承计算后的值，即等于父元素的行高
    <number>：以当前元素·font-size·为基准的倍数，子元素默认继承这个值，即以子元素自身·font-size·为基准
font-family：字体，可以指定多个字体以逗号隔开，优先采用第一个，若用户计算机中没有或不支持则依次采用下一个
    引号：若字体名不包含空格或者属于通用字体族名可以省略，否则需要加上
    常用字体名：微软雅黑·Microsoft YaHei·，思源黑体·Source Han Sans·，英文等宽·Consolas·，宋体·SimSun·
font-variant [normal]：字体变形，复合属性，例如设置字体为小型大写字母
其他不常用属性参考 [MDN <font>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font)
!!

### white-space

处理空白

%%
| 属性 | 换行符 | 空格和制表符 | 文字换行 | 行尾空格 |
| :-: |   :-:   |    :-:     |   :-:   |   :-:   |
| ·normal·(默认) | 合并 | 合并 | 换行 | 删除 |
| ·nowrap· | 合并 | 合并 | 不换行 | 删除 |
| ·pre· | 保留 | 保留 | 不换行 | 保留 |
| ·pre-wrap· | 保留 | 保留 | 换行 | 挂起 |
| ·pre-line· | 保留 | 合并 | 换行 | 删除 |
| ·break-spaces· | 保留 | 保留 | 换行 | 换行 |
%%

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/white-space.html)

### word-break

处理字符超出边界的断行，下面的 CJK 指中日韩文字符

!!
normal [默认]：非 CJK 不断行，且单词在本行放不下会另起一行，CJK 断行
break-all：所有字符断行
keep-all：所有字符不断行
break-word：所有字符断行，且单词在本行放不下会另起一行
    等同于设置了·word-break: normal·和·overflow-wrap: anywhere·
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/word-break.html)

### overflow-wrap

处理单词在本行放不下是否断行（旧名：·word-wrap·）

!!
normal [默认]：不断行
break-word：断行
anywhere：断行，且会被·width: min-content·影响
!!

下面的例子中只有 **Antidisestablishmentarianism** 设置了 ·overflow-wrap·
~[375](https://interactive-examples.mdn.mozilla.net/pages/css/overflow-wrap.html)

### word-spacing

设置单词的间距，默认·normal·由字体或浏览器决定

## 边框阴影

## 图像

### background

背景样式：·background: color image repeat position / size origin attachment;·

!!
background-color [transparent]：背景颜色
background-image [none]：背景图片，层级高于背景颜色，支持多个背景图片以逗号隔开，层级越后越低
    url()：括号内的引号可省略，当省略时注意若图片链接内包含括号、空格、单双引号需使用·\\·进行转码
background-repeat [repeat]：背景图片的重复方式
    写法：可写 2 个值以空格隔开分别指定水平和垂直方向，在多个背景图片下可写多个值以逗号隔开分别指定重复方式
    repeat|repeat-x|repeat-y|no-repeat：分别是·重复|只在水平方向重复|只在垂直方向重复|不重复·
    space：不裁剪重复，把边上裁剪的部分挤出去，所以图像之间会有些空隙，·background-position·会被忽视
    round：不裁剪重复，让边上裁剪的部分尽可能的挤进来，所以图像会适当的缩小，图像之间没有空隙
background-position [0% 0%]：背景图片的位置
    写法：可写 2 个值以空格隔开分别指定水平和垂直方向，在多个背景图片下可写多个值以逗号隔开分别指定位置
    单位：支持 px、百分比等单位，可以是负数
    top|left|right|bottom|center：放在指定边缘，分别代表·50% 0%|0% 50%|100% 50%|50% 100%|50% 50%·
    left|right + 距离：定义 x 轴位置，相对于该方位的距离，例如·right 10px·表示 x 轴上距离容器右侧 10px
    top|bottom + 距离：定义 y 轴位置，相对于该方位的距离，例如·bottom 10px·表示 y 轴上距离容器底部 10px
        所以可以写 4 个值，例如·right 10px bottom 10px·表示背景图片距离右侧 10px、距离底部 10px
background-position-x [left]：单独设置背景图片 x 轴的位置
background-position-y [top]：单独设置背景图片 y 轴的位置
background-size [auto auto]：背景图片的大小
    写法：可写 2 个值以空格隔开分别指定宽度和高度，在多个背景图片下可写多个值以逗号隔开分别指定大小
    单位：支持 px、百分比等单位
    auto：保持背景图片的原比例
    cover：保持背景图片的比例完全覆盖背景区域，左右或上下部分可能会被裁剪
    contain：保持背景图片的比例完全嵌入背景区域，不会被裁剪
background-attachment [scroll]：背景图片是否随容器滚动，多个背景图片可写多个值以逗号隔开分别指定滚动方式
    scroll：容器内固定，容器外滚动
    fixed：绝对固定，不管处于哪个容器都不会滚动（滚动时实时重绘，比较耗性能，最好使用其他固定方案）
    local：跟随容器滚动
background-origin [padding-box]：背景图片的显示区域起点，·background-attachment·为·fixed·时此属性无效
    padding-box：以 padding 区域为起点
    border-box：以 border 区域为起点
    content-box：以原始内容区域为起点，即不包括 padding 和 border
background-clip [border-box]：背景图片或颜色的裁剪范围，和·background-origin·区别于不改变位置而只裁剪
    border-box：在 border 区域内显示
    padding-box：在 padding 区域内显示
    content-box：在原始内容区域内显示，即不包括 padding 和 border
    text：在文字区域内显示，注意如果要显示背景图片需把文字颜色去掉，即·color: transparent;·
        ·text·属性的兼容性不太好，若不支持需加上·-webkit-·前缀，即·-webkit-background-clip: text;·
background-blend-mode [normal]：多个背景图片下定义混合模式，参考 [MDN 中文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode) 和 [MDN 英文](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode)
!!

### mask

用遮罩图片的透明部分把元素遮住（变透明），所以不透明的 jpg 图片和非透明渐变是没有效果的
考虑兼容性应加上·-webkit-·前缀
遮罩：·mask: image mode repeat position clip origin size type composite;·
可以分别设置多个属性以逗号隔开，例如：·mask: url(...), radial-gradient(...);·

!!
mask-image [none]：遮罩图片，参考·background-image·
mask-mode [match-source]：遮罩模式
    match-source：自适应，即根据图片类型自动采用·alpha·和·luminance·
    alpha：基于透明度遮罩
    luminance：基于亮度遮罩（整体比·alpha·偏透明一点）
mask-repeat [repeat]：重复方式，参考·background-repeat·
mask-position [0% 0%]：遮罩的位置，参考·background-position·
mask-clip [border-box]：遮罩的裁剪范围，参考·background-clip·，并多出以下属性：
    margin-box：在 margin 区域内裁剪
    fill-box：在 SVG 边界内裁剪
    stroke-box：在 SVG 绘制的边框内裁剪
    view-box：在 SVG 区域内裁剪
    no-clip：不裁剪
mask-origin [border-box]：遮罩的范围起点，参考·background-origin·，多出的属性参考·mask-clip·
mask-size [auto]：遮罩的大小，参考·background-size·
mask-type [luminance]：专用于 SVG 元素的·mask-mode·，注意不支持·match-source·属性
mask-composite [source-over]：多个遮罩下的混合模式，参考 [MDN 老版](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-composite)， [MDN 新版](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-mask-composite) 和 [Canvas](https://www.canvasapi.cn/CanvasRenderingContext2D/globalCompositeOperation)
!!

### clip-path

创建指定形状裁剪元素：·clip-path: <box> <shape>·
并且可以用于·transition·和·animation·，但需要动画前后坐标的数目一致

!!
<box> [border-box]：裁剪范围
    border-box：在 border 区域内裁剪
    padding-box：在 border 区域内裁剪
    content-box：在 content 区域内裁剪
    margin-box：在 margin-box 区域内裁剪
    fill-box：在 SVG 边界内裁剪
    stroke-box：在 SVG 绘制的边框内裁剪
    view-box：在 SVG 区域内裁剪
<shape>：裁剪形状
    url()：加载图片形状
    inset(<side>\\{1,4} round <radius>)：矩形
        <side>：四个边分别距离元素上下左右边的距离，写法同·margin·
        <radius>：定义圆角，写法同·border-radius·
    circle(<radius> at <position>)：圆形
        <radius>：半径长度，并支持：
            百分比：以公式·sqrt(width^2+height^2)/sqrt(2)·计算‘
            closest-side：以距圆心最近的边相切
            farthest-side：以距圆心最远的边相切
        <position> [center]：圆心的位置，参考·background-position·
    ellipse(<rx rx> at <position>)：椭圆
        <rx rx>：x 轴 y 轴的半径，若填百分比将分别参考元素宽高的长度，也支持·closest-side farthest-side·
        <position> [center]：圆心的位置，参考·background-position·
    polygon(<fill-rule>, <x y>, <x y>*))：多边形
        <fill-rule> [nonzero]：填充规则
            nonzero：叠加
            evenodd：相交
        <x y>：点的位置，即三个以上的点可连接为多边形，两个点以下无效果，元素左上角为起点，支持长度和百分比
    path(<fill-rule>, <string>)：SVG 路径
        <fill-rule>：填充规则，和·polygon()·相同
        <string>：SVG 路径，需用引号包裹
!!

画个外正方形裁剪圆环 demo：

··css
/* <div class="circle"></div> */

.circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: run 10s linear infinite;
    background-image: radial-gradient(#fff 50%, transparent 50%),
                    conic-gradient(from 180deg, transparent 160deg, #f08, #f00, transparent 200deg),
                    conic-gradient(#f00 20deg, #f80, #fe0, #0e0, #0cc, #08f, #80f, #f08 340deg);
}

@keyframes run {
    0%    { clip-path: polygon(50% 50%, 50% -150%, 50% -150%, 50% -150%, 50% -150%, 50% -150%); }
    12.5% { clip-path: polygon(50% 50%, 50% -150%, 150% 50%, 150% 50%, 150% 50%, 150% 50%); }
    25%   { clip-path: polygon(50% 50%, 50% -150%, 150% 50%, 50% 150%, 50% 150%, 50% 150%); }
    37.5% { clip-path: polygon(50% 50%, 50% -150%, 150% 50%, 50% 150%, -50% 50%, -50% 50%); }
    50%   { clip-path: polygon(50% 50%, 50% -150%, 150% 50%, 50% 150%, -50% 50%, 50% -150%); }
    62.5% { clip-path: polygon(50% 50%, 150% 50%, 150% 50%, 50% 150%, -50% 50%, 50% -150%); }
    75%   { clip-path: polygon(50% 50%, 50% 150%, 50% 150%, 50% 150%, -50% 50%, 50% -150%); }
    87.5% { clip-path: polygon(50% 50%, -50% 50%, -50% 50%, -50% 50%, -50% 50%, 50% -150%); }
    100%  { clip-path: polygon(50% 50%, 50% -150%, 50% -150%, 50% -150%, 50% -150%, 50% -150%); }
}
··

## 渐变

应用于·background-image·和·mask-image·

### linear-gradient()

线性渐变：·linear-gradient([angle], color [start]*, [color [start]*]+)·

!!
<angle> [to bottom/180deg]：角度，支持角度单位或·to top/left/right/bottom·，或 2 个例如·to top right·
    角度：和时钟一样，·0deg·相当于 12 点，这个角度代表渐变终点，例如·0deg·表示从元素的中心点到顶部的渐变
<start>：渐变起始点，可使用长度单位或百分比，注意每 2 个颜色的渐变方向是相对的，例如：
    ·linear-gradient(90deg, #f00 50%, #08f)·：元素左半边是纯红，从一半宽度开始才由红渐变到蓝
    ·linear-gradient(90deg, #f00, #08f 50%)·：元素左半边进行了由红到蓝的渐变，右半边是纯蓝
    ·linear-gradient(90deg, #f00 50%, #08f 50%)·：元素左半边是纯红，右半边是纯蓝
    ·linear-gradient(90deg, #f00 33%, #0c0 33% 66%, #08f 66%)·：红绿蓝界限分明
    ·linear-gradient(90deg, #f00 100%, #08f 50%)·：整个元素都是纯红，即第一个颜色优先级最高，越后越低
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/function-linear-gradient.html)

### radial-gradient()
径向渐变：·radial-gradient([shape [extent-keyword] [at position]], color [start]*, [color [start]*]+)·
!!
<shape> [ellipse]：渐变的形状
    ellipse：以元素轴对称的椭圆，所以若元素的宽高相等则是个正圆
    circle：始终是正圆
<extent-keyword> [farthest-corner]：渐变边缘轮廓的具体位置，差异程度取决于渐变的中心点
    farthest-corner：渐变的边缘轮廓和元素最近的角相切
    farthest-side：渐变的边缘轮廓和元素最近的边相切
    closest-corner：渐变的边缘轮廓和元素最远的角相切，若渐变的中心点处于中间则和·farthest-corner·效果一样
    closest-side：渐变的边缘轮廓和元素最远的边相切，若渐变的中心点处于中间则和·farthest-side·效果一样
at <position> [center]：渐变的中心点，写法参考·background-position·
<start>：渐变起始点，写法参考·linear-gradient()·
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/function-radial-gradient.html)

### 重复线性径向渐变

重复多次渐变图案直到填满元素

!!
repeating-linear-gradient()：线性重复渐变，参数和·linear-gradient()·一样
repeating-radial-gradient()：径向重复渐变，参数和·radial-gradient()·一样
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/function-repeating-linear-gradient.html)
~[375](https://interactive-examples.mdn.mozilla.net/pages/css/function-repeating-radial-gradient.html)

### conic-gradient()

角度渐变：·conic-gradient([from angle] [at position], color [angle]*, [color [angle]*]+)·

!!
from <angle>：渐变起始角度
at <position>：渐变中心点，写法参考·background-position·
<angle>：每个渐变起始角度，作用参考·linear-gradient()·
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/function-conic-gradient.html)

### demo

[更多精彩案例](https://leaverou.github.io/css3patterns/)，[结合背景混合模式](https://codepen.io/bennettfeely/pen/wJbtk)

#### bootstrap 进度条：

··css
/* <div class="progress"></div> */

.progress {
    width: 320px;
    height: 16px;
    border-radius: 5px;
    background-color: #08f;
    background-image: linear-gradient(45deg,
        transparent 25%, rgba(255, 255, 255, 0.2) 25% 50%,
        transparent 50% 75%, rgba(255, 255, 255, 0.2) 75%
    );
    background-size: 16px; /* size 和 height 相等，缩小后由 background-repeat 填满 */
    animation: progress 1s linear infinite;
}

@keyframes progress {
    to { background-position-x: 16px; } /* 位移一个 background-size 距离作为一个周期 */
}
··

#### 环形进度条：注意 50% 进度之前灰色和蓝色调换

··css
/* <div class="progress">70%</div> */

.progress {
    width: 200px;
    height: 200px;
    font-size: 24px;
    font-weight: bold;
    line-height: 200px;
    text-align: center;
    border-radius: 50%;
    background-color: #ccc;
    background-image: radial-gradient(#fff 90px, transparent 90px),
                        linear-gradient(90deg, #08f 50%, transparent 50%),
                        linear-gradient(30deg, #08f 50%, transparent 50%);
}
··

#### 线性渐变格子

··css
/* <div class="grid repeating-linear"></div> */

.grid {
    width: 220px;
    height: 220px;
    background-color: rgba(200, 0, 0, 0.7);
}

/* .repeating-linear 和 .linear 效果相同 */
.repeating-linear {
    background-image: repeating-linear-gradient(transparent 0 20px, rgba(255, 255, 255, 0.5) 20px 40px),
                        repeating-linear-gradient(90deg, transparent 0 20px, rgba(255, 255, 255, 0.5) 20px 40px);
}
.linear {
    background-image: linear-gradient(transparent 50%, rgba(255, 255, 255, 0.5) 50%),
                        linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.5) 50%);
    background-size: 40px 40px;
}
··

#### 径向渐变小圆点重复

··css
/* <div class="dot"></div> */

.dot {
    width: 220px;
    height: 220px;
    background-color: rgba(200, 0, 0, 0.7);
    background-image: radial-gradient(rgba(255, 255, 255, 0.8) 30%, transparent 30%);
    background-size: 40px 40px;
    background-repeat: round;
}
··

#### 角度渐变彩色圆环

··css
/* <div class="circle"></div> */

.circle {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background-image: radial-gradient(#fff 50%, transparent 50%),
                    conic-gradient(from 180deg, transparent 160deg, #f08, #f00, transparent 200deg),
                    conic-gradient(#f00 20deg, #f80, #fe0, #0e0, #0cc, #08f, #80f, #f08 340deg);
}
··

## transform

### transform

位移、旋转、缩放或倾斜元素。这是通过修改 CSS 视觉格式化模型的坐标空间来实现的

!!
none：不应用任何变换

translate(x, y)：位移
translate3d(x, y, z)：3D 位移
translateX(x)：水平位移
translateY(y)：垂直位移
translateZ(z)：3D 空间的 z 轴位移

rotate(a)：旋转
rotate3d(x, y, z, a)：3D 旋转，·x y z·分别表示该轴的矢量，没有单位的数字，通常取·[-1~1]·
rotateX(a)：绕 x 轴旋转
rotateY(a)：绕 y 轴旋转
rotateZ(a)：绕 z 轴旋转

scale(x, y)：缩放，·x y·默认都为·1·，若·y·不存在则默认和·x·相同，设为负数表示镜像缩放
scale3d(x, y, z)：3D 缩放
scaleX(x)：水平缩放
scaleY(y)：垂直缩放
scaleZ(z)：3D 空间的 z 轴缩放

skew(ax, ay)：角度倾斜
skewX(ax)：水平倾斜
skewY(ay)：垂直倾斜

matrix(a, b, c, d, x, y)：矩阵，集合所有 2D 变换
matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)：3D 矩阵，集合所有 3D 变换

perspective(l)：·z=0·平面与观察者（屏幕）之间的距离，注意，此属性只应用于自身，不会被子元素继承
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/transform.html)
~[375](https://interactive-examples.mdn.mozilla.net/pages/css/rotate3d.html)

### perspective

·z=0·平面与观察者（屏幕）之间的距离，注意，此属性不应用于自身，而是为子元素提供透视基准点

### perspective-origin

观察者（屏幕）的位置，支持长度、百分比或·top left right bottom center·中的关键字
可以设置 2 个以内的值分别表示·x y·轴的位置偏移量
注意，此属性只和·perspective·相关，与·transform: perspective(l)·无关

### transform-style

设置元素的子元素是位于 3D 空间中还是平面中，默认为平面

!!
flat：平面
preserve-3d：3D
!!

### transform-origin

transform 的原点，支持长度、百分比或·top left right bottom center·中的关键字
可以设置 3 个以内的值分别表示·x y z·轴的原点偏移量，其中·z·轴只支持长度单位，不支持百分比和关键字

### backface-visibility

当元素背面朝向观察者（屏幕）时是否可见，默认可见。当元素出现背面时通常是绕 x 或 y 轴旋转时出现

!!
visible：可见
hidden：不可见
!!

### demo

#### 立方体

··html
<div class="background">
    <div class="cube">
        <div class="face front">1</div>
        <div class="face right">2</div>
        <div class="face back">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
    </div>
</div>

<style>
    .background {
        width: 300px;
        height: 300px;
        background-image: linear-gradient(to right, #ff6e7f, #bfe9ff);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cube {
        width: 100px;
        height: 100px;
        position: relative;
        transform-style: preserve-3d;
        transform: rotate3d(-1, -1, 0, 45deg);
    }
    .face {
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        line-height: 100px;
        text-align: center;
        position: absolute;
        background-color: rgba(200, 0, 0, 0.7);
        background-image: repeating-linear-gradient(transparent 0 28px, rgba(255, 255, 255, 0.5) 28px 36px),
            repeating-linear-gradient(90deg, transparent 0 28px, rgba(255, 255, 255, 0.5) 28px 36px);
    }
    .front {
        background-color: #f00;
        transform: translateZ(50px);
    }
    .right {
        background-color: #f80;
        transform: rotateY(90deg) translateZ(50px);
    }
    .back {
        background-color: #0c0;
        transform: rotateY(180deg) translateZ(50px);
    }
    .left {
        background-color: #08f;
        transform: rotateY(-90deg) translateZ(50px);
    }
    .top {
        background-color: #c0c;
        transform: rotateX(90deg) translateZ(50px);
    }
    .bottom {
        background-color: #f08;
        transform: rotateX(-90deg) translateZ(50px);
    }
</style>
··

## 过渡动画

### transition

过渡效果：·transition: property duration timing-function delay;·
可以分别设置多个属性的过渡动画以逗号隔开，例如：·transition: opacity 0.5s ease-out, transform 0s 0.5s;·

!!
transition-property [all]：指定应用过渡属性的名称，可被动画的属性详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)
    all：所有可被动画的属性都过渡
    none：没有过渡动画
    <property>：指定可被动画的属性
transition-duration [0s]：过渡动画所需的时间，单位秒(s)或毫秒(ms)
transition-timing-function [ease]：过渡动画的加速度曲线
    ease：快慢快
    linear：匀速
    ease-in：先慢后快
    ease-out：先快后慢
    ease-in-out：快慢快，慢的阶段比·ease·更匀速
    step-start：一开始就结束了，·steps(1, start)·的快捷写法
    step-end：开始不变，直到·duration·的最后结束，·steps(1, end)·的快捷写法
    cubic-bezier(x1, y1, x2, y2)：贝塞尔曲线函数，可使用 [预览调试工具](http://cubic-bezier.com/#.17,.67,.83,.67)
    steps(<steps>, <direction>)：等距阶梯函数
        <steps>：分几步，应传入整数
        <direction>：左连续还是右连续
            start：左连续，因此第一步发生在动画开始时
            end：右连续，因此最后一步发生在动画结束时
transition-delay [0s]：过渡动画开始前的等待时间，单位秒(s)或毫秒(ms)
!!

### animation

动画：·animation: name duration timing-function delay iteration-count direction fill-mode play-state;·
可以同时设置多个动画以逗号隔开，例如：·animation: move 1s ease-out, down 2s linear;·

!!
animation-name [none]：自定义动画名称，然后由·@keyframes·定义动画序列
    书写规范：由·a-z A-Z 0-9 _ -·组成，不能以数字或双横线开头，大小写敏感
animation-duration [0s]：动画时长，单位秒(s)或毫秒(ms)
animation-timing-function [ease]：动画的加速度曲线，参考·transition·
animation-delay [0s]：动画开始前的等待时间，单位秒(s)或毫秒(ms)
animation-iteration-count [1]：动画执行次数，可以是小数表示最后一次动画进行的百分比，或·infinite·无限
animation-direction [normal]：动画方向
    normal：从起点开始到终点
    reverse：从终点开始到起点
    alternate：从起点开始交替反向运行
    alternate-reverse：从终点开始交替反向运行
animation-fill-mode [none]：动画执行前后元素应用的样式
    none：不应用样式
    forwards：元素的样式停留在动画的最后一帧
    backwards：元素的样式在一开始就应用动画的第一帧，设置了·animation-delay·比较明显
    both：同时使用·forwards·和·backwards·
animation-play-state [running]：运行或暂停动画，一般由 js 动态设置，若动画已结束则设置无效
    running：运行
    paused：暂停
!!

~[375](https://interactive-examples.mdn.mozilla.net/pages/css/animation.html)

### @keyframes

定义动画关键帧的样式：

··css
@keyframes <animation-name> {
    <0% / from> {
        /* 样式 */
    }
    <percentage> {
        /* 样式 */
    }
    <100% / to> {
        /* 样式 */
    }
}
··

!!
开始状态：0%，或者使用关键字·from·
结束状态：100%，或者使用关键字·to·
其他过程：介于·0~100·的百分比
!!

**注意**：

!!
如果没有指定动画的开始或结束状态，将使用元素的现有样式作为对应的起始或结束状态
可以按任意顺序列出关键帧百分比，执行时会按照进度执行
若使用·@keyframes·定义多个相同的名称，以最后一个为准
若定义多个相同的百分比，也以最后一个为准
关键帧中将忽略·!important·的作用
!!

### will-change

启用 GPU 加速来提升页面渲染性能

!!
will-change[auto]：
    auto：浏览器常规优化方式
    scroll-position：滚动时提升性能
    contents：页面动画或变化时提升性能
    <custom-ident>：自定义需要提升性能的属性，例如·animation·、·transform·，可以书写多个值以逗号隔开
!!

**注意**：最好是在需要的时候使用，而不要过度使用，否则导致页面卡顿

### demo

#### 模拟 Windows 进度条：

··css
/* <div class="progress">
    <div class="color"></div>
</div> */

.progress {
    width: 400px;
    height: 15px;
    border: 1px solid #ccc;
    background-color: #eee;
    overflow: hidden;
}
.color {
    width: 0;
    height: 100%;
    background: #06B026 no-repeat;
    background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    background-size: 100px;
    animation: pro 20s forwards, light 3s linear infinite;
}
@keyframes pro {
    to { width: 100%; }
}
@keyframes light {
    0% { background-position-x: -100px; }
    40% { background-position-x: -100px; }
    100% { background-position-x: calc(100% + 100px); }
}
··

#### 改变变量让渐变动画

··css
/* <div class="box">
    <div class="circle"></div>
    <div class="text"></div>
</div> */

.box {
    width: 200px;
    height: 200px;
}
.circle {
    height: 100%;
    border-radius: 50%;
    background-image: radial-gradient(#fff 50%, transparent 50%),
                        conic-gradient(from 180deg, transparent 160deg, #f08, #f00, transparent 200deg),
                        conic-gradient(#f00 20deg, #f80, #fe0, #0e0, #0cc, #08f, #80f, #f08 340deg);
    mask-image: conic-gradient(#000 calc(3.6deg * var(--n)), transparent calc(3.6deg * var(--n)));
    -webkit-mask-image: conic-gradient(#000 calc(3.6deg * var(--n)), transparent calc(3.6deg * var(--n)));
}
.text {
    transform: translateY(-100%);
    line-height: 200px;
    text-align: center;
    font-size: 24px;
}
.text::after {
    counter-reset: n var(--n);
    content: counter(n);
}
.circle, .text {
    animation: seed 10s linear infinite alternate;
}
@keyframes seed {
    0%{--n:0}1%{--n:1}2%{--n:2}3%{--n:3}4%{--n:4}5%{--n:5}6%{--n:6}7%{--n:7}8%{--n:8}9%{--n:9}10%{--n:10}
    11%{--n:11}12%{--n:12}13%{--n:13}14%{--n:14}15%{--n:15}16%{--n:16}17%{--n:17}18%{--n:18}19%{--n:19}20%{--n:20}
    21%{--n:21}22%{--n:22}23%{--n:23}24%{--n:24}25%{--n:25}26%{--n:26}27%{--n:27}28%{--n:28}29%{--n:29}30%{--n:30}
    31%{--n:31}32%{--n:32}33%{--n:33}34%{--n:34}35%{--n:35}36%{--n:36}37%{--n:37}38%{--n:38}39%{--n:39}40%{--n:40}
    41%{--n:41}42%{--n:42}43%{--n:43}44%{--n:44}45%{--n:45}46%{--n:46}47%{--n:47}48%{--n:48}49%{--n:49}50%{--n:50}
    51%{--n:51}52%{--n:52}53%{--n:53}54%{--n:54}55%{--n:55}56%{--n:56}57%{--n:57}58%{--n:58}59%{--n:59}60%{--n:60}
    61%{--n:61}62%{--n:62}63%{--n:63}64%{--n:64}65%{--n:65}66%{--n:66}67%{--n:67}68%{--n:68}69%{--n:69}70%{--n:70}
    71%{--n:71}72%{--n:72}73%{--n:73}74%{--n:74}75%{--n:75}76%{--n:76}77%{--n:77}78%{--n:78}79%{--n:79}80%{--n:80}
    81%{--n:81}82%{--n:82}83%{--n:83}84%{--n:84}85%{--n:85}86%{--n:86}87%{--n:87}88%{--n:88}89%{--n:89}90%{--n:90}
    91%{--n:91}92%{--n:92}93%{--n:93}94%{--n:94}95%{--n:95}96%{--n:96}97%{--n:97}98%{--n:98}99%{--n:99}100%{--n:100}
}
··

## 计算

### --*

定义 CSS 变量，即预先定义好任意的 CSS 属性，通过·var(--*)·读取变量
（·$·Sass 用了，·@·Less 用了，为了不冲突所以使用·--·）

··css
:root {
    --c: #08f;
    --bgc: #f00;
    --textC: var(--c);
}
.demo {
    color: var(--c);
    background-color: var(--bgc);
}
··

如果变量是字符串则可以和其他字符串拼接：

··css
.foo {
    --bar: 'hello';
    --foo: var(--bar)' world';
}
··

如果变量是数值则需要借助·calc()·连接：

··css
.foo {
    --gap: 20;
    margin-top: var(--gap)px; /* 无效 */
}
.foo {
    --gap: 20;
    margin-top: calc(var(--gap) * 1px); /* 有效 */
}
··

**注意**：

!!
变量必须写在 CSS 样式·{}·里面
属性名不能使用变量，
命名由·a-z A-Z 0-9 _ -·，还可以是中文或其他语言，开头可以是任意规范字符
变量的大小写敏感，例如·--color·和·--Color·是两个不同变量
作用域和选择器的范围一样，所以为了确保所有选择器都可以读取，一般放在根元素·:root·
!!

### var()

读取 CSS 变量，可以传入第二个参数表示若变量不存在使用此默认值
注意，若第二个参数不处理内部的逗号或空格，即第二参数不管写的是什么，都将看作一个值，例如：

··css
div {
    var(--font-family, "Roboto", "Helvetica");
    var(--margin, 10px 15px 20px);
}
··

对于已有的变量，只要语法正确都会应用，然后再说有没有效：

··css
body {
    --color: 20px;
    background-color: var(--color, #000); /* 背景色设置 20px 无效，所以仍是透明 */
}
··

### counter-reset

计数器命名：·counter-reset: <counter-name> <integer>·，可以命名多个以空格隔开，通过·counter()·获取计数器的结果

!!
<counter-name>：计数器名称，由·a-z A-Z 0-9 _ -·组成，不能以数字或双横线开头，大小写敏感
<integer>[0]：初始值
!!

··css
.demo::before {
    counter-reset: demo;
    content: counter(demo); /* 0 */
}
.demo::after {
    counter-reset: one 1 two 2 three;
}
··

### counter-increment

计数器递增：·counter-increment: <counter-name> <integer>·，可以使用多个计数器递增以空格隔开
注意，若元素设置了·display:none;·则不会递增

!!
<counter-name>：要递增的计数器名称
<integer>[1]：每次增加的值
!!

··css
.demo::before {
    counter-reset: demo;
    counter-increment: demo; /* 每定义一次就增加 */
    content: counter(demo); /* 1 */
}
.demo::after {
    counter-increment: demo -1; /* 减 1 */
}
··

计数器递增每个元素使用一次，作用范围和选择器一样

··css
.demo {
    counter-reset: demo;
}
.demo::before, .demo::after {
    counter-increment: demo;
    content: counter(demo);
}
/* ::before 显示 1 */
/* ::after 显示 2 */
··

### counter()

获取计数器的结果：·counter(<counter-name>, <counter-style>)·

!!
<counter-name>：要获取的计数器名称
<counter-style>[decimal]：计数值样式，参考 [list-style-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type#%E5%8F%96%E5%80%BC)，例如递增英文字母或罗马数字
!!

··css
.demo {
    counter-reset: demo;
}
.demo::before, .demo::after {
    counter-increment: demo;
    content: counter(demo, lower-latin);
}
/* ::before 显示 a */
/* ::after 显示 b */
··

作用范围和选择器类似，如果同级重名的计数器则每次都从新开始，如果不同级重名的计数器则互不干扰：

··html
<style>
    ol {
        counter-reset: demo;
        list-style-type: none;
    }
    li::before {
        counter-increment: demo;
        content: counter(demo);
    }
</style>

<ol>
    <li></li>
    <li></li>
</ol>
<ol>
    <li></li>
    <li></li>
</ol>
/*
1
2
1
2
*/

<ol>
    <li>
        <ol>
            <li></li>
            <li></li>
        </ol>
    </li>
    <li></li>
</ol>
/*
1
    1
    2
2
*/
··

### counters()

嵌套计数：·counters(<counter-name>, <counter-string>, <counter-style>)·

!!
<counter-name>：要获取的计数器名称
<counter-string>：嵌套分隔符
<counter-style>[decimal]：计数值样式，参考·counter()·
!!

··html
<style>
    ol {
        counter-reset: demo;
        list-style-type: none;
    }
    li::before {
        counter-increment: demo;
        content: counters(demo, '.');
    }
</style>

<ol>
    <li>
        <ol>
            <li>
                <ol>
                    <li></li>
                    <li></li>
                </ol>
            </li>
            <li></li>
        </ol>
    </li>
    <li></li>
</ol>
/*
1
    1.1
        1.1.1
        1.1.2
    1.2
2
*/
··

## 小技巧

### 水平垂直居中定宽高

[参考](https://segmentfault.com/a/1190000016389031)，此部分代码为公共部分：

··html
<div class="box">
    <div class="item size">居中</div>
</div>

<style>
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
</style>
··

·absolute + 负 margin·：

··css
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

··css
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

··css
.box {
    position: relative;
}
.item {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
··

### 水平垂直居中不定宽高

此部分代码为公共部分，去掉了宽高其他和上面一样：

··html
<div class="box">
    <div class="item">居中</div>
</div>

<style>
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
</style>
··

·absolute + transform·：

··css
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

··css
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
··

·grid·：

··css
.box {
    display: grid;
    justify-items: center;
    align-items: center;
}
··

·子元素设为 inline-block·：

··css
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

··css
.box {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.item {
    display: inline-block;
}
··

·writing-mode·（让文字以垂直方向排列，同时改变 css 方向，例如·text-align·）：

··html
<div class="box">
    <div class="box-inner">
        <div class="item">居中</div>
    </div>
</div>

<style>
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
</style>
··

### 文字超出省略

#### 单行超出省略

··css
div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
··

#### 多行超出省略，适用于 WebKit 内核浏览器和移动端

··css
div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
··

### 超出行数的显示隐藏

仿微信朋友圈，每段文字最多展示 5 行，若有多出的文字则显示“全文”按钮，点击可查看全文
全文按钮只在文字超过 5 行时显示，所以要先判断文字是否超出了 5 行，即判断高度
注意由于 js 的执行晚于 dom 渲染，如果直接判断会造成超出的文字出现一下又消失，所以超出的文字开始是隐藏的

··html
<div class="text">
    <p>明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。</p>
</div>

<style>
    .text {
        width: 100px;
        max-height: 100px;
        overflow: hidden;
    }
    .text.active {
        max-height: none;
    }
    p {
        width: 100px;
        line-height: 20px; /* 父容器的高是行高的 5 倍 */
        margin: 0;
    }
    a {
        color: #08f;
        cursor: pointer;
    }
</style>

<script>
    // 这里使用了 jQuery
    if ($('p').height() > 100) $('.text').after('<a>全文</a>')
    $('a').click(function () {
        $('.text').toggleClass('active').hasClass('active')
            ? $(this).text('收起')
            : $(this).text('全文')
    })
&lt;/script>
··

&2019/8/8
            `
        }
    }
}
</script>
