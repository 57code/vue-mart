<template>
  <div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <router-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
          <button @click.prevent.stop="onAddCart(good)">加购物车</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      goods: [
        { id: 1, text: "Web全栈架构师", price: 8999 },
        { id: 2, text: "Python全栈架构师", price: 8999 }
      ]
    };
  },
  methods: {
    ...mapMutations(["addCart"]),
    onAddCart(good) {
      this.addCart(good);
      this.$router.push('/cart')
    }
  }
};
</script>

<style scoped>
</style>