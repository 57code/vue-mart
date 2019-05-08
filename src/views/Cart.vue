<template>
  <table border="1">
    <thead>
      <tr>
        <th></th>
        <th>课程名</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in cart" :key="c.id" :class="{inactive: !c.active}">
        <td>
          <input type="checkbox" v-model="c.active">
        </td>
        <td>{{c.text}}</td>
        <td>￥{{c.price}}</td>
        <td>{{c.count}}</td>
        <td>￥{{c.price*c.count}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            cart: state => state.cart.list
        })
    }
};
</script>

<style scoped>
.inactive {
  color: gray;
}
</style>