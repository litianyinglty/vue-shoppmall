import Mock from 'mockjs'
import data from './goods'

const goodsData = Mock.mock('/api/shop/index', 'post', data);  
export default {
    goodsData
}