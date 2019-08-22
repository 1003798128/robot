'use strict'

const appConfig = {
  cloudStorage: {
    name: '云存储接口',
    headerTitle: '法务云盘',
    description: '',
    baseUrl: 'http://172.16.6.106:50374'
  }
}

module.exports = {
  NODE_ENV: '"production"',
  PLATFORM: '"android"',
  NETWORK_ENVRIOMENT: '"public"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  APP_CONFIG: JSON.stringify(appConfig),
  APP_LOCATION: '"FUJIAN"'
}
