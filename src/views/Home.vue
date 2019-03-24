<template>
  <div class="home">
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 商品列表 -->
    <good-list :data="goods"></good-list>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import GoodList from '@/components/GoodList.vue';

export default {
  name: "home",
  components: {
    GoodList,
  },
  created() {
    this.getGoods();
  },
  computed: {
    ...mapState(['slider']),
    ...mapGetters(['goods'])
  },
  methods: {
    ...mapActions(['getGoods'])
  },
};
</script>
style <style lang="stylus" scoped>
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
  height: auto;
}
</style>
