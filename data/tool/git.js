commonData.tool.git = {
	content: `
	#介绍
	·git add .·如果半天没反应的话，应该是有大文件，比如node_modules文件，所以需用.gitignore忽略或选择删除
	若出现·fatal: Unable to create .git/index.lock': File exists.·错误，在.git文件夹内（这是一个隐藏文件夹，可以在左上角查看：组织>文件夹和搜索选项>显示或不显示隐藏文件夹）删除index.lock即可，或者在git bash here执行删除命令：·rm -f .git/index.lock·

	&2018.4.18
	`
}