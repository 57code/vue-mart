import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import store from './store'
import router from './router'
// eslint-disable-next-line no-unused-vars
import interceptor from './interceptor'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

