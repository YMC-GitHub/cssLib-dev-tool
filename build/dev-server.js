/* eslint-disable no-console */
const express = require('express');
const webpack = require('webpack');
const path = require('path');

const app = express();
const config = require('./config.js');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const pageReloadHelper = require('./page-reload');


// 内容监控
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

// 模块替换
const hotMiddleware = require('webpack-hot-middleware')(compiler);
// 页面重载
pageReloadHelper(compiler, hotMiddleware);

// 资源目录
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(config.dev.port, (err) => {
  // 出错时：
  if (err) {
    console.log(err);
    return;
  }

  // 成功时：
  const uri = `${config.dev.host}:${config.dev.port}`;
  console.log(`Dev server listening at ${uri}\n`);
});
