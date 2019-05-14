<template>
  <div class="home">
    <k-header title="开课吧">
      <i class="cubeic-tag"></i>
    </k-header>
    
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 商品列表 -->
    <good-list :data="goods" @cartanim="startCartAnim"></good-list>

    <!-- 动画组件 -->
    <!-- <cart-anim ref="ca"></cart-anim> -->
  </div>
</template>

<script>
import gs from '@/service/goods'
import GoodList from "@/components/GoodList.vue";
import CartAnim from '@/components/CartAnim.vue'
import KHeader from '@/components/Header.vue'

export default {
  name: "home",
  components: {
    GoodList, KHeader
  },
  data() {
    return {
      goodsInfo: {},
      keys: [],
      slider: []
    }
  },
  created () {
    gs.getGoodsInfo().then(data=>{
      if (data) {
        const {goodsInfo, slider, keys} = data;
        this.goodsInfo = goodsInfo;
        this.slider = slider;
        this.keys = keys;

      }
    });
  },
  methods: {
    startCartAnim(el) {
      // const anim = this.$createCartAnim({
      //   onTransitionend(){
      //     anim.remove();
      //   }
      // })
      // anim.start(el);

      // 使用方式2
      const anim = this.$create(CartAnim, {
        pos: {left:'46%', bottom:'30px'}
      });
      anim.start(el);
      anim.$on('transitionend', anim.remove)
    }
  },
  computed: {
    goods() {
      // [[{},{}],[{},{}]] => [{},{}...]      
      return this.keys.flatMap(key => this.goodsInfo[key])
    }
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
