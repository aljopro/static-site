const gulp = require('gulp');
const configuration = require('../configuration');

gulp.task('build', ['render-page','build-sass'], function(){
	return gulp.src(['./src/scripts/**/*.js', configuration.cssSource], {base: configuration.sourceDirectory})
	.pipe(gulp.dest(configuration.buildDirectory));
});
