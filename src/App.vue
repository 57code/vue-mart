<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <span>{{loginState}}</span>
    </div>

    <div>{{count}}
      <button @click="onAdd">add</button>
    </div>

    <!-- krouter测试 -->
    <nav>
      <router-link to="#/foo">foo</router-link> |
      <router-link to="#/bar">bar</router-link>
    </nav>

    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import store from './kstore';

export default {
  computed: {
    ...mapState(["isLogin"]),
    ...mapGetters(["loginState"]),
    count(){
      return store.state.count;
    }
  },
  methods: {
    onAdd() {
      store.dispatch('add')
    }
  },
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
