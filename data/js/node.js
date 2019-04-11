commonData.js.node.content = `
	#起步
	##介绍
	Node 是 JavaScript 语言的服务器运行环境，以前 js 只能在浏览器中运行，首先，JavaScript 通过 Node 在服务器运行，在这个意义上，Node 有点像 JavaScript 虚拟机；其次，Node 提供大量工具库，使得 JavaScript 语言与操作系统互动（比如读写文件、新建子进程），在这个意义上，Node 又是 JavaScript 的工具库。
	Node 内部采用 Google 公司的 V8 引擎，作为 JavaScript 语言解释器；通过自行开发的 libuv 库，调用操作系统资源。

	##安装
	在@[中文官网|http://nodejs.cn/download/]可以下载对应版本的 msi 文件直接安装
	安装完成后可以查看版本：
	··
	node -v
	··

	##nvm
	nvm（node version manager）是 node 的版本管理工具，可以下载多个版本的 node，再切换指定的版本，适用于需要同时使用多个版本的 node（如果没这个需要可以不安装），先@[下载安装包|https://github.com/coreybutler/nvm-windows/releases]安装，因为 nvm 包含了 node，所以如果之前已经安装了 node 需要先卸载
	注意如果想卸载 node，最好在卸载完之后全局搜索·.npmrc·并删除，这个文件是记录了之前 cache 和 prefix 的记录
	··
	// 安装最新版本
	$ nvm install node

	// 安装指定版本
	$ nvm install 0.12.1

	// 使用已安装的最新版本
	$ nvm use node

	// 使用指定版本的node
	$ nvm use 0.12
	··

	##npm
	npm（node package manager）是 node 的包管理工具，用于 js 代码模块的安装卸载、管理依赖等 ，node 包含了 npm，所以安装了 node 就是安装了 npm
	为什么需要 npm？在开发时如果需要使用一些库，比如 jQuery、express，然后去对应的官网下载 js 文件移动到当前工作目录，时间久了版本更新了又要重新下载，于是 npm 应运而生：大家都把自己开发的代码模块打包后放到 npm 官网上，如果要使用，直接通过 npm 安装指定版本到指定目录直接使用。更重要的是，如果我们要使用模块 A，而模块 A 又依赖于模块 B，npm 可以根据依赖关系，把所有依赖的包都下载。否则手动管理既麻烦又容易出错。
	在 @[npm 官网|https://npmjs.com/] 可以查找包（package）、设置参数以及管理 npm
	在当前项目的文件夹的路径栏输入 cmd 可快速打开当前路径的命令行，下载 jQuery 试试：
	··
	npm install jquery
	··
	此命令默认下载最新版的 jQuery，下载完之后在当前项目根目录的 node_modules 文件夹中可以看到

	##cnpm
	npm 连接的是国外的服务器，所以网速比国内的较差，而国内有 npm 的 @[淘宝镜像 cnpm|https://npm.taobao.org/]，每 10 分钟更新一次以保证尽量与 npm 官方服务同步，所以国内可以使用 cnpm 代替 npm
	安装指令：
	··
	npm install -g cnpm --registry=https://registry.npm.taobao.org
	··
	和平时使用 npm 一样，用 cnpm 代替 npm 就行了：
	··
	cnpm install <name>
	··

	##npm 命令
	直接在命令行输入·npm·回车可查看能使用的命令列表
	常用的命令有：
	··
	npm install <name> [-g] [--save-dev] // 安装
	npm uninstall <name> [-g] [--save-dev] // 卸载
	npm update <name> [-g] [--save-dev] // 更新，直接 npm update 可更新所有模块
	npm list // 查看当前项目已安装模块的情况
	npm <command> -h // 命令说明
	··
	参数说明
	!!
	-g：全局安装，并且写入系统环境变量，全局模式安装的包可以供所有的程序使用，因此也能在命令行使用安装包定义的命令w
		默认安装在·C:/Users/Administrator/AppData/Roaming/npm·
	--save：安装到当前项目，并写入 package.json 的 dependencies 属性，适用于像 express 这种项目运行必备的模块
	--save-dev：安装到当前项目，并写入 package.json 的 devDependencies 属性，适用于像 gulp 这种项目开发时使用的模块
	!!

	##更新版本
	###更新 node：
	1、直接在官网下载最新版，安装路径选择之前安装的，然后新版会覆盖旧版，如果不知道之前的安装路径可在命令行输入·where node·查看
	2、如果安装了 nvm 则可直接使用：
	··
	nvm install node
	node -v // 查看版本号
	nvm use x.x.x // 使用最新版
	··
	3、非 windows 系统可直接安装·n·模块（相当于 nvm）管理 node 版本：
	··
	npm install n -g // 安装
	n latest // 更新到最新版
	··

	###更新 npm：
	··
	npm install npm -g

	npm install npm@6.9.0 -g // 指定版本
	··
	更新其他全局包基本同上，换个名字

	##npm-check
	·npm-check·包可检查更新当前项目的依赖包和全局包
	安装：
	··
	cnpm install npm-check -g
	··
	常用命令：
	··
	npm-check // 当前项目包版本对比

	npm-check -g // 全局包版本对比

	npm-check -u // 当前项目包选择更新

	npm-check -gu // 全局包选择更新
	··
	详细参数说明：
	··
	$ npm-check <path> <options>

	Path
		在哪里检查，默认为当前目录，使用 -g 可全局检查

	Options
	  -u, --update          交互式更新，space 健选择，enter 键确认更新
	  -y, --update-all      不进行交互直接更新所有包
	  -g, --global          查看全局模块
	  -s, --skip-unused     跳过检查未使用的包
	  -p, --production      跳过 devDependencies
	  -d, --dev-only        只查看 devDependencies (跳过 dependencies)
	  -i, --ignore          跳过指定包的检查
	  -E, --save-exact      在 package.json 中保存确切的版本(x.y.z)，而不是插入符号(^x.y.z)
	  --specials            检查未使用的依赖项中的特殊项
	  --no-color            不显示颜色
	  --no-emoji            不显示 emoji，在 CI 环境中默认没有表情符号
	  --debug               显示调试输出

	示例
	  $ npm-check           # 查看哪些可以更新，哪些没有被使用
	  $ npm-check ../foo    # 检查另一个路径
	  $ npm-check -gu       # 选择更新全局安装的模块
	··

	##npm-check-updates
	·npm-check-updates·包可检查更新当前项目的依赖包和全局包的
	安装：
	··
	cnpm install -g npm-check-updates
	··
	常用命令：
	··
	nuc // 当前项目包版本对比，红色代表重要更新，青色代表次要更新，绿色代表补丁更新

	ncu -u // 更新所有当前项目包

	ncu -g // 全局包版本对比

	ncu -gu // 更新所有全局包

	ncu '/^gulp-.*$/' // 使用正则更新以 gulp- 开头的包
	ncu '/^(?!gulp-).*$/' // 使用正则更新非 gulp- 开头的包
	··
	更新项目的依赖包时此工具只更新·package.json·的版本，所以更新之后需更新已安装的包和·package-lock.json·：
	··
	cnpm install
	··
	更新全局包时会提示更新的命令，可复制提示的命令手动运行
	更多详细参数查看 @[npm-check-updates|https://www.npmjs.com/package/npm-check-updates]

	#package.json
	##介绍
	·package.json·是项目的配置文件，通常放在项目根目录，包含项目说明和依赖等信息
	例如开始一个新的项目，将已配置好的·package.json·复制过去，运行·cnpm install·将下载好全部的依赖
	可以自行新建，也可在项目根目录下运行·npm init·按照提示进行新建，然后按提示依次输入命令回车
	·package.json·也不是一定需要，看需求
	示例·package.json·：
	··
	{
	  "name": "note",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "start": "node index.js"
	  },
	  "repository": {
	    "type": "git",
	    "url": "git+https://github.com/yang498/note.git"
	  },
	  "author": "yy",
	  "license": "ISC",
	  "bugs": {
	    "url": "https://github.com/yang498/note/issues"
	  },
	  "homepage": "https://github.com/yang498/note#readme",
	  "devDependencies": {
	    "browser-sync": "^2.24.6",
	    "gulp": "^3.9.1",
	    "gulp-livereload": "^3.8.1",
	    "gulp-load-plugins": "^1.5.0",
	    "gulp-sass": "^4.0.1"
	  }
	}
	··
	##字段说明
	!!
	name[demo]：项目名称
	version[1.0.0]：版本号
	description：项目描述
	entry point：入口文件，当别人安装了你发布的模块时，require你的模块的时候取得的就是你main字段规定的入口文件的输出。例如你写入了 { "main":"XXX.js"}，而他人通过npm install '你的模块名称' . 安装了你的模块后，他通过 var X = require('你的模块名称')取得的就是你在XXX.js的输出
	test command：测试命令
	git repository：git地址
	keywords：关键描述
	author：作者
	license[ISC]：许可协议
	!!

	#说明
	##基本用法
	运行 node 程序，就是使用 node 命令读取 JavaScript 脚本
	1、新建·demo.js·脚本，写入一行代码·console.log("Hello World")·保存，在命令行输入：
	··
	node demo
	// 或者
	node demo.js

	// 输出
	Hello World
	··
	2、使用 -e 参数，可以执行代码字符串：
	··
	node -e 'console.log("Hello World")'
	··
	3、在命令行输入 node 直接回车，进入一个 Node.js 的 REPL 环境（Read–eval–print loop，”读取-求值-输出”循环），可以直接运行 JavaScript 命令：
	··
	> node
	> 1+1
	2
	>
	··
	如果使用参数 –use_strict，则REPL将在严格模式下运行：
	··
	node --use_strict
	··
	特殊变量下划线（_）表示上一个命令的返回结果：
	··
	> 1 + 1
	2
	> _ + 1
	3
	··
	在 REPL 中，如果运行一个表达式，会直接在命令行返回结果。如果运行一条语句，就不会有任何输出，因为语句没有返回值：
	··
	> x = 1 // 表达式，返回 1
	1
	> var x = 1 // 语句，无返回值
	··

	##异步操作
	Node 采用 V8 引擎处理 JavaScript 脚本，最大特点就是单线程运行，所以 node 的语法基本都是异步操作，即回调的形式
	Node 约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象
	··
	const callback = (error, value) => {
	if (error) {
		return console.log(error)
	}
		console.log(value)
	}
	··
	上面代码中，callback 的第一个参数是 Error 对象，第二个参数才是真正的数据参数。这是因为回调函数主要用于异步操作，当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制 try…catch 对于异步操作行不通，所以只能把错误交给回调函数处理。
	如果没有发生错误，回调函数的第一个参数就传入null。这种写法有一个很大的好处，就是说只要判断回调函数的第一个参数，就知道有没有出错，如果不是null，就肯定出错了。

	##模块化结构
	Node.js 采用模块化结构，按照 @[CommonJS|http://wiki.commonjs.org/wiki/CommonJS] 规范定义和使用模块。模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件。
	require 命令用于指定加载模块，加载时可以省略脚本文件的后缀名：
	··
	const circle = require('./circle.js')
	// 等同于
	const circle = require('./circle')
	··
	模块加载后会被系统缓存，第二次加载会返回缓存中的版本，这意味着模块实际上只会执行一次。如果希望执行多次可以让模块返回一个函数，然后多次调用该函数。

	##自定义模块
	使用·module.exports·可以输出模块，假定新建一个 foo.js 文件：
	··
	// foo.js

	module.exports = function(x) {
	    console.log(x)
	}
	··
	使用：
	··
	// index.js
	var m = require('./foo')

	m('这是自定义模块')
	··

	##系统模块
	node 的核心模块源码在安装目录的 lib 子目录中，为了提高运行速度，它们安装时都会被编译成二进制文件
	核心模块总是最优先加载的，比如自定义一个 http 模块，·require('http')·加载的还是核心模块
	!!
	assert：断言，判断表达式符不符合预期，根据条件抛出对应的错误
	async_hooks[试验]：异步钩子，对异步操作生命周期过程的处理
	Buffer：处理二进制数据的接口
	child_process：新建子进程，子进程的运行结果储存在系统缓存中（最大200KB），等子进程运行结束后，主进程再用回调函数读取子进程的运行结果
	cluster：单个 Node.js 实例运行在单个线程中，使用 cluster 启用多个进程以提高效率和负载均衡
	console：类似于浏览器提供的 JavaScript 控制台
	crypto：加密，是对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装
	dgram：监听服务器收发的数据包，提供了 UDP 数据包 socket 的实现
	dns：域名解析服务器 IP、IPv4或IPv6、文本查询主机名(TXT记录)等
	Error：异常错误的处理
	events：异步操作只有开始和结束两个状态，通过 events 可以解决多状态异步操作的响应问题
	fs：文件系统，提供本地文件的读写能力，几乎对所有操作提供异步和同步两种操作方式，供开发者选择
	global：全局变量说明
	http：搭建 http 服务
	http2：搭建 http2 服务
	https：搭建 https 服务
	inspector[试验]：调试，与 V8 调试器交互
	module：模块和导出说明
	net：用于底层的网络通信，创建基于流的 TCP 或 IPC 的服务器与客户端
	os：与操作系统交互
	path：处理文件与目录的路径
	perf_hooks[试验]：性能钩子，比如测试异步操作或加载依赖的耗时
	process：提供当前 Node 进程的信息
	querystring：解析查询字符串，比如将 url 参数解析成对象
	readline：从可读流（如 process.stdin）读取数据，每次读取一行
	repl：交互式解释器，进入 REPL 环境（Read–eval–print loop，”读取-求值-输出”循环）
	stream：处理流式数据，比如 http 服务器的请求和 process.stdout 都是流的实例
	string_decoder：字符串解码器，以保留编码的多字节 UTF-8 和 UTF-16 字符的方式将 Buffer 对象解码为字符串
	timer：定时器
	tls：对安全传输层（TLS）及安全套接层（SSL）协议的实现，建立在 OpenSSL 的基础上
	trace_events[试验]：跟踪事件，集中由 V8，Node.js核心和 userspace 代码生成的跟踪信息
	tty：终端信息
	url：处理解析 url，比如解析出 url 的 host、origin、pathname 等
	util：一些工具方法，比如·util.format()·方法返回一个格式化后的字符串
	v8：V8 引擎的信息等，比如关于 v8 堆空间的统计,即组成v8堆的片段
	vm：用于在 V8 虚拟机环境中编译和运行代码
	worker_threads[试验]：工作线程，提供了一种创建在独立线程上运行的多个环境以及在它们之间创建消息通道的方法
	zlib：提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能
	!!

	#global
	@[global - 全局变量|http://nodejs.cn/api/globals.html]，node 特有且非模块
	全局对象：
	!!
	global：表示 Node 所在的全局环境，类似于浏览器的 window 对象。浏览器中声明·var x = 1·等同于·window.x = 1·，这一行为和 REPL 环境一致，但在 js 文件（模块）中不是，这是因为模块的全局变量都是该模块私有的，其他模块无法取到
	process：该对象表示 Node 所处的当前进程，允许开发者与该进程互动
	!!
	全局变量（两个下划线开头）：
	!!
	__filename：指向当前运行的脚本文件名
	__dirname：指向当前运行的脚本所在的目录
	!!
	全局函数：
	!!
	require()：用于加载模块
	!!

	#module

	#http

	#url
	##URL
	全局·URL·对象（新增于 ^^v10.0.0^^），处理与解析 url，无需引入
	全局·URL·对象采用 WHATWG 标准，下面是遗留版本和新版标准的区别（上面是旧版，下面是新版）：
	··
	┌────────────────────────────────────────────────────────────────────────────────────────────────┐
	│                                            old href                                            │
	├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
	│ protocol │  │        auth         │          host          │           path            │ hash  │
	│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
	│          │  │                     │    hostname     │ port │ pathname │     search     │       │
	│          │  │                     │                 │      │          ├─┬──────────────┤       │
	│          │  │                     │                 │      │          │ │    query     │       │
	"  https:   //¿    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
	│          │  │          │          │    hostname     │ port │          │                │       │
	│          │  │          │          ├─────────────────┴──────┤          │                │       │
	│ protocol │  │ username │ password │          host          │          │                │       │
	├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
	│   origin    │                     │         origin         │ pathname │     search     │ hash  │
	├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
	│                                            new href                                            │
	└────────────────────────────────────────────────────────────────────────────────────────────────┘
	··
	创建 URL 对象：·new URL(input[, base])·
	!!
	input{String}：要解析的输入 URL
	base{String}：如果 input 是相对 URL，则为要解析的基本 URL
	!!
	通过将·input·解析到·base·上创建一个新的·URL·对象。如果·base·是一个字符串，则解析方法与·new URL(base)·相同
	··
	new URL('https://example.org/')
	new URL('/foo', 'https://example.org/')	// https://example.org/foo
	··
	注意存在于·input·主机名中的 Unicode 字符将被使用 Punycode 算法自动转换为 ASCII
	··
	new URL('https://你好你好')	// https://xn--6qqa088eba/
	··

	##URL 属性
	创建·URL·对象后可以获取 URL 对象的属性
	··
	const url = new URL('http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash')

	url			 // http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash  整体 url，可读写
					// 将 url 设为新值等同于·new URL(value)·创建新的 URL 对象，若设置的新值不符合规范将会抛出 TypeError
	url.href		// 等同于使用 url
	url.toString()  // 等同于使用 url
	url.toJSON()	// 等同于使用 url

	url.hash		// #hash  哈希值，可读写
	url.host		// sub.example.com:8080  主机，可读写，若设置的新值不符合规范则无效
	url.hostname	// sub.example.com  主机名，可读写，若设置的新值不符合规范则无效
	url.origin      // http://sub.example.com:8080  源 url，^^只读^^
	url.username	// user 用户名，，可读写
	url.password	// pass 密码，可读写
	url.pathname	// /¿p/a/t/h，可读写

	url.port		// 8080，可读写
	// url.port 设置新端口应符合：0~65535 的数字（超出范围或非数字无效，小数取整数部分）或以数字开头的字符串（取开头的数字部分）
	// 注意不能设置协议的默认端口否则无效，比如 https 协议默认是 443，'https://example.org:8888' 的端口设为 443 无效

	url.protocol	// http:  协议，可读写，若设置的新值不符合规范则无效
	// WHATWG URL 标准的协议包括：ftp, file, gopher, http, https, ws, wss
	// 注意非标准协议设为标准协议也是无效的，比如 'fish://example.org' 的协议设为 http 无效

	url.search		// ?query=string  序列化查询部分，可读写
	url.searchParams	// 查询参数的 URLSearchParams 对象，^^只读^^，详见下方的 url.searchParams

	// 设置新值
	url.hash = 'new'
	url		// 'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#new'
	··

	##URL.searchParams
	此对象提供的方法有：
	!!
	get(name)：返回 name 对应的值，没有给定的 name 则返回 null，如果有多个 name 则返回第一个
	getAll(name)：以数组的形式返回 name 对应的所有值，没有给定的 name 则返回空数组
	set(name, value)：设置 name 为新的 value 值，若 name 已存在则设置为新的，若存在多个就设置第一个并删除其他对，若不存在就在末尾添加

	append(name, value)：在末尾添加新的键值对，不管之前有没有 name
	delete(name)：删除所有键为 name 的键值对
	has(name)：如果存在至少一对键是 name 的键值对则返回 true

	toString()：返回参数部分的字符串，相当于·url.search·去掉开头问号
	keys()：类似·Object.key()·，返回所有键组成的遍历器 Iterator（类似数组的对象），·for...of·可直接循环，通过·[...keys]·可转为数组
	values()：类似·Object.values()·，返回所有值组成的遍历器 Iterator
	entries()：类似·Object.entries()·，返回所有键值组成的遍历器 Iterator，每项是 2 个元素的数组，第 0 项是 key，第 1 项是 value
	Symbol.iterator：url.searchParams 本身是个键值对形式的 Iterator，所以本身等同于调用了·entries()·方法
	forEach(fn[, thisArg])：类似数组的 forEach，循环键值对，fn 为每次调用的函数，thisArg 为当 fn 调用时，被用作 this 值的对象
	sort()：键值对排序，该方法将改变原 url
	!!
	··
	const url = new URL('http://example.com/path?foo=bar&abc=123&abc=456&abc=789')

	// get 获取
	url.searchParams.get('foo')	// bar
	url.searchParams.get('abc')	// 123

	// getAll 获取全部
	url.searchParams.getAll('foo')	// ['bar']
	url.searchParams.getAll('abc')	// ['123', '456', '789']

	// set 设置
	url.searchParams.set('foo', 'sss')	// url 变为 http://example.com/path?foo=sss&abc=123&abc=456&abc=789
	url.searchParams.set('abc', '000')	// url 变为 http://example.com/path?foo=sss&abc=000
	url.searchParams.set('xyz', '123')	// url 变为 http://example.com/path?foo=sss&abc=000&xyz=123
	··
	··
	const url = new URL('http://example.com/path?foo=bar&abc=123&abc=456')

	// append 添加
	url.searchParams.append('abc', '000')	// url 变为 http://example.com/path?foo=bar&abc=123&abc=456&abc=000
	url.searchParams.append('xyz', '123')	// url 变为 http://example.com/path?foo=bar&abc=123&abc=456&abc=000&xyz=123

	// delete 删除
	url.searchParams.delete('abc')	// url 变为 http://example.com/path?foo=bar&xyz=123

	// has 判断
	url.searchParams.has('foo')	// true
	··
	··
	const url = new URL('http://example.com/path?foo=bar&abc=123&abc=456')

	// toString 转字符串
	url.searchParams.toString()	// foo=bar&abc=123&abc=456

	// keys 键数组
	const keys = url.searchParams.keys()
	keys	// URLSearchParams Iterator { 'foo', 'abc', 'abc' }
	[...keys]	// ['foo', 'abc', 'abc']

	// values 值数组
	const values = url.searchParams.values()
	values	// URLSearchParams Iterator { 'bar', '123', '456' }
	[...values]	// ['bar', '123', '456']

	// entries 键值数组
	const entries = url.searchParams.entries()
	entries	// URLSearchParams Iterator { [ 'foo', 'bar' ], [ 'abc', '123' ], [ 'abc', '456' ] }
	[...entries]	// [ [ 'foo', 'bar' ], [ 'abc', '123' ], [ 'abc', '456' ] ]

	// entries 方法也等同于本身
	for (const [name, value] of entries) console.log(name, value)
	// 等同于
	for (const [name, value] of url.searchParams) console.log(name, value)
	// 都输出同样的结果：
	// foo bar
	// abc 123
	// abc 456

	// forEach 循环
	url.searchParams.forEach((value, name, searchParams) => {
		console.log(value, name, myURL.searchParams === searchParams, searchParams)
	})
	// 输出：
	// bar foo true URLSearchParams { 'foo' => 'bar', 'abc' => '123', 'abc' => '456' }
	// 123 abc true URLSearchParams { 'foo' => 'bar', 'abc' => '123', 'abc' => '456' }
	// 456 abc true URLSearchParams { 'foo' => 'bar', 'abc' => '123', 'abc' => '456' }

	// sort 排序
	url.searchParams.sort()	// url 变为 http://example.com/path?abc=123&abc=456&foo=bar
	··

	##URLSearchParams
	URLSearchParams 是一个全局对象，用来处理 url 的参数部分，使用方式：·new URLSearchParams(search)·
	该方法返回一个对象，可使用和·url.searchParams·一样的方法，参数 search 可使用的类型有 String、Object、Iterable
	###String 形式
	参数只能是 url 的 search 部分，否则第一个·=·之前的都认为是一个键，若 search 以·?·开头将会被去掉
	··
	const params = new URLSearchParams('http://example.com/path?foo=bar&abc=123&abc=456')
	[...params.keys()]	// ['http://example.com/path?foo', 'abc', 'abc']
	··
	··
	const params = new URLSearchParams('?foo=bar&abc=123&abc=456')
	[params.toString()]	// foo=bar&abc=123&abc=456
	··
	###Object 形式
	参数是一个表示键值对集合的对象，每个属性的键和值将被强制转换为字符串
	和·querystring.stringify()·的区别在于重复键的处理，这里是先对重复值用·,·连接，querystring 是分别赋值
	··
	const params = new URLSearchParams({
		user: 'abc',
		query: ['first', 'second']
	})

	params.toString()	// user=abc&query=first%2Csecond
	params.getAll('query')	// ['first,second']
	··
	###Iterable 形式
	参数是键值对的遍历对象，包括数组、Set 和 Map 结构、Generator 对象
	··
	// 每个元素都是两个元素，第一个作为键，第二个作为值
	const params = new URLSearchParams([
		['user', 'abc'],
		['query', 'first'],
		['query', 'second']
	])
	params.toString()	// user=abc&query=first&query=second
	··

	##url
	一些转换方法，注意一些遗留的 API 不应再使用，使用前需先引入：
	··
	const url = require('url')
	··
	!!
	domainToASCII(domain)：使用 Punycode 算法将域名 domain 转换为 ASCII，如果 domain 是无效域名将返回空字符串
	domainToUnicode(domain)：将域名 domain 转换为 Unicode，是·domainToASCII()·的逆运算，如果 domain 是无效域名，将返回空字符串
	fileURLToPath(url)：对·file://·的路径部分进行转码，通过·new URL('file://')·是不能正确解析的
	pathToFileURL(path)：路径转·file://·，和·fileURLToPath()·相反
	format(URL[, options])：URL 对象的 toString() 和 href 属性只返回序列化的字符串，通过此方法可以自定义输出模式
		URL{Object}：URL 对象
		options{Object}：
			auth{Boolean}[true]：是否包含用户名和密码
			fragment{Boolean}[true]：是否包含哈希值
			search{Boolean}[true]：是否包含搜索查询
			unicode{Boolean}[false]：是否转为 unicode 字符
	!!
	··
	const url = require('url')

	url.domainToASCII('中文.com')	// xn--fiq228c.com

	url.domainToUnicode('xn--fiq228c.com')	// 中文.com

	// 这两个方法怎么用不了？？
	// url.fileURLToPath('file://nas/foo.txt')
	// url.pathToFileURL(__filename)

	const myURL = new URL('https://a:b@你好你好?abc#foo')
	myURL.href	// https://a:b@xn--6qqa088eba/?abc#foo
	url.format(myURL, { auth: false, fragment: false, search: false, unicode: true })	// https://你好你好/
	··

	#path
	path > timer > module > global > http > fs > 连接 SQL > 连接 MongoDB

	#querystring
	解析与格式化 URL 的查询字符串，使用前需先引入：
	··
	const qs = require('querystring')
	··

	##parse()
	将字符串解析为对象：·qs.parse(str[, sep[, eq[, options]]])·
	!!
	str{String}：需要解析的查询字符串
	sep{String}[&]：多个键值对之间的分隔符
	eq{String}[=]：键名与键值之间的分隔符
	options{Object}：
		decodeURIComponent{Function}[qs.unescape()]：将编码后的字符串还原的方法
		maxKeys{Number}[1000]：指定最多解析多少个属性，设为 0 表示w无限制
	!!
	··
	qs.parse('foo=bar&abc=xyz&abc=123')
	// 解析成
	{
		foo: 'bar',
		abc: ['xyz', '123']
	}

	qs.parse('w=%E5%89%8D%E7%AB%AF&foo=bar')
	// 解析成
	{
		w: '前端',
		foo: 'bar'
	}

	// 注意问号之前的部分不解析
	qs.parse('example.com/path?foo=bar')
	// 解析成
	{
		example.com/path?foo: 'bar'
	}
	··
	该方法返回的对象不继承自 JavaScript 的 Object 类，意味着不能使用 Object 类的方法如 obj.toString()、obj.hasOwnProperty()

	##unescape()
	解码字符串：·qs.unescape(str)·
	默认使用 JavaScript 内置的·decodeURIComponent()·方法来解码
	该方法是提供给·qs.parse()·使用的，通常不直接使用。 它之所以对外开放，是为了在需要时可以通过给·qs.unescape·赋值一个函数来重写解码的实现

	##stringify()
	将对象生成字符串：qs.stringify(obj[, sep[, eq[, options]]])
	!!
	str{String}：需要生成的对象
	sep{String}[&]：多个键值对之间的连接符
	eq{String}[=]：键名与键值之间的连接符
	options{Object}：
		encodeURIComponent{Function}[qs.escape()]：将对象编码成的字符串的方法
	!!
	··
	qs.stringify({ foo: 'bar', abc: ['xyz', '123'] })
	// 生成
	'foo=bar&abc=xyz&abc=123'

	qs.stringify({ w: '前端', foo: 'bar' })
	// 生成
	'w=%E5%89%8D%E7%AB%AF&foo=bar'
	··

	##escape()
	编码字符串：·qs.escape(str)·
	默认使用 JavaScript 内置的·encodeURIComponent()·方法来解码
	该方法是提供给·qs.stringify()·使用的，通常不直接使用。 它之所以对外开放，是为了在需要时可以通过给·qs.escape·赋值一个函数来重写编码的实现

	#fs

	#timer

	@@
	node 官网|https://nodejs.org/en/
	node 中文网|http://nodejs.cn/
	npm 官网|https://www.npmjs.com/
	npm 中文网|https://www.npmjs.cn/
	cnpm 官网|https://npm.taobao.org/
	@@

	&2019.1.15
`