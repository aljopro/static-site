module.exports = {
	cwd: process.cwd(),
	sourceDirectory: './src',
	buildDirectory: './dist',
	templateDirectory: './src/templates',
	pageDirectory: './src/pages',
	pageSource: './src/pages/**/*.*',
	sassSource: './src/stylesheets/**/*.scss',
	cssSource: './src/stylesheets/**/*.css',
	copyVendorModules: [ //relative to node_modules
		'jquery/dist/jquery.min.js',
		'babel-polyfill/dist/polyfill.min.js'
	]
}
