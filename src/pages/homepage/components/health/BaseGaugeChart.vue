<template>
  <div class="container">
    <div class="title" v-if="flag">
      <span class="left" /><span class="middle">{{ title }}</span><span class="right" />
    </div>
    <div class="chart_area">
      <div class="canvas" ref="guageChart"></div>
    </div>
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
} from "vue"
import { resize } from "utils/resizeChart"

// 获取全局变量
const { proxy } = getCurrentInstance()
const guageChart = ref()
const myChart = shallowRef(null)
const timer = ref(null)
const flag = ref(false)

const props = defineProps({
  title: String,
  series: {
    type: Array,
    // required: true,
    default: () => []
  },
})

const { series } = toRefs(props)

onMounted(() => {
  flag.value = false
  myChart.value = proxy.$echarts.init(guageChart.value)
  resize(myChart.value)
  timer.value = setTimeout(() => {
    myChart.value.resize()
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
  // return {
  //   ...optionsObj,
  //   series: {
  //     ...optionsObj.series,
  //     data: series.value
  //   }
  // }

  const gaugeData = [
    {
      value: 20,
      name: '目标完成度1',
      title: {
        offsetCenter: ['0%', '-55%'],
        color: "#fff",
        fontWeight: 'bold'
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-35%']
      }
    },
    {
      value: 40,
      name: '目标完成度2',
      title: {
        offsetCenter: ['0%', '-14%'],
        color: "#fff",
        fontWeight: 'bold'
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '5%'],
      }
    },
    {
      value: 60,
      name: '目标完成度3',
      title: {
        offsetCenter: ['0%', '27%'],
        color: "#fff",
        fontWeight: 'bold'
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '48%']
      }
    }
  ];
  return {

    series: [
      {
        animationDelay: 100,
        animationDuration: 1400,
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        color: ["#E80B39", "#87D803", "#14A4AA"],
        radius: '92%',
        center: ["50%", "50%"],
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            show: false,
            // borderWidth: 1,
            // borderColor: '#464646'
          }
        },
        axisLine: {
          lineStyle: {
            width: 30,
            color: [[1, "#181B22"]]
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: gaugeData,
        title: {
          fontSize: 12
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
  };
})

watch(series, () => {
  setOptions()
})
</script>

<style scope lang="scss">
$border-radius: 30px;

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #222430;
  border-radius: $border-radius;
  position: relative;

  .title {
    width: 100%;
    text-align: center;
    height: 20px;
    cursor: pointer;

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

  .chart_area {
    flex: 1;
    width: 100%;

    .canvas {
      height: 100%;
      width: 100%;
    }

  }

}
</style>
