<template>
    <div>
        <!-- 顶部导航 -->
        <div class="nav-bar">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="cart-title-bar">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <!-- 商品展示 -->
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-img"><img :src="item.image" width="100%" /></div>
                <div class="cart-text">
                    <div class="cart-goods-name">{{item.name}}</div>
                        <div class="cart-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="cart-goods-price">
                    <div>￥{{item.price | moneyFillter}}</div>
                    <div>x{{item.count}}</div>
                    <div class="allPrice">￥{{item.price*item.count | moneyFillter}}</div>
                </div>
            </div>
        </div>
        <!-- 总价格 -->
        <div class="totalMoney">
            商品总价: ￥{{totalMoney | moneyFillter}}
        </div>
    </div>
</template>

<script>
import { newMoney } from '@/utils/moneyFillter.js'
export default {
    name: "Cart",
  data() {
    return {
      cartInfo: [], // 购物车数据
      isempty: false // 购物车是否为空
    };
  },
  created() {
    this.getCartInfo();
  },
  computed: {
      totalMoney(){
          let allMoney = 0; // 总价
          this.cartInfo.map((item,index)=>{
              allMoney += item.price*item.count
          })
          localStorage.cartInfo = JSON.stringify(this.cartInfo) // 保存到localstorage
          return allMoney
      }
  },
  filters:{
    moneyFillter(money){
        return newMoney(money)
    }
  },
  methods: {
    getCartInfo() {
      // 购物车信息
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isempty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart(){ // 清空购物车
        localStorage.removeItem('cartInfo')
        this.cartInfo = []
    }
  }
};
</script>

<style scoped lang="stylus">
@import "./cart.styl"
</style>