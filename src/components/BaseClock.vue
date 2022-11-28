<template>
    <div class="clock_container">
        <span class="iconfont icon-shizhong" /> {{ curTime }}
    </div>
</template>

<script setup>
import dayjs from "dayjs"

let time = ref(dayjs().unix())
let timer = null

onMounted(() => {
    timer = setInterval(() => (time.value += 1), 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})

const curTime = computed(() => {
    let day = dayjs.unix(time.value)
    let dayStr = day.format("YYYY年M月D日")
    let weekStr = ""
    switch (day.day()) {
        case 0:
            weekStr = "星期日"
            break
        case 1:
            weekStr = "星期一"
            break
        case 2:
            weekStr = "星期二"
            break
        case 3:
            weekStr = "星期三"
            break
        case 4:
            weekStr = "星期四"
            break
        case 5:
            weekStr = "星期五"
            break
        case 6:
            weekStr = "星期六"
            break
    }
    let timeStr = day.format("HH:mm:ss")
    return `${dayStr} | ${weekStr} | ${timeStr}`
})
</script>

<style scoped lang="scss">
.clock_container {
    text-align: center;
    line-height: 32px;
    color: #fff;
}
</style>
