import { defineStore } from "pinia"
import { getUserList } from "api/request.js"
import { getdateFormated } from "utils/dateFormat"
import {
    getChartOneData,
    getChartTwoData,
    getChartThreeData,
    getChartFourData,
    getChartFiveData,
} from "utils/handleData"

export const useHomePageStore = defineStore("homePage", {
    state: () => {
        return {
            data: {
                seriesOne: [],
                xAxisDataOne: [],
                seriesTwo: [],
                drilldownData: [],
                totalTime: 0,
                totalDay: 0,
                avgWeight: 0,
                avgBMI: 0,
            },
        }
    },

    actions: {
        async getGlobalData() {
            const res = await getUserList()
            if (res && res.length) {
                // 图表1数据处理
                const { seriesData, xAxisData } = getChartOneData(
                    res,
                    getdateFormated
                )
                this.data.seriesOne = seriesData
                this.data.xAxisDataOne = xAxisData
                // 图表2数据处理
                const { drilldownData, seriesDataTwo } = getChartTwoData(
                    res,
                    getdateFormated
                )
                this.data.drilldownData = drilldownData
                this.data.seriesTwo = seriesDataTwo
                // 指标
                let totalTime = 0,
                    totalWeight = 0
                res.forEach((item) => {
                    totalTime += item.sporttime
                    totalWeight += item.weight
                })
                this.data.totalTime = totalTime
                this.data.totalDay = res.length
                this.data.avgWeight = (totalWeight / res.length).toFixed(1) * 1
                this.data.avgBMI = (
                    this.data.avgWeight / Math.pow(1.69, 2)
                ).toFixed(1)

                return Promise.resolve("获取数据成功")
            } else {
                return Promise.reject("获取数据失败")
            }
        },
    },
})
