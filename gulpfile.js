var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyerror = require('gulp-prettyerror'),
    babel = require ('gulp-babel');

    inputJS = './js/*.js',
    inputSCSS = './scss/style.scss',
    watchSCSS = './scss/*.scss',
    outputJS = './build/js',
    outputCSS = './build/css';

gulp.task('js', function(){
  gulp.src (inputJS)
    .pipe(babel())
    .pipe(uglify ())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(outputJS));
});

gulp.task ('scss', function(){
  gulp.src (inputSCSS)
    .pipe(prettyerror())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(outputCSS));
})

gulp.task('watch', function(){
  gulp.watch(inputJS, ['js']);
  gulp.watch(watchSCSS, ['scss']);
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './',
    }
  });
  gulp.watch(['./build/js/*.js', './build/css/style.min.css']).on('change', browserSync.reload);
});

gulp.task('lint', function(){
    return gulp.src(['./js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('default', ['watch', 'browser-sync']);