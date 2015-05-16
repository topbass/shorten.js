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

var docker = {
  repo: 'waltzofpearls/shorten.js',
  name: 'shorten.js'
}

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
    .pipe(plugins.if( argv.production, plugins.sourcemaps.init({ loadMaps: true }) ))
    .pipe(plugins.if( argv.production, plugins.uglify() ))
    .pipe(plugins.if( argv.production, plugins.sourcemaps.write('./') ))
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

gulp.task('docker:build', plugins.shell.task([
  'docker build -t <%= repo %> .'
], { templateData: docker }));

gulp.task('docker:run:prod', plugins.shell.task([
  'docker run -p 49002:3000 -d -e NODE_ENV=production --name <%= name %> <%= repo %>'
], { templateData: docker }));

gulp.task('docker:run:test', plugins.shell.task([
  'docker run -p 49002:3000 -d -e NODE_ENV=testing --name <%= name %> <%= repo %>'
], { templateData: docker }));

gulp.task('docker:run:dev', plugins.shell.task([
  'docker run -p 49002:3000 -d -e NODE_ENV=development --name <%= name %> <%= repo %>'
], { templateData: docker }));

gulp.task('docker:stop', plugins.shell.task([
  'docker ps -a | grep <%= name %> > /dev/null \
  && docker stop <%= name %> \
  && docker rm <%= name %> \
  || echo "\nDocker container [<%= name %>] does not exist."'
], { templateData: docker }));

gulp.task('docker:status', plugins.shell.task([
  'docker ps -a -f name=<%= name %>'
], { templateData: docker }));

gulp.task('docker:purge', plugins.shell.task([
  'docker images | grep <%= repo %> > /dev/null \
  && docker rmi <%= repo %> \
  || echo "\nDocker image [<%= repo %>] does not exist."'
], { templateData: docker }));

gulp.task('docker:push', plugins.shell.task([
  'docker push <%= repo %>'
], { templateData: docker }));

gulp.task('docker:pull', plugins.shell.task([
  'docker pull <%= repo %>'
], { templateData: docker }));

gulp.task('build:css', ['less']);
gulp.task('build:js', ['browserify']);
gulp.task('build', ['build:css', 'build:js']);

gulp.task('watch:css', ['less-watch']);
gulp.task('watch:js', ['watchify']);
gulp.task('watch', ['watch:css', 'watch:js']);

gulp.task('tdd:frontend', ['karma-tdd']);
gulp.task('tdd:backend', ['mocha-test']);
gulp.task('tdd', ['tdd:backend', 'tdd:frontend']);

gulp.task('test:frontend', ['karma-single-run']);
gulp.task('test:backend', ['mocha-test']);
gulp.task('test', ['test:backend', 'test:frontend']);

gulp.task('default', ['build']);
