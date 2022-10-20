import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// 引入pinia
import { createPinia } from "pinia"
// 引入antd
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import { message } from "ant-design-vue"
import * as Icons from "@ant-design/icons-vue"
// 开启mock服务
import "./mock/mockServe"
// 阿里图标库
import "./assets/icon/iconfont.css"
// 引入echarts
import * as echarts from "echarts"

const app = createApp(App)

app.provide("message", message)

// 全局注册echarts
app.config.globalProperties.$echarts = echarts

// 错误信息捕获
app.config.errorHandler = (err, instance, info) => {
    let errData
    if (err instanceof Error) {
        let { name, message } = err
        errData = {
            type: name,
            error: message,
        }
    } else {
        errData = {
            type: "other",
            error: JSON.stringify(err),
        }
    }
    console.log("errData===", errData)
}

app.use(router).use(createPinia()).use(Antd).mount("#app")

// 循环使用全部全部图标
const icons = Icons
for (const i in icons) {
    // 全局注册一下组件
    app.component(i, icons[i])
}
