const gulp = require('gulp');
const path = require('path');

const configuration = require('../configuration');

gulp.task('build', ['render-page', 'build-sass', 'build-webpack', 'copy-vendor'], function() {
	return gulp.src(['./src/scripts/**/*.js', configuration.cssSource], {
			base: configuration.sourceDirectory
		})
		.pipe(gulp.dest(configuration.buildDirectory));
});
