<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <van-tabbar v-model="active" @change="changeTab(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: 0,
      nowPath: '',
    }
  },
  created(){
    this.changeTabBarActive()
  },
  updated(){
    this.changeTabBarActive()
  },
  methods:{
    changeTabBarActive(){
      this.nowPath = this.$route.path
      if(this.nowPath=='/cart'){
        this.active = 2
      }
    },
    changeTab(active){
      console.log(active)
      switch(active){
        case 0:
          this.$router.push({name:'Home'})
          break
        case 1:
          this.$router.push({name:'CategoryList'})
          break
        case 2:
          this.$router.push({name:'Cart'})
          break
        // case 3:
        //   this.router.push({name:'Home'})
        //   break  
      }
    }
  }
}
</script>

<style>
  #app{
    background: #eee;
  }
</style>
