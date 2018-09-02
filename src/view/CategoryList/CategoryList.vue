<template>
    <div>
        <!-- 头部title区域 -->
        <div class="nav-bar">
          <van-nav-bar title="类别列表"/>
        </div>
        <!-- 商品区域 -->
        <div>
            <van-row>
                <van-col span="6">
                  <!-- 大类区域 -->
                    <div id="menu">
                        <ul>
                            <li v-for="(item,index) in category" :key="item._id" @click="activeCategory(index,item.ID)" :class="{categoryActive:categoryIndex===index}">{{item.MALL_CATEGORY_NAME}}</li>
                        </ul>
                    </div>
                </van-col>
                <!-- 小类区域 -->
                <van-col span="18">
                    <div class="smallMenu">
                      <van-tabs v-model="active" @click="onClickSmallType">
                        <van-tab v-for="(item,index) in smallType" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                      </van-tabs>
                    </div>

                    <div id="category-list">
                      <van-pull-refresh v-model="isRefresh" @refresh="downRefresh">
                        <van-list v-model="loading" :finished="finished" @load="upLoad">
                          <div class="list-item" v-for="(item,index) in goodsList" :key="index">
                            <div class="list-item-img">
                              <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                            </div>
                            <div class="list-item-text">
                              <div>{{item.NAME}}</div>
                              <div>{{item.ORI_PRICE}}</div>
                            </div>
                          </div>
                        </van-list>
                      </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      category: [], // 大类类别
      categoryIndex: 0, // 点击大类的当前索引
      smallType: [], // 小类类别
      active: 0, // 小类点击当前索引
      loading: false, // 上拉加载时，为false可以上拉加载,true不行
      finished: false, // 上拉加载时,是否有数据
      // list: [], // 商品数据
      isRefresh: false, // 下拉刷新

      pageNo: 1,
      pageNum: 10,
      goodsList: [], // 商品信息
      smallTypeId: '', // 小类id
      errorImg:'this.src="' + require('@/assets/image/errorimg.png') + '"'
    };
  },
  created() {
    this.init();
  },
  mounted() {
    let windowHeight = document.documentElement.clientHeight; // 获取窗口高度
    console.log(windowHeight);
    document.getElementById("menu").style.height = windowHeight - 46 + "px"; // 将高度撑开,左边菜单的高度
    document.getElementById("category-list").style.height = windowHeight - 90 + "px"; // 右边内容区的高度
  },
  methods: {
    init() {
      axios({
        url: url.categoryList,
        method: "get"
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data.message) {
            this.category = res.data.message;
            this.getSmallTypeByCategoryID(this.category[0].ID); // 解决一开始出来第一个大类没有展示小类的bug
          }else{
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    activeCategory(index, id) {
      // 点击切换大类颜色
      this.categoryIndex = index; // 让索引相等

      this.pageNo = 1
      this.pageNum = 10
      this.finished = false
      this.goodsList = []

      this.getSmallTypeByCategoryID(id); // 触发获取小类的联动
    },
    getSmallTypeByCategoryID(categoryId) {
      // 根据大类ID读取小类类别列表
      axios({
        url: url.smallTypeList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message) {
            this.smallType = res.data.message;
            this.active = 0; // 切换页面还原成0  不还原的话，每次选中再切换大类点击的时候不是第一个被选中
            this.smallTypeId = this.smallType[0].ID
            this.upLoad()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    upLoad() { // 上拉加载
      setTimeout(() => {
        this.smallTypeId = this.smallTypeId ? this.smallTypeId : this.smallType[0].ID // 获取小类ID
        this.getGoodsListBySmallTypeId()
      }, 1000);
    },
    downRefresh(){ // 下拉刷新
      setTimeout(()=>{
        // 初始化
        this.isRefresh = false
        this.goodsList = [] 
        this.pageNo = 1
        this.pageNum
        this.finished = false
        //调用加载
        this.upLoad()
      },500)
    },
    getGoodsListBySmallTypeId(){ // 获取列表信息
      axios({
        url: url.getGoodsListBySmallTypeId,
        method: 'post',
        data:{
          smallTypeId: this.smallTypeId,
          pageNo: this.pageNo,
          pageNum: this.pageNum
        }
      }).then(res=>{
        if(res.data.code===200 && res.data.message.length ){
          this.pageNo ++;
          this.goodsList = this.goodsList.concat(res.data.message) // 合并列表数组
        }else{
          console.log("数据获取失败")
          this.finished = true // 数据请求完了
        }
        this.loading = false
      }).catch(err=>{
        alert(err)
      })
    },
    onClickSmallType(index,title){ // 点击触发渲染列表
      this.smallTypeId = this.smallType[index].ID
      console.log(this.smallTypeId)
      // 初始化
      this.goodsList = []
      this.finished = false
      this.pageNo = 1
      this.pageNum = 10
      this.upLoad()
    }
  }
};
</script>

<style scoped lang="stylus">
@import './categorylist.styl';
</style>