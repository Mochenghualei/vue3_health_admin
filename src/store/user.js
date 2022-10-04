import { defineStore } from "pinia"
import { setToken, getToken, removeToken } from "@/utils/token"
import { setUserInfo, getUserInfo, removeUserInfo } from "@/utils/userInfo"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            token: getToken(),
            username: getUserInfo(),
        }
    },

    actions: {
        setToken({ token, username }) {
            return new Promise((resolve, reject) => {
                this.token = token
                this.username = username
                // 持久化存储token
                setToken(token)
                setUserInfo(username)
                resolve()
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                this.token = ""
                removeToken()
                removeUserInfo()
                resolve("removeTokenDone")
            })
        },
    },

    getters: {},
})

// const state = {
//     token: getToken(),
//     username: getUserInfo(),
// }
// const mutations = {
//     SET_TOKEN(state, token) {
//         state.token = token
//     },
//     SET_USERINFO(state, username) {
//         state.username = username
//     },
// }
// const actions = {
//     setToken({ commit }, { token, username }) {
//         return new Promise((resolve, reject) => {
//             commit("SET_TOKEN", token), commit("SET_USERINFO", username)
//             // 持久化存储token
//             setToken(token)
//             setUserInfo(username)
//             resolve()
//         })
//     },
//     logout({ commit }) {
//         return new Promise((resolve, reject) => {
//             commit("SET_TOKEN", "")
//             removeToken()
//             removeUserInfo()
//             resolve("removeTokenDone")
//         })
//     },
// }
// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions,
// }
