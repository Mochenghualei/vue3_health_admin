<template>
  <div class="container_two">
    <div class="title">
      <span class="left" /><span class="middle">{{ title }}</span><span class="right" />
    </div>
    <!-- 下钻后退按钮 -->
    <div class="back_btn" v-show="showBack">
      <span class="iconfont icon-Back" @click="backHandler" />
    </div>
    <div class="canvas" id="canvas_two" @click="clickHandlder"></div>
  </div>
</template>

<script>
import { resizeTwo } from "utils/resizeChart"
// 配置项
const optionsObj = {
  tooltip: {
    trigger: 'axis',
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
    top: '20%',
    left: '3%',
    right: '3%',
    bottom: '0%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: function (value, index) {
        var colorList = [
          '#00FCFF',
          '#0091FF',
          '#901698',
          '#40FBCB',
          "#FD982E",
          "#F73B75",
          "#862DFF",
          "#97FE33",
          "#00FCFF"
        ];
        return colorList[index];
      },
      fontWeight: "bold"
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: "min",
    nameTextStyle: {
      color: "#5A5C65",
      fontWeight: "bold"
    },
    offset: -10,
    splitNumber: 3,
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "#5A5C65",
      fontWeight: "bold"
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "rgba(255,255,255,0.5)",
        type: [2, 5],
        dashOffset: 5
      }
    }
  },
  animationDurationUpdate: 500,
  series: {
    type: 'bar',
    name: "时间",
    // id: 'sales',
    // barWidth: 30,
    barMaxWidth: "20%",
    label: {
      show: true
    },
    itemStyle: {
      borderRadius: [12, 12, 5, 5],
      color: function (params) {
        var colorList = [
          '#00FCFF',
          '#0091FF',
          '#901698',
          '#40FBCB',
          "#FD982E",
          "#F73B75",
          "#862DFF",
          "#97FE33",
          "#00FCFF"
        ];
        return colorList[params.dataIndex];
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.1)'
    },
    universalTransition: {
      enabled: true,
      divideShape: 'clone'
    }
  }
}
export default {
  name: 'CanvasTwo',
  props: {
    title: String,
    series: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    drilldownData: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      myChart: null,
      showBack: false
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("canvas_two"));
    // resizeTwo(this.myChart)
    this.setOption()
    // 挂载时为图表绑定点击事件，避免第一次点击时不生效
    this.clickHandlder()
  },
  methods: {
    // 后退事件，获取上层数据
    backHandler() {
      this.setOption()
      this.showBack = false
    },
    // 初始化
    setOption() {
      if (this.myChart) {
        this.myChart.setOption(this.options, true);
      }
    },
    // 点击下钻
    clickHandlder() {
      let vm = this
      // 添加点击事件
      vm.myChart.on("click", function (event) {
        if (event.data && vm.drilldownData) {
          vm.showBack = true
          var subData = vm.drilldownData.find(function (data) {
            return data.dataGroupId === event.data.groupId;
          });
          if (!subData) {
            return;
          }

          let options = {
            ...optionsObj,
            xAxis: {
              ...optionsObj.xAxis,
              axisLabel: {
                color: "#00FCFF"
              },
              data: subData.data.map(function (item) {
                return item[0];
              })
            },
            series: {
              ...optionsObj.series,
              barMaxWidth: "40%",
              itemStyle: {
                color: "#00FCFF"
              },
              emphasis: {
                itemStyle: {
                  color: "#0091FF"
                },
              },
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(function (item) {
                return item[1];
              })
            }
          }
          vm.myChart.setOption(options)
        }
      })


    }
  },
  computed: {
    // x轴数据
    xAxisData() {
      let resData = []
      this.series.forEach(item => {
        resData.push(item.groupId)
      })
      return resData
    },
    options() {
      let options = {
        ...optionsObj,
        xAxis: {
          ...optionsObj.xAxis,
          data: this.xAxisData,
        },
        dataGroupId: '',
        series: {
          ...optionsObj.series,
          data: this.series
        }
      }
      return options
    }
  },
  watch: {
    series: {
      deep: true,
      handler() {
        this.setOption();
      },
    },
  },
}

</script>

<style scoped lang="scss">
$border-radius: 30px;

.container_two {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    text-align: center;
    height: 20px;

    .left {
      display: inline-block;
      border: 20px solid transparent;
      border-bottom: 20px solid #181B22;
      transform: translate(20px, -20px) rotate(45deg);
      border-radius: 30%;
    }

    .right {
      display: inline-block;
      border: 20px solid transparent;
      border-bottom: 20px solid #181B22;
      transform: translate(-20px, -20px) rotate(-45deg);
      border-radius: 30%;
    }

    .middle {
      display: inline-block;
      height: 23px;
      width: 120px;
      white-space: nowrap;
      line-height: 23px;
      font-size: 13px;
      color: #fff;
      background-color: #181B22;
      transform: translateY(-23px);
    }
  }

  .canvas {
    flex: 1;
  }
}

.container_two {
  .back_btn {
    z-index: 999;
    color: #fff;
    position: fixed;
    left: 679px;
    margin-top: 10px;
    cursor: pointer;
  }

  .back_btn :hover {
    transition: all ease 0.2s;
    color: #00FCFF
  }
}
</style>
