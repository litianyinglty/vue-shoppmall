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
let goods = require('./appApi/goods.js');
router.use('/user',user.routes());
router.use('/goods',goods.routes());
// 加载路由中间件  
app.use(router.routes());
app.use(router.allowedMethods())

;(async ()=>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body = "<h1>hello koa2</h1>"
})
app.listen('3000',()=>{
    console.log("server is start")
})
