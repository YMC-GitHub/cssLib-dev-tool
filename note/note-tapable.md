>导出很多钩子，用于给插件创建钩子


### 安装 
```
npm install --save tapable
```

### 使用

`钩子类型`

钩子有同步(Sync)和异步(Async)之分。同步钩子根据用途又细分为成改时执行的，失败时执行的；根据执行顺序细分为瀑布型的和循环型的。
异步钩子根据并行还是串行，失败时执行还是成功时执行，是否瀑布型分为
成功时并发的/失败时并发的/成功时串行/失败时串行/串行瀑布
```
const {
  //同步
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
  //异步
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
```

`创建插件`
```
//steps-01:创建一个钩子
//01.所有钩子都是一个类
//02.所有钩子的构造函数，都带有一个可选的参数。
//03.该参数是一系列的参数名字
const aSyncHookInstance = new SyncHook(["arg1", "arg2", "arg3"]);

//steps-02:创建一个某类
//01.最佳的实践是导出所有的钩子到类的hooks属性
class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}
  //...
}

//steps-03:创建类的实例
const myCar = new Car();

//steps-04:用实例的钩子
//01.添加一个函数-同步函数：使用tap
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
//02.添加一个函数-带有参数
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
//03.添加一个函数-异步-允诺：使用tapPromise
myCar.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target, routesList) => {
	// return a promise
	return google.maps.findRoute(source, target).then(route => {
		routesList.add(route);
	});
});
//04.添加一个函数-异步-回调：使用tapAsync
myCar.hooks.calculateRoutes.tapAsync("BingMapsPlugin", (source, target, routesList, callback) => {
	bing.findRoute(source, target, (err, route) => {
		if(err) return callback(err);
		routesList.add(route);
		// call the callback
		callback();
	});
});
```

`拦截钩子`
```
myCar.hooks.calculateRoutes.intercept({
  //当钩子被触发时执行：使用call
	call: (source, target, routesList) => {
		console.log("Starting to calculate routes");
	},
  //当钩子添加某函数时：使用tap

  //使用loop
  //使用register
	register: (tapInfo) => {
		// tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
		console.log(`${tapInfo.name} is doing its job`);
		return tapInfo; // may return a new tapInfo object
	}
})
```

`钩子映射`
```
//创建
const keyedHook = new HookMap(key => new SyncHook(["arg"]))
//获取
keyedHook.for("some-key").tap("MyPlugin", (arg) => { /* ... */ });
keyedHook.for("some-key").tapAsync("MyPlugin", (arg, callback) => { /* ... */ });
keyedHook.for("some-key").tapPromise("MyPlugin", (arg) => { /* ... */ });
const hook = keyedHook.get("some-key");
if(hook !== undefined) {
	hook.callAsync("arg", err => { /* ... */ });
}
```

### 插件示例

[创建一个依赖于webpack-html-plugin插件的插件](https://github.com/jantimon/html-webpack-plugin#events)

### 参考文献
[webpack:tapable](https://github.com/webpack/tapable/tree/master)
