//include some lib
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const utils = require('./utils');
const path = require('path');

//include some data

const config = require('../config');

const isDevMode = process.env.NODE_ENV !== 'production';
// console.log(devMode, process.env.NODE_ENV);
//------------------------------------
// 变量配置
//------------------------------------
const isCSSlib = true;
// eslint-disable-next-line
const isWebApp = !isCSSlib
const isMinifyCss = !isDevMode;
const isExtractCss = !isDevMode;
// console.log(process.env.SERVER_TYPE, useSimpleServer);
const isMinifyJs = !isDevMode;
const useSimpleServer = process.env.SERVER_TYPE === 'simple';
const useComplexServer = process.env.SERVER_TYPE === 'complex';


// 设置入口
// 设置出口
const webpackConfig = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: isDevMode ? config.dev.assetsRoot : config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    // it will be used within our server script
    publicPath: isDevMode ? config.dev.publicPath : config.build.publicPath
  }
};
// feat:自动刷新
if (isDevMode && useComplexServer) {
  Object.keys(webpackConfig.entry).forEach((name) => {
    webpackConfig.entry[name] = ['./build/dev-client.js'].concat(webpackConfig.entry[name]);
  });
}

// 设置模式
webpackConfig.mode = isDevMode ? 'development' : 'production';
// 源码追踪
webpackConfig.devtool = isDevMode ? 'inline-source-map' : 'source-map';

// 设服务器
const simpleServerOptions = {
  // 资源目录
  contentBase: config.dev.assetsRoot,
  // 是否压缩
  compress: true,
  // 服务端口
  port: config.dev.port,
  // 开浏览器
  open: true
  // ...
};
if (useSimpleServer) webpackConfig.devServer = simpleServerOptions;

// 设置插件
const plugin = [];
// feat:清除目录
const isCleanDistDir = isDevMode;
if (isCleanDistDir) plugin.push(new CleanWebpackPlugin());
// feat:生成模板
plugin.push(
  new HtmlWebpackPlugin({
    template: config.dev.index,
    filename: config.build.index,
  })
);
// feat:提取样式
if (isExtractCss) {
  plugin.push(new MiniCssExtractPlugin({
    // eslint-disable-next-line no-nested-ternary
    filename: isDevMode ? utils.assetsPath('[name].css') : isCSSlib ? utils.assetsPath('style.css') : utils.assetsPath('[name].[hash].css'),
    // eslint-disable-next-line no-nested-ternary
    chunkFilename: isDevMode ? utils.assetsPath('[id].css') : isCSSlib ? utils.assetsPath('style.[id].css') : utils.assetsPath('[id].[hash].css'),
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }));
}
// feat：压缩脚本
if (isMinifyJs) {
  plugin.push(new UglifyJsPlugin({
    // 缓存
    cache: true,
    // 并发打包
    parallel: true,
    // 源码映射便于调试
    sourceMap: true
  }));
}
// feat：自动刷新
if (useComplexServer) {
  plugin.push(
    new webpack.HotModuleReplacementPlugin(),
    // @toso change to webpackConfig.optimization.noEmitOnErrors = true
    new webpack.NoEmitOnErrorsPlugin()
  );
}


webpackConfig.plugins = plugin;

// 设加载器
// feat:加载样式
const cssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
const lessLoader = cssLoader.concat('less-loader');
const scssLoader = cssLoader.concat('sass-loader');
const MiniCssExtractLoader = {};
MiniCssExtractLoader.loader = MiniCssExtractPlugin.loader;
MiniCssExtractLoader.options = {};
MiniCssExtractLoader.options.hmr = !!isDevMode;
MiniCssExtractLoader.options.reloadAll = !!isDevMode;
if (isExtractCss) cssLoader[0] = MiniCssExtractLoader;
if (isExtractCss) lessLoader[0] = MiniCssExtractLoader;

webpackConfig.module = {
  rules: [
    {
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
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,
      use: scssLoader
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        name: utils.assetsPath('img/[name]_[hash:7].[ext]')
      }
    },
    // .woff2|eot|ttf|otf后缀文件用url-loader加载
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        name: utils.assetsPath('fonts/[name]_[hash:7].[ext]')
      }
    },
    {
      test: /\.(js|es6|mjs)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
};


// 设置优化
// feat:分离样式——分离所有样式到一个文件中
// eslint-disable-next-line
const ExtractingAllCSSInASingleFile = function (webpackConfig) {
  // eslint-disable-next-line no-param-reassign
  webpackConfig.optimization = webpackConfig.optimization || {};
  // eslint-disable-next-line no-param-reassign
  webpackConfig
    .optimization
    .splitChunks = webpackConfig.optimization.splitChunks || {};
  // eslint-disable-next-line no-param-reassign
  webpackConfig.optimization.splitChunks.cacheGroups = {
    styles: {
      name: 'styles',
      test: /\.css$/,
      chunks: 'all',
      enforce: true,
    },
  };
};
// ExtractingAllCSSInASingleFile(webpackConfig)
// feat:分离样式——根据入口分离样式到指定文件中
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } if (m.name) {
    return m.name;
  }
  return false;
}
// eslint-disable-next-line
const ExtractingCSSBasedOnEntry = function (webpackConfig) {
  /* eslint-disable no-param-reassign */
  webpackConfig.optimization = webpackConfig.optimization || {};
  webpackConfig.optimization.splitChunks = webpackConfig.optimization.splitChunks || {};
  webpackConfig.optimization.splitChunks.cacheGroups = {
    fooStyles: {
      name: 'foo',
      test: (m, c, entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
      chunks: 'all',
      enforce: true,
    },
    barStyles: {
      name: 'bar',
      test: (m, c, entry = 'bar') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
      chunks: 'all',
      enforce: true,
    }
  };
};
// feat:压缩样式
// eslint-disable-next-line no-shadow
function MinifyCss(webpackConfig) {
  webpackConfig.optimization = webpackConfig.optimization || {};
  webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer || [];
  webpackConfig.optimization.minimizer.push(
    new OptimizeCSSAssetsPlugin({})
  );
}
if (isMinifyCss) MinifyCss(webpackConfig);


// console.log(webpackConfig);
module.exports = webpackConfig;
