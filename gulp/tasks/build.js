const gulp = require('gulp');
var webpack = require('webpack');
const configuration = require('../configuration');

gulp.task('build', ['render-page','build-sass'], function(){
	return gulp.src(['./src/scripts/**/*.js', configuration.cssSource], {base: configuration.sourceDirectory})
	.pipe(gulp.dest(configuration.buildDirectory));
});


gulp.task('build-ts', function() {
	webpack(require('../../webpack.config.js'))
});
