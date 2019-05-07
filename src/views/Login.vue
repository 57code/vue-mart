<template>
  <div>
    <h2>用户登录</h2>
    <button @click="onLogin" :disabled="loading">{{loading?'登录中':'登录'}}</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions(["requestLogin"]),
    onLogin() {
      // window.isLogin = true;//登录成功
      // 提交mutations
      // this.$store.commit('login')
      // 派发actions
      this.loading = true;
      this.requestLogin({username:'tom'}).then(isLogin => {
        this.loading = false;
        // 获取查询参
        const redirect = this.$route.query.redirect || "/";
        // 路由到重定向地址
        this.$router.push(redirect);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>