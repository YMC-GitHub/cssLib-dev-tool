```
date:20190811
```

> 在脚本文件中使用webpack

01.检查是否开启
02.接受更新依赖
03.设置更新处理
04.触发更新处理
05.拒绝更新依赖

### 安装
```
npm install --save-dev webpack
```


### 使用
```
if (module.hot) {
  module.hot.accept(['./library.js'], function() {
    // Do something with the updated library module...
  });
}
module.hot.dispose(data => {
  // Clean up and pass data to the updated module...
});
module.hot.removeDisposeHandler(callback);

module.hot.decline(
  dependencies // Either a string or an array of strings
);


//--------------
//访问管理接口
//--------------
module.hot.status(); // Will return one of the following strings...

//--------------
//检查模块更新
//--------------
module.hot.check(autoApply).then(outdatedModules => {
  // outdated modules...
}).catch(error => {
  // catch errors
});
```


### 参考

[webpack-offical-docs:api-node](https://webpack.js.org/api/node/)
