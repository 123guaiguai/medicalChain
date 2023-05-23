<template>
  <div class="systemContainer">
    <div class="header">
      <el-card shadow="hover" class="card">
        <div class="cardWrapper">
          <div class="cardItem">
            <div class="left">
              <el-avatar :size="82" class="mr-3" :src="record" />
            </div>
            <div class="right">
              <span class="title"
                ><el-text class="mx-1" type="primary"
                  >电子病历数量</el-text
                ></span
              >
              <span class="number"
                ><el-text class="mx-1" type="primary" size="large"
                  >348</el-text
                ></span
              >
              <span class="desc"
                ><el-text class="mx-1" type="success">+20% 增长</el-text></span
              >
            </div>
          </div>
          <el-divider direction="vertical" class="divider" />
          <div class="cardItem">
            <div class="left">
              <el-avatar :size="82" class="mr-3" :src="statistic" />
            </div>
            <div class="right">
              <span class="title"
                ><el-text class="mx-1" type="primary"
                  >接收患者数量</el-text
                ></span
              >
              <span class="number"
                ><el-text class="mx-1" type="primary" size="large"
                  >2199</el-text
                ></span
              >
              <span class="desc"
                ><el-text class="mx-1" type="success">+11% 增长</el-text></span
              >
            </div>
          </div>
          <el-divider direction="vertical" class="divider" />
          <div class="cardItem">
            <div class="left">
              <el-avatar :size="82" class="mr-3" :src="money" />
            </div>
            <div class="right">
              <span class="title"
                ><el-text class="mx-1" type="primary"
                  >医院单月收入</el-text
                ></span
              >
              <span class="number"
                ><el-text class="mx-1" type="primary" size="large"
                  >231200(元)</el-text
                ></span
              >
              <span class="desc"
                ><el-text class="mx-1" type="success">+12% 增长</el-text></span
              >
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="statisticContainer">
      <div class="chartWrapper">
        <el-text class="title" type="primary" size="large"
          >单季度接收患者统计</el-text
        >
        <el-divider border-style="dashed" />
        <div class="chartItemWrapper" ref="chartContainer1"></div>
        <uploadFile />
      </div>
      <div class="chartWrapper">
        <el-text class="title" type="primary" size="large"
          >单季度医院收入统计</el-text
        >
        <el-divider border-style="dashed" />
        <div class="chartItemWrapper" ref="chartContainer2"></div>
        <uploadFile />
      </div>
    </div>
    <div class="dianosisContainer">
      <div class="patientHead">
        <el-text class="title" type="primary" size="large"
          >患者诊断记录</el-text
        >
        <el-input
          v-model="search"
          placeholder="Type to search"
          class="search"
        />
      </div>
      <el-divider border-style="dashed" />
      <div class="tableWrapper">
        <el-table
          :data="tableData()"
          style="width: 100%"
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="patientName" label="患者姓名" sortable />
          <el-table-column prop="doctorName" label="医生姓名" />
          <el-table-column prop="room" label="科室" />
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="time" label="就诊时间" sortable />
          <el-table-column
            prop="tag"
            label="状态"
            width="100"
            :filters="[
              { text: 'completed', value: 'completed' },
              { text: 'cancel', value: 'cancel' },
              { text: 'pending', value: 'pending' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-tag
                :type="patientTagMap[scope.row.tag]"
                disable-transitions
                >{{ scope.row.tag }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="example-pagination-block">
          <!-- <div class="example-demonstration">分页</div> -->
          <el-pagination
            background
            layout="prev, pager, next ,total,sizes"
            :total="state.total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
      <uploadFile />
    </div>
    <div class="statisticContainerBottom">
      <div class="chartWrapper">
        <el-text class="title" type="primary" size="large"
          >待就诊患者状态分布图</el-text
        >
        <el-divider border-style="dashed" />
        <div class="chartItemWrapper" ref="chartContainer3"></div>
        <uploadFile />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import record from "../assets/record.jpg";
import * as echarts from "echarts";
import statistic from "../assets/statistic.png";
import money from "../assets/money.png";
import { patientTagMap } from "../source/index";
import uploadFile from "@/components/uploadFile.vue";
import { ref, reactive, onMounted } from "vue";
const chartContainer1 = ref(null);
const initChart1 = () => {
  //初始化图表一
  // 在组件挂载后初始化图表
  const chart = echarts.init(chartContainer1.value);

  // 使用配置项配置图表
  const options = {
    color: "#008000",
    title: {
      text: "单季度接收患者统计",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#67c23a",
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      data: ["单季度接收患者统计"],
    },
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E", "F"], // x 轴数据
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
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    series: [
      {
        name: "单季度接收患者统计",
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
                color: "#67c23a", // 渐变色起始颜色
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
    "点",
    "击",
    "柱",
    "子",
    "或",
    "者",
    "两",
    "指",
    "在",
    "触",
    "屏",
    "上",
    "滑",
    "动",
    "能",
    "够",
    "自",
    "动",
    "缩",
    "放",
  ];
  let data = [
    //图表二的竖轴数据
    220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133,
    334, 198, 123, 125, 220,
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
      text: "单季度接收患者统计",
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
      data: ["单季度接收患者统计"],
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
        name: "单季度接收患者统计",
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
  let options = {
    title: {
      text: "待就诊患者状态分布图",
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
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
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
});

const multipleTableRef = ref(null); //表示表格
const multipleSelection = ref([]); //接收表格多选框中被选中的内容
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(val[0]);
};
const search = ref("");
const tableRowClassName = ({
  //用于特定行的背景色修改
  row,
  rowIndex,
}) => {
  if (row.tag === "cancel") {
    return "warning-row";
  }

  return "";
};
const filterTag = (value, row) => {
  //用于状态栏的过滤
  return row.tag === value;
};

const allTableData = [
  {
    patientName: "Tom",
    doctorName: "王建国",
    room: "内科",
    date: "2016-05-02",
    time: "12:10",
    tag: "completed",
  },
  {
    patientName: "Tom",
    doctorName: "王建国",
    room: "内科",
    date: "2016-05-02",
    time: "12:10",
    tag: "completed",
  },
  {
    patientName: "Tom",
    doctorName: "王建国",
    room: "内科",
    date: "2016-05-02",
    time: "12:10",
    tag: "completed",
  },
  {
    patientName: "Tom",
    doctorName: "王建国",
    room: "内科",
    date: "2016-05-02",
    time: "12:10",
    tag: "completed",
  },
];
const state = reactive({
  page: 1,
  limit: 10,
  total: allTableData.length,
});
//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  return allTableData.filter(
    (item, index) =>
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};
//改变页码
const handleCurrentChange = (e) => {
  state.page = e;
};
//改变页数限制
const handleSizeChange = (e) => {
  state.limit = e;
};
</script>

<style scoped lang="less">
.systemContainer {
  width: 80%;
  padding: 20px 20px;
  box-sizing: border-box;
  margin-top: 10px;

  .header {
    width: 100%;
    .card {
      width: 100%;
      .cardWrapper {
        display: flex;
        justify-content: space-around;
        .divider {
          height: 7em;
        }
        .cardItem {
          width: 20%;
          height: 120px;
          display: flex;
          align-content: center;
          .left,
          .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
          }
        }
      }
    }
  }
  .statisticContainer,
  .statisticContainerBottom {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    box-sizing: border-box;
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
        margin-bottom: 20px;
      }
    }
  }
  .statisticContainerBottom {
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 2px 2px #dceaf1;
    margin-top: 30px;
    .chartWrapper {
      border-radius: 10px;
      background-color: white;
      box-shadow: none;
    }
  }
  .dianosisContainer {
    width: 100%;
    background-color: white;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0 0 1px 1px #ebe5e5;
    padding: 20px 20px;
    .patientHead {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 25px;
      }
      .search {
        width: 200px;
      }
    }

    .tableWrapper {
      width: 100%;
      .example-pagination-block {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
      }
    }
    .emitWrapper {
      .ml-2 {
        margin-right: 30px;
        scale: 1.3;
        cursor: pointer;

        .tag-center {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
}
</style>