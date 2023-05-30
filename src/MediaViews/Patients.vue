<template>
  <div class="patientContainer">
    <div class="patientHead">
      <el-text class="title" type="primary" size="large">患者列表</el-text>
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
        <el-table-column prop="id" label="ID" sortable />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="time" label="最近就诊" sortable />
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
            <el-tag :type="patientTagMap[scope.row.tag]" disable-transitions>{{
              scope.row.tag
            }}</el-tag>
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
  </div>
</template>
  
  <script setup lang="ts">
import uploadFile from "../components/uploadFile.vue";
import { ref, reactive } from "vue";
import { patientTagMap } from "../source/index";
import {allTableData} from "../source/patientList.js"
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
      }
    }
  }
}
</style>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-error-light-9);
}
</style>