<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goback"
        />
        <div class="login_Box">
          <van-field
            v-model="username"
            label="用户名"
            clearable
            placeholder="请输入用户名"
            required
            :error-message="userNameErrorMessage"
          />
 
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :error-message="passwordErrorMessage"
          />
          <div class="login_button">
            <van-button type="primary" size="large" @click="loginAllMethods" :loading="openLoading">登录</van-button>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  name: "Register",
  data() {
    return {
      msg: "hello",
      username: "",
      password: "",
      openLoading: false, // 是否开启用户注册的loading状态
      userNameErrorMessage: "",
      passwordErrorMessage: ""
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    loginAllMethods(){
      this.checkForm() && this.getloginData()   // 如果this.checkForm()成功了，执行this.getRegisterData()
      // if(this.checkForm()){
      //   this.getRegisterData()
      // }
    },
    getloginData() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      }).then(response => {
          console.log(response)
        }).catch(error => {
         
        });
    },
    // 表单验证 
    checkForm(){
      let isok = true
      if(this.username.length<5){
        this.userNameErrorMessage = '用户名不能小于5位'
        isok = false
      }else{
          this.userNameErrorMessage = ''
      }
      if(this.password.length<6){
        this.passwordErrorMessage = '密码不能小于6位'
        isok = false
      }else{
        this.passwordErrorMessage = '密码不能小于6位'
      }
      return isok;
    }
  }
};
</script>

<style scoped lang="stylus">
@import ('./login.styl');
</style>