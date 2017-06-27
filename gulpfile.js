const gulp = require('gulp');
require('./gulp/tasks/build');
require('./gulp/tasks/build-sass');
require('./gulp/tasks/build-webpack');
require('./gulp/tasks/copy-vendor');
require('./gulp/tasks/render-page');
require('./gulp/tasks/serve');

gulp.task('default', ['build']);
