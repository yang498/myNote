const gulp = require('gulp')
const {sass} = require('gulp-load-plugins')()
const bs = require('browser-sync').create()

// 获取 scss 文件，以 compact 模式编译，将结果输出到 css 文件中，刷新浏览器并注入流
gulp.task('sass', () => {
    gulp.src('scss/*.scss')
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(gulp.dest('css'))
        .pipe(bs.reload({stream: true}))
})

// 开启服务，实时编译 scss 文件，文件改动时自动刷新浏览器
gulp.task('default', () => {
    bs.init({ server: '' })
    gulp.watch('scss/*.scss', ['sass'])
    gulp.watch(['index.html', 'css/*.css', 'js/*.js', 'data/**/*.js'], bs.reload)
})
