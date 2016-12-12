var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');


gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8888", // port of node server
        notify: false
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["./bin/*"], reload);
    gulp.watch(["./models/*"], reload);
    gulp.watch(["./public/*"], reload);
    gulp.watch(["./routes/*"], reload);
    gulp.watch(["./views/*"], reload);
});

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: 'bin/www'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});