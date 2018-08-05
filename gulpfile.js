const gulp = require('gulp')
const P = require('gulp-load-plugins')()

// 监听文件的改变刷新浏览器
gulp.task('watch', function() {
  P.livereload.listen()
  gulp.watch(['index.html', 'css/*.css', 'scss/*.scss', 'js/*.js', 'data/**/*.js'], function (file) {
  	P.livereload.changed(file.path)
  })
})