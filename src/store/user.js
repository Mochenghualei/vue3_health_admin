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
