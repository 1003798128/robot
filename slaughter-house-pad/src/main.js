import Vue from "vue";
import App from "./App";
import initRouter from "./router";
// import FastClick from 'fastclick'
import Vant from "vant";
import axios from "axios";
import uploader from "vue-simple-uploader";
import VueImg from "v-img";
// import VueTouch from 'vue-touch'
import VueLazyLoad from "vue-lazyload";
import VueTouch from "vue-touch";
import "./assets/css/onload.scss";
// import apis from './apis/index'
import store from "@/store";
import "vant/lib/index.css";
const EMPTY_OBJECT = {};

import("./assets/js/template");
import("./assets/css/common.scss");

// 加入fastclick，去除移动端的300ms延时
// FastClick.attach(document.body)
Vue.use(VueLazyLoad);
Vue.use(VueTouch, {
  name: "v-touch"
});
Vue.prototype.$http = axios;
// 封装storage，统一管理

Vue.use(uploader);
Vue.use(Vant);
Vue.use(VueImg);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: initRouter(),
  store: store.instance,
  components: {
    App
  },
  created() {
    document.addEventListener(
      "deviceready",
      () => {
        console.log("onDeviceReady");
      },
      false
    );
    // 监听键盘隐藏
    window.addEventListener("native.keyboardshow", function (e) {
      document.documentElement.style.height = "auto";
    });
    // 监听键盘隐藏
    window.addEventListener("native.keyboardhide", function (e) {
      document.documentElement.style.height = "100%";
    });
  },
  template: "<App/>"
});

Vue.directive('dpl', {
  // 当被绑定的元素插入到 DOM 中时……
  bind(el) {
    el.style.display = "none";
  }
})

window.onload = function () {
  const permissions =
    (window.cordova && window.cordova.plugins.permissions) || EMPTY_OBJECT;
  const permissionList = [
    permissions.WRITE_EXTERNAL_STORAGE,
    permissions.CAMERA,
    permissions.RECORD_AUDIO,
    permissions.READ_EXTERNAL_STORAGE
  ];
  permissions.requestPermissions &&
    permissions.requestPermissions(
      permissionList,
      function (success) {
        console.log(success);
      },
      function (error) {
        console.log(error);
      }
    );
};