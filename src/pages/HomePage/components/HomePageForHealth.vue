<template>
    <div class="health_part_one">
        <!-- 等待数据返回之后渲染子组件 -->
        <BaseLineChart title="体重趋势与热量消耗" :series="data.seriesOne" :xAxisData="data.xAxisDataOne"
            v-if="data.seriesOne.length">
        </BaseLineChart>
    </div>
    <div class="health_part_two">
        <div class="area_one" :style="{'--flex1':flex1}" ref="areaOne" @click="toggleActive(1)">

        </div>
        <div class="area_two active" :style="{'--flex2':flex2}" ref="areaTwo" @click="toggleActive(2)">
            <BaseBarChart title="ceshi" :series="data.seriesTwo" :drilldownData="data.drilldownData"
                v-if="data.seriesTwo"></BaseBarChart>
        </div>
        <div class="area_three" :style="{'--flex3':flex3}" ref="areaThree" @click="toggleActive(3)"></div>
    </div>
    <div class="health_part_three">3</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import BaseLineChart from "./health/BaseLineChart.vue"
import BaseBarChart from './health/BaseBarChart.vue'
import { useHomePageStore } from "store/homePage"
import { message } from "ant-design-vue"

const homePageStore = useHomePageStore()
const data = homePageStore.data
const key = "success"

const areaOne = ref()
const areaTwo = ref()
const areaThree = ref()

const flex1 = ref(0.5)
const flex2 = ref(8)
const flex3 = ref(0.5)

function toggleActive(index) {
    switch (index) {
        case 1:
            areaOne.value.classList.add("active")
            areaTwo.value.classList.remove('active')
            areaThree.value.classList.remove('active')
            flex1.value = 2.5
            flex2.value = 5.5
            flex3.value = 0.45
            break;
        case 2:
            areaOne.value.classList.remove("active")
            areaTwo.value.classList.add('active')
            areaThree.value.classList.remove('active')
            flex1.value = 0.5
            flex2.value = 8
            flex3.value = 0.5
            break;
        case 3:
            areaOne.value.classList.remove("active")
            areaTwo.value.classList.remove('active')
            areaThree.value.classList.add('active')
            flex1.value = 0.45
            flex2.value = 5.5
            flex3.value = 2.5
            break;
    }
}
// const areaList = reactive([
//     { id: 1, class: "area_one", title: 'one', active: true, },
//     { id: 2, class: "area_two", title: 'two', active: false, },
//     { id: 3, class: "area_three", title: 'three', active: false, },
// ])

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
