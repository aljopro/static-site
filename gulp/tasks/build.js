const gulp = require('gulp');
const configuration = require('../configuration');

gulp.task('build', ['render-page'], function(){
	return gulp.src(['./src/scripts', './src/stylesheets'])
	.pipe(gulp.dest(configuration.buildDirectory));
});
