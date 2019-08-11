> 

01.导出一个函数
02.调用一个函数
03.传递处理结果
04.接受函数参数
05.返回一个结果


### 使用
```
//--------------
//基础架构
//--------------
module.exports = function(content, map, meta) {

};

//--------------
//返回一个结果
//--------------
//同步的加载器：一个结果
module.exports = function(content, map, meta) {
  return someSyncOperation(content);
};
//同步的加载器：多个结果
module.exports = function(content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // always return undefined when calling callback()
};
//异步的加载器：一个结果
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
//异步的加载器：多个结果
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
//概念->指南->接口->源码
```


### 参考
[webpack-offical-docs:api-loaders](https://webpack.js.org/api/loaders)
