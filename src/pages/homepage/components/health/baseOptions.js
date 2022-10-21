export const lineChartOptions = {
    // 提示框
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(50,50,50,0.8)",
        borderColor: "rgba(50,50,50,0.8)",
        padding: [2, 5, 2, 5],
        textStyle: {
            color: "#FFF",
            fontStyle: "oblique",
            fontWeight: "bold",
        },
        formatter: "{b}<br><br>{a1} : {c1}kcal<br>{a0} : {c0}kg",
    },
    //图例
    legend: {
        top: "5%",
        textStyle: {
            color: "#5A5C65",
            height: 10,
            fontWeight: "bold",
            fontStyle: "italic",
            rich: {
                a: {
                    verticalAlign: "middle",
                },
            },
        },
        icon: "circle",
        data: [
            {
                itemStyle: {
                    color: "#91CC75",
                },
            },
            {
                itemStyle: {
                    color: "#CD4D44",
                },
            },
        ],
    },
    // 滚动
    dataZoom: {
        type: "inside",
        start: 0,
        end: 100,
    },
    // 网格
    grid: {
        top: "20%",
        left: "2%",
        right: "2%",
        bottom: "0%",
        containLabel: true,
    },
    // x轴
    xAxis: {
        show: false,
    },
    // y轴
    yAxis: [
        {
            type: "value",
            name: "kcal",
            nameTextStyle: {
                color: "#5A5C65",
                fontWeight: "bold",
            },
            min: 0,
            max: 500,
            splitNumber: 5,
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "#5A5C65",
                fontWeight: "bold",
            },
        },
        {
            type: "value",
            name: "kg",
            nameTextStyle: {
                color: "#5A5C65",
                fontWeight: "bold",
            },
            min: 50,
            max: 70,
            splitNumber: 5,
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "#5A5C65",
                fontWeight: "bold",
            },
        },
    ],
    series: [
        {
            animationDuration: 1200,
            animationDelay: 100,
            z: 1,
            zlevel: 1,
            color: "#9FE080",
            type: "line",
            yAxisIndex: 1,
            emphasis: {
                focus: "series",
            },
            markPoint: {
                // symbol: "circle",
                data: [
                    { type: "max", name: "Max" },
                    { type: "min", name: "Min" },
                ],
                symbolSize: 40,
                label: {
                    color: "#fff",
                },
                itemStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "#84fab0", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "green", // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            },
            showSymbol: false,
        },
        {
            animationDuration: 1200,
            animationDelay: 100,
            z: 2,
            zlevel: 2,
            type: "line",
            yAxisIndex: 0,
            emphasis: {
                focus: "series",
            },
            stack: "Total",
            smooth: true,
            lineStyle: {
                width: 0,
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: "rgb(255, 191, 0)",
                        },
                        {
                            offset: 1,
                            color: "rgb(224, 62, 76)",
                        },
                    ],
                    global: false,
                },
            },
        },
    ],
}

export const barChartOptions = {
    animationDuration: 1200,
    animationDelay: 200,
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(50,50,50,0.8)",
        borderColor: "rgba(50,50,50,0.8)",
        padding: [2, 5, 2, 5],
        textStyle: {
            color: "#FFF",
            fontStyle: "oblique",
            fontWeight: "bold",
        },
        formatter: "{b}<br>{a} : {c}min",
    },
    // 滚动
    dataZoom: {
        type: "inside",
        start: 0,
        end: 100,
    },
    // 网格
    grid: {
        top: "13%",
        left: "2%",
        right: "2%",
        bottom: "5%",
        containLabel: true,
    },
    xAxis: {
        type: "category",
        axisLabel: {
            color: function (value, index) {
                var colorList = [
                    "#00FCFF",
                    "#0091FF",
                    "#901698",
                    "#40FBCB",
                    "#FD982E",
                    "#F73B75",
                    "#862DFF",
                    "#97FE33",
                    "#00FCFF",
                    "#0091FF",
                    "#901698",
                    "#40FBCB",
                ]
                return colorList[index]
            },
            fontWeight: "bold",
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        type: "value",
        name: "min",
        nameTextStyle: {
            color: "#5A5C65",
            fontWeight: "bold",
        },
        offset: -10,
        splitNumber: 3,
        axisLine: {
            show: false,
        },
        axisLabel: {
            color: "#5A5C65",
            fontWeight: "bold",
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: "rgba(255,255,255,0.5)",
                type: [2, 5],
                dashOffset: 5,
            },
        },
    },
    animationDurationUpdate: 500,
    series: {
        type: "bar",
        name: "时间",
        // id: 'sales',
        // barWidth: 30,
        barMaxWidth: "20%",
        label: {
            show: true,
        },
        itemStyle: {
            borderRadius: [12, 12, 5, 5],
            color: function (params) {
                var colorList = [
                    "#00FCFF",
                    "#0091FF",
                    "#901698",
                    "#40FBCB",
                    "#FD982E",
                    "#F73B75",
                    "#862DFF",
                    "#97FE33",
                    "#00FCFF",
                    "#0091FF",
                    "#901698",
                    "#40FBCB",
                ]
                return colorList[params.dataIndex]
            },
        },
        showBackground: true,
        backgroundStyle: {
            color: "rgba(180, 180, 180, 0.1)",
        },
        universalTransition: {
            enabled: true,
            divideShape: "clone",
        },
    },
}

export const pieChartOptions = {
    tooltip: {
        trigger: "item",
        backgroundColor: "rgba(50,50,50,0.8)",
        borderColor: "rgba(50,50,50,0.8)",
        padding: [2, 5, 2, 5],
        textStyle: {
            color: "#FFF",
            fontStyle: "oblique",
            fontWeight: "bold",
        },
        formatter: "{b}<br>{a} : {c}",
    },
    // 网格
    grid: {
        top: "3%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        containLabel: true,
    },
    series: {
        // animationType: "scale",
        // animationEasing: "elasticOut",
        animationDelay: 100,
        animationDuration: 1300,
        name: "次数",
        type: "pie",
        radius: [50, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
            borderRadius: 8,
        },
        labelLine: {
            lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
        },
    },
}

export const ScatterChartOneOptions = {
    color: "#8C35F3",
    tooltip: {
        trigger: "item",
        backgroundColor: "rgba(50,50,50,0.8)",
        borderColor: "rgba(50,50,50,0.8)",
        padding: [2, 5, 2, 5],
        textStyle: {
            color: "#FFF",
            fontStyle: "oblique",
            fontWeight: "bold",
        },
        formatter: "{b}<br>{a}:{c}min",
    },
    title: {
        textBaseline: "middle",
        left: 30,
        top: "50%",
        textStyle: {
            color: "#5A5C65",
        },
    },
    singleAxis: {
        left: 150,
        top: "47.5%",
        type: "category",
        boundaryGap: false,
        height: "5%",
        axisLabel: {
            color: "#5A5C65",
            fontWeight: "bold",
        },
        axisTick: {
            lineStyle: {
                width: 5,
            },
        },
    },
    series: {
        animationDuration: 1200,
        singleAxisIndex: 0,
        coordinateSystem: "singleAxis",
        type: "scatter",
        name: "总计",
        symbolSize: function (dataItem) {
            return dataItem * 0.16
        },
    },
}

export const ScatterChartTwoOptions = {
    color: "#FBD379",
    tooltip: {
        trigger: "item",
        backgroundColor: "rgba(50,50,50,0.8)",
        borderColor: "rgba(50,50,50,0.8)",
        padding: [2, 5, 2, 5],
        textStyle: {
            color: "#FFF",
            fontStyle: "oblique",
            fontWeight: "bold",
        },
        formatter: "{b}<br>{a}:{c}kcal",
    },
    title: {
        textBaseline: "middle",
        right: 30,
        top: "50%",
        textStyle: {
            color: "#5A5C65",
        },
    },
    singleAxis: {
        right: 150,
        top: "47.5%",
        type: "category",
        boundaryGap: false,
        height: "5%",
        axisLabel: {
            color: "#5A5C65",
            fontWeight: "bold",
        },
        axisTick: {
            lineStyle: {
                width: 5,
            },
        },
    },
    series: {
        animationDuration: 1200,
        singleAxisIndex: 0,
        coordinateSystem: "singleAxis",
        type: "scatter",
        name: "总计",
        symbolSize: function (dataItem) {
            return dataItem * 0.035
        },
    },
}
