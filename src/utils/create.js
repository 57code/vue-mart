import Vue from 'vue';

export default function(Component, props) {
    const instance = new Vue({
        render(h) {
            return h(Component, {props})
        }
    }).$mount();
    // 将生成dom元素追加至body
    document.body.appendChild(instance.$el);
    const comp = instance.$children[0];
    comp.remove = () => {
        // 从body中移除dom
        document.body.removeChild(instance.$el);
        instance.$destroy();
    }
    return comp;
}