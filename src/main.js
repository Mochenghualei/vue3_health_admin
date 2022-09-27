import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 引入antd
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import * as Icons from "@ant-design/icons-vue"
// 开启mock服务
import "./mock/mockServe"
// 阿里图标库
import "./assets/icon/iconfont.css"
// 引入echarts
import * as echarts from "echarts"

const app = createApp(App)

// 全局注册echarts
app.config.globalProperties.$echarts = echarts

app.use(router).use(store).use(Antd).mount("#app")

// 循环使用全部全部图标
const icons = Icons
for (const i in icons) {
    // 全局注册一下组件
    app.component(i, icons[i])
}
