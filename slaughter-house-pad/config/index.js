
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const argv = (process.argv && process.argv.splice(2)) || []

console.log('argv', argv)

let devEnv = require('./dev.env')
let prodEnv = require('./prod.env')

if (argv.length >= 2 && argv[0] === 'platform') {
  prodEnv = require(`./prod.${argv[1]}.env`)
  devEnv = require(`./dev.${argv[1]}.env`)
}

module.exports = {
  build: {
    env: prodEnv,
    // index: path.resolve(__dirname, '../dist/index.html'),
    // assetsRoot: path.resolve(__dirname, '../dist'),
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',

    index: path.resolve(__dirname, '../../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devEnv,
    port: process.env.PORT || 8808,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    // 是否启动eslint
    useEslint: false,
    // 启用本地开发代理
    proxyTable: {
      '/api': {
        // target: 'http://172.16.6.106:50374',
        // target: 'http://172.16.6.49:50374', // dev环境
        // target: 'http://172.16.6.50:50374',
        // target: 'http://172.16.6.101:3000',
        // target: 'http://172.16.6.51:8863',
        // target: 'http://172.16.5.240:8080',// 黄浩
        target: 'http://172.16.6.106:50374',
        // target: 'http://101.37.189.238',
        // target: 'http://127.0.0.1:8080',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
