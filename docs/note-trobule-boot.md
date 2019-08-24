
#### 问题描述

#### 错误信息
```
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
```
#### 我的配置
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  plugins: [new HtmlWebpackPlugin()]
};
```

#### 我的环境
```
node -e "var os=require('os');console.log('Node.js ' + process.version + '\n' + os.platform() + ' ' + os.release())"
Node.js v10.15.3
win32 10.0.18362

npm --version
6.4.1

npm ls webpack
webpack@4.1.1

npm ls html-webpack-plugin
html-webpack-plugin@3.2.0
```
#### 问题解决
update html-webpack-plugin to >= 3.0.7
`output:{path:path.resolve(__dirname,'dist')` 这个`resolve`用的`join`,改为`resolve`。
#### 参考文献
https://github.com/jantimon/html-webpack-plugin/issues/895
https://github.com/webpack/webpack/issues/6729
https://segmentfault.com/q/1010000015333090/a-1020000015908523



#### 问题描述
What does webpack mean by XX hidden modules
#### 错误信息

#### 我的配置

#### 我的环境

#### 问题解决
```md
# 方式01： set this --display-modules
 `"scripts": {"build": "webpack --display-modules"}` 
# 方式02：
use `stats: {maxModules: Infinity, exclude: undefined}`

```
#### 参考文献
https://stackoverflow.com/questions/28858176/what-does-webpack-mean-by-xx-hidden-modules
