<template>
    <!-- 配置antvue中文 -->
    <a-config-provider :locale="zhCN">
        <router-view class="transition"></router-view>
    </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN"
</script>
<style scoped>
/* 过渡动画 */
.transition {
    animation: fade-in-fwd 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fade-in-fwd {
    0% {
        -webkit-transform: translateZ(-80px);
        transform: translateZ(-80px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 1;
    }
}
</style>
