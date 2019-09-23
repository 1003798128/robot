import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

const login = () => import('@/views/Login')
const main = () => import('@/views/Main')
const burningMain = () => import('@/views/burningMain')
const detail = () => import('@/views/Detail')
const createNewBatch = () => import('@/views/CreateNewBatch')

Vue.use(Router)
Vue.prototype.$ajax = axios

const routes = () => [
  {
    path: '*',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/createNewBatch',
    name: 'createNewBatch',
    component: createNewBatch
  },
  {
    path: '/main',
    name: 'main',
    component: main
  },
  {
    path: '/burningMain',
    name: 'burningMain',
    component: burningMain
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
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
