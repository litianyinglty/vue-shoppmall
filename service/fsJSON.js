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