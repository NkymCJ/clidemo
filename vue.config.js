const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
console.log(resolve)
const defaultSettings = require('./src/settings.js')
// Page title
const name = defaultSettings.title || 'Admin'
console.log(name)
// Dev port
// process.env.port => port = xxxx npm run dev OR npm run dev --port = xxxx
// process.env.npm_config_port => package.json: port
const port = process.env.port || process.env.npm_config_port || 8080
console.log(port)
console.log(process.env.port)
console.log(process.env.npm_config_port)

// const isProd = process.env.NODE_ENV === 'production'
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_API)
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/styles/var.scss";
          @import "~@/styles/mixin.scss";
        `
      }
    }
  },
  // JS的路径，如果是部署在服务器的一个子路径上，使用此属性
  // publicPath: isProd ? '/*' : '/',
  publicPath: '/',
  // 修改webpack的相关配置
  configureWebpack: {
    // 修改 js 文件输出路径
    output: {
      // filename: isProd ? '*/[name].[contenthash:8].js' : '[name].js',
      filename: '[name].js',
      // chunkFilename: isProd ? '*/[name].[contenthash:8].js' : '[name].js'
      chunkFilename: '[name].js'
    }
  },
  // 开发模式下，是否每次保存都检查语法，还有其他值可选。（前提：会在 @vue/cli-plugin-eslint 被安装之后生效。）
  lintOnSave: true,
  // 生产环境不生成sourceMap文件
  productionSourceMap: true,
  chainWebpack: config => {
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  }
}
