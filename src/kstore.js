import Vue from 'vue';

class KStore {
  constructor(options) {
    this.state = options.state;
    this.mutations = options.mutations;
    this.actions = options.actions;
    // 借用vue本身的数据响应式机制
    new Vue({
      data: {
        state: this.state
      }
    });
  }

  commit(type, payload) {
    const mutation = this.mutations[type];
    mutation(this.state, payload);
  }

  dispatch(type, payload) {
    const action = this.actions[type];
    const ctx = {
      commit: this.commit.bind(this),
      state: this.state,
      dispatch: this.dispatch.bind(this)
    };
    return action(ctx, payload);
  }
}
export default new KStore({
    state: {count:1},
    mutations: {
        add(state){
            state.count++;
        }
    },
    actions: {
      add({commit}){
        commit('add')
      }
    }
})