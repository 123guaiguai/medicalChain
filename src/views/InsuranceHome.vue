<template>
  <div class="container">
    <insuranceHeadMenu />
    <router-view />
  </div>
</template>
  
  <script setup lang="ts">
import insuranceHeadMenu from "../components/insuranceHeadMenu.vue";
</script>
  
  <style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>