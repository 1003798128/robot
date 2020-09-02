'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const appConfig = {
  tuzaimanage: {
    name: '云存储接口',
    headerTitle: '清洗机器人',
    description: '',
    baseUrl: 'http://47.103.15.136:8080'
  }
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  PLATFORM: '"android"',
  APP_CONFIG: JSON.stringify(appConfig)
})
