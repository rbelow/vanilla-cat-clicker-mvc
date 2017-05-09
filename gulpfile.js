const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// NOTE Be careful with path start `/`
const paths = {
    html: '*.html',
    css: '*.css',
    js: '*.js'
};

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    });
    // gulp.watch(paths.html, browserSync.reload);
})

// Watch task with browserSync
gulp.task('watch', function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch(paths.html, browserSync.reload);
    gulp.watch(paths.css, browserSync.reload);
    gulp.watch(paths.js, browserSync.reload);
});

// gulp.task('default', ['browserSync']);
gulp.task('default', ['browserSync', 'watch']);
