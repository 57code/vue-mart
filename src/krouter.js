import Vue from "vue";

class KRouter {
  constructor(Vue, options) {
    this.$options = options;
    this.routeMap = {};
    this.app = new Vue({
      data: {
        current: "#/"
      }
    });

    this.init();
    this.createRouteMap(this.$options);
    this.initComponent(Vue);
  }

  // 初始化 hashchange
  init() {
    window.addEventListener("load", this.onHashChange.bind(this), false);
    window.addEventListener("hashchange", this.onHashChange.bind(this), false);
  }

  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }

  // 注册组件
  initComponent(Vue) {
    Vue.component("router-link", {
      props: {
        to: String
      },
      render: function(h) {
        // h <==> createElement
        // <a :href="to"><slot></slot></a>
        return h("a", { attrs: { href: this.to } }, this.$slots.default);
      }
    });

    const _this = this;
    Vue.component("router-view", {
      render(h) {
        var component = _this.routeMap[_this.app.current];
        return h(component);
      }
    });
  }

  // 获取当前 hash 串
  getHash() {
    return window.location.hash.slice(1) || "/";
  }

  // 设置当前路径
  onHashChange() {
    this.app.current = this.getHash();
  }
}

const Foo = {
  render() {
    return <div>Foo</div>;
  }
};
const Bar = {
  render() {
    return <div>Bar</div>;
  }
};
export default new KRouter(Vue, {
  routes: [{ path: "/foo", component: Foo }, { path: "/bar", component: Bar }]
});
