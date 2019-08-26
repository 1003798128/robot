'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const appConfig = {
  cloudStorage: {
    name: '云存储接口',
    headerTitle: '兴旺屠宰场监管系统',
    description: '',
    baseUrl: '/api'
  }
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLATFORM: '"android"',
  NETWORK_ENVRIOMENT: '"inner"',
  APP_CONFIG: JSON.stringify(appConfig)
})
