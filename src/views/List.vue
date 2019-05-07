<template>
  <div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <router-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
          <button @click.prevent.stop="addCart(good)">加购物车</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
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
      addCart() {
          
      }
  },
};
</script>

<style lang="scss" scoped>
</style>