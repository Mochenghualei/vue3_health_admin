<template>
    <div class="login_container">
        <section>
            <div class="form">
                <p>login</p>
                <form>
                    <input
                        type="text"
                        ref="nameInput"
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
import { ref, reactive, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { message } from "ant-design-vue"
import { login as authLogin } from "api/request"

// get input focus
onMounted(() => {
    nameInput.value.focus()
})

const nameInput = ref(null)
const username = ref("")
const password = ref("")
const showPassWord = ref(false)
const key = "success"

const store = useStore()
const router = useRouter()

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
                store
                    .dispatch("user/setToken", {
                        token: res.data.token,
                        username: res.data.username,
                    })
                    .then(() => {
                        message.success({
                            content: res.message,
                            key,
                            duration: 3,
                        })
                        router.push("/index")
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
