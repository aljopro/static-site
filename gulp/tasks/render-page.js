const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpGrayMatter = require('gulp-gray-matter');
const markdown = require('gulp-markdown');
const data = require('gulp-data');
const gulpif = require('gulp-if')
const getTemplate = require('../get-template');
const NavBuilder = require('../build-navigation');
const configuration = require('../configuration');

const pageGlob = configuration.pageSource;
const templatesDir = configuration.templateDirectory;
const distDir = configuration.buildDirectory;

let navigation = [];

gulp.task('render-nav', function() {
	navigation = [];
	const navBuilder = new NavBuilder();

	const getNavigation = function(file) {
		navigation = navBuilder.navigation;
	}
	return gulp.src(pageGlob)
		.pipe(gulpGrayMatter())
		.pipe(navBuilder.build)
		.pipe(data(getNavigation));
});

gulp.task('render-page', ['render-nav'], function() {
	const getDataForFile = function(file) {
		let data = file.data;
		data.contents = file.contents.toString();
		data.navigation = navigation;
		return data;
	};

	return gulp.src(pageGlob)
		.pipe(gulpGrayMatter())
		.pipe(gulpif(/.*\.md$/, markdown()))
		.pipe(data(getDataForFile))
		.pipe(getTemplate({ templateDir: templatesDir }))
		.pipe(nunjucksRender({
			path: templatesDir
		}))
		.pipe(gulp.dest(distDir));
});
