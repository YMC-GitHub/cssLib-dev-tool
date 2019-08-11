
const callForWebpack3 = (compiler, hotMiddleware) => {
// force page reload when html-webpack-plugin template changes
// https://www.webpackjs.com/contribute/writing-a-plugin
// 01.创建一个钩子
// 02.挂载到编译器
  compiler.plugin('compilation', (compilation) => {
  // console.log('110', Object.keys(compilation.hooks));
  // console.log('120', Object.keys(compilation));
  // console.log('150', Object.keys(compilation.hooks.htmlWebpackPluginAfterEmit));
  // console.log('01.创建一个钩子+02.挂载到编译器');
  // 01.创建一个钩子
  // 02.挂到编译对象
  // https://www.webpackjs.com/contribute/writing-a-plugin
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    // 发布一个事件
    // console.log(123, data, cb, hotMiddleware);
    // console.log('01.创建一个钩子+02.挂到编译对象');
    // https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js
      hotMiddleware.publish({ action: 'reload' });
      // 执行回调函数
      cb();
    });
  });
};

const callForWebpack4 = (compiler, hotMiddleware) => {
  // https://github.com/jantimon/html-webpack-plugin#afteremit-hook
  compiler.hooks.compilation.tap('yemianchengPlugin', (compilation) => {
  // console.log('The compiler is starting a new compilation...');
    compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
      'yemianchengPlugin',
      (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb(null, data);
      }
    );
  });
};

module.exports = callForWebpack4;
