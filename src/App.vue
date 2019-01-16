<template>
  <div id="app">
    <transition name="route-move">
      <router-view class="child-view"/>
    </transition>
   
   <cube-tab-bar show-slider 
      v-model="selectLabel" 
      @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :key="index" 
        :icon="item.icon" :label="item.value">
        <span>{{item.label}}</span>
        <span class="badge" v-if="showBadge(item.label)">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectLabel: "/", // 默认页签
      tabs: [
        { label: "Home", value: "/", icon: "cubeic-home" },
        { label: "Cart", value: "/cart", icon: "cubeic-mall" },
        { label: "Me", value: "/login", icon: "cubeic-person" }
      ]
    };
  },
  watch: {
    // 路由发生变化时，同步tabs选中
    $route(route) {
      this.selectLabel = route.path;
    }
  },
  created() {
    // 初始化页签设置
    this.selectLabel = this.$route.path;
  },
  methods: {
    logout() {
      this.$http.get("/api/logout");
    },
    changeHandler(val) {
      this.$router.push(val);
    },
    showBadge(label) {
      return label == "Cart" && this.cartTotal > 0;
    }
  },
  computed: {
    ...mapGetters(["isLogin", "cartTotal"])
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #edf0f4;
}
.cube-tab-bar-slider {
  top: 0;
}
/* 页面滑动动画 */
/* 入场前 */
.route-move-enter {
  transform: translate3d(-100%, 0, 0);
}
/* 出场后 */
.route-move-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-move-enter-active,
.route-move-leave-active {
  transition: transform 0.3s;
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 36px;
}

span.badge {
  display: inline-block;
  background: #de3529;
  color: white;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
</style>
