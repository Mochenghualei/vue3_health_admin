<template>
  <div class="homepage_container">
    <div class="home_aside">
      <button @click="visible = true" class="showDrawnBtn">></button>
    </div>

    <!-- 抽屉 -->
    <Drawer v-model:visible="visible"></Drawer>

    <!-- 主体区域 -->
    <div class="home_main">
      <component :is="currentTab"></component>
    </div>

    <!-- 右侧区域 -->
    <div class="home_right">
      <!-- 播放器 -->
      <div class="audio_container">
        <Audio />
      </div>

      <!-- 切换 -->
      <div class="tabs_container">
        <SwitchTabs @handleSwitchTab="handleSwitchTab"></SwitchTabs>
      </div>

      <!-- 系统时间 -->
      <div class="clock_container">
        <Clock />
      </div>

      <!-- 天气 -->
      <div class="weather_container">
        <Weather />
      </div>

      <!-- 指标 -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, shallowRef } from "vue"
import Drawer from '@/components/Drawer.vue'
const Audio = defineAsyncComponent(() => import("components/Audio.vue"))
const SwitchTabs = defineAsyncComponent(() => import('components/SwitchTabs.vue'))
const Clock = defineAsyncComponent(() => import('components/Clock.vue'))
const Weather = defineAsyncComponent(() => import('components/Weather.vue'))

let currentTab = shallowRef(null)
const visible = ref(false)

const handleSwitchTab = (tab) => {
  currentTab.value = tab
}



</script>

<style scoped lang="scss">
@import "styles/homepage.scss";
</style>