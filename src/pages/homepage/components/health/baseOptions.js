export const lineChartOptions = {
    animationDuration: 1500,
    animationDelay: 500,
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
        formatter: "{b}<br><br>{a0} : {c0}kcal<br>{a1} : {c1}kg",
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
                    color: "#CD4D44",
                },
            },
            {
                itemStyle: {
                    color: "#91CC75",
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
        left: "3%",
        right: "3%",
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
            z: 1,
            zlevel: 1,
            // data: series[0].data,
            // name: series[0].name,
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
        {
            z: 2,
            zlevel: 2,
            // data: series[1].data,
            // name: series[1].name,
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
                animation: true,
                animationDuration: 1000,
            },
            showSymbol: false,
        },
    ],
}
