<template>
    <div>
        <van-nav-bar
            title="注册"
            left-text="返回"
            left-arrow
            @click-left="goback"
        />
        <div class="register_Box">
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
          <div class="register_button">
            <van-button type="primary" size="large" @click="registerAllMethods" :loading="openLoading">马上注册</van-button>
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
    registerAllMethods(){
      this.checkForm() && this.getRegisterData()   // 如果this.checkForm()成功了，执行this.getRegisterData()
      // if(this.checkForm()){
      //   this.getRegisterData()
      // }
    },
    getRegisterData() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      }).then(response => {
          console.log(response);
          if (response.data.code == 200) {
            Toast.success(response.data.message);
            this.$router.push("/");
          } else {
            console.log(response.data.message);
            this.openLoading = false;
            Toast.fail("注册失败");
          }
        }).catch(error => {
          console.log(error);
          Toast.fail("注册失败");
          this.openLoading = false;
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
@import ('./register.styl');
</style>