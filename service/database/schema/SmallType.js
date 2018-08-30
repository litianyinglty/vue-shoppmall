const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smalltypeSchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:{type:String},
    MALL_SUB_NAME:String,
    COMMENTS:String,
    SORT:Number
})
mongoose.model('SmallType',smalltypeSchema)