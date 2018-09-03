// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Icon, Field, CellGroup, Swipe, SwipeItem, Lazyload, List, NavBar, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem, Cell } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Icon).use(Field).use(CellGroup).use(Swipe).use(SwipeItem).use(Lazyload).use(NavBar).use(List).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(Cell);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
