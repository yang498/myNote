commonData.jsLibrary.node = {
	content: `
	#介绍
	##npm安装
	npm install xxx：临时安装，不会在package.json中记住，也就是把node_modules删掉再npm install时不会安装xxx
	npm install xxx --save：记住安装，会在package.json的dependencies依赖中记住，也就是把node_modules删掉再npm install时会安装xxx
	npm install xxx --save-dev：同上，会在package.json的devDependencies开发依赖中记住
	npm install xxx -g：声明-g才有xxx命令

	##package.json
	`
}