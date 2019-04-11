commonData.tool.gulp.content = `
	#起步
	##介绍
	gulp 是个前端构建工具，它充分借鉴了 unix 操作系统的管道（pipe）思想，在操作上要比同类型的 grunt 简单一点
	gulp 一般使用流程：
	!!
	task()：创建任务
		src()：获取文件流
			pipe()：传输文件流，将文件流导入到需要的 gulp 插件中处理
				pipe()：传输文件流，把处理后的文件流导入到·dest()·
					dest()：输入处理后的文件
		watch()：监听文件的变动执行相应的任务
	!!
	例如：
	··
	const gulp = require('gulp') // 加载 gulp 模块
	const sass = require('gulp-sass') // 加载 gulp-sass 模块

	// 创建编译 sass 任务：获取 scss 文件，以 compact 模式编译，将结果输出到 css 文件中
	gulp.task('sass', function () {
	    gulp.src('scss/*.scss')
	        .pipe(sass({outputStyle: 'compact'}))
	        .pipe(gulp.dest('css'))
	})

	// 监听 scss 文件，若发生改变则自动编译成 css
	gulp.task('compile', function () {
	    gulp.watch('scss/*.scss', ['sass'])
	})
	··

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
	在全局安装 gulp 后又需要在项目中安装，是为了版本的灵活性和项目的独立性

	##gulpfile.js
	·gulpfile.js·是 gulp 工具的主文件，通常在项目的根目录，不推荐放置在其他文件夹内，不然路径要多写了
	创建任务打印 hello world：
	··
	var gulp = require('gulp')
	gulp.task('hello', function () {
		console.log('hello world')
	})
	··
	在存放·gulpfile.js·文件的目录下执行·gulp hello·即可运行这个任务，若不指定任务名即执行·gulp·，将会执行任务名为·default·的默认任务

	#API

	##task()
	·gulp.task(name [, deps], [, fn])·：创建任务
	!!
	name{String}：自定义任务名
	deps{Array}：当前任务依赖的任务名，当前任务会在所有依赖的任务执行完毕后才开始执行
	fn(call){Function}：任务内容
		call{Function}：通知当前任务完成，在异步任务中使用
	!!
	依赖的任务：
	··
	gulp.task('one', ['two', 'three', 'four'], function () {
		// 在 two、three、four 执行完后执行
	});
	··
	注意若依赖的任务是异步的，gulp 并不会等异步任务完成，而是会接着执行后续的任务。例如：
	··
	gulp.task('one', () => {
		setTimeout(() => {
			console.log('one')
		}, 1000)
	})

	gulp.task('two', ['one'], () => console.log('two'))

	// 运行 gulp two
	// two
	// one
	··
	回调通知可在异步完成之后再执行
	··
	gulp.task('one', call => {
		setTimeout(() => {
			console.log('one')
			call() // 执行回调，表示这个异步任务已经完成
		}, 1000)
	})

	gulp.task('two', ['one'], () => console.log('two'))
	··
	返回文件流也可在异步完成之后再执行
	··
	gulp.task('one', () => {
		return gulp.src('*')
			.pipe(fn()) // fn() 中有异步操作
			.pipe(gulp.dest('dest'))
	})

	gulp.task('two', ['one'], () => console.log('two'))
	··

	##src()
	·gulp.src(globs[, options])·：读取文件
	!!
	globs{String/Array}：文件匹配模式，可匹配文件路径和文件名
		可使用数组的形式表示多个匹配模式，且在非第一个元素的开头加上·!·可使用排除模式，即会在匹配的结果中排除这个匹配
	options{Object}：可选参数，通常情况下不需要用到
		base{String}：默认值为基础路径，·dest()·有介绍
		buffer{Boolean}[true]：·true·是以文件 buffer 的方式返回·file.contents·，否则以 stream 方式（适合大文件）返回
		其他参数见底部官网链接
	!!
	gulp 内部使用了 @[node-glob|https://github.com/isaacs/node-glob] 模块（类似正则表达式）来实现其文件匹配功能，可使用一些特殊字符来匹配文件：
	!!
	*：匹配 0 个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
	**：单独出现或左右是路径分隔符匹配所有目录和文件，否则只能匹配一个层级
	?：匹配 1 个字符（不会匹配路径分隔符）
	[¿]：匹配方括号中的任意一个字符，当方括号中第一个字符为·^·或·!·时，表示非方括号中的任意一个字符
	!¿(pattern|pattern|pattern)：匹配任何与括号中给定的任一模式都不匹配的
	?(pattern|pattern|pattern)：匹配括号中给定的任一模式0次或1次，类似于js正则中的·(pattern|pattern|pattern)?·
	+(pattern|pattern|pattern)：匹配括号中给定的任一模式至少1次，类似于js正则中的·(pattern|pattern|pattern)+·
	*(pattern|pattern|pattern)：匹配括号中给定的任一模式0次或多次，类似于js正则中的·(pattern|pattern|pattern)*·
	@(pattern|pattern|pattern)：匹配括号中给定的任一模式1次，类似于js正则中的·(pattern|pattern|pattern)·
	!!
	比如：
	··
	'*' // 能匹配任意格式文件和文件夹，如 a.js、x.y、abc、abc/，不能匹配 a/b.js
	'*.*' // 能匹配任意格式文件，不能匹配 x/y.z
	'*/*¿/*¿.js' // 能匹配 a/b/c.js，不能匹配 a/b.js、a/b/c/d.js
	'**' // 能匹配所有的目录和文件
	'**/*¿.js' // 能匹配所有目录下的 js 文件
	'a/*¿*/z' // 能匹配 a 目录下的所有 z 文件
	'a/**b/z' // 能匹配 a/b/z、a/ab/z，不能匹配 a/x/ab/z，因为只有 ** 单独出现才能匹配多级目录
	'?.js' // 能匹配 a.js、b.js、c.js，不能匹配 ab.js
	'a??' // 能匹配 a.b、abc，不能匹配 ab/，因为 ? 不会匹配路径分隔符
	'[xyz].js' // 只能匹配 x.js、y.js、z.js
	'[^xyz].js' // 能匹配所有非 x.js、y.js、z.js 的 js 文件
	'*.+(js|css)' // 匹配所有后缀名为 js 或 css 的文件

	gulp.src(['*.html', 'css/*.css', 'js/*.js']) // 多种匹配模式使用数组
	gulp.src(['*.js', '!b*.js']) // 匹配所有不是以 b 开头的 js 文件
	gulp.src(['!b*.js', '*.js']) // 排除无效，不能出现在数组的第一个元素中
	··

	##dest()
	·gulp.dest(path[, options])·：输出文件
	!!
	path{String/Function}：写入文件的路径目录，注意不能是文件名，否则也会当成目录，文件名随·src()·获取的文件名
	options{Object}：可选参数，通常情况下不需要用到
		cwd{String}[process.cwd()]：输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效
		mode{String}[0777]：八进制权限字符，用以定义所有在输出目录中所创建的目录的权限
		其他参数见底部官网链接
	!!
	输出的文件路径是传入的·path·参数后面再加上·src()·中有通配符开始出现的那部分路径，没有则取最后的文件名。例如：
	··
	var gulp = reruire('gulp')

	gulp.src('script/*¿*/*¿.js') // 通配符部分的路径为 **/*.js
		.pipe(gulp.dest('dist')) // 输出路径为 dist/**/*.js

	gulp.src('script/js/jquery.js') // 没有通配符取最后的文件名
		.pipe(gulp.dest('dist')) // 输出路径为 dist/jquery.js
	··
	通过指定·src()·中第二个参数的·base·属性可以指定输出路径，·base·的默认值为通配符开始出现之前那部分路径
	例如·gulp.src('app/src/**/*.css')·中·base·的值为·app/src·，所以其实·dest()·传入的输出路径也就是替换了·src()·中的·base·路径
	··
	var gulp = reruire('gulp')

	gulp.src('js/lib/*.js', {base : 'js'})	// 指定 base 路径为 js
		.pipe(gulp.dest('build'))	// 替换 js，输出路径为 build/lib/*.js
	··
	用·dest()·输出文件后，文件流仍然可以继续使用，即可继续使用·pipe()·

	##watch()
	监听文件变化后执行任务
	###gulp.watch(glob [, opts] [, tasks])
	!!
	glob{String/Array}：同·src()·中的·glob·
	opts{Object}：一些配置，通常情况下不需要用到
	tasks{Array}：文件变化后要执行的任务名
	!!
	··
	gulp.task('uglify', () => {})
	gulp.task('reload', () => {})
	gulp.watch('js/*.js', ['uglify', 'reload'])
	··
	###gulp.watch(glob [, opts] [, call])
	!!
	call(info){Function}：每当监视的文件发生变化时，就会调用这个函数
		info{Object}：文件变化的信息
			type：变化的类型，可以是·added·新增、·changed·改变 、·deleted·删除
			path：变化文件的路径
	!!
	··
	gulp.watch('js/*¿*/*.js', function (res) {
		console.log(res.type)
		console.log(res.path)
	})
	··

	#常用插件

	##自动加载
	说明：·gulp-load-plugins·这个插件能自动加载·package.json·文件里的 gulp 插件，@[参数配置|https://www.npmjs.com/package/gulp-load-plugins#options]
	安装：
	··
	cnpm install gulp-load-plugins --save-dev
	··
	使用前：
	··
	const gulp = require('gulp'),
		a = require('gulp-a'),
		b = require('gulp-b'),
		c = require('gulp-c'),
		d = require('gulp-d'),
		e = require('gulp-e')
	··
	使用后：
	··
	const gulp = require('gulp')
	const {a, b, c, d, e} = require('gulp-load-plugins')()
	··
	其插件的命名方式是·package.json·中依赖的名称去掉·gulp-·前缀再转驼峰命名
	例如假设·package.json·文件里的依赖是这样的：
	··
	{
		"devDependencies": {
			"gulp": "^3.9.1",
			"gulp-rename": "^1.2.0",
			"gulp-ruby-sass": "^4.0.1",
			"gulp-load-plugins": "^1.5.0"
		}
	}
	··
	引用时：
	··
	const gulp = require('gulp')
	const {rename, rubySass} = require('gulp-load-plugins')()
	··
	·gulp-load-plugins·并不会一开始就加载所有·package.json·里的 gulp 插件，而是在用到的时候才去加载
	注意：因为是通过·package.json·文件来加载插件的，所以要确定需要的插件已经写入到了·package.json·文件依赖里，并且已经安装好了这些插件

	##重命名
	用·dest()·输出文件时，文件名使用的是·src()·获取的文件名，·gulp-rename·插件可以改变这个文件名，@[用法|https://www.npmjs.com/package/gulp-rename#usage]
	安装：
	··
	cnpm install gulp-rename --save-dev
	··
	使用：
	··
	const gulp = require('gulp'),
		rename = require('gulp-rename'),
		uglify = require("gulp-uglify") // 压缩 js

	gulp.task('rename', function () {
		gulp.src('js/jquery.js')
			.pipe(uglify())
			.pipe(rename('jquery.min.js')) // 重命名为 jquery.min.js
			.pipe(gulp.dest('js'))
	})
	··

	##文件压缩
	压缩 html 文件：·gulp-htmlmin·，@[参数配置|https://github.com/kangax/html-minifier#options-quick-reference]
	压缩 css 文件：·gulp-clean-css·，@[参数配置|https://github.com/jakubpawlowicz/clean-css#constructor-options]
	压缩 js 文件：·gulp-uglify·，@[参数配置|https://github.com/mishoo/UglifyJS2#minify-options]
	压缩图片：·gulp-imagemin·，@[用法|https://www.npmjs.com/package/gulp-imagemin#usage]
	安装：
	··
	cnpm install gulp-htmlmin --save-dev
	cnpm install gulp-clean-css --save-dev
	cnpm install gulp-uglify --save-dev
	cnpm install gulp-imagemin --save-dev
	··
	使用
	··
	const gulp = require('gulp'),
		miniHtml = require('gulp-htmlmin')

	gulp.task('htmlmin', function () {
		gulp.src('html/*.html')
		.pipe(miniHtml())
		.pipe(gulp.dest('dist/html'))
	})
	··

	##文件合并
	·gulp-concat·插件可用来把多个文件合并为一个文件，例如合并所有 js 或 css 为一个文件，这样就能减少 http 请求数了，@[用法|https://www.npmjs.com/package/gulp-concat#usage]
	安装：
	··
	cnpm install --save-dev gulp-concat
	··
	使用：
	··
	const gulp = require('gulp'),
		concat = require('gulp-concat')

	gulp.task('concat', function () {
		gulp.src('js/*.js')
		.pipe(concat('all.js')) 	// 合并匹配到的 js 文件并命名为 all.js
		.pipe(gulp.dest('dist'))
	})
	··

	##js 代码检查
	@[参数配置|https://jshint.com/docs/options/]
	安装：
	··
	cnpm install jshint --save-dev
	··
	使用：
	··
	const gulp = require('gulp'),
		jshint = require('jshint')

	gulp.task('jsLint', function () {
		gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter())	// 输出检查结果
	})
	··

	## 编译 sass
	@[参数配置|https://www.npmjs.com/package/gulp-sass#options]
	安装：
	··
	cnpm install gulp-sass --save-dev
	··
	使用：
	··
	const gulp = require('gulp'),
		sass = require('gulp-sass')

	gulp.task('compile-sass', function () {
		gulp.src('sass/*.sass')
		.pipe(sass({outputStyle: 'compact'}))
		.pipe(gulp.dest('dist/css'))
	})
	··

	##babel 转 es5
	@[安装说明|https://www.npmjs.com/package/gulp-babel#install]，@[参数配置|https://babeljs.io/docs/en/options]
	安装：
	··
	cnpm install --save-dev gulp-babel @babel/core @babel/preset-env
	··
	使用：
	··
	const gulp = require('gulp'),
		babel = require('gulp-babel')

	gulp.task('default', function () {
		gulp.src('js/*.js')
			.pipe( babel({ presets: ['@babel/env'] }) )
			.pipe(gulp.dest('dest/js'))
	})
	··

	##浏览器自动刷新
	·browser-sync·插件能让浏览器在文件改动时自动刷新页面，还可搭建静态服务，同一个 WiFi 中的任何设备都可以方便地访问到
	默认打开·localhost:3000·，UI 配置页面为端口号 +1，即·localhost:3001·，若 3000 端口被占用将打开 3001，UI 配置页面为 3002，依次类推
	@[参数配置|http://www.browsersync.cn/docs/options]
	安装：
	··
	cnpm install browser-sync --save-dev
	··
	使用：
	··
	var gulp = require('gulp')
	var bs = require('browser-sync').create()

	gulp.task('serve', function () {
		// 初始化静态服务器，server 为服务配置，空字符串代表根目录，默认打开 index.html
		bs.init({ server: '' })
		// 当文件改动时刷新浏览器
		gulp.watch(['index.html', 'css/*.css', 'js/*.js'], bs.reload)
	})
	··

	##其他
	!!
	gulp-sourcemaps：映射源文件，支持的插件@[说明|https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support]，sourcemap @[参考说明|http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html]，@[npm|https://www.npmjs.com/package/gulp-sourcemaps]
	gulp-replace：文件内的文本替换插件，可使用正则，@[npm|https://www.npmjs.com/package/gulp-replace]
	gulp-autoprefixer：给 css 样式补充前缀，@[npm|https://www.npmjs.com/package/gulp-autoprefixer]
	gulp-typescript：ts 编译成 js，@[npm|https://www.npmjs.com/package/gulp-typescript]
	!!

	#啃得起全家桶
	安装开发时插件：
	··
	cnpm install --save-dev gulp gulp-load-plugins gulp-sass browser-sync
	··
	安装打包插件：
	··
	cnpm install --save-dev gulp-htmlmin gulp-clean-css gulp-uglify gulp-imagemin gulp-babel @babel/core @babel/preset-env
	··
	·gulpfile.js·：
	··
	const gulp = require('gulp')
	const p = require('gulp-load-plugins')()
	const bs = require('browser-sync').create()

	// 获取 scss 文件，以 compact 模式编译，将结果输出到 css 文件中，刷新浏览器并注入流
	gulp.task('sass', () => {
	    gulp.src('scss/*¿.scss')
	        .pipe(p.sass({outputStyle: 'compact'}))
	        .pipe(gulp.dest('css'))
	        .pipe(bs.reload({stream: true}))
	})

	// 开启服务，实时编译 scss 文件，文件改动时自动刷新浏览器
	gulp.task('default', () => {
	    bs.init({server: ''})
	    gulp.watch('scss/*¿.scss', ['sass'])
	    gulp.watch(['index.html', 'css/*¿.css', 'js/*¿.js'], bs.reload)
	})

	// 压缩 html
	gulp.task('mhtml', () => {
		gulp.src('html/*.html')
	        .pipe(p.htmlmin())
	        .pipe(gulp.dest('dist/html'))
	})

	// 压缩 css
	gulp.task('mcss', () => {
		gulp.src('css/*.css')
	        .pipe(p.cleanCss())
	        .pipe(gulp.dest('dist/css'))
	})

	// 压缩 js
	gulp.task('mjs', () => {
		gulp.src('js/*.js')
	    	.pipe(p.babel({ presets: ['@babel/env'] }))
	    	.pipe(p.uglify())
	    	.pipe(gulp.dest('dist/js'))
	})

	// 压缩图片
	gulp.task('mimg', () => {
		gulp.src('img/*')
	        .pipe(p.imagemin())
	        .pipe(gulp.dest('dist/img'))
	})

	// 压缩打包文件
	gulp.task('pack', ['mhtml', 'mcss', 'mjs', 'mimg'])
	··

	@@
	gulp 官网|https://gulpjs.com/
	gulp 中文网|https://www.gulpjs.com.cn/docs/getting-started/
	博客园-无双|http://www.cnblogs.com/2050/p/4198792.html
	npm 搜索 gulp 插件|https://www.npmjs.com/search?q=keywords:gulpplugin
	Browsersync 中文网|http://www.browsersync.cn
	gulp 4 升级指南（本文是 3）|https://segmentfault.com/a/1190000005357048
	@@

	&2019.4.10
`