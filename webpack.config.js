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
			
			//.png|jpg|jpeg|gif|svg后缀文件用url-loader加载
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',

        options: {
          limit: 10000,
          name: './img/[name]_[hash:7].[ext]'
        }
      },
      //.woff2|eot|ttf|otf后缀文件用url-loader加载
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './fonts/[name]_[hash:7].[ext]'
        }
      }
		]
	}
}