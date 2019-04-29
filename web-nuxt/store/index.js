export const state = () => ({
  session: null
})

export const mutations = {
  setAuth(state, session) {
    state.session = session
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    // 每次应用初始化的时候（刷新页面）根据token去服务端请求当前的用户状态
    // 然后给到 vuex
    // const res = await app.$axios().get('user/session')
    // commit('setAuth', res.data.data)
  }
}
