'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const appConfig = {
  tuzaimanage: {
    name: '云存储接口',
    headerTitle: '兴旺屠宰场监管系统',
    description: '',
    baseUrl: 'http://47.103.15.136:8080'
  }
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  PLATFORM: '"android"',
  APP_CONFIG: JSON.stringify(appConfig)
})
