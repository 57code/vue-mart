const History = {
    _history: [], // 历史记录堆栈
    install(Vue) {
        // 提供Vue插件所需安装方法
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get() {
                return History;
            }
        })
    },
    push(path) { // 入栈
        this._history.push(path);
    },
    pop() {
        this._history.pop();
    },
    canBack(){
        return this._history.length > 1;
    }

}
export default History;