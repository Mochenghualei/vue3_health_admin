<template>
    <div class="container">
        <div class="title">
            <span class="left" />
            <!-- 左展开图标 -->
            <span class="middle" v-show="curIdx == 1">
                <arrow-left-outlined />
            </span>
            <!-- 标题 -->
            <span class="middle">{{ title }}</span>
            <!-- 右展开图标 -->
            <span class="middle" v-show="curIdx == 3">
                <arrow-right-outlined />
            </span>
            <span class="right" />
        </div>
        <!-- 下钻后退按钮 -->
        <div class="back_btn" v-show="showBack">
            <span class="iconfont icon-Back" @click.stop="backHandler" />
        </div>
        <div ref="barChart" class="canvas" @click.stop="clickHandlder"></div>
    </div>
</template>

<script setup>
import { barChartOptions } from "./baseOptions"

// 获取全局变量
const { proxy } = getCurrentInstance()
const barChart = ref()
const myChart = shallowRef(null)
const showBack = ref(false)

const props = defineProps({
    title: String,
    barWidth: String,
    curIdx: Number,
    series: {
        type: Array,
        required: true,
        default: () => [],
    },
    drilldownData: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const { drilldownData, series, barWidth, curIdx } = toRefs(props)

onMounted(() => {
    myChart.value = proxy.$echarts.init(barChart.value)
    resize(myChart.value)
    setOptions()
    // 挂载时为图表绑定点击事件，避免第一次点击时不生效
    clickHandlder()
})

function setOptions() {
    if (myChart.value) {
        myChart.value.setOption(options.value)
    }
}

// 下钻
function clickHandlder() {
    // 添加点击事件
    myChart.value.on("click", function (event) {
        if (event.data && drilldownData.value) {
            showBack.value = true
            let subData = drilldownData.value.find(function (data) {
                return data.dataGroupId === event.data.groupId
            })
            if (!subData) {
                return
            }

            let options = {
                ...barChartOptions,
                xAxis: {
                    ...barChartOptions.xAxis,
                    axisLabel: {
                        color: "#00FCFF",
                    },
                    data: subData.data.map(function (item) {
                        return item[0]
                    }),
                },
                series: {
                    ...barChartOptions.series,
                    barMaxWidth: "40%",
                    itemStyle: {
                        color: "#00FCFF",
                    },
                    emphasis: {
                        itemStyle: {
                            color: "#0091FF",
                        },
                    },
                    dataGroupId: subData.dataGroupId,
                    data: subData.data.map(function (item) {
                        return item[1]
                    }),
                },
            }

            myChart.value.setOption(options)
        }
    })
}

// 后退，获取上层数据
function backHandler() {
    setOptions()
    showBack.value = false
}

const xAxisData = computed(() => {
    return series.value.reduce(
        (pre, cur, index) => ((pre[index] = cur.groupId), pre),
        []
    )
})

const options = computed(() => {
    return {
        ...barChartOptions,
        xAxis: {
            ...barChartOptions.xAxis,
            data: xAxisData.value,
        },
        dataGroupId: "",
        series: {
            ...barChartOptions.series,
            data: series.value,
        },
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
})
</script>

<style scoped lang="scss">
@import "styles/basechart.scss";
</style>
