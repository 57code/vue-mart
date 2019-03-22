import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './interceptor'

Vue.config.productionTip = false


const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 执行拦截器初始化
interceptor(app);