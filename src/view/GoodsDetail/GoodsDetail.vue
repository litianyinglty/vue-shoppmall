<template>
    <div>
        <!-- 导航部分 -->
        <div class="nav-bar">
          <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="goback"
        />
        </div>
        <!-- 图层 -->
        <div class="goods-picture-var">
          <img :src="goodsInfo.IMAGE1" width="100%"/>
        </div>
        <!-- 商品内容区 -->
        <div class="goods-info-bar">
          <div class="goods-names">{{goodsInfo.NAME}}</div>
          <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFillter}}</div>
        </div>
        <!-- 评论区 -->
        <div class="goods-issue-bar">
          <van-tabs swipeable sticky>
            <van-tab title="商品详情">
              <div class="detail" v-html="goodsInfo.DETAIL"></div>
            </van-tab>
            <van-tab title="评价">
              正在制作中
            </van-tab>
          </van-tabs>
        </div>
        <!-- 底部购物车区域 -->
        <div class="shopping-cart-bar">
          <div>
            <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
          </div>
          <div>
            <van-button size="large" type="danger">直接购买</van-button>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { newMoney } from "@/utils/moneyFillter.js";
export default {
  name: "GoodsDetail",
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId; // 获取传入的goodsId
    console.log(this.goodsId);
    this.getData(); // 获取数据
  },
  filters: {
    moneyFillter(num) {
      return newMoney(num);
    }
  },
  methods: {
    getData() {
      //获取数据
      axios({
        url: url.gooodsDetail,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast.fail("服务器错误，数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    addGoodsToCart(){ // 添加商品到购物车
      //localStorage.removeItem('cartInfo') // 清空本地数据
      
      // 取出本地购物车中的数据   
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      let isHaveGoods = cartInfo.find(cart=>cart.goodsId === this.goodsId) // 查找cartInfo里的goodsId
      console.log("111"+isHaveGoods)
      if(!isHaveGoods){ // 如果没有，就新添加
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo) //添加到cartInfo  
        localStorage.cartInfo = JSON.stringify(cartInfo) // 保存到localstorage
        Toast.success('添加成功')
      }else{
        Toast.success('已有此商品')
      }
      this.$router.push({name:'Cart'})
    }
  }
};
</script>

<style scoped lang="stylus">
@import './goodsdetail.styl'
</style>