var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';
//console.log(`now is pro:${isProduction}`)
//console.log(process.env.NODE_ENV)

var minPostfix = isProduction ? '.min' : '';
var hash = isProduction ? '_[hash:8]' : '';

var cssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
cssLoader[1] = isProduction ? 'css-loader?minimize' : cssLoader[1];
var lessLoader = cssLoader.concat('less-loader');
//console.log(cssLoader)

cssLoader = isProduction ? ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: cssLoader.splice(1),
}) : cssLoader;
lessLoader = isProduction ? ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: lessLoader.splice(1),
}) : lessLoader;
//console.log(lessLoader)

var basePlugins, envPlugins;
basePlugins = [new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
	}
})];
envPlugins = isProduction ? [
	new ExtractTextPlugin(`style${hash}${minPostfix}.css`, {
		allChunks: true
	})
] : [ /*for lib it may be good as dev,pro for app*/
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'demo/index_old.html'),
		filename: 'index.html',
		inject: 'body'
	})
];

module.exports = {
	entry: {
		app: isProduction ?["./src/index.js"]:["./demo/main.js"]
	},
	output: {
		path: isProduction ?path.resolve(__dirname, "dist"):path.resolve(__dirname, "demo"),
		publicPath: isProduction ? "/assets/" : "/",
		filename: isProduction ? `bundle${hash}${minPostfix}.js` : "bundle.js"
	},
	plugins: basePlugins.concat(envPlugins),
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
			},
			{
				test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
				use: [
					//Emits the file into the output folder and returns the (relative) URL
					'file-loader?name=[path][name].[ext]&context=src',
					'image-webpack-loader?bypassOnDebug'
				]
			}
		]
	}
}