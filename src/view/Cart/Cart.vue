<template>
    <div class="nav-bar">
        <van-nav-bar title="购物车"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: [], // 购物车数据
      isempty: false // 购物车是否为空
    };
  },
  created(){
      this.getCartInfo()
  },
  methods: {
    getCartInfo() { // 购物车信息
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo:"+JSON.stringify(this.cartInfo))
      this.isempty = this.cartInfo.length > 0 ? true : false;
    }
  }
};
</script>

<style scoped>
</style>