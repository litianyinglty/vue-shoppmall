const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();
router.get('/', async (ctx) => {
    ctx.body = '这是用户操作首页'
})
router.post('/register', async (ctx) => {
    const User = mongoose.model('User') // 把user表引过来
    console.log(ctx.request.body)
    let newUser = new User(ctx.request.body) // 把前端输入的值插入到数据库

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((error) => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body // 获取前端传入的值
    console.log(loginUser)
    let username = loginUser.userName
    let password = loginUser.password

    // 引入User的model
    const User = mongoose.model('User')

    await User.findOne({ userName: username }).exec().then(async (result) => { // 查找一条数据
        console.log(result)
        if(result){
            let newUser = new User() // 实例化,方便调用schema里的user.js里的comparePassword方法
            await newUser.comparePassword(password,result.code) // 第一个参数为前端传入，第二个为数据库返回的值
            .then(isMatch=>{ // 对比成功后返回的值
                ctx.body = {
                    code:200,
                    message: isMatch
                }
            }).catch(error=>{
                console.log(error)
                ctx.body={code:500,message:error}
            })
        }else{
            ctx.body = {
                code: 500,
                message: '用户名不存在'
            }
        }
    })
})
module.exports = router;

