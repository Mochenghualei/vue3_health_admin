<template>
    <div class="health_part_one">
        <BaseLineChart :series="data.seriesOne" :xAxisData="data.xAxisDataOne" v-if="data.seriesOne.length">
        </BaseLineChart>
    </div>
    <div class="health_part_two">2</div>
    <div class="health_part_three">3</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import BaseLineChart from "./health/BaseLineChart.vue"
import { getUserList as getGlobalData } from "api/request.js"
import { getdateFormated } from "utils/dateFormat"
import {
    getChartOneData,
    getChartTwoData,
    getChartThreeData,
    getChartFourData,
    getChartFiveData,
} from "utils/handleData"

let data = reactive({
    seriesOne: [],
    xAxisDataOne: []
})

onMounted(() => {
    getData()
})

function getData() {
    getGlobalData().then((res) => {
        if (res && res.length) {
            // 图表1数据处理
            const { seriesData, xAxisData } = getChartOneData(
                res,
                getdateFormated
            )
            data.seriesOne = seriesData
            data.xAxisDataOne = xAxisData
        }
    })
}
</script>

<style scoped lang="scss">
@import "styles/homepage.scss";
</style>
