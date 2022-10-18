<template>
  <div class="scatter_container">
    <div class="title_area">
      <!-- 散点图标题区域 -->
      <div class="sandian_title_line" :style="{
        backgroundColor: titleLeft == '5%' ? '#7731CC' : '#D0B06B'
      }"></div>
      <!-- 散点图title区域 -->
      <div :style="{ left: titleLeft }" class="sandian_title">
        <span>{{ titleLeft == "5%" ? "时长累计" : "热量累计" }}</span>
      </div>
    </div>

    <!-- 散点图区域 -->
    <div class="chart_area">
      <!-- 散点图1 -->
      <div :style="{'--width1':width1}" ref="areaOne" class="area_one" @click="toggleActive(1)">
        <BaseScatterChartOne v-if="width1 == '95%'" :series="seriesFour"></BaseScatterChartOne>
        <transition>
          <span v-show="width1 == '5%'" class="iconfont icon-zuo-copy"></span>
        </transition>
      </div>
      <!-- 散点图2 -->
      <div :style="{'--width2':width2}" ref="areaTwo" class="area_two" @click="toggleActive(2)">
        <BaseScatterChartTwo v-if="width2 == '95%'" :series="seriesFive"></BaseScatterChartTwo>
        <transition>
          <span v-show="width2 == '5%'" class="iconfont icon-zuo"></span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import BaseScatterChartOne from './BaseScatterChartOne.vue'
import BaseScatterChartTwo from './BaseScatterChartTwo.vue'

defineProps({
  seriesFour: {
    type: Array,
    required: true,
    default: () => []
  },
  seriesFive: {
    type: Array,
    required: true,
    default: () => []
  }
})

const width1 = ref("95%")
const width2 = ref("5%")
const titleLeft = ref("5%")
const titleRight = ref("")

const areaOne = ref()
const areaTwo = ref()

function toggleActive(index) {
  switch (index) {
    case 1:
      areaOne.value.classList.add("active")
      areaTwo.value.classList.remove('active')
      width1.value = '95%'
      width2.value = '5%'
      titleLeft.value = "5%"
      break;
    case 2:
      areaOne.value.classList.remove("active")
      areaTwo.value.classList.add('active')
      width1.value = '5%'
      width2.value = '95%'
      titleLeft.value = "85%"
      break;
  }
}
</script>

<style scoped lang="scss">
@import "styles/BaseScatterDiagram.scss"
</style>
