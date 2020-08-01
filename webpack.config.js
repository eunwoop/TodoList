const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: path.join(__dirname, 'src', 'index.js'),
		login: path.join(__dirname, 'src', 'Login.js')
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'static')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader',
			],
		}]
	},
};