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
            <keep-alive>
                <component :is="currentTab"></component>
            </keep-alive>
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

            <!-- 指标 -->
            <div class="kpi_container">
                <baseKpi :totalTime="data.totalTime" :totalDay="data.totalDay" :avgWeight="data.avgWeight"
                    :avgBMI="data.avgBMI"></baseKpi>
            </div>

            <!-- 天气 -->
            <div class="weather_container">
                <BaseWeather />
            </div>

            <!-- 切换 -->
            <div class="tabs_container" v-once>
                <BaseSwitchTabs @handleSwitchTab="handleSwitchTab"></BaseSwitchTabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, shallowRef } from "vue"
import { useHomePageStore } from "store/homePage"
import MainDrawer from "./components/HomePageDrawer.vue"
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
let currentTab = shallowRef(null)
const homePageStore = useHomePageStore()
const data = homePageStore.data

const handleSwitchTab = (tab) => {
    currentTab.value = tab
}
</script>
<style scoped lang="scss">
@import "styles/homepage.scss";
</style>
