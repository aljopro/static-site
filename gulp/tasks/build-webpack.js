const gulp = require('gulp');
const webpack = require('webpack');

const webpackConfig = require('../../webpack.config.js');

gulp.task('build-webpack', function(cb) {
	webpack(webpackConfig).run((err, stats) => {
		cb();
	});
});
