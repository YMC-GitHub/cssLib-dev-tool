### 基于webpack开发样式类库

> 这里使用express建服务器


#### 特征简介

- [x] 自刷脚本
- [x] 自刷内容
- [x] 自刷样式
- [x] 自刷配置
- [x] 样式提取
- [x] 自动前缀
- [x] 预编样式
- [x] 样式压缩
- [x] 字体图标


#### 安装使用
```
方式1：（推荐）
step01:复制package.json
step02:npm install

方式2：
git clone  -b 3.0.0 https://github.com/YMC-GitHub/cssLib-dev-tool.git
......

//开发
npm run dev

//构建
pro:webpack4

//分析
npm run study
```

#### 一些命令

通过下面的命令分别使用产品模式和开发模式
```sh
::<<eof
# 开发模式
npm run dev:webpack4
npm run dev:simple-server
npm run dev:complex-server
# 产品模式
npm run pro:webpack4

eof
```

#### 入口文件

```sh
::<<eof
开发时的脚本入口文件为：./src/index.js
产品时的脚本入口文件为：./src/index.js
eof
```

#### 出口文件

```sh
::<<eof
开发时的脚本出口文件为：./dist/[name].js
产品时的脚本出口文件为：./dist/[name].js
产品时的样式出口文件为：
eof
```

#### 静态资源

```sh
::<<eof
开发时的静态资源目录为：/
eof
```

#### 清除目录

开发环境时，如果直接运行`npm run dev:webpack4`命令还是会输出文件的，但开发时不用它，用webpack-dev-server建简单的服务器或使用express+wenpack-dev-middware建立复杂的服务器。
产品环境时，由于输出文件到磁盘，多次输出后，构建目录可能会遗留之前的构建文件，因此在构建之前，先把之前的构建目录内容进行清除。此处使用clean-webpack-plugin插件。

#### 加载样式

开发环境时，使用css-loader加载器加载css文件
产品环境时，使用cssloader加载器加载css文件。

#### 行内样式

开发环境时，用style-loader加载器把css文件注入的html中（行内样式）。
产品环境时，使用外部样式，移除style加载器。

#### 提取样式

产品环境时，从html中把样式提取到css文件中。此处使用mini-css-extract-plugin插件对样式文件进行分离，并且使用该插件的加载器对提取的样式文件进行加载，以便后续实现压缩功能。样式文件提取后保存在`style.css`文件中

#### 压缩样式

产品环境时，对提样式文件进行压缩。此处使用optimize-css-assets-webpack-plugin插件进行。

#### 加载图片

对以png|jpe?g|gif|svg为后缀的图片文件，使用url-loader加载器进行加载，如果图片大小小于8kb，注入html的style标签内或css样式文件中；如果大于8kb，提取到工程的`img`目录，并以`[name]_[hash:7].[ext]`为文件名

#### 加载字体

对以woff2?|eot|ttf|otf为后缀的字体文件，使用url-loader加载器进行加载，如果字体大小小于1M，注入html的style标签内或css样式文件中；如果大于1M，提取到工程的`fonts`目录，并以`[name]_[hash:7].[ext]`为文件名

#### 预处理的

对以.less结尾的文件先用less-loader加载器加载，并经less类库处理成css。
对以.scss或sass结尾的文件先用sass-loader加载器加载，并经node-sass类库处理成css。

#### 自动前缀

对以.css文件，先使用postcss-loader加载器加载，使用postcss类库处理后，再进行其他处理。使用postcss处理时，使用autoprefixer类库作为postcss的插件使用，实现自动前缀。autoprefixer类库根据.browserslistrc文件中指定要兼容的浏览器种类和版本进行前缀处理。
而对于.less结尾的文件和.scss或sass结尾的文件，先经过各自的预处理器加载器加载，再用postcss-loader加载器加载，再进行其他处理。

注：一般用了postcss编写代码以后，less和sass/scss这些就可以舍弃了。postcss是趋势。


#### 浏端兼容

01.本项目的示例样式由于使用了这些特性[user-select-none,transforms2d,css-boxshadow,css-textshadow](http://www.iwanttouse.com/#user-select-none,transforms2d,css-boxshadow,css-textshadow)，所以示例只能支持这些浏览器:

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| >=3| >=4| >=4| >=15

02.支持全球85.13%的用户

#### 建服务器

`较简单的`
使用webpack-dev-server实现。此处通过向webpack配置的devServer字段设置一些相应的选项实现。

`较复杂的`
使用express+webpack-dev-middleware+webpack-hot-middleware实现。
实现内容监控:通过nodejs接口使用webpack，获得compiler；再将compiler传给webpack-dev-middleware，创建一个express的中间件devMiddleware;express通过use使用该中间件。这是这几个东东的组合。

实现页面重载:通过nodejs接口使用webpack，获得compiler；再将compiler传给webpack-hot-middleware，创建一个express的中间件hotMiddleware;express通过use使用该中间件（实现这是这几个东东的组合）。实现好这几个组合之后，还需要做两件事，其一是在webpack的配置文件中，对配置的entry的每个chunk前面加一个dev-client.js文件，这个文件作用是————接送服务器发送过来的推送，当服务器发送过来通知说要重新载入页面时，重新载入页面；第二件事是在当文件有改变时，服务端推送消息给客户端。这里通过在dev-server.js中引入page-reload.js，把compiler和hotMiddleware传给page-reload，让它做这件事，这个文件实现是————借助hotMiddleware的publish接口给客户端发送重载页面消息。

注：这里只谈一些重要的！

#### 建设记录
若想知道是怎么建的请点击[这里](./HISTORY.md)

#### 参考文献
[webpack-offical-docs:guides:hot-module-replacement](https://webpack.js.org/guides/hot-module-replacement/)
[webpack-hot-middleware-readme.md](https://github.com/webpack-contrib/webpack-hot-middleware)
