const gulp = require('gulp');
require('./gulp/tasks/render-page');

gulp.task('default', ['render-page']);
