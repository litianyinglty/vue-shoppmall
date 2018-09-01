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
                <van-col span="18">
                    <div class="smallMenu">
                      <van-tabs v-model="active" swipeable>
                        <van-tab v-for="(item,index) in smallType" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                      </van-tabs>
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
    };
  },
  created() {
    this.init();
  },
  mounted() {
    let windowHeight = document.documentElement.clientHeight; // 获取窗口高度
    console.log(windowHeight);
    document.getElementById("menu").style.height = windowHeight - 46 + "px"; // 将高度撑开
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
            this.getSmallTypeByCategoryID(this.category[0].ID) // 解决一开始出来第一个大类没有展示小类的bug
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    activeCategory(index,id) {
      // 点击切换大类颜色
      this.categoryIndex = index; // 让索引相等
      this.getSmallTypeByCategoryID(id) // 触发获取小类的联动
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
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
@import './categorylist.styl';
</style>