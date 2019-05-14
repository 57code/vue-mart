import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './interceptor'

import {createAPI} from 'cube-ui';
import create from '@/utils/create';
import CartAnim from '@/components/CartAnim';

// 注册全局组件, $createCartAnim
createAPI(Vue, CartAnim, ['transitionend'])

Vue.config.productionTip = false
Vue.prototype.$create = create;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 执行拦截器初始化
interceptor(app);