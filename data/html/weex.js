commonData.html.weex = {
	content: `
	#介绍
	使用Weex可以构建一个真正的原生应用，跨平台：一份代码支持H5、IOS和Android，接口可扩展，可以和vue搭配，还可以称为vue-native。
它不是一个 HTML5 库或开发框架，不是一套全新的技术，不是为了解决纯 native 开发的体验问题，不是一个以自身为中心的移动应用开发框架，而是一款轻量级的移动端跨平台动态性技术解决方案。


	#安装
	
	##开发环境
	安装 weex-toolkit 脚手架工具
	使用npm安装：·npm install -g weex-toolkit·
	查看版本号：·weex -v·
	查看是否安装成功：·weex·
	如果使用·cnpm·安装后提示权限错误（permission error）：
	!./imgs/html/weex01.jpg
	先卸载之前的·cnpm uninstall -g weex-toolkit·，使用·sudo·关键字进行安装
	·sudo cnpm install -g weex-toolkit·
	windows是不支持·sudo·的，卸载完直接用·npm install -g weex-toolkit·
	如果还不行，直接删除npm和npm-cache目录下与weex相关的文件和目录
	
	##初始化
	·weex init project-name·
	或在建好的文件夹下直接·weex init·
	通过·cnpm install·安装项目依赖
	如果以后出现·cannot find module ...·这样的错误，可以试试删除node_modules重装依赖·cnpm install·
	
	##目录
	·src/*·：编写页面代码
	·dist/*·：生成的js文件
	·app.js·：weex页面的入口
	·webpack.config.js·：webpack 配置文件，用于生成 .we 文件的 JSBunlde
	·config.json·：项目配置文件，本地IP
	·build/*·：构建脚本
	·weex.html·：web端展示页面
	·index.html·：用iframe内嵌weex.html展示效果，或手机下载playground扫一扫
	·assets·：资源文件，用于网页浏览，	style.css：css文件，	qrcode.js：生成二维码，	url.js：生成链接，phantom-limb.js：鼠标模拟touch
	·.babelrc·：转es5配置
	·.eslintrc·：.babelrc转换标准


	`
}