const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: path.join(__dirname, 'src', 'index.js'),
		login: path.join(__dirname, 'src', 'Login.js')
	},
	output: {
		filename: process.env.NODE_ENV === 'production' ? '[name].bundle.js' : '[name].bundle-[hash:6].js',
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
	plugins: [
		new HtmlWebpackPlugin({
			filename: path.join(__dirname, 'static', 'index.html'),
			template: path.join(__dirname, 'static', 'index.html.template')
		}),
		new HtmlWebpackPlugin({
			filename: path.join(__dirname, 'static', 'login.html'),
			template: path.join(__dirname, 'static', 'login.html.template')
		})
	]
};