import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as modules from './modules'
import appModule from './modules/app'

Vue.use(Vuex)

const isProduction = process.env.NODE_ENV === 'production'

let instance = null

instance = new Vuex.Store({
  modules,
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
  // 不要在发布环境下启用严格模式！
  // 严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  // 记录状态的快照，仅在开发环境使用
  plugins: !isProduction ? [createLogger()] : []
})

const initialStateCopy = JSON.parse(JSON.stringify(instance.state))

// store.replaceState 用于时光旅行
export const resetState = function () {
  instance.replaceState({
    ...JSON.parse(JSON.stringify(initialStateCopy)),
    // 除了app的state不恢复，其他重置
    App: appModule.state
  })
}

export { instance }

export default {}
