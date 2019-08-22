'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const appConfig = {
  cloudStorage: {
    name: '云存储接口',
    headerTitle: '法务云盘',
    description: '',
    baseUrl: '/api'
  }
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLATFORM: '"android"',
  NETWORK_ENVRIOMENT: '"inner"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  APP_CONFIG: JSON.stringify(appConfig),
  APP_LOCATION: '"JIANGSU"'
})
