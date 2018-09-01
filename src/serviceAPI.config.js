const baseUrl = "https://www.easy-mock.com/mock/5b78e733de869808707333c2/"
const localUrl = 'http://localhost:3000/'
const url = {
    getHomeGoodsInfo : baseUrl + "gooods", // 商城首页信息
    registerUser: localUrl + "user/register", // 注册
    login: localUrl + "user/login", // 登录
    gooodsDetail: localUrl + "goods/getDetailGoodsInfo", // 商品详情
    categoryList: localUrl + "goods/getCategoryList", // 商品大类
    smallTypeList: localUrl + "goods/getSmallTypeList", // 商品小类
}

module.exports = url;