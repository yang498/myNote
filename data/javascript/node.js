commonData.javascript.node.content = `
#起步
##介绍
Node 是 JavaScript 语言的服务器运行环境，以前 js 只能在浏览器中运行
Node 提供大量工具库，使得 JavaScript 语言与操作系统互动（比如读写文件、新建子进程）
Node 内部采用 Google 公司的 V8 引擎，作为 JavaScript 语言解释器；通过自行开发的 libuv 库，调用操作系统资源
Node 的特点是基于事件驱动和无阻塞（单线程异步回调）

##安装
在@[官网|https://nodejs.org/en/download/]或@[中文官网|http://nodejs.cn/download/]可以下载对应版本的 msi 文件直接安装
安装完成后可以查看版本：
··
node -v
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

###cnpm
npm 连接的是国外的服务器，所以网速比国内的较差，而国内有 npm 的 @[淘宝镜像 cnpm|https://npm.taobao.org/]，每 10 分钟更新一次以保证尽量与 npm 官方服务同步，所以国内可以使用 cnpm 代替 npm
安装指令：
··
npm install -g cnpm --registry=https://registry.npm.taobao.org
··
和平时使用 npm 一样，用 cnpm 代替 npm 就行了：
··
cnpm install <name>
··
注意用·cnpm·安装的 node_modules 文件夹是以下划线开头并且带有·@版本·，而不带下划线和版本号的是这些文件的快捷方式，不影响使用

###npm 命令
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
-g：全局安装，并且写入系统环境变量，全局模式安装的包可以供所有的程序使用，因此也能在命令行使用安装包定义的命令
	默认安装在·C:/Users/Administrator/AppData/Roaming/npm·
--save：安装到当前项目，并写入·package.json·的·dependencies·属性，适用于像 express 这种项目运行必备的模块
--save-dev：安装到当前项目，并写入·package.json·的·devDependencies·属性，适用于像 gulp 这种项目开发时使用的模块
!!

##package.json
·package.json·是项目的配置文件，通常放在项目根目录，包含项目说明和依赖等信息
例如开始一个新的项目，将已配置好的·package.json·复制过去，运行·cnpm install·将下载好全部的依赖
可以自行新建，也可在项目根目录下运行·npm init·按照提示输入进行新建，项目名称（name）和版本（version）必填，其他可选填
·package.json·也不是一定需要，看需求
字段说明：
!!
name：项目名称
version：版本号，写法为“大版本.次要版本.小版本”
author：作者
description：项目描述
keywords：关键描述，标签
license：许可协议
scripts：npm 命令行缩写，例如·"scripts": { "start": "node index.js" }·运行·npm run start·即执行·node index.js·
bin：指定命令对应的文件的位置，例如·"bin": { "index": "data/index.js" }·，对应简写·"scripts": { "start": "node index" }·
dependencies：指定项目运行所依赖的模块
devDependencies：指定项目开发所依赖的模块
	依赖的模块版本说明：
		指定版本：例如·1.2.3·
		~指定版本：例如·~1.2.3·，表示安装·1.2.x·的最新版本，即·1.2.3 <= 版本 < 1.3.0·
		^指定版本：例如·^1.2.3·，表示安装·1.x.x·的最新版本，即·1.2.3 <= 版本 < 2.0.0·
			注意若大版本号为·0·则等同于·~指定版本·，因为·0·通常代表开发阶段，尽量不进行大改动避免不兼容
peerDependencies：比如项目依赖 A 和 B 模块的 1.0 版，而 A 又依赖 B 的 2.0 版。此字段可指定安装依赖的版本
main：指定被·require()·的文件，在·node_modules·内可查看示例，默认为模块根目录的·index.js·
config：添加命令行的环境变量，例如·"config" : { "port" : "8080" }·，脚本中引用·process.env.npm_package_config_port·
browser：指定该模板供浏览器使用的版本，像·Browserify·工具打包时用得到
engines：指定该模块的运行平台，例如  Node 的某个版本·{ "engines" : { "node" : ">=0.10.3 <0.12" } }·
man：指定当前模块的 man 文档的位置，例如·"man": [ "./doc/calc.1" ]·
preferGlobal{Boolean}：当用户不将该模块安装为全局模块时（不 –g），要不要显示警告，表示该模块全局模块
style：当模块供浏览器使用时，指定样式文件所在的位置，打包时用得到。例如·"style": [ "./node_modules/tipso/src/tipso.css" ]·
其他的看字段名也能看出个大概
!!
###package-lock.json
·npm install·时生成的文件，记录了当下各个·npm·包的具体来源和版本号，以保证其他人在·npm install·时大家的依赖能保证一致

##更新版本
###更新 node：
1、直接在官网下载最新版，安装路径选择之前安装的，然后新版会覆盖旧版，如果不知道之前的安装路径可在命令行输入·where node·查看
2、使用 nvm（node version manager）更新，nvm 是 node 的版本管理工具，可以下载多个版本的 node，再切换指定的版本，适用于需要同时使用多个版本的 node（如果没这个需要可以不安装），先@[下载安装包|https://github.com/coreybutler/nvm-windows/releases]安装，因为 nvm 包含了 node，所以如果之前已经安装了 node 需要先卸载
注意如果想卸载 node，最好在卸载完之后全局搜索·.npmrc·并删除，这个文件是记录了之前 cache 和 prefix 的记录
··
// 安装最新版本
$ nvm install node

// 安装指定版本
$ nvm install 10.16.0

// 使用已安装的最新版本
$ nvm use node

// 使用指定版本的node
$ nvm use 10.16.0
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

###使用 npm-check
@[npm-check|https://www.npmjs.com/package/npm-check] 包可检查更新当前项目的依赖包和全局包
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

#概念
##基本用法
###使用 node 运行 js
新建·demo.js·脚本，写入一行代码·console.log("Hello World")·保存，在命令行输入：
··
node demo
// 或者
node demo.js

// 输出
Hello World
··
因为 node 在第一次编译之后都是直接访问内存，所以避免重复载入以提高性能
但却不利于开发调试，所以每次修改文件都需要·Ctrl+C·终止程序再·node xx·来查看新的结果
推荐使用·supervisor·模块，可以实时监听代码的改动自动重启 node，需要全局安装：
··
cnpm install -g supervisor
··
然后启动时用·supervisor·代替·node·命令，例如·node demo·改成·supervisor demo·
###使用·-e·参数执行代码字符串
··
node -e 'console.log("Hello World")'
··
###直接输入 node 回车进入 REPL 环境（Read–eval–print loop，”读取-求值-输出”循环），可运行 js 命令：
··
> node
> 1 + 1
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
上面代码中，callback 的第一个参数是·Error·对象，第二个参数才是真正的数据参数。这是因为回调函数主要用于异步操作，当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制·try…catch·对于异步操作行不通，所以只能把错误交给回调函数处理
如果没有发生错误，回调函数的第一个参数就传入·null·，好处是可以判断回调函数的第一个参数是不是·null·来判断是否出错了

##核心模块
node 的核心模块源码在安装目录的 lib 子目录中，为了提高运行速度，它们安装时都会被编译成二进制文件
!!
assert：断言，判断表达式符不符合预期，根据条件抛出对应的错误
async_hooks[试验]：异步钩子，对异步操作生命周期过程的处理
Buffer：处理二进制数据的接口
child_process：新建子进程，子进程的运行结果储存在系统缓存中（最大 200KB），运行结束后主进程再用回调函数读取子进程的运行结果
cluster：单个 Node.js 实例运行在单个线程中，使用 cluster 启用多个进程以提高效率和负载均衡
console：类似于浏览器提供的 JavaScript 控制台
crypto：加密，是对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装
dgram：监听服务器收发的数据包，提供了 UDP 数据包 socket 的实现
dns：域名解析服务器 IP、IPv4或IPv6、文本查询主机名(TXT记录)等
Error：异常错误的处理
events：异步操作只有开始和结束两个状态，通过 events 可以解决多状态异步操作的响应问题
fs：文件系统，提供本地文件的读写能力，几乎对所有操作提供异步和同步两种操作方式，供开发者选择
global：罗列出全局变量，可·console.log(global)·直接查看
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

#module

##模块
在 Node.js 模块系统中，每个文件都被视为一个独立的模块，例如有个·foo.js·：
··
const circle = require('./circle.js')
console.log(\`半径为 4 的圆的面积是 \${circle.area(4)}\`)
··
有个·circle.js·
··
const { PI } = Math

exports.area = r => PI * r ** 2
exports.circumference = r => 2 * PI * r
··
·circle.js·就是一个独立的模块，变量·PI·对·circle.js·是私有的，通过·exports·暴露出 2 个方法
注意模块名不要和核心模块冲突，核心模块总是最优先加载的，比如自定义一个 http 模块，·require('http')·加载的还是核心模块

##循环
当循环调用·require()·时，一个模块可能在未完成执行时被返回。例如以下情况：
·a.js·：
··
console.log('a 开始')
exports.done = false
const b = require('./b.js')
console.log('在 a 中，b.done = %j', b.done)
exports.done = true
console.log('a 结束')
··

·b.js·:
··
console.log('b 开始')
exports.done = false
const a = require('./a.js')
console.log('在 b 中，a.done = %j', a.done)
exports.done = true
console.log('b 结束')
··

·main.js·:
··
const a = require('./a.js')
const b = require('./b.js')
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done)
··
当·main·加载·a·时，·a·又加载·b·，·b·会尝试加载·a·
为了防止无限循环会返回一个·a·的·exports·对象的^^未完成的副本^^给·b·
然后·b·完成加载，并将·exports·对象提供给·a·
··
$ node main.js
a 开始
b 开始
在 b 中，a.done = false
b 结束
在 a 中，b.done = true
a 结束
在 main 中，a.done=true，b.done=true
··

##文件模块
如果按确切的文件名没有找到模块，则 Node.js 会尝试带上·.js·、·.json·或·.node·拓展名再加载
以·'/'·为前缀的模块是文件的绝对路径。例如·require('/home/marco/foo.js')·会加载·/home/marco/foo.js·文件。
以·'./'·为前缀的模块是相对于调用·require()·的文件。即·circle.js·必须和·foo.js·在同一目录下，·foo.js·才能成功·require('./circle')·
当没有以·'/'·、·'./'·或·'../'·开头来表示文件时，这个模块必须是一个核心模块或加载自·node_modules·目录内的模块
如果给定的路径不存在，则·require()·会抛出一个·code·属性为·'MODULE_NOT_FOUND'·的 Error

##模块封装器
在执行模块代码之前 Node.js 会使用一个函数将其封装：
··
(function(exports, require, module, __filename, __dirname) {
	// 模块的代码实际上在这里
})
··
这样做保持了变量的作用域在模块范围内，而不是全局对象，并且提供看似全局但实际是模块内的变量：
!!
module：当前模块对象的引用
exports：·module.exports·的快速访问
require：加载模块方法，即熟知的·require()·
__filename：当前模块的绝对路径
__dirname：当前模块目录的绝对路径
!!
###__filename 和 __dirname
从硬盘根目录开始的，假设当前有个·q.js·：
··
console.log(__filename) // D:\\web\\project\\demo\\node\\q.js
console.log(__dirname) // D:\\web\\project\\demo\\node
··
###module 对象
在每个模块中，·module·的自由变量是对表示当前模块的对象的引用
!!
module.exports{o}：导出对象
module.children{a}：被该模块引用的模块对象
module.filename{s}：模块的完全解析后的文件名
module.id{s}：模块的标识符，通常是完全解析后的文件名
module.loaded{b}：模块是否已经加载完成，或正在加载中
module.parent{o}：最先引用该模块的模块
module.paths{s}：模块的搜索路径
module.require(id)：已解析的模块的·module.exports·
!!
###exports 对象
·exports·是·module.exports·的快速访问，即它们指向同一个对象，可以理解为：
··
module.exports = exports = {}
··
而模块加载是使用·module.exports·，所以注意：
··
module.exports = newObj // 可以
exports = newObj // 不可以，和 module.exports 断开连接
··
一般的使用情况：
··
const foo = () => ...
const bar = () => ...

module.exports = { foo, bar }
// 或者
exports.foo = foo
exports.bar = bar
··

##Module 对象
模块属性方法，使用前需先引入：
··
const Module =	 require('module')
··
该模块返回的属性有：
!!
Module.builtinModules：罗列 Node.js 提供的所有模块名称。可以用来判断模块是否为第三方所维护
Module.createRequireFromPath(filename)：加载模块的函数，即简化加载相对路径的·require·
	filename{s}：用于构造通过相对路径加载模块的函数的文件名
!!
注意用变量接收该值时不要和导出模块的·module·名称冲突，比如：
··
const Module = require('module')

const builtin = require('module').builtinModules
const requireUtil = require('module').createRequireFromPath('../src/utils')

const { builtinModules, createRequireFromPath } = require('module')
··
·Module.createRequireFromPath(filename)·的 demo：
··
const { createRequireFromPath } = require('module')
const requireUtil = createRequireFromPath('../src/utils')

// require ../src/utils/some-tool
requireUtil('./some-tool')
··

#http
HTTP 服务器和客户端，使用前需先引入：
··
const http = require('http')
··
提供的方法属性：
!!
http.createServer()：创建服务
http.request()：发出 HTTP 请求
http.get()：·http.request()·的快捷·GET·请求方式

http.IncomingMessage 类：·http.createServer()·回调的第一个参数
http.ServerResponse 类：·http.createServer()·回调的第二个参数
http.Server 类：·http.createServer()·返回的实例
http.ClientRequest 类：·http.request()·返回的实例
http.Agent 类：代理，管理 HTTP 客户端的连接持久性和重用

http.METHODS：返回解析器支持的 HTTP 方法列表组成的字符串数组
http.STATUS_CODES：所有标准 HTTP 响应状态码的集合，以及每个状态码的简短描述
http.globalAgent：·Agent·的全局实例，作为所有 HTTP 客户端请求的默认值
http.maxHeaderSize：只读属性，指定 HTTP 消息头的最大允许大小（单位字节）。默认为 8KB。
	可使用·--max-http-header-size·命令行选项进行配置
!!

##createServer()
·http.createServer([options][, requestlistener])·：创建服务并返回服务实例·http.Server·
!!
options{o}：
	IncomingMessage：指定要使用的·http.IncomingMessage·类
	ServerResponse：指定要使用的·http.ServerResponse·类
requestListener{f}：回调函数，可用于访问响应状态、消息头、以及数据
	request{IncomingMessage}：第一个参数
	response{ServerResponse}：第二个参数
!!
###访问·localhost:8080·网页将显示·Hello World·：
··
const http = require('http')

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'}) // 访问网站时发送 http 状态 200(ok) 和内容类型
	response.end('Hello World')
}).listen(8080)

console.log('Server running on port 8080.')
··
###自动打开浏览器：
··
const http = require('http')
const cp = require('child_process')
const host = 'localhost'
const port = 1000

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'}) // 访问网站时发送 http 状态 200(ok) 和内容类型
	response.end('Hello World')
}).listen(port, host, () => {
	console.log(\`Server running at http://\${host}:\${port}/\`)
	cp.exec(\`start http://\${host}:\${port}/\`) // 打开浏览器访问
})
··
###返回·html·文件：
··
const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'})
	response.end(fs.readFileSync('test.html', 'utf8'))
}).listen(8080)

console.log('Server running on port 8080.')
··
###根据不同网址的请求显示不同的内容：
··
const http = require('http')

http.createServer((req, res) => {
	if (req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end('Welcome to the homepage!')
	} else if (req.url === '/about') {
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end('Welcome to the about page!')
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.end('404 error! File not found.')
	}
}).listen(8080)

console.log('Server running on port 8080.')
··

##request()
执行 http 请求：·http.request(options[, callback])·或·http.request(url[, options][, callback])·
!!
url{s/ur}：请求地址，字符串会使用·url.parse()·解析，URL 对象会转换为普通的 options 对象
options {o}：
	protocol{s}[http:]：协议
	host{s}[localhost]：域名或 IP 地址
	hostname{s}：host 的别名，若都指定了 host 和 hostname 则此属性将覆盖 host
	family{n}：IP 地址族，有效值为·4·或·6·，若没有指定则同时使用 IP v4 和 v6
	port{n}[80]：远程服务器的端口
	localAddress{s}：为网络连接绑定的本地接口
	socketPath{s}：Unix 域套接字，若指定了 host 或 port（它们指定了 TCP 套接字）则不能使用此选项
	method{s}[GET]：HTTP 请求的方法
	path{s}[/]：请求的路径，如果有应包括查询字符串，例如·/index.html?page=12·（该字符串不能包含空格）
	headers{o}：请求头
	auth{s}：基本的身份验证，即·user:password·，用于计算授权请求头
	agent{http.Agent/b}[http.globalAgent]：控制 Agent 的行为
	createConnection{f}：当 agent 选项未被使用时，用来为请求生成套接字或流的函数
	timeout{n}：指定套接字超时的数值，单位毫秒。这会在套接字被连接之前设置超时
	setHost{b}[true]：是否自动添加 Host 请求头
callback{f}：回调函数，参数是·http.IncomingMessage·的实例
!!
此方法返回·http.ClientRequest·实例对象
··
const http = require('http')
const qs = require('querystring')
const postData = qs.stringify({ 'msg': '你好世界' })

const options = {
	hostname: 'nodejs.cn',
	path: '/upload',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData)
	}
}
// options 也可以是个 url 字符串，上面相当于是将 url 拆分写
// const options = 'http://abc:xyz@nodejs.cn'

const req = http.request(options, (res) => {
	console.log(\`状态码: \${res.statusCode}\`)
	console.log(\`响应头: \${JSON.stringify(res.headers)}\`)
	res.setEncoding('utf8')
	// 请求得到的数据需监听 'data' 事件，不一定是一次完成，该事件可能会触发多次
	res.on('data', (chunk) => {
		console.log(\`响应主体: \${chunk}\`)
	})
	// 请求完成时触发 'end' 事件
	res.on('end', () => {
		console.log('响应中已无数据')
	})
})

req.on('error', (e) => {
	console.error(\`请求遇到问题: \${e.message}\`)
})

req.write(postData) // 将数据写入请求主体
req.end() // 必须调用此方法结束请求
··

##get()
·request()·的·get·快捷方法：·http.get(options[, callback])·或·http.get(url[, options][, callback])·
!!
url{s|ur}：请求地址
options{o}：同·request()·，且·method·始终设置为·GET·
callback{f}：回调函数，参数是·http.IncomingMessage·的实例
!!
此方法返回·http.ClientRequest·实例对象，并自动调用·req.end()·
··
const http = require('http')
const https = require('https') // 若请求的地址是 https 协议需改为此模块
const iconv = require('iconv-lite') // node 内置转码模块

// 获取 json 封装
const get = (url, success, fail) => http.get(url, res => {
	let data = ''
	res.setEncoding('utf8')
	res.on('data', dataItem => data += dataItem)
	res.on('end', () => success(JSON.parse(data).data))
}).on('error', fail)

// 获取网页封装（网页的中文编码方式不同需转码）
const getWeb = (url, success, fail) => http.get(url, res => {
	const data = []
	res.on('data', dataItem => data.push(dataItem))
	res.on('end', () => success(iconv.decode(Buffer.concat(data), 'utf8').toString())) // utf8、gbk、gb2312、CP936
}).on('error', fail)

get('http://www.xxx.com/data.json', res => {
	console.log('请求成功')
	console.log(res)
}, res => {
	console.error(\`出现错误: \${res.message}\`)
})
··

##IncomingMessage
·http.createServer()·回调的第一个参数，用于访问响应状态、消息头、以及数据，即对请求的输入
!!
'aborted' 事件：当请求中止时触发
'close' 事件：当底层连接已关闭时触发，每个响应只触发一次

method{s}：请求的方法
url{s}：请求的 URL 字符串，仅对从·http.Server·获取的请求有效
statusCode{n}：3 位的 HTTP 响应状态码，仅对从·http.ClientRequest·获取的响应有效
statusMessage{s}：HTTP 响应状态消息（原因短语），仅对从·http.ClientRequest·获取的响应有效

aborted{b}：请求是否已中止
complete{b}：是否已收到并成功解析完整的 HTTP 消息
httpVersion{s}：服务器请求时为客户端发送的 HTTP 版本，客户端响应时为服务器的 HTTP 版本
headers{o}：请求或响应的消息头对象，会合并重复项
trailers{o}：请求/响应的尾部消息头对象，仅在·'end'·事件中填充
rawHeaders{a}：原始请求头/响应头的列表，即 key 为偶数 value 为奇数，不合并重复项
rawTrailers{a}：原始的请求/响应的尾部消息头的键和值，仅在·'end'·事件中填充
socket：与连接关联的·net.Socket·对象，HTTPS 可使用·request.socket.getPeerCertificate()·获取客户端的身份验证详细信息

destroy([error])：终止连接
setTimeout(msecs, callback)：调用·message.connection.setTimeout(msecs, callback)·
!!

##ServerResponse
·http.createServer()·回调的第二个参数，对请求做出相关的响应，即对请求的输出
!!
'close' 事件：表明在调用·response.end()·或能够刷新之前终止了底层连接
'finish' 事件：响应发送后触发。即当响应头和主体的最后一段已经切换到操作系统以通过网络传输时，触发该事件，客户端不一定收到信息

connection：指向底层的套接字，即·response.socket·
finished{b}[false]：响应是否已完成，在·response.end()·执行之后变为·true·
headersSent{b}：是否已发送响应头
sendDate{b}[true]：是否自动生成并发送 Date 响应头
socket：指向底层的套接字
statusCode{n}：当使用隐式的响应头时（没有调用·response.writeHead()·），此属性控制在刷新响应头时将发送到客户端的状态码
statusMessage{s}：同·statusCode·，此属性控制状态消息

writeHead(statusCode[, statusMessage][, headers])：向请求发送指定响应头
writeContinue()：向客户端发送·HTTP/1.1 100 Continue·消息，表示应发送请求主体
writeProcessing()：向客户端发送·HTTP/1.1 102·处理消息，表明可以发送请求主体
write(chunk[, encoding][, callback])：要发送的数据
end([data][, encoding][, callback])：结束本次响应，如果传了·data·相当于·write(data, encoding)·之后再·end(callback)·

addTrailers(headers)：将 HTTP 尾部响应头添加到响应中，HTTP 需要发送·Trailer·响应头才能发出尾部响应头
getHeaders()：返回当前传出的响应头的浅拷贝，注意返回的对象不是从 JavaScript·Object·原型继承的，不能使用其原型方法
getHeader(name)：读出已排队但未发送到客户端的响应头，·name·不区分大小写，返回值的类型取决于提供给·setHeader()·的参数
getHeaderNames()：返回一个数组，其中包含当前传出的响应头的唯一名称。 所有响应头名称都是小写的
setHeader(name, value)：为隐式响应头设置单个响应头的值，若待发送的响应头中已存在则覆盖
hasHeader(name)：是否在传出的响应头中设置了由·name·标识的响应头
removeHeader(name)：移除排队等待中的隐式发送的响应头
setTimeout(msecs[, callback])：套接字的超时值
!!

##Server
·http.createServer()·返回的实例
!!
'checkContinue' 事件：每次收到·HTTP Expect: 100-continue·的请求时触发，如果未监听此事件，服务器将自动响应·100 Continue·
'checkExpectation' 事件：每次收到带有·HTTP Expect·请求头的请求时触发，其中值不是·100-continue·
'clientError' 事件：如果客户端连接触发·'error'·事件，则会在此处转发。 此事件的监听器负责关闭或销毁底层套接字
'close' 事件：当服务器关闭时触发
'connect' 事件：每次客户端请求·HTTP CONNECT·方法时触发
'connection' 事件：每次有请求时都会触发
'upgrade' 事件：每次客户端请求 HTTP 升级时发出

server.close([callback])：停止服务器接受新连接
server.listen()：启动 HTTP 服务器监听连接
server.listening{b}：服务器是否正在监听连接
server.setTimeout([msecs][, callback])：设置套接字的超时值，并在服务器对象上触发 'timeout' 事件

server.maxHeadersCount[2000]：限制最大传入请求头数。 如果设置为 0，则不会应用任何限制
server.headersTimeout[40000]：指定限制解析器等待接收完整 HTTP 请求头的时间
server.timeout[120000]：认定套接字超时的不活动毫秒数，即超时时间（单位毫秒）
server.keepAliveTimeout：服务器在完成写入最后一个响应之后，在销毁套接字之前需要等待其他传入数据的非活动毫秒数
!!

##ClientRequest
·http.request()·返回的实例，表示正在进行的请求
!!
'abort' 事件：当请求被客户端中止时触发
'connect' 事件：使用 CONNECT 方式响应请求时触发。如果未监听此事件，则接收 CONNECT 方法的客户端将关闭其连接
'continue' 事件：当服务器发送·100 Continue HTTP·响应时触发，通常是因为客户端发送请求主体的指令包含·Expect: 100-continue·
'information' 事件：服务器发送 1xx 响应时触发（不包括 101 Upgrade）。使用包含具有状态码的对象的回调触发此事件
'response' 事件：当收到此请求的响应时触发
'socket' 事件：将套接字分配给此请求后触发
'timeout' 事件：当底层套接字因不活动而超时时触发，这只会通知套接字已空闲，必须手动中止请求
'upgrade' 事件：每次服务器响应升级请求时发出

request.abort()：将请求标记为中止，调用此方法将导致响应中剩余的数据被丢弃并且套接字被销毁
request.write(chunk[, encoding][, callback])：发送一个请求主体的数据块
request.end([data[, encoding]][, callback])：完成发送请求
request.flushHeaders()：刷新请求头
request.getHeader(name)：读取请求中的一个请求头
request.removeHeader(name)：移除已定义到请求头对象中的请求头
request.setHeader(name, value)：为请求头对象设置单个请求头的值
request.setNoDelay([noDelay])：一旦将套接字分配给此请求并且连接了套接字，就会调用·socket.setNoDelay()·
request.setSocketKeepAlive([enable][, initialdelay])：同上也会调用·socket.setKeepAlive()·
request.setTimeout(timeout[, callback])：同上也会调用·socket.setTimeout()·

request.aborted：如果请求已中止，则此值是请求中止的时间，自 1970 年 1 月 1 日 00:00:00 UTC 以来的毫秒数
request.connection：参考·request.socket·
request.finished{b}[false]：如果调用了·request.end()·，则此属性将变为·true·
request.maxHeadersCount{n}[2000]：限制最大响应头数。设置为 0 则不会应用任何限制
request.socket：底层套接字
!!

##Agent
负责管理 HTTP 客户端的连接持久性和重用
!!
new Agent([options])：设置默认的·http.globalAgent·，供·http.request()·使用
	options{o}：要在代理上设置的可配置选项集，·socket.connect()·中的·options·也受支持
		keepAlive{b}[false]：对没有未完成的请求保持套接字，可以被用于将来的请求而无需重新建立 TCP 连接
		keepAliveMsecs{n}[1000]：当设置·keepAlive·为·true·时，指定·TCP Keep-Alive·数据包的初始延迟
		maxFreeSockets{n}[256]：当设置·keepAlive·为·true·时，在空闲状态下保持打开的套接字的最大数量
		maxSockets{n}[Infinity]：每个主机允许的套接字的最大数量
		timeout{n}：套接字的超时时间，单位毫秒

agent.createConnection(options[, callback])：生成用于 HTTP 请求的套接字或流
agent.keepSocketAlive(socket)：当 socket 与请求分离并且可以由 Agent 保留时调用
agent.reuseSocket(socket, request)：由于 keep-alive 选项而在持久化后将 socket 附加到 request 时调用
agent.destroy()：销毁代理当前使用的所有套接字，启用了 keepAlive 的代理后不再使用时调用
agent.getName(options)：获取一组请求选项的唯一名称，以判定一个连接是否可以被重用

agent.freeSockets：当启用 keepAlive 时代理正在等待使用的套接字数组，不要修改
agent.maxFreeSockets[256]：当启用 keepAlive 时设置在空闲状态下保持打开的最大套接字数
agent.maxSockets[Infinity]：决定代理可以为每个来源打开多少并发套接字。来源是·agent.getName()·的返回值
agent.requests：包含尚未分配给套接字的请求队列，不要修改
agent.sockets：包含当前代理正在使用的套接字数组，不要修改
!!

#url
##URL
全局·URL·对象（新增于 ^^v10.0.0^^），处理与解析 url，无需引入模块
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
用于处理文件路径和目录路径的实用工具，使用前需先引入：
··
const path = require('path')
··
注意·path·在不同的系统上会有不同的表现，·path·的属性方法有：
!!
path.win32：Windows 系统的特定实现的访问
path.posix：POSIX 系统的特定实现的访问
path.delimiter：返回系统的路径定界符，Windows 返回·;·，POSIX 返回·:·，例如用此属性分割·process.env.PATH·
path.basename(path [, ext])：返回参数·path·的最后一部分，即文件名或目录名，若是目录名则尾部的分隔符将被忽略
path.dirname(path)：返回参数·path·除去最后一部分的部分，和·basename()·相反，尾部的分隔符将被忽略
path.extname(path)：返回参数·path·的扩展名，即从最后一次出现·.·和后面的字符串部分，若·.·只有一个且作为开头将返回空字符串
path.parse(path)：解析参数路径返回一个对象，尾部的目录分隔符将被忽略，返回形如·{ root, dir, base, ext, name}·
path.format(pathObject)：解析路径对象返回字符串，和·path.parse()·相反，注意·dir·可覆盖·root·，·base·可覆盖·name·和·ext·
path.normalize(path)：解析路径，即解析·.·（当前目录）和·..·（返回上级目录），多个连续的分隔符只保留一个， 尾部的分隔符会保留
path.join([...paths])：用路径分隔符连接并解析多个参数路径片段，解析规则同·normalize()·
path.resolve([...paths])：将路径或路径片段的序列解析为绝对路径，例如·path.resolve('/foo', '/bar', 'baz')·返回·/bar/baz·
path.isAbsolute(path)：返回一个 Boolean，检测参数·path·是否为绝对路径
path.relative(from, to)：根据当前工作目录返回·from·到·to·的相对路径。 若·from·和·to·相同则返回空字符串
path.sep：返回平台特定的路径片段分隔符，Windows 为·\\·，POSIX 为·/·
path.toNamespacedPath(path)：仅在 Windows 系统上有效，返回给定·path·的等效名称空间前缀路径
!!

##basename()
·path.basename(path [, ext])·：返回参数·path·最后一部分，即文件名或目录名，若是目录名则尾部的分隔符将被忽略
!!
path{String}：路径
ext{String}：文件扩展名，若路径的最后部分是文件名，表示不返回扩展名部分
!!
··
path.basename('/foo/bar/baz/asdf/quux.html') // quux.html
path.basename('/foo/bar/baz/asdf/quux.html', '.html') // quux

// Windows 风格路径在 POSIX 系统上的结果不同
path.basename('C:\\\\temp\\\\myfile.html') // myfile.html（Windows）
path.basename('C:\\\\temp\\\\myfile.html') // C:\\temp\\myfile.html（POSIX）

// 使用 Windows 文件路径时想获得一致的结果需用 path.win32
path.win32.basename('C:\\\\temp\\\\myfile.html') // myfile.html
// 使用 POSIX 文件路径时想获得一致的结果需用  path.posix
path.posix.basename('/tmp/myfile.html') // myfile.html
··

##parse()
·path.parse(path)·：解析参数路径返回一个对象，尾部的目录分隔符将被忽略，返回的对象将具有以下属性：
!!
root：根路径
dir：·dirname()·获取的除去最后一部分的部分
base：·basename()·获取的最后一部分
ext：·extname()·获取的扩展名部分
name：获取的最后一部分的除去扩展名的部分
!!
··
// POSIX 系统
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /¿    home/user/dir /¿ file  .txt "
└──────┴──────────────┴──────┴─────┘

// Windows 系统
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\\      path\\dir   \\ file  .txt "
└──────┴──────────────┴──────┴─────┘
··
··
path.parse('C:\\\\path\\\\dir\\\\file.txt')
/*
返回：{
	root: 'C:\\',
	dir: 'C:\\path\\dir',
	base: 'file.txt',
	name: 'file',
	ext: '.txt'
}
*/
··

##normalize()
·path.normalize(path)·：解析路径，即解析·.·（当前目录）和·..·（返回上级目录），多个连续的分隔符只保留一个， 尾部的分隔符会保留
··
path.normalize('/foo/bar//¿baz/asdf/quux/..') // /¿foo/bar/baz/asdf
path.normalize('C:\\\\temp\\\\\\\\foo\\bar\\\\..\\\\') // C:\\temp\\foo\\
// Windows \\ 和 /¿ 都支持，所以 /¿ 会替换为首选的 \\
path.win32.normalize('C:/¿temp\\\\\\\\/\\\\/\\\\/foo/bar') // C:\\temp\\foo\\bar
··

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
将对象生成字符串：·qs.stringify(obj[, sep[, eq[, options]]])·
!!
obj{o}：需要生成的对象
sep{s}[&]：多个键值对之间的连接符
eq{s}[=]：键名与键值之间的连接符
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
模仿标准 POSIX 函数的方式与文件系统进行交互，使用前需先引入：
··
const fs = require('fs')
··
所有文件系统操作都具有同步和异步的形式，异步的形式总是将完成回调作为其最后一个参数
异步回调函数的第一个参数如果操作成功为·null·或·undefined·，失败为异常对象，处理同步操作的异常可使用·try/catch·

##常用方法
!!
fs.copyFile/Sync(src, dest[, flags], callback)：将 src 拷贝到 dest。 若 dest 已经存在则覆盖
fs.mkdir/Sync(path[, options], callback)：创建目录
fs.mkdtemp/Sync(prefix[, options], callback)：创建一个唯一的临时目录
fs.readdir/Sync(path[, options], callback)：读取目录
fs.readFile/Sync(path[, options], callback)：读取文件
fs.writeFile/Sync(file, data[, options], callback)：将数据写入到一个文件，如果文件已存在则覆盖该文件
fs.rename/Sync(oldPath, newPath, callback)：重命名文件，如果·newPath·已存在，则会覆盖它
fs.rmdir/Sync(path, callback)：删除目录
fs.unlink/Sync(path, callback)：删除文件或符号链接
fs.stat/Sync(path[, options], callback)：获取文件信息状态
fs.watch(filename[, options][, listener])：监听文件或目录的变化，此方法比·fs.watchFile()·和·fs.unwatchFile()·更高效
!!

##不常用方法
!!
文件路径：可接受字符串、Buffer、使用·file:·协议的 URL 对象
URL 对象的支持：仅支持使用·file:·协议的 WHATWG URL 对象，例如·new URL('file:///tmp/hello')·
文件描述符：所有打开的文件都会分配一个数字型的文件描述符，当操作完成时关闭描述符至关重要，否则将导致内存泄漏、应用程序崩溃
	·fs.open()·用于分配新的文件描述符。分配后文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息
线程池的使用：文件系统 API 除了·fs.FSWatcher()·和那些显式同步的之外，都使用 libuv 的线程池，参考 @[UV_THREADPOOL_SIZE|http://nodejs.cn/s/6DjmgS]

fs.Dirent 类：当调用·fs.readdir/Sync()·将·withFileTypes·设为·true·时，生成的数组将填充·fs.Dirent·对象，而不是字符串或 Buffer
fs.FSWatcher 类：调用·fs.watch()·时返回，此对象是·EventEmitter·的实例，每当修改指定监视的文件，就会触发·'change'·事件
fs.ReadStream 类：成功调用·fs.createReadStream()·将返回一个新的·fs.ReadStream·可读流对象
fs.WriteStream 类：·WriteStream·是一个可写流
fs.Stats 类：提供有关文件的信息

fs.constants：返回包含文件系统操作常用常量的对象，参阅 @[FS 常量|http://nodejs.cn/s/4UdXHr]
当需要·flag·选项采用字符串时参考@[文件系统标志|http://nodejs.cn/api/fs.html#fs_file_system_flags]

fs.appendFile/Sync(path, data[, options], callback)：将数据追加到文件，如果文件尚不存在则创建该文件
fs.createReadStream(path[, options])：创建可读流
fs.createWriteStream(path[, options])：创建可写流
fs.existsSync(path)：（异步版本已废弃）如果路径存在则返回 true，否则返回 false
fs.open/Sync(path[, flags[, mode]], callback)：打开文件
fs.close/Sync(fd, callback)：关闭文件（^^使用·fs.read·和·fs.write·需使用·fs.open·打开文件和·fs.close·关闭文件^^）
fs.read/Sync(fd, buffer, offset, length, position, callback)：读取数据（更底层的操作）
fs.write/Sync(fd, buffer[, offset[, length[, position]]], callback)：将·buffer·写入到·fd·指定的文件（更底层的操作）
fs.write/Sync(fd, string[, position[, encoding]], callback)：将·string·写入到·fd·指定的文件（更底层的操作）
fs.watchFile(filename[, options], listener)：监听文件的变化
fs.unwatchFile(filename[, listener])：停止监听文件变化

fs.access/Sync(path[, mode], callback)：测试用户对·path·指定的文件或目录的权限，mode 参考@[文件可访问性的常量|http://nodejs.cn/s/qZfpqk]
	不建议在调用打开、读取或写入文件方法之前使用·fs.access()·，其他进程可能会在两个调用之间更改文件的状态而引入竞态条件
fs.(f/l)chmod/Sync(path, mode, callback)：更改文件的权限（^^·f·开头表示以文件描述符作为参数，·l·开头表示不解析符号链接^^）
fs.(f/l)chown/Sync(path, uid, gid, callback)：更改文件的所有者和群组
fs.(f/l)stat/Sync(path[, options], callback)：获取文件信息状态
fs.(f)truncate/Sync(fd[, len], callback)：将文件截短到指定长度
fs.(f)utimes/Sync(path, atime, mtime, callback)：更改·path·指向的对象的文件系统时间戳
fs.f(data)sync/Sync(fd, callback)：同步文件的内核状态和存储设备，@[参阅|https://blog.csdn.net/xinghuah/article/details/80487525]
fs.link/Sync(existingPath, newPath, callback)：为文件创建一个新名称
fs.symlink/Sync(target, path[, type], callback)：可以跨系统为文件创建一个新名称
fs.readlink/Sync(path[, options], callback)：读取符号链接
fs.realpath/Sync(path[, options], callback)：通过解析·.·、·..·和符号链接异步地计算规范路径名
fs.realpath/Sync.native(path[, options], callback)：在 Linux 上使用时与 musl libc 的链接相关
!!

##文件重命名 demo
将文件名的下划线替换成短横线
假设有个 demo 文件夹，其中有 img 文件夹和 replace.js，img 文件夹中有若干张名称中包含下划线的图片
·replace.js·：
··
const fs = require('fs')
const path = require('path')
const src = 'img'

// 同步读取文件夹，返回值为文件夹内的所有文件名组成的数组
fs.readdirSync(src).forEach(filename => {
	const oldPath = path.join(src, filename)
	const newPath = oldPath.replace(/_/g, '-')
	fs.rename(oldPath, newPath, err => console.log(filename + (err ? ' 替换失败！！！' : ' 替换成功:)')))
})
··

##文件修改 demo
假设有个 demo 文件夹，其中有 header.html、footer.html、index.html、replace.js
··
// header.html
<header>网页的头部</header>

// footer.html
<footer>网页的底部</footer>

// index.html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>index</title>
		<style type="text/css">
			body { font-size: 32px; text-align: center; }
			header { color: #fff; line-height: 100px; background-color: #08f; }
			header { color: #fff; line-height: 100px; background-color: #666; }
			section { line-height: 300px; }
		</style>
	</head>
	<body>
		<!-- import header.html -->
		<section>网页的内容</section>
		<!-- import footer.html -->
	</body>
</html>
··
现在实时将·index.html·文件中的·<!-- import xxx.html -->·部分替换为对应文件的内容，并输出新的文件·new.html·
·replace.js·：
··
const fs = require('fs')
const filename = 'index.html'
const newfilename = 'new.html'
const replaceReg = /<!-- import (.+) -->/gi

const replaceFile = filename => {
	// 读取文件，默认返回 buffer，需指定编码方式为 utf8，然后对应替换内容
	const data = fs.readFileSync(filename, 'utf8').replace(replaceReg, (res, $1) => fs.readFileSync($1, 'utf8'))
	// 生成新的文件
	fs.writeFile(newfilename, data, 'utf8', err => console.log(newfilename + (err ? ' 生成失败！！！' : ' 生成成功:)')))
}

// 默认先执行一次
replaceFile(filename)

// 监听文件，变更后重新生成
fs.watch(filename, eventType => {
	if (eventType === 'change') {
		console.log(filename + '发生了改变，重新生成...')
		replaceFile(filename)
	}
})
··

##目录索引 demo
在项目根目录运行即可打印此项目的所有文件列表
··
const fs = require('fs')
const path = require('path')
const noDirReg = /node_modules|\\.git/ // 不查找 node_modules 和 .git 内部的文件
let fullpath = ''

const query = filePath => {
	fs.readdirSync(filePath).forEach(filename => {
		const filedir = path.join(filePath, filename)
		fullpath += '\\n' + filedir
		if (fs.statSync(filedir).isDirectory() && !noDirReg.test(filename)) query(filedir) // 如果是文件夹则继续循环
	})
}

query('./') // ./ 为本 js 所在目录，/ 以当前盘符为起点，空字符串报错
console.log(fullpath.replace('\\n', ''))
··

#timer
定时器，定时器类的方法属于全局对象，无需引入模块
!!
setImmediate(callback[, ...args])：返回一个 Immediate 对象
setTimeout(callback, delay[, ...args])：返回一个 Timeout 对象
setInterval(callback, delay[, ...args])：返回一个 Timeout 对象

Immediate 对象
	immediate.ref()：让 Immediate 对象处于活动状态，多次调用无效，默认是活动的，在调用了·immediate.unref()·之后使用
	immediate.unref()：让 Immediate 对象不需要 Node.js 事件循环保持活动状态
Timeout 对象
	timeout.ref()：让 Timeout 对象处于活动状态，多次调用无效，默认是活动的，在调用了·timeout.unref()·之后使用
	timeout.unref()：让 Timeout 对象不需要 Node.js 事件循环保持活动状态
	timeout.refresh()：刷新重置定时器，将定时器的开始时间设置为当前时间，若对已触发的定时器上使用将重新激活定时器

clearImmediate(immediate)：传入一个 Immediate 对象以清除定时器
clearTimeout(timeout)：传入一个 Timeout 对象以清除定时器
clearInterval(timeout)：传入一个 Timeout 对象以清除定时器
!!

##介绍
因为定时器函数是全局变量，所以不需要调用·require('timers')·来使用
Node.js 中的定时器函数 API 与浏览器类似，但内部实现（基于 @[Node.js 事件循环构建|http://nodejs.cn/s/jRLbrb]）不同，@[参考博客|http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html]
!!
setTimeout()：执行一次，同浏览器
setInterval()：循环执行，同浏览器
setImmediate()：执行一次，没有延迟时间参数，顺序大概率次于 0 秒的 setTimeout，也可能在前面，取决于运行环境
process.nextTick()：执行一次，本轮循环执行的最快异步任务，Promise 对象的回调函数的执行顺序紧随其后
!!
异步任务可以分成追加在本轮循环或次轮循环
Node 中·process.nextTick·和·Promise·的回调函数追加在本轮循环，即同步任务一旦执行完成，就开始执行它们
而·setTimeout、setInterval、setImmediate·的回调函数，追加在次轮循环
··
// test.js
setTimeout(() => console.log(1))
setImmediate(() => console.log(2))
process.nextTick(() => console.log(3))
Promise.resolve().then(() => console.log(4))
(() => console.log(5))()

// 打印
5 // 同步任务最早执行
3 // 本轮任务最后追加
4 // 本轮任务最后追加
1 // 次轮循环
2 // 次轮循环
··
##本轮循环
·process.nextTick()·总早于·Promise·
··
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 1
// 3
// 2
// 4
··
##次轮循环
由于·setTimeout·在 timers 阶段执行，而·setImmediate·在 check 阶段执行。所以，·setTimeout·会早于·setImmediate·完成
··
setTimeout(() => console.log(1))
setImmediate(() => console.log(2))
··
上面代码应该先输出 1，再输出 2，但是实际执行的时候，结果却是不确定，有时还会先输出 2，再输出 1。
这是因为 setTimeout 的第二个参数默认为 0。但是实际上，Node 做不到 0 毫秒，最少也需要 1 毫秒
根据官方文档，第二个参数的取值范围在 1 毫秒到 2147483647 毫秒之间。也就是说，·setTimeout(f, 0)·等同于·setTimeout(f, 1)·
但是，下面的代码一定是先输出 2，再输出 1
··
const fs = require('fs')

fs.readFile('test.js', () => {
	setTimeout(() => console.log(1))
	setImmediate(() => console.log(2))
})
··
上面代码会先进入 I/O callbacks 阶段，然后是 check 阶段，最后才是 timers 阶段。因此，·setImmediate·才会早于·setTimeout·执行

#连接数据库

##SQL Server
推荐安装 @[tedious|http://tediousjs.github.io/tedious/]：
··
cnpm install tedious
··
使用：
··
// tedious 主要分为 Connection 连接数据库和 Request 操作数据库
const { Connection, Request } = require('tedious')

// 初始化
const connection = new Connection({
	server: '127.0.0.1', // 服务器 IP 地址或域名
	authentication: {
		type: 'default',
		options: {
			userName: 'sa', // 用户名
			password: '******' // 密码
		}
	},
	options: {
		database: 'test', // 要连接的数据库
		rowCollectionOnRequestCompletion: true  // 让下面 new Request 回调的第三个参数接收返回的值
	}
})

// 连接数据库使用 'connect' 事件
connection.on('connect', err => {
	if (err) {
		console.log({ message: err.message, code: err.code })
	} else {
		console.log('登录成功')

		// 查询数据
		const sql = 'select * from student' // 要执行的语句
		const request = new Request(sql, (err, rowCount, rows) => {
			// 此回调在查询完成时调用
			if (err) {
				console.log(err)
			} else {
				// rows 是由每行组成的数组
				// 每行又是由每个单元格组成的数组
				// 每个单元格又是由 value（单元格的值）和 metadata（单元格的属性对象，如列名和类型）组成的对象
				/* 形如
					[
						[ { value: '1', metadata }, { value: '张三', metadata }... ]
						[ { value: '2', metadata }, { value: '李四', metadata }... ]
					]
				*/
				const data = rows.map(rowItem => {
					const obj = {}
					rowItem.forEach(cell => obj[cell.metadata.colName] = cell.value)
					return obj
				})
				console.table(data)
				console.log(\`\${rowCount} 行\`)
			}
			// 关闭连接
			connection.close()
		})
		// 执行 request 操作
		connection.execSql(request)
	}
})

// bulkLoad 可执行批量插入，具体参考官方文档
··

@@
node 官网|https://nodejs.org/en/
node 中文网|http://nodejs.cn/
npm 官网|https://www.npmjs.com/
npm 中文网|https://www.npmjs.cn/
有效学习 Node.js - 知乎|https://www.zhihu.com/question/19793473
系统学习 Node.js - 知乎|https://www.zhihu.com/question/21567720
CNode 社区|https://cnodejs.org/
@@

&2019/6/20
`