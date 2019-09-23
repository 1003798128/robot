import Vue from 'vue'
import App from './App'
import initRouter from './router'
// import FastClick from 'fastclick'
import Vant from 'vant'
import axios from 'axios'
import uploader from 'vue-simple-uploader'
import VueImg from 'v-img'
import jq from 'jquery'
// import VueTouch from 'vue-touch'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'
import './assets/css/onload.scss'
// import apis from './apis/index'
import store from '@/store'
import 'vant/lib/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const EMPTY_OBJECT = {}

import('./assets/js/template')
import('./assets/css/common.scss')

// 加入fastclick，去除移动端的300ms延时
// FastClick.attach(document.body)

Vue.use(VueLazyLoad)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.prototype.$http = axios
// 封装storage，统一管理

Vue.use(uploader)
Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(VueImg)
Vue.use(jq)
Vue.config.productionTip = false

// window.addEventListener('popstate', function (event) {
//   window.history.pushState('forward', null, '#' + router.history.current.fullPath)
//   window.history.forward(1)
// })

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
window.screen.orientation.lock('landscape')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: initRouter(),
  store: store.instance,
  components: { App },
  created () {
    document.addEventListener('deviceready', () => {
      console.log('onDeviceReady')
    }, false)
// 监听键盘隐藏
    window.addEventListener('native.keyboardshow', function (e) {
      document.documentElement.style.height = 'auto'
    })
// 监听键盘隐藏
    window.addEventListener('native.keyboardhide', function (e) {
      document.documentElement.style.height = '100%'
    })
    // let clickTime = new Date()
    // window['goBack'] = () => {
    //   if (this.$route.name === 'index' || this.$route.name === 'shareFile' || this.$route.name === 'publicSpace') {
    //     eventBus.$emit('goBack')
    //   } else if (this.$route.name === 'login' ||
    //     this.$route.name === 'transfer' || this.$route.name === 'setInfo') {
    //     let nowTime = new Date()
    //     if ((nowTime - clickTime) < 1000) {
    //       window.cordova && window.cordova.plugins.ConfigPlugins.exitApp(() => {
    //         console.log('success---------')
    //       }, () => {
    //         console.log('fail---------')
    //       })
    //     } else {
    //       clickTime = new Date()
    //       window.cordova && window.cordova.plugins.ConfigPlugins.Toast(() => {
    //         console.log('success---------')
    //       }, () => {
    //         console.log('success---------')
    //       }, '再点击一次返回键退出APP')
    //     }
    //   } else {
    //     this.$router.go(-1)
    //     clickTime = new Date()
    //   }
    // }

    // eventBus.$off('finish')
    // eventBus.$on('finish', () => {
    //   console.log('finish')
    //   let nowTime = new Date()
    //   if ((nowTime - clickTime) < 1000) {
    //     window.cordova && window.cordova.plugins.ConfigPlugins.exitApp(() => {
    //       console.log('success---------')
    //     }, () => {
    //       console.log('fail---------')
    //     })
    //   } else {
    //     clickTime = new Date()
    //     window.cordova && window.cordova.plugins.ConfigPlugins.Toast(() => {
    //       console.log('success---------')
    //     }, () => {
    //       console.log('success---------')
    //     }, '再点击一次返回键退出APP')
    //   }
    // })
  },
  template: '<App/>'
})

window.onload = function () {
  const permissions = (window.cordova && window.cordova.plugins.permissions) || EMPTY_OBJECT
  const permissionList = [permissions.WRITE_EXTERNAL_STORAGE, permissions.CAMERA, permissions.RECORD_AUDIO, permissions.READ_EXTERNAL_STORAGE]
  permissions.requestPermissions && permissions.requestPermissions(permissionList, function (success) {
    console.log(success)
  }, function (error) {
    console.log(error)
  })

  // jq('body').append(detectVersion())
  // getVersion()

  // let nowTime = window.parseInt(new Date().getDate())

  // function getVersion () {
  //   window.cordova && window.cordova.getAppVersion.getVersionCode().then(function (version) {
  //     apis.request(cloudApi.getAppVersion, { clientType: 1 }).then(function (response) {
  //       response = response.data
  //       if (parseInt(version) < response.versionCode && (response.isForce === 1 || parseInt(version) < response.lastForceVersion)) {
  //         jq('.updateApp').css('display', 'block')
  //         jq('.versionId').text(response.versionName)
  //         jq('.contentVersion').html(response.versionDesc)
  //         jq('.delay').css('color', 'grey')
  //         jq('.rightNow').click(function () {
  //           jq('.msbox-show').css('display', 'none')
  //           jq('.progress-wrapper').css('display', 'block')
  //           window.resolveLocalFileSystemURL(window.cordova && window.cordova.file.externalApplicationStorageDirectory, function (root) {
  //             root.getDirectory('files', { create: true }, function (filesDirEntry) {
  //               filesDirEntry.getDirectory('package', { create: true }, function (childdwFilesDirEntry) {
  //                 childdwFilesDirEntry.getFile('yunpan.apk', { create: true }, function (fileEntry) {
  //                   var ft = new window.FileTransfer()
  //                   var fileURL = fileEntry.toURL()

  //                   ft.onprogress = function (e) {
  //                     if (e.lengthComputable) {
  //                         // time++
  //                       jq('.progress').css('display', 'block')
  //                         // if (time === 1000) {
  //                       var progress = ((e.loaded / e.total) * 100).toFixed(1)
  //                       jq('.proNum').text(progress + '%')
  //                       jq('progress').attr('value', progress)
  //                       jq('.progress-scale').text(bytesToSize(e.loaded) + '/' + bytesToSize(e.total))
  //                           // time = 0
  //                         // }
  //                     }
  //                   }

  //                   ft.download(response.updateUrl, fileURL, function (entry) {
  //                     jq('.msbox-show').css('display', 'block')
  //                     jq('.progress-wrapper').css('display', 'none')
  //                     window.cordova && window.cordova.plugins.fileOpener2.showOpenWithDialog(
  //                         fileURL,
  //                         'application/vnd.android.package-archive',
  //                       {
  //                         error: function (e) {
  //                         },
  //                         success: function () {
  //                         }
  //                       }
  //                       )
  //                   }, function (err) {
  //                     console.log(err)
  //                   }, null, {})
  //                 })
  //               })
  //             }, function (err) {
  //               console.log(err)
  //             })
  //           }, function (err) {
  //             console.log(err)
  //           })
  //         })
  //       }
  //       if (parseInt(version) < response.versionCode && response.isForce === 0) {
  //         if (!window.$storage.get('nextUpdateTime') || (window.parseInt(window.$storage.get('nextUpdateTime')) !== nowTime)) {
  //           jq('.updateApp').css('display', 'block')
  //           jq('.versionId').text(response.versionName)
  //           jq('.contentVersion').html(response.versionDesc)
  //           jq('.delay').click(function () {
  //             window.$storage.set({
  //               nextUpdateTime: new Date().getDate()
  //             })
  //             jq('.updateApp').css('display', 'none')
  //           })
  //           jq('.rightNow').click(function () {
  //             jq('.msbox-show').css('display', 'none')
  //             jq('.progress-wrapper').css('display', 'block')
  //             window.resolveLocalFileSystemURL(window.cordova && window.cordova.file.externalApplicationStorageDirectory, function (root) {
  //               root.getDirectory('files', { create: true }, function (filesDirEntry) {
  //                 filesDirEntry.getDirectory('package', { create: true }, function (childdwFilesDirEntry) {
  //                   childdwFilesDirEntry.getFile('yunpan.apk', { create: true }, function (fileEntry) {
  //                     var ft = new window.FileTransfer()
  //                     var fileURL = fileEntry.toURL()

  //                     ft.onprogress = function (e) {
  //                       if (e.lengthComputable) {
  //                           // time++
  //                         jq('.progress').css('display', 'block')

  //                           // if (time === 1000) {
  //                         var progress = ((e.loaded / e.total) * 100).toFixed(1)
  //                         jq('.proNum').text(progress + '%')
  //                         jq('progress').attr('value', progress)
  //                         jq('.progress-scale').text(bytesToSize(e.loaded) + '/' + bytesToSize(e.total))
  //                           // time = 0
  //                           // }
  //                       }
  //                     }

  //                     ft.download(response.updateUrl, fileURL, function (entry) {
  //                       jq('.msbox-show').css('display', 'block')
  //                       jq('.progress-wrapper').css('display', 'none')
  //                       window.cordova && window.cordova.plugins.fileOpener2.showOpenWithDialog(
  //                           fileURL,
  //                           'application/vnd.android.package-archive',
  //                         {
  //                           error: function (e) {

  //                           },
  //                           success: function () {

  //                           }
  //                         }
  //                         )
  //                     }, function (err) {
  //                       console.log(err)
  //                     }, null, {})
  //                   })
  //                 })
  //               }, function (err) {
  //                 console.log(err)
  //               })
  //             }, function (err) {
  //               console.log(err)
  //             })
  //           })
  //         }
  //       }
  //     })
  //   })
  // }
}
