/* eslint-disable no-console */
const express = require('express');
const webpack = require('webpack');
const path = require('path');

const app = express();
const serverConfig = require('../config/server.config');
const webpackConfig = require('./webpack.config.js');
const config = require('../config');
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
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory.to);

app.use(devMiddleware);
app.use(hotMiddleware);
//static serve
app.use(staticPath, express.static(serverConfig.dev.public));

module.exports = app.listen(serverConfig.dev.port, (err) => {
  // 出错时：
  if (err) {
    console.log(err);
    return;
  }

  // 成功时：
  const uri = `${serverConfig.dev.host}:${serverConfig.dev.port}`;
  console.log(`Dev server listening at ${uri}\n`);
});
