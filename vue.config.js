const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const defaultSettings = require('./src/settings.js')
// Page title
const name = defaultSettings.title || 'Admin'
console.log(name)
// Dev port
const port = 8080
console.log('NODE_ENV: ' + process.env.NODE_ENV)
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
console.log('isProd: ' + isProd)
console.log('isDev: ' + isDev)
console.log('BASE_API: ' + process.env.BASE_API)
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
  // assetsDir: '',
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: isDev,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      // Show info on browser when warn or error
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    output: {
      // Entry file Name
      filename: isProd ? 'js/[name].[contenthash:8].js' : '[name].js',
      // Others Name
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
        options.compilerOptions.preserveWhitespace = true
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
