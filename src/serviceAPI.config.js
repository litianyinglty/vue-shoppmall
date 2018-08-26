const baseUrl = "https://www.easy-mock.com/mock/5b78e733de869808707333c2/"
const localUrl = 'http://localhost:3000/'
const url = {
    getHomeGoodsInfo : baseUrl + "gooods", // 商城首页信息
    registerUser: localUrl + "user/register"
}

module.exports = url;