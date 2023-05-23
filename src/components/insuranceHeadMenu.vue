<template>
    <div class="menuContainer">
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <img src="../assets/logow.png" class="logo" />
        <div class="flex-group"></div>
        <el-sub-menu
          :index="index + 1"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <template #title>{{ item.menuTitle }}</template>
          <el-menu-item
            :index="index + 1 + '-' + (menuIndex + 1)"
            v-for="(menuItem, menuIndex) in item.menuItem"
            :key="menuIndex"
            >{{
              menuItem instanceof Object ? menuItem.name : menuItem
            }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
      <div class="pageHeaderWrapper">
        <el-page-header>
          <template #breadcrumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/login' }">
                login
              </el-breadcrumb-item>
              <el-breadcrumb-item
                ><a href="#">{{ breadcrumb.pre }}</a></el-breadcrumb-item
              >
              <el-breadcrumb-item>{{ breadcrumb.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <template #content>
            <el-avatar
              :size="32"
              class="mr-3"
              src="/images/insurance.png"
            />
            <span class="text-large font-600 mr-3"> {{ breadcrumb.title }}</span>
          </template>
        </el-page-header>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  // import insurance from "../assets/insurance.png"
  const router = useRouter();
  const activeIndex = ref("1");
  const menuList = reactive([
    {
      menuTitle: "保单管理",
      menuItem: [{ name: "保单查看", path: "/insuranceHome/insuranceList" }],
    },
    {
      menuTitle: "报销管理",
      menuItem: [{ name: "报销详情", path: "/insuranceHome/reimbursementList" }],
    },
  ]);
  const handleSelect = (key: string, keyPath: string[]) => {
    //console.log(key, keyPath);
    let keyArr = key.split("-").map((item) => Number(item) - 1);
    console.log(keyArr);
    breadcrumb.pre = menuList[keyArr[0]].menuTitle;
    if (menuList[keyArr[0]].menuItem[keyArr[1]] instanceof Object) {
      breadcrumb.title = menuList[keyArr[0]].menuItem[keyArr[1]].name;
      router.push(menuList[keyArr[0]].menuItem[keyArr[1]].path);
    } else {
      breadcrumb.title = menuList[keyArr[0]].menuItem[keyArr[1]];
    }
  };
  const breadcrumb = reactive({
    title: "保单查看",
    pre: "保单管理",
  });
  </script>
  
  <style scoped lang="less">
  .menuContainer {
    width: 80%;
    margin-top: 20px;
    border-radius: 10px;
    background-color: white;
    .el-menu {
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      align-items: center;
      height: 70px;
      font-weight: bold;
      .logo {
        width: 100px;
        height: 50px;
        margin-left: 10px;
      }
      .flex-group {
        flex-grow: 1;
      }
    }
  
    .pageHeaderWrapper {
      margin-top: 10px;
      margin-left: 20px;
      margin-bottom: 10px;
      .text-large {
        font-weight: 700;
        margin-left: 30px;
        font-size: 30px;
      }
    }
  }
  </style>