import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import _ from "lodash";

const main = () => import("@/views/Main");

Vue.use(Router);
Vue.prototype.$ajax = axios;

const routes = () => [
  {
    path: "*",
    component: main
  },
  {
    path: "/main",
    name: "main",
    component: main
  }
];

let router;
const initRouter = () => {
  router = new Router({
    routes: routes()
  });
  router.beforeEach((to, from, next) => {
    next();
  });

  return router;
};

export default initRouter;
