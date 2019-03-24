<template>
  <div class="home">
    <!--  -->
    <k-header title="开课吧">
      <i class="cubeic-tag"></i>
    </k-header>

    <!-- 轮播图 -->
    <cube-slide v-if="slider" :data="slider" :interval="5000">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 商品列表 -->
    <good-list :data="goods" @startcartanim="startCartAnim"></good-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import GoodList from "@/components/GoodList.vue";
import CartAnim from "@/components/CartAnim.vue";
import KHeader from '@/components/Header.vue';
export default {
  name: "home",
  data() {
    return {
      el: null
    };
  },
  components: {
    GoodList,KHeader,
  },
  created() {
    this.getGoods();
  },
  computed: {
    // slider() {
    //   return this.$store.state.goods.slider
    // },
    ...mapState({
      slider: state => state.goods.slider
    }),
    ...mapGetters(["goods"])
  },
  methods: {
    ...mapActions(["getGoods"]),
    startCartAnim(el) {
      const anim = this.$create(CartAnim, {
        pos: { left: "45%", bottom: "10px" }
      });
      anim.start(el);
      anim.$on("transitionend", () => {
        anim.remove();
      });
      // const anim = this.$createCartAnim({
      //   onTransitionend() {
      //     anim.remove();
      //   }
      // });
      // anim.start(el);
    }
  }
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
