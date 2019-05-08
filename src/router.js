import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import List from "./views/List.vue";
import Detail from "./views/Detail.vue";
import Cart from "./views/Cart.vue";
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {path: '', component: List},
        {path: '/cart', component: Cart},
        {path: '/detail/:id', component: Detail, props: true},
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      meta: {requireLogin:true},
      beforeEnter(to,from,next) {
        // 判断是否登录
        if (!store.state.isLogin) {
          next('/login?redirect='+to.path);
        } else {
          next();
        }
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
})

// 每次路由激活之前都会执行回调函数
// router.beforeEach((to,from,next) => {
      // console.log(to.meta)
//   // 判断是否登录
//   if (to.path === '/about' && !window.isLogin) {
//     next('/login?redirect='+to.path);
//   } else {
//     next();
//   }
// })

export default router;
