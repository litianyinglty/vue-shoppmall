const mongoose = require('mongoose')
const Schema = mongoose.Schema  // 定义模型
let ObjectId = Schema.Types.ObjectId  // 定义模型的类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10 //加盐位数

// 创建UserChema模型
const userSchema = new Schema({
    UserId: ObjectId, // Id类型
    userName: {unique:true,type:String}, // 唯一值，string类型
    password: String,
    createDate: {type:Date,default:Date.now()}, // 注册日期  date类型，默认值
    lastDate: {type:Date,default:Date.now()},  // 最后登录的时间
})

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


// 发布模型
mongoose.model('User',userSchema) //要和表名一致
