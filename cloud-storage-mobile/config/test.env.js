'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

const appConfig = {
  cloudStorage: {
    name: '云存储接口',
    headerTitle: '法务云盘',
    description: '',
    baseUrl: '/api'
  }
}

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  PLATFORM: '"android"',
  NETWORK_ENVRIOMENT: '"inner"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  APP_CONFIG: JSON.stringify(appConfig)
})
