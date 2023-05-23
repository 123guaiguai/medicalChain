<template>
  <div class="container">
    <headMenu />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import headMenu from "../components/headMenu.vue";
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>