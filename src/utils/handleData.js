export function getChartOneData(res, cb) {
    let seriesData = []
    let xAxisData = []
    let dataOne = []
    let dataTwo = []
    res.forEach((item) => {
        xAxisData.push(cb(item.date))
        dataOne.push(item.weight)
        dataTwo.push(item.caloric)
    })
    // x轴数据
    xAxisData = xAxisData.map((item) => {
        return `${item.split("/")[1]}-${item.split("/")[2]}`
    })
    seriesData.push(
        { name: "体重", data: dataOne },
        { name: "热量", data: dataTwo }
    )
    return { seriesData, xAxisData }
}

export function getChartTwoData(res, cb) {
    let monthStr = []
    // 接收第一层数据
    let seriesData = []
    // 接收下钻数据
    let drilldownData = []
    res.forEach((item) => {
        let str = cb(item.date).split("/")[1]
        if (!monthStr.includes(str)) {
            monthStr.push(str)
        }
    })
    monthStr.forEach((dateitem) => {
        let data = []
        res.forEach((item) => {
            let str = cb(item.date).split("/")[1]
            if (str == dateitem) {
                data.push([
                    `${str}-${cb(item.date).split("/")[2]}`,
                    item.sporttime,
                ])
            }
        })
        drilldownData.push({
            dataGroupId: `${dateitem}月`,
            data,
        })
    })
    drilldownData.forEach((item) => {
        let sumVal = item.data.reduce((pre, cur) => pre + cur[1], 0)
        seriesData.push({
            groupId: item.dataGroupId,
            value: sumVal,
        })
    })
    // 排序
    drilldownData.forEach((item) => {
        item.data.sort((a, b) => b[0].slice(1) - a[0].slice(1))
    })
    // 排序
    seriesData.sort((a, b) => a.groupId.slice(0, -1) - b.groupId.slice(0, -1))
    return { drilldownData, seriesDataTwo: seriesData }
}

export function getChartThreeData(res) {
    let typeArr = []
    let seriesData = []
    res.forEach((item) => {
        typeArr.push(...JSON.parse(item.training))
    })
    // 判断次数
    let xiong = 0,
        jian = 0,
        bei = 0,
        tui = 0,
        hexin = 0,
        ranzhi = 0,
        shoubi = 0,
        hiit = 0
    typeArr.forEach((item) => {
        switch (item) {
            case "胸":
                xiong++
                break
            case "肩":
                jian++
                break
            case "背":
                bei++
                break
            case "腿":
                tui++
                break
            case "核心":
                hexin++
                break
            case "燃脂":
                ranzhi++
                break
            case "手臂":
                shoubi++
                break
            case "HIIT":
                hiit++
            default:
                break
        }
    })
    seriesData.push(
        { value: xiong, name: "胸" },
        { value: jian, name: "肩" },
        { value: bei, name: "背" },
        { value: tui, name: "腿" },
        { value: hexin, name: "核心" },
        { value: ranzhi, name: "燃脂" },
        { value: shoubi, name: "手臂" },
        { value: hiit, name: "HIIT" }
    )
    let seriesThree = seriesData.sort((a, b) => a.value - b.value)
    return seriesThree
}

export function getChartFourData(res, cb) {
    let seriesData = []
    let JanVal = 0,
        FebVal = 0,
        MarVal = 0,
        AprVal = 0,
        MayVal = 0,
        JunVal = 0,
        JulVal = 0,
        AugVal = 0,
        SepVal = 0,
        OctVal = 0,
        NobVal = 0,
        DecVal = 0
    res.forEach((item) => {
        switch (cb(item.date).split("/")[1]) {
            case "1":
                JanVal += item.sporttime
                break
            case "2":
                FebVal += item.sporttime
                break
            case "3":
                MarVal += item.sporttime
                break
            case "4":
                AprVal += item.sporttime
                break
            case "5":
                MayVal += item.sporttime
                break
            case "6":
                JunVal += item.sporttime
                break
            case "7":
                JulVal += item.sporttime
                break
            case "8":
                AugVal += item.sporttime
                break
            case "9":
                SepVal += item.sporttime
                break
            case "10":
                OctVal += item.sporttime
                break
            case "11":
                NobVal += item.sporttime
                break
            case "12":
                DecVal += item.sporttime
                break
            default:
                break
        }
    })
    seriesData.push(
        JanVal,
        FebVal,
        MarVal,
        AprVal,
        MayVal,
        JunVal,
        JulVal,
        AugVal,
        SepVal,
        OctVal,
        NobVal,
        DecVal
    )
    return seriesData
}

export function getChartFiveData(res, cb) {
    let seriesData = []
    let JanVal = 0,
        FebVal = 0,
        MarVal = 0,
        AprVal = 0,
        MayVal = 0,
        JunVal = 0,
        JulVal = 0,
        AugVal = 0,
        SepVal = 0,
        OctVal = 0,
        NobVal = 0,
        DecVal = 0
    res.forEach((item) => {
        switch (cb(item.date).split("/")[1]) {
            case "1":
                JanVal += item.caloric
                break
            case "2":
                FebVal += item.caloric
                break
            case "3":
                MarVal += item.caloric
                break
            case "4":
                AprVal += item.caloric
                break
            case "5":
                MayVal += item.caloric
                break
            case "6":
                JunVal += item.caloric
                break
            case "7":
                JulVal += item.caloric
                break
            case "8":
                AugVal += item.caloric
                break
            case "9":
                SepVal += item.caloric
                break
            case "10":
                OctVal += item.caloric
                break
            case "11":
                NobVal += item.caloric
                break
            case "12":
                DecVal += item.caloric
                break
            default:
                break
        }
    })
    seriesData.push(
        JanVal,
        FebVal,
        MarVal,
        AprVal,
        MayVal,
        JunVal,
        JulVal,
        AugVal,
        SepVal,
        OctVal,
        NobVal,
        DecVal
    )
    return seriesData
}
