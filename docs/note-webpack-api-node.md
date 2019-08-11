```
date:20190811
```

> 在脚本文件中使用webpack

### 安装
```
npm install --save-dev webpack
```


### 使用
```
//--------------
//基础架构
//--------------
//导入类库
const webpack = require('webpack');
//创建实例
const compiler = webpack({
  // Configuration Object
});
//do sth. here：监控处理|指定文件系统
//...
//后续处理
compiler.run((err, stats) => { // Stats Object
  // do sth. here:错误处理|状态输出
  // ...
  if (err) {
    handleWepackErr(err)
    return;
  }
  handleWepackStats(stats)
  //...
});


//--------------
//监控处理
//--------------
//设置监控
const watching = compiler.watch({
  // Example watchOptions
  aggregateTimeout: 300,
  poll: undefined
})
//关闭监控
watching.close(() => {
  console.log('Watching Ended.');
});
//不用验证
watching.invalidate();

//--------------
//设置文件系统
//--------------
const MemoryFS = require('memory-fs');
const fs = new MemoryFS();
//compiler.inputFileSystem = fs;
compiler.outputFileSystem = fs;

//--------------
//错误处理
//--------------
function handleWepackErr(err){
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
}

//--------------
//状态输出
//--------------
function handleWepackStats(stats){
  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
}

//--------------
//记录结果
//--------------
```


### 参考

[webpack-offical-docs:api-node](https://webpack.js.org/api/node/)
