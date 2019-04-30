<template>
  <div class="hello">
    <!-- 条件 -->
    <p :title="title" v-if="title">{{title}}</p>

    <!-- 用户输入 -->
    <div>
      <input type="text" v-model="text">
      <button @click="addGood">添加商品</button>
    </div>

    <!-- 循环 -->
    <ul>
      <li v-for="good in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>￥{{good.price}}</span>
        <button @click="addCart(good)">加购物车</button>
      </li>
    </ul>

    <!-- 购物车 -->
    <cart title="abc" ref="cart" @addCart="onAddCart"></cart>
  </div>
</template>

<script>
import Cart from './Cart.vue';

export default {
  name: 'HelloWorld',
  components: {
    Cart,
  },
  data() {
    return {
      title: '',
      text: '',
      goods: [
        {id:1, text:'Web全栈架构师',price:8999},
        {id:2, text:'Python全栈架构师',price:8999},
      ],
      
    }
  },
  created(){
    setTimeout(() => {
      this.title = '开课吧购物车'
    }, 1000);
  },
  methods: {
    addGood() {
      if (this.text) {
        this.goods.push({
          id: this.goods.length+1,
          text: this.text,
          price: 6999
        });
        this.text = ''
      }
    },
    addCart(good) {
      // 添加购物车
      this.$refs.cart.addCart(good)
      // this.$bus.$emit('addCart', good);
    },
    onAddCart(){
      console.log('lalal');
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
