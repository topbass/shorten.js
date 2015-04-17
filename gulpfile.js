
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true })

gulp.task('less', function() {
    return gulp.src('public/stylesheets/style.less')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less({
            plugins: [cleancss]
        }))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('default', ['less']);
