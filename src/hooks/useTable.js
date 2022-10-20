import {
    reactive,
    ref,
    toRefs,
    onMounted,
    inject,
    watchEffect,
    watch,
} from "vue"
import { cloneDeep } from "lodash-es"
import { useHomePageStore } from "store/homePage"
import { delData, getTableList, updateWeight } from "api/request"
import { getdateFormated } from "utils/dateFormat"
import dayjs from "dayjs"
export function useTable() {
    const message = inject("message")
    // 分页相关逻辑
    const { totalCount } = toRefs(useHomePageStore().data)
    const currentPageNum = ref(1)

    // 表格相关逻辑
    let data = ref([])
    const loading = ref(false)
    onMounted(() => {
        getTableData()
    })
    // 获取数据
    function getTableData() {
        loading.value = true
        let tableSeries = ref([])
        getTableList({ page: currentPageNum.value, pageSize: 20 })
            .then((res) => {
                if (res.code == 200) {
                    loading.value = false
                    if (Object.keys(res.tableInfo).length) {
                        res.tableInfo.data.forEach((item, index) => {
                            tableSeries.value.push({
                                key: index,
                                date: getdateFormated(item.date, "datetype"),
                                weight: item.weight,
                                caloric: item.caloric,
                                trainingTime: item.sporttime,
                                trainingType: [...JSON.parse(item.training)],
                            })
                        })
                        data.value = tableSeries.value
                        currentPageNum.value = res.tableInfo.currentPage
                    }
                } else {
                    loading.value = false
                    message.error({ content: res.msg, duration: 2 })
                }
            })
            .catch((err) => new Error(err))
    }
    // end

    const state = reactive({
        searchText: "",
        searchedColumn: "",
    })
    const searchInput = ref()
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            fixed: "left",
            width: 60,
            align: "center",
            sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
            sortDirections: ["descend", "ascend"],
            customFilterDropdown: true,
            onFilter: (value, record) =>
                record.date
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                        searchInput.value.focus()
                    }, 100)
                }
            },
        },
        {
            title: "体重",
            dataIndex: "weight",
            key: "weight",
            width: 50,
            align: "center",
        },
        {
            title: "热量",
            dataIndex: "caloric",
            key: "caloric",
            width: 50,
            align: "center",
        },
        {
            title: "训练类型",
            dataIndex: "trainingType",
            key: "trainingType",
            width: 80,
            align: "center",
        },
        {
            title: "运动时长",
            dataIndex: "trainingTime",
            key: "trainingTime",
            width: 50,
            align: "center",
        },
        {
            title: "操作",
            key: "operation",
            fixed: "right",
            width: 90,
            align: "center",
        },
    ]
    const editableData = reactive({})

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm()
        state.searchText = selectedKeys[0]
        state.searchedColumn = dataIndex
    }

    function handleReset(clearFilters, confirm) {
        confirm()
        clearFilters({
            confirm: true,
        })
        state.searchText = ""
    }

    // 删除操作
    function onDelete(date) {
        let formattedDate = new Date(date).getTime() / 1000
        delData({ date: formattedDate })
            .then((res) => {
                if (res.code == 200) {
                    message.success({ content: res.msg, duration: 2 })
                    // 重新请求
                    useHomePageStore().getGlobalData()
                } else {
                    message.error({ content: res.msg, duration: 2 })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function edit(key) {
        editableData[key] = cloneDeep(
            data.value.filter((item) => key === item.key)[0]
        )
    }

    function save(record, key) {
        // 判断新旧对象是否相等，如果相等则没有实际修改
        let isEqual = isObjectValueEqual(editableData[key], record)
        if (!isEqual) {
            onUpdate(editableData[key])
        }
        delete editableData[key]
    }

    function isObjectValueEqual(newVal, oldVal) {
        let oldValProps = Object.getOwnPropertyNames(oldVal)
        let newValProps = Object.getOwnPropertyNames(newVal)

        if (newValProps.length !== oldValProps.length) {
            return false
        }

        for (let i = 0; i < oldValProps.length; i++) {
            let propName = oldValProps[i]
            let propA = oldVal[propName]
            let propB = newVal[propName]
            if (propA.toString().trim() !== propB.toString().trim()) {
                return false
            }
        }

        return true
    }

    // 更新请求
    const onUpdate = (values) => {
        // 处理日期数据
        const formObj = {
            ...values,
            date: new Date(values.date).getTime() / 1000,
        }
        // 发送请求
        updateWeight(formObj).then((res) => {
            if (res.code == 200) {
                // 重新请求全局
                useHomePageStore().getGlobalData()
                // 重新请求表格
                getTableData()
                message.success({ content: res.msg, duration: 2 })
            } else {
                message.error({ content: res.msg, duration: 2 })
            }
        })
    }

    function cancel(key) {
        delete editableData[key]
    }

    function getTagColor(tag) {
        switch (tag) {
            case "胸":
                return "#02E2CA"
            case "肩":
                return "#C10F15"
            case "背":
                return "#00B050"
            case "腿":
                return "#0070C0"
            case "手臂":
                return "#8EA9DB"
            case "核心":
                return "#FCAD36"
            case "HIIT":
                return "#EB6420"
            default:
                return "#FCAD36"
        }
    }

    watchEffect(getTableData)

    watch(totalCount, () => {
        getTableData()
    })

    return {
        totalCount,
        currentPageNum,
        data,
        searchInput,
        columns,
        ...toRefs(state),
        editableData,
        loading,
        handleSearch,
        handleReset,
        onDelete,
        edit,
        save,
        cancel,
        getTagColor,
    }
}
