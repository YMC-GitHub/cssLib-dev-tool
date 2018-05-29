var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		app: ["./app/main.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/assets/",
		filename: "bundle.js"
	},
	plugins: [new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'app/index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		//new ExtractTextPlugin("styles.css"),
	],
	module: {
		rules: [{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									broswer: 'last 5 versions'
								})
							]
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									broswer: 'last 5 versions'
								})
							]
						}
					},
					{
						loader: 'less-loader'
					}
				]
			}
		]
	}
};