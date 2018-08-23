import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home/Home'
import Register from '@/view/Register/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
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





