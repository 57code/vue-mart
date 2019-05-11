import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import store from './store'
import router from './router'
import interceptor from './interceptor'

Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

interceptor(app);