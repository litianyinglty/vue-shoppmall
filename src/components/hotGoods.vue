<template>
    <div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goodsImg" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice}}</div>
    </div>
</template>

<script>
    export default {
        props:['goodsImg','goodsName','goodsPrice'],
        data() {
            return {
                key: ""
            }
        },
    }
</script>

<style scoped lang="stylus">
    .goods-name
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap; 
    
</style>