<template>
    <div class="container">
        <div class="title">
            <span class="left" /><span class="middle">666</span><span class="right" />
        </div>
        <div ref="lineChart" class="canvas"></div>
    </div>
</template>

<script setup>
import {
    ref,
    shallowRef,
    reactive,
    onMounted,
    getCurrentInstance,
    computed,
    watch,
} from "vue"
import { resize } from "utils/resizeChart"
import { lineChartOptions } from "./baseOptions"

// 获取全局变量
const { proxy } = getCurrentInstance()
const lineChart = ref()
const myChart = shallowRef(null)

const { series, xAxisData } = defineProps({
    series: {
        type: Array,
        required: true,
        default: () => []
    },
    xAxisData: {
        type: Array,
        required: true,
        default: () => []
    }
})

onMounted(() => {
    myChart.value = proxy.$echarts.init(lineChart.value)
    resize(myChart.value)
    setOptions()
})

function setOptions() {
    if (myChart.value) {
        myChart.value.setOption(options.value)
    }
}

// 计算legendData供options使用
const legendData = computed(() => {
    return series.reduce(
        (pre, cur, index) => {
            pre[index].name = cur.name
            pre[index].itemStyle = lineChartOptions.legend.data[index].itemStyle
            return pre
        },
        [{}, {}]
    )
})

// 计算series供options使用
const seriesData = computed(() => {
    let arr = []
    series.forEach((item, index) => {
        arr.push({
            name: item.name,
            data: item.data,
            ...lineChartOptions.series[index],
        })
    })
    return arr
})

const options = computed(() => {
    return {
        ...lineChartOptions,
        legend: {
            ...lineChartOptions.legend,
            data: legendData.value,
        },
        xAxis: {
            ...lineChartOptions.xAxis,
            data: xAxisData,
        },
        series: seriesData.value,
    }
})

watch(series, () => {
    setOptions()
})



</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 100%;
        text-align: center;
        height: 20px;

        .left {
            display: inline-block;
            border: 20px solid transparent;
            border-bottom: 20px solid #181b22;
            transform: translate(20px, -20px) rotate(45deg);
            border-radius: 30%;
        }

        .right {
            display: inline-block;
            border: 20px solid transparent;
            border-bottom: 20px solid #181b22;
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
            background-color: #181b22;
            transform: translateY(-23px);
        }
    }

    .canvas {
        flex: 1;
        width: 100%;
    }
}
</style>
