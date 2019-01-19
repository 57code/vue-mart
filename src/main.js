import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import interceptor from './http-interceptor'
import KHeader from './components/Header.vue'
import {createAPI} from 'cube-ui';
import Notice from './components/Notice.vue';
import BallAnim from './components/BallAnim.vue';
import notice from '@/services/notice';

Vue.config.productionTip = false

// 全局引入Header.vue
Vue.component('k-header', KHeader)

Vue.prototype.$http = axios;
Vue.prototype.$notice = notice;

// 创建$createNotice API
createAPI(Vue, Notice, true); // 参数3表示单例模式
createAPI(Vue, BallAnim, ['transitionend']); 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
