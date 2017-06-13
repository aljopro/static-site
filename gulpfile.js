const gulp = require('gulp');
require('./gulp/tasks/build');
require('./gulp/tasks/render-page');
require('./gulp/tasks/serve');

gulp.task('default', ['build']);
