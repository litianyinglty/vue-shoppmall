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
            <van-button size="large" type="primary">加入购物车</van-button>
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
    }
  }
};
</script>

<style scoped lang="stylus">
@import './goodsdetail.styl'
</style>