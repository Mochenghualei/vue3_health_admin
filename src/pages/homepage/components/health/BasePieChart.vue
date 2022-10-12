<template>
  <div class="container">
    <div class="title" v-if="flag">
      <span class="left" /><span class="middle">{{ title }}</span><span class="right" />
    </div>
    <div class="canvas" ref="pieChart"></div>
  </div>
</template>

<script setup>
import {
  ref,
  toRefs,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  watch,
  nextTick,
} from "vue"
import { pieChartOptions as optionsObj } from "./baseOptions"
import { resize } from "utils/resizeChart"

// 获取全局变量
const { proxy } = getCurrentInstance()
const pieChart = ref()
const myChart = shallowRef(null)
const timer = ref(null)
const flag = ref(false)

const props = defineProps({
  title: String,
  barWidth: String,
  series: {
    type: Array,
    required: true,
    default: () => []
  },
})

const { series, barWidth } = toRefs(props)

onMounted(() => {
  flag.value = false
  myChart.value = proxy.$echarts.init(pieChart.value)
  resize(myChart.value)
  timer.value = setTimeout(() => {
    setOptions()
  }, 800)
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})

function setOptions() {
  flag.value = true
  if (myChart.value) {
    myChart.value.setOption(options.value, true);
  }
}

const options = computed(() => {
  return {
    ...optionsObj,
    series: {
      ...optionsObj.series,
      data: series.value
    }
  }
})

watch(series, () => {
  setOptions()
})

watch(barWidth, () => {
  let timer = null
  nextTick(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      myChart.value.resize()
    }, 700)
  })
}, {
  immediate: true
})

</script>

<style scope lang="scss">
@import "styles/basechart.scss"
</style>
