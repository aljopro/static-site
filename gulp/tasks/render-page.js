const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpGrayMatter = require('gulp-gray-matter');
const debug = require('gulp-debug');
const markdown = require('gulp-markdown');
const data = require('gulp-data');
const gulpif = require('gulp-if')
const getTemplate = require('../get-template');

function getDataForFile(file) {
	let data = file.data;
	data.contents = file.contents.toString();
	return data;
}

gulp.task('render-page', function() {
	return gulp.src('./pages/**.*')
		.pipe(gulpGrayMatter())
		.pipe(gulpif(/.*\.md$/ , markdown()))
		.pipe(data(getDataForFile))
		.pipe(getTemplate())
		.pipe(nunjucksRender({
			path: './templates'
		}))
		.pipe(gulp.dest('./dist'));
});
