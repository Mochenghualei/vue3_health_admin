<template>
    <div class="container">
        <div class="title" v-if="flag">
            <span class="left" /><span class="middle">{{ title }}</span
            ><span class="right" />
        </div>
        <div class="canvas" ref="pieChart"></div>
    </div>
</template>

<script setup>
import { pieChartOptions as optionsObj } from "./baseOptions"

// 获取全局变量
const { proxy } = getCurrentInstance()
const pieChart = ref()
const myChart = shallowRef(null)
const timer = ref(null)
const flag = ref(false)

const props = defineProps({
    title: String,
    series: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const { series } = toRefs(props)

onMounted(() => {
    flag.value = false
    myChart.value = proxy.$echarts.init(pieChart.value)
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
        myChart.value.setOption(options.value, true)
    }
}

const options = computed(() => {
    return {
        ...optionsObj,
        series: {
            ...optionsObj.series,
            data: series.value,
        },
    }
})

watch(series, () => {
    setOptions()
})
</script>

<style scope lang="scss">
@import "styles/basechart.scss";
</style>
