<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img src="http://7xjyw1.com1.z0.glb.clouddn.com/touxiang001.jpg" class="top-img" />
        </div>
        <div class="login">
            <div><van-button type="warning">我要登录</van-button></div>
            <div><van-button type="primary">我要注册</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'Member'
        
    }
</script>

<style scoped lang='stylus'>
    @import './member.styl';
</style>