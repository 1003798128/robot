/* eslint-disable */
import _ from 'lodash'
import axios from 'axios'
import Qs from 'qs'
import router from '../router'

const apps = process.env.APP_CONFIG
// const networkEnv = process.env.NETWORK_ENVRIOMENT

// 全局axios设定，post的请求头默认是formData
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  app: apps,
  request: function (api = {}, params = {}, configMore = {}) {
    let requestParams = params
    if (api.mock && api.mock.enable === true) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(api.mock.data)
        }, 1000)
      })
    }

    const app = apps[api.app]
    const config = {
      url: app.baseUrl + api.path, 
      method: api.method || 'post',
      // 数据类型
      dataType: api.dataType || 'json',
      // 传输类型
      contentType: api.contentType || 'json',
      // 默认返回类型json
      responseType: api.contentType || 'json',
      timeout: api.timeout || null,
      withCredentials: true,
      ..._.omit(configMore, 'headers'),
      headers: {
        'X-Requested-With': 'XMLHttpRequest', // 标记ajax的异步请求
            'Content-Type': (api.contentType === 'json' ? 'application/json' : api.contentType) || 'application/x-www-form-urlencoded; charset=utf-8',
        ...configMore.headers
      },
    }

    if (api.defaultParam) {
      requestParams = {
        ...requestParams,
        ...api.defaultParam
      }
    }

    if (config.dataType === 'json') {
      if (config.method === 'get') {
        config.params = requestParams
      } else {
        config.data = requestParams
      }
    } else {
      config.data = requestParams
      config.transformRequest = [function (data) {
        return Qs.stringify(data)
      }]
    }
    let $http = axios(config)
    $http.catch(function (exception) {
      let resData
      if (exception.response) {
        if (!exception.response.data) {
          resData = JSON.parse(exception.request.responseText)
        } else {
          resData = exception.response.data
        }
      }

      if (exception.response && exception.response.status) {
        if (exception.response.request.responseURL.indexOf('login') !== -1 || exception.response.request.responseURL.indexOf('/sms/send') !== -1) {
          return
        }
        switch (exception.response.status) {
          case 400:
            if (resData.errorCode !== undefined && resData.errorCode === '400sec-core-301') {
            } else if (resData.errorMessage) {
              Toast({
                message: resData.errorMessage,
                type: 'error',
                duration: 3 * 1000
              })
            }
            break
          case 401:
            router.replace({
              path: '/login'
            })
            break
          case 500:
            if (resData.message) {
              Toast({ 
                message: resData.message,
                iconClass: 'icon-error',
                duration: 3 * 1000
              })
            } else if (resData.errorMessage) {
              Toast({
                message: resData.errorMessage,
                iconClass: 'icon-error'
              })
            }
            break
          default:
            break
        }
      }
    })
    return $http
  }
}