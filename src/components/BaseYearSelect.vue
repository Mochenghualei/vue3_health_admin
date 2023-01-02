<template>
    <a-select
        v-model:value="year"
        show-search
        placeholder="选择年份"
        :style="style"
        :options="options"
        @change="handleChange"
    >
    </a-select>
</template>

<script setup>
// 封装选择器组件
const options = ref([
    {
        value: "2023",
        label: "2023",
    },
    {
        value: "2022",
        label: "2022",
    },
])

const props = defineProps(["year", "width"])
const emit = defineEmits(["update:year", "handleChange"])
const style = computed(() => {
    return `width:${props.width}px;`
})

const handleChange = (value) => {
    emit("handleChange", value)
}
</script>

<style scoped></style>
