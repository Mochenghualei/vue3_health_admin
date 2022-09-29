import axios from "axios"

import nprogress from "nprogress"
import "nprogress/nprogress.css"

const requests = axios.create({
    baseURL: "http://localhost:5173",
    timeout: 8000,
})

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

requests.interceptors.response.use(
    (res) => {
        nprogress.done()
        return res.data
    },
    (error) => {
        nprogress.done()
        Promise.reject(new Error(error))
    }
)

export default requests
