import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import Customers from './components/Customers.vue'
import About from './components/About.vue'
import Add from './components/Add.vue'
import axios from 'axios'
import Particulars from './components/Particulars.vue'
import Edit from './components/Edit.vue'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$axios=axios

// 设置路由
const router =new VueRouter({
  mode:"history",
  base:__dirname,
  routes:[
    {path:'/',component:Customers},
    {path:'/about',component:About},
    {path:'/add',component:Add},
    {path:'/particulars/:id',component:Particulars},
    {path:'/edit/:id',component:Edit},
  ]
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
