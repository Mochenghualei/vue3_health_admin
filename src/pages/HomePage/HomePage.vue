<template>
    <div class="homepage_container">
        <!-- 侧边栏 -->
        <div class="home_aside">
            <button @click="visible = true" class="showDrawnBtn">></button>
        </div>

        <!-- 抽屉 -->
        <MainDrawer v-model:visible="visible"></MainDrawer>

        <!-- 主体区域 -->
        <div class="home_main">
            <component :is="currentTab"></component>
        </div>

        <!-- 右侧区域 -->
        <div class="home_right">
            <!-- 播放器 -->
            <div class="audio_container" v-once>
                <BaseAudio />
            </div>

            <!-- 系统时间 -->
            <div class="clock_container" v-once>
                <BaseClock />
            </div>

            <!-- 天气 -->
            <div class="weather_container">
                <BaseWeather />
            </div>

            <!-- 指标 -->
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
import { ref, reactive, defineAsyncComponent, shallowRef } from "vue"
import MainDrawer from "./components/HomePageDrawer.vue"
const BaseAudio = defineAsyncComponent(() => import("components/BaseAudio.vue"))
const BaseClock = defineAsyncComponent(() => import("components/BaseClock.vue"))
const BaseSwitchTabs = defineAsyncComponent(() =>
    import("components/BaseSwitchTabs.vue")
)
const BaseWeather = defineAsyncComponent(() =>
    import("components/BaseWeather.vue")
)

const visible = ref(false)
let currentTab = shallowRef(null)

const handleSwitchTab = (tab) => {
    currentTab.value = tab
}
</script>
<style scoped lang="scss">
@import "styles/homepage.scss";
</style>
