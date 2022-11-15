import axios from "axios"

import nprogress from "nprogress"
import "nprogress/nprogress.css"

const requests = axios.create({
    baseURL: "http://localhost:5147",
    timeout: 8000,
})
// 请求拦截器
requests.interceptors.request.use(
    (config) => {
        nprogress.start()
        return config
    },
    (error) => {
        nprogress.done()
        Promise.reject(new Error(error))
    }
)
// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        nprogress.done()
        return res.data
    },
    (error) => {
        nprogress.done()
        // 存在response说明服务器有响应
        if (error.response) {
            let response = error.response
            if (response.status >= 400) {
                // 服务器异常
                handleError(response, 1)
            } else {
                handleError(null, 2)
            }
        }
        return Promise.reject(new Error(error))
    }
)

// 错误处理程序
function handleError(error, type) {
    if (type == 1) {
        // 处理接口异常，从config字段中获取请求信息
        let { url, method, params, data } = error.config
        let errData = {
            url,
            method,
            params: { query: params, body: data },
            error: error.data.message || JSON.stringify(error.data),
        }
        console.log("errData===", errData)
    } else {
        // ...
    }
}

export default requests
