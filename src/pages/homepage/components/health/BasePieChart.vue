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
$border-radius: 30px;

.container {
  width: 100%;
  height: 100%;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  background-color: #222430;
  border-radius: $border-radius;

  .title {
    width: 100%;
    text-align: center;
    height: 20px;

    .left {
      display: inline-block;
      border: 20px solid transparent;
      border-bottom: 20px solid #181B22;
      transform: translate(20px, -20px) rotate(45deg);
      border-radius: 30%;
    }

    .right {
      display: inline-block;
      border: 20px solid transparent;
      border-bottom: 20px solid #181B22;
      transform: translate(-20px, -20px) rotate(-45deg);
      border-radius: 30%;
    }

    .middle {
      display: inline-block;
      height: 23px;
      width: 120px;
      white-space: nowrap;
      line-height: 23px;
      font-size: 13px;
      color: #fff;
      background-color: #181B22;
      transform: translateY(-23px);
    }
  }

  .canvas {
    flex: 1;
  }
}

.container_one {
  .drop_dowm {
    margin-left: 20px;
  }
}

.container_two {
  .back_btn {
    z-index: 999;
    color: #fff;
    position: fixed;
    left: 679px;
    margin-top: 10px;
    cursor: pointer;
  }

  .back_btn :hover {
    transition: all ease 0.2s;
    color: #00FCFF
  }
}


.container_four,
.container_five {
  width: 1030px;
  height: 100%;
}
</style>
