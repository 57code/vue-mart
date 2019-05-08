import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// import router from './krouter'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
