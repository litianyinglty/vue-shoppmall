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