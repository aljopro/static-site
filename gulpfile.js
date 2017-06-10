const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpGrayMatter = require('gulp-gray-matter');
const debug = require('gulp-debug');
const markdown = require('gulp-markdown');
const data = require('gulp-data');
const through = require('through2');
const fs = require('fs');
const path = require('path');

function getDataForFile(file) {
	console.log(file);
	let data = file.data;
	data.contents = file.contents.toString();

	console.log(data)
	return data;
}

function getTemplate() {
	return through.obj((file, enc, cb) => {
		const template = fs.readFileSync(path.join('./templates', file.data.template));
		console.log(path.dirname(file.path));
		file.path = path.join(path.dirname(file.path), file.data.path);
		console.log(file.path);
		file.contents = new Buffer(template);
		cb(null, file);
	});
}

gulp.task('default', function() {
	return gulp.src('./pages/**.*')
		.pipe(gulpGrayMatter())
		.pipe(markdown())
		.pipe(data(getDataForFile))
		.pipe(getTemplate())
		.pipe(nunjucksRender({
			path: './templates'
		}))
		.pipe(gulp.dest('./dist'));
});
