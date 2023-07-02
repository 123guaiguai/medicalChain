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
          width="150px"
          sortable
          fixed="left"
        />
        <el-table-column prop="policyNumber" label="保单号" width="120px" />
        <el-table-column prop="insurancePlan" label="保单计划" width="120px" />
        <el-table-column prop="startDate" label="起始日期" width="180px" />
        <el-table-column prop="endDate" label="终止日期" width="180px" />
        <el-table-column prop="paymentStatus" label="缴费状态" width="120px" />
        <el-table-column prop="premiumAmount" label="保费金额" width="120px" />
        <el-table-column prop="phoneNumber" label="联系电话" width="120px" />
        <el-table-column prop="idType" label="证件类型" width="120px" />
        <el-table-column
          prop="healthcareProvider"
          label="医疗服务提供者"
          width="150px"
        />
        <el-table-column
          prop="medicalExpenseLimit"
          label="医疗服务费用限额"
          width="150px"
        />
        <el-table-column
          prop="reimbursementRatio"
          label="报销比例"
          width="120px"
        />
        <el-table-column
          prop="policyStatus"
          label="状态"
          width="100"
          fixed="right"
          :filters="[
            { text: '生效', value: '生效' },
            { text: '未生效', value: '未生效' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="insuranceTagMap[scope.row.policyStatus]"
              disable-transitions
              >{{ scope.row.policyStatus }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="280px">
          <template #default="scope">
            <div class="operation">
              <el-tag
                class="ml-2"
                type="success"
                size="large"
                @click.prevent="upload(scope.row, scope.$index)"
              >
                <div class="tag-center">
                  <el-icon><Upload /></el-icon> 上传
                </div>
              </el-tag>
              <el-tag
                class="ml-2"
                size="large"
                type="warning"
                @click.prevent="reject(scope.row, scope.$index)"
              >
                <div class="tag-center">
                  <el-icon><Unlock /></el-icon>取消投保
                </div>
              </el-tag>
              <el-tag
                class="ml-2"
                size="large"
                @click="view(scope.row, scope.$index)"
              >
                <div class="tag-center">
                  <el-icon><View /></el-icon>历史病历
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
  </div>
</template>
    
    <script setup lang="ts">
import uploadFile from "../components/uploadFile.vue";
import { ref, reactive } from "vue";
import { insuranceTagMap } from "../source/index";
import { ElMessage } from "element-plus";

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
  if (row.policyStatus === "未生效") {
    return "warning-row";
  }

  return "";
};
const filterTag = (value, row) => {
  //用于状态栏的过滤
  return row.policyStatus === value;
};

const policyData = reactive([
  {
    id: "157auoWs2H12",
    name: "张三",
    age: 67,
    gender: "男",
    policyNumber: "POL001",
    insurancePlan: "基本计划",
    startDate: "2023-01-01",
    endDate: "2043-01-01",
    paymentStatus: "已缴费",
    premiumAmount: 1000,
    policyStatus: "未生效",
    phoneNumber: "17829384949",
    email: "zhangsan@example.com",
    idType: "身份证",
    idNumber: "XXXXXXXXXXXXXXXXX",
    insuredName: "张三",
    insuredRelationship: "本人",
    healthcareProvider: "成都市第六人民医院",
    medicalExpenseLimit: 50000,
    reimbursementRatio: "80%",
    emergencyContact: {
      name: "李四",
      phoneNumber: "987654321",
    },
  },
  {
    id: "1234567def",
    name: "李四",
    age: 45,
    gender: "女",
    policyNumber: "POL002",
    insurancePlan: "高级计划",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
    paymentStatus: "已缴费",
    premiumAmount: 1500,
    policyStatus: "生效",
    phoneNumber: "18765432121",
    email: "lisi@example.com",
    idType: "护照",
    idNumber: "YYYYYYYYYYYYYYY",
    insuredName: "王五",
    insuredRelationship: "配偶",
    healthcareProvider: "YY医院",
    medicalExpenseLimit: 100000,
    reimbursementRatio: "90%",
  },
  {
    id: "1234567abc",
    name: "张三",
    age: 30,
    gender: "男",
    policyNumber: "POL003",
    insurancePlan: "基本计划",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    paymentStatus: "已缴费",
    premiumAmount: 1000,
    policyStatus: "生效",
    phoneNumber: "13145678921",
    email: "zhangsan@example.com",
    idType: "身份证",
    idNumber: "XXXXXXXXXXXXXXXXX",
    insuredName: "张三",
    insuredRelationship: "本人",
    healthcareProvider: "XX医院",
    medicalExpenseLimit: 50000,
    reimbursementRatio: "80%",
    emergencyContact: {
      name: "李四",
      phoneNumber: "987654321",
    },
  },
  {
    id: "1234567def",
    name: "李四",
    age: 45,
    gender: "女",
    policyNumber: "POL004",
    insurancePlan: "高级计划",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
    paymentStatus: "已缴费",
    premiumAmount: 1500,
    policyStatus: "生效",
    phoneNumber: "18765432134",
    email: "lisi@example.com",
    idType: "护照",
    idNumber: "YYYYYYYYYYYYYYY",
    insuredName: "王五",
    insuredRelationship: "配偶",
    healthcareProvider: "YY医院",
    medicalExpenseLimit: 100000,
    reimbursementRatio: "90%",
  },
  {
    id: "1234567abc",
    name: "张三",
    age: 30,
    gender: "男",
    policyNumber: "POL005",
    insurancePlan: "基本计划",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    paymentStatus: "已缴费",
    premiumAmount: 1000,
    policyStatus: "生效",
    phoneNumber: "12545678909",
    email: "zhangsan@example.com",
    idType: "身份证",
    idNumber: "XXXXXXXXXXXXXXXXX",
    insuredName: "张三",
    insuredRelationship: "本人",
    healthcareProvider: "XX医院",
    medicalExpenseLimit: 50000,
    reimbursementRatio: "80%",
    emergencyContact: {
      name: "李四",
      phoneNumber: "987654321",
    },
  },
  {
    id: "1234567def",
    name: "李四",
    age: 45,
    gender: "女",
    policyNumber: "POL006",
    insurancePlan: "高级计划",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
    paymentStatus: "已缴费",
    premiumAmount: 1500,
    policyStatus: "生效",
    phoneNumber: "18654321124",
    email: "lisi@example.com",
    idType: "护照",
    idNumber: "YYYYYYYYYYYYYYY",
    insuredName: "王五",
    insuredRelationship: "配偶",
    healthcareProvider: "YY医院",
    medicalExpenseLimit: 100000,
    reimbursementRatio: "90%",
  },
]);
const upload = (row, index) => {
  policyData[index].policyStatus = "生效";
  ElMessage({
    message: `id号${row.id}的保单已上传`,
    type: "success",
  });
};
const reject = (row, index) => {
  policyData[index].policyStatus = "未生效";
  ElMessage({
    message: `id号${row.id}的保单已拒绝`,
    type: "error",
  });
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
const view = (row, index) => {
  if (index !== 4) {
    ElMessage({
      message: `ID为${row.id}的用户无历史病单！`,
      type: "warning",
    });
  }
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