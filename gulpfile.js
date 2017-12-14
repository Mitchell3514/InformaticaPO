const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cache = require('gulp-cached')

gulp.task('default', ['watch','sass'])

gulp.task('sass', () => {
  gulp.src('./sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'));
});


gulp.task('watch', () => {
  gulp.watch('./sass/*.sass', ['sass']);
});
