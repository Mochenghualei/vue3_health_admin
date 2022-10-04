<template>
  <div class="container">
    <div class="area_3_1">
      <div class="area_3_1_1">
        <div class="area_3_1_1_1">
          <span class="line"></span>{{ totalTime == 0 ? "--" : totalTime }}min
        </div>
        <div class="area_3_1_1_2">运动总时长</div>
      </div>
      <div class="area_3_1_line"><span></span></div>
      <div class="area_3_1_2">
        <div class="area_3_1_2_1">
          <span class="line"></span>{{ totalDay == 0 ? "--" : totalDay }}天
        </div>
        <div class="area_3_1_2_2">运动总天数</div>
      </div>
    </div>
    <div class="area_3_line"></div>
    <div class="area_3_2">
      <div class="area_3_1_1">
        <div class="area_3_1_1_1">
          <span class="line"></span>{{ avgWeight == 0 ? "--" : avgWeight }}kg
        </div>
        <div class="area_3_1_1_2">平均体重</div>
      </div>
      <div class="area_3_1_line"><span></span></div>
      <div class="area_3_1_2">
        <div class="area_3_1_2_1">
          <span class="line"></span>{{ avgBMI == 0 ? "--" : avgBMI
          }}<span class="range">{{
                      avgBMI == 0
                      ? ""
                      : avgBMI <= 18 ? "偏低" : avgBMI>= 24
          ? "偏高"
          : "正常"
          }}</span>
        </div>
        <div class="area_3_1_2_2">平均BMI</div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { } = defineProps(["totalTime", "totalDay", "avgWeight", "avgBMI"])
</script>

<style scoped lang="scss">
@import "styles/basekpi.scss"
</style>