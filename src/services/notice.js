import Notice from "@/components/Notice.vue";
import Vue from "vue";

// 给Notice添加一个创建组件实例的方法，可以动态编译自身模板并挂载
Notice.getInstance = props => {
  // 创建一个Vue实例
  const instance = new Vue({
    render(h) {
      // 渲染函数：用于渲染指定模板为虚拟dom
      // <Notice foo="bar">
      return h(Notice, { props });
    }
  }).$mount(); // 执行挂载,若不指定选择器，则模板将被渲染为文档之外的元素

  // 必须使用原生dom api把它插入文档中
  // $el指的是渲染的Notice中真实dom元素
  document.body.appendChild(instance.$el);

  // 获取notice实例，$children指的是当前Vue实例中包含的所有组件实例
  const notice = instance.$children[0];
  return notice;
};

// 设计单例模式，全局范围唯一创建一个Notice实例
let msgInstance = null;
function getInstance() {
  msgInstance = msgInstance || Notice.getInstance();
  return msgInstance;
}

// 暴露接口
export default {
  info({ duration = 2, content = "" }) {
    getInstance().add({
      content,
      duration
    });
  }
};
