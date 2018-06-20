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