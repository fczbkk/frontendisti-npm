const gulp = require('gulp')
const watch = require('gulp-watch')
const del = require('del')
const sass = require('gulp-sass')
const svgo = require('gulp-svgo')
const sequence = require('gulp-sequence')

gulp.task('cleanup', () => {
  return del(['./build'])
})

gulp.task('styles', () => {
  return gulp.src('./../src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'))
})

gulp.task('styles:watch', () => {
  return gulp.watch('./../src/**/*.scss', ['styles'])
})

gulp.task('styles:build', () => {
  return gulp.src('./../src/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./build'))
})

gulp.task('images', () => {
  return gulp.src('./../src/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('./build'));
})

gulp.task('images:watch', () => {
  watch('./../src/**/*.svg', () => {
    gulp.run('images')
  })
})

gulp.task('dev', sequence(['images:watch', 'styles:watch']))

gulp.task('build', sequence('cleanup', ['styles:build', 'images']))
