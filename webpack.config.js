const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode, process.env.NODE_ENV);
//------------------------------------
// 变量配置
//------------------------------------
const toExtractCss = !devMode;
const isCSSlib = true;
// eslint-disable-next-line
const isWebApp = !isCSSlib
const useSimpleServer = process.env.SERVER_TYPE === 'simple';
// console.log(process.env.SERVER_TYPE, useSimpleServer);
const toMinifyJs = !devMode;
const useComplexServer = process.env.SERVER_TYPE === 'complex';
// console.log(process.env.SERVER_TYPE, useComplexServer);

// 设置入口
// 设置出口
const webpackConfig = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // it will be used within our server script
    publicPath: '/'
  }
};
// feat:自动刷新
if (useComplexServer) {
  Object.keys(webpackConfig.entry).forEach((name) => {
    webpackConfig.entry[name] = ['./dev-client.js'].concat(webpackConfig.entry[name]);
  });
}

// 设置模式
webpackConfig.mode = devMode ? 'development' : 'production';
// 源码追踪
webpackConfig.devtool = devMode ? 'inline-source-map' : 'source-map';
// 设服务器
const simpleServerOptions = {
  // 资源目录
  contentBase: path.join(__dirname, 'dist'),
  // 是否压缩
  compress: true,
  // 服务端口
  port: 8080,
  // 开浏览器
  open: true
  // ...
};
if (useSimpleServer) webpackConfig.devServer = simpleServerOptions;

// 设置插件
const plugin = [];
// feat:清除目录
const CleanDistDir = !!devMode;
if (CleanDistDir)plugin.push(new CleanWebpackPlugin());
// feat:生成模板
plugin.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './index.html'),
    filename: path.resolve(__dirname, 'dist/index.html'),
  })
);
// feat:提取样式
if (toExtractCss) {
  plugin.push(new MiniCssExtractPlugin({
    // eslint-disable-next-line no-nested-ternary
    filename: devMode ? '[name].css' : isCSSlib ? 'style.css' : '[name].[hash].css',
    // eslint-disable-next-line no-nested-ternary
    chunkFilename: devMode ? '[id].css' : isCSSlib ? 'style.[id].css' : '[id].[hash].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }));
}
// feat：压缩脚本
if (toMinifyJs) {
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
MiniCssExtractLoader.options.hmr = !!devMode;
MiniCssExtractLoader.options.reloadAll = !!devMode;
if (toExtractCss) cssLoader[0] = MiniCssExtractLoader;
if (toExtractCss) lessLoader[0] = MiniCssExtractLoader;

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
        name: './img/[name]_[hash:7].[ext]'
      }
    },
    // .woff2|eot|ttf|otf后缀文件用url-loader加载
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        name: './fonts/[name]_[hash:7].[ext]'
      }
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
const toMinifyCss = !devMode;
// eslint-disable-next-line no-shadow
function MinifyCss(webpackConfig) {
  webpackConfig.optimization = webpackConfig.optimization || {};
  webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer || [];
  webpackConfig.optimization.minimizer.push(
    new OptimizeCSSAssetsPlugin({})
  );
}
if (toMinifyCss) MinifyCss(webpackConfig);


// console.log(webpackConfig);
module.exports = webpackConfig;
