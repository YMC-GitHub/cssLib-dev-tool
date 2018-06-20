
var express = require('express');
var app = express();
var webpack = require('webpack');
var path = require('path');

//编译配置
var config = require('./config.js');
var webpackConfig = require('./wepack.config.dev.js');
var compiler = webpack(webpackConfig);

//内容监控
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

//模块替换
var hotMiddleware = require('webpack-hot-middleware')(compiler);

//页面重载
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    //发布一个事件
    hotMiddleware.publish({ action: 'reload' })
    //执行回调函数
    cb()
  })
});

//资源目录
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(config.dev.port, function (err) {
  //出错时：
  if (err) {
    console.log(err)
    return
  }

  //成功时：
  var uri = config.dev.host+':' + config.dev.port;
  console.log('Dev server listening at ' + uri + '\n');
});
/*
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('./wepack.config.dev.js');
const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();

app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

app.listen(3000, () => console.log('Example app listening on port 3000!'))
*/