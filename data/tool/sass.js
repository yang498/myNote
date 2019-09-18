commonData.tool.sass.content = `
#起步
##介绍
sass 是一种 css 预处理工具，将写好的 sass 文件再编译成 css 文件，相比于非编程语言 css 而言，它更好书写，简单便捷，节省了时间
scss 是 sass 3 引入的新语法，其语法完全兼容 css，也就是说，sass 和 scss 其实是一个东西，区别在于文件扩展名和书写格式的不同，sass 是·.sass·后缀，scss 是·.scss·后缀，sass 是以严格的缩进式语法来书写，不带大括号和分号，而 scss 与 css 的书写格式类似，所以一般常用 scss
比如：
··
// css
#box {
	width: 400px;
	height: 400px;
}

#box h1 {
	font-size: 22px;
	color: red;
}

#box p {
	font-size: 18px;
	color: green;
}

// sass
#box
	width: 400px
	height: 400px
	h1
	font-size: 22px
	color: red
	p
	font-size: 18px
	color: green

// scss
#box {
	width: 400px;
	height: 400px;
	h1 {
		font-size: 22px;
		color: red;
	}
	p {
		font-size: 18px;
		color: green;
	}
}
··

##安装
###ruby
因为 sass 依赖于 ruby 环境来编译，先在@[官网下载|https://rubyinstaller.org/downloads]安装 ruby 环境，注意安装时勾选 Add Ruby executables to your PATH 这个选项以添加环境变量
也可以使用其他的方式编译，比如 gulp、webpack 等，甚至一些编辑器比如 webstorm 都能自动编译
###sass
安装完毕后在开始菜单栏找到 Ruby 文件，打开 Start Command Prompt with Ruby，在命令行中输入：
··
gem install sass
··
升级 sass 版本：
··
gem update sass
··
查看 sass 版本：
··
sass -v
··
帮助，查看所有命令
··
sass -h
··

##指令
##编译模式
写法：·scss --watch scss:css --style 编译模式·
现有如下 scss：
··
#box {
	width: 400px;
	height: 400px;
	h1 {
		font-size: 22px;
		color: red;
	}
	p {
		font-size: 18px;
		color: green;
	}
}
··

##nested 嵌套
默认输出方式，保持一定的缩进
··
#box {
	width: 400px;
	height: 400px;
	border: 1px solid gray; }
	#box h1 {
	font-size: 22px;
	color: red; }
	#box p {
	font-size: 18px;
	color: green; }
··

##expanded 展开
··
#box {
	width: 400px;
	height: 400px;
	border: 1px solid gray;
}
#box h1 {
	font-size: 22px;
	color: red;
}
#box p {
	font-size: 18px;
	color: green;
}
··

##compact 紧凑
··
#box { width: 400px; height: 400px; border: 1px solid gray; }
#box h1 { font-size: 22px; color: red; }
#box p { font-size: 18px; color: green; }
··

##compressed 压缩
··
#box{width:400px;height:400px;border:1px solid gray}#box h1{font-size:22px;color:red}#box p{font-size:18px;color:green}
··

@@
Sass 中文网|http://sass.bootcss.com/
@@

&2019/09/12
`