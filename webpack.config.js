const webpack = require('webpack');
const path = require('path');

const config = {
	target: 'node',
	context: path.join(__dirname, 'src'),
	entry: './macSignatureInstaller.js',
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'bundle.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0'],
				}
			},
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			sourcemap: false,
		}),
	]
};

module.exports = config;
