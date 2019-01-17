<template>
  <div>
    <div class="item" v-for="item in goods" :key="item.id">
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
            <!-- 点击图片显示预览图 -->
          <img :src="item.img" alt @click.stop.prevent="imgPreview(item.img)">
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <i class="cubeic-add" @click.stop.prevent="addCart($event, item)"></i>
            <span>{{item.count}}人购买</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goods"],
  methods: {
      addCart($event, item) {
          // 加购物车
          this.$store.commit('addCart', item);

          // 把点击事件派发出去
          this.$emit('addCart', $event.target)
      },
      imgPreview(img){
        // 调用cube-ui全局api动态添加图片预览组件
        this.$createImagePreview({
            imgs: [img]
        }).show();
      }
  },
};
</script>

<style lang="stylus" scope>
.item {
  padding: 10px;
  overflow: hidden;

  .left {
    width: 100px;
    float: left;

    img {
      width: 100%;
    }
  }

  .right {
    margin-left: 120px;
    text-align: left;

    .title {
      line-height: 30px;
    }

    .cubeic-add {
      font-size: 22px;
    }
  }
}
</style>