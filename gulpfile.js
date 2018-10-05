var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
// var pug = require('gulp-pug');
// var less = require('gulp-less');
// var concat = require('gulp-concat');
// var coffee = require('gulp-coffee');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var del = require('del');

var paths = {
    javascripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/leaflet/dist/leaflet.js',
        'resources/javascripts/zaseki.js'
    ],
    stylesheets: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/leaflet/dist/leaflet.css',
        'resources/stylesheets/zaseki.css'
    ],
    images: ''
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['public/javascripts', 'public/stylesheets']);
});

gulp.task('javascripts', ['clean'], function() {
    return gulp.src(paths.javascripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('stylesheets', ['clean'], function() {
    return gulp.src(paths.stylesheets)
        .pipe(minifyCSS())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    // return gulp.src(paths.images)
    // Pass in options to the task
    // .pipe(imagemin({
    //     optimizationLevel: 5
    // }))
    // .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    // gulp.watch(paths.scripts, ['javascripts']);
    // gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'javascripts', 'stylesheets', 'images']);
