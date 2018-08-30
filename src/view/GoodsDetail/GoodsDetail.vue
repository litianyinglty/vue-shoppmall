<template>
    <div>
        商品详情页面
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  name: "GoodsDetail",
  data() {
    return {
      goodsId: ""
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    console.log(this.goodsId)
    this.getData();
  },
  methods: {
    getData() {
      axios({
        url: url.gooodsDetail,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>