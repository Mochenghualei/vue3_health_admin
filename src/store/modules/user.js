import { setToken, getToken, removeToken } from "@/utils/token"
import { setUserInfo, getUserInfo, removeUserInfo } from "@/utils/userInfo"
const state = {
  token: getToken(),
  username: getUserInfo()
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERINFO(state, username) {
    state.username = username
  }
}
const actions = {
  setToken({ commit }, { token, username }) {
    return new Promise((resolve, reject) => {
      commit("SET_TOKEN", token),
        commit("SET_USERINFO", username)
      // 持久化存储token
      setToken(token)
      setUserInfo(username)
      resolve()
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_TOKEN", "")
      removeToken()
      removeUserInfo()
      resolve("removeTokenDone")
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
