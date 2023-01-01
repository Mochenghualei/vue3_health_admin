<template>
    <div class="canvas" ref="ScatterChartOne"></div>
</template>

<script setup>
import { ScatterChartOneOptions } from "./baseOptions"

// 获取全局变量
const { proxy } = getCurrentInstance()
const ScatterChartOne = ref()
const myChart = shallowRef(null)
const timer = ref(null)

// 获取当前年份
const { data } = useHomePageStore()

const props = defineProps({
    series: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const { series } = toRefs(props)

onMounted(() => {
    myChart.value = proxy.$echarts.init(ScatterChartOne.value)
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
    if (myChart.value) {
        myChart.value.setOption(options.value)
    }
}

const options = computed(() => {
    const xAxisData = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ]
    const day = data.year
    const options = {
        ...ScatterChartOneOptions,
        title: {
            ...ScatterChartOneOptions.title,
            text: day,
        },
        singleAxis: {
            ...ScatterChartOneOptions.singleAxis,
            data: xAxisData,
        },
        series: {
            ...ScatterChartOneOptions.series,
            data: series.value,
        },
    }
    return options
})

watch(series, () => {
    setOptions()
})
</script>

<style scoped lang="scss">
.canvas {
    width: 100%;
    height: 100%;
}
</style>
