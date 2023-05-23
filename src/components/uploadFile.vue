<template>
  <div class="tabsWrapper">
    <el-tabs type="card" class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Download /></el-icon>
            <span>CSV</span>
          </span>
        </template>
        <el-text class="mx-1" type="primary" size="large">下载CSV</el-text>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><FolderAdd /></el-icon>
            <span>print</span>
          </span>
        </template>

        <el-text class="mx-1" type="primary" size="large">下载print</el-text>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><DocumentCopy /></el-icon>
            <span>PDF</span>
          </span>
        </template>
        <el-text class="mx-1" type="primary" size="large">下载PDF</el-text>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Notebook /></el-icon>
            <span>Excel</span>
          </span>
        </template>
        <el-text class="mx-1" type="primary" size="large">下载Excel</el-text>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.tabsWrapper {
  width: 50%;
  margin: 20px auto;
  .custom-tabs-label {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>