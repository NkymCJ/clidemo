// const path = require('path')
// const resolve = dir => path.resolve(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)
console.log(process.env.PROJECT_ENV)
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/index.scss";'
      }
    }
  },
  // JS的路径，如果是部署在服务器的一个子路径上，使用此属性
  // publicPath: isProd ? '/web' : '/',
  publicPath: '/',
  // 修改webpack的相关配置
  configureWebpack: {},
  // 开发模式下，是否每次保存都检查语法，还有其他值可选。（前提：会在 @vue/cli-plugin-eslint 被安装之后生效。）
  lintOnSave: true,
  // 生产环境不生成sourceMap文件
  productionSourceMap: false,
  chainWebpack: config => {
    // // 移除 prefetch 插件
    // config.plugins.delete('prefetch')

    // // 或者
    // // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  }
}
