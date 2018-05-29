var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction)
console.log(process.env)

var minify = isProduction ? 'minimize' : '';
var minPostfix = isProduction ? '.min' : '';
var hash = '[hash:7]';
var cssLoader = [{
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
];
var lessLoader = cssLoader.concat({
	loader: 'less-loader'
});
//console.log(lessLoader)

cssLoader = isProduction ? ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: cssLoader.shift(),
}) : cssLoader;
lessLoader = isProduction ? ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: lessLoader.shift(),
}) : lessLoader;

module.exports = {
	entry: {
		app: ["./app/main.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/assets/",
		filename: "bundle.js"
	},
	plugins: [
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}
	}),
	new ExtractTextPlugin(`css/style.${hash}${minPostfix}.css`, {
		allChunks: true
	}),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'app/index.html'),
		filename: 'index.html',
		inject: 'body'
	})],
	module: {
		rules: [{
				test: /\.css$/,
				exclude: /node_modules/,
				use: cssLoader
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: lessLoader
			}
		]
	}
}