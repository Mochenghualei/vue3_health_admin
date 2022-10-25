<template>
    <div class="login_container">
        <section>
            <div class="form">
                <p>登录</p>
                <form>
                    <input
                        type="text"
                        v-focus
                        placeholder="用户名"
                        v-model.lazy.trim="username"
                    />
                    <span class="passInput">
                        <input
                            :type="showPassWord ? 'text' : 'password'"
                            placeholder="密码"
                            v-model.lazy.trim="password"
                        />
                        <span class="eye" @click="showPassWord = !showPassWord">
                            <eye-filled v-if="!showPassWord" />
                            <eye-invisible-filled v-else />
                        </span>
                    </span>
                    <button type="submit" @click.prevent="login()">
                        Login
                    </button>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, inject, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import { login as authLogin } from "api/request"
import { useUserStore } from "store/user"

const message = inject("message")

// get input focus
const vFocus = {
    mounted(el) {
        el.focus()
    },
}
// use pinia
const userStore = useUserStore()
const username = ref("")
const password = ref("")
const showPassWord = ref(false)
const key = "success"
const $router = useRouter()

// login
function login() {
    message.loading({
        content: "Loading...",
        key,
    })
    if (!username.value || !username.value.replace(/\s*/g, "")) {
        message.error({ content: "请输入用户名", key, duration: 3 })
        username.value = ""
        return
    }
    if (!password.value || !password.value.replace(/\s*/g, "")) {
        message.error({ content: "请输入密码", key, duration: 3 })
        return
    }
    authLogin({ username: username.value, password: password.value }).then(
        (res) => {
            if (res.code == 200 && res.data.token) {
                // 存储tokens
                userStore
                    .setToken({
                        token: res.data.token,
                        username: res.data.username,
                    })
                    .then(() => {
                        message.success({
                            content: res.message,
                            key,
                            duration: 3,
                        })
                        $router.push("/homepage")
                    })
            } else {
                message.error({ content: res.message, key, duration: 3 })
            }
        }
    )
}
</script>

<style scoped lang="scss">
@import "styles/login.scss";
</style>
