const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./realGoods.json', 'utf8', (err, data) => { // 读取realGoods.json 因为要放到index.js里，所以路径为相对index.js的路径
        data = JSON.parse(data) //将读取到的数据转换为对象
        let saveCount = 0 //用来计算插入到数据库有多少条
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            console.log(value)
            let newGoods = new Goods(value) // 插入到Goods表中
            newGoods.save().then(() => { //保存
                saveCount++;
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log(error)
            })
        })
    })
    ctx.body = "开始导入数据"
})

router.get('/category', async (ctx) => { // 商品大类
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        let newData = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        newData.RECORDS.map((value, index) => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++;
                console.log('成功' + saveCount)
            }).catch(err => {
                console.log('失败' + err)
            })
        })
    })
    ctx.body = '开始导入数据'
})

router.get('/type', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        const newData = JSON.parse(data);
        const SmallType = mongoose.model('SmallType');
        let saveCount = 0;
        newData.RECORDS.map((value, index) => {
            let newGoodsType = new SmallType(value)
            console.log(value)
            newGoodsType.save().then(() => {
                saveCount++;
                console.log('成功' + saveCount)
            }).catch(err => {
                console.log('失败' + err)
            })
        })
    })
    ctx.body = '开始导入数据'
})

router.post('/getDetailGoodsInfo', async (ctx) => {
    let goodsId = ctx.request.body.goodsId
    console.log(goodsId)
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ ID: goodsId }).exec().then(async (result) => { // 查找数据库里的数据
        console.log("成功" + result)
        ctx.body = { code: 200, message: result }
    }).catch(err => {
        console.log("失败" + err)
        ctx.body = { code: 500, message: err }
    })
})

module.exports = router
