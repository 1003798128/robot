
const record = {
  /**
   * 初始化state
   */
  state: {
    loginInfo: {
      name: ''
    }
  },

  /**
   * 用来获取state
   */
  getters: {
    loginInfo (state, getters, rootState) {
      return state.loginInfo
    }
  },

  /**
   * 用来更改state
   */
  mutations: {
    SET_LOGIN_INFO (state, payload) {
      state.formData = payload
    }
  },
  /**
   * 用来发起action，可以是异步的，可以是同步的
   */
  actions: {
  }
}
export default record
