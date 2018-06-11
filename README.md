### 基于webpack开发样式类库

> 这里使用webpack-dev-server建服务器


#### 特征简介

- 自刷脚本
- 自刷内容
- 自刷样式
- 自刷配置
- 样式提取
- 自动前缀
- 预编样式
- 样式压缩
- 字体图标


##### 安装使用
```
方式1：（推荐）
step01:复制package.json
step02:npm install

方式2：
......

//开发
npm run start

//构建输出
npm run build

//构建分析
npm run study
```

##### 技术准备
|类目|描述|
|----|----|
|环境变量|webpack.DefinePlugin|
|传入参数|cross-env@5.1.4|
|样式提取|extract-text-webpack-plugin@3.0.0|
|字体图标|file-loader@1.1.10|
|样式压缩|css-loader@0.28.10|

##### 建设记录
若想知道是怎么建的请点击[这里](./HISTORY.md)

##### 更新内容

改变目录结构

|目录|原先|现在|
|----|----|----|
|源码目录|app|src|
|示例目录|app|demo|
|输出目录|build|dist|



