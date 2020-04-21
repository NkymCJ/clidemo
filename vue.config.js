const path = require('path')
const resolve = dir => path.join(__dirname, dir)
console.log(resolve('src'))
const defaultSettings = require('./src/settings.js')
// Page title
const name = defaultSettings.title || '管理系统'
// Dev port 开发端口
const port = 8080
// NODE_ENV 环境判断
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
// Config
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDev,
  // 生产环境是否有映射
  productionSourceMap: false,
  // 开发服务器配置
  devServer: {
    port: port,
    open: false,
    overlay: {
      // 出现以下情况，是否展示在浏览器中
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // 为所有scss文件传入共享的全局变量、MIXIN
        prependData: `
          @import "~@/styles/var.scss";
          @import "~@/styles/mixin.scss";
        `
      }
    }
  },
  configureWebpack: {
    // 首页的title
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 入口文件的名字
      filename: isProd ? 'js/[name].[contenthash:8].js' : '[name].js',
      // 其他文件的名字
      chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : '[name].js'
    }
  },
  chainWebpack: config => {
    // Delte preload plugin
    config.plugins.delete('preload')
    // Delte prefetch plugin
    config.plugins.delete('prefetch')

    // Set Vue preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // 不保留元素之间的空格
        options.compilerOptions.preserveWhitespace = false
        // ...Others
        return options
      })
      .end()

    config
      .when(isProd,
        config => {
          // https://webpack.js.org/plugins/split-chunks-plugin
          config
            .optimization.splitChunks({
              // Split Chunks
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  // Only package third parties that are initially dependent
                  chunks: 'initial'
                },
                elementUI: {
                  // Split elementUI into a single package
                  name: 'chunk-elementUI',
                  // The weight needs to be larger than libs and app or it will be packaged into libs or app
                  priority: 20,
                  // In order to adapt to cnpm
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  // Can customize your rules
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  //  Minimum common number
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
