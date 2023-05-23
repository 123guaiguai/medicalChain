<template>
  <div class="doctorContainer">
    <el-text class="title" type="primary" size="large">医生列表</el-text>
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
        <el-table-column prop="age" label="医龄(年)" sortable/>
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="room" label="科室" />
        <el-table-column
          prop="tag"
          label="状态"
          width="100"
          :filters="[
            { text: '可出诊', value: '可出诊' },
            { text: '不可出诊', value: '不可出诊' },
            { text: '休假', value: '休假' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="doctorTagMap[scope.row.tag]" disable-transitions>{{
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
import { reactive,ref } from "vue";
import { doctorTagMap } from "../source/index";

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
    id:'1',
    name:"Tom",
    age: "10",
    phone:"18158806760",
    room:"内科",
    tag:"可出诊"
  },
  {
    id:'2',
    name:"Tom",
    age: "10",
    phone:"18158806760",
    room:"外科",
    tag:"不可出诊"
  },
  {
    id:'3',
    name:"Tom",
    age: "10",
    phone:"18158806760",
    room:"皮肤科",
    tag:"休假"
  },
  {
    id:'4',
    name:"Tom",
    age: "10",
    phone:"18158806760",
    room:"神经科",
    tag:"可出诊"
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
.doctorContainer {
  width: 80%;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px #ebe5e5;
  padding: 20px 20px;
  .title {
    font-size: 25px;
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