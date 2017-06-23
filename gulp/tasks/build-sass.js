const gulp = require('gulp');
const configuration = require('../configuration');
var sass = require('gulp-sass');

const distDir = configuration.buildDirectory;
const srcDir = configuration.sourceDirectory;
const sassGlob = configuration.sassSource;

gulp.task('build-sass', function() {
	return gulp.src(sassGlob, {base: srcDir})
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(distDir));
});
