<template>
    <div>
        <van-nav-bar
            title="标题"
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
          />
 
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <div class="register_button">
            <van-button type="primary" size="large" @click="getRegisterData">马上注册</van-button>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import url from '@/serviceAPI.config.js'
export default {
  name: "Register",
  data() {
    return {
      msg: "hello",
      username: "",
      password: ""
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getRegisterData(){
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        },
      }).then(response=>{
        console.log(response)
      }).catch((err)=>{
        console.log(err)
      })  
    }
  }
};
</script>

<style scoped lang="stylus">
@import ('./register.styl');
</style>