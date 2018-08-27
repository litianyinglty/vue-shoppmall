const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();
router.get('/', async (ctx) => {
    ctx.body = '这是用户操作首页'
})
router.post('/register', async (ctx) => {
    // console.log(ctx.request.body)
    // ctx.body = ctx.request.body
    const User = mongoose.model('User') // 把user表引过来
    let newUser = new User(ctx.request.body) // 把前端输入的值插入到数据库

    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((error)=>{
        ctx.body = {
            code: 500,
            message: error
        }
    })
})
module.exports = router;
