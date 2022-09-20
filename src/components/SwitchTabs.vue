<template>
  <div id="nav-tab">
    <div
      class="nav-tab-item"
      :class="{ active: activeIndex == index }"
      v-for="(item, index) in items"
      @click="handleClick(index, item.comp)"
      :key="index"
    >
      <span class="nav-tab-item_label">{{ item.label.split("")[0] }}</span>
      <span class="nav-tab-item_label">{{ item.label.split("")[1] }}</span>
    </div>
    <div
      class="nav-tab-overlay"
      :style="{ left: activeIndex * 110 + 'px' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, defineAsyncComponent, shallowRef, onMounted, nextTick } from "vue"
const HealthyAdmin = defineAsyncComponent(() => import('pages/Homepage/components/HealthyAdmin.vue'))
const ReadAdmin = defineAsyncComponent(() => import('pages/Homepage/components/ReadAdmin.vue'))

const emit = defineEmits(['handleSwitchTab'])

let activeIndex = ref(0)
const items = [
  { label: '健身', comp: HealthyAdmin },
  { label: "读书", comp: ReadAdmin }
]

onMounted(() => {
  nextTick(() => {
    emit('handleSwitchTab', items[0].comp)
  })
})

const handleClick = (index, comp) => {
  activeIndex.value = index;
  emit('handleSwitchTab', comp);
}
</script>

<style scoped lang="scss">
@import "styles/homepage.scss";
</style>
