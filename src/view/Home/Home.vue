<template>
    <div>
      <!-- 搜索模块 -->
      <div class="search_bar">
        <van-row>
          <van-col span="3">
            <img :src="locationImg" width="80%" class="location_img"/>
          </van-col>
          <van-col span="16">
            <input type="text" class="search_input" />
          </van-col>
          <van-col span="5">
            <van-button size="mini">查找</van-button>
          </van-col>
        </van-row>
      </div>
      <!-- 轮播图部分 -->
      <div class="swiper_bar">
        <van-swipe :autoplay="3000" class="swiper_Box">
          <van-swipe-item v-for="(item,index) in bannerImg" :key="index">
            <img v-lazy="item.image" width="100%"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品类型区域 -->
      <div class="type_bar">
        <!-- <div v-for="(item,index) in shopType" :key="index">
          <img v-lazy="item.image" width="90%"/>
          <span>{{item.mallCategoryName}}</span>
        </div> -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in shopType" :key="index">
            <div class="goodsList_item">
              <img v-lazy="item.image" width="100%" />
              <span>{{item.mallCategoryName}}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 广告条 -->
      <div>
        <img v-lazy="advertesPicture" width="100%"/>
      </div>
      <!-- 商品内容区域 -->
      <div class="goodsList_bar">
        <div class="goodsList_title">
          商品推荐
        </div>
        <div class="goodsList_content">
          <swiper :options="swiperOption1">
            <swiper-slide v-for="(item,index) in goodsList" :key="index">
              <div class="goodsList_item">
                <img :src="item.image" width="80%" />
                <div>{{item.goodsName}}</div>
                <div>{{item.price}}(￥{{item.mallPrice}})</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 楼层区域 -->
      <div class="floor">
        <!-- 第一层，不规则 -->
        <div class="floor_title">
          特色商品
        </div>
        <div class="floor_anomaly">
          <div class="floor_one">
            <img :src="floor1_0.image" width="100%" />
          </div>
          <div>
            <div class="floor_two">
              <img :src="floor1_1.image" width="100%" />
            </div>
            <div>
              <img :src="floor1_2.image" width="100%" />
            </div>
          </div>
        </div>
        <!-- 第二层，规则 -->
        <div class="floor_rule">
          <div v-for="(item,index) in floor1.slice(3)" :key="index">
            <img :src="item.image"  class="floor_ruleImg" />
          </div>
        </div>
        <div class="floor_rule2">
          <div v-for="(item,index) in floor2" :key="index">
            <img :src="item.image" class="floor_ruleImg" />
          </div>
        </div>
        <div class="floor_rule2">
          <div v-for="(item,index) in floor3" :key="index">
            <img :src="item.image" class="floor_ruleImg" />
          </div>
        </div>
      </div>
      <!-- 热卖区域 -->
      <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <!--这里需要一个list组件-->
            <van-list>
              <van-row gutter="16">
                <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                  <!-- <goods-info :goodsImg="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info> -->
                  <div class="goods-info">
                    <div class="goods-image">
                        <img v-lazy="item.image" width="90%" />
                    </div>
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">￥{{item.price | moneyFillter}}(￥{{item.mallPrice | moneyFillter}})</div>
                </div>
                </van-col>
              </van-row>
            </van-list>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import mockdata from "../../mock/mock.js";
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper' // 滑动组件
import { newMoney } from '@/utils/moneyFillter.js'   // 金额过滤器
import url from "@/serviceAPI.config.js"
export default {
  name: "Home",
  data() {
    return {
      swiperOption:{
        slidesPerView:5
      },
      swiperOption1:{
        slidesPerView:3
      },
      locationImg: require("../../assets/image/location.png"),
      // 图片已经放到了本地的assets/image里，防止图片丢失
      bannerImg:[],
      shopType:[],
      advertesPicture: "",
      goodsList:[],
      floor1:[],
      floor1_0:{},
      floor1_1:{},
      floor1_2:{},
      floor2: [],
      floor3: [],
      hotGoods: []
    };
  },
  filters:{ // 过滤器
    moneyFillter(code){
      return newMoney(code)
    }
  },
  components:{
    swiper,
    swiperSlide,
    // goodsInfo
  },
  created(){
    axios({
      url: url.getHomeGoodsInfo,
      method: "post",
    }).then(response=>{
      console.log(response)
       this.shopType = response.data.data.category; // 商品分类数据
       this.advertesPicture = response.data.data.advertesPicture.PICTURE_ADDRESS; // 广告区域数据
       this.bannerImg = response.data.data.slides;  //轮播图数据
       this.goodsList = response.data.data.recommend // 商品推荐数据
       this.floor1 = response.data.data.floor1 // 楼层页面
       this.floor2 = response.data.data.floor2 // 楼层页面
       this.floor3 = response.data.data.floor3 // 楼层页面
       this.floor1_0 = this.floor1[0]
       this.floor1_1 = this.floor1[1]
       this.floor1_2 = this.floor1[2]
       this.hotGoods = response.data.data.hotGoods
    }).catch(error=>{
      console.log(error)
    })
  }
};
</script>

<style scoped lang="stylus">
  @import "./home.styl"
</style>