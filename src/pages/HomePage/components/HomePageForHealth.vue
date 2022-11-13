<template>
    <div class="health_part_one">
        <!-- 等待数据返回之后渲染子组件 -->
        <BaseLineChart
            title="体重趋势与热量消耗"
            :series="data.seriesOne"
            :xAxisData="data.xAxisDataOne"
            v-if="data.seriesOne.length"
        >
        </BaseLineChart>
    </div>
    <div class="health_part_two">
        <!-- 左侧图表 -->
        <div class="area_one" ref="areaOne" @click="toggleActive(1)">
            <!-- 切换图标 -->
            <span
                class="iconfont icon-zuo-copy"
                :style="{
                    fontSize: '20px',
                    cursor: 'pointer',
                }"
                v-if="flex1 == '5%'"
            ></span>
            <!-- 图表 -->
            <BasePieChart
                title="状态分布"
                :series="data.seriesThree"
                v-if="data.seriesThree.length && flex1 == '35%'"
            >
            </BasePieChart>
        </div>
        <!-- 中间图表 -->
        <div class="area_two active" ref="areaTwo" @click="toggleActive(2)">
            <BaseBarChart
                title="运动时长"
                :series="data.seriesTwo"
                :drilldownData="data.drilldownData"
                :barWidth="flex2"
                :curIdx="currentIdx"
                v-if="data.seriesTwo.length"
            ></BaseBarChart>
        </div>
        <!-- 右侧图表 -->
        <div class="area_three" ref="areaThree" @click="toggleActive(3)">
            <span
                class="iconfont icon-zuo"
                :style="{ fontSize: '20px', cursor: 'pointer' }"
                v-if="flex3 == '5%'"
            ></span>
            <BaseGaugeChart
                title="完成度"
                v-if="flex3 == '35%'"
            ></BaseGaugeChart>
        </div>
    </div>
    <div class="health_part_three">
        <BaseScatterDiagram
            v-if="data.seriesFour.length"
            :seriesFour="data.seriesFour"
            :seriesFive="data.seriesFive"
        >
        </BaseScatterDiagram>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue"
import BaseLineChart from "./health/BaseLineChart.vue"
import BaseBarChart from "./health/BaseBarChart.vue"
import BasePieChart from "./health/BasePieChart.vue"
import BaseScatterDiagram from "./health/BaseScatterDiagram.vue"
import BaseGaugeChart from "./health/BaseGaugeChart.vue"
import { useHomePageStore } from "store/homePage"

const message = inject("message")
const homePageStore = useHomePageStore()
const data = homePageStore.data
const key = "success"
const currentIdx = ref(0)

const areaOne = ref()
const areaTwo = ref()
const areaThree = ref()

const flex1 = ref("5%")
const flex2 = ref("90%")
const flex3 = ref("5%")

function toggleActive(index) {
    currentIdx.value = index
    switch (index) {
        case 1:
            areaOne.value.classList.add("active")
            areaTwo.value.classList.remove("active")
            areaThree.value.classList.remove("active")
            flex1.value = "35%"
            flex2.value = "60%"
            flex3.value = "5%"
            break
        case 2:
            areaOne.value.classList.remove("active")
            areaTwo.value.classList.add("active")
            areaThree.value.classList.remove("active")
            flex1.value = "5%"
            flex2.value = "90%"
            flex3.value = "5%"
            break
        case 3:
            areaOne.value.classList.remove("active")
            areaTwo.value.classList.remove("active")
            areaThree.value.classList.add("active")
            flex1.value = "5%"
            flex2.value = "60%"
            flex3.value = "35%"
            break
    }
}

onMounted(() => {
    getData()
})

function getData() {
    homePageStore
        .getGlobalData()
        .then((res) => {
            message.success({
                content: res,
                key,
                duration: 1,
            })
        })
        .catch((err) => {
            message.error({
                content: err,
                key,
                duration: 1,
            })
        })
}
</script>

<style scoped lang="scss">
@import "styles/homepage.scss";
.area_one {
    width: v-bind(flex1);
    &.active {
        width: v-bind(flex1);
    }
}

.area_two {
    width: v-bind(flex2);
    &.active {
        width: v-bind(flex2);
    }
}

.area_three {
    width: v-bind(flex3);
    &.active {
        width: v-bind(flex3);
    }
}
</style>
