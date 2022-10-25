<template>
    <div class="container">
        <audio @timeupdate="timeupdate" loop ref="player" :src="playList[playIndex].playUrl"></audio>

        <div class="play_cover">
            <!-- 封面 -->
            <img :style="{
                width: '45px',
                height: '45px',
                animationPlayState: playing ? 'running' : 'paused',
            }" :src="playList[playIndex].cover" alt="none" />
        </div>
        <!-- 曲名 -->
        <div class="play_title">
            <div class="play_name">{{ playList[playIndex].playTitle }}</div>
            <div class="play_player">{{ playList[playIndex].player }}</div>
        </div>
        <!-- 进度条 -->
        <div class="input_time">
            <input @change="changeHandler" ref="range" type="range" min="0" value="0" max="100" />
            <div class="time">
                <span class="left">{{ curTime }}</span>
                <span class="right">{{
                totalTime == "Invalid date" ? "00:00" : totalTime
                }}</span>
            </div>
        </div>

        <!-- 按钮控件 -->
        <div class="btns">
            <button class="btn_pre iconfont icon-shangyishou" @click="previousOne" :disabled="playIndex == 0"></button>
            <button class="btn_play" @click="play">
                <i v-show="!playing" class="iconfont icon-gf-play"></i>
                <i v-show="playing" class="iconfont icon-gf-pause2"></i>
            </button>
            <button class="btn_next iconfont icon-xiayishou" @click="nextOne"
                :disabled="playIndex == playList.length - 1"></button>
        </div>
    </div>
</template>

<script setup>
import moment from "moment"
import { ref, reactive } from "vue"

let curTime = ref("00:00")
let totalTime = ref("00:00")
let playing = ref(false)
let playIndex = ref(0)
let playTitle = ref("")

const player = ref()
const range = ref()

const playList = [
    {
        playUrl: new URL(
            "../assets/mp3/Hayd - Head In The Clouds.mp3",
            import.meta.url
        ).href,
        playTitle: "Head In The Clouds",
        player: "Hayd",
        cover: new URL("../assets/cover/《Head In The Clouds》cover.jpg", import.meta.url).href,
    },
    {
        playUrl: new URL(
            "../assets/mp3/G.E.M.邓紫棋-让世界暂停一分钟.mp3",
            import.meta.url
        ).href,
        playTitle: "让世界暂停一分钟",
        player: "邓紫棋",
        cover: new URL("../assets/cover/《让世界暂停一分钟》cover.jpg", import.meta.url).href,
    },
    {
        playUrl: new URL(
            "../assets/mp3/1-蔡依林邓紫棋-说爱你.mp3",
            import.meta.url
        ).href,
        playTitle: "说爱你",
        player: "蔡依林/邓紫棋",
        cover: new URL("../assets/cover/《说爱你》cover.jpg", import.meta.url).href,
    },
    {
        playUrl: new URL("../assets/mp3/2-TaylorMe.flac", import.meta.url).href,
        playTitle: "ME!",
        player: "Taylor Swift/Brendon",
        cover: new URL("../assets/cover/me-cover.jpg", import.meta.url).href,
    },
    {
        playUrl: new URL(
            "../assets/mp3/4-华晨宇-孩子(Live).mp3",
            import.meta.url
        ).href,
        playTitle: "孩子",
        player: "华晨宇",
        cover: new URL("../assets/cover/《孩子》cover.jpg", import.meta.url).href,
    },
    {
        playUrl: new URL(
            "../assets/mp3/5-林俊杰 - 爱笑的眼睛.flac",
            import.meta.url
        ).href,
        playTitle: "爱笑的眼睛",
        player: "林俊杰",
        cover: new URL("../assets/cover/《爱笑的眼睛》cover.jpg", import.meta.url).href,
    },
]

const startPlay = () => {
    let playerState = player.value
    if (!playerState.autoplay) {
        playerState.autoplay = true
    }
    playerState.play()
    playing.value = true
}
// 播放/暂停
const play = () => {
    let playerState = player.value
    // 根据paused属性判断播放状态，执行播放暂停操作
    if (!playerState.autoplay) {
        playerState.autoplay = true
    }
    playing.value = playerState.paused
    if (playerState.paused) {
        playerState.play()
    } else {
        playerState.pause()
    }
}
// 绑定进度条与时间显示
const timeupdate = () => {
    let playerState = player.value
    let rangeState = range.value
    rangeState.max = playerState.duration
    rangeState.value = playerState.currentTime
    // 更新时间文本(使用moment)
    totalTime.value = moment(playerState.duration * 1000).format("mm:ss")
    curTime.value = moment(playerState.currentTime * 1000).format("mm:ss")
}
// 拖拽进度条
const changeHandler = () => {
    let playerState = player.value
    let rangeState = range.value
    playerState.currentTime = rangeState.value
    startPlay()
}
// 下一首
const nextOne = () => {
    playIndex.value += 1
    startPlay()
}
// 上一首
const previousOne = () => {
    playIndex.value -= 1
    startPlay()
}
</script>

<style scoped lang="scss">
@import "styles/audio.scss";
</style>
