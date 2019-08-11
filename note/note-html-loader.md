>加载html文件


### 安装 
```
npm install --save html-loader
```

### 使用

01.设置支持加载图片
02.设置处理哪些属性
03.支持处理自定元素
04.支持压缩内容文件
05.设置内容导出格式
06.支持设置多个配置
07.设置导出到各文件
```
//--------------
//基本架构
//--------------
{
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: [':data-src']
    }
  }
}


//--------------
//设置处理哪些属性
//--------------
htmlLoaderOptions.attrs=["img:src", "link:href"]
//--------------
//设置导出到各文件
//--------------
htmlLoader = ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader']

```
### 参考文献
[webpack:tapable](https://github.com/webpack/tapable/tree/master)
