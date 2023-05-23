<template>
  <div class="patientContainer">
    <div class="patientHead">
      <el-text class="title" type="primary" size="large">保单列表</el-text>
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
          width="120px"
          sortable
          fixed="left"
        />
        <el-table-column
          prop="policyNumber"
          label="保单号"
          width="150px"
          fixed="left"
        />
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
        <el-table-column fixed="right" label="操作" width="150px">
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
  </div>
</template>
      
<script setup lang="ts">
import uploadFile from "../components/uploadFile.vue";
import { ElMessageBox } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { reimbursementTagMap } from "../source/index";
import pdf from "@jbtje/vue3pdf";
const drawer = ref(false); //展示弹窗
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
const url = ref("/test.pdf");
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
  console.log("查看病历");
  drawer.value = true;
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

const policyData = [
  {
    name: "John Smith",
    id: "123456",
    policyNumber: "123",
    insurancePackage: "Package A",
    reimbursementAmount: 2000,
    illnessType: "Cancer",
    reimbursementRatio: 0.8,
    hospital: "ABC Hospital",
    doctor: "Dr. Johnson",
    dateOfVisit: "2023-05-10",
    claimStatus: "待批准",
  },
  {
    name: "Emily Johnson",
    id: "234567",
    policyNumber: "134",
    insurancePackage: "Package B",
    reimbursementAmount: 1500,
    illnessType: "Diabetes",
    reimbursementRatio: 0.6,
    claimStatus: "已批准",
    hospital: "XYZ Clinic",
    doctor: "Dr. Smith",
    dateOfVisit: "2023-04-25",
  },
  {
    name: "Emily Johnson",
    id: "234567",
    policyNumber: "134",
    insurancePackage: "Package B",
    reimbursementAmount: 1500,
    illnessType: "Diabetes",
    reimbursementRatio: 0.6,
    claimStatus: "已拒绝",
    hospital: "XYZ Clinic",
    doctor: "Dr. Smith",
    dateOfVisit: "2023-04-25",
  },
];

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