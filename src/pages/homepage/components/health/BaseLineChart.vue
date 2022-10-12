<template>
    <div class="container">
        <div class="title">
            <span class="left" /><span class="middle">{{title}}</span><span class="right" />
        </div>
        <div ref="lineChart" class="canvas"></div>
    </div>
</template>

<script setup>
import {
    ref,
    toRefs,
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

const props = defineProps({
    title: String,
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

const { series, xAxisData } = toRefs(props)

onMounted(() => {
    myChart.value = proxy.$echarts.init(lineChart.value)
    // 重置图表尺寸
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
    return series.value.reduce(
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
    series.value.forEach((item, index) => {
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
            data: xAxisData.value,
        },
        series: seriesData.value,
    }
})

watch(series, () => {
    setOptions()
})
</script>

<style scoped lang="scss">
@import "styles/basechart.scss"
</style>
