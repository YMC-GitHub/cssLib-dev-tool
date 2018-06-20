搭建开发环境-开发样式-v2.0.0

> 一定要注意版本，一定要注意版本，一定要注意版本！重要的事情说三遍。
## 创建工程
```
npm int
```

## 安装类库
```
npm install webpack@3.5.5 --save-dev
```

## 构建目录
```
//配置文件
Webpack.config.js
//源码目录
src
//入口文件
app/index.html
<script type="text/javascript" src="../build/bundle.js"></script>
app/index.js
//…随便写写
```

## 编译试试
```
node_modules/.bin/webpack
```

## 开浏览器
```
//安装类库
npm install opn --save-dev

//
var opn = require('opn');
opn(''http://localhost:8080');
```

## 建服务器
```
//step-01:安装类库
npm i express@4.16.13 -D

//step-02:设服务器
//dev-server.js
var express = require('express');
var app = express();
module.exports = app.listen(8080, function (err) {
  //出错时：
  if (err) {
    console.log(err)
    return
  }
  //成功时：
  var uri = 'http://localhost:' + 8080
  console.log('Dev server listening at ' + uri + '\n')
})

//step-03:运行命令
//node dev-server.js
  "scripts": {
    "dev": "node dev-server.js"
  }

```

## 自动刷新
```
//step01-安装类库
npm install --save-dev webpack-dev-middleware@1.8.3
npm install --save-dev webpack-hot-middleware@2.22.2
npm install --save-dev html-webpack-plugin@3.0.0
npm install --save-dev eventsource-polyfill

//step02-设服务器
//dev-server.js
var express = require('express');
var app = express();
var webpack = require('webpack');
var path = require('path');

//编译配置
var config = require('./config.js');
var webpackConfig = require('./wepack.config.dev.js');
var compiler = webpack(webpackConfig);

//内容监控
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

//模块替换
var hotMiddleware = require('webpack-hot-middleware')(compiler);

//页面重载
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    //发布一个事件
    hotMiddleware.publish({ action: 'reload' })
    //执行回调函数
    cb()
  })
});

//资源目录
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(config.dev.port, function (err) {
  //出错时：
  if (err) {
    console.log(err)
    return
  }

  //成功时：
  var uri = config.dev.host+':' + config.dev.port;
  console.log('Dev server listening at ' + uri + '\n');
});

//step03-开发部署
//config.js
var path = require('path');
module.exports = {
  dev: {
    //环境标识
    env: "development",
    //网络定位
    //域名
    host: 'http://localhost',
    //端口
    port: 8080,
    //路径
    path: '/',
    //文件


    //物理定位
    //目录
    dist:'dist',   
    //静态资源目录
    assetsSubDirectory: 'static',
    //静态资源根录
    assetsPublicPath: '/',

    //代理
    proxyTable: {},
    //样式资源映射
    cssSourceMap: false
  }
}

//step04-添加配置
//wepack.config.dev.js
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var config = require('./config.js');

//所用插件
var basePlugins, envPlugins;
basePlugins = [new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
})];
envPlugins = isProduction ? [
] : [ /*for lib it may be good as dev,pro for app*/
   new webpack.optimize.OccurrenceOrderPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoEmitOnErrorsPlugin(),
   new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './index.html'),
    filename: 'index.html',
    inject: 'body'
  })
];


var options = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath:config.dev.path,
    filename: "bundle.js"
  },
  devtool: '#eval-source-map',
  plugins: basePlugins.concat(envPlugins)
}

//自动刷新
Object.keys(options.entry).forEach(function (name) {
  options.entry[name] = ['./dev-client.js'].concat(options.entry[name])
})

module.exports = options;

//step05-设客户端
//dev-client.js
//事件兼容
require('eventsource-polyfill')

//页面重载
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

//step06-入口页面
//index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>css-lib-build</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
## 自刷配置
```
//step-01:安装类库
npm install nodemon@1.15.0 --save-dev
//step-02:运行命令
"dev:watch": "nodemon --watch dev-server.js --exec \" node dev-server.js\""
```

## 加载样式
```
//step01-安装类库
npm install --save-dev style-loader@0.20.2 css-loader@0.28.10

//step02-引入样式
//脚本中：
import './style.css';

//样式中：
url('./style.css');

//step03-配置文件
//其加载器
var cssLoader = ['style-loader', 'css-loader'];
var options = {
  module: {
    rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoader
      }
    ]
  }
}
```

## 自动前缀
```
//step-01:安装类库
npm i autoprefixer@8.0.0 postcss-loader@2.1.1 --save-dev
//step-02:添加配置
var cssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
var options = {
  module: {
    rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoader
      }
    ]
  }
}
//postcss.js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}

```

## 预编样式
```
//step-01:安装类库
npm install --save-dev less-loader@4.0.6 less@3.0.1
//step-02:添加配置
var cssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
var lessLoader = cssLoader.concat('less-loader');
var options = {
  module: {
    rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoader
      },
            {
        test: /\.less$/,
        exclude: /node_modules/,
        use: lessLoader
      }
    ]
  }
}
```
## 图片字体
```
//step-01:安装类库
npm install --save-dev file-loader@1.1.10 url-loader@1.0.1
//因为url-loader的fallcallback默认为file-loader，所以也需要安装

//step-02:添加配置
var options = {
  module: {
    rules: [  
  //.png|jpg|jpeg|gif|svg后缀文件用url-loader加载，大小超过限制默认用file-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './img/[name]_[hash:7].[ext]'
        }
      },
      //.woff2|eot|ttf|otf后缀文件用url-loader加载，大小超过限制默认用file-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './fonts/[name]_[hash:7].[ext]'
        }
      }
    ]
  }
}
```

## 产品环境
```
//step-01:安装依赖
npm install --save-dev nodemon@1.15.0

//step-02:添加配置
//webpack.config.js
//把webpack.config.dev.js改为=>webpack.config.js

var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

/***变量****/
var config = require('./config.js');
//环境标识
var isProduction = process.env.NODE_ENV === 'production';
//由于产品环境的配置和开发环境的配置写在,需要设置环境标识，区分是开发环境还是生产环境

//压缩后缀
var minPostfix = isProduction ? '.min' : '';

//文件指纹
var hash = isProduction ? '_[hash:8]' : '';

//样式提取
var ExtractCssOptions ={};
ExtractCssOptions.name = `style${hash}${minPostfix}.css`;

//其加载器
var cssLoader = ['style-loader', 'css-loader', 'postcss-loader'];
cssLoader[1] = isProduction ? 'css-loader?minimize' : cssLoader[1];
var lessLoader = cssLoader.concat('less-loader');


cssLoader = isProduction ? ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: cssLoader.splice(1),
}) : cssLoader;
lessLoader = isProduction ? ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: lessLoader.splice(1),
}) : lessLoader;


//所用插件
var basePlugins, envPlugins;
basePlugins = [new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
})];
envPlugins = isProduction ? [
  new ExtractTextPlugin(ExtractCssOptions.name, {
    allChunks: true
  })
] : [ /*for lib it may be good as dev,pro for app*/
   new webpack.optimize.OccurrenceOrderPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoEmitOnErrorsPlugin(),
   new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './index.html'),
    filename: 'index.html',
    inject: 'body'
  })
];


var options = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: isProduction ? "/assets/" : config.dev.path,
    filename: isProduction ? `bundle${hash}${minPostfix}.js` : "bundle.js"
  },
  devtool: '#eval-source-map',
  plugins: basePlugins.concat(envPlugins),
  module: {
    rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoader
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: lessLoader
      },
      
      //.png|jpg|jpeg|gif|svg后缀文件用url-loader加载
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',

        options: {
          limit: 10000,
          name: './img/[name]_[hash:7].[ext]'
        }
      },
      //.woff2|eot|ttf|otf后缀文件用url-loader加载
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './fonts/[name]_[hash:7].[ext]'
        }
      }
    ]
  }
}

//自动刷新
if(!isProduction){
Object.keys(options.entry).forEach(function (name) {
  options.entry[name] = ['./dev-client.js'].concat(options.entry[name])
})
}

module.exports = options;

//step-03:运行命令
  "scripts": {
    "build": "cross-env NODE_ENV=production node_modules/.bin/webpack"
  },

```

## 参考资料

- [webpack-自动刷新与解析](https://www.cnblogs.com/stoneniqiu/p/6444960.html)
- [webpack-dev-server开启服务监测js、HTML、CSS并自动刷新网页的套路详细步骤并附代码](https://www.jianshu.com/p/c6f9eb3cba60)
- [webpack 中 css 和 html 刷新问题的解决思路](https://www.cnblogs.com/liang1100/p/8457701.html)

## 遇到问题
```
问题：
TypeError: webpack.optimize.OccurenceOrderPlugin is not a constructor
解决：
https://www.jianshu.com/p/e5f870481db3

问题：webpack-dev-middleware Cannot read property 'invalid' of undefined
解决：切换不同的webpack-dev-middleware版本试试。
```