
var browserify = require('browserify');
var gulp = require('gulp');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');

gulp.task('less', function() {
    return gulp.src('./public/stylesheets/style.less')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less({
            plugins: [cleancss]
        }))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('browserify', function() {
    return browserify('./public/javascripts/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watchify', function() {
    //
});

gulp.task('build', ['less', 'browserify']);
gulp.task('watch', ['watchify']);
gulp.task('default', ['build']);
