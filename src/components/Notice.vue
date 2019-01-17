<template>
  <div class="alert">
    <div class="alert-container" v-for="item in alerts" :key="item.id">
      <div class="alert-content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notice",
  data() {
    return {
      alerts: []
    };
  },
  created() {
    // id自增控制
    this.id = 0;
  },
  methods: {
    add(options) {
      const id = "id_" + this.id++;
      const _alert = { ...options, id: id };
      this.alerts.push(_alert);
      //自动关闭
      const duration = options.duration || 1; // 单位秒
      setTimeout(() => {
        this.del(id);
      }, duration * 1000);
    },
    del(id) {
      for (let i = 0; i < this.alerts.length; i++) {
        const element = this.alerts[i];
        if (element.id === id) {
          this.alerts.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.alert {
  position: fixed;
  width: 100%;
  top: 30px;
  left: 0;
  text-align: center;

  .alert-content {
    display: inline-block;
    padding: 8px;
    background: #fff;
    margin-bottom: 10px;
  }
}
</style>