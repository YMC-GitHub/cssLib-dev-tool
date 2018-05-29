# 建设笔记

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
App
//入口文件
app/index.html
<script type="text/javascript" src="../build/bundle.js"></script>
app/index.js
//…随便写写
```

##编译试试
```
node_modules/.bin/webpack
```

##开浏览器
```
//此版本先自己手动打开浏览器，输入网址http://localhost:8080/
```

##建服务器
```
//安装类库
npm install webpack-dev-server@2.11.2 --save-dev
//配置文件
publicPath: "/assets/",
//修改html
<script type="text/javascript" src="/assets/bundle.js"></script>
//运行命令（此时实现了自动刷新脚本）
node_modules/.bin/webpack-dev-server --content-base app

```

##“自刷内容”
```
//安装类库
npm install --save-dev html-webpack-plugin@3.0.0
//添加配置
var HtmlWebpackPlugin = require('html-webpack-plugin'); //
plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname, 'app/index.html'), filename: 'index.html', inject: 'body' })]

```
##自刷样式
```
//安装类库
npm install --save-dev style-loader@0.20.2 css-loader@0.28.10
//引入样式
import './style.css';
//配置文件
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
}
```

> modules: true是ture还是false自行选择

##自刷配置
```
//安装类库
npm install nodemon@1.15.0 --save-dev
//修改配置
"dev": "nodemon --watch webpack.config.js --exec \" node_modules/.bin/webpack-dev-server --content-base app\""
```

> 有点问题，代处理。

##样式提取
```
//安装类库
npm install extract-text-webpack-plugin@3.0.0 --save-dev
//or npm install extract-text-webpack-plugin@3.0.0 -D
//增加配置
var ExtractTextPlugin = require("extract-text-webpack-plugin");
 module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
//提取方案
// https://blog.csdn.net/liuqi332922337/article/details/53157938
```
> 此次把提取关了。


## 自动前缀
```
//安装类库
npm i autoprefixer@8.0.0 postcss-loader@2.1.1 --save-dev
//添加配置
const autoprefixer = require('autoprefixer');
{
	test: /\.css$/,
	use: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					require('autoprefixer')({
						broswer: 'last 5 versions'
					}), //处理CSS前缀问题，自动添加前缀 
				]
			}
		}
	],
},
//or use postcss.config.js 
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
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
//安装类库
npm install --save-dev less-loader@4.0.6 less@3.0.1
//添加配置
{
	test: /\.less$/,
	exclude:/node_modules/,
	use: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					require('autoprefixer')({
						broswer: 'last 5 versions'
					}), //处理CSS前缀问题，自动添加前缀 
				]
			}
		},
		{
			loader: less-loader'
		},
	],
},

```
## 参考资料
[webpack-自动刷新与解析](https://www.cnblogs.com/stoneniqiu/p/6444960.html)
[webpack-dev-server开启服务监测js、HTML、CSS并自动刷新网页的套路详细步骤并附代码](https://www.jianshu.com/p/c6f9eb3cba60)
[webpack 中 css 和 html 刷新问题的解决思路](https://www.cnblogs.com/liang1100/p/8457701.html)
