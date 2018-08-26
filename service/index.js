const Koa = require("koa");
const app = new Koa();
//引入connect
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('koa-router');
let router = new Router();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');


app.use(bodyParser())
app.use(cors())

// 装载所有子路由  
let user = require('./appApi/user.js');
router.use('/user',user.routes());
// 加载路由中间件  
app.use(router.routes());
app.use(router.allowedMethods())


//立即执行函数
// ;(async () =>{
//     await connect()
//     initSchemas() // 载入模型
//     const User = mongoose.model('User') // 数据表User
//     let addUser = new User({userName:'wudi2',password:'123456'}) // 向user表中插入一条数据
//     addUser.save().then(()=>{
//         console.log('插入成功')
//     })

//     let user = await User.findOne({}).exec() // 查看数据
//     console.log('------------')
//     console.log(user)
// })()

app.use(async(ctx)=>{
    ctx.body = "<h1>hello koa2</h1>"
})
app.listen('3000',()=>{
    console.log("server is start")
})
