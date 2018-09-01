# 运行与打包     
  npm install   
  npm run dev    
  npm run build

# 所需vscode插件      
    1.vue vscode snippets


# 学习步骤
## 0.安装 stylus stylus-loader    
    <1>. npm install --save stylus stylus--loader
    <2>.在style标签中引入 <style scoped lang="stylus">     
    <3>.引入css文件    
        1).比如引入home.styl    @import "./home.styl"      
        
## 1.安装vant ui      
    npm install --save vant  
                
## 2.安装   babel-plugin-import         
    npm i babel-plugin-import -D   
    
## 3.实现按需加载vant     
    <1>.在.babellrc文件中添加                   
        ["import", {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
        }]        

    <2>. 在主入口 main.js中，引入vant对应的组件   
    import { Button } from 'vant'      
    Vue.use(Button) 

##  4.采用rem布局     
    <1>.在static文件夹下，创建rem.js,写入以下代码：     
    let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName("html")[0];
    htmlDom.style.fontSize = htmlwidth/20 + 'px'     

    <2>.在根文件 index.html中引入rem.js       

## 5. 使用iconfont图标    
网址：http://www.iconfont.cn/    

## 6.引入图片    
使用require("../../assets/image/location.png")      

## 7.vant ui使用图片懒加载   
1).在main.js中引入lazyload
    import { Lazyload } from 'vant'     
    Vue.use(Lazyload);     
2).在页面:src的地方换成v-lazy     
    <img v-lazy="item.url" width="100%"/>     

## 8.数据模拟       
    1).安装mock.js      
        npm install --save-dev mockjs  
    2).创建mock文件夹，新建mock.js    
        import Mock from 'mockjs'          
        import data from './goods'         
        const goodsData = Mock.mock('/api/shop/index', 'post', data);  
        export default {
            goodsData
        }
    3).在调接口的地方，引入mock数据      
        import mockdata from "../../mock/mock.js";     
        axios({
            url: "/api/shop/index",
            method: "post",
        }).           
## 9.安装vue-awesome-swiper (轮播支持水平和竖直滑动的插件)  
    <1>. npm install --save vue-awesome-swiper      
    <2>.在home.vue中,引入 vue-awesome-swiper        
        1).    
        import 'swiper/dist/css/swiper.css';    
        import { swiper, swiperSlide } from 'vue-awesome-swiper'
        再注册swiper, swiperSlide这两个组件    
        components:[swiper, swiperSlide]
## 10.使用fillter过滤器   
    <1>.在 src目录下创建utils文件夹,moneyFillter.js      
    <2>.在页面js部分，定义fillter属性       
        filters:{ // 过滤器
            moneyFillter(code){
            return newMoney(code)
            }
        },        
    <3>.在要用的地方引入    
        <div class="goods-price">￥{{item.price | moneyFillter}}(￥{{item.mallPrice | moneyFillter}})</div>    
    
## 后端部分

## 1.创建配置文件管理接口url
    在serviceAPI.config.js里，配置所有的url

## 2.新建后端项目
    <1>.创建service文件夹      
    <2>.初始化npm      npm init -y
   
## 3.安装koa2
    npm install --save koa

## 4.安装mongoDB数据库
    <1>.下载地址: https://www.mongodb.com 
    <2>.在 C:\Program Files\MongoDB\Server\4.0\bin下cmd           
           输入：mongod --dbpath=C:\Program Files\MongoDB\Server\4.0\data --logpath=C:\Program Files\MongoDB\Server\4.0\log --logappend     
    <3>.配置mongoDB     
        1).找到环境变量，在用户变量里的path点击编辑，加上逗号之后，添加C:\Program Files\MongoDB\Server\4.0\bin      
        2).在F盘里创建data文件夹，进去后创建db文件夹     
        3).输入mongod就启动成功了       
    <4>.安装robo3    (mongodb的图形界面)       
        1). https://robomongo.org/download    
        2).一路安装

## 5.安装mongoose
    在service文件夹下  npm install --save mongoose    

## 6.具体使用
    <1>.初始化   在init.js中写入      

    const mongoose = require('mongoose')
    const db = "mongodb://localhost/vueshop"

    exports.connect = () => {
        mongoose.connect(db, { useNewUrlParser: true })
        let maxConnectTimes = 0

        //增加数据库连接的事件监听
        return new Promise((resolve, reject) => {
            mongoose.connection.on('disconnected', () => {
                console.log('***********数据库断开***********')
                if (maxConnectTimes < 3) {
                    maxConnectTimes++
                    mongoose.connect(db)
                } else {
                    reject()
                    throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
                }
            })
            mongoose.connection.on('disconnected', (err) => {
                console.log('***********数据库错误***********')
                if (maxConnectTimes < 3) {
                    maxConnectTimes++
                    mongoose.connect(db)
                } else {
                    reject()
                    throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
                }
            })
            mongoose.connection.once('open', () => { // 连接成功
                resolve()
                console.log('MongoDB Connected successfully!')
            })
        })
    }

    <2>.在需要的页面（index.js）中     
    //引入connect
    const {connect} = require('./database/init.js')
    
    //立即执行函数
    ;(async () =>{
        await connect()
    })()

## 7.schema建模    
    <1>.在database下创建schema文件夹,创建user模型     
        const mongoose = require('mongoose')
        const Schema = mongoose.Schema  // 定义模型
        let ObjectId = Schema.Types.ObjectId  // 定义模型的类型

        // 创建UserChema模型
        const userSchema = new Schema({
            UserId: ObjectId, // Id类型
            userName: {unique:true,type:String}, // 唯一值，string类型
            password: String,
            createDate: {type:Date,default:Date.now()}, // 注册日期  date类型，默认值
            lastDate: {type:Date,default:Date.now()},  // 最后登录的时间
        })

        // 发布模型
        mongoose.model('User',userSchema) //要和表名一致     
    
    <2>.载入userSchema模型    
        1).在init.js中，引入global模块,用来获取匹配对应规则文件  resolve: 将相对路径转换为绝对路径  
            const glob = require('glob')      
            在service下， npm install --save glob
        2).引入resolve     
            const { resolve } = require('path')      
        3).将所有的schema模型都引入进来       
            exports.initSchemas = () => { // 引入所有的模型
                glob.async(resolve(__dirname,'./schema','**/*.js')).forEach(require) 
                // 同步引入，匹配所有的模型，并把相对路径转换为绝对路径
            }     
    <3>.在根目录index.js下操作数据库    
        //引入connect
        const { connect, initSchemas } = require('./database/init.js')
        const mongoose = require('mongoose')

        ;(async () =>{
            await connect()
            initSchemas() // 载入模型
            const User = mongoose.model('User') // 数据表User
            let addUser = new User({userName:'dujiang',password:'123456'}) // 向user表中插入一条数据
            addUser.save().then(()=>{
                console.log('插入成功')
            })

        })()

## 8.使用bcryot加密处理  （跨平台加密工具）
    1).安装  npm install --save bcrypt     

    2).在user.js中引入 bcrypt    
        const bcrypt = require('bcrypt')
        const SALT_WORK_FACTOR = 10 //加盐位数       
        
    3).加盐加密处理      
        userSchema.pre('save', function(next){ // 每次保存都加盐加密处理
            bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{ // 加盐 10位
                if(err){
                    return next(err)
                }else{
                    bcrypt.hash(this.password,salt,(err,hash)=>{ // 给密码加密
                        if(err){
                            return next(err)
                        }else{
                            this.password = hash 
                            next() 
                        }
                    })
                } 
            }) 
        })

## 9.使用koa-router模块化配置接口
    <1>.安装 koa-router    
        npm install --save koa-router   
    
    <2>.新建appApi文件夹统一放各个接口文件     
        在user.js里写入   
        const Router = require('koa-router');
        let router = new Router();
        router.get('/', async (ctx) => {
            ctx.body = '这是用户操作首页'
        })
        router.get('/register', async (ctx) => {
            ctx.body = '用户注册接口'
        })
        module.exports = router;     
    
    <3>.在index.js中写入   
        const Router = require('koa-router');
        let user = require('./appApi/user.js');
        
        let router = new Router(); // 装载所有子路由  
        router.use('/user',user.routes());

        app.use(router.routes());// 加载路由中间件  
        app.use(router.allowedMethods())

    <4>.安装koa-bodyparser 做中间件做post请求         
        npm install --save koa-bodyparser 
        使用方法：  
            const bodyParser = require('koa-bodyparser');    
            app.use(bodyParser())       

    <5>.安装koa2-cors 解决跨域      
        npm install --save koa2-cors     
        使用方法：  
            const cors = require('koa2-cors');         
            app.use(cors())    
    
    <6>.在appApi下面的user.js写入    
        router.post('/register', async (ctx) => {
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

    <7>.在index.js中写入：    
        ;(async ()=>{
            await connect()
            initSchemas()
        })()      
    
    <8>.注册的防重复提交  设置异步loading状态   

    <9>.注册的表单验证       

    <10>.登录的后端逻辑，对比密码和用户名    
        1).在schema的User.js里写入：
            userSchema.methods = { // 实例方法
                comparePassword: (_password,password)=>{ // 对比密码，第一个参数是前端传入的，第二个是数据库里的
                    return new Promise((resolve,reject)=>{
                        bcrypt.compare(_password,password,(err,isMatch)=>{// bcrypt对比密码 isMatch是比对结果
                            if(err){
                                reject(err)
                            }else{
                                console.log("pro111:"+isMatch)
                                resolve(isMatch)
                            }
                        })
                    })
                }
            }

        2).在appAPI的user.js里写入:    
            router.post('/login', async (ctx) => {
                let loginUser = ctx.request.body // 获取前端传入的值
                // console.log(loginUser)
                let userName = loginUser.userName
                let password = loginUser.password

                // 引入User的model
                const User = mongoose.model('User')

                await User.findOne({ userName: userName }).exec().then(async (result) => { // 查找一条数据
                    console.log("000:"+result)
                    if (result) { // 用户名存在
                        let newUser = new User()
                        await newUser.comparePassword(password, result.password) // 第一个参数为前端传入的，第二个为数据库的
                            .then(isMatch => {
                                console.log("111:"+isMatch)
                                ctx.body = { code: 200, message: isMatch }
                            }).catch(error => {
                                console.log("121:"+error)
                                ctx.body = { code: 500, message: error }
                            })
                    } else {
                        ctx.body = { code: 500, message: '用户名不存在' }
                    }
                }).catch(error => {
                    console.log("2222:"+error)
                    ctx.body = { code: 500, message: error }
                })
            })
    
    <11>.商品数据的提纯  
        1).原始文件在data_json下的goods.json，新建fsJSON.js，并写入：
        const fs = require('fs');
        fs.readFile('./data_json/goods.json','utf8',function(err,data){ // 读取goods.json文件，转换为utf-8格式
            let newData = JSON.parse(data) // 将读取的数据转换为对象
            let pushData = [] // 提纯放入的数据
            let i = 0; //记录提纯的条数
            newData.RECORDS.map(function(value,index){ // 遍历goods.json
                if(value.IMAGE1 !=null){
                    i++;
                    console.log(value.NAME)
                    pushData.push(value)
                }
            })
            console.log(i)
            fs.writeFile('./realGoods.json',JSON.stringify(pushData),function(err){ // 写入文件到realGoods.json
                if(err){
                    console.log('写文件操作失败')
                }else{
                    console.log('写文件操作成功')
                }
            })
        })

    <12>.将提纯的realGoods.json数据插入到mongdb数据库  
        1).在schema文件夹下创建Goods.js并写入：
            const mongoose = require('mongoose');
            const Schema = mongoose.Schema;

            const goodsSchema = new Schema({
                ID:{unique:true,type:String},
                GOODS_SERIAL_NUMBER:String,
                SHOP_ID:String,
                SUB_ID:String,
                GOOD_TYPE:Number,
                STATE:Number,
                NAME:String,
                ORI_PRICE:Number,
                PRESENT_PRICE:Number,
                AMOUNT:Number,
                DETAIL:String,
                BRIEF:String,
                SALES_COUNT:Number,
                IMAGE1:String,
                IMAGE2:String,
                IMAGE3:String,
                IMAGE4:String,
                IMAGE5:String,
                ORIGIN_PLACE:String,
                GOOD_SCENT:String,
                CREATE_TIME:String,
                UPDATE_TIME:String,
                IS_RECOMMEND:Number,
                PICTURE_COMPERSS_PATH:String
            },{
                collection: 'Goods'
            })
            mongoose.model('Goods',goodsSchema)
        
        2).在appAPI文件夹下，创建goods.js，并写入： 
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

        3).在index.js中写入: 
            let goods = require('./appApi/goods.js');   
            router.use('/goods',goods.routes());    
    
    <13>.读取插入商品大类(category)和商品小类(smalltype)     

    <14>.编写商品详情接口    
        1).在appAPI的goods.js里写入：     
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

        2).在serviceAPI.config.js里配置路径     
            gooodsDetail: localUrl + "goods/getDetailGoodsInfo"    

        3).在Home.vue里写入goGoodsDetail()方法，并向GoodsDetail.vue里传递goodsId参数 (使用query)
            this.$router.push({name:'GoodsDetail',query:{goodsId:code}})    

        4).在GoodsDetail.vue里接收传过来的参数： (使用this.$route.query)   
            this.goodsId = this.$route.query.goodsId
    
## 10.商品详情页面     
    <1>.使用fillter过滤价格   
        页面上：    
            <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFillter}}</div>    
        js：    
            import { newMoney } from "@/utils/moneyFillter.js";

            filters: {
                moneyFillter(num) {
                return newMoney(num);
                }
            },  

    <2>.解决图片中间有缝隙的bug    
            在图片加入样式  font-size:0     

    <3>.加入滑动切换和吸顶效果    
        1)滑动   在van-tabs里加入属性 swipeable
        2)吸顶   在van-tabs里加入属性 sticky   

## 11.商品大类接口编写   
    在appAPI下的goods.js下  写入
        router.get('/getCategoryList',async(ctx)=>{
            try{
                const Category = mongoose.model('Category'); // 引入商品大类模型
                let result = await Category.find().exec(); //查找数据库
                ctx.body = { code: 200, message: result }
            }catch(err){
                ctx.body = { code: 500, message: err }
            }
        })    
    
## 12.商品大类页面注意事项：  
    <1>.高度撑开页面，操作dom   
        在mounted中写入   
                mounted() {
                let windowHeight = document.documentElement.clientHeight // 获取窗口高度
                console.log(windowHeight)
                document.getElementById("menu").style.height= windowHeight-46 +'px' // 将高度撑开
            },

    <2>.大类点击绑定class   
        1). 在data里定义一个索引  categoryIndex: 0   
        2).点击写入方法activeCategory      
            <li v-for="(item,index) in category" :key="item._id" @click="activeCategory(index)" :class="{categoryActive:categoryIndex===index}">{{item.MALL_CATEGORY_NAME}}</li>

            activeCategory(index){
                this.categoryIndex = index 
            }
        3).定义样式   
            .categoryActive
                background: #fff     
        4).绑定class    让定义的索引等于index
            :class="{categoryActive:categoryIndex===index}"

## 13.商品小类接口编写
    router.get('/getSmallTypeList',async(ctx)=>{
        try{
            let categoryId = "1"
            const SmallType = mongoose.model('SmallType'); // 引入商品小类模型
            let result = await SmallType.find({MALL_CATEGORY_ID:categoryId}).exec(); //查找数据库
            ctx.body = { code: 200, message: result }
        }catch(err){
            ctx.body = { code: 500, message: err }
        }
    })

## 14.解决分类列表的bug
    <1>.小类切换时，不是默认加载第一个  
        解决办法: 
            在小类调接口获取值的时候，将索引值设为0
            if (res.data.code === 200 && res.data.message) {
                this.smallType = res.data.message;
                this.active = 0; // 切换页面还原成0  不还原的话，每次选中再切换大类点击的时候不是第一个被选中
            }
    
    <2>.初始加载时，小类没有出现
        解决办法:
            在大类调接口获取值时，调小类的接口，传递查询小类的id 
            if (res.data.code === 200 && res.data.message) {
                this.category = res.data.message;
                this.getSmallTypeByCategoryID(this.category[0].ID) // 解决一开始出来第一个大类没有展示小类的bug
            }  

       
    




        











    








    




            






        


       


        

