const path = require('path')
const config = require('../config')

//export isPro to check process.env.NODE_ENV
exports.isPro = function () {
  return process.env.NODE_ENV === 'production' ? true : false
}
//export isDev to check process.env.NODE_ENV
exports.isDev = function () {
  return process.env.NODE_ENV === 'development' ? true : false
}
//export isTes to check process.env.NODE_ENV
exports.isTes = function () {
  return process.env.NODE_ENV === 'testing' ? true : false
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = exports.isPro()
    ? config.build.assetsSubDirectory.to
    : config.dev.assetsSubDirectory.to
  return path.posix.join(assetsSubDirectory, _path)
}
