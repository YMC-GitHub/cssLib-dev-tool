
const express = require('express');
const app = express();
const webpack = require('webpack');
const path = require('path');

// 编译配置
const config = require('./config.js');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

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
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  // https://www.webpackjs.com/contribute/writing-a-plugin
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    // 发布一个事件
    hotMiddleware.publish({ action: 'reload' });
    // 执行回调函数
    cb();
  });
});

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
