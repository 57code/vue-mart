<template>
  <div class="home">
    <!-- 页头 -->
    <k-header title="开课吧商城"></k-header>

    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="slider">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 触发分类选择按钮 -->
    <cube-button @click="showCatg">选择分类</cube-button>

    <!-- 商品列表 -->
    <goods-list :goods="filterGoods" @addCart="onAddCart"></goods-list>

    <!-- 商品分类列表 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" @select="selectHandler"></cube-drawer>

    <!-- 加购动画载体 -->
    
  </div>
</template>

<script>
import GoodsList from "@/components/GoodsList.vue";
import create from '@/services/create';
import BallAnim from '@/components/BallAnim.vue';

const labels = {
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能"
};

export default {
  name: "home",
  data() {
    return {
      
      slider: [],
      goods: [], // 所有商品列表
      selectedKeys: [], // 分类过滤时使用
      keys: [] // 分类
    };
  },
  components: {
    GoodsList
  },
  async created() {
    // {data:{},statsu...}
    const {
      data: { data: goods, slider, keys }
    } = await this.$http.get("/api/goods");
    console.log(goods, slider);
    this.slider = slider;
    this.goods = goods;
    this.keys = keys;
    this.selectedKeys = [...this.keys]; // 默认选中全部分类
  },
  methods: {
    showCatg() {
      // 显示分类列表
      this.$refs.drawer.show();

      // 创建Notice实例
      // cube-ui方式
      // const notice = this.$createNotice();
      // notice.add({ content: "lalala", duration: 2 });

      // 自定义方式
      this.$notice.info({
        duration: 3,
        content: "一些消息内容"
      });
    },
    selectHandler(val) {
      this.selectedKeys = [...val];
    },
    onAddCart(el) {
      // this.ball.el = el;
      // this.ball.show = true; // 触发动画钩子
      // 创建一个小球动画实例
      // const anim = this.$createBallAnim({
      //   el, onTransitionend(){
      //     anim.remove(); // 动画结束，移除小球组件实例
      //   }
      // })
      // anim.start();

      // 手动创建组件实例
      const anim = create(BallAnim, {el});
      anim.start();
      anim.$on('transitionend', ()=>{
        anim.remove();
      })
    },
    
  },
  computed: {
    filterGoods() {
      let ret = [];
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v]);
      });
      return ret;
    },
    drawerList() {
      return this.keys.map(v => {
        return {
          value: v,
          text: labels[v] //转换为中文标签
        };
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
}


</style>
