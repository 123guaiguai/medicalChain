<template>
  <div class="recordContainer">
    <div class="recordHead">
      <el-text class="title" type="primary" size="large">病历列表</el-text>
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
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="recordId" label="病历ID" sortable />
        <el-table-column prop="patientId" label="患者ID" sortable />
        <el-table-column prop="doctorId" label="医生ID" />
        <el-table-column prop="time" label="就诊日期" />
        <el-table-column
          prop="tag"
          label="状态"
          width="100"
          :filters="[
            { text: '已上传', value: '已上传' },
            { text: '未上传', value: '未上传' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="recordTagMap[scope.row.tag]" disable-transitions>{{
              scope.row.tag
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250px">
          <template #default="scope">
            <div class="operation">
              <el-tag
                class="ml-2"
                type="success"
                size="large"
                @click.prevent="upload(scope.row)"
              >
                <div class="tag-center">
                  <el-icon><Upload /></el-icon> 上传
                </div>
              </el-tag>
              <el-tag
                class="ml-2"
                size="large"
                type="warning"
                @click.prevent="authorized(scope.row)"
              >
                <div class="tag-center">
                  <el-icon><Unlock /></el-icon>授权
                </div>
              </el-tag>
              <el-tag
                class="ml-2"
                size="large"
                @click.prevent="confirm(scope.row)"
              >
                <div class="tag-center">
                  <el-icon><View /></el-icon> 查看
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
    <uploadFile :headers="headers" :data="allTableData" :fields="fields" fileName="病历记录" />
    <el-drawer
      v-model="drawer"
      title="预览病历"
      size="90%"
      direction="btt"
      :before-close="handleClose"
    >
      <div id="mypdf"></div>
    </el-drawer>
  </div>
</template>
  
  <script setup lang="ts">
import uploadFile from "../components/uploadFile.vue";
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import PDFObject from "pdfobject";
import { recordTagMap } from "../source/index";
import { ElMessageBox } from "element-plus";
import { allTableData } from "../source/medicalRecordList.js";
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
  if (row.tag === "未上传") {
    return "warning-row";
  }

  return "";
};
const filterTag = (value, row) => {
  //用于状态栏的过滤
  return row.tag === value;
};

const headers = ["病历ID", "患者ID", "医生ID", "就诊日期", "状态"];
const fields={
  'recordId':'病历ID',
  'patientId':'患者ID',
  'doctorId':'医生ID',
  'time':'就诊日期',
  'tag':'状态'
}

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

const authorizedList = ref([]); //记录已授权的病历
const authorized = (row) => {
  if (!authorizedList.value.includes(row.recordId)) {
    authorizedList.value.push(row.recordId);
    ElMessage({
      message: `病历号${row.recordId}的病历授权成功!`,
      type: "success",
    });
  } else {
    ElMessage({
      message: `病历号${row.recordId}的病历已被授权查看`,
      type: "success",
    });
  }
};
const upload = (row) => {
  //病历信息上传
  console.log(row);
};

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
const confirm = (row) => {
  if (!authorizedList.value.includes(row.recordId)) {
    return ElMessage({
      message: `病历号${row.recordId}的病历尚未被授权, 请授权后查看`,
      type: "warning",
    });
  }
  //病单展示
  drawer.value = true;
  let url = "/case_zs.pdf";
  nextTick(() => {
    PDFObject.embed(url, "#mypdf");
  });
};
</script>
  
  <style scoped lang="less">
.recordContainer {
  width: 80%;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px #ebe5e5;
  padding: 20px 20px;
  .recordHead {
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

    .example-pagination-block {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
  #mypdf {
    height: 800px;
    border: 1rem solid rgba(0, 0, 0, 0.1);
  }
}
</style>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>