const gulp = require('gulp');
const path = require('path');

const configuration = require('../configuration');

gulp.task('copy-vendor', () => {
	const moduleBase = path.join(configuration.cwd, 'node_modules');
	return gulp.src(configuration.copyVendorModules.map((file) => path.join(moduleBase, file)), {base: moduleBase})
		.pipe(gulp.dest(path.join(configuration.buildDirectory, 'scripts/vendor/')));
});
