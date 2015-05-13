'use strict';

var argv = require('yargs').argv;
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var karma = require('karma').server;
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');

var bundler = browserify({
  entries: ['./public/javascripts/app/main.js'],
  debug: !argv.production,
  cache: {},
  packageCache: {},
  fullPaths: true // for watchify
});

gulp.task('less', function() {
  return gulp.src('./public/stylesheets/style.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.if( argv.production, plugins.less({plugins: [cleancss]}), plugins.less() ))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('browserify', function() {
  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(plugins.if( !argv.production, plugins.sourcemaps.init({ loadMaps: true }) ))
    .pipe(plugins.if( !argv.production, plugins.sourcemaps.write('./') ))
    .pipe(plugins.if( argv.production, plugins.uglify() ))
    .pipe(gulp.dest('./public/javascripts/app/'));
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
        .pipe(gulp.dest('./public/javascripts/app/'));

      plugins.util.log("Updated JavaScript sources");
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/javascripts/app/'));
});

gulp.task('less-watch', function () {
  gulp.watch('./public/stylesheets/**/*.less', ['less']);
});

gulp.task('clean', function(done) {
  del([
    './public/javascripts/app/bundle.js',
    './public/javascripts/app/bundle.js.map',
    './public/stylesheets/style.css',
    './public/stylesheets/style.css.map'
  ], done);
});

gulp.task('mocha-test', function() {
  return gulp.src('./tests/unit-node/**/*_test.js')
    .pipe(plugins.mocha({
      reporter: 'spec',
      bail: true,
      ignoreLeaks: false
    }));
});

gulp.task('karma-tdd', function(done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js'
  }, done);
});

gulp.task('karma-single-run', function(done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('build', ['less', 'browserify']);
gulp.task('watch', ['less-watch', 'watchify']);
gulp.task('tdd', ['mocha-test', 'karma-tdd']);
gulp.task('test', ['mocha-test', 'karma-single-run']);
gulp.task('default', ['build']);
