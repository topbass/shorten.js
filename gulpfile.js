'use strict';

var argv = require('yargs').argv;
var browserify = require('browserify');
var gulp = require('gulp');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var bundler = browserify({
  entries: ['./public/javascripts/app.js'],
  debug: !argv.production,
  cache: {},
  packageCache: {},
  fullPaths: true // for watchify
});

gulp.task('less', function() {
  return gulp.src('./public/stylesheets/style.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.if(
      argv.production,
      plugins.less({ plugins: [cleancss] }),
      plugins.less()
    ))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('browserify', function() {
  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(plugins.if(
        !argv.production,
        plugins.sourcemaps.init({ loadMaps: true })
    ))
    .pipe(plugins.if(
        !argv.production,
        plugins.sourcemaps.write('./')
    ))
    .pipe(plugins.if(
        argv.production,
        plugins.uglify()
    ))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watchify', function() {
  var watcher  = watchify(bundler);

  return watcher
    .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
    .on('update', function() {
      watcher.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/javascripts/'));

      plugins.util.log("Updated JavaScript sources");
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('lesswatch', function () {
  gulp.watch('./public/stylesheets/**/*.less', ['less']);
});

gulp.task('clean', function() {
  //
});

gulp.task('build', ['less', 'browserify']);
gulp.task('watch', ['lesswatch', 'watchify']);
gulp.task('default', ['build']);
