<template>
  <div class="addContainer">
    <el-text class="title" type="primary" size="large">添加病历信息</el-text>
    <el-divider border-style="dashed" />
    <div class="inputWrapper">
      <span
        ><span style="color: #38534c; font-weight: 700">患者编号</span
        >(自动生成)</span
      >
      <el-input disabled placeholder="157auoWs2H12" />
    </div>
    <div class="inputWrapper">
      <span
        ><span style="color: #38534c; font-weight: 700">患者年龄</span
        >(自动生成)</span
      >
      <el-input disabled placeholder="67" />
    </div>
    <div class="inputWrapper">
        <span style="color: #38534c; font-weight: 700">主诉</span>
      <el-input
        :rows="4"
        type="textarea"
      />
    </div>
    <div class="inputWrapper">
        <span style="color: #38534c; font-weight: 700">初步诊断</span>
      <el-input
        :rows="4"
        type="textarea"
      />
    </div>
    <div class="inputWrapper">
        <span style="color: #38534c; font-weight: 700">治疗意见</span>
      <el-input
        :rows="4"
        type="textarea"
      />
    </div>
    <div class="btnWrapper">
        <el-button type="primary" :icon="Back" @click="back">返回</el-button>
        <el-button type="success" :icon="Promotion" @click="submit">确认添加</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Back,Promotion } from '@element-plus/icons-vue'
import {useRouter} from "vue-router"
import { ElMessage } from 'element-plus'
const router=useRouter()
const back=()=>{
    router.push('/mediaHome/pendingPatients')
}
const submit=()=>{
    ElMessage({
    message: '病历信息添加成功！',
    type: 'success',
  })
}
</script>

<style scoped lang="less">
.addContainer {
  width: 60%;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px #ebe5e5;
  padding: 20px 20px;
  margin-bottom:30px;
  .title {
    font-size: 25px;
  }
  .inputWrapper {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 30px;
    span {
      margin-bottom: 10px;
      color: #7f7d7d;
    }
  }
}
</style>