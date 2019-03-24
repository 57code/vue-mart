import Vue from "vue";

// 创建函数接收要创建组件定义
function create(Component, props) {
  // 创建一个Vue新实例
  const instance = new Vue({
    render(h) {
      // render函数将传入组件配置对象转换为虚拟dom
      console.log(h(Component, { props }));
      return h(Component, { props });
    }
  }).$mount(); //执行挂载函数，但未指定挂载目标，表示只执行初始化、编译等工作
  // 将生成dom元素追加至body
  document.body.appendChild(instance.$el);
  // 给组件实例添加销毁方法
  const comp = instance.$children[0];
  comp.remove = () => {
    document.body.removeChild(instance.$el);
    instance.$destroy(); 
  };
  return comp;
}

// 暴露调用接口
export default create;
