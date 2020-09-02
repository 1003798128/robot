'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const appConfig = {
  tuzaimanage: {
    name: '云存储接口',
    headerTitle: '清洗机器人',
    description: '',
    baseUrl: '/api'
  }
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLATFORM: '"android"',
  APP_CONFIG: JSON.stringify(appConfig)
})