<template>
    <div class="homepage_container">
        <!-- 初始蒙版 -->
        <div class="mask" v-if="startStyleShow">
            <h1 @click.once="startStyleShow = false">Hello,{{ username }}</h1>
        </div>
        <!-- 侧边栏 -->
        <div class="home_aside" v-if="!startStyleShow">
            <button @click="visible = true" class="showDrawnBtn">></button>
        </div>

        <!-- 抽屉 -->
        <MainDrawer
            v-model:visible="visible"
            v-if="!startStyleShow"
        ></MainDrawer>

        <!-- 主体区域 -->
        <div class="home_main" v-if="!startStyleShow">
            <keep-alive>
                <component :is="currentTab"></component>
            </keep-alive>
        </div>

        <!-- 右侧区域 -->
        <div class="home_right" v-if="!startStyleShow">
            <!-- 欢迎语和退出按钮 -->
            <div v-once class="logout_welcome">
                <div class="welcome">
                    Welcome
                    {{
                        username
                            ? username.charAt(0).toUpperCase() +
                              username.slice(1)
                            : ""
                    }}
                </div>
                <div class="logout_btn">
                    <button class="btn" @click="logout">退出登录</button>
                </div>
            </div>
            <!-- 播放器 -->
            <div class="audio_container" v-once>
                <BaseAudio />
            </div>

            <!-- 系统时间 -->
            <div class="clock_container" v-once>
                <BaseClock />
            </div>

            <!-- 指标 -->
            <div class="kpi_container">
                <baseKpi
                    :totalTime="data.totalTime"
                    :totalDay="data.totalDay"
                    :avgWeight="data.avgWeight"
                    :avgBMI="data.avgBMI"
                ></baseKpi>
            </div>

            <!-- 天气 -->
            <div class="weather_container">
                <BaseWeather />
            </div>

            <!-- 切换 -->
            <div class="tabs_container" v-once>
                <BaseSwitchTabs
                    @handleSwitchTab="handleSwitchTab"
                ></BaseSwitchTabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineAsyncComponent, shallowRef, inject } from "vue"
import { useRouter } from "vue-router"

import { useHomePageStore } from "store/homePage"
import { useUserStore } from "store/user"
import MainDrawer from "./components/HomePageDrawer.vue"
import { getUserInfo } from "utils/userInfo"
const BaseAudio = defineAsyncComponent(() => import("components/BaseAudio.vue"))
const BaseClock = defineAsyncComponent(() => import("components/BaseClock.vue"))
const BaseSwitchTabs = defineAsyncComponent(() =>
    import("components/BaseSwitchTabs.vue")
)
const BaseWeather = defineAsyncComponent(() =>
    import("components/BaseWeather.vue")
)
const baseKpi = defineAsyncComponent(() => import("components/BaseKpi.vue"))

const visible = ref(false)
// 蒙版按钮
const startStyleShow = ref(true)
let currentTab = shallowRef(null)
// 获取store
const homePageStore = useHomePageStore()
const userStore = useUserStore()
const data = homePageStore.data
const username = getUserInfo()
const $router = useRouter()
const message = inject("message")

function handleSwitchTab(tab) {
    currentTab.value = tab
}

function logout() {
    userStore.logout().then((res) => {
        if (res == "removeTokenDone") {
            $router.push("/login")
            message.success({ content: "请重新登录", duration: 3 })
        }
    })
}
</script>
<style scoped lang="scss">
@import "styles/homepage.scss";
</style>
