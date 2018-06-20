var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

/***变量****/
var config = require('./config.js');
//环境标识
var isProduction = process.env.NODE_ENV === 'production';

//是否压缩
var minPostfix = isProduction ? '.min' : '';

//文件指纹
var hash = isProduction ? '_[hash:8]' : '';

//样式提取
var ExtractCssOptions ={};
ExtractCssOptions.name = `style${hash}${minPostfix}.css`;

//其加载器
var cssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
cssLoader[1] = isProduction ? 'css-loader?minimize' : cssLoader[1];
var lessLoader = cssLoader.concat('less-loader');


cssLoader = isProduction ? ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: cssLoader.splice(1),
}) : cssLoader;
lessLoader = isProduction ? ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: lessLoader.splice(1),
}) : lessLoader;


//所用插件
var basePlugins, envPlugins;
basePlugins = [new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
	}
})];
envPlugins = isProduction ? [
	new ExtractTextPlugin(ExtractCssOptions.name, {
		allChunks: true
	})
] : [ /*for lib it may be good as dev,pro for app*/
   new webpack.optimize.OccurrenceOrderPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoEmitOnErrorsPlugin(),
   new HtmlWebpackPlugin({
		template: path.resolve(__dirname, './index.html'),
		filename: 'index.html',
		inject: 'body'
	})
];


var options = {
	entry: {
		app: ["./src/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: isProduction ? "/assets/" : config.dev.path,
		filename: isProduction ? `bundle${hash}${minPostfix}.js` : "bundle.js"
	},
	devtool: '#eval-source-map',
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

//自动刷新
if(!isProduction){
Object.keys(options.entry).forEach(function (name) {
  options.entry[name] = ['./dev-client.js'].concat(options.entry[name])
})
}


module.exports = options;