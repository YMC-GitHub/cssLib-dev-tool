// see http://vuejs-templates.github.io/webpack for documentation.
const serverConfig = require('./server.config')
const projectDirConstrutoConfig = require('./dir.construtor')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    //网络定位
    host: serverConfig.build.host,
    port: serverConfig.build.port,
    //物理位置
    assetsRoot: serverConfig.build.www,
    assetsPublicPath: '/',
    index: serverConfig.build.index,
    assetsSubDirectory: { from: projectDirConstrutoConfig.static, to: 'static' },
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {
      NODE_ENV: '"development"',
      VUE_ENV: '"client"'
    },
    host: serverConfig.dev.host,
    port: serverConfig.dev.port,
    index: serverConfig.dev.index,
    autoOpenBrowser: true,
    assetsSubDirectory: { from: projectDirConstrutoConfig.static, to: 'static' },
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false,
    useEslint: false,
    showEslintErrorsInOverlay: false
  }
}
