<template>
  <div class="home">
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
    <goods-list :goods="filterGoods"></goods-list>

    <!-- 商品分类列表 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" @select="selectHandler"></cube-drawer>
  </div>
</template>

<script>
import GoodsList from "@/components/GoodsList.vue";

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
    },
    selectHandler(val) {
      this.selectedKeys = [...val];
    }
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

<style scoped>
.cube-slide {
  height: auto;
}
.cube-slide-item > a > img {
  width: 100%;
}
</style>
