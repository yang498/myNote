commonData.html.website = {
	name: '网站',
	content: `
	#建站
	建立一个网站可分为3个部分：域名、服务器、网页文件

	##域名
	就是网址，在阿里云或 godaddy 等网站可以注册和备案

	##网页文件
	html + css + js 3件套

	##服务器
	需要一个想让任何人随时随地可以都可以访问的网站，就需要一个24小时不关机的高性能计算机存储你所写的网页程序，也就是云服务器，当进入网站的时候，云服务器就把网站数据发送到电脑上
	比如购买一个阿里云-云服务器 ECS，先包个1年，服务器地域可以随意选择，在南方就选择华南咯，没什么要求的话就选最低配置，镜像选择注意了，我们这里选择Ubuntu16.04版本，64位做一下实验，设置好登录密码，这里的密码就是以后远程连接服务器的密码，购买之后会分配一个ip地址，需要下载一个Xshell 5来连接服务器进行更新网站文件
	Xshell 5：文件>新建>主机填IP地址>连接>输入用户名：root>输入设置的密码

	#阿里云
	##云服务器ECS异常异地登录
	如果看到的登录地不是常用登录地，甚至是什么美国、英国，登录账号是root或admin，那估计就是被黑了，已经绕过了登录密码和 MFA 安全码，

	##使用远程连接功能连接 ECS 实例
	如果普通远程连接软件（比如 PuTTY、Xshell、SecureCRT 等）无法使用时，您可以使用云服务器 ECS 管理控制台的 管理终端 连接 ECS 实例，查看云服务器操作界面当时的状态。如果您拥有操作权限，可以连接到服务器进行操作配置。
	!./img/html/website01.png,800
	如果不知道密码的话可以重置
	若要修改远程连接密码（6位），需要重启才能生效需慎重选择
	!./img/html/website02.jpg,800
	若要修改实例密码（账号名通常为root，这里以Linux为例），也需要重启才能生效需慎重选择
	!./img/html/website03.jpg,800

	##简单的Linux命令
	!!
	cd 空格：回到初始
	cd ..：回到上一级
	cd /home：回到根目录
	ll：查看所有文件列表
	sh xx.sh：执行sh文件
	exit：退出
	!!

	文件夹后面是斜杠代表是一个文件夹，没有是文件
	bin -> usr/bin/：代表子目录是usr，但可直接访问孙目录bin

	#远程连接工具
	##SecureCRT
	百度 SecureCRT 下载，完成后安装x64位的，一直点下一步
	再百度 SecureCRT keygen 下载注册机，比如在@[多多软件站|https://www.baidu.com/link?url=DziWjZR39cXFht1SnuhS1RygelmH0W0cW4LbohLmLub2Oiqi2pEfsjsnfPI-3MBgD6csTQe5_-WNrfvHaRGZPq&wd=&eqid=e6a36eba0002a1b0000000035adc5254]下载了一个，在安装的时候注意把附带其他的软件的勾给去掉，不然你懂得，超烦的，运行 SecureCRT keygen.exe，点击左下的 patch，选择安装路径的 SecureCRT.exe，第二次选择 LicenseHelper.exe，成功后点击 Generate 生成许可证，再打开 SecureCRT，第一个大的输入框不填点下一步，对应的框复制粘贴对应的名称、序列号、日期即可，最后的大输入框也不填就可以了

	@@
	阿里云-文档|https://help.aliyun.com/?spm=a2c4g.11186623.201511181.1.EnHOJL
	@@

	&2018/4/12
	`
}