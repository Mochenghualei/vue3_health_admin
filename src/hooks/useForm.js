import { ref, reactive, inject } from "vue"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import locale from "ant-design-vue/es/date-picker/locale/zh_CN"
import { addweight } from "api/request"
import { useHomePageStore } from "store/homePage"
export function useForm() {
    // 日期选择器国际化设置
    dayjs.locale("zh-cn")
    const formRef = ref()
    const form = reactive({
        date: null,
        weight: "",
        training: [],
        sportTime: "",
        caloric: "",
    })

    let validateDate = async (rule, value) => {
        let checkPending
        clearTimeout(checkPending)
        if (!value) {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("请选择日期！")
                }, 500)
            })
        } else {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    resolve()
                }, 500)
            })
        }
    }

    let validateWeight = async (rule, value) => {
        let checkPending
        if (value === "") {
            clearTimeout(checkPending)
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("体重不能为空！")
                }, 500)
            })
        } else if (typeof value !== "number") {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("请输入数字！")
                }, 500)
            })
        } else {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    resolve()
                }, 500)
            })
        }
    }

    let validateTrain = async (rule, value) => {
        let checkPending
        clearTimeout(checkPending)
        if (value.length == 0) {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("请选择训练类型！")
                }, 500)
            })
        } else {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    resolve()
                }, 500)
            })
        }
    }

    let validateSportTime = async (rule, value) => {
        let checkPending
        clearTimeout(checkPending)
        if (value === "") {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("运动时长不能为空！")
                }, 500)
            })
        } else if (typeof value !== "number") {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("请输入数字！")
                }, 500)
            })
        } else {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    resolve()
                }, 500)
            })
        }
    }

    let validateCaloric = async (rule, value) => {
        let checkPending
        clearTimeout(checkPending)
        if (value === "") {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("热量不能为空！")
                }, 500)
            })
        } else if (typeof value !== "number") {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    reject("请输入数字！")
                }, 500)
            })
        } else {
            return new Promise((resolve, reject) => {
                checkPending = setTimeout(() => {
                    resolve()
                }, 500)
            })
        }
    }

    const rules = {
        date: [{ required: true, validator: validateDate, trigger: "change" }],
        weight: [
            { required: true, validator: validateWeight, trigger: "change" },
        ],
        training: [
            { required: true, validator: validateTrain, trigger: "change" },
        ],
        sportTime: [
            { required: true, validator: validateSportTime, trigger: "change" },
        ],
        caloric: [
            { required: true, validator: validateCaloric, trigger: "change" },
        ],
    }

    const trainingType = [
        { value: "胸" },
        { value: "核心" },
        { value: "燃脂" },
        { value: "手臂" },
        { value: "腿" },
        { value: "肩" },
        { value: "背" },
        { value: "HIIT" },
    ]

    const submitLoading = ref(false)
    const message = inject("message")
    // 重新请求
    const homePageStore = useHomePageStore()
    function getData() {
        homePageStore.getGlobalData()
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    const onFinish = (values) => {
        submitLoading.value = true
        // 处理日期数据
        const formObj = {
            ...values,
            date: new Date(values.date).getTime() / 1000,
        }
        // 发送请求
        addweight(formObj).then((res) => {
            if (res.code == 200) {
                // 更新数据
                getData()
                message.success({ content: res.msg, duration: 2 })
                submitLoading.value = false
                // 重置表单
                setTimeout(() => {
                    resetForm()
                }, 100)
            } else {
                message.error({ content: res.msg, duration: 2 })
                submitLoading.value = false
            }
        })
        console.log("formObj====", formObj)
    }

    const onFinishFailed = (errorInfo) => {
        submitLoading.value = true
        setTimeout(() => {
            submitLoading.value = false
            console.log("Failed:", errorInfo)
        }, 1000)
    }

    const resetForm = () => {
        // 重置表单
        formRef.value.resetFields()
    }

    return {
        formRef,
        form,
        rules,
        trainingType,
        handleChange,
        onFinish,
        onFinishFailed,
        resetForm,
        locale,
        submitLoading,
    }
}
