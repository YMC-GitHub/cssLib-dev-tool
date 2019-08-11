>用于创建编译对象实例

01.为方便于注册和调用插件，它继承了Tapable。

02.在开发插件时，需要知道每一个钩子在哪被调用。在哪调用呢？可在webpack源码中搜索`hooks.<hook name>.call`。


### 监控模式 

01.监控文件系统
02.当文件修改时重新编译
03.触发其他事件
04.开发环境使用
05.支持传入参数

### 生命钩子

01.如何访问钩子（如何注册插件）
02.支持哪些钩子
```
//注册插件
compiler.hooks.someHookName.tap('MyPlugin', (params) => {
  /* ... */
});
//feat:处理入口选项时
compiler.hooks.entryOption.tap('MyPlugin', (compiler) => {
  /* ... */
});
//feat:配置释放完成时
compiler.hooks.afterPlugins.tap('MyPlugin', (compiler) => {
  /* ... */
});
//feat:准备编器完成时

//feat:运行编译器之前
//feat:运行编译器之时
//feat:正常模块工厂化

//feat:上下文模块工厂
//feat:在编译对象之前
//feat:某编译对象之后
//feat:某编译完成之后
//feat:编译对象完成前

//feat:是否应该触发
compiler.hooks.shouldEmit.tap('MyPlugin', (compilation) => {
  // return true to emit the output, otherwise false
  return true;
});
//feat:触发资源输出到目录之前
emit
//feat:触发资源输出到目录之后
afterEmit
//feat:编译对象完成后
done
//feat:编译对象失败后
failed

//feat:编译对象无效时

//feat:监控编译关闭时
```


### 参考文献
[webpack:compiler](https://webpack.js.org/api/compiler-hooks/)
