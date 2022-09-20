import request from "./http"
// 接口

// 登录
export const login = (parsms = {}) => request({ url: "/mock/login", method: "post", data: parsms })
// 获取图表数据
export const getUserList = () => request({ url: "/weight", method: "get" })
// 新增数据
export const addweight = (params = {}) => request({ url: "/addweight", method: "post", data: params })
// 删除数据
export const delData = (params = {}) => request({ url: "/delete", method: "post", data: params })
// 获取天气(和风天气API:北京)
export const getWeather = () => request.get('https://devapi.qweather.com/v7/weather/now?location=101010100&key=5649bab4e85c4ab0a8d82c7d86867fe3')
// 获取分页数据
export const getTableList = (params = {}) => request({ url: "/gettable", method: "post", data: params })