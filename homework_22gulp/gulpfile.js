const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function () {
    return gulp
        .src('src/js/*.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function () {
    return gulp
        .src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
})

gulp.task('styles', function () {
    return gulp
    .src('src/styles/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
    watch('src/js/*.js', gulp.series('scripts'))
    watch('src/**/*.html', gulp.series('html'))
    watch('src/styles/*.css', gulp.series('styles'))
})

gulp.task('default', gulp.series(gulp.parallel('scripts', 'html', 'styles'), 'watch'));

