const gulp = require('gulp');
const server = require('gulp-server-livereload');
const configuration = require('../configuration');

gulp.task('serve', ['build','webserver'], function(){
	gulp.watch(configuration.pageSource, ['build']);
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});
