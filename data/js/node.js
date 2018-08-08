commonData.js.node = {
	content: `
	#起步
	##介绍
	nodejs 让 js 多了一个运行环境，以前 js 只能在浏览器中运行，现在可以在本地运行，可以操作、下载文件等等

	##npm
	npm 是包管理工具
	nodejs 包含 npm，所以安装了 nodejs 就是安装了 npm
	##nvm
	nvm 是 nodejs 的版本管理工具

	##nodejs 安装
	@[中文官网下载|http://nodejs.cn/download/]，安装完成后，检查是否安装成功在命令行输入
	··
	node -v         // nodejs 的版本
	npm -v          // npm 包管理器的版本
	··
	注意如果之前已经安装过 nodejs 的话，想卸载干净最好全局搜索·.npmrc·并删除，这个文件是记录了之前的 cache 和 prefix 的记录

	##npm
	npm install xxx：临时安装，不会在package.json中记住，也就是把node_modules删掉再npm install时不会安装xxx
	npm install xxx --save：记住安装，会在package.json的dependencies依赖中记住，也就是把node_modules删掉再npm install时会安装xxx
	npm install xxx --save-dev：同上，会在package.json的devDependencies开发依赖中记住
	npm install xxx -g：声明-g才有xxx命令

	##cnpm 安装
	npm 毕竟是国外的，所以网速自然就比不上国内的了，而国内有 npm 的@[淘宝镜像 cnpm|https://npm.taobao.org/]，每 10 分钟一次以保证尽量与 npm 官方服务同步
	安装指令：
	··
	npm install -g cnpm --registry=https://registry.npm.taobao.org
	··
	查看 node npm cnpm 版本：
	··
	cnpm -v
	··
	和平时使用 npm 一样，用 cnpm 代替 npm 就行了：
	··
	cnpm install <name>
	··

	##nodejs 升级

	##package.json

	&2018.8.5
	`
}