>有权访问所有的模块和他们的依赖


01.为方便提供这些钩子，它继承了Tapable。
02.由编译器创建或者构建



### 生命钩子

01.如何访问钩子
02.支持哪些钩子
```
compilation.hooks.someHookName.tap(/* ... */);

//feat:构建模块时
compilation.hooks.buildModule.tap('SourceMapDevToolModuleOptionsPlugin',
  module => {
    module.useSourceMap = true;
  }
);
//feat:重建模块时
rebuildModule

//feat:建模失败时
failedModule
//feat:建模成功时


//feat:所有模块构建没有出错时
finishModules

//feat:重新建模完成时
finishRebuildingModule
//feat:停止接受新模块时
seal
//feat:开始接受新模块时
unseal
```

### 参考文献
[webpack:compiler](https://webpack.js.org/api/compiler-hooks/)
