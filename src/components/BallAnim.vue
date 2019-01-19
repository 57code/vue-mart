<template>
  <div class="ball-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ball.show">
        <div class="inner">
          <div class="cubeic-add"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ballAnim",
  props: ["el"], // 点击加购按钮
  data() {
    return {
      ball: {
        show: false, // 显示控制
        el: this.el // 目标dom引用
      }
    };
  },
  methods: {
    start() {
        this.ball.show = true;
    },
    beforeEnter(el) {
      // 设置小球初始位置
      // 小球移动到点击的位置
      // 1. 获取点击的dom位置
      const dom = this.ball.el;
      const rect = dom.getBoundingClientRect();
      console.log(rect.top, rect.left);
      // 2. 把小球移动到点击的位置
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 10 - 20);
      el.style.display = "block";
      // ball只移动y
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      const inner = el.querySelector(".inner");
      // inner只移动x
      inner.style.transform = `translate3d(${x}px,0,0)`;
    },
    enter(el, done) {
      // 把小球移动到初始位置 加上动画
      // 获取offsetHeight就会重绘，前面的变量名随意 主要为了eslint校验
      document.body.offsetHeight;
      // 动画开始，移动到初始位置
      // 小球移动到购物车位置
      el.style.transform = `translate3d(0, 0, 0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(0,0,0)`;
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      // 结束 隐藏小球
      this.ball.show = false;
      el.style.display = "none";

      // 派发事件
      this.$emit('transitionend');
    }
  }
};
</script>

<style scoped lang="stylus">
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>