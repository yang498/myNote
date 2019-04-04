commonData.tool.gulp.content = `
	#起步
	gulp 是个前端构建工具，它充分借鉴了 unix 操作系统的管道（pipe）思想，在操作上要比同类型的 grunt 简单一点

	##安装
	gulp 基于 node 环境，所以需先安装 @[node 环境|#js/node]，全局安装 gulp：
	··
	cnpm install gulp  -g
	··
	查看版本号，执行：
	··
	gulp -v
	··
	然后在需要的项目中安装 gulp：
	··
	cnpm install gulp
	··
	若需要将 gulp 写进项目 package.json 文件的依赖中则可以加上·--save-dev·：
	··
	cnpm install gulp  --save-dev
	··
	在全局安装 gulp 后又需要在项目中安装一次，是为了版本的灵活性和项目的独立性

	##gulpfile.js
	·gulpfile.js·是 gulp 工具的主文件，通常在项目的根目录，不推荐放置在其他文件夹内，不然路径要多写了
	创建任务打印 hello world：
	··
	var gulp = require('gulp')
	gulp.task('hello', function () {
		console.log('hello world')
	})
	··
	在存放·gulpfile.js·文件的目录下执行·gulp hello·即可运行这个任务，若不指定任务名即·gulp·，将会执行任务名为·default·的默认任务

	#API

	##src()
	gulp.src(globs[, options])：匹配文件
	globs：文件匹配模式（类似正则表达式），用来匹配文件路径包括文件名，也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组
	options：可选参数，通常情况下不需要用到
	!!
	options：{
		base{String}：默认值为基础路径，gulp.dest()会介绍
		buffer{Boolean}[true]：设置为 false 将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式，这在处理一些大文件的时候将会很有用
		read{Boolean}[true]：设置为 false 那么 file.contents 会返回空值（null），也就是并不会去读取文件
	}
	!!
	gulp内部使用了node-glob模块来实现其文件匹配功能，可以使用下面这些特殊的字符来匹配我们想要的文件：
	·*·：匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
	·**·：匹配路径中的0个或多个目录及其子目录，需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。
	·?·：匹配文件路径中的一个字符（不会匹配路径分隔符）
	·[...]·：匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则表达式中的用法
	·!(pattern|pattern|pattern)·：匹配任何与括号中给定的任一模式都不匹配的
	·?(pattern|pattern|pattern)·：匹配括号中给定的任一模式0次或1次，类似于js正则中的·(pattern|pattern|pattern)?·
	·+(pattern|pattern|pattern)·：匹配括号中给定的任一模式至少1次，类似于js正则中的·(pattern|pattern|pattern)+·
	·*(pattern|pattern|pattern)·：匹配括号中给定的任一模式0次或多次，类似于js正则中的·(pattern|pattern|pattern)*·
	·@(pattern|pattern|pattern)·：匹配括号中给定的任一模式1次，类似于js正则中的·(pattern|pattern|pattern)·
	比如：
	·*· 能匹配 a.js，x.y，abc，abc/，不能匹配 a/b.js
	·*.*· 能匹配 a.js，style.css，a.b，x.y，不能匹配 x/y.z
	·*/*/*.js· 能匹配 a/b/c.js，x/y/z.js，不能匹配a/b.js，a/b/c/d.js
	·**· 能匹配 abc，a/b.js，a/b/c.js，x/y/z，x/y/z/a.b，能用来匹配所有的目录和文件
	·**/*.js· 能匹配 foo.js，a/foo.js，a/b/foo.js，a/b/c/foo.js
	·a/**/z· 能匹配 a/z，a/b/z，a/b/c/z，a/d/g/h/j/k/z
	·a/**b/z· 能匹配 a/b/z，a/ab/z，不能匹配a/x/ab/z，因为只有**单独出现才能匹配多级目录
	·?.js· 能匹配 a.js，b.js，c.js，不能匹配 ab.js
	·a??· 能匹配 a.b，abc，不能匹配ab/，因为它不会匹配路径分隔符
	·[xyz].js· 只能匹配 x.js，y.js，z.js，不会匹配xy.js，xyz.js，整个中括号只代表一个字符
	·[^xyz].js· 能匹配 a.js,b.js,c.js等非x.js,y.js,z.js
	多种匹配模式使用数组：·gulp.src(['*.html', 'css/*.css', 'js/*.js'])·
	排除模式：在数组中的单个匹配模式前加上!可添加排除模式，它会在匹配的结果中排除这个匹配，要注意一点的是不能在数组中的第一个元素中使用排除模式
	··
	gulp.src([*.js, '!b*.js'])	// 匹配所有不是以b开头的js文件
	gulp.src(['!b*.js', *.js])	// 排除无效，不能出现在数组的第一个元素中
	··
	展开模式：以花括号作为定界符，根据内容展开为多个模式，最后匹配的结果为所有展开的模式相加起来得到的结果
	·a{b,c}d· 会展开为 abd，acd
	·a{b,}c· 会展开为 abc，ac
	·a{0..3}d· 会展开为 a0d，a1d，a2d，a3d
	·a{b,c{d,e}f}g· 会展开为 abg，acdfg，acefg
	·a{b,c}d{e,f}g· 会展开为 abdeg，acdeg，abdeg，abdfg

	##dest()
	gulp.dest(path[, options])：写入文件
	path：写入文件的路径String or Function（待加样式）可以在函数中返回相应路径
	options：可选参数，通常情况下不需要用到
	··
	options: {
		cwd{String}[process.cwd()]: 输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效
		mode{String}[0777]: 八进制权限字符，用以定义所有在输出目录中所创建的目录的权限
	}
	··
	gulp的使用流程一般是这样子的：
	&nbsp;&nbsp;&nbsp;&nbsp;首先通过·gulp.src()·方法获取到要处理的文件流，然后把文件流通过·pipe()·方法导入到gulp的插件中，最后把经过插件处理后的流再通过·pipe()·方法导入到·gulp.dest()·中，·gulp.dest()·方法则把流中的内容写入到文件中
	&nbsp;&nbsp;&nbsp;&nbsp;给·gulp.dest()·传入的路径参数，只能用来指定要生成的文件的^^目录^^，而不能指定生成文件的^^文件名^^，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以^^生成的文件名是由导入到它的文件流决定^^的，即使给它^^传入带有文件名^^的路径参数，然后它也会把这个文件名^^当做是目录名^^，若输出的文件不存在将会自动创建，有则覆盖，例如：
	··
	var gulp = require('gulp')
	gulp.src('js/juery.js')
		.pipe(gulp.dest('dist/juery.min.js'))
	// 最终生成的文件路径为 dist/juery.min.js/jquery.js，而不是dist/juery.min.js
	··
	·gulp.dest(path)·生成的文件路径是传入的^^path^^参数后面再加上·gulp.src()·中有通配符开始出现的那部分路径。例如：
	··
	var gulp = reruire('gulp');

	gulp.src('script/**/*.js')	// 有通配符开始出现的那部分路径为 **/*.js
		.pipe(gulp.dest('dist'))	// 最后生成的文件路径为 dist/**/*.js
	// 比如 **/*.js 匹配到 js/jquery.js，则生成 dist/js/jquery.js

	gulp.src('script/js/jquery.js')	// 没有通配符取最后的文件名
		.pipe(gulp.dest('dist'))	// 最后生成的文件路径为 dist/jquery.js

	gulp.src('script/**/jquery.js')	// 有通配符开始部分为 **/jquery.js
		.pipe(gulp.dest('dist'))	// 最后生成的文件路径为 dist/**/jquery.js

	gulp.src('script/*')	// 有通配符出现的那部分路径为 *
		.pipe(gulp.dest('dist'))	// 则最后生成的文件路径为 dist/*
	··
	通过指定·gulp.src()·方法第二个参数的·base·属性可以指定改变·gulp.dest()·生成的文件路径，比如·gulp.src('app/src/**/*.css')·此时base的值为 app/src，所以给·gulp.dest()·传入的路径所生成的就是替换掉·gulp.src()·方法中的base路径，比如：
	··
	gulp.src(js/lib/*.js)	// 没有配置base参数，此时默认的base路径为js/lib
		.pipe(gulp.dest('build'))	// 生成的文件路径为 build/*.js
    // 假设匹配到的文件为 js/lib/jquery.js 则生成 build/jquery.js

	gulp.src(js/lib/*.js, {base : 'js'})	// 配置了base参数，此时base路径为js
		.pipe(gulp.dest('build'))	// 此时生成的文件路径为 build/lib/*.js
	// 假设匹配到的文件为 js/lib/jquery.js 则生成 build/lib/jquery.js
	··
	用·gulp.dest()·把文件流写入文件后，文件流仍然可以继续使用，也就是后续可以继续pipe回调

	##task()
	gulp.task(name[, deps], fn)：定义任务
	name：自定义任务名
	deps：是当前任务需要依赖的其他任务名，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖可省略
	fn：为任务函数，要执行的代码都写在里面。该参数也是可选的
	··
	gulp.task('one', ['two', 'three', 'four'], function() {
		// 在'two', 'three', 'four'执行完后执行
	});
	··
	但是如果所依赖的任务是异步的，就要注意了，gulp并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务。例如：
	··
	gulp.task('one', function(){
		setTimeout(function(){
			console.log('one is done')
		}, 5000)
	})

	// two任务虽然依赖于one任务，但并不会等到one任务中的异步操作完成后再执行
	gulp.task('two', ['one'], function(){
		console.log('two is done')
	})

	// gulp two
	// two is done
	// one is done
	··
	有3个方法可在异步完成之后再执行
	1、在异步操作完成后执行一个回调函数来通知gulp这个异步任务已经完成，这个回调函数就是任务函数的第一个参数
	··
	gulp.task('one',function(call){	// call为任务函数提供的回调，通知任务完成
		setTimeout(function(){
			console.log('one is done')
			call()	// 执行回调，表示这个异步任务已经完成
		},5000)
	})

	// 这时two任务会在one任务中的异步操作完成后再执行
	gulp.task('two', ['one'], function(){
		console.log('two is done')
	})
	··
	2、定义任务时返回一个流对象，适用于任务就是操作gulp.src获取到的流的情况
	··
	gulp.task('one',function(call){
		var stream = gulp.src('client/**/*.js')
			.pipe(dosomething())	// dosomething()中有某些异步操作
			.pipe(gulp.dest('build'))
		return stream
	});

	gulp.task('two', ['one'], function(){
		console.log('two is done')
	})
	··
	3、返回一个promise对象
	··
	var Q = require('q')	// 一个异步处理的库 https://github.com/kriskowal/q
	gulp.task('one',function(){
		var deferred = Q.defer()
		setTimeout(function() {
			deferred.resolve()
		}, 5000)
		return deferred.promise
	})

	gulp.task('two', ['one'], function(){
		console.log('two is done')
	})
	··

	##watch()
	gulp.watch(glob[, opts], tasks)：监听文件变化
	glob：要监听的文件匹配模式，规则和用法与·gulp.src()·方法中的glob相同
	opts：可选参数，通常情况下不需要用到
	tasks：为文件变化后要执行的任务，为一个数组
	··
	gulp.task('uglify',function(){
		// code
	})
	gulp.task('reload',function(){
		// code
	})
	gulp.watch('js/*.js', ['uglify', 'reload'])
	··
	还有另外一种使用方式：·gulp.watch(glob[, opts, call])·
	call参数为一个函数。每当监视的文件发生变化时，就会调用这个函数，并且会给它传入一个对象，该对象包含了文件变化的一些信息：type、path，type属性为变化的类型，可以是·added·新增、·changed·改变 、·deleted·删除，path属性为发生变化的文件的路径
	··
	gulp.watch('js/**/*.js', function(res){
		console.log(res.type)	// 变化的类型
		console.log(res.path)	// 变化的文件的路径
	});
	··

	#常用插件

	##自动加载
	安装：·cnpm install --save-dev gulp-load-plugins·
	通常在gulpfile.js加载插件是这样子的：
	··
	var gulp = require('gulp'),
		a = require('gulp-a'),
		b = require('gulp-b'),
		c = require('gulp-c'),
		d = require('gulp-d'),
		e = require('gulp-e'),
		f = require('gulp-f'),
		g = require('gulp-g')
	··
	·gulp-load-plugins·这个插件能自动加载package.json文件里的gulp插件。例如package.json文件里的依赖是这样的：
	··
	{
		"devDependencies": {
			"gulp": "~3.6.0",
			"gulp-rename": "~1.2.0",
			"gulp-ruby-sass": "~0.4.3",
			"gulp-load-plugins": "~0.5.1"
		}
	}
	··
	在gulpfile.js中
	··
	var gulp = require('gulp')
	var plugins = require('gulp-load-plugins')()	// 加载并运行
	··
	要使用gulp-rename和gulp-ruby-sass的时候，就可以用·plugins.rename·和·plugins.rubySass·来代替了，也就是原始插件名去掉gulp-前缀转驼峰命名，	实质就是做了如下转换
	··
	plugins.rename = require('gulp-rename')
	plugins.rubySass = require('gulp-ruby-sass')
	··
	·gulp-load-plugins·并不会一开始就加载所有package.json里的gulp插件，而是在我们需要用到某个插件的时候，才去加载那个插件
	注意：因为·gulp-load-plugins·是通过package.json文件来加载插件的，所以要确定需要的插件已经写入到了package.json文件里，并且这些插件都已经安装好了

	##重命名
	安装：·cnpm install --save-dev gulp-rename·
	用·gulp.dest()·方法写入文件时，文件名使用的是文件流中的文件名，要想改变可以在写入之前用·gulp-rename·插件来改变文件流中的文件名
	··
	var gulp = require('gulp'),
		rename = require('gulp-rename'),
		uglify = require("gulp-uglify")

	gulp.task('rename', function() {
		gulp.src('js/jquery.js')
			.pipe(uglify())  // 压缩
			.pipe(rename('jquery.min.js')) // 重命名为jquery.min.js
			.pipe(gulp.dest('js'))
	})
	··

	##html文件压缩
	安装：·cnpm install --save-dev gulp-minify-html·
	··
	var gulp = require('gulp'),
		minifyHtml = require("gulp-minify-html")

	gulp.task('minify-html', function() {
		gulp.src('html/*.html')
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist/html'))
	})
	··

	##css文件压缩
	安装：·cnpm install --save-dev gulp-minify-css·

	##js文件压缩
	安装：·cnpm install --save-dev gulp-uglify·

	##图片压缩
	安装：·cnpm install --save-dev gulp-imagemin·

	##文件合并
	安装：·cnpm install --save-dev gulp-concat·
	用来把多个文件合并为一个文件，可以用来合并所有js或css等文件，这样就能减少页面的http请求数了
	··
	var gulp = require('gulp'),
		concat = require("gulp-concat")

	gulp.task('concat', function () {
		gulp.src('js/*.js')
		.pipe(concat('all.js')) 	// 合并匹配到的js文件并命名为 "all.js"
		.pipe(gulp.dest('dist/js'))
	})
	··

	##js代码检查
	安装：·cnpm install --save-dev gulp-jshint·
	··
	var gulp = require('gulp'),
		jshint = require("gulp-jshint")

	gulp.task('jsLint', function () {
		gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter())	// 输出检查结果
	})
	··

	## 编译less和sass
	安装less：·cnpm install --save-dev gulp-less·
	安装sass：·cnpm install --save-dev gulp-sass·
	··
	var gulp = require('gulp'),
		sass = require("gulp-sass")

	gulp.task('compile-sass', function () {
		gulp.src('sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
	})
	··

	##浏览器自动刷新
	###Browsersync
	Browsersync 能让浏览器实时、快速响应文件的更改并自动刷新页面，同一个 WiFi 中的任何设备都可以方便地访问到
	安装：
	··
	cnpm install --save-dev browser-sync
	··
	在命令行中使用：
	··
	browser-sync start --server --files "css/*.css"
	··
	多个文件使用逗号隔开：
	··
	browser-sync start --server --files "css/*.css, *.html"
	··
	如果已经有其他本地服务器环境 PHP 或类似的，BrowserSync 将通过代理 URL(localhost:3000) 来查看网站：
	··
	browser-sync start --proxy "主机名（ip/域名）" "css/*.css"
	··
	若本地创建了服务器环境并绑定了 Browsersync.cn 来访问，Browsersync 将提供一个新的地址 localhost:3000 来访问 Browsersync.cn：
	··
	browser-sync start --proxy "Browsersync.cn" "css/*.css"
	··
	在 gulp 中的 gulpfile.js 使用：
	··
	var gulp        = require('gulp')
	var browserSync = require('browser-sync').create()

	// 静态服务器
	gulp.task('browser-sync', function() {
		browserSync.init({
			server: {
				baseDir: './'
			}
		})
	})

	// 代理模式
	gulp.task('browser-sync', function() {
		browserSync.init({
			proxy: '你的域名或IP'
		})
	})
	··
	###gulp-livereload
	安装：
	··
	cnpm install --save-dev gulp-livereload
	··
	下载安装浏览器插件：LiveReload，目前是 2.1.0 版本
	livereload 只负责实时刷新，但前提需要开启静态服务，即需要安装 http-server
	全局安装静态服务：
	··
	cnpm install http-server -g
	··
	开启服务在根目录运行
	··
	http-server
	··
	gulpfile.js：
	··
	// 监听文件的改变刷新浏览器
	gulp.task('watch', function() {
		P.livereload.listen()
		gulp.watch(['index.html', 'css/*.css', 'scss/*.scss', 'js/*.js', 'data/**/*.js'], function (file) {
			P.livereload.changed(file.path)
		})
	})
	··
	再开一个命令行窗口开启监听
	··
	gulp watch
	··
	http-server 默认端口是 8080，在浏览器打开·localhost:8080·会默认访问 index.html，或自己加上路径
	在 LiveReload 插件上点一下以开启，插件图标上的空心圆表示未开启，实心圆表示开启
	但每次刷新都有缓存是什么鬼？？？
	改？？？
	··
	document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
	··
	相比 Browsersync 来说还要插件，功能也少了点，推荐使用 Browsersync

	#实践
	##开始
	安装自动加载：
	··
	cnpm install --save-dev gulp-load-plugins
	··
	安装 Browsersync：
	··
	cnpm install --save-dev browser-sync
	··
	gulpfile.js：
	··
	const gulp = require('gulp')
	const P = require('gulp-load-plugins')()
	const browserSync = require('browser-sync').create()

	gulp.task('serve', function () {
		// 开启服务
		browserSync.init({
			server: {
				baseDir: "./"
			}
		})

		// 监听文件，如果发生改动则刷新浏览器
		gulp.watch(['index.html', 'css/*.css', 'scss/*.scss', 'js/*.js', 'data/**/*.js']).on('change', browserSync.reload)
	})
	··
	执行命令后会自动打开浏览器进入 localhost:3000，改动相关文件就会刷新浏览器了：
	··
	gulp serve
	··

	##sass 编译
	安装：
	··
	cnpm install --save-dev gulp-sass
	··
	gulpfile.js：
	··
	const gulp = require('gulp')
	const P = require('gulp-load-plugins')()
	const browserSync = require('browser-sync').create()

	// 获取 scss 文件，编译，将结果输出到 css 文件中，刷新浏览器并注入流
	gulp.task('sass', function () {
		return gulp.src('scss/*.scss')
			.pipe(P.sass({outputStyle: 'compact'}))
			.pipe(gulp.dest('css'))
			.pipe(browserSync.reload({stream: true}))
	})

	gulp.task('serve', function () {
    // 开启服务
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })

    // 监听 scss 文件，如果发生改动则刷新浏览器
		gulp.watch('scss/*.scss', ['sass'])
    // 监听文件，如果发生改动则刷新浏览器
    gulp.watch(['index.html', 'css/*.css', 'js/*.js', 'data/**/*.js']).on('change', browserSync.reload)
	})
	··

	##啃得起全家桶
	综合以上：

	@@
	gulp中文网-文档|https://www.gulpjs.com.cn/docs/getting-started/
	博客园-无双|http://www.cnblogs.com/2050/p/4198792.html
	npm-所有gulp插件|https://www.npmjs.com/search?q=keywords:gulpplugin
	@@

	&2018.4.12
`