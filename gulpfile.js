var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyCSS   = require('gulp-minify-css'),
    prefixer    = require('gulp-autoprefixer'),
    ghPages     = require('gulp-gh-pages-cname'),
    img         = require('gulp-imagemin'),
    minifyHTML  = require('gulp-minify-html'),
    connect     = require('gulp-connect')

gulp.task('default', ['styles', 'img', 'html', 'fonts'])

gulp.task('styles', function () {
  return gulp
  .src('./source/sass/**/*.sass')
  .pipe(sass({
    indentedSyntax: true
  }))
  .pipe(prefixer())
  .pipe(minifyCSS())
  .pipe(gulp.dest('./build/assets/css/'))
})

gulp.task('html', function() {
  return gulp
  .src('./source/html/*')
  .pipe(minifyHTML())
  .pipe(gulp.dest('./build/'))
})

gulp.task('img', function() {
  return gulp
  .src('./source/img/**/*')
  .pipe(img())
  .pipe(gulp.dest('./build/assets/img/'))
})

gulp.task('fonts', function() {
  return gulp
  .src('./source/fonts/**/*')
  .pipe(gulp.dest('./build/assets/fonts/'))
})

gulp.task ('deploy', ['default'], function() {
  return gulp
  .src('./build/**/*')
  .pipe(ghPages({
    branch: 'master',
    cname: 'kraiom.com'
  }))
})

gulp.task('watch', ['default'], function () {
  gulp.watch('./source/js/**/*', ['scripts'])
  gulp.watch('./source/sass/**/*', ['styles'])
  gulp.watch('./source/html/*', ['html'])
})

gulp.task('serve', ['watch'], function () {
  connect.server({
    root: './build/',
    livereload: true
  })
})
