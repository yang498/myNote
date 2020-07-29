# 匹配规则

## 采用的 markdown 语法

- 标题：# h1，# h2，# h3，# h4
- 粗体：**粗体**
- 斜体：*斜体*
- 图片：![width,height](src)（宽高传入数字自动加 px）
- 链接：[text](href)

## 待修改

- 标题：和 # 之间加空格
- 粗体：^^粗体^^
- 图片：!src,width,height（独占一行）
- 行内图片：![src,width,height]
- 链接：@[text|href]
- 表格：分隔符由 , 改 |，去掉宽度第二行宽度最后的宽度设置，固定 100%
- ¿：去掉或前面加 \
定义页内标题点击：@[注意|javascript:;" onclick="$('h1:eq(1)~h2:eq(0)').click()]
右中括号后接 ¿ 不会被解析
正则后 ¿ 不会被解析

## 自定义语法

### 行内代码块

·javascript·

### 代码块

··
let i = 0
i++
··

### 列表

!!
text
text
!!

### 表格

%%
a,b,c（thead）
,0,1,800（居中为 0 或空，左对齐为 1，最后的数字为宽）
1,2,3（tbody）
%%

### iframe

~[height](href)

### 底部链接

@@（加 ! 表示多行）
text|href
@@

改成：

### 单行底部链接

@@
[text](href)
@@

### 多行底部链接

@@@
[text](href)
@@@

### 最后更新时间

&number
