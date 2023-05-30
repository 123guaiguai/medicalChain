<template>
  <div class="statisticContainer">
    <div class="chartWrapper">
      <el-text class="title" type="primary" size="large"
        >病历调取次数日统计</el-text
      >
      <el-divider border-style="dashed" />
      <div class="chartItemWrapper" ref="chartContainer1"></div>
      <uploadFile/>
    </div>

    <div class="chartWrapper">
      <el-text class="title" type="primary" size="large"
        >医生诊断人数日统计</el-text
      >
      <el-divider border-style="dashed" />
      <div class="chartItemWrapper" ref="chartContainer2"></div>
      <uploadFile/>
    </div>

    <div class="chartWrapper">
      <el-text class="title" type="primary" size="large">出诊日活统计</el-text>
      <el-divider border-style="dashed" />
      <div class="chartItemWrapper" ref="chartContainer3"></div>
      <uploadFile/>
    </div>

    <div class="chartWrapper">
      <el-text class="title" type="primary" size="large">患者年龄统计</el-text>
      <el-divider border-style="dashed" />
      <div class="chartItemWrapper" ref="chartContainer4"></div>
      <uploadFile/>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import uploadFile from "../components/uploadFile.vue";
const chartContainer1 = ref(null);
const initChart1 = () => {
  //初始化图表一
  // 在组件挂载后初始化图表
  const chart = echarts.init(chartContainer1.value);

  // 使用配置项配置图表
  const options = {
    title: {
      text: "病历调取次数日统计",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      data: ["病历调取次数日统计"],
    },
    xAxis: {
      type: "category",
      data: ["2023/4/21", "2023/4/22", "2023/4/23", "2023/4/24", "2023/4/25", "2023/4/26"], // x 轴数据
      boundaryGap: false, // 折线图从轴上开始绘制
      axisLine: {
        show: false, // 不显示 x 轴线
      },
      axisTick: {
        show: false, // 不显示刻度线
      },
      axisLabel: {
        show: true, // 显示刻度标签
      },
    },
    yAxis: {
      scale: true,
      axisLine: {
        show: false, // 不显示 y 轴线
      },
    },
    grid: {
      left: "4%",
      right: "10%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    series: [
      {
        name: "病历调取次数日统计",
        type: "line",
        smooth: true, // 折线平滑显示
        areaStyle: {
          // 折线下方区域的填充样式
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#858fcd", // 渐变色起始颜色
              },
              {
                offset: 1,
                color: "#f5f5f5", // 渐变色结束颜色
              },
            ],
          },
        },
        data: [100, 200, 150, 300, 250, 400], // 折线图数据
        markLine: {
          // 标记线，用于显示平均值
          data: [
            {
              type: "average",
              name: "平均值",
              label: {
                formatter: "{c}", // 标记线上标签显示平均值
                position: "end",
              },
              lineStyle: {
                color: "#ff0000", // 平均值标记线的颜色
              },
            },
          ],
        },
      },
    ],
  };
  chart.setOption(options);
};

const chartContainer2 = ref(null);
const initChart2 = () => {
  //初始化图表二
  // 在组件挂载后初始化图表
  const chart = echarts.init(chartContainer2.value);
  let dataAxis = [
    //图表二的横轴数据
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  let data = [
    //图表二的竖轴数据
    290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 123,
  ];
  // prettier-ignore
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  // 使用配置项配置图表
  const options = {
    title: {
      text: "医生诊断人数日统计",
      subtext: "鼠标滑轮滚动可以放大缩小",
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      data: ["医生诊断人数日统计"],
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        name: "医生诊断人数日统计",
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };
  chart.setOption(options);
};

const chartContainer3 = ref(null);
const initChart3 = () => {
  const chart = echarts.init(chartContainer3.value);
  const data = [
    ["2022-06-05", 116],
    ["2022-06-06", 129],
    ["2022-06-07", 135],
    ["2022-06-08", 86],
    ["2022-06-09", 73],
    ["2022-06-10", 85],
    ["2022-06-11", 73],
    ["2022-06-12", 68],
    ["2022-06-13", 92],
    ["2022-06-14", 130],
    ["2022-06-15", 245],
    ["2022-06-16", 139],
    ["2022-06-17", 115],
    ["2022-06-18", 111],
    ["2022-06-19", 309],
    ["2022-06-20", 206],
    ["2022-06-21", 137],
    ["2022-06-22", 128],
    ["2022-06-23", 85],
    ["2022-06-24", 94],
    ["2022-06-25", 71],
    ["2022-06-26", 106],
    ["2022-06-27", 84],
    ["2022-06-28", 93],
    ["2022-06-29", 85],
    ["2022-06-30", 73],
    ["2022-07-01", 83],
    ["2022-07-02", 125],
    ["2022-07-03", 107],
    ["2022-07-04", 82],
    ["2022-07-05", 44],
    ["2022-07-06", 72],
    ["2022-07-07", 106],
    ["2022-07-08", 107],
    ["2022-07-09", 66],
    ["2022-07-10", 91],
    ["2022-07-11", 92],
    ["2022-07-12", 113],
    ["2022-07-13", 107],
    ["2022-07-14", 131],
    ["2022-07-15", 111],
    ["2022-07-16", 64],
    ["2022-07-17", 69],
    ["2022-07-18", 88],
    ["2022-07-19", 77],
    ["2022-07-20", 83],
    ["2022-07-21", 111],
    ["2022-07-22", 57],
    ["2022-07-23", 55],
    ["2022-07-24", 60],
  ];
  const dateList = data.map(function (item) {
    return item[0];
  });
  const valueList = data.map(function (item) {
    return item[1];
  });
  let options = {
    color: "#ec8739",
    // Make gradient line here
    visualMap: {
      show: false,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
    title: {
      text: "出诊日活统计",
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      data: ["出诊日活统计"],
    },
    xAxis: {
      data: dateList,
    },
    yAxis: {},
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    series: {
      name: "出诊日活统计",
      type: "line",
      showSymbol: false,
      data: valueList,
    },
  };
  chart.setOption(options);
};

const chartContainer4 = ref(null);
const initChart4 = () => {
  const chart = echarts.init(chartContainer4.value);
  let options = {
    title: {
      text: "患者年龄统计",
    },
    tooltip: {
      trigger: "item",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      top: "10%",
      left: "center",
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "30-40" },
          { value: 735, name: "20-30" },
          { value: 580, name: "50-60" },
          { value: 484, name: "40-50" },
          { value: 300, name: "10-20" },
        ],
      },
    ],
  };
  chart.setOption(options);
};

onMounted(() => {
  initChart1();
  initChart2();
  initChart3();
  initChart4();
});
</script>

<style scoped lang="less">
.statisticContainer {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 20px;
  .chartWrapper {
    box-sizing: border-box;
    width: 47%;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 2px 2px #dceaf1;

    height: 680px;
    margin-bottom: 20px;
    padding: 20px 20px;
    .title {
      font-size: 25px;
    }
    .chartItemWrapper {
      width: 100%;
      height: 70%;
      margin-bottom:20px;
    }
  }
}
</style>