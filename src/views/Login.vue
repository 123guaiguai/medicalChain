<template>
  <div class="container">
    <div class="wrapper">
      <div class="left">
        <img src="../assets/logonew.png" alt="" class="logo" />
        <img src="../assets/signin.png" alt="" class="bg" />
        <span class="bold">医链网 HealNet</span>
        <span>安全可信的跨链医疗保险系统</span>
      </div>
      <div class="right">
        <span class="title">LOGIN</span>
        <div class="inputWrapper">
          <el-input
            v-model="loginForm.account"
            class="w-50 m-2"
            placeholder="请输入账号(电话/邮箱)"
            :prefix-icon="User"
          />
        </div>
        <div class="inputWrapper">
          <el-input
            v-model="loginForm.password"
            class="w-50 m-2"
            placeholder="请输入密码"
            :prefix-icon="Lock"
          />
          <span class="forgetPass">忘记密码</span>
        </div>
        <el-radio-group v-model="loginType" class="ml-4">
          <el-radio label="1" size="large">登陆医院端</el-radio>
          <el-radio label="2" size="large">登陆保险公司端</el-radio>
        </el-radio-group>
        <div class="remark">
          <el-switch v-model="rememberPass" active-text="记住我" />
          <el-button type="primary" round @click="login">登录</el-button>
        </div>
        <div class="dividerWrapper">
          <el-divider border-style="dashed" />
        </div>
        <!-- <div class="register">
          <span>还没有账户？ <a>注册</a></span>
          <span class="iconList">
            <span class="iconfont icon-weixin"></span>
            <span class="iconfont icon-iconqq"></span>
            <span class="iconfont icon-shouji"></span>
          </span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Lock, User } from "@element-plus/icons-vue";
import { LoginForm } from "../type/login";
import { ElMessage } from "element-plus";
const loginType = ref("1"); //1代表登陆医院管理端，2代表登陆保险公司端
const loginForm = reactive(new LoginForm());
const rememberPass = ref(true);
const router = useRouter();
const login = () => {
  if (!loginForm.account || !loginForm.password) {
    return ElMessage.error("请完整填写账号和密码！");
  }
  if (loginType.value === "1") {
    if (loginForm.account === "hospital" && loginForm.password === "123456") {
      ElMessage({
        message: "登陆成功！",
        type: "success",
      });
      router.push("/mediaHome"); //跳转到医院端
    } else {
      return ElMessage.error("账号或密码错误，登陆失败！");
    }
  } else {
    if(loginForm.account==='insurance'&&loginForm.password==='123456'){
      ElMessage({
        message: "登陆成功！",
        type: "success",
      });
      router.push("/insuranceHome"); //跳转到保险公司端
    }
    else{
      return ElMessage.error("账号或密码错误，登陆失败！");
    }
  }
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    #6667a2,
    #6282b7,
    #679cc6,
    #77b5d1,
    #91ccda
  );
  .wrapper {
    display: flex;
    box-shadow: 0 0 3px 3px #648abc;
    border-radius: 20px;
    .left,
    .right {
      width: 400px;
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .left {
      background-image: linear-gradient(
        to right bottom,
        #6667a2,
        #6282b7,
        #679cc6,
        #77b5d1,
        #91ccda
      );
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      .logo {
        width: 40%;
        margin-top: 40px;
      }
      .bg {
        width: 80%;
        margin-top: 30px;
        margin-bottom: 30px;
      }
      span {
        color: white;
      }
      .bold {
        font-size: 22px;
        margin-bottom: 10px;
      }
    }
    .right {
      background-color: white;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      .title {
        color: #97d1f4;
        margin-top: 60px;
        margin-bottom: 20px;
        font-size: 30px;
      }
      .inputWrapper {
        width: 80%;
        margin-bottom: 40px;
        position: relative;
        .forgetPass {
          position: absolute;
          bottom: -30px;
          right: 10px;
          color: #59b1e7;
        }
      }
      .ml-4 {
        margin-bottom: 20px;
      }
      .remark {
        margin-top: 10px;
        width: 80%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .dividerWrapper {
        width: 80%;
      }
      .register {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        a {
          color: #59b1e7;
        }
        .iconfont {
          color: #648cbd;
          font-size: 25px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>