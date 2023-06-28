<template>
  <div class="patientContainer">
    <div class="patientHead">
      <el-text class="title" type="primary" size="large">报销列表</el-text>
      <el-input v-model="search" placeholder="Type to search" class="search" />
    </div>
    <el-divider border-style="dashed" />
    <div class="tableWrapper">
      <el-table
        :data="tableData()"
        style="width: 100%"
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="id"
          label="用户ID"
          width="150px"
          sortable
          fixed="left"
        />
        <el-table-column prop="policyNumber" label="保单号" width="150px" />
        <el-table-column
          prop="insurancePackage"
          label="购买保险套餐"
          width="180px"
        />
        <el-table-column
          prop="reimbursementAmount"
          label="报销金额"
          width="180px"
        />
        <el-table-column prop="illnessType" label="患病类型" width="150px" />
        <el-table-column
          prop="reimbursementRatio"
          label="报销比例"
          width="120px"
        />
        <el-table-column prop="hospital" label="就诊医院" width="150px" />
        <el-table-column prop="dateOfVisit" label="就诊日期" width="150px" />
        <el-table-column
          prop="claimStatus"
          label="报销状态"
          width="100"
          :filters="[
            { text: '已批准', value: '已批准' },
            { text: '待批准', value: '待批准' },
            { text: '已拒绝', value: '已拒绝' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          fixed="right"
        >
          <template #default="scope">
            <el-tag
              :type="reimbursementTagMap[scope.row.claimStatus]"
              disable-transitions
              >{{ scope.row.claimStatus }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="310px">
          <template #default="scope">
            <div class="operation">
              <el-tag
                class="ml-2"
                size="large"
                @click.prevent="confirm(scope.row)"
              >
                <div class="tag-center">
                  <el-icon><View /></el-icon> 查看病单
                </div>
              </el-tag>
              <el-tag
                class="ml-2"
                size="large"
                @click.prevent="upload(scope.row, scope.$index)"
                type="warning"
              >
                <div class="tag-center">
                  <el-icon><Upload /></el-icon> 上传
                </div>
              </el-tag>
              <el-tag
                class="ml-2"
                size="large"
                @click.prevent="updateMoney(scope.row, scope.$index)"
                type="success"
              >
                <div class="tag-center">
                  <el-icon><Money /></el-icon> 修改保额
                </div>
              </el-tag>
            </div>
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
    <div class="emitWrapper">
      <el-tag class="ml-2" type="danger" size="large">
        <div class="tag-center">
          <el-icon><Delete /></el-icon> 删除
        </div>
      </el-tag>
      <el-tag class="ml-2" size="large">
        <div class="tag-center">
          <el-icon><EditPen /></el-icon>编辑
        </div>
      </el-tag>
      <el-tag class="ml-2" type="success" size="large">
        <div class="tag-center">
          <el-icon><Plus /></el-icon>添加
        </div>
      </el-tag>
    </div>
    <el-drawer
      v-model="drawer"
      title="预览病历"
      size="90%"
      direction="btt"
      :before-close="handleClose"
    >
      <div class="pdfContainer">
        <el-affix position="top" :offset="80">
          <div class="tools">
            <el-button
              type="primary"
              plain
              @click.stop="prePage"
              class="toolBtn"
              >上一页</el-button
            >

            <el-button type="info" plain
              >{{ pdfConfig.curPageNum }}/{{
                pdfConfig.pageTotalNum
              }}</el-button
            >
            <el-button
              type="primary"
              plain
              @click.stop="nextPage"
              class="toolBtn"
              >下一页</el-button
            >

            <el-button type="success" plain @click.stop="clock" class="toolBtn"
              >顺时针</el-button
            >
            <el-button
              type="success"
              plain
              @click.stop="counterClock"
              class="toolBtn"
              >逆时针</el-button
            >
          </div>
        </el-affix>
        <pdf
          :src="url"
          :page="pdfConfig.curPageNum"
          :rotate="pdfConfig.pageRotate"
          @page-loaded="pageLoaded($event)"
          @num-pages="pdfConfig.pageTotalNum = $event"
          @error="pdfError($event)"
          style="
             {
              display: inline-block;
              width: 100%;
            }
          "
        ></pdf>
      </div>
    </el-drawer>
    <el-dialog v-model="dialogFormVisible" title="修改报销金额">
      <el-text class="mx-1" size="large" type="primary">{{
        "原报销金额:" + hospitalCost.cost
      }}</el-text>
      <el-divider border-style="dashed" />
      <el-input
        v-model="newHospitalCost"
        placeholder="请输入报销金额"
        clearable
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="desertUpdateCost">放弃</el-button>
          <el-button type="primary" @click="confirmUpdateCost">
            确认修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
      
<script setup lang="ts">
import uploadFile from "../components/uploadFile.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { reimbursementTagMap } from "../source/index";
import pdf from "@jbtje/vue3pdf";
import { policyData } from "../source/reimbursementList";

const drawer = ref(false); //展示弹窗
const dialogFormVisible = ref(false); //展示修改金额的弹窗
const hospitalCost = reactive({
  cost: "",
  index: 0,
});
const newHospitalCost = ref("");

const handleClose = (done: () => void) => {
  //关闭弹窗
  ElMessageBox.confirm("确定关闭预览病单?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const url = ref("/case_zs.pdf");
const loadingTask = pdf.createLoadingTask("/test.pdf");
const pdfConfig = reactive({
  //总共页数
  pageTotalNum: 1,
  //pdf旋转角度
  pageRotate: 0,
  // 加载进度
  loadedRatio: 0,
  //当前页数
  curPageNum: 1,
  pageNum: 1,
});
// 上一页函数，
const prePage = () => {
  var page = pdfConfig.curPageNum;
  page = page > 1 ? page - 1 : pdfConfig.pageTotalNum;
  pdfConfig.curPageNum = page;
};
// 下一页函数
const nextPage = () => {
  var page = pdfConfig.curPageNum;
  page = page < pdfConfig.pageTotalNum ? page + 1 : 1;
  pdfConfig.curPageNum = page;
};
// 页面顺时针翻转90度。
const clock = () => {
  pdfConfig.pageRotate += 90;
};
// 页面逆时针翻转90度。
const counterClock = () => {
  pdfConfig.pageRotate -= 90;
};
// 页面加载回调函数，其中e为当前页数
const pageLoaded = (e) => {
  pdfConfig.curPageNum = e;
};
// 其他的一些回调函数。
const pdfError = (error) => {
  console.error(error);
};

onMounted(() => {
  loadingTask.promise.then((pdf) => {
    pdfConfig.pageTotalNum = pdf.numPages;
    console.log(pdfConfig.pageTotalNum);
  });
});

const multipleTableRef = ref(null); //表示表格
const multipleSelection = ref([]); //接收表格多选框中被选中的内容
const confirm = (row) => {
  //查看病历
  //console.log("查看病历");
  drawer.value = true;
};
const upload = (row, index) => {
  ElMessage({
      message: `${row.id}号用户的报销上传成功!`,
      type: "success",
    });
};
const updateMoney = (row, index) => {
  hospitalCost.cost = row.reimbursementAmount;
  hospitalCost.index = index;
  dialogFormVisible.value = true;
};
const confirmUpdateCost = () => {
  if (newHospitalCost.value === "") {
    return ElMessage.error("修改金额不可为空");
  }
  if (Number.isNaN(Number(newHospitalCost.value))) {
    return ElMessage.error("请输入数字！");
  }
  let oldMoney= policyData[hospitalCost.index].reimbursementAmount
  policyData[hospitalCost.index].reimbursementAmount = Number(
    newHospitalCost.value
  );
  newHospitalCost.value = "";
  dialogFormVisible.value = false;
  ElMessage({
    message: `用户${policyData[hospitalCost.index].id}的报销金额已由${oldMoney}修改为${policyData[hospitalCost.index].reimbursementAmount}`,
    type: "success",
  });
};
const desertUpdateCost = () => {
  newHospitalCost.value = "";
  dialogFormVisible.value = false;
};
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
  if (row.claimStatus === "待批准") {
    return "warning-row";
  } else if (row.claimStatus === "已拒绝") {
    return "danger-row";
  }

  return "";
};
const filterTag = (value, row) => {
  //用于状态栏的过滤
  return row.claimStatus === value;
};

const state = reactive({
  page: 1,
  limit: 10,
  total: policyData.length,
});
//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  return policyData.filter(
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
.patientContainer {
  width: 80%;
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
    .operation {
      display: flex;
      .ml-2 {
        margin-right: 5px;
        scale: 1;
        cursor: pointer;
        margin-left: 5px;
        .tag-center {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
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
        cursor: pointer;
      }
    }
  }
  .pdfContainer {
    width: 100%;
    .tools {
      width: 70%;
      margin: 20px auto;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
    <style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-error-light-9);
}
</style>