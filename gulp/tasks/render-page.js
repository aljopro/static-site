const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpGrayMatter = require('gulp-gray-matter');
const markdown = require('gulp-markdown');
const data = require('gulp-data');
const gulpif = require('gulp-if')
const htmlmin = require('gulp-htmlmin');
const path = require('path');
const getTemplate = require('../get-template');
const NavBuilder = require('../build-navigation');
const configuration = require('../configuration');

const pageGlob = configuration.pageSource;
const pageDir = configuration.pageDirectory;
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

gulp.task('sort-nav', ['render-nav'], function() {
	navigation = NavBuilder.sortNavigation(navigation);
});

gulp.task('render-page', ['sort-nav'], function() {
	const getDataForFile = function(file) {
		let data = file.data;

		data.contents = file.contents.toString();
		data.navigation = navigation;
		data.vendorScripts = configuration.copyVendorModules.map(file => path.join('/scripts/vendor', file));
		return data;
	};

	return gulp.src(pageGlob, {base: pageDir})
		.pipe(gulpGrayMatter())
		.pipe(gulpif(/.*\.md$/, markdown()))
		.pipe(data(getDataForFile))
		.pipe(getTemplate({
			templateDir: templatesDir
		}))
		.pipe(nunjucksRender({
			path: templatesDir,
			envOptions: {
				trimBlocks: true,
				lstripBlocks: true
			}
		}))
		.pipe(htmlmin({
			caseSensitive: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			html5: true,
			removeComments: true
		}))
		.pipe(gulp.dest(distDir));
});
