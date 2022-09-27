<template>
    <div class="health_part_one">
        <BaseLineChart></BaseLineChart>
    </div>
    <div class="health_part_two">2</div>
    <div class="health_part_three">3</div>
</template>

<script setup>
import { ref, reactive } from "vue"
import BaseLineChart from "./health/BaseLineChart.vue"
</script>

<style scoped lang="scss">
@import "styles/homepage.scss";
</style>
