const gulp = require('gulp')
const P = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create()

// 获取 scss 文件，以 compact 模式编译，将结果输出到 css 文件中，刷新浏览器并注入流
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
