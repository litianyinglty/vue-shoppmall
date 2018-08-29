const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./realGoods.json','utf8',(err,data)=>{ // 读取realGoods.json 因为要放到index.js里，所以路径为相对index.js的路径
        data = JSON.parse(data) //将读取到的数据转换为对象
        let saveCount = 0 //用来计算插入到数据库有多少条
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value) // 插入到Goods表中
            newGoods.save().then(()=>{ //保存
                saveCount++;
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log(error)
            })
        })
    })
    ctx.body = "开始导入数据"
})
module.exports = router
