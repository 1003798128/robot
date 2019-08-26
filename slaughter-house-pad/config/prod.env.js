'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const appConfig = {
  cloudStorage: {
    name: '云存储接口',
    headerTitle: '兴旺屠宰场监管系统',
    description: '',
    baseUrl: 'http://218.5.2.1:18080'
  }
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  PLATFORM: '"android"',
  APP_CONFIG: JSON.stringify(appConfig)
})
