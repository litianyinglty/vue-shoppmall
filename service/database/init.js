const mongoose = require('mongoose')
const db = "mongodb://localhost/vueshop"  // 数据库表
const glob = require('glob');
const { resolve } = require('path')

exports.initSchemas = () => { // 引入所有的模型
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require) // 同步引入，匹配所有的模型，并把相对路径转换为绝对路径
}

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


