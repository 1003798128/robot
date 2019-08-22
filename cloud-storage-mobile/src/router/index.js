import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

const helloWorld = () => import('@/views/HelloWorld')

Vue.use(Router)
Vue.prototype.$ajax = axios

const routes = () => [
  {
    path: '*',
    component: helloWorld
  },
  {
    path: '/helloWorld',
    name: 'helloWorld',
    component: helloWorld
  }
]

let router
const initRouter = () => {
  router = new Router({
    routes: routes()
  })
  router.beforeEach((to, from, next) => {
    next()
  })

  return router
}

export default initRouter
