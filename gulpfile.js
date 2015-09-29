var gulp = require('gulp'),
    concat = require('gulp-concat'),
    closureCompiler = require('gulp-closure-compiler'),
    zip = require('gulp-zip'),
    checkFilesize = require("gulp-check-filesize"),
    minifyCss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');

gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('optimize', ['js'], function () {
    return gulp.src('dist/js/*.js')
        .pipe(closureCompiler({
            compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
            fileName: 'main.js',
            compilerFlags: {
                compilation_level: 'ADVANCED_OPTIMIZATIONS',
                warning_level: 'VERBOSE'
            }
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('src/**/*.css', ['default']);
    gulp.watch('src/**/*.html', ['default']);
});

gulp.task('font', function () {
    return gulp.src(['src/slkscr.ttf'])
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src(['src/main.css'])
        .pipe(minifyCss({compatibility: 'ie9'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('ship', ['css', 'font'], function () {
    return gulp.src(['src/index.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('zip', ['ship', 'optimize'], function () {
    return gulp.src(['dist/**/*.*'])
        .pipe(zip('submission.zip'))
        .pipe(gulp.dest(''));
});

gulp.task('check-size', ['zip'], function () {
    return gulp.src('submission.zip')
        .pipe(checkFilesize({
            fileSizeLimit: 13312 // 13312 === 13kb
        }));
});

gulp.task('default', ['check-size']);
