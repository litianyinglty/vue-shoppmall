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
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, // 是否开启用户注册的loading状态
      userNameErrorMessage: "",
      passwordErrorMessage: ""
    };
  },
  created(){
    if(localStorage.userMessage){
      Toast.success('你已经登录过了')
      this.$router.push('/')
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    loginAllMethods() {
      this.checkForm() && this.getloginData(); // 如果this.checkForm()成功了，执行this.getRegisterData()
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
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userMessage = { userName: this.username };
              setTimeout(()=>{resolve()},500)
            }).then(()=>{
              Toast.success("登录成功");
              this.$router.push("/");
            }).catch(err=>{
              Toast.fail('登录状态保存失败')
              console.log(error)
            }) 
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    // 表单验证
    checkForm() {
      let isok = true;
      if (this.username.length < 5) {
        this.userNameErrorMessage = "用户名不能小于5位";
        isok = false;
      } else {
        this.userNameErrorMessage = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMessage = "密码不能小于6位";
        isok = false;
      } else {
        this.passwordErrorMessage = "";
      }
      return isok;
    }
  }
};
</script>

<style scoped lang="stylus">
@import ('./login.styl');
</style>