// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from '@/view/Home/Home'
// import Register from '@/view/Register/Register'
// import Login from '@/view/Login/Login'
// import GoodsDetail from '@/view/GoodsDetail/GoodsDetail'
// import CategoryList from '@/view/CategoryList/CategoryList'
// import Cart from '@/view/Cart/Cart'
// import Main from '@/view/Main/Main'
// import Member from '@/view/Member/Member'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/goodsdetail', // 详情
//       name: 'GoodsDetail',
//       component: GoodsDetail
//     },

//     {
//       path: '/register', // 注册
//       name: 'Register',
//       component: Register
//     },
//     {
//       path: '/login', // 登录
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/main', // 首页
//       name: 'Main',
//       component: Main,
//       children: [
//         {
//           path: '/main/member', // 详情
//           name: 'Member',
//           component: Member
//         },
//         {
//           path: '/main/index', // 首页
//           name: 'Home',
//           component: Home
//         },
//         {
//           path: '/main/categorylist', // 分类列表
//           name: 'CategoryList',
//           component: CategoryList
//         },
//         {
//           path: '/main/cart', // 分类列表
//           name: 'Cart',
//           component: Cart
//         }
//       ]
//     }
//   ]
// })
















// // import Vue from 'vue'
// // import Router from 'vue-router'
// // import Demo from '@/view/Demo'

// // Vue.use(Router)

// // export default new Router({
// //   routes: [
// //     {
// //       path: '/',
// //       name: 'demo',
// //       component: Demo,
// //     }
// //   ]
// // })

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home/Home'
import Register from '@/view/Register/Register'
import Login from '@/view/Login/Login'
import GoodsDetail from '@/view/GoodsDetail/GoodsDetail'
import CategoryList from '@/view/CategoryList/CategoryList'
import Cart from '@/view/Cart/Cart'
import Main from '@/view/Main/Main'
import Member from '@/view/Member/Member'

Vue.use(Router)

export default new Router({
  routes: [
   {path:'/main',name:'Main',component:Main,
      children:[
        {path:'/',name:'Home',component:Home},
        {path:'/CategoryList',name:'CategoryList',component:CategoryList},
        {path:'/Cart',name:'Cart',component:Cart},
        {path:'/Member',name:'Member',component:Member},
      ]
   },
  
   {path:'/register',name:'Register',component:Register},
   {path:'/login',name:'Login',component:Login},
   {path:'/GoodsDetail',name:'GoodsDetail',component:GoodsDetail},
   
   
  ]
})



