var gulp = require('gulp');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
const cssminify = require('gulp-clean-css');

// clean styles.css and styles.min.css files
gulp.task('clean', function (cb) {
  rimraf('./wwwroot/css/styles.css', cb);
});

gulp.task('sass', function () {
  return gulp.src(['./sass/*.scss']).pipe(sass()).pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('sass:minify', function (callback) {
  return gulp
    .src('./sass/*.scss')
    .pipe(sass())
    .pipe(cssminify({zindex: false}))
    .pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('default', gulp.series(['clean', 'sass']));
gulp.task('prod', gulp.series(['clean', 'sass:minify']));
