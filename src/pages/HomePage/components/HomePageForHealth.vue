<template>
    <div class="health_part_one">
        <!-- 等待数据返回之后渲染子组件 -->
        <BaseLineChart title="体重趋势与热量消耗" :series="data.seriesOne" :xAxisData="data.xAxisDataOne"
            v-if="data.seriesOne.length">
        </BaseLineChart>
    </div>
    <div class="health_part_two">
        <!-- 左侧图表 -->
        <div class="area_one" :style="{'--flex1':flex1}" ref="areaOne" @click="toggleActive(1)">
            <!-- 切换图标 -->
            <span class="iconfont icon-zuo-copy" :style="{fontSize:'20px'}" v-if="flex1=='5%'"></span>
            <!-- 图表 -->
            <BasePieChart title="状态分布" :series="data.seriesThree" :barWidth="flex1"
                v-if="data.seriesThree.length && flex1=='35%'">
            </BasePieChart>
        </div>
        <!-- 中间图表 -->
        <div class="area_two active" :style="{'--flex2':flex2}" ref="areaTwo" @click="toggleActive(2)">
            <BaseBarChart title="运动时长" :series="data.seriesTwo" :drilldownData="data.drilldownData" :barWidth="flex2"
                :curIdx="currentIdx" v-if="data.seriesTwo.length"></BaseBarChart>
        </div>
        <!-- 右侧图表 -->
        <div class="area_three" :style="{'--flex3':flex3}" ref="areaThree" @click="toggleActive(3)"></div>
    </div>
    <div class="health_part_three">3</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import BaseLineChart from "./health/BaseLineChart.vue"
import BaseBarChart from './health/BaseBarChart.vue'
import BasePieChart from './health/BasePieChart.vue'
import { useHomePageStore } from "store/homePage"
import { message } from "ant-design-vue"

const homePageStore = useHomePageStore()
const data = homePageStore.data
const key = "success"
const currentIdx = ref(0)

const areaOne = ref()
const areaTwo = ref()
const areaThree = ref()

const flex1 = ref('5%')
const flex2 = ref('90%')
const flex3 = ref('5%')

function toggleActive(index) {
    currentIdx.value = index
    switch (index) {
        case 1:
            areaOne.value.classList.add("active")
            areaTwo.value.classList.remove('active')
            areaThree.value.classList.remove('active')
            flex1.value = '35%'
            flex2.value = '60%'
            flex3.value = '5%'
            break;
        case 2:
            areaOne.value.classList.remove("active")
            areaTwo.value.classList.add('active')
            areaThree.value.classList.remove('active')
            flex1.value = '5%'
            flex2.value = '90%'
            flex3.value = '5%'
            break;
        case 3:
            areaOne.value.classList.remove("active")
            areaTwo.value.classList.remove('active')
            areaThree.value.classList.add('active')
            flex1.value = '5%'
            flex2.value = '60%'
            flex3.value = '35%'
            break;
    }
}


onMounted(() => {
    getData()
})

function getData() {
    homePageStore.getGlobalData().then(res => {
        message.success({
            content: res,
            key,
            duration: 1,
        })
    }).catch(err => {
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
</style>
