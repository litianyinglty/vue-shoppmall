import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home/Home'
import Register from '@/view/Register/Register'
import Login from '@/view/Login/Login'
import GoodsDetail from '@/view/GoodsDetail/GoodsDetail'
import CategoryList from '@/view/CategoryList/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/goodsdetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/categorylist',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
















// import Vue from 'vue'
// import Router from 'vue-router'
// import Demo from '@/view/Demo'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'demo',
//       component: Demo,
//     }
//   ]
// })





