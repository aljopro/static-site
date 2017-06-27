const path = require('path');
const webpack = require('webpack');

const configuration = require('./gulp/configuration');



const webpackConfig = {
	entry: {
		app: path.resolve(configuration.cwd, 'src/scripts/index.ts'),
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loaders: ['ts-loader'],
			exclude: /node_modules/
   		}]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(configuration.cwd, configuration.buildDirectory + '/scripts')
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
};


module.exports = webpackConfig;
